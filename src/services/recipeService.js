import {
    getAllRecipes,
    getRecipeById,
    createRecipe as createRecipeData,
    updateRecipe as updateRecipeData,
    deleteRecipe as deleteRecipeData,
} from "../data/recipeData.js";

function createHttpError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function validateRecipeData(data) {
    const { title, category, calories, timeMinutes, ingredients, instructions } = data;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
        throw createHttpError(400, "El campo 'title' es obligatorio");
    }
    if (!category || typeof category !== "string" || category.trim().length === 0) {
        throw createHttpError(400, "El campo 'category' es obligatorio");
    }
    if (typeof calories !== "number" || calories <= 0) {
        throw createHttpError(400, "El campo 'calories' debe ser un número mayor a 0");
    }
    if (!Number.isInteger(timeMinutes) || timeMinutes <= 0) {
        throw createHttpError(400, "El campo 'timeMinutes' debe ser un entero positivo");
    }
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        throw createHttpError(400, "El campo 'ingredients' debe ser una lista con al menos un ingrediente");
    }
    if (!instructions || typeof instructions !== "string" || instructions.trim().length === 0) {
        throw createHttpError(400, "El campo 'instructions' es obligatorio");
    }
}

export async function listRecipes(filters = {}) {
    return await getAllRecipes(filters);
}

export async function findRecipeById(id) {
    const recipe = await getRecipeById(id);
    if (!recipe) {
        throw createHttpError(404, "Receta no encontrada");
    }
    return recipe;
}

export async function addRecipe(data) {
    validateRecipeData(data);
    const { title, category, calories, timeMinutes, ingredients, instructions, image } = data;
    return await createRecipeData({
        title: title.trim(),
        category: category.trim(),
        calories,
        timeMinutes,
        ingredients: ingredients.map((i) => String(i).trim()).filter(Boolean),
        instructions: instructions.trim(),
        image: image || null,
    });
}

export async function replaceRecipe(id, data) {
    validateRecipeData(data);
    const { title, category, calories, timeMinutes, ingredients, instructions, image } = data;
    const updated = await updateRecipeData(id, {
        title: title.trim(),
        category: category.trim(),
        calories,
        timeMinutes,
        ingredients: ingredients.map((i) => String(i).trim()).filter(Boolean),
        instructions: instructions.trim(),
        image: image || null,
    });
    if (!updated) {
        throw createHttpError(404, "Receta no encontrada");
    }
    return updated;
}

export async function removeRecipe(id) {
    const deleted = await deleteRecipeData(id);
    if (!deleted) {
        throw createHttpError(404, "Receta no encontrada");
    }
    return true;
}
