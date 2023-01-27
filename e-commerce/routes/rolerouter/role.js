const express = require("express");
const router = express.Router();
const {
    roleController,
 
  
} = require("../../controllers/index");

router.post("/Role", roleController.AddRole);

router.get("/Role", roleController.GetRoleDetails);
router.get("/Role/:id", roleController.GetRoleById);
router.post("/Role/:id", roleController.updateRole);
router.post("/Role/:id", roleController.DeleteRole);
router.post("/Role/", roleController.DeleteAllRole);
// router.put("/user/:userId", updateUser);

// router.delete("/user/:userId", deleteUser);
 
module.exports = router; 