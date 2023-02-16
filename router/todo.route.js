const express = require("express");
const todoModal=require("../model/todoSchema")

const app = express.Router();

app.get("/", async (req,res)=>{
    try {
        const data = await todoModal.find();
        return res.send(data);
      } catch (error) {
        return res.status(500).send(error.message);
      }
})

app.post("/",async (req,res)=>{
    try {
        const user = await todoModal.create(req.body);
        return res.send(user);
      } catch (error) {
        return res.status(500).send(error.message);
      }
})


app.patch("/:id",async(req,res)=>{
    try {
        const data = await todoModal.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        return res.send(data);
    } catch (error) {
       return res.status(500).send(error.message);
    }
})


// delete
app.delete("/:id", async (req, res) => {
    try {
      const data = await todoModal.findByIdAndDelete(req.params.id);
      return res.send(data);
    } catch (error) {
     return res.status(500).send(error.message);
    }
  });


module.exports=app