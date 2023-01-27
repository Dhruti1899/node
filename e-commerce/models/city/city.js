"City strict";

const City = function (city) {
this.state_id=city.state_id;
  this.city_name = city.city_name;
  this.code = city.code;
};

City.AddCity = function (city, result) {
   
  connection.query("INSERT INTO city set ?", city, function (err, res) {
    if (err) {
        result(err, null);
      } else {
        console.log(res)
        console.log( res.insertId)
        // result(null, res.insertId, ...state);
        console.log("created state: ", { id: res.insertId, ...city });
        result(null, { id: res.insertId, ...city });
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
City.GetCityDetails = function (result) {
    console.log(result)
  connection.query("SELECT * FROM city", (err, res) => {
    console.log("state",res)
    console.log("state err",err)
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

City.updateCity = function (id, city, result) {
    connection.query(
        "UPDATE city SET city_name = ?,state_id=?, code = ? WHERE id = ?",
        [city.city_name, city.state_id,city.code, id],
    
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
    
          console.log("updated city: ", { id: id, ...city });
          result(null, { id: id, ...city });
        }
      );
};

City.getCityById = function (id,  result) {
    connection.query(`SELECT * FROM city WHERE id = ${id}`, (err, res) => {
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
  
  City.DeleteCity = (id, result) => {
    connection.query("DELETE FROM city WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted city with id: ", id);
      result(null, res);
    });
  };

  City.DeleteAllCity = result => {
    connection.query("DELETE FROM city", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} city`);
      result(null, res);
    });
  };

module.exports = City;