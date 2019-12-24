
import React from "react";
//import ReactQuill from "react-quill";
import { Button,Row, Col} from "shards-react";
//http://allenfang.github.io/react-bootstrap-table/example.html#selection
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import { Modal } from 'react-bootstrap';
class Add extends React.Component {
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
  handleShow=()=> {
      this.setState({ show: true });
  };
  ajouterKiosque=()=>{
    //event.preventDefault();
    this.props.ajouterKiosque(this.nom.value, this.description.value, this.prix.value);

  };


    render() {
      return(
        <Row>
          <Col>
            <Button theme="primary" onClick={() => this.handleShow()} className="mb-2 mr-1">
              Nouveau produit/service
            </Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Ajouter un produit/service</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Row form>

                <Col md="6" className="form-group">
              <label htmlFor="feNom">Nom </label>
                <input
                id="feNom"
                size="lg"
                className="mb-3 form-control"
                placeholder="Nom"
                required
                ref={input => this.nom = input}
                 />
                 </Col>
                 <Col md="6" className="form-group">
               <label htmlFor="fePrice">Prix</label>
                 <input
                 id="fePrice"
                 size="lg"
                 className="mb-3 form-control"
                 placeholder="Prix"
                 type="number"
                 required
                 ref={input => this.prix = input}
                  />
                  </Col>
               </Row>

                  {/* Description */}
                <label htmlFor="feDescription">Description</label>
                <textarea
                  id="feDescription"
                  placeholder="Description"
                  rows="5"
                  className="mb-1 form-control"
                  ref={input => this.description = input}
                />

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Annuler
                </Button>
                <Button variant="primary" onClick={() => this.ajouterKiosque()}>
                  Valider
                </Button>
              </Modal.Footer>
            </Modal>

          </Col>

      </Row>
      )
    }
}

export default Add;
