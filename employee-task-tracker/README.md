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

### Screenshots of the Project
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/18f0d35e-ac1d-45ab-94bb-82879782762e" alt="Screenshot 1" width="400"></td>
    <td><img src="https://github.com/user-attachments/assets/6cfb71e5-91bf-4215-89c1-ca52fdab2e8b" alt="Screenshot 2" width="400"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2b1b3bc0-b548-465c-921a-6fc45a4bb1bf" alt="Screenshot 3" width="400"></td>
    <td><img src="https://github.com/user-attachments/assets/9cbb485c-e0eb-4e5f-b507-b5f21e9be753" alt="Screenshot 4" width="400"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/1892279f-4322-4e7f-a98b-95fba867c4c5" alt="Screenshot 5" width="400"></td>
  </tr>
</table>



