import express from "express";
import { addFoodItem, listAllFood, removeFoodItem } from "../controllers/foodControler.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
        return callback(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFoodItem);
foodRouter.get("/list", listAllFood)
foodRouter.delete("/remove", removeFoodItem)

export default foodRouter;
