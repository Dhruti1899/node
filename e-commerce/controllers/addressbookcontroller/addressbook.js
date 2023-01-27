const Addressbook = require("../../Models/addressbook/addressbook");


  exports.AddAddressbook = async (req, res) => {
    if (!req.body.first_name || !req.body.last_name ||!req.body.pincode ) {
      return res.status(422).json({
        first_name: "firstname is required",
        last_name: "last name is required",
        pincode:"pincode is required"
      });
    }
    const addressbook = new Addressbook(req.body);
    Addressbook.AddAddressbook(addressbook, function (err, addressbook) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "Addressbook insert successfully",
        data: addressbook
      });
    });
  };
  exports.GetAddressbookDetails = async (req, res) => {
    Addressbook.GetAddressbookDetails(function (err, addressbook) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(country);
      res.json({
        success: 1,
        message: "Addressbook List",
        data: addressbook
      });
    });
  };
  exports.updateAddressbook = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      Addressbook.updateAddressbook(
        req.params.id,
        new Addressbook(req.body),
        (err, data) => {
            console.log("err",err)
            console.log("data=>",data)
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Addressbook with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Country with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
  };

  exports.getAddressbookById = (req, res) => {
    Addressbook.getAddressbookById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Addressbook with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Addressbook with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.DeleteAddressbook = (req, res) => {
    Addressbook.DeleteAddressbook((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Addressbook."
        });
      else res.send({ message: `All Addressbook were deleted successfully!` });
    });
  };

  exports.DeleteAllAddressbook = (req, res) => {
    Addressbook.DeleteAllAddressbook(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Addressbook with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Addressbook with id " + req.params.id
          });
        }
      } else res.send({ message: `Addressbook was deleted successfully!` });
    });
  };