const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection string
const uri = 'mongodb+srv://kevinbiju000:bijujoseph12345@cluster0.juc3gzl.mongodb.net/'; // Replace with your database name

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define a User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // In a real application, don't store passwords in plain text
});

const User = mongoose.model('User', userSchema);

// Define a Patient schema
const PatientSchema = new mongoose.Schema({
  Patient_ID: { type: String, required: true },
  Name: { type: String, required: true },
  Age: { type: Number, required: true },
  Gender: { type: String, required: true },
  Address: { type: String, required: true },
  Diagnosis: { type: String, required: true },
  Treatment_Date: { type: Date, required: true },
  Treatment_Cost: { type: Number, required: true },
  Insurance_Company: { type: String, required: true },
  Insurance_Policy_Number: { type: String, required: true },
  Claim_Amount: { type: Number, required: true }
});

const Patient = mongoose.model('Patient', PatientSchema);

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// New route for patient details
app.post('/api/patient-details', async (req, res) => {
  const { Patient_ID, Name, Age, Gender, Address, Diagnosis, Treatment_Date, Treatment_Cost, Insurance_Company, Insurance_Policy_Number, Claim_Amount } = req.body;

  try {
    const patient = new Patient({
      Patient_ID,
      Name,
      Age,
      Gender,
      Address,
      Diagnosis,
      Treatment_Date,
      Treatment_Cost,
      Insurance_Company,
      Insurance_Policy_Number,
      Claim_Amount
    });
    
    await patient.save();
    res.status(201).json({ message: 'Patient details saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving patient details', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
