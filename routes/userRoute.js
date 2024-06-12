const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

router
  .route("/deleteMe")
  .delete(authController.protect, userController.deleteMe);

router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

router.route("/signup").post(authController.signUp);

router.route("/login").post(authController.login);

router.route("/forgotPassword").post(authController.forgotPassword);

router.route("/resetPassword/:token").patch(authController.resetPassword);

router
  .route("/updateME")
  .patch(authController.protect, userController.updateME);

router
  .route("/updatePassword")
  .patch(authController.protect, authController.updatePassword);

module.exports = router;
