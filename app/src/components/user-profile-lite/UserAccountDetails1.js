import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import I3Coin from '../../contracts/I3Coin.json';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";

export default class UserAccountDetails extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        account: '0x0',
        utilisateurs: [],
        title: "Account Details",
        utilisateur:{nom:"",mail:""},
        }



      if (typeof this.web3 != 'undefined') {
        this.web3Provider = this.web3.currentProvider
      } else {
        this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
      }

      this.web3 = new Web3(this.web3Provider)
      //this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
      this.i3Coin = TruffleContract(I3Coin)
      this.i3Coin.setProvider(this.web3Provider)

    }
    componentDidMount() {

    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({account })
      this.i3Coin.deployed().then((i3CoinInstance) => {
        this.i3CoinInstance = i3CoinInstance
        console.log("compte1"+this.web3.eth.accounts[1]);
        console.log("compte0"+this.state.account);
        this.i3CoinInstance.ajouterUtilisateur("nath@i.c","peniel",this.web3.eth.accounts[0],
        {from:this.web3.eth.accounts[1],gas: 500000});

      })

    })
  }


  ajouterUtilisateur() {
    console.log("YES "+this.state.utilisateur.nom);
    console.log("YES "+this.state.account);
    this.i3CoinInstance.ajouterUtilisateur(this.state.utilisateur.mail,
      this.state.utilisateur.nom,this.state.account)
  }
handleChange(utilisateur, e){
       let utilisateurs = this.state.utilisateur;
       utilisateurs[utilisateur] = e.target.value;
       this.setState({utilisateur:utilisateurs});
   }
  /*  ajouterUtilisateur(u) {
      console.log("YES "+u);
      this.i3Coin.deployed().then(function(instance) {
        return instance.ajouterUtilisateur(u.mail,u.nom, {
          from: this.state.account,
          gas: 500000
        });
      })
    }*/

    render(){
      return (
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">{this.state.title}</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                <Form onSubmit={(event) => {
                    event.preventDefault()
                    this.ajouterUtilisateur()
                    }}>
                    <Row form>
                      {/* First Name */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feFirstName">First Name</label>
                        <FormInput
                          id="feFirstName"
                          placeholder="First Name"
                          //value="Sierra"
                          value={this.state.utilisateur["nom"]}
                        //  onChange={() => {}}
                          required
                          onChange={this.handleChange.bind(this, "nom")}
                          //className='form-control'
                        />
                      </Col>
                      {/* Last Name */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feLastName">Last Name</label>
                        <FormInput
                          id="feLastName"
                          placeholder="Last Name"
                          value={this.state.utilisateur["prenom"]}
                          onChange={this.handleChange.bind(this, "prenom")}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      {/* Email */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feEmail">Email</label>
                        <FormInput
                          type="email"
                          id="feEmail"
                          placeholder="Email Address"
                          value={this.state.utilisateur["mail"]}
                          onChange={this.handleChange.bind(this, "mail")}
                          autoComplete="email"
                          required
                        />
                      </Col>
                      {/* Password */}
                      <Col md="6" className="form-group">
                        <label htmlFor="fePassword">Password</label>
                        <FormInput
                          type="password"
                          id="fePassword"
                          placeholder="Password"
                          value={this.state.utilisateur["password"]}
                          onChange={() => {}}
                          autoComplete="current-password"
                          onChange={this.handleChange.bind(this, "password")}
                        />
                      </Col>
                    </Row>
                    <FormGroup>
                      <label htmlFor="feAddress">Address</label>
                      <FormInput
                        id="feAddress"
                        placeholder="Address"
                        value={this.state.utilisateur["address"]}
                        onChange={() => {}}
                        onChange={this.handleChange.bind(this, "address")}
                      />
                    </FormGroup>
                    <Row form>
                      {/* City */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feCity">Ville</label>
                        <FormInput
                          id="feCity"
                          placeholder="City"
                          value={this.state.utilisateur.ville}
                          onChange={() => {}}
                        />
                      </Col>
                      {/* State */}
                    {/*  <Col md="4" className="form-group">
                        <label htmlFor="feInputState">State</label>
                        <FormSelect id="feInputState">
                          <option>Choose...</option>
                          <option>...</option>
                        </FormSelect>
                      </Col>*/}
                      {/* Zip Code */}
                    {/*  <Col md="2" className="form-group">
                        <label htmlFor="feZipCode">Zip</label>
                        <FormInput
                          id="feZipCode"
                          placeholder="Zip"
                          onChange={() => {}}
                        />
                      </Col>*/}
                    </Row>
                    <Row form>
                      {/* Description */}
                      <Col md="12" className="form-group">
                        <label htmlFor="feDescription">Description</label>
                        <FormTextarea id="feDescription" rows="5" />
                      </Col>
                    </Row>
                    <Button type='submit' theme="accent">Update Account</Button>
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      );
    }
}
