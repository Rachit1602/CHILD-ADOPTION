const mongoose = require('mongoose');
const MONGODB_CONNECT_URI= "mongodb+srv://rachit279narang:7x366KXcX2xFm1uh@childstore.379ua2x.mongodb.net/?retryWrites=true&w=majority&appName=Childstore"
const uri=process.env.MONGODB_CONNECT_URI||MONGODB_CONNECT_URI;
mongoose.connect(uri).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB"+err.message);
})

const logInSchema=new mongoose.Schema({
    name:{
        type:Object,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    password:{
        type: String, 
        required: true
    },
})

const collection=new mongoose.model("login",logInSchema);
const child=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    height:{
        type: String,
        required: true
    },
    weight:{
        type:String,
        required: true
    },
    hobbies:{
        type:String,
        required: true
    },
    health:{
        type:String,
        required: true
    },
    orphanage:{
        type: Object, 
        required: true
    },
    image:{
        type: String,
        required: false
    },
    isAdopted:{
        type: Boolean,
        required: true
    }
})
const collection1=new mongoose.model("children",child);

const contactSchema=new mongoose.Schema({
    name:{
        type:Object,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    query:{
        type:String,
        required: true
    }
})
const collection2=new mongoose.model("contact",contactSchema);
exports.item1 = collection 
exports.item2 = collection1
exports.item3=collection2