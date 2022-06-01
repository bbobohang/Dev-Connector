const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//User model
const User = require('../../models/User');

//Express validator to use to check if the params passed in is correct
//https://express-validator.github.io/docs/
const { check, validationResult } = require('express-validator/');

// @route POST api/users
// @descr Register User to DB
// @acess Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Password too short').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			//Check if user exist
			let user = await User.findOne({ email: email }); //findOne({ email })

			if (user) {
				console.log('user exists');
				return res.status(400).json({ errors: [{ msg: 'User already exists' }] }); // This is just to make sure the error format displayed is the same as above when registering fails
			}
			//Get user gravatar, this gravatar is tagged to the email, if there is
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			//Creating the user object
			user = new User({
				name,
				email,
				avatar,
				password,
			});

			//Encrpyt password
			//A salt is a random string that makes the hash unpredictable
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			//Saving to the db
			await user.save();
			console.log('User registered');
			//Return jsonwebtoken, this is such that once register, user can be logged in
			const payload = {
				user: {
					id: user.id, //user._id
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: '5 days' },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
