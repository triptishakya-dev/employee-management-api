import express from "express";
import { getAddresses, postAddress } from "../controller/addressController.js";

const router = express.Router();

router.post("/api/addresses", postAddress);
router.get("/api/addresses", getAddresses);

export default router;
