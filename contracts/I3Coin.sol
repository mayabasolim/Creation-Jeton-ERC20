pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract I3Coin is StandardToken {

    //Construction du jeton I3Coin (I3C)
    string public constant name = 'ICubeCoin';
    string public constant symbol = 'I3C';
    uint8 public constant decimals = 2;
    uint constant _initial_supply = 2100000000;
    //Utilisateur newUtilisateur= Utilisateur({id:1,mail:"hhhh", nom:"wapo"});
    //Constructeur
    function I3Coin() public {
        //newUtilisateur.nom="Nathalie";
        totalSupply_ = _initial_supply;
        balances[msg.sender] = _initial_supply;
        Transfer(address(0), msg.sender, _initial_supply);
        Utilisateur memory u;
        utilisateurCounter++;
        u.mail="rh@bp.fr";
        u.nom="rh";
        u.id=utilisateurCounter;
        u.actif=1;
        u.profil=1;
        //u.addr=msg.sender;
        listeUtilisateur[msg.sender] = u;



    }

    uint256 public montantOuvertureCompte=1000000;
    uint256 public montantPrimeCreationProjet=1000;

    enum Type_Utilisateur{PORTEUR,SOLUTIONNEUR}
    enum TypeOperation{CREATION_PROJET,VALIDATION_PROJET,TIP,SOLUTIONNER_PROJET,TRANSFERT,CREATION_COMPTE}

    struct Utilisateur {
        uint id;
        string mail;
        string nom;
        //string pass;
        uint actif;
        //address addr;
        uint profil;

    }
    struct Projet {
      uint id;
      address createur;
      string name;
      string description;
      uint256 price;
      //etat=0 en cours de traitement, etat= 1 valide, etat=2 rejeté
      uint etat;
      uint256 priceSolution;
    }

    struct Kiosque {
      uint id;
      string name;
      string description;
      uint256 price;
      //statut=0 (actif)  statut= 1 (désactivé)
      address createur;
      uint etat;
    }

    struct Operation{
      uint id;
      //createur/solutionneur/tippeur/envoyeur
      address operateur;
      uint256 montant;
      TypeOperation typeOperation;
      string description;
      //Quand il s'agit d'un tip ou de solutionner un projet
      uint idprojet;
      //Quand il s'agit d'un transfer de i3coin
      address  receveur;
    }

    mapping (address => Utilisateur) public listeUtilisateur;
    mapping (uint => Projet) public projets;
    mapping (address => uint[]) public favoris;
    mapping (uint => Kiosque) public kiosques;
    mapping (uint => Operation) public operations;

    uint public utilisateurCounter;
    uint public projetCounter;
    uint public operationCounter;
    uint public kiosqueCounter;

    event LogAjouterUtilisateur(
      uint indexed _id,
      address indexed _compte,
      string _nom,
      string _mail,
      address _valideur,
      uint256 montant
    );
    event LogCreerProjet(
      uint indexed _id,
      address indexed _createur,
      string _name,
      uint256 _price
    );
    event LogValiderProjet(
      uint indexed _id,
      address indexed _createur,
      string _name,
      uint256 _price,
      uint256 _recompense,
      address indexed _valideur
    );
    event LogSolutionnerProjet(
      uint indexed _id,
      address indexed _solutionneur,
      uint _idProjet,
      string _nomProjet,
      uint256 _montant,
      address indexed _createur
    );
    event LogTip(
      uint indexed _id,
      address indexed _tippeur,
      uint _idProjet,
      string _nomProjet,
      uint256 _montant,
      address indexed _createur
    );


    event LogTransfert(
      uint indexed _id,
      address indexed _envoyeur,
      address indexed _receveur,
      uint256 _montant
    );

    event LogKiosque(
      uint indexed _idProduit,
      address indexed client,
      string  _nomProduit,
      uint256  _prixProduit,
      address _vendeur
    );
    /*event LogTransaction(
      address owner;
      uint256 montant;
      TypeOperation typeOperation;
      string description;
      uint idprojet;
      address  receveur;

    );*/

    //Ajouter un nouvel utilisateur
    //Charger le compte de l'utilisateur après que le chargement du compte approuve le chargement
    //Precondition approve(spender,montant) lancé par l'utilisateur du compte chargeur

    function ajouterUtilisateur (string _mail, string _nom,address _addr) public {
      //transferFrom(_from,msg.sender, montantOuvertureCompte);
    // balances[_from]-=montantOuvertureCompte;
     //balances[msg.sender]+=montantOuvertureCompte;
      utilisateurCounter++;
      Utilisateur memory nouvelUtilisateur;
      nouvelUtilisateur.mail=_mail;
      nouvelUtilisateur.nom=_nom;
      nouvelUtilisateur.actif=0;
      nouvelUtilisateur.profil=0;
      nouvelUtilisateur.id=utilisateurCounter;
      //nouvelUtilisateur.addr=_addr;

      listeUtilisateur[_addr] = nouvelUtilisateur;


    }



    function validerUtilisateur(address _address)  public {

      Utilisateur storage utilisateur = listeUtilisateur[_address];
      //montantOuvertureCompte=msg.value;
      //require(utilisateur.id > 0 && utilisateur.id <= utilisateurCounter);
      balances[msg.sender]-=montantOuvertureCompte;
      balances[_address]+=montantOuvertureCompte;
      utilisateur.actif=1;
      /*operationCounter++;
      Operation memory op;
      op.id=operationCounter;
      op.montant = montantOuvertureCompte;
      op.operateur = msg.sender;
      op.typeOperation =  TypeOperation.CREATION_COMPTE;
      operations[operationCounter] = op;*/
      LogAjouterUtilisateur(utilisateur.id, _address, utilisateur.nom, utilisateur.mail,msg.sender,montantOuvertureCompte);

    }

    function updateUtilisateur (string _nom,string _mail) public {
      listeUtilisateur[msg.sender].nom =_nom;
      listeUtilisateur[msg.sender].mail =_mail;
      //listeUtilisateur[msg.sender].addr =msg.sender;
      //LogAjouterUtilisateur(listeUtilisateur[msg.sender].id, msg.sender, _nom, _mail);

    }
    function voirUtilisateur(address _address) public view returns (string,string,uint,uint,address,uint)  {
      return (listeUtilisateur[_address].nom,listeUtilisateur[_address].mail,listeUtilisateur[_address].profil, listeUtilisateur[_address].id,_address,listeUtilisateur[_address].actif);
    }

    function creationProjet(string _name, string _description, uint256 _price, address _from) public {
        transferFrom(_from,this,_price);
        //transfer(this,_price);
        projetCounter++;
        operationCounter++;

        Projet memory p;
        p.id = projetCounter;
        p.name=_name;
        p.description=_description;
        p.price = _price;
        p.createur = msg.sender;

        projets[projetCounter] = p;
        Operation memory op;
        op.id = operationCounter;
        op.montant = _price;
        op.operateur = msg.sender;
        op.typeOperation =  TypeOperation.CREATION_PROJET;
        operations[operationCounter] = op;
        LogCreerProjet(projetCounter, msg.sender, _name, _price);
    }
    function creerProjet(string _name, string _description, uint256 _price) public {
        //transferFrom(_from,this,_price);
        //transfer(this,_price);
        projetCounter++;
        operationCounter++;

        Projet memory p;
        p.id = projetCounter;
        p.name=_name;
        p.description=_description;
        p.price = _price;
        p.createur = msg.sender;
        p.etat = 0;
        p.priceSolution = 0;

        projets[projetCounter] = p;
        Operation memory op;
        op.id = operationCounter;
        op.montant = _price;
        op.operateur = msg.sender;
        op.typeOperation =  TypeOperation.CREATION_PROJET;
        operations[operationCounter] = op;
        LogCreerProjet(projetCounter, msg.sender, _name, _price);
    }

  function ajouterFavoris(uint _id) public {
      require(projetCounter > 0);
      require(_id > 0 && _id <= projetCounter);
      favoris[msg.sender].push(_id);

    }

      function envoyerEther(address _receiver) payable public {
        _receiver.transfer(msg.value);
      }

    function listeFavoris() public view returns (uint[]) {

        return favoris[msg.sender];

    }
  function ajouterKiosque(string _name, string _description, uint256 _price) public {
      kiosqueCounter++;

      Kiosque memory p;
      p.id = kiosqueCounter;
      p.name=_name;
      p.description=_description;
      p.price = _price;
      p.etat = 0;
      p.createur=msg.sender;
      kiosques[kiosqueCounter] = p;

  }
  function updateKiosque(uint _id,string _nom,uint256 _prix, string _description) public{
        require(kiosqueCounter > 0);
        require(_id > 0 && _id <= kiosqueCounter);
        Kiosque storage kiosque = kiosques[_id];
        kiosque.price=_prix;
        kiosque.name=_nom;
        kiosque.description=_description;
        kiosque.createur=msg.sender;
        kiosques[_id]=kiosque;
      }

    /*function validerProjet(uint _id) payable public {

      require(projetCounter > 0);
      require(_id > 0 && _id <= projetCounter);

      Projet storage projet = projets[_id];
      require(projet.etat!=1);
      //On aloue la prime au projet
      //transfer(this,projet.price);
      balances[msg.sender]-=projet.price;
      projet.etat=1;
      operationCounter++;
      Operation memory op;
      op.id=operationCounter;
      op.montant = projet.price;
      op.operateur = msg.sender;
      op.typeOperation =  TypeOperation.VALIDATION_PROJET;
      operations[operationCounter] = op;
    }*/
    function validerProjet(uint _id) public {

      require(projetCounter > 0);
      require(_id > 0 && _id <= projetCounter);

      Projet storage projet = projets[_id];
      require(projet.etat!=1);
      //On aloue la prime au projet
      //transfer(this,projet.price);
      balances[msg.sender]-=(projet.price+montantPrimeCreationProjet);
      balances[projet.createur]+=(projet.price+montantPrimeCreationProjet);
      projet.etat=1;
      /*operationCounter++;
      Operation memory op;
      op.id=operationCounter;
      op.montant = projet.price;
      op.operateur = msg.sender;
      op.typeOperation =  TypeOperation.VALIDATION_PROJET;
      operations[operationCounter] = op;*/
      LogValiderProjet(_id, projet.createur, projet.name, projet.price,montantPrimeCreationProjet,msg.sender);
    }

    function achatKiosque(uint _id) public {

      require(kiosqueCounter > 0);
      require(_id > 0 && _id <= kiosqueCounter);

      Kiosque storage kiosque = kiosques[_id];
      require(kiosque.etat!=1);
      balances[msg.sender]-=kiosque.price;
      balances[kiosque.createur]+=kiosque.price;
      LogKiosque(_id,msg.sender,kiosque.name,kiosque.price,kiosque.createur);
    }

    function getNumberOfProjets() public view returns (uint) {
      return projetCounter;
    }
    function getNumberOfUsers() public view returns (uint) {
      return utilisateurCounter;
    }
    function getProjets() public view returns (uint[]) {
      uint[] memory projetIds = new uint[](projetCounter);
      uint numberOfProjets = 0;
        for(uint i = 1; i <= projetCounter;  i++) {
        projetIds[numberOfProjets] = projets[i].id;
        numberOfProjets++;
      }

      uint[] memory listPro = new uint[](numberOfProjets);
      for(uint j = 0; j < numberOfProjets; j++) {
        listPro[j] = projetIds[j];
      }
      return listPro;
    }

    //Tip sur un projet
    function tipProjet(uint _id,uint256 _montant) public {

      require(projetCounter > 0);
      require(_id > 0 && _id <= projetCounter);

      Projet storage projet = projets[_id];
      balances[msg.sender]-=_montant;
      balances[projet.createur]+=_montant;
    /*  operationCounter++;
      Operation memory op;
      op.id=operationCounter;
      op.montant = _montant;
      op.operateur = msg.sender;
      op.typeOperation =  TypeOperation.TIP;
      operations[operationCounter] = op;*/

      projet.price+=_montant;
      LogTip(operationCounter,msg.sender,_id,projet.name,_montant,projet.createur);
    }


    //Solutionner un projet
    function solutionnerProjet(uint _id,address _solutionneur,uint256 montant_) public {
      require(projetCounter > 0);
      require(_id > 0 && _id <= projetCounter);
      Projet storage projet = projets[_id];
      require(montant_<=projet.price);

      balances[msg.sender]-=montant_;
      balances[_solutionneur]+=montant_;
      projet.priceSolution+=montant_;

      /*operationCounter++;
      Operation memory op;
      op.id=operationCounter;
      op.montant = montant_;
      op.operateur = msg.sender;
      op.typeOperation =  TypeOperation.SOLUTIONNER_PROJET;
      operations[operationCounter] = op;*/

      LogSolutionnerProjet(operationCounter,_solutionneur,_id,projet.name,montant_,projet.createur);
  }

  //transfert de compte à compte
  function transfert(address _receveur,uint256 _montant) payable  public {
  //  balances[msg.sender]-=_montant;
  //  balances[_receveur]+=_montant;

    transfer(_receveur,_montant);
    operationCounter++;
    Operation memory op;
    op.id=operationCounter;
    op.montant = _montant;
    op.operateur = msg.sender;
    op.typeOperation =  TypeOperation.TRANSFERT;
    op.receveur = _receveur;
    operations[operationCounter] = op;
    LogTransfert(operationCounter,msg.sender,_receveur,_montant);
  }



}
