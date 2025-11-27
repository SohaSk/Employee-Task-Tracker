# Employee Task Tracker

This is a simple fullstack project (React frontend + Node/Express backend + Sequelize + SQLite) for managing employees and tasks.

## Quickstart (local)

### Backend
1. Open a terminal:
```bash
cd backend
cp .env.example .env
npm install
# run migrations and seed (optional)
npm run migrate
npm run seed
npm start
```
Server will run at `http://localhost:4000` and API base is `http://localhost:4000/api`.

### Frontend
1. Open another terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Vite dev server runs at `http://localhost:5173` by default.

### Notes
- The backend uses SQLite by default (file `database.sqlite` created in backend folder).
- If you change DB settings, update `backend/.env.example`.
- API endpoints:
  - `GET /api/employees`
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `PUT /api/tasks/:id`
  - etc.


