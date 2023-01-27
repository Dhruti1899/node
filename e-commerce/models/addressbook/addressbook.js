"Addressbook strict";

const Addressbook = function (addressbook) {
  this.first_name = addressbook.first_name;
  this.last_name = addressbook.last_name;
  this.pincode=addressbook.pincode;
  this.latitude=addressbook.latitude;
  this.longitude=addressbook.longitude;
  this.country_id=addressbook.country_id;
  this.state_id=addressbook.state_id;
 this.city_id=addressbook.city_id;
 this.taluka_id=addressbook.taluka_id;
 this.address_type=addressbook.address_type;
};

Addressbook.AddAddressbook = function (addressbook, result) {
   
  connection.query("INSERT INTO addressbook set ?", addressbook, function (err, res) {
    if (err) {
        result(err, null);
      } else {
        console.log(res)
        console.log( res.insertId)
        // result(null, res.insertId, ...state);
        result(null, { id: res.insertId, ...addressbook });
      } 
    });
}; 

Addressbook.GetAddressbookDetails = function (result) {
  connection.query("SELECT * FROM addressbook", (err, res) => {
    console.log("addressbook",res)
    console.log("addressbook err",err)
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Addressbook.updateAddressbook = function (id, addressbook, result) {
    connection.query(
        "UPDATE addressbook  SET first_name = ?,last_name=?, pincode = ?,latitude=?,longitude=? ,country_id=? ,state_id=? , city_id=? ,taluka_id=?,address_type=? WHERE id = ?",
        [    addressbook.first_name,
             addressbook.last_name,
             addressbook.pincode,
             addressbook.latitude,
             addressbook.longitude, 
             addressbook.country_id,
             addressbook.state_id,
             addressbook.city_id,
             addressbook.taluka_id,
             addressbook.address_type,
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
    
          console.log("updated addressbook: ", { id: id, ...taluka });
          result(null, { id: id, ...taluka });
        }
      );
};

Addressbook.getAddressbookById = function (id,  result) {
    connection.query(`SELECT * FROM addressbook WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found addressbook: ", res[0]);
          result(null, res[0]);
          return;
        }
    
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
      });
  };
  
  Addressbook.DeleteAddressbook = (id, result) => {
    connection.query("DELETE FROM addressbook WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted Addressbook with id: ", id);
      result(null, res);
    });
  };

  Addressbook.DeleteAllAddressbook= result => {
    connection.query("DELETE FROM addressbook", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} Addressbook`);
      result(null, res);
    });
  };
module.exports = Addressbook;