const Taluka = require("../../Models/taluka/taluka");


  exports.AddTaluka = async (req, res) => {
    // if (!req.body.state_Name || !req.body.code) {
    //   return res.status(422).json({
    //       Country_Name: "firstname is required",
    //       Code: "firstname is required",
    
    //   });
    // }
    const taluka = new Taluka(req.body);
    Taluka.AddTaluka(taluka, function (err, taluka) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "Taluka insert successfully",
        data: taluka
      });
    });
  };
  exports.GetTalukaDetails = async (req, res) => {
    Taluka.GetTalukaDetails(function (err, taluka) {
      if (err) {
        console.log(err)
        return res.status(403).send(err);
      }
      // res.json(country);
      res.json({
        success: 1,
        message: "Taluka List",
        data: taluka
      });
    });
  };
  exports.getTalukaById = async (req, res) => {
   
    Taluka.getTalukaById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Taluka with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Taluka with id " + req.params.id
            });
          }
        } else res.send(data);
      });
  };
  exports.updateTaluka = async (req, res) => {
    if (!req.body.Country_Name || !req.body.Code ) {
      return res.status(422).json({
          Country_Name: "firstname is required",
          Code: "firstname is required",
    
      });
    }
    const taluka = new Taluka(req.body);
    Taluka.updateTaluka(taluka, function (err, taluka) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "Taluka updated successfully",
        data: taluka
      });
    });
  };

  exports.DeleteTaluka = (req, res) => {
    Taluka.DeleteTaluka((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Taluka."
        });
      else res.send({ 
        message: `All Taluka were deleted successfully!`,
        data:data
    });
    });
  };

  exports.DeleteAllTaluka = (req, res) => {
    Taluka.DeleteAllTaluka(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Taluka with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Taluka with id " + req.params.id
          });
        }
      } else res.send({ message: `Taluka was deleted successfully!`,data:data });
    });
  };