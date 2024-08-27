import express from "express";
import { configDotenv } from "dotenv";
import flash from "connect-flash";
import session from "express-session";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import employeeRouter from "./routes/employee.routes.js";

configDotenv();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    autoCreate: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Flash middleware (must be placed after session middleware)
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use(employeeRouter);

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
