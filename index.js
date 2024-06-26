import express from "express";
import getConnection from "./src/helper/dbConnection.js";
import "dotenv/config";
import router from "./routes.js";
const app=express();
import path from "path"
const __dirname=path.resolve()

// app.get("/accelerlab",(req,res)=>{
//     return res.send("Welocome to Nodejs")
// })
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
router(app)
getConnection()

app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`);
})