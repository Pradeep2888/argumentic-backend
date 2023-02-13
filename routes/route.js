const router = require('express').Router();
const bcrypt=require("bcrypt")
const { getmail } = require('../controller/appController.js');
const { register } = require('../controller/userController.js');
const { UserModel } = require('../models/UserModel.js');
const jwt=require("jsonwebtoken");
const { RequestModel } = require('../models/RequistModel.js');


/** HTTP Reqeust */

router.post('/getmail', getmail);
router.post("/register",register)

router.get("/",(req,res)=>{
    res.send({"msg":"Welcome to Data base"})
})

router.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const user= await UserModel.findOne({email})
    const hashed_password=user.password;
    const user_id=user._id
    bcrypt.compare(password,hashed_password,function(err,result){
        if(err){
            res.send({"msg":"password incorrect"})
        }
        if(result){
            const token=jwt.sign({user_id},process.env.SECRET_KEY);
            if(user.isAdmin){
                res.send({"mesg":"Login sucessfull","token":token})
            }
            else{
                res.send({"mesg":"you are not admin"})
            }
            
        }
        else{
            res.send({"msg":"Login faild"})
        }
    })

})

router.get("/visitors",async(req,res)=>{
    const user=await RequestModel.find()
// console.log(user)
 res.send({"data":user})
})

router.get("/users",async(req,res)=>{
    const user=await UserModel.find()
// console.log(user)
 res.send({"data":user})
})
router.patch("/usersupdate",async(req,res)=>{
    const {_id,admin}=req.body
    const user=await UserModel.updateOne({"_id": _id}, {$set: {"isAdmin": admin}})

   console.log(user)
 res.send({"data":"user"})
})


module.exports = router;