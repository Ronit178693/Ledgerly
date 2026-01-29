import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
    const { token } = req.cookies;
    try {
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decode) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        // Attach user to request object
        req.user = { _id: decode.Id };
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}