const Role = require("../../Models/role/role");

// exports.AddCountry = async (req, res) => {
//     if (!req.body.Country_Name || !req.body.Code ) {
//       return res.status(422).json({
//           Country_Name: "firstname is required",
//           Code: "firstname is required",
    
//       });
//     }
//     const countrys = new country(req.body);
//     console.log(countrys,"body")
//     countryModels.AddCountry(countrys, function (err, country) {
//       if (err) {
//         return res.status(403).send(err);
//       }
//       res.json(country);
//       // res.json({
//       //   success: 1,
//       //   message: "country insert successfully",
//       //   data: country
//       // });
//     });
//   };
  exports.AddRole = async (req, res) => {
    if (!req.body.role_Name  ) {
      return res.status(422).json({
        country_Name: "firstname is required",
        code: "firstname is required",
    
      });
    }
    const role = new Role(req.body);
    Role.AddRole(role, function (err, role) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "role insert successfully",
        data: role
      });
    });
  };
  exports.GetRoleDetails = async (req, res) => {
    Role.GetRoleDetails(function (err, role) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(country);
      res.json({
        success: 1,
        message: "Role List",
        data: role
      });
    });
  };
  exports.updateRole = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      Role.updateRole(
        req.params.id,
        new Role(req.body),
        (err, data) => {
            console.log("err",err)
            console.log("data=>",data)
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Role with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Role with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
  };

  exports.GetRoleById = (req, res) => {
    Role.GetRoleById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Role with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Role with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.DeleteRole = (req, res) => {
    Role.DeleteRole((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Role."
        });
      else res.send({ message: `All Role were deleted successfully!` });
    });
  };

  exports.DeleteAllRole = (req, res) => {
    Role.DeleteAllRole(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Role with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Role with id " + req.params.id
          });
        }
      } else res.send({ message: `Role was deleted successfully!` });
    });
  };