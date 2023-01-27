const User = require("../../Models/user/user");


  exports.registrationUser = async (req, res) => {
    if (!req.body.first_Name || !req.body.last_Name || !req.body.mobile_Number || !req.body.email || !req.body.password) {
      return res.status(422).json({
        first_Name: "firstname is required",
        last_Name: "lastName is required",
        mobile_Number:"mobile Number is required",
        email:"email is required",
        password:"password is required"
      });
    }
    const user = new User(req.body);
    User.registrationUser(user, function (err, user) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "User insert successfully",
        data: user
      });
    });
  };
  exports.GetUserDetails = async (req, res) => {
    User.GetUserDetails(function (err, user) {
      if (err) {
        console.log(err)
        return res.status(403).send(err);
      }
      // res.json(country);
      res.json({
        success: 1,
        message: "User List",
        data: user
      });
    });
  };
  exports.getUserById = async (req, res) => {
   
    User.getUserById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.id
            });
          }
        } else res.send(data);
      });
  };
  exports.updateUser = async (req, res) => {
    if (!req.body.Country_Name || !req.body.Code ) {
      return res.status(422).json({
          Country_Name: "firstname is required",
          Code: "firstname is required",
    
      });
    }
    const user = new User(req.body);
    User.updateUser(user, function (err, user) {
      if (err) {
        return res.status(403).send(err);
      }
      // res.json(user);
       res.json({
        success: 1,
        message: "User updated successfully",
        data: user
      });
    });
  };

  exports.DeleteUser = (req, res) => {
    User.DeleteUser((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all User."
        });
      else res.send({ 
        message: `All User were deleted successfully!`,
        data:data
    });
    });
  };

  exports.DeleteAllUser = (req, res) => {
    User.DeleteAllUser(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.id
          });
        }
      } else res.send({ message: `User was deleted successfully!`,data:data });
    });
  };

  exports.loginjwt=(req,res)=>{
    const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

    const user = new User(req.body);
        User.getuserbyemail(user.email,function(err,user){
            if (err) {
                console.log(err);
              }
              if (!results) {
                return res.json({
                  success: 0,
                  data: "Invalid email or password"
                });
              }
              else{
                console.log('body email =>', body.email)
                var body_email = user.email
                var body_password= user.password
                results.password = undefined;
                console,log(body_email)
                console.log(body_password)
                if(body_email == results.email || body_password == results.password){
                  const jsontoken = sign({ body_email: results },  process.env.JWT_KEY, {
                    expiresIn: "1h"
                  });
                  return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                  });
                }
                else{
                  return res.json({
                    success: 0,
                    data: "Invalid email or password"
                  });
        
                }
                
              }
        });
        // User.updateUser(user, function (err, user) {
        //     if (err) {
        //       return res.status(403).send(err);
        //     }
        //     // res.json(user);
        //      res.json({
        //       success: 1,
        //       message: "User updated successfully",
        //       data: user
        //     });
        //   });
  }