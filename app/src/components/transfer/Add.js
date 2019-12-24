
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
  transfer=()=>{
    //event.preventDefault();
    this.props.transfer(this.adresse_des.value, this.motif.value, this.montant.value);

  };


    render() {
      return(
        <Row>
          <Col>
            <Button theme="primary" onClick={() => this.handleShow()} className="mb-2 mr-1">
              Nouveau transfert
            </Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Affectuer un transfert</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Row form>

                <Col md="6" className="form-group">
              <label htmlFor="feNom">Adresse du destinataire</label>
                <input
                id="feNom"
                size="lg"
                className="mb-3 form-control"
                placeholder="Adresse destinataire"
                required
                ref={input => this.adresse_des = input}
                 />
                 </Col>
                 <Col md="6" className="form-group">
               <label htmlFor="fePrice">Montant</label>
                 <input
                 id="fePrice"
                 size="lg"
                 className="mb-3 form-control"
                 placeholder="Montant"
                 type="number"
                 required
                 ref={input => this.montant = input}
                  />
                  </Col>
               </Row>

                  {/* Description */}
                <label htmlFor="feDescription">Motif</label>
                <textarea
                  id="feDescription"
                  placeholder="Motif du transfert"
                  rows="5"
                  className="mb-1 form-control"
                  ref={input => this.motif = input}
                />

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Annuler
                </Button>
                <Button variant="primary" onClick={() => this.transfer()}>
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
