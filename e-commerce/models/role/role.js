"Role strict";

const Role = function (role) {
  this.role_Name = role.role_Name;
  this.role_Description = role.role_Description;
  this.createdAt=role.createdAt;
  this.updatedAt= role.updatedAt;

};

Role.AddRole = function (role, result) {
    // console.log(role,"role.....")
    // role.updatedAt=1;
  connection.query("INSERT INTO role set ?", role, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  }); 
};
 
Role.GetRoleDetails = function (result) {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Role.updateRole = function (id, role, result) {
    connection.query(
        "UPDATE role SET role_Name = ?, role_Description = ?,createdAt=?,updatedAt=? WHERE id = ?",
        [role.role_Name, role.role_Description,role.createdAt ,role.updatedAt, id],
    
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
    
          console.log("updated role: ", { id: id, ...role });
          result(null, { id: id, ...role });
        }
      );
};
Role.GetRoleById = (id, result) => {
    connection.query(`SELECT * FROM role WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) { 
        console.log("found role: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  };
// User.delete = function (id, result) {
//   connection.query("DELETE FROM tb_country WHERE _id = ?", [id], function (
//     err,
//     res
//   ) {
//     if (err) {
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };
Role.DeleteRole = (id, result) => {
    connection.query("DELETE FROM role WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted role with id: ", id);
      result(null, res);
    });
  };

  Role.DeleteAllRole = result => {
    connection.query("DELETE FROM role", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} country`);
      result(null, res);
    });
  };

module.exports = Role;