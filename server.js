const express = require('express');
const { connect } = require('mongoose');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
//Connect DB
connectDB();

//Init Middleware
//To allow the req.body to be parse as a JSON
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	//Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//This process.env.PORT is to connect to the heroku port when its being deployed
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
