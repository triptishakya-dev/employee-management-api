import express from "express";
import { postEmployee } from "../controller/employeeController.js";
import { getEmployees } from "../controller/employeeController.js";



const router = express.Router();
router.post("/api/employees", postEmployee);
router.get("/api/employees", getEmployees);


export default router;