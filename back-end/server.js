const express = require('express');
const https = require('https')
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

/// Sol get all acount blockein
app.get('/getAccounts', (req, res) => {
	console.log("**** GET /getAccounts ****");
	truffle_connect.start(function (answer) {
		res.send(answer);
	})
});

/// Sol Update blanse current user adress
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

/// Sol send coin Meta
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


/// get all balanse 
app.get('/getAllBalanse', (req, res) => {
	console.log("**** GET /getAllBalanse ****");
	truffle_connect.getBalanseAccaunt();
	// truffle_connect.getBalanseAccaunt(function (answer) {
	//   res.send(answer);
	// })
});

/// send transition 
app.post('/getTransactions', (req, res) => {
	console.log("**** GET /sendTransactions ****");
	let account = req.body.account;
	let toAdress = req.body.toAdress;

	truffle_connect.sendTransactions(account, toAdress);
});

/// get list all History current user from DB
app.get('/getTestSol', function(req, res) {
	console.log("**** GET /getTestSol ****");
	console.log("req - * " + req.query.account);
	//onsole.log("res - " + res);
	db.getHistoryUser(req.query.account, function (history) {
		res.send(history);
	})
});

/// get balanse current user (adress user)
app.get('/getBalanseAdress', (req, res) => {
	console.log("**** GET /getBalanseAdress ****");
	console.log("req - * " + req.query.adress);
	truffle_connect.getBalanceAdress(req.query.adress, function (balance) {
		res.send(balance);
	})
});

/// transaction originating from a wallet created in truffle
app.post('/sendCoin', (req, res) => {
	console.log("**** GET /sendCoin ****");
	console.log(req.body);
	var date = new Date();
	console.log(date);
	let amount = req.body.amount;
	let sender = req.body.sender;
	let receiver = req.body.receiver;
	let message = req.body.message;
	// console.log(amount);
	// console.log(sender);
	// console.log(receiver);
	// console.log(message);
	// console.log(date);

	truffle_connect.sendTransactions(amount, sender, receiver);
	db.setTransaction(sender, receiver, amount, message, date);
	console.log('sendTransactions is OK')
});

/// transaction originating from a wallet created not in truffle 
/// and using a private key
app.post('/sendCoinPrivat', async (req, res) => {
	console.log("**** GET /sendCoinPrivat ****");
	console.log(req.body);

	var date = new Date();
	console.log(date);

	let amount = req.body.amount;
	let sender = req.body.sender;
	let receiver = req.body.receiver;
	let message = req.body.message;

	console.log('sender - ' + sender);
	console.log('receiver - ' + receiver);
	console.log('amount - ' + amount);

	await db.getPrivatKey(sender, function (key) { 
		let senderPrivateKey = ''
		senderPrivateKey = key[0].Privat_key;
		console.log('key - ' + key[0].Privat_key);

		console.log('SCP senderPrivateKey - ' + senderPrivateKey + '*');

		let splitSenser = senderPrivateKey.split('x' , 64);
		console.log('SCP splitSenser - ' + splitSenser[1] + '*');
	
		truffle_connect.sendTransactionsPrivate(sender, splitSenser[1], receiver, amount);
	
		db.setTransaction(sender, receiver, amount, message, date);
		//db.updateUserBalanseMinus(amount, sender)
	});

	
	console.log('sendTransactions is OK')
});

/// set info about the transaction from DB
app.post('/sendCoinUser', (req, res) => {
	console.log("**** GET /sendCoinUser ****");

	let amount_user = req.body.amount_user;
	let amount_acc = req.body.amount_acc;
	let adress = req.body.adress;

	// console.log("SCU amount_user - " + amount_user);
	// console.log('SCU amount_acc - ' + amount_acc);
	// console.log('SCU adress - ' + adress);

	//db.updateUserBalanse(amount_acc, adress);
});
//

/*  DB  */
/// test connection DB
app.get("/getMysqlStatus", (req, res) => {
  	truffle_db.testConn(res);
});

/// current user authentication via DB
app.get('/getUserAccount', (req, res) => {
	console.log("**** GET /getUserAccount ****");
	console.log('req.body - ' + req.query.adress);
	console.log('Object req - ' + Object.keys(req.query));
	db.getUserAccount(req.query.adress, req.query.password , function (account) { //'0x58159043703749e032687f7e51c5a218ffaba410'
		res.send(account);
	});
	console.log("getUserAccount OK");
})

/// add new user account
app.post('/postAddUser', (req, res) => {
	console.log("**** GET /postAddUser ****");
	let user = truffle_connect.createUser();
	console.log(user);

	let adres_user = req.body.adres_user; // user
	let adres_servis = user.address; // web3
	let privateKey = user.privateKey; // web3
	let pass = req.body.pass; // user

	db.addUserDB(adres_user, adres_servis, privateKey, pass);
	console.log("postAddUser OK");
})

/// overwriting the table Users
app.get('/getReDB', (req, res) => {
	console.log("**** GET /getReDB ****");

	db.dropDB();

	db.createDBUsers();
});

/// overwriting the table transition
app.get('/getReDBtransaction', (req, res) => {
	console.log("**** GET /getReDBtransaction ****");

	db.dropDBtransaction();

	db.createDBtransaction();
});
/* /DB/ */

/// get prise GAS (in GWEI) from transaction
app.get("/getPriseGas", function(req, res) {
	// let adres_user = req.body.adres_user; // user
	// let adres_servis = user.address; // web3
	// let privateKey = user.privateKey; // web3
	// let pass = req.body.pass; // user

	// get prise valet
	const options = {
		hostname: 'https://api.coingecko.com',
		//port: 443,
		path: '/api/v3/coins/ethereum?tickers=true&market_data=true',
		method: 'GET'
	  }
	  const result = https.request(options, (res) => {
		console.log(`statusCode: ${res.statusCode}`)
		res.on('data', (d) => {
		  process.stdout.write(d)
		})
	  })
	  result.on('error', (error) => {
		console.error(error)
	  })
	  result.end()
	//



	//truffle_connect.getGweiLimit(gasPrise, transaction)
}); 

///  start application
app.listen(port, () => {
	// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
	console.log("Express Listening at http://localhost:" + port);
});
