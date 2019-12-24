
import React from "react";
import { Modal } from 'react-bootstrap';
import { Card,CardHeader, CardBody, Button,ButtonGroup,Col,CardFooter,Row} from "shards-react";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends React.Component {
  liste_page=[];
  page_size=4;
  page_number=0;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  this.liste_page = this.props.listePage(this.page_size,this.page_number, this.props.projets)

  }
  _selectId=0;
  image = require("../../images/avatars/m1.png");
  handleClose=()=> {
    this._selectId=0;
    this.setState({ show: false });
  };
  handleShow=(id)=> {
      this._selectId=id;
      this.setState({ show: true });
  };
  creerProjet=event=>{
    event.preventDefault();
    this.props.creerProjet(this.nom.value, this.description.value, this.prime.value);

  };

  selectRowProp = {
    mode: 'checkbox',
  };

  _validate=(id,price) => {
    this.props.validerProjet(id,price);
  };
  _validate=(id,price) => {
    this.props.validerProjet(id,price);
  };
  _ajouterFavoris=(id)=>{
    this.props.ajouterFavoris(id);
  }
  _tip=() => {
    console.log("iddd  "+this._selectId);
    this.props.tipProjet(this._selectId,this.montant.value);
      };
    render() {
      return(
      <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0"><a  href="validate-post"> Les propositions de projets</a></h6>
      </CardHeader>
        <CardBody className="p-0">
          {this.liste_page.map((projet, idx) => (
            <div key={idx} className="blog-comments__item d-flex p-3">
            

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
                  <span className="text-mutes"></span>
                </div>
                <div className="blog-comments__meta text-mutes">
                  <a className="text-secondary" >
                    {/*projet.createur*/}
                  </a>{" "}

                  <a className="text-secondary" >
                    {projet.price.toString()} {"I3C"}
                  </a>

                </div>


                {/* Content :: Body

                <p className="m-0 my-1 mb-2 text-muted">{projet.description}</p>*/}


              </div>
            </div>
          ))}
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col className="text-center view-report">
              <a href="validate-post">Liste complète &rarr;</a>
            </Col>
          </Row>
        </CardFooter>

      </Card>

      )
    }
}

export default Editor;
