import express from "express";
import { deleteEmployee, postEmployee } from "../controller/employeeController.js";
import { getEmployees } from "../controller/employeeController.js";
import { updateEmployee } from "../controller/employeeController.js";



const router = express.Router();
router.post("/api/employees", postEmployee);
router.get("/api/employees", getEmployees);
router.delete("/api/employees/:id" , deleteEmployee);
router.put("/api/employees/:id" , updateEmployee);


export default router;