# ATOM Backend (DDD + Firebase + Express)
Este es el backend del proyecto ATOM, construido con **Node.JS**, **TypeScript**, **Express**, y **Firebase Functions**, siguiendo una arquitectura **DDD (Domain-Driven Design)** 

# Tecnologías utilizadas

- Node.js + Express
- TypeScript
- Firebase Admin SDK (Firestore + Auth)
- JWT (JSON Web Tokens)
- Jest (para pruebas unitarias)
- ts-jest + dotenv para entorno de test
- Arquitectura **DDD** (Domain-Driven Design)

- ## Estructura del proyecto

- functions/
│
├── config/ # Archivos .env y serviceAccountKey.json (NO en GitHub)
├── src/
│ ├── app.ts # Inicialización de Express
│ ├── index.ts # Punto de entrada principal
| ├── application
|      ├── use-cases
|        ├── auth
|        ├── tasks
|  ├── domain
|      ├── interfaces
|  ├── infraestructure
|      ├── firebase
|      ├── http
|           ├── controllers
|      ├── routes
|      ├── middlewares      
│ └── tests/ # Pruebas unitarias

## Configuración inicial
1. instalar dependencias en terminal y ubicado en el proyecto
npm install

3. agergar variables de enterno en los env de /config
- config/development.env
- config/staging.env
- config/production.env

Ejemplo:
PORT=3000
JWT_SECRET=your_test_jwt_secret
SERVICE_ACCOUNT_PATH=./config/serviceAccountKey.json

4. Agregar en /confi la clave generada de firebase admin console
   -functions/config/serviceAccountKey.json ( incluirlo en el .gitignore)
5. ejecutar proyecto:
- npx ts-node src/index.ts (para modo desarrollo)
- ng test --watch=false (para pruebas)

## ENDPOINTS

POST /api/auth/signup
POST /api/auth/signin
GET /api/auth/getMe

POST /api/tasks -Crear task
PATCH /api/tasks/?:id/status -cambiar estatus de una tarea
GET /api/task/?status=pending&assignedTo= :id/ - Requiere JWT
PUT /api/task/:id - Editar estado
DELETE /api/task/:id

## Documentación de la API
https://documenter.getpostman.com/view/19671366/2sB2x8DqxJ

## Frontend Repository
github.com/Thealexander/frontend_atom

## Testing Server
