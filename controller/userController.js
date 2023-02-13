const { UserModel } = require("../models/UserModel.js")
const bcrypt=require("bcrypt")

const register=async(req,res)=>{
    const {name,email,password}=req.body

    const isUser=await UserModel.findOne({email})

    if(isUser ){
        res.send({"msg":"user already exists"})
    }
    else{
        bcrypt.hash(password,4,async function(err,hash){
            if(err){
                res.send({"msg":"something went wrong"})
            }
            const new_user=new UserModel({
                name,
                email,
                password:hash,
                isAdmin:false

            })

            try{
                await new_user.save()
                res.send({"msg":"sign in succefully"})
            }
            catch(err){
                res.send({"msg":"something went wrong"})
            }



        })
    }

}

module.exports = {
    register
}