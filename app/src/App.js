import Web3 from 'web3';
//import {Accounts} from 'web3-eth-accounts';
import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
//import Loader from 'react-loader-spinner';

import { css } from '@emotion/core';
import { BeatLoader} from 'react-spinners';


import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/shards-dashboards.1.1.0.min.css";
import I3Coin from './contracts/I3Coin.json';
import TruffleContract from 'truffle-contract';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class App extends React.Component {
  web3:''
  accounts:[]
  constructor(props) {
    super(props)
    this.state = {
      loading:false,
      account: '0x0',
      account0: '0x0',
      //account0: '0x7c4fc456cd35099e62cce60d000285768ee5a5a0',
      balance:'',
      projets: [],
      operations:[],
      mesprojets:[],
      mestransferts:[],
      utilisateurs:[],
      favoris:[],
      projetsFavoris:[],
      //userDetails: {nom:'',mail:''}
      userDetails: {},
      evenements:[],
      kiosques:[],
      mesachats:[],
      mesventes:[],
      projets_page:[]

    }

  this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
  this.page="/login"
/*  var version = this.web3.version.api;
console.log(version); // "0.2.0"
  //console.log("web "+JSON.stringify(this.web3))*/
    App.web3 = new Web3(this.web3Provider);
  //  this.displayAccountInfo();

    this.i3Coin = TruffleContract(I3Coin)
    this.i3Coin.setProvider(this.web3Provider)
    this.watchEvents = this.watchEvents.bind(this);

  }
/*  displayAccountInfo() {

    App.web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
      App.l=account
      App.web3.eth.getBalance(account, function(err, balance) {
          if(err === null) {
            console.log("balance"+balance.toString())
          }
        })
      }
    });
}*/



componentDidMount() {

   let acc=localStorage.getItem('account') || '';
   let acc0=localStorage.getItem('account0') || '';
   this.setState({account:acc})
   this.setState({account0:acc0})
   this.load();

}
watchEvents() {
  this.setState({ evenements: []})
  this.setState({ mestransferts: []})
  this.setState({ mesachats: []})
  this.setState({ mesventes: []})
  App.i3CoinInstance.LogCreerProjet({}, {
      //filter: {_createur: this.state.account},
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      const evenements = [...this.state.evenements]
      if(event.args._createur === this.state.account){
      evenements.push({
        msg: "Création projet : "+event.args._name+ " | prime : "+ event.args._price,
        id:event.args._id,
        montant:""
      });
    }
      this.setState({ evenements: evenements })

    })

    App.i3CoinInstance.LogValiderProjet({}, {
        //filter: {_createur: this.state.account},
        fromBlock: 0,
        toBlock: 'latest'
      }).watch((error, event) => {
        const evenements = [...this.state.evenements]
        if(event.args._createur === this.state.account){
          var x=Number(event.args._price );
          var y=Number(event.args._recompense );
        //  console.log("typeeee  "+ (x+y));
        evenements.push({
          msg: "Validation projet : "+event.args._name+ " | prime : "+ event.args._price+ " | récompense : "+event.args._recompense,
          id:event.args._id,
          montant: "+ "+ (x+y) +" I3C"
        });
          this.setState({ evenements: evenements })
      }
      if(event.args._valideur === this.state.account){
        var x=Number(event.args._price );
        var y=Number(event.args._recompense );
      //  console.log("typeeee  "+ (x+y));
      evenements.push({
        msg: "Validation projet : "+event.args._name+ " | prime : "+ event.args._price+ " | récompense du porteur : "+event.args._recompense,
        id:event.args._id,
        montant: "- "+ (x+y) +" I3C"
      });
        this.setState({ evenements: evenements })
    }


      })

App.i3CoinInstance.LogAjouterUtilisateur({}, {
    fromBlock: 0,
    toBlock: 'latest'
  }).watch((error, event) => {
    const evenements = [...this.state.evenements]
      if(event.args._compte === this.state.account){

    evenements.push({
      msg: "Compte  "+event.args._compte+"  ajouté",
      id:event.args._id,
      montant: "+ "+ event.args.montant+" I3C"
    });
    this.setState({ evenements: evenements })
    }
    if(event.args._valideur === this.state.account){

    evenements.push({
      msg: "Compte  "+event.args._compte+"  ajouté",
      id:event.args._id,
      montant: "- "+ event.args.montant+" I3C"
    });
    this.setState({ evenements: evenements })
  }


})

  App.i3CoinInstance.LogSolutionnerProjet({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      const evenements = [...this.state.evenements]
      if(event.args._solutionneur === this.state.account){

      evenements.push({
        msg: "Projet  "+event.args._nomProjet+" solutionné",
        id:event.args._id,
        montant: "+ "+ event.args._montant+" I3C"
      });
      this.setState({ evenements: evenements })
      }
      if(event.args._createur === this.state.account){

      evenements.push({
        msg: "Projet  "+event.args._nomProjet+" solutionné par "+event.args._solutionneur,
        id:event.args._id,
        montant: "- "+ event.args._montant+" I3C"
      });
      this.setState({ evenements: evenements })
    }


  })
    App.i3CoinInstance.LogTip({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch((error, event) => {
        const evenements = [...this.state.evenements]
        const evenements2 = [...this.state.evenements]
        if(event.args._tippeur === this.state.account){

        evenements.push({
          msg: "Tip projet : "+event.args._nomProjet,
          id:event.args._id,
          montant: "- "+ event.args._montant+" I3C"
        });
        this.setState({ evenements: evenements })
        }
        if(event.args._createur === this.state.account){

        evenements.push({
          msg: "Tip projet : "+event.args._nomProjet+ " | montant : "+ event.args._montant+ " | De : "+event.args._tippeur,
          id:event.args._id,
          montant: "+ "+ event.args._montant+" I3C"
        });
        this.setState({ evenements: evenements })
      }


    })
    App.i3CoinInstance.LogKiosque({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch((error, event) => {
        const mesachats = [...this.state.mesachats]
        const mesventes=[...this.state.mesventes]
        const evenements = [...this.state.evenements]
        if(event.args.client === this.state.account){
          mesachats.push({
            id: event.args._idProduit,
            nom: event.args._nomProduit,
            prix: +event.args._prixProduit.toString()
          });
          mesachats.sort(function (a, b) {
              return b.id - a.id;
            });
        this.setState({ mesachats: mesachats })
        evenements.push({
          msg: "Achat du produit :  "+event.args._nomProduit,
          id: event.args._idProduit,
          montant: "- "+ event.args._prixProduit+" I3C"
        });

      this.setState({ evenements: evenements })
        }
          if(event.args._vendeur=== this.state.account){
        mesventes.push({
          id: event.args._idProduit,
          nom: event.args._nomProduit,
          prix: +event.args._prixProduit.toString()
        });
        mesventes.sort(function (a, b) {
            return b.id - a.id;
          });
        this.setState({ mesventes: mesventes })
        evenements.push({
          msg: "Vente du produit :  "+event.args._nomProduit,
          id: event.args._idProduit,
          montant: "+ "+ event.args._prixProduit+" I3C"
        });
        this.setState({ evenements: evenements })
}
    })

    App.i3CoinInstance.LogTransfert({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch((error, event) => {
        const evenements = [...this.state.evenements]
        const mestransferts = [...this.state.mestransferts]
        if(event.args._envoyeur === this.state.account){

        mestransferts.push({
          id: event.args._id,
          montant: "- "+ event.args._montant+" I3C",
          description: "*****",
          destinataire:  event.args._receveur,

        });

          mestransferts.sort(function (a, b) {
              return b.id - a.id;
            });
        this.setState({ mestransferts: mestransferts })
        evenements.push({
          msg: "Transfer envoyé au compte:  "+event.args._receveur,
          id: event.args._id,
          montant: "- "+ event.args._montant+" I3C"
        });
        this.setState({ evenements: evenements })
      }
      if(event.args._receveur === this.state.account){
        mestransferts.push({
          id: event.args._id,
          montant: "+ "+ event.args._montant+" I3C",
          description: "*****",
          destinataire:  event.args._envoyeur,

        });
        this.setState({ mestransferts: mestransferts })
      evenements.push({
        msg: "Transfer recu du compte :" +event.args._envoyeur,
        id:event.args._id,
        montant: "+ "+ event.args._montant+" I3C"

        });
        this.setState({ evenements: evenements })
      }


    })
}

load() {
    this.setState({loading:false});
    App.web3.eth.getAccounts( console.log);

    App.web3.eth.getAccounts((err, accounts) => {
      this.setState({account0: accounts[0] })
    })

    this.i3Coin.deployed().then((i3CoinInstance) => {
        App.i3CoinInstance = i3CoinInstance
        this.watchEvents()
        App.i3CoinInstance.balanceOf(this.state.account).then((balance) => {
                balance=balance.toString()
                this.setState({balance})
          });
          this.profilInfo();
          this.listeProjet();
        //  this.listeOperation();
          this.listeUtilisateur();
          this.listeKiosque()
      })

  }


  profilInfo() {
      App.i3CoinInstance.voirUtilisateur(this.state.account).then((utilisateur) => {
      if(utilisateur === undefined){

          }else{

          this.setState({userDetails:utilisateur});
          }
  })
  }

  updateUtilisateur=(nom,mail)=>{
  this.setState({loading:true});
    App.i3CoinInstance.updateUtilisateur(nom,mail,{from: this.state.account,gas: 210000}).then(()=>{
         this.load();
    })

  }

  ajouterUtilisateur() {
      //App.i3CoinInstance.ajouterUtilisateur("","","0xf34eeac9d105533063ab456732015fc35e16db78",{from: this.state.account ,gas: 21000})
   }

   creerProjet=(nom,description,prime)=>{

  this.setState({loading:true});

        App.i3CoinInstance.creerProjet(nom,description,prime,{ from: this.state.account ,gas: 500000}).then(()=>{

          this.load();
       })


   }
   ajouterKiosque=(nom,description, prix)=>{
   this.setState({loading:true});
     App.i3CoinInstance.ajouterKiosque( nom,description, prix,{ from: this.state.account ,gas: 500000}).then(()=>{
        this.load();
    })
   }

   creerCompte=(nom,mail,pass)=>{
   this.setState({loading:true});


   App.web3.personal.unlockAccount("0x006b4885e6bc5f22b725244803539425694a10c7", "pass1234", 1500, function(err, res){
       App.web3.personal.newAccount(pass, function(err, addr){
          //  console.log("l compte est1 ")
            App.i3CoinInstance.ajouterUtilisateur(mail,nom,addr,{from: "0x006b4885e6bc5f22b725244803539425694a10c7" ,gas: 500000}).then(()=>{
          //    console.log("l compte est2 ")
              App.web3.personal.lockAccount("0x006b4885e6bc5f22b725244803539425694a10c7" , function(err, res){ localStorage.clear();})
              window.location.pathname = '/login'
            })

       })

   })

    /* App.web3.personal.newAccount(pass, function(err, addr){
       if(!err){
         App.web3.eth.getAccounts((err, accounts) => {
           //this.setState({account0: accounts[0] })
           App.i3CoinInstance.ajouterUtilisateur(mail,nom,addr,{from:  accounts[0] ,gas: 500000}).then(()=>{
              window.location.pathname = '/login'
           })
         })

       }
    })*/

  }
  transfer=(receveur,motif,montant)=>{
  this.setState({loading:true});
    App.i3CoinInstance.transfert(receveur,montant,{from: this.state.account,value:montant,gas:1000000}).then(()=>{
         this.load();
    })


  }
  validerProjet=(id,montant)=>{
    this.setState({loading:true});
      App.i3CoinInstance.validerProjet(id,
        {from: this.state.account ,
        // value: montant,
         gas: 500000
       }).then(()=>{
            this.load();
       })
  }
  achatKiosque=(id)=>{
  this.setState({loading:true});
    App.i3CoinInstance.achatKiosque(id,
      {from: this.state.account ,
      // value: montant,
       gas: 500000
     }).then(()=>{
          this.load();
     })
  }

  ajouterFavoris=(id)=>{
  this.setState({loading:true});
    if(this.state.favoris.includes(id.toString())){
    //  console.log("Deja favoris")
    }
     else{

       App.i3CoinInstance.ajouterFavoris(id,
          {from: this.state.account ,
           gas: 500000
         }).then(()=>{
              this.load();
         })
      }
  /*  console.log(this.state.favoris.includes("1"));
    for (var i in this.state.favoris) {
      console.log(" hh "+this.state.favoris[i])

    }
    //console.log("jjj"+id+"   "+this.state.account)
    /*for (var i in idprojets) {
      if(this)

    }*/
    /*var array1 = [1, 2, 3];
    console.log("éé"+this.state.favoris)
    console.log("kk"+array1)
    console.log(this.state.favoris.includes(1));
    if(array1.includes(1)){
      console.log("Deja favoris")
    }
    else{
      console.log("jjj"+id+"   "+this.state.account)
    /*  App.i3CoinInstance.ajouterFavoris(id,
        {from: this.state.account ,
         gas: 500000
       }).then(()=>{
            this.load();
       })*/
     //}
  }

validerUtilisateur=(address)=>{
this.setState({loading:true});
  App.i3CoinInstance.validerUtilisateur(address,
      {from: this.state.account,
      //value: 1000000,
      gas: 500000
     }).then(()=>{
       //  console.log("ether" +( montant * Math.pow(10, 18)));
       var  montantWei = 1 * Math.pow(10, 18);
       App.i3CoinInstance.envoyerEther(address,
           {from: this.state.account ,
            value: montantWei,
            gas: 500000
           }).then(()=>{
               this.load();
          })
      /* App.web3.eth.sendTransaction({
         from:  this.state.account,
         to: address,
         value: '100000000000000000000',
          gas: 210000
         }, function(error, hash){
           if(!error){

         }
       });
         this.load();*/
     })
}
  connexion=(account,pass)=>{
    this.setState({loading:true});
    // this.setState({account})
 for(var i=0;i<this.state.utilisateurs.length;i++){
   if(this.state.utilisateurs[i].mail === account){
     //console.log(" g  "+this.state.utilisateurs[i].address)
     this.setState({account:this.state.utilisateurs[i].address})
     localStorage.setItem('account', this.state.utilisateurs[i].address);
     localStorage.setItem('pass', pass);
     App.web3.personal.unlockAccount(this.state.utilisateurs[i].address, pass, 1500, function(err, res){

       if(err){
         this.setState({loading:false});
          window.alert(err)
       }else{
         window.location.pathname = '/accueil';

       }

     })

   }
 }
 //window.alert("err")
 /*this.setState({loading:true});
      this.setState({account})
     App.web3.personal.unlockAccount(account, pass, 1500, function(err, res){
       if(err){
          window.alert(err)
       }else{
         localStorage.setItem('account', account);
           localStorage.setItem('pass', pass);
         window.location.pathname = '/accueil';
       }

     })

*/
  }
  deconnexion=()=>{
    App.web3.personal.lockAccount(this.state.account , function(err, res){ localStorage.clear();})
    //localStorage.clear();
  }
  tipProjet=(id,montant)=>{
  this.setState({loading:true});
    App.i3CoinInstance.tipProjet(id,montant,
        {from: this.state.account ,
         //value: montant,
        gas: 500000
        }).then(()=>{
            this.load();
       })
  }
    sendEther=(adress,montant)=>{
    //  console.log("ether" +( montant * Math.pow(10, 18)));

    this.setState({loading:true});
      var  montantWei = montant * Math.pow(10, 18);
    App.i3CoinInstance.envoyerEther(adress,
        {from: this.state.account ,
         value: montantWei,
         gas: 500000
        }).then(()=>{
            this.load();
       })
  }
  updateKiosque=(id,nom,prix,description)=>{
  this.setState({loading:true});
    App.i3CoinInstance.updateKiosque(id,nom,prix,description,
        {from: this.state.account ,
        gas: 500000
        }).then(()=>{
            this.load();
       })
  }

solutionner=(id,solutionneur,note, montant)=>{
this.setState({loading:true});
  App.i3CoinInstance.solutionnerProjet(id,solutionneur,montant,
      {from: this.state.account ,
      gas: 500000
      }).then(()=>{
          this.load();
     })
}

listePage=(page_size,page_number,liste)=>{
  var deb=page_number * page_size;
  var fin=(page_number + 1) * page_size;
/*  if(fin>=liste.length){
    console.log("fin")
  }*/
  return liste.slice(deb, fin)
}

  listeProjet() {
  this.setState({ projets: []})
  this.setState({ mesprojets: []})

  App.i3CoinInstance.listeFavoris({from: this.state.account,gas: 210000}).then((idprojets) => {
    const favoris = [...this.state.favoris]
    for (var i in idprojets) {
        favoris.push(idprojets[i].toString());
    }
    this.setState({favoris: favoris})
  }).then(()=>{
    App.i3CoinInstance.projetCounter().then((projetsCount) => {
        //  this.setState({ projets: []})
          for (var i = 1; i <= projetsCount; i++) {

            App.i3CoinInstance.projets(i).then((projet) => {
              var fav=0;
              const projetsFavoris = [...this.state.projetsFavoris]
              const projets = [...this.state.projets]
              const mesprojets = [...this.state.mesprojets]
              if(projet[5].toString()==="0"){
                fav=1;
              }else if(this.state.favoris.includes(projet[0].toString())){
                  fav=1;
                  projetsFavoris.push({
                    id: projet[0],
                    createur: projet[1],
                    nom: projet[2],
                    description: projet[3],
                    price: projet[4],
                    etat: projet[5],
                    fav:fav,
                    sol: projet[6]
                  });
                  this.setState({ projetsFavoris: projetsFavoris })
              }
              projets.push({
               id: projet[0],
                createur: projet[1],
                nom: projet[2],
                description: projet[3],
                price: projet[4],
                etat: projet[5],
                fav:fav,
                sol: projet[6]
              });

              projets.sort(function (a, b) {
                  return b.id - a.id;
                });
              this.setState({projets: projets})
              var page_number=0;
              var page_size=projets.length;
              this.setState({projets_page:this.listePage(page_size,page_number,this.state.projets)})
            /*  var page_number=1;
              var page_size=5;
              var deb=page_number * page_size;
              var fin=(page_number + 1) * page_size;
              if(fin>=this.state.projets.length){
                console.log("fin")
              }
              this.setState({projets_page:this.state.projets.slice(deb, fin)})*/

              if(projet[1]===this.state.account){
                mesprojets.push({
                  id: projet[0],
                  createur: projet[1],
                  nom: projet[2],
                  description: projet[3],
                  price: projet[4],
                  etat: projet[5],
                  fav:fav,
                  sol: projet[6]
                });
                mesprojets.sort(function (a, b) {
                    return b.id - a.id;
                  });
                this.setState({ mesprojets: mesprojets })

              }

            });
          }  })
  })
  }
    listeKiosque(){
      this.setState({ kiosques: []})
      App.i3CoinInstance.kiosqueCounter().then((kiosqueCount) => {
          //  this.setState({ projets: []})
            for (var i = 1; i <= kiosqueCount; i++) {
              App.i3CoinInstance.kiosques(i).then((kiosque) => {
                const kiosques = [...this.state.kiosques]
                kiosques.push({
                  id: kiosque[0],
                  nom: kiosque[1],
                  description: kiosque[2],
                  prix: kiosque[3].toString()
                });
                this.setState({kiosques: kiosques})
              });
            }
        });
    }
    listeUtilisateur() {
    this.setState({ utilisateurs: []})
    App.web3.eth.getAccounts((err, accounts) => {
      //App.accounts=accounts;
    //  console.log("account   "+accounts[0])
      var j=-1;
      for (var i = 0; i < accounts.length; i++) {
        //App.l=(accounts[i]);
        //this.setState({account0: accounts[i] })
      //  (j=j+1).then(()=>{})
        //  App.i3CoinInstance.listeUtilisateur(accounts[i]).then((utilisateur) => {
          App.i3CoinInstance.voirUtilisateur(accounts[i]).then((utilisateur) => {
          const utilisateurs = [...this.state.utilisateurs]
          console.log(JSON.stringify(utilisateur));
          utilisateurs.push({
              id: utilisateur[3],
              mail: utilisateur[1],
              nom: utilisateur[0],
              actif:utilisateur[5],
              address:utilisateur[4]
            });
        /*  utilisateurs.push({
            id: utilisateur[0],
            mail: utilisateur[1],
            nom: utilisateur[2],
            actif:utilisateur[3],
            address:accounts[i]
          });*/
          this.setState({ utilisateurs: utilisateurs })
        })

      }
    })

      }
    listeOperation() {
      App.i3CoinInstance.LogTransfert({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).watch((error, event) => {
            const evenements = [...this.state.evenements]
          let direction="arrow_forward";
          if(event.args._envoyeur === this.state.account){

          }
        else if(event.args._receveur === this.state.account){
          direction="arrow_back";
        }
        const mestransferts = [...this.state.mestransferts]
        mestransferts.push({
        id: event.args._id,
        operateur: event.args._envoyeur,
        montant: event.args._montant,
        description: "*****",
        destinataire:  event.args._receveur,
        direction:direction

      });
      this.setState({mestransferts: mestransferts })

    })
  }
    listeOperation1() {
    this.setState({ operations: []})
    this.setState({ mestransferts: []})
    App.i3CoinInstance.operationCounter().then((operationsCount) => {
          for (var i = 1; i <= operationsCount; i++) {
            App.i3CoinInstance.operations(i).then((operation) => {
              const operations = [...this.state.operations]
              const mestransferts = [...this.state.mestransferts]
                operations.push({
                id: operation[0],
                operateur: operation[1],
                montant: operation[2],
                typeOperation: operation[3],
                description: operation[4],
                idProjet: operation[5],
                destinataire:  operation[6]
              });
              this.setState({ operations: operations })
              if(operation[3]===4 && ( operation[1]===this.state.account || operation[6]===this.state.account)){
                let direction="arrow_forward";
                if(operation[1]!==this.state.account){
                  direction="arrow_back";
                }
                mestransferts.push({
                id: operation[0],
                operateur: operation[1],
                montant: operation[2],
                //typeOperation: operation[3],
                description: operation[4],
                //idProjet: operation[5],
                destinataire:  operation[6],
                direction:direction

              });
              this.setState({mestransferts: mestransferts })
              }
            });
          }
        })
      }
    render() {

      return (
        /*<h2 pseudo={this.state.account}/>*/

      <Router basename={process.env.REACT_APP_BASENAME || ""}>

          <div >

          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                projets={this.state.projets}
                component={withTracker(props => {

                    return (


                    <route.layout
                    userDetails={this.state.userDetails}
                    deconnexion={this.deconnexion}
                    account={this.state.account}
                    account0={this.state.account0}
                    {...props}>
                    {/*<Loader
                         type="Oval"
                         color="#00BFFF"
                         height="100"
                         width="100"

                      />*/}
                    {/*<Spinner size={20} spinnerColor={"#333"} spinnerWidth={1} visible={this.state.loading} />*/}
                      <div className='sweet-loading'>
                        <BeatLoader
                          css={override}
                          sizeUnit={"px"}
                          size={10}
                          color={'#123abc'}
                          loading={this.state.loading}
                        />
                      </div>
                    <route.component

                      account={this.state.account}
                      balance={this.state.balance}
                      userDetails={this.state.userDetails}
                      updateUtilisateur={this.updateUtilisateur}
                      validerUtilisateur={this.validerUtilisateur}
                      creerProjet={this.creerProjet}
                      creerCompte={this.creerCompte}
                      ajouterFavoris={this.ajouterFavoris}
                      projets={this.state.projets_page}
                      utilisateurs={this.state.utilisateurs}
                      operations={this.state.operations}
                      mesprojets={this.state.mesprojets}
                      projetsFavoris={this.state.projetsFavoris}
                      evenements={this.state.evenements}
                      mestransferts={this.state.mestransferts}
                      validerProjet={this.validerProjet}
                      connexion={this.connexion}
                      deconnexion={this.deconnexion}
                      tipProjet={this.tipProjet}
                      transfer={this.transfer}
                      ajouterKiosque={this.ajouterKiosque}
                      updateKiosque={this.updateKiosque}
                      kiosques={this.state.kiosques}
                      achatKiosque={this.achatKiosque}
                      mesachats={this.state.mesachats}
                      mesventes={this.state.mesventes}
                      solutionner={this.solutionner}
                      listePage={this.listePage}
                      sendEther={this.sendEther}
                        {...props}
                      />

                    </route.layout>

                  );
                })}

              />
            );
          })}
          </div>
          </Router>
      )
    }
}

export default App;
