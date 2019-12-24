const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    /*development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }*/
     ganache: {
          host: "localhost",
          port: 7545,
          network_id: "*" // Match any network id
     },
     i3coin: {
       host: "localhost",
       port: 8545,
       network_id: "4224",
       //gas: 4712388
       gas:6700000
       //gasPrice:20000000000

     }
},
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
};
