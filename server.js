const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const config = require('./config');
const cardsRoutes = require('./routes/cards-routes');
const pagesRoutes = require('./routes/pages-routes');
const userRoutes = require('./routes/users-routes');
const mailer = require('./mailer/mailer');

const PORT = config.server.PORT;
const URL = config.database.url;
const SECRET_KEY = config.secret;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'ejs-views'))

app.use(express.static(path.resolve(__dirname, "public")));

app.use(cookieParser());
app.use(express.json());

app.use(cardsRoutes);
app.use(pagesRoutes);
app.use(userRoutes);

app.use(mailer);



mongoose
 .connect(URL)
 .then(() => console.log('Connected to MongoDB'))
 .catch((err) => console.log(`Connection failed: ${err}`));


app.listen(PORT, (err) => {
    err ? console.log(error) : console.log("server started");
})
