const Country = require("../../Models/Country/country");

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
  exports.AddCountry = async (req, res) => {
    if (!req.body.country_Name || !req.body.code ) {
      return res.status(422).json({
        country_Name: "firstname is required",
        code: "firstname is required",
    
      });
    }
    const country = new Country(req.body);
    Country.AddCountry(country, function (err, country) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "country insert successfully",
        data: country
      });
    });
  };
  exports.GetCountryDetails = async (req, res) => {
    Country.GetCountryDetails(function (err, country) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(country);
      res.json({
        success: 1,
        message: "country List",
        data: country
      });
    });
  };
  exports.updateCountry = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      Country.updateCountry(
        req.params.id,
        new Country(req.body),
        (err, data) => {
            console.log("err",err)
            console.log("data=>",data)
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Country with id ${req.params.id}.`
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

  exports.GetCountryById = (req, res) => {
    Country.GetCountryById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Country with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Country with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.DeleteCountry = (req, res) => {
    Country.DeleteCountry((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Country."
        });
      else res.send({ message: `All Country were deleted successfully!` });
    });
  };

  exports.DeleteAllCountry = (req, res) => {
    Country.DeleteAllCountry(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Country with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Country with id " + req.params.id
          });
        }
      } else res.send({ message: `Country was deleted successfully!` });
    });
  };