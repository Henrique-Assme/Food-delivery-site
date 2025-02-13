import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const { itemId, userId } = req.body;
        if (!itemId) {
            return res.status(400).json({
                success: false,
                message: "Missing Item Id",
            });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = (await user.cartData) || {};
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData });
        return res.status(200).json({
            success: true,
            message: "Item added to cart",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding item to cart",
            error,
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { itemId, userId } = req.body;
        if (!itemId) {
            return res.status(400).json({
                success: false,
                message: "Missing Item Id",
            });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = (await user.cartData) || {};
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return res.status(200).json({
            success: true,
            message: "Item removed from cart",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error removing item from cart",
            error,
        });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let cartData = (await user.cartData) || {};

        return res.status(200).json({
            success: true,
            cartData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting user cart",
            error,
        });
    }
};

export { addToCart, removeFromCart, getCart };
