const State = require("../../Models/state/state");


  exports.AddState = async (req, res) => {
    // if (!req.body.state_Name || !req.body.code) {
    //   return res.status(422).json({
    //       Country_Name: "firstname is required",
    //       Code: "firstname is required",
    
    //   });
    // }
    const state = new State(req.body);
    State.AddState(state, function (err, state) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "state insert successfully",
        data: state
      });
    });
  };
  exports.GetStateDetailst = async (req, res) => {
    State.GetStateDetails(function (err, state) {
      if (err) {
        console.log(err)
        return res.status(403).send(err);
      }
      // res.json(country);
      res.json({
        success: 1,
        message: "state List",
        data: state
      });
    });
  };
  exports.getStateById = async (req, res) => {
   
    State.getStateById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found State with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving State with id " + req.params.id
            });
          }
        } else res.send(data);
      });
  };
  exports.updateState = async (req, res) => {
    if (!req.body.Country_Name || !req.body.Code ) {
      return res.status(422).json({
          Country_Name: "firstname is required",
          Code: "firstname is required",
    
      });
    }
    const state = new State(req.body);
    State.updateState(state, function (err, state) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "state updated successfully",
        data: state
      });
    });
  };

  exports.DeleteState = (req, res) => {
    State.DeleteState((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all State."
        });
      else res.send({ 
        message: `All State were deleted successfully!`,
        data:data
    });
    });
  };

  exports.DeleteAllState = (req, res) => {
    State.DeleteAllState(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found State with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Taluka with id " + req.params.id
          });
        }
      } else res.send({ message: `State was deleted successfully!`,data:data });
    });
  };