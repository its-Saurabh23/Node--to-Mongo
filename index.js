const express = require ('express')
const cors = require ('cors')
const bodyParser = require('body-parser')
const mongoose = require ('mongoose')

// connection to database
main().catch(Error => console.log((err)))
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/demo');
    console.log('db connect')
}

// schema 
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email :String
});

// model
const User = mongoose.model('User',userSchema)

const server = express()
// middlewares
server.use(cors());
server.use(bodyParser.json())

// Crud -CREATE
server.post('/', async(req,res)=>{

    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    const doc =  await user.save()
     console.log(doc)

    res.json(doc)
})

server.get('/',async(req,res)=>{
   const doc =  await User.find({})
   res.json(doc)
})
server.listen(5000,()=>{
    console.log("sever started")
})
 