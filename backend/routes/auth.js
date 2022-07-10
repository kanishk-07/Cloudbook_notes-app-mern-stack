const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');

const JWT_SECRET_KEY = 'sundaymondaytuesdaywednesdaythursdayfriday';

/* /api/auth */

// Create a User **********************************************************
router.post('/createuser', [
	body('name', 'Name is invalid').isLength({ min: 3 }),
	body('email', 'Email is invalid').isEmail(),
	body('password', 'Password length should be > 4').isLength({ min: 5 })
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).json({ error: 'Account with this email already exixts' });
		}
		const salt = await bcrypt.genSalt(10);
		const securedPassword = await bcrypt.hash(req.body.password, salt);
		user = User.create({
			name: req.body.name,
			email: req.body.email,
			password: securedPassword
		})
		const data = {
			user: {
			  id: user.id
			}
		}
		const authToken = jwt.sign(data, JWT_SECRET_KEY);
		res.json({ authToken: authToken, message: 'User Created Successfully' });
	} catch (error) {
		return res.status(500).send("Some error occurred, Please try again");
	}
});


// Authenticate a User ****************************************************
router.post('/login', [
	body('email', 'Email is invalid').isEmail(),
	body('password', 'Password cannot be empty').isLength({ min: 1 })
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const {email, password} = req.body;
		let user = await User.findOne({email});
		if (!user) {
			return res.status(401).json({ error: 'Invalid Credentials' });
		}
		const passwordCompare = await bcrypt.compare(password, user.password);
		if(!passwordCompare) {
			return res.status(401).json({ error: 'Invalid Credentials' });
		}
		const data = {
			user: {
			  id: user.id
			}
		}
		const authToken = jwt.sign(data, JWT_SECRET_KEY);
		res.json({ authToken: authToken, message: 'LogIn Successful' });
		
	} catch (error) {
		return res.status(500).send("Some error occurred, Please try again");
	}
});


// Get details of the user currently loggin in ** Here login in required ****
router.post('/getuser', fetchUser, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select("-password");
		res.send(user);
	} catch (error) {
		return res.status(500).send("Some error occurred, Please try again");
	}
});


module.exports = router