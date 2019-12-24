
import React from "react";
import { Modal } from 'react-bootstrap';
import { Card,CardHeader, Fade,CardBody, CardFooter, Row, Col,Button,ButtonGroup,FormSelect,Badge,ListGroup,ListGroupItem} from "shards-react";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class EditorFav extends React.Component {
  projets_page=[];
  page_size=5;
  page_number=0;
  diseableNext=0;
  diseablePrev=1;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      next:0


    };
    this.state = {value: this.page_size};
    this.handleChange = this.handleChange.bind(this);
    this.projets_page = this.props.listePage(this.page_size,this.page_number, this.props.projetsFavoris)
    //this.projet_page=this._listePage(3);

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
    this.projets_page =this.props.projetsFavoris.slice(deb, fin)
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
          {/*this.projets_page.map((projet, idx) => (
            <div key={idx} className="blog-comments__item d-flex p-3">

              <div className="blog-comments__content">
                <Fade in={(projet.etat==0)?true:false}>
                  <Badge theme="info">En cours de validation</Badge>
                </Fade>
                <Fade in={(projet.etat==1)?true:false}>
                  <Badge theme="success">Validé</Badge>
                </Fade>
                <div className="blog-comments__meta text-mutes">
                  <a className="text-secondary" >
                    </a>{" "}

                  <a className="text-secondary" >
                    {projet.nom}
                  </a>
                  <span className="text-mutes"></span>
                </div>
                <div className="blog-comments__meta text-mutes">
                  <a className="text-secondary" >
                  </a>{" "}

                  <a className="text-secondary" >
                    {projet.price.toString()} {"I3C"}
                  </a>

                </div>
                <p className="m-0 my-1 mb-2 text-muted">{projet.description}</p>

                <div className="blog-comments__actions">
                  <ButtonGroup size="sm">
                  <Fade in={(this.props.userDetails[2].toString()!="1")?false:true}>
                  <Button  disabled={this.props.userDetails[2].toString()!="1" || projet.etat==1} onClick={() => this._validate(projet.id,projet.price)}  theme="white">
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
          ))*/ }
          <ListGroup small flush className="list-group-small">
                {this.projets_page.map((projet, idx) => (
                <ListGroupItem key={idx} className="d-flex px-3">

                  <span className="text-semibold text-fiord-blue">


                    <Badge theme={projet.etat==1?"success":"info"}>{projet.etat==1?"Validé":"EN cours de validation"}</Badge>

                  <div className="blog-comments__meta text-mutes">
                    <a className="text-secondary" >
                      {/*projet.createur*/}
                    </a>{" "}

                    <a className="text-secondary" >
                      {projet.nom}
                    </a>
                    <span className="text-mutes"> </span>
                  </div>
                  <div className="blog-comments__meta text-mutes">
                    <a className="text-secondary" >
                      {/*projet.createur*/}
                    </a>{" "}

                    <a className="text-secondary " >
                      {projet.description}
                    </a>

                  </div>
                  <div className="blog-comments__actions">
                    <ButtonGroup size="sm">

                  {/*    <Button disabled={projet.fav==1} onClick={() => this._ajouterFavoris(projet.id)}  theme="white">
                        <span className="text-success">
                          <i className="material-icons">check</i>
                        </span>{" "}
                        Favoris
                      </Button>*/}

                      {/*<Button disabled={projet.etat!=1} onClick={() => this.handleShow(projet.id)}  theme="white">
                        <span className="text-success">
                          <i className="material-icons">check</i>
                        </span>{" "}
                        Tip
                      </Button>*/}
                    {  /*<Button theme="white">
                        <span className="text-danger">
                          <i className="material-icons">clear</i>
                        </span>{" "}
                        Reject
                      </Button>**/}
                      <Button disabled={projet.etat!=1} onClick={() => this.handleShow(projet.id)}  theme="white">
                        <span className="text-success">
                          <i className="material-icons">check</i>
                        </span>{" "}
                        Tip
                      </Button>
                      <Fade in={(this.props.userDetails[2].toString()!="1")?false:true}>
                      <Button  disabled={this.props.userDetails[2].toString()!="1" || projet.etat==1} onClick={() => this._validate(projet.id,projet.price)}  theme="white">
                      <span className="text-success">
                        <i className="material-icons">check</i>
                      </span>{" "}
                      Valider
                    </Button>
                    </Fade>
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

                  </span>
                  <span className="ml-auto text-right text-semibold text-reagent-gray">
                    {projet.price.toString()} {"I3C"} - {projet.sol.toString()} {"I3C (solutionné)"}
                  </span>

                </ListGroupItem>
              ))}
            </ListGroup>
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
