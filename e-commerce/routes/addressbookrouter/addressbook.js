const express = require("express");
const router = express.Router();
const {
    AddAddressbookController
} = require("../../controllers/index");

router.post("/AddAddressbook", AddAddressbookController.AddAddressbook);

router.get("/AddAddressbook", AddAddressbookController.GetAddressbookDetails);
router.get("/AddAddressbook/:id", AddAddressbookController.getAddressbookById);
router.post("/AddAddressbook/:id", AddAddressbookController.updateAddressbook);
router.post("/AddAddressbook/:id", AddAddressbookController.DeleteAddressbook);
router.post("/AddAddressbook/", AddAddressbookController.DeleteAllAddressbook);
// router.put("/user/:userId", updateUser);
  
// router.delete("/user/:userId", deleteUser);
 
module.exports = router;    