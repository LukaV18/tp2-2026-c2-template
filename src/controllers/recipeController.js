import {
    listRecipes,
    findRecipeById,
    addRecipe,
    replaceRecipe,
    removeRecipe,
} from "../services/recipeService.js";

function handleServiceError(error, res, next) {
    if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
    }
    next(error);
}

export async function getRecipes(req, res, next) {
    try {
        const { category } = req.query;
        const recipes = await listRecipes({ category });
        res.status(200).json({ data: recipes });
    } catch (error) {
        handleServiceError(error, res, next);
    }
}

export async function getRecipe(req, res, next) {
    try {
        const { id } = req.params;
        const recipe = await findRecipeById(id);
        res.status(200).json({ data: recipe });
    } catch (error) {
        handleServiceError(error, res, next);
    }
}

export async function createRecipe(req, res, next) {
    try {
        const recipe = await addRecipe(req.body);
        res.status(201).json({ message: "Receta creada", data: recipe });
    } catch (error) {
        handleServiceError(error, res, next);
    }
}

export async function updateRecipe(req, res, next) {
    try {
        const { id } = req.params;
        const recipe = await replaceRecipe(id, req.body);
        res.status(200).json({ message: "Receta actualizada", data: recipe });
    } catch (error) {
        handleServiceError(error, res, next);
    }
}

export async function deleteRecipe(req, res, next) {
    try {
        const { id } = req.params;
        await removeRecipe(id);
        res.status(204).send();
    } catch (error) {
        handleServiceError(error, res, next);
    }
}
