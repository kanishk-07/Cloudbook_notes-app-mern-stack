const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

/* /api/auth */

// Create a User
router.post('/createuser', [
	body('name', 'Name is invalid').isLength({ min: 3 }),
	body('email', 'Email is invalid').isEmail(),
	body('password', 'Password length should be > 4').isLength({ min: 5 }),
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
		user = User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
		res.json({ message: 'User Created Successfully' })
	} catch (error) {
		return res.status(500).send("Some error occurred, Please try again");
	}
});


module.exports = router