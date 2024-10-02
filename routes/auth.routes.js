const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const fileUploader = require('../config/cloudinary.config');

const { isAuthenticated } = require("../middlesware/jwt.middleware");
const router = express.Router();
const saltRounds = 10;

//user signup

router.post('/signup', async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;

  // Check if the required fields are provided
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({ message: "Provide Email, Password, First Name, and Last Name." });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Provide a valid email address.' });
  }

  // Password validation
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: 'Password must have at least 6 characters, and contain at least one number, one lowercase, and one uppercase letter.',
    });
  }

  try {
    // Check if the email already exists in the database
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });

    // Send response with the newly created user (excluding password)
    const { _id } = newUser;
    res.status(201).json({ user: { email, firstname, lastname, _id } });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

  // admin signup

  router.post('/admin/signup', async (req, res, next) => {
    const { email, password, firstname, lastname } = req.body;
  
    // Check if the required fields are provided
    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ message: "Provide email, password, firstame, and lastname." });
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Provide a valid email address.' });
    }
  
    // Password validation
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must have at least 6 characters, and contain at least one number, one lowercase, and one uppercase letter.',
      });
    }
  
    try {
      // Check if the email already exists in the database
      const foundUser = await User.findOne({ email });
  
      if (foundUser) {
        return res.status(400).json({ message: "User already exists." });
      }
  
      // Hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      // Create a new user with isAdmin set to true
      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        isAdmin: true,
      });
  
      // Remove sensitive information from the response
      const { _id, isAdmin } = newUser;
      const user = { email, firstname, lastname, _id, isAdmin };
  
      // Send the response back with the created user (without password)
      res.status(201).json({ user });
    } catch (error) {
      console.error('Error during admin sign-up:', error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  // ====>> Update profile

  router.put('/profile/:userId/edit', async (req, res, next) => {

    const {userId} = req.params;
    const { email, password, firstname, lastname } = req.body;
   
    // Check if the email or password or name is provided as an empty string 
    if (email === '' || firstname === '' || !lastname) {
      res.status(400).json({ message: "Provide email, firstname and lastname" });
      return;
    }
   
    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Provide a valid email address.' });
      return;
    }
    
    // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (password && !passwordRegex.test(password)) {
      res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
      return;
    }

   
   try {
        const existingUser = await User.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
            res.status(400).json({ message: "User already exists." });
            return;
          }
          const updatedFields = { email, firstname, lastname };

          if (password) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);
            updatedFields.password = hashedPassword;
          }

          const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });
          const { _id, email: updatedEmail, firstname: updatedFirstname, lastname: updatedLastname } = updatedUser;
          res.status(200).json({ user: { _id, email: updatedEmail, firstname: updatedFirstname, lastname: updatedLastname } });
   } catch (error) {
        console.log(err)
   }
  });

    //==>>  login

    router.post('/login', async (req, res) => {
      const { email, password } = req.body;
    
      // Check if email or password is missing
      if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password." });
      }
    
      try {
        // Check if the user with the given email exists
        const foundUser = await User.findOne({ email });
    
        if (!foundUser) {
          return res.status(401).json({ message: "User not found." });
        }
    
        // Compare the provided password with the hashed password in the database
        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
    
        if (!passwordCorrect) {
          return res.status(401).json({ message: "Incorrect password." });
        }
    
        // Deconstruct the user object to create the token payload
        const { _id, email: userEmail, firstname, lastname, isAdmin } = foundUser;
        const payload = { _id, email: userEmail, firstname, lastname, isAdmin };
    
        // Create and sign the JWT token
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" } // Token expires in 6 hours
        );
    
        // Send the token as the response
        return res.status(200).json({ authToken });
    
      } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    });


router.get('/verify', isAuthenticated, (req, res, next) => {       // <== CREATE NEW ROUTE
 
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
 
  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;
