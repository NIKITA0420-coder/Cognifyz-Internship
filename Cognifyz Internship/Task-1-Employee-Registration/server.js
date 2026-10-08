const express = require('express');
const app = express();
const PORT = 3001;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Temporary in-memory storage
let submissions = [];
let nextId = 1;

// Route 1: Show the form
app.get('/', (req, res) => {
  res.render('index', { title: 'User Details Form' });
});

// Route 2: Handle form submission — save it with a unique ID
app.post('/submit', (req, res) => {
  const { name, email, department, phone } = req.body;

  const newEntry = { id: nextId, name, email, department, phone };
  submissions.push(newEntry);
  nextId++;

  res.redirect(`/submissions/${newEntry.id}`);
});

// Route 3: Show ONE specific submission by its unique ID
app.get('/submissions/:id', (req, res) => {
  const entry = submissions.find(s => s.id === parseInt(req.params.id));

  if (!entry) {
    return res.status(404).send('Submission not found');
  }

  res.render('result', { entry });
});

// Route 4: Show ALL submissions (list view)
app.get('/submissions', (req, res) => {
  res.render('all-submissions', { submissions });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});