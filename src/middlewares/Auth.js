import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    try {
        //Obtener el token
        const token = req.headers["authorization"];
        if (!token) return res.status(403).json({ message: "No token provided" });
    
        //Verificar el token
        const decoded = jwt.verify(token, config.secret);
        const id = decoded.id;
    
        //Find By Id
        const findId = await User.find({ _id: id }).exec();

        if (!findId) return res.status(404).json({ message: "No user found" });

        //retornar usuario aprobado
        console.log(findId);
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }      
};