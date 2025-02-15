import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(403).json({
            success: false,
            message: "Not authorized. Login again",
        });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Error on auth", 
            error
        });
    }
};

export default authMiddleware;
