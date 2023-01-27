"Country strict";

const Country = function (country) {
  this.country_Name = country.country_Name;
  this.code = country.code;

};

Country.AddCountry = function (country, result) {
  connection.query("INSERT INTO country set ?", country, function (err, res) {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  }); 
};

Country.GetCountryDetails = function (result) {
  connection.query("SELECT * FROM country", (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Country.updateCountry = function (id, country, result) {
    connection.query(
        "UPDATE country SET country_Name = ?, code = ? WHERE id = ?",
        [country.country_Name, country.country_Name, id],
    
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
    
          console.log("updated tutorial: ", { id: id, ...country });
          result(null, { id: id, ...country });
        }
      );
};
Country.GetCountryById = (id, result) => {
    connection.query(`SELECT * FROM country WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) { 
        console.log("found Country: ", res[0]);
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
Country.DeleteCountry = (id, result) => {
    connection.query("DELETE FROM country WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted country with id: ", id);
      result(null, res);
    });
  };

Country.DeleteAllCountry = result => {
    connection.query("DELETE FROM country", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} country`);
      result(null, res);
    });
  };

module.exports = Country;