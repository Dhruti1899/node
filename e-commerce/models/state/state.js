"State strict";

const State = function (state) {
    this.country_id=state.country_id;
  this.state_name = state.state_name;
  this.code = state.code;
};

State.AddState = function (state, result) {
   
  connection.query("INSERT INTO state set ?", state, function (err, res) {
    if (err) {
        result(err, null);
      } else {
        console.log(res)
        console.log( res.insertId)
        // result(null, res.insertId, ...state);
        result(null, { id: res.insertId, ...state });
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
State.GetStateDetails = function (result) {
  connection.query("SELECT * FROM state", (err, res) => {
    console.log("state",res)
    console.log("state err",err)
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

State.updateState = function (id, state, result) {
    connection.query(
        "UPDATE state SET state_name = ?,country_id=?, code = ? WHERE id = ?",
        [state.state_name, state.country_id,country.code, id],
    
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
    
          console.log("updated state: ", { id: id, ...state });
          result(null, { id: id, ...state });
        }
      );
};

State.getStateById = function (id,  result) {
    connection.query(`SELECT * FROM state WHERE id = ${id}`, (err, res) => {
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
  State.DeleteState = (id, result) => {
    connection.query("DELETE FROM state WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted state with id: ", id);
      result(null, res);
    });
  };

  State.DeleteAllState = result => {
    connection.query("DELETE FROM state", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} state`);
      result(null, res);
    });
  };


module.exports = State;