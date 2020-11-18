const sql = require("./db.js");
const Customer = function(customer) {
 
};

Customer.purchase_normal  = (email, result) => {
let sqlquery="SELECT * FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where user_bank.isprimary_bank=1 and users.email='"+`${email}`+"'";
    
sql.query(sqlquery, (err, res) => {  

      console.log("m- line 351 ")
      if (Array.isArray(res) && res.length) {
      if (res[0].hasOwnProperty('email')) {  
      let u_id=res[0].id;
      console.log("m- line 355 ",u_id)
      result(null, res);     }}
      else{     
       console.log("m- line 358 ")
       result(null, res);      
    }  
  });
  
  };
 

module.exports = Customer;
