
import React from "react";
//import ReactQuill from "react-quill";
import { Card, CardBody,Form, Button,Row, Col,ButtonGroup} from "shards-react";
//http://allenfang.github.io/react-bootstrap-table/example.html#selection
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends React.Component {
  image = require("../../images/avatars/1.jpg");
  handleClose=()=> {
    this._selectId=0;
    this.setState({ show: false });
  };
  handleShow=()=> {
      this.setState({ show: true });
  };
  creerProjet=event=>{
    event.preventDefault();
    this.props.creerProjet(this.nom.value, this.description.value, this.prime.value);

  };

  selectRowProp = {
    mode: 'checkbox',
  };

  buttonFunction=(cell, row) => {
    return(<label>
              <button type="button"
                      id="validatebutton"
                      onClick={() => {this._activate(row)}}
                      className="bbtn btn-primary btn-sm">
                        Activer
              </button>
           </label>)
  };

  _activate=(row) => {
    this.props.validerProjet(row['id'],row['price']);
  };

    render() {
      return(

      <Form
        className="form"
       onSubmit={e => this.creerProjet(e)}
        >
        <Card small className="mb-3">
          <CardBody>

            <Row form>

              <Col md="6" className="form-group">
            <label htmlFor="feNom">Titre </label>
              <input
              id="feNom"
              size="lg"
              className="mb-3 form-control"
              placeholder="Titre du projet"
              required
              ref={input => this.nom = input}
               />
               </Col>
               <Col md="6" className="form-group">
             <label htmlFor="fePrice">Prime</label>
               <input
               id="fePrice"
               size="lg"
               className="mb-3 form-control"
               placeholder="Prime du projet"
               type="number"
               required
               ref={input => this.prime = input}
                />
                </Col>
             </Row>

                {/* Description */}
              <label htmlFor="feDescription">Description</label>
              <textarea
                id="feDescription"
                placeholder="Description du projet"
                rows="5"
                className="mb-1 form-control"
                ref={input => this.description = input}
              />

              {/* Default Light Table */}


          </CardBody>

        </Card>
      <Button theme="accent">Creer </Button>

<Card small className="blog-comments">
        <CardBody className="p-0">
          {this.props.projets.map((projet, idx) => (
            <div key={idx} className="blog-comments__item d-flex p-3">
              {/* Avatar */}
              <div className="blog-comments__avatar mr-3">
                <img src={this.image} alt={projet.createur} />
              </div>

              {/* Content */}
              <div className="blog-comments__content">
                {/* Content :: Title */}
                <div className="blog-comments__meta text-mutes">
                  <a className="text-secondary" >
                    {/*projet.createur*/}
                  </a>{" "}

                  <a className="text-secondary" >
                    {projet.nom}
                  </a>
                  <span className="text-mutes"> - 12/25/56</span>
                </div>

                {/* Content :: Body */}
                <p className="m-0 my-1 mb-2 text-muted">{projet.description}</p>

                {/* Content :: Actions */}

              </div>
            </div>
          ))}
        </CardBody>

      </Card>
</Form>
      )
    }
}

export default Editor;
