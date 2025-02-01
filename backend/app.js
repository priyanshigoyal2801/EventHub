const express = require('express');
const app = express();
const userModel= require("./models/users");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  const { name, email, password, type } = req.body;
  const user= await userModel.findOne({ email });
  if(user)
    return res.status(400).send('User already exists');

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const user= await userModel.create({
        name,
        email,
        type,
        password: hash
      });

      const token= jwt.sign({email:email, id: user._id }, process.env.JWT_SECRET);
      res.cookie("token",token);
      res.send("registered");
    })
  })
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user= await userModel.findOne({ email });
  if(!user)
    return res.status(400).send('User does not exist');

  bcrypt.compare(password, user.password, (err, result) => {
    if(!result)
        return res.status(400).send('Invalid credentials');
    const token= jwt.sign({email:email, id: user._id }, process.env.JWT_SECRET);
    res.cookie("token",token);
    res.send("logged in");
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie("token");
  res.send("logged out");
});


app.listen(3000);