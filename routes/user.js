const express = require('express');
const User = require('../models/users');
const router = express.Router();


// ROUTE 1: Create a User
router.post('/usersignup',async (req, res) => {
    let success=false;
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });

    success = true;
    res.json({ success });
  } catch (error) {
    res.status(500).json({ "Server Error": error.message });
  }
})

// ROUTE 2: Authenticate a User
router.post('/userlogin',async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    if (password != user.password) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const id = user.id;
    success = true;
    res.json({ success, id })
  } catch (error) {
    res.status(500).json({ "Server Error": error.message });
  }
})
module.exports = router