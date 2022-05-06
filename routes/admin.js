const express = require('express');
const Admin = require('../models/admin');
const router = express.Router();

// ROUTE 1: Create a Admin
router.post('/adminsignup',async (req, res) => {
    let success=false;
  try {
    // Check whether the user with this email exists already
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    // Create a new user
    user = await Admin.create({
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

// ROUTE 2: Authenticate a Admin
router.post('/adminlogin',async (req, res) => {
  let success = false;

  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    if (password != admin.password) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const id = admin.id;
    success = true;
    res.json({ success, id })
  } catch (error) {
    res.status(500).json({ "Server Error": error.message });
  }
})
module.exports = router