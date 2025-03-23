var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);

module.exports = app;
