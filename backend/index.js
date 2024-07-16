const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const secretKey = 'SEkRetKeY';
const cors = require('cors');
const bcrypt = require('bcrypt')

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); 

mongoose.connect('mongodb://localhost:27017/quantumITassignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user, email ,password)
    if (user) {
      const token = jwt.sign({ user }, secretKey, { expiresIn: '1d' });
      console.log(token)
      const match = await bcrypt.compare(password, user.password)
      console.log(match)
      if(match)
    {  res.json({status:'success', token });
      
    }
    else{
      res.json({
        error:'wrong password'
      })
    }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/register', async (req, res) => {
  var{ name, email, password, dob } = req.body;
  const salt = await bcrypt.genSalt(10);
password = await bcrypt.hash(password, salt)
console.log(password);
 
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ name, email, password, dob });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });
console.log(user._id)
    // Send response
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
