const express = require('express');
const router = express.Router();
const cors = require('cors');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
router.use(cors());

router.post('/register', (req, res) => {
	const today = new Date();
	const userData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		created: today
	};
	User.findOne({
		email: req.body.email
	})
	.then(user => {
		if (!user) {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				userData.password = hash;
				User.create(userData)
				.then(user => {
					res.json({status: user.email + ' registered'});
				})
				.catch(err => {
					res.send('error: ' + err);
				});
			});
		} else {
			res.json({error: 'User already exists'});
		}
	})
	.catch(err => {
		res.send('error: ' + err);
	});
});

router.post('/login', (req, res) => {
	User.findOne({
		email: req.body.email
	})
	.then(user => {
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				const payload = {
					_id: user._id,
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email
				};
				let token = jwt.sign(payload, config.jwt.SECRET, {
					expiresIn: config.jwt.TOKEN_EXPIRY_TIME
				});
				res.send(token);
			} else {
				res.json({ error: "User does not exist" });
			}
		} else {
			res.json({ error: "User does not exist" });
		}
	})
	.catch(err => {
		res.send('error: ' + err);
	});
});

router.get('/profile', (req, res) => {
	var decoded = jwt.verify(req.headers['authorization'], config.jwt.SECRET)
  	User.findOne({
		_id: decoded._id
  	})
	.then(user => {
		if (user) {
			res.json(user);
		} else {
			res.send("User does not exist");
		}
	})
	.catch(err => {
		res.send('error ' + err);
	});
});

router.post('/profile', (req, res) => {
	User.findById(req.body._id, (err, user) => {
		if (user) {
			user.updated = new Date();
			if (req.body.first_name != undefined) {
				user.first_name = req.body.first_name;
				user.last_name = req.body.last_name;
				user.email = req.body.email;

				user.save(err => {
					if (err) {
						console.log('error');
					} else {
						const payload = {
							_id: user._id,
							first_name: user.first_name,
							last_name: user.last_name,
							email: user.email
						};
						let token = jwt.sign(payload, config.jwt.SECRET, {
							expiresIn: 1440
						});
						res.send({ token, user });
					}
				});
			} else if (req.body.current_password != undefined) {
				if (bcrypt.compareSync(req.body.current_password, user.password)) {
					bcrypt.hash(req.body.new_password, 10, (err, hash) => {
						user.password = hash;
						user.save(err => {
							if (err) {
								console.log('error');
							} else {
								res.send({ token: req.body.token, user });
							}
						});
					});
				} else {
					const payload = { user, token: req.body.token, error: "Current password is wrong." };
					res.send(payload);
				}
			}
		} else {
			console.log('No such user');
		}
	});
});

router.post('/logout', (req, res) => {
	res.send("Logged out");
});

module.exports = router;
