import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFoodItem = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        const result = { success: true, message: "Food Added", food: food };
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error on add food",
            error: error,
        });
    }
};

const listAllFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        const result = { success: true, data: foods };
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error on list foods",
            Error: error,
        });
    }
};

const removeFoodItem = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});
        await foodModel.findByIdAndDelete(req.body.id);
        const result = { success: true, message: "Food removed", food };
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error on remove food",
            Error: error,
        });
    }
};

export { addFoodItem, listAllFood, removeFoodItem };
