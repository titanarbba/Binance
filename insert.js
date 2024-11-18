// Get the client
//import mysql from 'mysql2/promise';
const mysql = require('mysql2');


// Create the connection to database
let connection = mysql.createConnection({
//  const connection = mysql.createConnection({
    host: '34.135.44.131', 
    user: 'booderremote',
    database: 'binance',
     port: '3306',
     password: '123456',
});

/*
try {
  //const sql = 'INSERT INTO wallet (`cur`,`solde`) VALUES ("BTC",  3)';
  
  const sql = 'UPDATE wallet SET `solde` = 20 WHERE `cur` = "BTC" ';

  const [result, fields] = await connection.query(sql);

  console.log(result);
  console.log(fields);
} catch (err) {
  console.log(err);
}*/

//await connection.connect();

  function insertall(a) {
  const sql = 'UPDATE wallet SET `solde` = ? WHERE `cur` = "BTC" ';
  connection.query(sql,a);
  //return result.pop;

}


module.exports = {
  insertall
};
insertall(904);
