const contract = require('truffle-contract');

const metacoin_artifact = require('../build/contracts/MetaCoin.json');

module.exports = {
  start: function(callback) {
    var self = this;
    console.log('infrast - start')
  },

  testSol: async function (callback) {

    connection.connect();
    console.log('testSol - OK')
  },
}