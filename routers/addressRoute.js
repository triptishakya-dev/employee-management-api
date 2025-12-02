import express from "express";
import { postAddress } from "../controller/addressController.js";

const router = express.Router();

router.post("/api/addresses", postAddress);

export default router;
