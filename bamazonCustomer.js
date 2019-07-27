var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "Secret@5",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });

  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      promptUser(res)
      connection.end();
    });
  }

function promptUser(inventory) {
    inquirer.prompt([{
        type: "input",
        name: 'choice',
        message: 'What is the ID of the item you would like to purchase?',
        
    },
    {
        type: "input",
        name: 'quantity',
        message: 'How many would you like to to buy?',      
    },
    ])

.then(function(answer) {

  var product_id = Number(answer.choice);
  var desired_quantity = Number(answer.quantity);

for (var i = 0; i < inventory.length; i++) {
  if (product_id === inventory[i].item_id){
    console.log("we found your product", inventory[i].product_name);
    if (desired_quantity < inventory[i].stock_quanity){
      console.log ("we have enough");
        }
    if (desired_quantity > inventory[i].stock_quanity){
      console.log ("insufficient inventory");
 }
  }
}

}
)}