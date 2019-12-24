import React from "react";
//import { Link} from "react-router-dom";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button
} from "shards-react";



class LoginConnexion extends React.Component {
  title= "Connexion";
  utilisateur = {
           account: ' ',
           pass: ' '
  };

  //nom=this.props.userDetails[0];
//  mail=this.props.userDetails[1];
compte='';
pass='';

  connexion=event=>{
    //  event.preventDefault();
      this.props.connexion(this.compte.value, this.pass.value);


  };

    render() {

      return(
        <Card small className="mb-4 pt-3">
          <CardHeader className="border-bottom text-center">
            <div className="mb-3 mx-auto">
                <h6 className="m-0">{this.title}</h6>
            </div>

          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <form
                  className="form"
                  onSubmit={e => this.connexion(e)}

                  >
                    <Row form>
                      {/* First Name */}
                      <Col md="12" className="form-group">
                        <label htmlFor="feFirstName1">Compte</label>
                        <input
                          id="feFirstName1"
                          placeholder="Compte"
                          required

                        ref={input => this.compte = input}
                          className='form-control'
                        />
                      </Col>


                    </Row>
                    <Row form>
                    <Col md="12" className="form-group">
                      <label htmlFor="feLastName2">Mot de passe</label>
                      <input
                      className='form-control'
                      type="password"
                        id="feLastName2"
                        placeholder="Mot de passe"
                        ref={input => this.pass = input}
                        required
                      />
                    </Col>
                      </Row>
                      <Row form>
                      Pas de compte? <a  href="newAccount"> Creer un compte !</a>
                      </Row>
                    {/*<Button tag={Link} to={"blog-overview"}  onClick={() => this.connexion()} theme="accent">Connexion</Button>*/}
                    <Button  theme="accent">Connexion</Button>
                  </form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      );
    }

};


export default LoginConnexion;
