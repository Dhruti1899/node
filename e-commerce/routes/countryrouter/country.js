const express = require("express");
const router = express.Router();
const {
    countryController,
 
  
} = require("../../controllers/index");

router.post("/Country", countryController.AddCountry);

router.get("/Country", countryController.GetCountryDetails);
router.get("/Country/:id", countryController.GetCountryById);
router.post("/Country/:id", countryController.updateCountry);
router.post("/Country/:id", countryController.DeleteCountry);
router.post("/Country/", countryController.DeleteAllCountry);
// router.put("/user/:userId", updateUser);

// router.delete("/user/:userId", deleteUser);
 
module.exports = router; 