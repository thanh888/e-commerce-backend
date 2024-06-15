const express = require("express");
const userController = require("../controllers/UserController");
const {
  authUserMiddleware,
  authMiddleware,
} = require("../authMiddleware/authMiddleware");
let router = express.Router();

router.get("", userController.findAllUser);
router.get("/:id/profile", authUserMiddleware, userController.findOneUser);
router.post("", userController.createUser);
router.put("/:id/update-me", userController.updateUser);
router.delete(
  "/:id/hard-delete",
  authMiddleware,
  userController.hardDeleteUser
);
router.post("/sign-in", userController.signInUser);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
