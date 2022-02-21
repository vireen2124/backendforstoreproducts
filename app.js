const express= require("express")
const app=express()
require("dotenv").config()
const port=process.env.PORT
const DB_URI=process.env.DB_URI
const notFound = require("./middleware/not-found")
const connectToDb=require("./db/connect");
const products=require("./routes/products")
//middlewares
app.use(express.json())
app.use(express.static("public"))
//using router
app.use("/api/v1/products",products)
//page not found
app.use(notFound)
//starting db and server
const connectDb=async()=>{
    await connectToDb(DB_URI);
    app.listen(port,()=>{
        console.log(`server started on port ${port}`)
    })
}
connectDb()