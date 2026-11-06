import express from "express";
import {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
} from "../controllers/recipeController.js";
import { authMiddleware } from "../middleware/auth.js";

const recipeRoutes = express.Router();

// Rutas publicas de consulta
// GET /api/recipes
// GET /api/recipes?category=Desayunos
recipeRoutes.get("/", getRecipes);

// GET /api/recipes/:id
recipeRoutes.get("/:id", getRecipe);

// Rutas protegidas (requieren token JWT)
// POST /api/recipes
recipeRoutes.post("/", authMiddleware, createRecipe);

// PUT /api/recipes/:id
recipeRoutes.put("/:id", authMiddleware, updateRecipe);

// DELETE /api/recipes/:id
recipeRoutes.delete("/:id", authMiddleware, deleteRecipe);

export default recipeRoutes;
