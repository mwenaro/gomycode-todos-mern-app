const mongoose  = require("mongoose")

const router = require("express").Router()
const todosSchema = mongoose.Schema({
    title:{type:String, required:true},
    description:{ required:true, type:String},
    completed:{type:Boolean, default:false},
    createdAt:{type:Date, default:Date.now}
})
// TodoModal
const TodoModal = mongoose.model("Todo", todosSchema)
//get
router.get("/", async(req,res)=>{
    try {
        const fetchedTods = await TodoModal.find({})
            if(!fetchedTods) return res.status(404).send([])
        res.send(fetchedTods)
    } catch (error) {
        console.log({msg:" An error ocuured "+error.message})
        res.status(500).send({msg:" An error ocuured "+error.message})
    }
})

//get /:id
.get("/:id", async(req,res)=>{
    try {
        const fetchedTods = await TodoModal.findById(req.params.id)
            if(!fetchedTods) return res.status(404).send({})
        res.send(fetchedTods)
    } catch (error) {
        console.log({msg:" An error ocuured "+error.message})
        res.status(500).send({msg:" An error ocuured "+error.message})
    }
})

//post
.post("/", async(req,res)=>{
    try {
        const newTodo = new TodoModal(req.body)
        let savedTodo = await newTodo.save()
            if(!savedTodo) return res.status(400).send(savedTodo)
        res.status(201).send(savedTodo)
    } catch (error) {
        console.log({msg:" An error ocuured "+error.message})
        res.status(500).send({msg:" An error ocuured "+error.message})
    }
})
//put
.put("/:id", async(req,res)=>{
    try {
        // let tods =  await TodoModal.findById(req.params.id)
        // return res.send({id:req.params.id, todo:tods})

        const updatedTodo = await TodoModal.findByIdAndUpdate(req.params.id, req.body)
        console.log({updatedTodo})
            if(!updatedTodo) return res.status(400).send(updatedTodo)
        res.status(201).send(updatedTodo)
    } catch (error) {
        console.log({msg:" An error ocuured "+error.message})
        res.status(500).send({msg:" An error ocuured "+error.message})
    }
})

//delete
.delete("/:id", async(req,res)=>{
    try {
        const deleted = await TodoModal.findByIdAndDelete(req.params.id)
        if(!deleted) throw Error("Could not be deleted!")
        res.status(201).send({sucess:true, msg:"successfully deleted"})
    } catch (error) {
        console.log({msg:" An error ocuured "+error.message})
        res.status(500).send({msg:" An error ocuured "+error.message})
    }
})



module.exports = router