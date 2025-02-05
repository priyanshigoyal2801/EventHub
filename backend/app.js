const express = require('express');
const multer = require('multer');
const app = express();
const tableModel = require("./models/table");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { jwtDecode } = require('jwt-decode');
require('dotenv').config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  const { name, email, password, type } = req.body;
  const user = await userModel.findOne({ email });
  if (user)
    return res.status(400).send('User already exists');

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const user = await userModel.create({
        name,
        email,
        type,
        password: hash
      });

      const token = jwt.sign({ email: email, id: user._id, type: user.type }, process.env.JWT_SECRET);
      res.cookie("token", token, { sameSite: "strict" });
      res.send("registered");
    })
  })
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user)
    return res.status(400).send('User does not exist');

  bcrypt.compare(password, user.password, (err, result) => {
    if (!result)
      return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ email: email, id: user._id, type: user.type }, process.env.JWT_SECRET);
    res.cookie("token", token, { sameSite: "strict" });
    res.json({ message: "Logged in successfully", token });
  });
});

app.post('/user', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('No token provided');
  }
  try {
    const decoded = jwtDecode(token);
    res.json({ decoded });
  } catch (error) {
    res.status(400).send('Invalid token');
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie("token");
  res.send("logged out");
});

// Handle image upload and table creation
app.post('/table', upload.single('logo'), async (req, res) => {
  try {
    const { eventName, orgName, dateFrom, dateTill, venue, timeFrom, timeTill, registrationformlink, feedbackformlink, pocNumber, socials } = req.body;
    
    // Handle logo upload - Multer stores the logo as a buffer in req.file.buffer
    const logoBuffer = req.file ? req.file.buffer : null; // Ensure a logo file is provided

    if (!logoBuffer) {
      return res.status(400).send('Logo is required');
    }

    await tableModel.create({
      eventName,
      orgName,
      dateFrom,
      dateTill,
      venue,
      timeFrom,
      timeTill,
      registrationformlink,
      feedbackformlink,
      pocNumber,
      logo: logoBuffer, // Store the logo as a Buffer in MongoDB
      socials: JSON.parse(socials), // Parse socials (since it's passed as a string in the request body)
    });

    res.send("table created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating table");
  }
});

app.get('/table', async (req, res) => {
  try {
    const table = await tableModel.find({});
    res.json(table);
  } catch (error) {
    res.status(500).send("Error fetching tables");
  }
});

app.delete('/table/:id', async (req, res) => {
  try {
    await tableModel.findByIdAndDelete(req.params.id);
    res.send("table deleted");
  } catch (error) {
    res.status(500).send("Error deleting table");
  }
});

app.listen(3000, () => { console.log("Server started at 3000") });
