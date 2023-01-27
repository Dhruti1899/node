const express = require("express");
const router = express.Router();
const {
   stateController,
 
  
} = require("../../controllers/index");

router.post("/State", stateController.AddState);

router.get("/State", stateController.GetStateDetailst);
router.get("/State/:id", stateController.getStateById);
// router.put("/user/:userId", updateUser);

// router.delete("/user/:userId", deleteUser);

module.exports = router;