const express = require('express');
const cors = require('cors')
const app = express();
// enabling CORS for any unknown origin(https://xyz.example.com)
app.use(cors());
const port = 3001 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const truffle_infrast = require('./connection/infrast.js');
const db = require('./db/connectionDB.js');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static('public_static'));

db.start_con();

app.get('/getAccounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    res.send(answer);
  })
});

app.post('/getBalance', (req, res) => {
  console.log("**** GET /getBalance ****");
  console.log(req.body);
  let currentAcount = req.body.account;

  truffle_connect.refreshBalance(currentAcount, (answer) => {
    let account_balance = answer;
    truffle_connect.start(function(answer){

      let all_accounts = answer;
      response = [account_balance, all_accounts]
      res.send(response);
    });
  });
});

app.post('/sendCoinMeta', (req, res) => {
  console.log("**** GET /sendCoin ****");
  console.log(req.body);

  let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;

  truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
    res.send(balance);
  });
});


// get all balanse 
app.get('/getAllBalanse', (req, res) => {
  console.log("**** GET /getAllBalanse ****");
  truffle_connect.getBalanseAccaunt();
  // truffle_connect.getBalanseAccaunt(function (answer) {
  //   res.send(answer);
  // })
});

app.post('/getTransactions', (req, res) => {
  console.log("**** GET /sendTransactions ****");
  let account = req.body.account;
  let toAdress = req.body.toAdress;

  truffle_connect.sendTransactions(account, toAdress);
});

app.get('/getTestSol', function(req, res) {
  console.log("**** GET /getTestSol ****");
  console.log("req - * " + req.query.account);
  //onsole.log("res - " + res);
  db.getHistoryUser(req.query.account, function (history) {
    res.send(history);
  })
});

// get all balanse 
app.get('/getBalanseAdress', (req, res) => {
  //console.log("**** GET /getBalanseAdress **** - " + Object.keys(req));
  //console.log("originalUrl******** - " + req.originalUrl);
  //console.log("params******** - " + req.query.account); 

  console.log("**** GET /getBalanseAdress ****");
  console.log("req - * " + req.query.adress);
  truffle_connect.getBalanceAdress(req.query.adress, function (balance) {
      res.send(balance);
  })
});

app.post('/sendCoin', (req, res) => {
  console.log("**** GET /sendCoin ****");
  console.log(req.body);

  var date = new Date();
  console.log(date);

  console.log(new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}));


  let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;
  let message = req.body.message;
  
  db.setTransaction(sender, receiver, amount, message, date)
  console.log('transactions is OK')
  
  truffle_connect.sendTransactions(amount, sender, receiver, (balance) => {
    res.send(balance);
  });
});

app.post('/sendCoinUser', (req, res) => {
  console.log("**** GET /sendCoinUser ****");

  let amount_user = req.body.amount_user;
  let amount_acc = req.body.amount_acc;
  let adress = req.body.adress;

  db.updateUserBalanse(amount_user, amount_acc, adress);
});
//

/*  DB  */
app.get("/getMysqlStatus", (req, res) => {

  truffle_db.testConn(res);
  
});

app.get('/getUserAccount', (req, res) => {
  console.log("**** GET /getUserAccount ****");
  console.log('req.body - ' + req.query.adress);
  console.log('Object req - ' + Object.keys(req.query));
  db.getUserAccount(req.query.adress, req.query.password , function (account) { //'0x58159043703749e032687f7e51c5a218ffaba410'
    res.send(account);
  });
  console.log("getUserAccount OK");
})

app.post('/postAddUser', (req, res) => {
  console.log("**** GET /postAddUser ****");
//   {
//   address: '0x6aF412aD3674ac42d422A76931c989Dea2c68da0',
//   privateKey: '0xb3739d5231655c8c20bf80c790f95262d99500c1f9d198ec1a2557b821e22a6b',
//   signTransaction: [Function: signTransaction],
//   sign: [Function: sign],
//   encrypt: [Function: encrypt]
// }
// [ 'address', 'privateKey', 'signTransaction', 'sign', 'encrypt' ]  
  let user = truffle_connect.createUser();
  console.log(user);

  let adres_user = req.body.adres_user; // user
  let adres_servis = user.address; // web3
  let pass = req.body.pass; // user

  db.addUserDB(adres_user, adres_servis, pass);
  console.log("postAddUser OK");
})

app.get('/getReDB', (req, res) => {
  console.log("**** GET /getReDB ****");

  db.dropDB();

  db.createDBUsers();
});
/* /DB/ */
//

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));

  console.log("Express Listening at http://localhost:" + port);

});
