import { findAllUsers, findUserById, registerUser, findByCredentials } from "../data/userData.js";

function createHttpError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

// Nunca devolver el password (ni siquiera hasheado)
function sanitizeUser(user) {
    const { password, ...rest } = user;
    return rest;
}

export async function listUsers() {
    const users = await findAllUsers();
    return users.map(sanitizeUser);
}

export async function getUserById(id) {
    const user = await findUserById(id);
    if (!user) {
        throw createHttpError(404, "Usuario no encontrado");
    }
    return sanitizeUser(user);
}

export async function registerUserService({ name, email, password }) {
    const cleanName = String(name || "").trim();
    const cleanEmail = String(email || "").trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
        throw createHttpError(400, "Name, email y password son obligatorios");
    }

    try {
        return await registerUser({ name: cleanName, email: cleanEmail, password });
    } catch (error) {
        if (error.message === "El email ya esta registrado") {
            throw error;
        }
        console.error("Error al registrar:", error.message);
        throw new Error("Error al registrar el usuario");
    }
}

export async function loginUserServices(email, password) {
    const cleanEmail = String(email || "").trim().toLowerCase();
    const user = await findByCredentials(cleanEmail, password);
    if (!user) {
        throw new Error("Credenciales inválidas");
    }
    // No deberiamos devolver la contraseña
    const { password: _pw, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
