"Taluka strict";

const Taluka = function (taluka) {
  this.taluka_name = taluka.taluka_name;
  this.code = taluka.code;
  this.city_id=taluka.city_id
};


Taluka.AddTaluka = function (taluka, result) {
   
  connection.query("INSERT INTO taluka set ?", taluka, function (err, res) {
    if (err) {
        result(err, null);
      } else {
        console.log(res)
        console.log( res.insertId)
        // result(null, res.insertId, ...state);
        result(null, { id: res.insertId, ...taluka });
      } 
    });
}; 
// State.AddState = (state, result) => { 
//     connection.query("INSERT INTO state (state_Name,code,country_id)values(?)", state, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//         return;
//       }

//       console.log("created state: ", { id: res.insertId, ...state });
//       result(null, { id: res.insertId, ...state });
//     });
//   };
Taluka.GetTalukaDetails = function (result) {
  connection.query("SELECT * FROM taluka", (err, res) => {
    console.log("taluka",res)
    console.log("taluka err",err)
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Taluka.updateTaluka = function (id, taluka, result) {
    connection.query(
        "UPDATE taluka SET taluka_name = ?,city_id=?, code = ? WHERE id = ?",
        [taluka.taluka_name, taluka.city_id,taluka.code, id],
    
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
    
          console.log("updated taluka: ", { id: id, ...taluka });
          result(null, { id: id, ...taluka });
        }
      );
};

Taluka.getTalukaById = function (id,  result) {
    connection.query(`SELECT * FROM taluka WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found city: ", res[0]);
          result(null, res[0]);
          return;
        }
    
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
      });
  };
  
// City.deleteCity = function (id, result) {
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
Taluka.DeleteTaluka = (id, result) => {
    connection.query("DELETE FROM taluka WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted taluka with id: ", id);
      result(null, res);
    });
  };

  Taluka.DeleteAllTaluka = result => {
    connection.query("DELETE FROM taluka", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} Taluka`);
      result(null, res);
    });
  };

module.exports = Taluka;