# Employee Registration System

A simple Node.js + Express web app that demonstrates server-side rendering with EJS. Users submit their details through a form, and the server saves each submission with a unique ID and its own shareable page.

Built as part of the Cognifyz Web Development Internship — Level 1 (Task 1: HTML Structure & Basic Server Interaction, extended with elements of Task 2: temporary server-side storage).

## Features

- HTML form for collecting user details: **Name, Email, Department, Phone Number**
- Express server handling form submissions via POST
- Server-side rendering with EJS (no client-side frameworks)
- Each submission gets a unique URL (e.g. `/submissions/1`, `/submissions/2`)
- A list view (`/submissions`) showing all submissions made so far
- Temporary in-memory storage (data resets when the server restarts — no database used)

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express** — web server framework
- **EJS** — templating engine for server-side HTML rendering
- **CSS** — basic styling (no framework)

## Project Structure

```
Task1/
├── views/
│   ├── index.ejs              # Form page
│   ├── result.ejs             # Single submission result page
│   └── all-submissions.ejs    # List of all submissions
├── public/
│   └── style.css              # Styling
├── server.js                  # Express server & routes
├── package.json
└── README.md
```

## Local Server

This app runs locally on your own machine — it is not hosted online.

**URL:** [http://localhost:3001](http://localhost:3001)

- Server default port: **3001**
- If port 3001 is already in use, change the `PORT` constant at the top of `server.js` to a free port (e.g. `3002`), then use `http://localhost:3002` instead.
- The server must be running (`node server.js`) for this URL to work — closing the terminal stops the app.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine

### Installation

1. Clone or download this repository
2. Open a terminal in the project folder
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

```bash
node server.js
```

You should see:
```
Server running at http://localhost:3001
```

Open your browser and go to:
```
http://localhost:3001
```

## Usage

1. Fill in the form with your Name, Email, Department, and Phone Number
2. Click **Submit**
3. You'll be redirected to a unique page for your submission (e.g. `/submissions/1`)
4. Visit `/submissions` at any time to see a list of everyone who has submitted, with links to each entry

## Routes

| Method | Route              | Description                          |
|--------|---------------------|---------------------------------------|
| GET    | `/`                 | Displays the submission form          |
| POST   | `/submit`           | Handles form submission, saves entry  |
| GET    | `/submissions/:id`  | Shows one specific submission by ID   |
| GET    | `/submissions`      | Lists all submissions                 |

## Notes

- Data is stored **temporarily in server memory** (a JavaScript array) — it is not persisted to a database or file, so all submissions are lost when the server restarts.
- If port `3001` is already in use on your machine, change the `PORT` constant at the top of `server.js` to a free port.

## Possible Next Steps

- Add client-side and server-side validation for form fields
- Persist submissions to a real database (e.g. MongoDB, SQLite)
- Add the ability to edit or delete a submission
- Add authentication for viewing the submissions list

## Author

Built by T. Nikita as part of the Cognifyz Internship program.
