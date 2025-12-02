import express from "express";
import cors from "cors";
import employeeRoute from "./routers/employeeRoute.js";
import addressRoute from "./routers/addressRoute.js";
const app= express();

const port = 8000;



app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))




 app.get("/" , (req,res) =>{
    res.send("hello");
 })

app.use(express.json());


app.use("/", employeeRoute);
app.use("/", addressRoute);



 app.listen (port, () => {
    console.log("port is listening")
 });