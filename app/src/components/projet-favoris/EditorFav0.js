
import React from "react";
import { Modal } from 'react-bootstrap';
import { Card,CardHeader, CardBody, Button,ButtonGroup,CardFooter,FormSelect,Row,Col,Fade} from "shards-react";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class EditorFav extends React.Component {
  liste_page=[];
  page_size=5;
  page_number=0;
  diseableNext=0;
  diseablePrev=1;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: this.page_size
    };

    this.handleChange = this.handleChange.bind(this);
    this.liste_page = this.props.listePage(this.page_size,this.page_number, this.props.projetsFavoris)
  }
  _listePage=(i)=>{
    this.diseablePrev=0
    this.diseableNext=0;
    if(i===0){
      this.page_number--;
    }else if(i===1){
      this.page_number++;
    }
    var deb=this.page_number * this.page_size;
    var fin=(this.page_number + 1) * this.page_size;
    if(fin>=this.props.projetsFavoris.length){
       this.diseableNext=1;
    }
    if(this.page_number===0){
      this.diseablePrev=1;
    }
    this.liste_page =this.props.projetsFavoris.slice(deb, fin)
    this.forceUpdate();

  };

  handleChange(event) {
    this.setState({value: event.target.value});
    this.page_size=  event.target.value;
    this.page_number=0;
    this._listePage(3);
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
        <h6 className="m-0"> <a  href="projet-favoris"> Projets favoris</a></h6>
        <FormSelect
        size="sm"
        value={this.state.value}
         onChange={this.handleChange}
        style={{ maxWidth: "60px" }}
        >
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={5}>5</option>
  </FormSelect>
      </CardHeader>
        <CardBody className="p-0">
          {this.liste_page.map((projet, idx) => (
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
                  <span className="text-mutes"> - 12/25/56 </span>
                </div>
                <div className="blog-comments__meta text-mutes">
                  <a className="text-secondary" >
                    {/*projet.createur*/}
                  </a>{" "}

                  <a className="text-secondary" >
                    {projet.price.toString()} {"I3C"}
                  </a>

                </div>


                {/* Content :: Body */}

                <p className="m-0 my-1 mb-2 text-muted">{projet.description}</p>

                {/* Content :: Actions */}
                <div className="blog-comments__actions">
                  <ButtonGroup size="sm">
                  <Fade in={(this.props.userDetails[2].toString()!="1")?false:true}>
                    <Button disabled={projet.etat==1} onClick={() => this._validate(projet.id,projet.price)}  theme="white">
                      <span className="text-success">
                        <i className="material-icons">check</i>
                      </span>{" "}
                      Valider
                    </Button>
                    </Fade>
                    <Button disabled={projet.fav==1} onClick={() => this._ajouterFavoris(projet.id)}  theme="white">
                      <span className="text-success">
                        <i className="material-icons">check</i>
                      </span>{" "}
                      Favoris
                    </Button>

                    {/*<Button disabled={projet.etat!=1} onClick={() => this.handleShow(projet.id)}  theme="white">
                      <span className="text-success">
                        <i className="material-icons">check</i>
                      </span>{" "}
                      Tip
                    </Button>*/}

                    <Button disabled={projet.etat!=1} onClick={() => this.handleShow(projet.id)}  theme="white">
                      <span className="text-success">
                        <i className="material-icons">check</i>
                      </span>{" "}
                      Tip
                    </Button>

                  </ButtonGroup>
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
        <CardFooter className="border-top">
          <Row>
            <Col className="text-center view-report">
            <Button disabled={this.diseablePrev===1} theme="white" onClick={() => this._listePage(0)} type="submit">
              Prev
            </Button>
              <Button disabled={this.diseableNext===1} theme="white" onClick={() => this._listePage(1)} type="submit">
                Next
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>

      )
    }
}

export default EditorFav;
