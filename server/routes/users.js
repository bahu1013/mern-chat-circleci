const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Chatkit = require('@pusher/chatkit-server');

const config = require('../config/default');
const User = require('../models/User');
const constants = require('../constants/default');

const chatkit = new Chatkit.default({
  instanceLocator: config.CHAT_KIT.INSTANCELOCATOR,
  key: config.CHAT_KIT.KEY
});

router.use(cors());

router.post('/register', (req, res) => {
	const today = new Date();
	const userData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		chat_id: req.body.chat_id,
		email: req.body.email,
		password: req.body.password,
		created: today
	};
	User.findOne({
		chat_id: req.body.chat_id
	})
	.then(user => {
		if (!user) {
			User.findOne({
				email: req.body.email
			})
			.then(user => {
				if (!user) {
					chatkit.createUser({
						id: userData.chat_id,
						name: userData.chat_id
					})
					.then(() => {
						bcrypt.hash(req.body.password, 10, (err, hash) => {
							userData.password = hash;
							User.create(userData)
							.then(user => {
								res.send({result: constants.RESPONSE.SUCCESS});
							})
							.catch(err => {
								res.status(err.status).send({result: err});
							});
						});
					})
					.catch(error => {
						if (error.error === 'services/chatkit/user_already_exists') {
							res.send({result: constants.RESPONSE.USERS.CHAT_ID_REPEAT});
						} else {
							res.status(error.status).send({result: error});
						}
					});
				} else {
					res.send({result: constants.RESPONSE.USERS.USER_REPEAT});
				}
			})
			.catch(err => {
				res.status(err.status).send({result: err});
			});
		} else {
			res.send({result: constants.RESPONSE.USERS.CHAT_ID_REPEAT});
		}
	})
	.catch(err => {
		res.send({result: err});
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
				const authData = chatkit.authenticate({ userId: user.chat_id });
				res.status(authData.status).send({
					token,
					result: constants.RESPONSE.SUCCESS,
					chat_token: authData.body.access_token,
					user
				});
			} else {
				res.send({ result: constants.RESPONSE.USERS.INVALID_EMAIL_PASSWORD });
			}
		} else {
			res.send({ result: constants.RESPONSE.USERS.INVALID_EMAIL_PASSWORD });
		}
	})
	.catch(err => {
		res.status(err.status).send({result: err});
	});
});

router.post('/authenticate', (req, res) => {
	const authData = chatkit.authenticate({ userId: req.query.user_id });
	res.status(authData.status).send(authData.body);
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
			res.send({result: constants.RESPONSE.USERS.NOT_EXIST});
		}
	})
	.catch(err => {
		res.send({result: err});
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
						res.status(err.status).send({result: constants.RESPONSE.USERS.UPDATE_PROFILE_ERROR});
					} else {
						const payload = {
							_id: user._id,
							first_name: user.first_name,
							last_name: user.last_name,
							email: user.email
						};
						let token = jwt.sign(payload, config.jwt.SECRET, {
							expiresIn: config.jwt.TOKEN_EXPIRY_TIME
						});
						const authData = chatkit.authenticate({ userId: user.chat_id });
						res.send({
							token,
							result: constants.RESPONSE.SUCCESS,
							chat_token: authData.body.access_token,
							user
						});
					}
				});
			} else if (req.body.current_password != undefined) {
				if (bcrypt.compareSync(req.body.current_password, user.password)) {
					bcrypt.hash(req.body.new_password, 10, (err, hash) => {
						user.password = hash;
						user.save(err => {
							if (err) {
								res.status(err.status).send({result: constants.RESPONSE.UERS.UPDATE_PROFILE_ERROR});
							} else {
								res.send({ result: constants.RESPONSE.SUCCESS });
							}
						});
					});
				} else {
					const payload = { result: constants.RESPONSE.USERS.CURRENT_PASSWORD_WRONG };
					res.send(payload);
				}
			}
		}
	});
});

router.post('/logout', (req, res) => {
	res.send("Logged out");
});

module.exports = router;
