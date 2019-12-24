var I3Coin = artifacts.require("./I3Coin.sol");

contract('I3Coin', function(accounts){
  var compte0 = accounts[0];
  var compte1 = accounts[1];
  var compte2 = accounts[2];
  var compte3 = accounts[3];
  var montant_autorise=5000;
  var nom_projet1 = "projet 1";
  var description_projet1 = "Description du projet 1";
  var prime_projet1 = 1000;
  var nom_projet2 = "projet 2";
  var description_projet2 = "Description du projet 2";
  var prime_projet2 = 1000;
  var montant_tip=500;
  var montant_transfer=1000;

  //autoriser le transfert et ajouter un utilisateur
/*  it("Devrait ajouter un utilisateur", function() {
    return I3Coin.deployed().then(function(instance){
      i3cInstance = instance;
    return i3cInstance.approve(
        compte1,montant_autorise,
        {from: compte0}
      );
    }).then(function(receipt){
      return i3cInstance.ajouterUtilisateur(
          "nathalie@gmail.com",
          "nathalie",
           compte0,
          {from: compte1}
        );
      }).then(function(receipt){
        assert.equal(receipt.logs.length, 2, "un événement aurait dû être déclenché");
        assert.equal(receipt.logs[1].event, "LogAjouterUtilisateur", "l'evenement devrait etre LogCreerProjet");
        assert.equal(receipt.logs[1].args._id.toNumber(), 1, "id devrait etre 1");
        assert.equal(receipt.logs[1].args._compte, compte1, "le createur devrait etre " + compte1);
        assert.equal(receipt.logs[1].args._nom, "nathalie", "le nom de l'evenement devrait etre" + "nathalie");
     });

  });

  //autoriser le transfert et creeer un projet1
  it("Devrait creer un projet", function() {
    return I3Coin.deployed().then(function(instance){
    i3cInstance = instance;
    return i3cInstance.approve(
        compte1,montant_autorise,
        {from: compte0}
      );
    }).then(function(receipt){
      return i3cInstance.creerProjet(
          nom_projet1,
          description_projet1,
          prime_projet1,
          compte0,
          {from: compte1}
        );
      }).then(function(receipt){
      assert.equal(receipt.logs.length, 2, "un événement aurait dû être déclenché");
      assert.equal(receipt.logs[1].event, "LogCreerProjet", "l'evenement devrait etre LogCreerProjet");
      assert.equal(receipt.logs[1].args._id.toNumber(), 1, "id devrait etre 1");
      assert.equal(receipt.logs[1].args._createur, compte1, "le createur devrait etre " + compte1);
      assert.equal(receipt.logs[1].args._name, nom_projet1, "le nom de l'evenement devrait etre" + nom_projet1);
      assert.equal(receipt.logs[1].args._price.toNumber(), prime_projet1, "la prime de lnement devrait etre " +prime_projet1);

      return i3cInstance.getNumberOfProjets();
    }).then(function(data) {
      assert.equal(data, 1, "le nombre de projet doit etre un");

      return i3cInstance.getProjets();
    }).then(function(data) {
      assert.equal(data.length, 1, "il doit exister un projet ");
      assert.equal(data[0].toNumber(), 1, "l'id du projet devrait etre 1");

      return i3cInstance.projets(data[0]);
    }).then(function(data) {
      assert.equal(data[0].toNumber(), 1, "l'id du projet devrait etre 1");
      assert.equal(data[1], compte1, "le createur doit etre " + compte1);
      assert.equal(data[2], nom_projet1, "le nom du projet devrait etre " + nom_projet1);
      assert.equal(data[3], description_projet1, "la description du projet devrait etre " + description_projet1);
      assert.equal(data[4].toNumber(),prime_projet1, "la prime du projet devrait etre " + prime_projet1);
    });
  });

  //autoriser le transfert et creeer un projet2
  it("Devrait creer un projet2", function() {
    return I3Coin.deployed().then(function(instance){
    i3cInstance = instance;
    return i3cInstance.approve(
        compte1,montant_autorise,
        {from: compte0}
      );
    }).then(function(receipt){
      return i3cInstance.creerProjet(
          nom_projet2,
          description_projet2,
          prime_projet2,
          compte0,
          {from: compte1}
        );
      }).then(function(receipt){
      assert.equal(receipt.logs.length, 2, "un événement aurait dû être déclenché");
      assert.equal(receipt.logs[1].event, "LogCreerProjet", "l'evenement devrait etre LogCreerProjet");
      assert.equal(receipt.logs[1].args._id.toNumber(), 2, "id devrait etre 2");
      assert.equal(receipt.logs[1].args._createur, compte1, "le createur devrait etre " + compte1);
      assert.equal(receipt.logs[1].args._name, nom_projet2, "le nom de l'evenement devrait etre" + nom_projet2);
      assert.equal(receipt.logs[1].args._price.toNumber(), prime_projet2, "la prime de lnement devrait etre " +prime_projet2);

      return i3cInstance.getNumberOfProjets();
    }).then(function(data) {
      assert.equal(data, 2, "le nombre de projet doit etre un");

      return i3cInstance.getProjets();
    }).then(function(data) {
      assert.equal(data.length, 2, "il doit exister un projet ");
      assert.equal(data[1].toNumber(), 2, "l'id du projet devrait etre 2");

      return i3cInstance.projets(data[1]);
    }).then(function(data) {
      assert.equal(data[0].toNumber(), 2, "l'id du projet devrait etre 1");
      assert.equal(data[1], compte1, "le createur doit etre " + compte1);
      assert.equal(data[2], nom_projet2, "le nom du projet devrait etre " + nom_projet2);
      assert.equal(data[3], description_projet2, "la description du projet devrait etre " + description_projet2);
      assert.equal(data[4].toNumber(),prime_projet2, "la prime du projet devrait etre " + prime_projet2);
    });
  });

//Tip sur le projet 1
  it("Devrait pouvoir tipper un projet", function(){
    return I3Coin.deployed().then(function(instance) {
      i3cInstance = instance;
      return i3cInstance.tipProjet(1, montant_tip, {
        from: compte2,value: montant_tip
      });
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, "Un evenement devrait etre declenché");
      assert.equal(receipt.logs[0].event, "LogTip", "l'evenement devrait etre LogTip");
      assert.equal(receipt.logs[0].args._id.toNumber(), 3, "l'id de la transaction devrait etre 4");
      assert.equal(receipt.logs[0].args._tippeur,compte2, "le tippeur devrait etre " + compte2);
      assert.equal(receipt.logs[0].args._idProjet, 1, "l'id du projet tippé devrait etre 1");
      assert.equal(receipt.logs[0].args._montant.toNumber(),montant_tip , "Le montant du tip devrait etre "+montant_tip);
      return i3cInstance.getProjets();
    });
  });

//Solutionner le projet 1
  it("Devrait pouvoir solutionner un projet", function(){
   return I3Coin.deployed().then(function(instance) {
      i3cInstance = instance;
      return i3cInstance.solutionnerProjet(1,prime_projet1, {
        from: compte3
      });
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, "un evenement devrait etre declenché");
      assert.equal(receipt.logs[0].event, "LogSolutionnerProjet", "l'evenement devrait etre  LogSolutionnerProjet");
      assert.equal(receipt.logs[0].args._id.toNumber(), 4, "l'id de la transaction devrait etre 4");
      assert.equal(receipt.logs[0].args._solutionneur, compte3, "le solutionneur devrait etre " + compte3);
      assert.equal(receipt.logs[0].args._idProjet, 1, "l'id du projet solutionné devrait etre 1");
      return i3cInstance.getProjets();
    });

  });

//Transfer de compte à compte
  it("Devrait pouvoir transfeerer des i3coin", function(){
   return I3Coin.deployed().then(function(instance) {
     i3cInstance = instance;
     return i3cInstance.transfert(compte3, montant_transfer, {
       from: compte1
     });
   }).then(function(receipt){
     assert.equal(receipt.logs.length, 2, "Un evenement devrait etre declenché");
     assert.equal(receipt.logs[1].event, "LogTransfert", "l'evenement doit etre LogTransfert");
     assert.equal(receipt.logs[1].args._id.toNumber(), 5, "l'id de la transaction devrait etre 5");
     assert.equal(receipt.logs[1].args._envoyeur,compte1, "l'envoyeur devrait etre " + compte1);
     assert.equal(receipt.logs[1].args._receveur,compte3, "le receveur devrait etre " + compte3);
     assert.equal(receipt.logs[1].args._montant.toNumber(),montant_transfer, "le montant à envoyer devrait etre "+montant_transfer);
     return i3cInstance.getProjets();
   });
 });*/

 //Transfer de compte à compte
  /* it("Devrait fournir la balance du compte", function(){
    return I3Coin.deployed().then(function(instance) {
      i3cInstance = instance;
      return i3cInstance.balanceOf(compte0, {
        from: compte0
      });
    }).then(function(receipt){
      //assert.equal(receipt.logs.length, 1, "Un evenement devrait etre declenché");
      assert.equal(receipt, 2100000000, "le solde  du compte  devrait etre : ");


    });
  });*/
  it("Devrait faire un update", function(){
   return I3Coin.deployed().then(function(instance) {
     i3cInstance = instance;
     return i3cInstance.updateUtilisateur("Peniel","peniel@gmail.com", {
       from: compte0
     });
   }).then(function(receipt){
     //assert.equal(receipt.logs.length, 1, "Un evenement devrait etre declenché");
     //assert.equal(receipt, 2100000000, "le solde  du compte  devrait etre : ");


   });
 });

});
