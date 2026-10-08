const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static(path.join(__dirname, 'public')));

// ---- Temporary in-memory storage ----
// NOTE: this resets every time the server restarts.
// In a real app you'd replace this with a database.
let submissions = [];

// ---- Server-side validation function ----
function validateRegistration(data) {
  const errors = {};

  // Name: required, letters/spaces only, min 2 chars
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (!/^[A-Za-z\s]+$/.test(data.name.trim())) {
    errors.name = 'Name can only contain letters and spaces.';
  }

  // Email: required, basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  // Age: required, must be a number between 1 and 120
  const age = Number(data.age);
  if (!data.age || Number.isNaN(age) || age < 1 || age > 120) {
    errors.age = 'Age must be a number between 1 and 120.';
  }

  // Password: required, min 6 characters
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long.';
  }

  // Contact number: required, 10 digits only
  const phoneRegex = /^[0-9]{10}$/;
  if (!data.phone || !phoneRegex.test(data.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit contact number.';
  }

  return errors;
}

// ---- Routes ----

// GET: show the form
app.get('/', (req, res) => {
  res.render('index', { errors: {}, old: {} });
});

// POST: handle form submission
app.post('/register', (req, res) => {
  const { name, email, age, password, phone } = req.body;
  const errors = validateRegistration({ name, email, age, password, phone });

  if (Object.keys(errors).length > 0) {
    // Re-render form with errors and previously entered values
    return res.render('index', {
      errors,
      old: { name, email, age, phone } // never echo back the password
    });
  }

  // Validation passed -> store temporarily
  const record = {
    id: submissions.length + 1,
    name: name.trim(),
    email: email.trim(),
    age: Number(age),
    phone: phone.trim(),
    submittedAt: new Date().toLocaleString()
  };
  submissions.push(record);

  res.render('success', { record });
});

// GET: view all temporarily stored submissions (for demo/debug purposes)
app.get('/submissions', (req, res) => {
  res.render('submissions', { submissions });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
