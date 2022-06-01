const express = require('express');
const { connect } = require('mongoose');
const connectDB = require('./config/db');
const app = express();

//Connect DB
connectDB();

//Init Middleware
//To allow the req.body to be parse as a JSON
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

//This process.env.PORT is to connect to the heroku port when its being deployed
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
