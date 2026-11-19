# FitBite Backend

API REST hecha con Node.js, Express y MongoDB para manejar usuarios, productos y recetas de FitBite (TP2 - ORT).

## Como correrlo

```bash
npm install
```

Crear un `.env` en la raiz copiando `.env.example` y completando `PORT`, `MONGODB_URI` y `SECRET`.

```bash
npm run start-dev
```

## Estructura en capas

- `src/routes`: rutas y middleware de autenticacion (`authMiddleware`).
- `src/controllers`: lectura de `req`, llamadas a services y respuestas HTTP.
- `src/services`: validaciones y logica de negocio.
- `src/data`: conexion Singleton a MongoDB (`sample_tp2`) y consultas.

## Endpoints principales

### Usuarios (`/api/users`)
- `POST /api/users/register`: registra usuario con clave hasheada (`bcrypt`)
- `POST /api/users/login`: valida credenciales y devuelve usuario + token JWT
- `GET /api/users`: lista usuarios (con Bearer Token)
- `GET /api/users/:id`: busca un usuario por id

### Recetas (`/api/recipes`)
- `GET /api/recipes`: lista recetas (acepta `?category=Desayunos`)
- `GET /api/recipes/:id`: busca una receta por id
- `POST /api/recipes`: crea una receta (con Bearer Token)
- `PUT /api/recipes/:id`: actualiza una receta (con Bearer Token)
- `DELETE /api/recipes/:id`: elimina una receta (con Bearer Token)

### Productos (`/api/products`)
- `GET /api/products`: lista productos (acepta `?category=` y `?brand=`)
- `GET /api/products/:id`: busca un producto por id
- `POST /api/products`: crea un producto (con Bearer Token)
- `PUT /api/products/:id`: actualiza un producto (con Bearer Token)
- `DELETE /api/products/:id`: elimina un producto (con Bearer Token)

## Ejemplo para `POST /api/recipes`

```json
{
  "title": "Wok de Pollo y Vegetales",
  "category": "Almuerzos",
  "calories": 410,
  "timeMinutes": 20,
  "ingredients": ["200g pollo", "1 morron", "100g brocoli"],
  "instructions": "Saltear el pollo y agregar los vegetales."
}
```
