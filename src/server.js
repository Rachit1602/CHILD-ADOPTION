const express=require('express');
const path=require('path');
const session=require('express-session');
const flash=require('express-flash');
const multer = require('multer');
const collection=require('./mongodb');

const app = express();
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended:false}));
app.use(session({
    secret:"secret key",
    resave:false,
    saveUninitialized:true,
    cookie: {
        maxAge: 600000
    }
}))
app.use(flash());

app.use(express.static(path.join(__dirname,'/../','public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'views','index.html'));
});
app.get('/Aboutus', function(req, res){
    //res.render("sign-up");
    res.sendFile(path.join(__dirname,'views','About-us.html'));
});
app.get('/login', function(req, res){
    // res.render("login");
    //res.sendFile(path.join(__dirname,'views','login.html'));
    res.render('login',{messages:req.flash()});
});
app.post('/login',async function(req, res){
    console.log(req.body)
    const {email,password} = req.body;
    try{
        const check=await collection.item1.findOne({email:email});
        console.log(check);
        if(!email || !password){
            req.flash('error',"Email and Password are required");
            return res.redirect('/login');
        }else if(password.length<8){
            req.flash('error',"Password must be at least 8 characters");
            return res.redirect('/login');
        }else if(check.password===password){
            req.flash('success',"login successfully");
            res.redirect('/login'); 
        }else{
            req.flash('error',"Wrong Password");
            res.redirect('/login');
        }
    }catch(e){
        res.send("wrong details");
    }
})
app.get('/signup', function(req, res){
    //res.render("sign-up");
    res.sendFile(path.join(__dirname,'views','sign-up.html'));
});
app.post('/signup',async function(req, res){
    console.log(req.body)
    const name={
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname
    }
    const data={
        name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }
    console.log(data);
    await collection.item1.insertMany([data]);
    res.redirect('/'); 
})

var storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads')
    // },
    destination:'public/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

app.get('/addChild', (req, res) => {
    res.render('addChild');
})

app.post('/addChild', upload.single('image'),async (req, res,next) => {
    console.log(req.body);
    console.log(req.file.filename);
    const orphanage={
        orphName:req.body.orphName,
        orphPhone:req.body.orphPhone,
        orphEmail:req.body.orphEmail,
        orphAddress:req.body.orphAddress,
    }
    const data={
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        height:req.body.height,
        weight:req.body.weight,
        hobbies:req.body.hobbies,
        health:req.body.health,
        orphanage,
        isAdopted:false,
        image: req.file.filename
    }
    console.log(data);
    await collection.item2.insertMany([data]);
    res.redirect('/addChild');
})

app.get('/boys',async (req, res) => {
    const data= await collection.item2.find({gender:'Male'})
    console.log(data);
    res.render('modal',{childs:data});
}); 


app.get('/girls',async (req, res) => {
    const data= await collection.item2.find({gender:'Female'})
    console.log(data);
    res.render('modal',{childs:data});
});

app.get('/contact',(req,res)=>{
    res.render('contact',{messages:req.flash()});
})
app.post('/contact',async (req,res)=>{
    // res.render('contact');
    console.log(req.body);
    const name={
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname
    }
    const data={
        name,
        email: req.body.email,
        phone: req.body.phone,
        query: req.body.query
    }
    await collection.item3.insertMany([data]);
    req.flash('success',"Thanks! Your Response submitted successfully");
    res.redirect('/contact');
})

app.get('/procedure',(req,res)=>{
    res.render('procedure');
})
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("port connected"+port);
});