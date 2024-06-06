const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

// create app
const app = express()
// meddle where
app.use(express.json())
app.use(cors())
const todosRoute = require("./routes/todoRoute")

// crerate PORT 
const PORT = process.env.PORT || 5000
mongoose.connect("mongodb://localhost:27017/mern-todo-app")
.then(()=>{
    console.log("Mongodb connected succefully")
})
.catch(err=>console.log(`An error has occured -  ${err.message}`))




//routes
app.use("/todos", todosRoute)

// eeror
app.all("*", (req,res)=>res.status(404).send({msg:"Invalid route"}))
app.listen(PORT, ()=>console.log(`App is running on POR ${PORT}`))