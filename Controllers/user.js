/** @format */

// Cách tuog tac vs mongoo : 2 cach
// 1 callBack
// 2 Promniss
// 3 Async await
const User = require('../Models/User');

const JWT = require('jsonwebtoken');
const { JWT_Secret } = require('../Config/index');

const encodeToken = (userID) => {
	return JWT.sign(
		{
			iss: 'Linh',
			sub: userID,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 3),
		},
		JWT_Secret,
	);
};
// async await
const index = async (req, res, next) => {
	const users = await User.find({});
	return res.status(201).json({ users });
};

const newUser = async (req, res, next) => {
	// Async await
	const newUser = new User(req.value.body);
	await newUser.save();
	return res.status(201).json({ user: newUser });
};
const deleteUser = async (req, res, next) => {
	const { userID } = req.value.params;
	// get user
	const user = await User.findById(userID);
	// delete
	await user.remove();
	return res.status(200).json({ success: true });
};

const getUser = async (req, res, next) => {
	const { userID } = req.value.params;
	const user = await User.findById(userID);
	return res.status(200).json({ user });
};

const replaceUser = async (req, res, next) => {
	const { userID } = req.value.params;
	const newUser = req.value.body;
	const result = await User.findByIdAndUpdate(userID, newUser);
	return res.status(200).json({ success: true });
};
const updateUser = async (req, res, next) => {
	const { userID } = req.value.params;
	const newUser = req.value.body;
	const result = await User.findByIdAndUpdate(userID, newUser);
	return res.status(200).json({ success: true });
};

// sign In, sign Up
const secret = async (req, res, next) => {
	return res.status(201).json({ resource: true });
};
const signIn = async (req, res, next) => {
	const toKen = encodeToken(req.user._id);
	const email = req.value.body.email;
	if (toKen) {
		var user = await User.findOne({ email });
	}
	res.setHeader('Authorization', toKen);
	return res.status(201).json({ toKen, user });
};
const signUp = async (req, res, next) => {
	const { name, phone, email, password, loaiTaiKhoan } = req.value.body;
	// check email
	const foundUser = await User.findOne({ email });
	if (foundUser) {
		return res
			.status(403)
			.json({ error: { message: 'Email is already in use' } });
	}
	// create new user
	const newUser = await User({ name, phone, email, password, loaiTaiKhoan });
	newUser.save();
	// encode Token
	const toKen = encodeToken(newUser._id);
	res.setHeader('Authorization', toKen);
	return res.status(201).json({ success: true });
};

module.exports = {
	index,
	newUser,
	getUser,
	replaceUser,
	updateUser,
	secret,
	signIn,
	signUp,
	deleteUser,
};
