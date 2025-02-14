const express = require('express');
const multer = require('multer');
const app = express();
const userModel = require("./models/users");
const tableModel = require("./models/table");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { jwtDecode } = require('jwt-decode');
require('dotenv').config();

const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(fileupload({
  useTempFiles: true
}));

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
app.post('/table', async (req, res) => {
  if (!req.files || !req.files.logo || !req.files.proposal) {
    return res.status(400).send('Please upload both logo and proposal files');
  }

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('No token provided');
  }
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  try {
    // Upload logo
    const logoUpload = await cloudinary.uploader.upload(req.files.logo.tempFilePath)
      .catch(err => {
        throw new Error(`Logo upload failed: ${err.message}`);
      });

    // Upload proposal
    const proposalUpload = await cloudinary.uploader.upload(req.files.proposal.tempFilePath, {
      resource_type: "raw",
      timeout: 120000
    }).catch(err => {
      throw new Error(`Proposal upload failed: ${err.message}`);
    });

    const { 
      eventName, orgName, dateFrom, dateTill, 
      venue, timeFrom, timeTill, registrationformlink, 
      feedbackformlink, pocNumber, socials, description 
    } = req.body;

    const tableData = await tableModel.create({
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
      logo: logoUpload.url,
      socials: JSON.parse(socials),
      description,
      proposal: proposalUpload.url,
      userId,
    });

    res.status(200).json({
      message: "Table created successfully",
      data: tableData
    });

  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({
      error: "Error creating table",
      details: error.message
    });
  } finally {
    // Clean up temp files if they exist
    if (req.files?.logo?.tempFilePath) {
      fs.unlink(req.files.logo.tempFilePath, (err) => {
        if (err) console.error('Error deleting logo temp file:', err);
      });
    }
    if (req.files?.proposal?.tempFilePath) {
      fs.unlink(req.files.proposal.tempFilePath, (err) => {
        if (err) console.error('Error deleting proposal temp file:', err);
      });
    }
  }
});

app.get('/society/table', async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('No token provided');
  }
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  //console.log(userId);
  try {
    const table = await tableModel.find({ userId });
    //console.log(table);
    res.json(table);
  } catch (error) {
    res.status(500).send("Error fetching tables");
  }
});

app.get('/table', async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};

    if (type === "dashboard") {
      query = { approval: { $regex: /^Approved$/i } };
    }

    //console.log("Fetching events with query:", query);
    const table = await tableModel.find(query);
    //console.log("Events fetched:", table);

    res.json(table);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Error fetching tables", details: error.message });
  }
});

app.put('/table/:id/approval', async (req, res) => {
  const { approval } = req.body;

  try {
    const table = await tableModel.findByIdAndUpdate(
      req.params.id,
      { approval },
      { new: true }
    );

    if (!table) {
      return res.status(404).send("Table not found");
    }

    res.json({
      message: "Approval status updated successfully",
      data: table,
    });
  } catch (error) {
    console.error("Error updating approval status:", error);
    res.status(500).json({
      error: "Error updating approval status",
      details: error.message,
    });
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
