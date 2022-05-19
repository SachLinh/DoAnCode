/** @format */

const express = require("express");
const router = require("express-promise-router")();
const userController = require("../Controllers/user");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../Helper/routerHelper");
const passport = require("passport");
const passportConfig = require("../MiddleWare/passport");

router
  .route("/")
  .get(userController.index)
  .post(validateBody(schemas.userSchema), userController.newUser);

router
  .route("/signup")
  .post(validateBody(schemas.authSignUpSchema), userController.signUp);
router
  .route("/signin")
  .post(
    validateBody(schemas.authSignInSchema),
    passport.authenticate("local", { session: false }),
    userController.signIn
  );
router
  .route("/secret")
  .get(passport.authenticate("jwt", { session: false }), userController.secret);

router
  .route("/:userID")
  .get(validateParam(schemas.idSchema, "userID"), userController.getUser)
  .put(
    validateParam(schemas.idSchema, "userID"),
    validateBody(schemas.userOptionSchema),
    userController.replaceUser
  )
  .delete(validateParam(schemas.idSchema, "userID"), userController.deleteUser);

router.route("/:userID/ChangePassword").post(userController.changepassword)
router.route("/:userID/ForgetPassword").put(userController.forgetpassword)
module.exports = router;
