const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid, etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });