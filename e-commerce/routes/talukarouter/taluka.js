const express = require("express");
const router = express.Router();
const {
   talukaController,
 
  
} = require("../../controllers/index");

router.post("/Taluka", talukaController.AddTaluka);

router.get("/Taluka", talukaController.GetTalukaDetails);
router.get("/Taluka/:id", talukaController.getTalukaById );
// router.put("/user/:userId", updateUser);

// router.delete("/user/:userId", deleteUser);

module.exports = router;