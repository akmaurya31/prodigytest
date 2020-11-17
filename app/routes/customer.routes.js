module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
 
    // By Ashish Ji 
    
    app.get("/purchase",customers.purchase);//executed with error
};
