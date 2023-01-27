const City = require("../../Models/city/city");


  exports.AddCity = async (req, res) => {
    // if (!req.body.city_name || !req.body.code) {
    //   return res.status(422).json({
    //       city_name: "city name is required",
    //       Code: "firstname is required",
    
    //   });
    // }
    const city = new City(req.body);
    City.AddCity(city, function (err, city) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "city insert successfully",
        data: city
      });
    });
  };
  exports.GetCityDetails = async (req, res) => {
    City.GetCityDetails(function (err, city) {
      if (err) {
        console.log(err)
        return res.status(403).send(err);
      }
      // res.json(country);
      res.json({
        success: 1,
        message: "city List",  
        data: city
      });  
    });
  };
  exports.getCityById = async (req, res) => {
   
    City.getCityById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found city with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving City with id " + req.params.id
            });
          }
        } else res.send(data);
      });
  };

  exports.updateCity = async (req, res) => {
    if (!req.body.Country_Name || !req.body.Code ) {
      return res.status(422).json({
          Country_Name: "firstname is required",
          Code: "firstname is required",
    
      });
    }
    const city = new City(req.body);
    City.updateCity(state, function (err, city) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "city updated successfully",
        data: city
      });
    });
  };

  exports.DeleteCity = (req, res) => {
    City.DeleteCity((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all City."
        });
      else res.send({ 
        message: `All City were deleted successfully!`,
        data:data
    });
    });
  };

  exports.DeleteAllCity = (req, res) => {
    City.DeleteAllCity(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found City with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete City with id " + req.params.id
          });
        }
      } else res.send({ message: `City was deleted successfully!`,data:data });
    });
  };