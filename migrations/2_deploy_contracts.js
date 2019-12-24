
var I3Coin = artifacts.require("./I3Coin.sol");

module.exports = function(deployer) {
  deployer.deploy(I3Coin);
};


/*var I3Coin = artifacts.require("./I3Coin.sol");
var I3Projet = artifacts.require("./I3Projet.sol");
var owner = web3.eth.accounts[0];

module.exports = function(deployer) {
  deployer.deploy(I3Coin,{from:owner}).then(
    function(){
      return deployer.deploy(I3Projet,I3Coin.address,owner);
    }
  );
};
*/
