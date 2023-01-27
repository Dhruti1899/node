const express = require("express");
const router = express.Router();
const {
    UserController
} = require("../../controllers/index");
const { checkToken } = require("../../middlewares/token_validation");
router.post("/User", UserController.registrationUser);

router.get("/User", UserController.GetUserDetails);
router.get("/User/:id", UserController.getUserById);
router.post("/User/:id", UserController.updateUser);
router.post("/User/:id", UserController.DeleteUser);
router.post("/login/", UserController.loginjwt);
router.post("/User/", UserController.DeleteAllUser);
// router.put("/user/:userId", updateUser);

// router.delete("/user/:userId", deleteUser);
 
module.exports = router;  