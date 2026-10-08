# Task Manager — REST API + Front-End Integration

A simple full-stack Task Manager built to demonstrate server-client communication through a RESTful API: an Express back-end exposing full CRUD endpoints, and a vanilla JavaScript front-end that fetches and displays that data live.

**Live demo:** https://task-manager-nl0z.onrender.com/

## Features

- Full CRUD REST API (Create, Read, Update, Delete tasks)
- Front-end fetches and renders data from the API on load — no hardcoded data in the browser
- Add, complete/uncomplete, rename, and delete tasks, all without a page refresh
- Basic input validation and error handling on both server and client

## Tech stack

- **Back-end:** Node.js, Express
- **Front-end:** HTML, CSS, vanilla JavaScript (`fetch` API)
- **Storage:** In-memory array (resets on server restart — see [Limitations](#limitations))

## Project structure

```
task5-api/
├── server.js          # Express server + REST API routes
├── package.json        # Project metadata and dependencies
├── package-lock.json    # Exact locked dependency versions
└── public/
    └── index.html      # Front-end UI (fetches from the API)
```

## API endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|---------------------------------------|
| GET    | `/api/tasks`      | Get all tasks                         |
| GET    | `/api/tasks/:id`  | Get a single task by ID               |
| POST   | `/api/tasks`      | Create a new task                     |
| PUT    | `/api/tasks/:id`  | Update a task's title and/or status   |
| DELETE | `/api/tasks/:id`  | Delete a task                         |

**Example — create a task:**
```bash
curl -X POST https://task-manager-nl0z.onrender.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write project README"}'
```

**Example task object:**
```json
{
  "id": 1,
  "title": "Learn Express basics",
  "completed": true
}
```

## Running it locally

**Requirements:** [Node.js](https://nodejs.org) installed (v18 or later recommended).

```bash
# 1. Clone or unzip the project, then move into it
cd task5-api

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Then open **http://localhost:3000** in your browser.

## Deployment

This project is deployed on [Render](https://render.com) as a Node web service:

- **Build command:** `npm install`
- **Start command:** `npm start`

The server reads the port from `process.env.PORT` (falling back to `3000` locally), which is required for hosting platforms like Render that assign their own port at runtime.

## Limitations

- **Data is not persisted.** Tasks are stored in a plain in-memory array, so the list resets to the three starter tasks whenever the server restarts or redeploys. Swap in a real database (SQLite, PostgreSQL, MongoDB, etc.) to persist data across restarts.
- **No authentication.** Anyone with the URL can add, edit, or delete tasks — fine for a learning project, not for production use as-is.

## License

This project was created for educational purposes as part of a course assignment on API integration and front-end interaction.
