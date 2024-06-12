const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

router.route("/signup").post(authController.signUp);

router.route("/login").post(authController.login);

router.route("/forgotPassword").post(authController.forgotPassword);

router.route("/resetPassword/:token").patch(authController.resetPassword);

router.use(authController.protect);

router.route("/updatePassword").patch(authController.updatePassword);

router
  .route("/me")
  .get(authController.protect, userController.getMe, userController.getUser);

router.route("/updateME").patch(userController.updateME);

router.route("/deleteMe").delete(userController.deleteMe);

router.use(authController.restricTo("admin"));

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
