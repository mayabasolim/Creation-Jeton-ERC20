
import React from "react";
import { Card, CardBody,CardHeader, ListGroup,
ListGroupItem,Button} from "shards-react";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Modal } from 'react-bootstrap';
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends React.Component {
  image = require("../../images/avatars/m2.png");
  _selectId=0;

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  handleClose=()=> {
    this._selectId=0;
    this.setState({ show: false });
  };
  handleShow=(id)=> {
      this._selectId=id;
      this.setState({ show: true });
  };
  _tip=() => {
    this.props.tipProjet(this._selectId,this.montant.value);
  };

    render() {
      return(

        <Card small className="blog-comments">

        <CardHeader className="border-bottom">
          <h6 className="m-0">Mes transferts</h6>
        </CardHeader>
                <CardBody className="p-0">
              {/*  <ListGroup small flush className="list-group-small">
                    {this.props.mestransferts.map((transfert, idx) => (
                    <ListGroupItem key={idx} className="d-flex px-3">
                    <div className="blog-comments__avatar mr-3">
                      <img src={this.image} alt={transfert.operateur} />
                    </div>
                      <span className="text-semibold text-fiord-blue"><i  className="material-icons">{transfert.direction}</i> {transfert.destinataire}</span>
                      <span className="ml-auto text-right text-semibold text-reagent-gray">
                        {transfert.montant.toString()} {"I3C"}
                      </span>
                    </ListGroupItem>
                  ))}
                </ListGroup>*/}
                {this.props.mestransferts.map((transfert, idx) => (
                  <div key={idx} className="blog-comments__item d-flex p-3">
                    {/* Avatar */}
                    <div className="blog-comments__avatar mr-3">
                      <img src={this.image} alt={transfert.operateur} />
                    </div>

                    {/* Content */}
                    <div className="blog-comments__content">
                      {/* Content :: Title */}
                      <div className="blog-comments__meta text-mutes">
                        <a className="text-secondary" >
                          {/*projet.createur*/}
                        </a>{" "}

                        <a className="text-secondary" >
                        {transfert.operateur}
                        </a>
                        <span className="text-mutes"> <i  className="material-icons">{transfert.direction}</i> {transfert.destinataire} </span>
                      </div>
                      <div className="blog-comments__meta text-mutes">
                        <a className="text-secondary" >
                          {/*projet.createur*/}
                        </a>{" "}

                        <a className="text-secondary" >
                          {transfert.montant.toString()} {"I3C"}
                        </a>

                      </div>
                      {/* Content :: Body */}

                      <p className="m-0 my-1 mb-2 text-muted">{transfert.description}</p>
                      {/* Content :: Actions */}
                      <div className="blog-comments__actions">
                      {/*  <ButtonGroup size="sm">

                          <Button disabled={projet.etat!=1} onClick={() => this.handleShow(projet.id)}  theme="white">
                            <span className="text-success">
                              <i className="material-icons">check</i>
                            </span>{" "}
                            Tip
                          </Button>

                        </ButtonGroup>*/}
                        <Modal show={this.state.show} onHide={this.handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Faire un Tip</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Montant du tip
                          <input
                            id="fePrice"
                            size="lg"
                            className="mb-3 form-control"
                            placeholder="Prime du projet"
                            type="number"
                            required
                            ref={input => this.montant = input}
                             />
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                              Annuler
                            </Button>
                            <Button variant="primary" onClick={() => this._tip()}>
                              Valider
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                      </div>
                    </div>
                  ))}
                </CardBody>

          </Card>
      )
    }
}

export default Editor;
