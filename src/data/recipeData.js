import { ObjectId } from "mongodb";
import { getDb } from "./connection.js";

function getCollection() {
    return getDb().collection("recipes");
}

function mapRecipe(doc) {
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };
}

function toObjectId(id) {
    return ObjectId.isValid(id) && String(id).length === 24 ? new ObjectId(id) : null;
}

export async function getAllRecipes({ category } = {}) {
    const filter = {};
    if (category) filter.category = String(category);
    const recipes = await getCollection()
        .find(filter, { collation: { locale: "es", strength: 2 } })
        .toArray();
    return recipes.map(mapRecipe);
}

export async function getRecipeById(id) {
    const _id = toObjectId(id);
    if (!_id) return null;
    const recipe = await getCollection().findOne({ _id });
    return mapRecipe(recipe);
}

export async function createRecipe(recipeData) {
    const doc = { ...recipeData, createdAt: new Date() };
    const { insertedId } = await getCollection().insertOne(doc);
    return { id: insertedId.toString(), ...doc };
}

export async function updateRecipe(id, recipeData) {
    const _id = toObjectId(id);
    if (!_id) return null;
    const updated = await getCollection().findOneAndReplace({ _id }, recipeData, { returnDocument: "after" });
    return mapRecipe(updated);
}

export async function deleteRecipe(id) {
    const _id = toObjectId(id);
    if (!_id) return false;
    const { deletedCount } = await getCollection().deleteOne({ _id });
    return deletedCount === 1;
}
