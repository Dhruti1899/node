const express = require("express");
const router = express.Router();
const {
   cityController,
 
  
} = require("../../controllers/index");

router.post("/City", cityController.AddCity);

router.get("/City", cityController.GetCityDetails);
router.get("/City/:id", cityController.getCityById);
// router.put("/user/:userId", updateUser);

// router.delete("/user/:userId", deleteUser);

module.exports = router;