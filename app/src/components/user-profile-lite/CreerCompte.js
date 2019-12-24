import React from "react";
//import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormTextarea,
  Button
} from "shards-react";

class CreerCompte extends React.Component {
  title= "Creer un compte";

  nom="";
  mail="";
  pass="";

  creerCompte=event=>{
      event.preventDefault();
      this.props.creerCompte(this.nom.value, this.mail.value , this.pass.value);
  };

  render() {
    return(
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{this.title}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <form
                className="form"
                onSubmit={e => this.creerCompte(e)}
                >
                  <Row form>
                    {/* First Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feFirstName">Nom</label>
                      <input
                        id="feFirstName"
                        placeholder="Nom"
                        required

                      ref={input => this.nom = input}
                        className='form-control'
                      />
                    </Col>
                    {/* Last Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="feLastName">Mail</label>
                      <input
                      className='form-control'
                        id="feLastName"
                        placeholder="Mail"
                        ref={input => this.mail = input}
                        required
                      />
                    </Col>
                  </Row>
                  <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="passtName">Mot de passe</label>
                    <input
                    className='form-control'
                      type="password"
                      id="passName"
                      placeholder="Mot de passe"
                      ref={input => this.pass = input}
                      required
                    />
                  </Col>
                  <Col md="6" className="form-group">
                      <input type="file" className="custom-file-input" id="customFile2" />
                      <label className="custom-file-label" htmlFor="customFile2">
                        Choisir image...
                      </label>
                    </Col>
                    </Row>
                  <Row form>
                    {/* Description */}
                    <Col md="12" className="form-group">
                      <label htmlFor="feDescription">Description</label>
                      <FormTextarea id="feDescription" rows="5" />
                    </Col>
                  </Row>
                  Vouas avez déja  un compte? <a  href="login"> Se connecter !</a>
                  <Button theme="accent">Valider</Button>
                </form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}
export default CreerCompte;
