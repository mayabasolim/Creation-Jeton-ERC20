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

class UserAccountDetails extends React.Component {
  title= "Modifier le compte";
  utilisateur = {
           nom: ' ',
           email: ' '
  };

  nom=this.props.userDetails[0];
  mail=this.props.userDetails[1];

  updateAccount=event=>{
      event.preventDefault();
      this.props.updateUtilisateur(this.nom.value, this.mail.value);
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
                onSubmit={e => this.updateAccount(e)}
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
                  <Button theme="accent">Modifier</Button>
                </form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}
export default UserAccountDetails;
