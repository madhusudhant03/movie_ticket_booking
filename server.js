// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/moviebooking', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB (moviebooking)'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Define Signup Schema and Model
// const signupSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const Signup = mongoose.model('signup', signupSchema); // Using "signup" collection

// // Handle Signup
// app.post('/signup', async (req, res) => {
//   try {
//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     // Create a new user
//     const newUser = new Signup({
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     // Save to the database
//     await newUser.save();
//     res.send('Signup successful! You can now log in.');
//   } catch (err) {
//     if (err.code === 11000) {
//       res.status(400).send('Email already exists. Please try a different one.');
//     } else {
//       res.status(500).send('Error during signup. Please try again.');
//     }
//   }
// });

// // Handle Login
// app.post('/login', async (req, res) => {
//   try {
//     // Find user by email
//     const user = await Signup.findOne({ email: req.body.email });

//     if (user && (await bcrypt.compare(req.body.password, user.password))) {
//       res.send('Login successful!');
//     } else {
//       res.status(401).send('Invalid email or password.');
//     }
//   } catch (err) {
//     res.status(500).send('Error during login. Please try again.');
//   }
// });

// // Start Server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const loginRouter = require('./routes/login'); // Correct path to login.js
const signupRouter = require('./routes/signup'); // Correct path to signup.js

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/moviebooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB (moviebooking)'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.urlencoded({ extended: true }));  // For form data
app.use(express.json());  // For JSON data

// Routes
app.use('/login', loginRouter); // This handles POST for /login
app.use('/signup', signupRouter); // This handles POST for /signup

// Serve the home page (or any other static HTML) for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
