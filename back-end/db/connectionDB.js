var mysql = require('mysql');

connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'elabdb',
    password : 'root'
});

module.exports = {
  start_con: function() {
    console.log('Starting');
    connection.connect();
  },
  end_con: function(){
    console.log('Ending');
    connection.end();
  },

  getAllUser: async function() {
    connection.connect();

    await connection.query('select * from Users', function(err, rows) {
        if (err) console.log(err);
        console.log('The solution is: ' + rows[0].Adres_user);
    });
    console.log(test)

    connection.end();
  },

  testTransition: async function(){
    console.log('getHistoryUser you_adress');
    //connection.connect();
    await connection.query({
        sql: `select * from transition`,
        timeout: 40000, // 40s
      },
      function (error, results, fields) {
        if (error) console.log(error);
        else{
            console.log('The solution is: Object ' + Object.keys(results));
            for (let i = 0; i < results.length; i++) {
                console.log('The solution is: ' + results[i].you_adress);
                console.log('The solution is: ' + results[i].to_adress);
                console.log('The solution is: ' + results[i].amount);
                console.log('The solution is: ' + results[i].message);
                console.log('The solution is: ' + results[i].time_transition);            
            }
            callback(results);
        }
      }
    );
  },

  // получение транзакций user-а 
  getHistoryUser: async function(you_adress, callback){
    console.log('getHistoryUser you_adress - ' + you_adress);
    //connection.connect();
    await connection.query({
        sql: `select * from transition 
                where you_adress=? or to_adress=?`,
        timeout: 40000, // 40s
      },
      [you_adress, you_adress],
      function (error, results, fields) {
        if (error) console.log(error + 'getHistoryUser');
        else{
            console.log('The solution is: Object ' + Object.keys(results));
            for (let i = 0; i < results.length; i++) {
                // console.log('The solution is: ' + results[i].you_adress);
                // console.log('The solution is: ' + results[i].to_adress);
                // console.log('The solution is: ' + results[i].amount);
                // console.log('The solution is: ' + results[i].message);
                // console.log('The solution is: ' + results[i].time_transition);            
            }
            callback(results);
        }
      }
    );
    //connection.end();
  },
  
  setTransaction: async function(you_adress, to_adress, amount, message, time_transition){
    //connection.connect();
    amount = amount + ' ETC';
    console.log(time_transition + " - TIME");
    await connection.query({
        sql: `insert transition 
            (you_adress, to_adress, amount, message, time_transition)
            value (?,?,?,?,?)`,
        timeout: 40000, // 40s
      },
      [you_adress, to_adress, amount, message, time_transition],
      function (error, results, fields) {
        if (error) console.log(error + 'setTransaction');
        console.log('The query setTransaction is: OK');
      }
    );
    //connection.end();
  },

  getUserAccount: async function(adress, password, callback){
    //connection.connect();
    await connection.query({
        // sql: `select Adres_user, Adres_servis, Balanse_user, Balanse_servis from Users
        //   where Adres_user=?`,
        sql: `select Adres_user, Adres_servis, Pass, Balanse_servis from Users
          where Adres_user = ? 
            and Pass = ?`,
        timeout: 40000, // 40s
      },
      [adress, password],
      function (error, results, fields) {
        if (error) console.log(error + "getUserAccount");
        else{
            console.log('Results ' + results);
            console.log('The solution is: Object ' + Object.keys(results));
            //console.log('The solution is: ' + results[0].Adres_user);
            for (let i = 0; i < results.length; i++) {
                console.log('The solution is: ' + results[i].Adres_user);
                console.log('The solution is: ' + results[i].Adres_servis);
                console.log('The solution is: ' + results[i].Balanse_user);
                console.log('The solution is: ' + results[i].Balanse_servis);           
            }
            callback(results);         
        }
      }
    );
  },

  updateUserBalanse: async function(amount_acc, adress){ //amount, adress
    console.log('UpdateUserBalanse');

    console.log('amount_acc - ' + amount_acc);
    console.log('adress - ' + adress);

    connection.query(
      `UPDATE Users SET 
        Balanse_servis = Balanse_servis + ?
      where Adres_user = ?`,
    [amount_acc, adress],
    function (error, results, fields) {
      if (error) console.log('throw error + updateUserBalanse');//throw error + "updateUserBalanse";
      else console.log('connDB UpdateUserBalanse OK');
    });
  },

  updateUserBalanseMinus: async function(amount_acc, adress){ //amount, adress
    console.log('updateUserBalanseMinus');

    console.log('amount_acc - ' + amount_acc);
    console.log('adress - ' + adress);

    connection.query(
      `UPDATE Users SET 
        Balanse_servis = Balanse_servis - ?
      where Adres_user = ?`,
    [amount_acc, adress],
    function (error, results, fields) {
      if (error) console.log('throw error + updateUserBalanse');//throw error + "updateUserBalanse";
      else console.log('connDB UpdateUserBalanse OK');
    });
  },

  testConn: async function (res) {
    console.log('testSol - OK')
    connection.ping((err) => {
        if(err) return res.status(500).send("MySQL Server is Down");
          
        res.send("MySQL Server is Active");
    })
  },

  dropDB: async function(){
    await connection.query({
      sql: `DROP TABLE Users`,
      timeout: 40000, // 40s
    },    
    function (error, results, fields) {
      if (error) console.log(error);
      else console.log('Drop is OK');       
    }
    );
  },

  createDBUsers: async function(){
    await connection.query({
      sql: `
      create table Users(
        Id INT PRIMARY KEY AUTO_INCREMENT ,
        Adres_user VARCHAR(42) UNIQUE,
        
        Adres_servis VARCHAR(42) UNIQUE,
        Privat_key VARCHAR(66) UNIQUE,
      
        Pass VARCHAR(256),
        Balanse_servis DOUBLE
      )`,
      timeout: 40000, // 40s
    },    
    function (error, results, fields) {
      if (error) console.log(error);
      else console.log('Create is OK');       
    }
    );
  },

  dropDBtransaction: async function(){
    await connection.query({
      sql: `DROP TABLE transition`,
      timeout: 40000, // 40s
    },    
    function (error, results, fields) {
      if (error) console.log(error);
      else console.log('Drop is OK');       
    }
    );
  },

  createDBtransaction: async function(){
    await connection.query({
      sql: `
      create table transition(
        you_adress VARCHAR(42),
        to_adress VARCHAR(42),
        amount VARCHAR(256),      
        message VARCHAR(256),     
        time_transition DATETIME      
      )
      `,
      timeout: 40000, // 40s
    },    
    function (error, results, fields) {
      if (error) console.log(error);
      else console.log('Create is OK');       
    }
    );
  },

  addUserDB: async function(adres_user, adres_servis, privateKey, pass){
    await connection.query({
      sql: `
      insert Users (Adres_user, Adres_servis, Privat_key, Pass, Balanse_servis)
      value
      (
        ?,
        ?,
        ?,
        ?,
        0
      )`,
      timeout: 40000, // 40s
    },    
    [adres_user, adres_servis, privateKey, pass],
    function (error, results, fields) {
      if (error) console.log(error);
      else console.log('Add user is OK');       
    }
    );
  },

  getPrivatKey: async function(adress, callback){
    console.log('getPrivatKey');
    await connection.query({
        sql: `select Privat_key from Users
	              where Adres_user = ? or Adres_servis = ?`,
        //sql: `select Privat_key from users u`,
                
        timeout: 40000, // 40s
      },
      [adress, adress],
      function (error, results, fields) {
        if (error) console.log(error + 'getPrivatKey');
        else{
            //console.log('The solution is: Object ' + Object.keys(results));
            for (let i = 0; i < results.length; i++) {
                console.log('The solution is: ' + results[i].Privat_key);         
            }
            callback(results);
        }
      }
    );
  }
}

