import express from "express";
import employeeRoute from "./routers/employeeRoute.js";

const app= express();

const port = 3000;


 app.get("/" , (req,res) =>{
    res.send("hello");
 })

app.use(express.json());


app.use("/", employeeRoute);



 app.listen (port, () => {
    console.log("port is listening")
 });