import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import I3Coin from '../../contracts/I3Coin.json';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";

export default class UserDetails extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        account: '0x0',
        balance:'',
        utilisateurs: [],
        userDetails: {
        /*  name: "Sierra Brooks",
          avatar: require("./../../images/avatars/0.jpg"),
          jobTitle: "Project Manager",
          performanceReportTitle: "Workload",
          performanceReportValue: 74,
          metaTitle: "Description",
          metaValue:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"*/
        }
      }

      if (typeof web3 != 'undefined') {
        this.web3Provider = web3.currentProvider
      } else {
        this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
      //  this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
      }

      this.web3 = new Web3(this.web3Provider)

      this.i3Coin = TruffleContract(I3Coin)
      this.i3Coin.setProvider(this.web3Provider)

    }
    componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({account })
      this.i3Coin.deployed().then((i3CoinInstance) => {
        this.i3CoinInstance = i3CoinInstance
          this.i3CoinInstance.balanceOf(this.state.account).then((balance) => {
              balance=balance.toString()
              this.setState({balance})
            //  console.log("balance : "+balance.toString());
          });

          //this.displayAccountInfo();
          this.profilInfo()
      })
    })
  }


  displayAccountInfo() {
      this.i3CoinInstance.getNumberOfUsers().then((utilisateursCount) => {
        for (var i = 1; i <= utilisateursCount; i++) {
          this.i3CoinInstance.utilisateurs(i).then((utilisateur) => {
            const utilisateurs = [...this.state.utilisateurs]
            utilisateurs.push({
              id: utilisateur[0],
              mail: utilisateur[1],
              nom: utilisateur[2]
            });
            this.setState({ utilisateurs: utilisateurs })
          });
        }
      })
    }

    profilInfo() {

      console.log("hh  "+this.state.account)
      this.i3CoinInstance.voirUtilisateur(this.state.account).then((utilisateur) => {
        //utilisateur="nathalie";
        this.setState({userDetails:{
          name: utilisateur,
          avatar: require("./../../images/avatars/0.jpg"),
          jobTitle: "Project Manager",
          performanceReportTitle: "Workload",
          performanceReportValue: 74,
          metaTitle: "Description",
          metaValue:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
        }})
      })
      // this.i3CoinInstance.voirUtilisateur(this.state.account).then((utilisateur) => {

         //});
      /*  this.i3CoinInstance.voirUtilisateur(this.state.account).then((user) => {
          this.setState({userDetails:{
            name:user[2],
            //name: "Sierra Brooks",
            avatar: require("./../../images/avatars/0.jpg"),
            jobTitle: "Project Manager",
            performanceReportTitle: "Workload",
            performanceReportValue: 74,
            metaTitle: "Description",
            metaValue:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
          }})
        });*/
      }

    render(){
      return (
        <Card small className="mb-4 pt-3">
          <CardHeader className="border-bottom text-center">
            <div className="mb-3 mx-auto">
              <img
                className="rounded-circle"
                src={this.state.userDetails.avatar}
                alt={this.state.userDetails.name}
                width="110"
              />
            </div>
            <h4 className="mb-0">{this.state.userDetails.name}</h4>
            <span className="text-muted d-block mb-2">{this.state.userDetails.jobTitle}</span>
            <span className="text-muted d-block mb-2">{this.state.account}</span>
              <span className="text-muted d-block mb-2">{this.state.balance} I3C</span>
            <Button pill outline size="sm" className="mb-2">
              <i className="material-icons mr-1">person_add</i> Follow
            </Button>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="px-4">
              <div className="progress-wrapper">
                <strong className="text-muted d-block mb-2">
                  {this.state.userDetails.performanceReportTitle}
                </strong>
                <Progress
                  className="progress-sm"
                  value={this.state.userDetails.performanceReportValue}
                >
                  <span className="progress-value">
                    {this.state.userDetails.performanceReportValue}%
                  </span>
                </Progress>
              </div>
            </ListGroupItem>
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                {this.state.userDetails.metaTitle}
              </strong>
              <span>{this.state.userDetails.metaValue}</span>
            </ListGroupItem>
          </ListGroup>
        </Card>
      );
    }
}
