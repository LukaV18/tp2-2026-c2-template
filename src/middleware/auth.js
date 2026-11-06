import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    // Validar presencia y formato Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token de autenticacion faltante o mal formado" });
    }

    const token = authHeader.split(" ")[1]?.trim();
    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error en auth:", error.message);
        return res.status(401).json({ message: "Token de autenticacion invalido o expirado" });
    }
}
