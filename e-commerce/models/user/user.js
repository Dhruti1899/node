"User strict";

const connection = require("../../config/mysqlDB");

const User = function (user) {
  this.first_Name = user.first_Name;
  this.last_Name = user.last_Name;
  this.gender=user.gender;
  this.mobile_Number=user.mobile_Number;
  this.GST_No=user.GST_No;
  this.company_Name=user.company_Name;
  this.email=user.email;
  this.password=user.password;
  this.isDeleted=user.isDeleted;
  this.role_id=user.role_id;
  this.cart_id=user.cart_id;
  this.order_id=user.order_id;
  this.review_id=user.review_id;
  this.supportTickets_id=user.supportTickets_id;
  this.whishList_id=user.whishList_id;
  this.addressbook_id=user.addressbook_id;
};


User.registrationUser = function (user, result) {
    user.isDeleted='T'  ;
    console.log(user)
  connection.query("INSERT INTO Users set ?", user, function (err, res) {
    if (err) {
        result(err, null);
      } else {
        console.log(res)
        console.log( res.insertId)
        // result(null, res.insertId, ...state);
        result(null, { id: res.insertId, ...user });
      } 
    });   
}; 

User.getuserbyemail = function(email,result){
    connection.query("select * from Users where email=?",email,
    (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res) {
            console.log("found email: ", res);
            result(null, res);
            return;
          }
      
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
      }
    );
};
// getUserByUserEmail: (email, callBack) => {
//     pool.query(
//       `select * from tb_registration where email = ?`,
//       [email],
//       (error, results, fields) => {
//         if (error) {
//           callBack(error);
//         }
//         return callBack(null, results[0]);
//       }
//     );
//   }
User.GetUserDetails = function (result) {
  connection.query("SELECT * FROM Users", (err, res) => {
    console.log("User",res)
    console.log("User err",err)
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.updateUser = function (id, user, result) {
    connection.query(
        "UPDATE Users SET first_Name = ?,last_Name=?, gender = ?,mobile_Number=? ,GST_No=? , company_Name=? email=? ,password=?,isDeleted=?, role_id=? , cart_id=? ,order_id=?, review_id=?, supportTickets_id=?,whishList_id=?,addressbook_id=? WHERE id = ?",
        [   user.first_Name, 
            user.last_Name,
            user.gender, 
            user.mobile_Number,
            user.GST_No, 
            user.company_Name,
            user.email, 
            user.password, 
            user.isDeleted,
            user.role_id,  
            user.cart_id,
            user.order_id,
            user.review_id,
            user.supportTickets_id,
            user.whishList_id,
            user.addressbook_id,
            id],
    
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("updated User: ", { id: id, ...user });
          result(null, { id: id, ...user });
        }
      );
};

User.getUserById = function (id,  result) {
    connection.query(`SELECT * FROM Users WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found User: ", res[0]);
          result(null, res[0]);
          return;
        }
    
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
      });
  };
  User.DeleteUser = (id, result) => {
    connection.query("DELETE FROM Users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted User with id: ", id);
      result(null, res);
    });
  };
;

User.DeleteAllUser = result => {
    connection.query("DELETE FROM Users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} User`);
      result(null, res);
    });
  };
module.exports = User;