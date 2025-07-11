<!-- @format -->

# Note Board App

A simple MERN (MongoDB, Express, React, Node.js) app for taking notes with full CRUD functionality.

---

## Features

- View all notes
- Create, edit, delete notes
- View note details
- Responsive, minimal UI

---

## Tech Stack

- Frontend: React, Axios, React Router
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)

---

## Setup

### 1. Clone

```
git clone https://github.com/bzdsl/note-project.git
cd note-project
```

---

### 2. Backend

```
cd backend
npm install
```

Create `.env`:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start server:

```
npm start
```

---

### 3. Frontend

```
cd ../frontend
npm install
npm run dev
```

---

## API Endpoints

- `GET /api/notes`
- `GET /api/notes/:id`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

---

## License

MIT
