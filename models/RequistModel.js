const mongoose=require("mongoose")

const requestSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    number:{type:Number,required:true},
},{timestamps:true})

const RequestModel=mongoose.model("request",requestSchema)

module.exports={RequestModel}