/** @format */

// Cách tuog tac vs mongoo : 2 cach
// 1 callBack
// 2 Promniss
// 3 Async await
const User = require("../Models/User");
const bcrypt = require("bcryptjs");

const JWT = require("jsonwebtoken");
const { JWT_Secret } = require("../Config/index");

const encodeToken = (userID) => {
  return JWT.sign(
    {
      iss: "Linh",
      sub: userID,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    JWT_Secret
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
const changepassword = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  console.log('body', req.body);
  const userID = req.params;
  console.log('id', userID);
  let errors = [];

  //Check required fields
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    errors.push({ msg: "Please fill in all fields." });
  }

  //Check passwords match
  if (newPassword !== confirmNewPassword) {
    errors.push({ msg: "New passwords do not match." });
  }

  //Check password length
  if (newPassword.length < 6 || confirmNewPassword.length < 6) {
    errors.push({ msg: "Password should be at least six characters." });
  }

  if (errors.length > 0) {
    res.render("changepassword", {
      errors,
      name: req.user.name,
    });
  } else {
    //VALIDATION PASSED
    //Ensure current password submitted matches
    const user = await User.findById(userID.userID);
    console.log("user", user);
    //encrypt newly submitted password
    // async-await syntax
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (isMatch) {
      console.log("pw ban dau", user.password);
      //Update password for user with new password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newPassword, salt, async (err, hash) => {
          if (err) throw err;
          user.password = hash;
          console.log("pw say hash", user.password);
          const result = await User.findByIdAndUpdate(userID.userID, user);
          console.log(result);
          return res.status(200).json({ success: true });
        })
      );
    }
  }
};
const forgetpassword = async (req, res) => {
  const newPassword = 'User123'
  const userID = req.params;
  console.log('userID', userID);
  const user = await User.findById(userID.userID);
  console.log("user", user);
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newPassword, salt, async (err, hash) => {
      if (err) throw err;
      user.password = hash;
      console.log("pw say hash", user.password);
      const result = await User.findByIdAndUpdate(userID.userID, {password: newPassword});
      console.log(result);
      return res.status(200).json({ success: true });
    })
  );
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
  res.setHeader("Authorization", toKen);
  return res.status(201).json({ toKen, user });
};
const signUp = async (req, res, next) => {
  const { name, phone, email, password, loaiTaiKhoan } = req.value.body;
  // check email
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res
      .status(403)
      .json({ error: { message: "Email is already in use" } });
  }
  // create new user
  const newUser = await User({ name, phone, email, password, loaiTaiKhoan });
  newUser.save();
  // encode Token
  const toKen = encodeToken(newUser._id);
  res.setHeader("Authorization", toKen);
  return res.status(201).json({ success: true });
};

module.exports = {
  index,
  newUser,
  getUser,
  replaceUser,
  secret,
  signIn,
  signUp,
  deleteUser,
  changepassword,
  forgetpassword
};
