const express=require('express');
const path=require('path');

const app = express();

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
    res.sendFile(path.join(__dirname,'views','login.html'));
});
app.get('/signup', function(req, res){
    //res.render("sign-up");
    res.sendFile(path.join(__dirname,'views','sign-up.html'));
});
app.listen(3000,()=>{
    console.log("port connected");
});
