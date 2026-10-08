# Task 2: Inline Styles, Basic Interaction, and Server-Side Validation

A Node.js + Express project demonstrating server-side rendering (EJS), inline
client-side JavaScript validation, server-side validation, and temporary
in-memory data storage.

**Live demo:** https://task2-registration-form.onrender.com/

> Note: This is hosted on Render's free tier, so the server may take ~30
> seconds to wake up if it has been idle. Stored submissions are also kept in
> memory only, so they reset whenever the server restarts or redeploys.

## Objective

Expand inline styles and introduce server-side validation for form
submissions.

## Features

- Registration form with Name, Email, Age, Contact Number, and Password fields
- Inline CSS styling (Times New Roman font, light blue background)
- Inline JavaScript for instant client-side validation
- Server-side validation as a backup (re-checks all fields even if
  client-side JS is bypassed or disabled)
- Temporary in-memory storage of validated submissions
- A `/submissions` page to view everything stored so far

## Tech Stack

- Node.js
- Express
- EJS (Embedded JavaScript templates)

## Project Structure

```
Task-2-Registration-Validation/
├── server.js           # Express app, routes, validation logic, in-memory storage
├── package.json
├── views/
│   ├── index.ejs        # Registration form (inline CSS + inline JS validation)
│   ├── success.ejs       # Confirmation page after a valid submission
│   └── submissions.ejs   # Lists all temporarily stored submissions
└── public/               # Static assets (currently unused/empty)
```

## Running Locally

1. Install [Node.js](https://nodejs.org/) if you don't already have it.
2. Clone or download this repository.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Validation Rules

| Field           | Rule                                      |
|-----------------|--------------------------------------------|
| Name            | Letters and spaces only, min 2 characters |
| Email           | Must match a valid email format           |
| Age             | Number between 1 and 120                  |
| Contact Number  | Exactly 10 digits                         |
| Password        | Minimum 6 characters                      |

Validation runs twice: once instantly in the browser via inline JavaScript,
and again on the server (in `server.js`) before anything is stored — since
client-side checks can always be bypassed.

## Deployment

This project is deployed on [Render](https://render.com):

- **Build Command:** `npm install`
- **Start Command:** `npm start`
- The server listens on `process.env.PORT`, falling back to `3000` for local
  development, since Render assigns its own port dynamically.

## Data Storage

Submitted data is stored temporarily in an in-memory array on the server.
This means:
- It resets on every server restart or redeploy.
- It is not shared across multiple server instances.
- It is intended for learning/demo purposes only — a real application would
  use a database (e.g. SQLite, PostgreSQL, MongoDB) instead.
