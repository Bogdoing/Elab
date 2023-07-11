const contract = require('truffle-contract');

const metacoin_artifact = require('../build/contracts/MetaCoin.json');
var MetaCoin = contract(metacoin_artifact);

module.exports = {
  start: function(callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(self.accounts);
    });
  },
  refreshBalance: function(account, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  sendCoin: function(amount, sender, receiver, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: sender});
    }).then(function() {
      self.refreshBalance(sender, function (answer) {
        callback(answer);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getBalanseAccaunt: function (account) {
    var self = this;
    MetaCoin.setProvider(self.web3.currentProvider);
    
    self.web3.eth.getAccounts(function (err, accs) {
      console.log("getAccounts");
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }
      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      console.log('accs - ' + accs)
      console.log('self.account - ' + self.account)
      
      for (let i = 0; i < accs.length; i++) {
        console.log('accs - ' + i
          + ' | ' + accs[i]
          + ' | ' + self.web3.eth.getBalance(accs[i]))
      }

      //callback(self.accounts);
    });
  },

  sendTransactions: async function (amount, account, toAdress) {
    MetaCoin.setProvider(this.web3.currentProvider);
    //const weiAmount = this.web3.utils.toWei(amount.toString(), 'ether');
    //this.utils.parseEther(amount) // web3.utils.toWei("0.01", "ether")
    try {
      console.log("sendTransactions");
      console.log("ST account  - |" + account  + "|");
      console.log("ST toAdress - |" + toAdress + "|");
      console.log("ST amount - " + amount + " * amountx8 - " + amount*1000000000000000000);
      this.web3.eth.sendTransaction({
        from: account,
        to: toAdress,
        value: amount*1000000000000000000
      });

      // this.web3.eth.sendTransaction({from: '0x591D0c8600aCc0F7e9907ED1cd7b8e69d1fF4739', to: '0x85289B9eE778051188EFc2a39Ac900612d100a26', value: 1000000000000000000});
      //this.web3.eth.sendTransaction({from: '0x61B6B8BBae10B618aE01f357D33D8D6921e02476', to: '0x7847abd8c85d973b3fDa41B07803C38ccCfe0e09', value: 1000000000000000000});
      // web3.eth.getBalance('0x85289B9eE778051188EFc2a39Ac900612d100a26')

      console.log("appjs sendTransactions is OK");
    } catch (error) {
      console.log("sendTransactions EROR - " + error.message);
    }
  },

  sendTransactionsPrivate: async function (senderAddress, senderPrivateKey, recepientAddress, amount){

    console.log("Sending 1 ether from address: " + senderAddress + " to address: " + recepientAddress + " amount: ", amount);
  
    const nonce = await this.web3.eth.getTransactionCount(senderAddress, "latest");

    const transaction = {
      to: recepientAddress,
      value: this.web3.utils.toWei(amount, "ether"),
      gas: 30000,
      nonce: nonce,
    };

    const signedTransaction = await this.web3.eth.accounts.signTransaction(
      transaction,
      senderPrivateKey
    );

    const rawTransaction = signedTransaction.rawTransaction;

    console.log("Nonce for address", senderAddress, "is:", nonce);
    console.log("Raw transaction:", rawTransaction);

    this.web3.eth.sendSignedTransaction(rawTransaction, function (error, hash) {
      if (!error) {
        console.log("The hash of your transaction is: ", hash,
          "\n Check Transactions tab in Ganache to view your transaction!");
      } else {
        console.log("Something went wrong while submitting your transaction:", error);
      }
    });

  },

  getBalanceAdress: function (account, callback) {
    console.log('getBalanceAdress - ', account)
    var self = this;
    //account = "0x18bb0d2373c02ac68038bc5dda60a79bab83e9bb"
    self.web3.eth.getBalance(account, function(err, result) {
      if (err) {
        console.log('Err - ' + err)
      } else {
        console.log('OK - ' + result)
        // console.log(self.web3.utils.fromWei(result, "ether") + " ETH")
        // callback(self.web3.utils.fromWei(result, "ether"))
        callback(result)
      }
    })
  },

  createUser: function(){
    return this.web3.eth.accounts.create();
    
  }

}
