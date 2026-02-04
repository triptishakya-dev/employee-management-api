import express from "express";
import { getAddresses, postAddress } from "../controller/addressController.js";

const router = express.Router();

router.post("/api/addresses", postAddress);
router.get("/api/addresses", getAddresses);
router.put("/address/:addressId", updateAddress);

export default router;
