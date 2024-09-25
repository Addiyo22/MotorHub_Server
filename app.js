// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow cookies if you're using them for sessions
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Define allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Define allowed headers
  }));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRouter = require("./routes/auth.routes");     
app.use("/auth", authRouter); 

const adminRoutes = require("./routes/admin.routes");     
app.use("/", adminRoutes); 

const userRoutes = require("./routes/user.routes");     
app.use("/", userRoutes); 

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
