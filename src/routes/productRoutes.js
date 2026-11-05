import express from "express";
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/auth.js";

const productRoutes = express.Router();

// Rutas publicas de lectura
// GET /api/products
// GET /api/products?category=notebook
// GET /api/products?brand=Logitech
productRoutes.get("/", getProducts);

// GET /api/products/:id
productRoutes.get("/:id", getProduct);

// Rutas protegidas (requieren token JWT)
// POST /api/products
productRoutes.post("/", authMiddleware, createProduct);

// PUT /api/products/:id
productRoutes.put("/:id", authMiddleware, updateProduct);

// DELETE /api/products/:id
productRoutes.delete("/:id", authMiddleware, deleteProduct);

export default productRoutes;
