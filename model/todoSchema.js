const mongoose=require("mongoose")

const todoSchema=new mongoose.Schema({
    title:{type:String, require:true},
    status:{type:Boolean, default:false},
    // userID: { type: mongoose.Types.ObjectId, ref: "user" , required:true}
})


const todo=mongoose.model("todo",todoSchema)

module.exports=todo