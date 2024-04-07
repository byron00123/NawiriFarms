const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000; // Or any port you prefer

// Parse incoming request bodies (form data)
app.use(bodyParser.urlencoded({ extended: false }));

// Configure Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your preferred email service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// Route to handle form submission
app.post('/sendEmail', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: email,
      to: 'byron.lekas@gmail.com', // Replace with the recipient email
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
