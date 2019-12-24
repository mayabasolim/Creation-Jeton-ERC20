
import React from "react";
import { Card, CardBody,CardHeader, Row,Col,Button,ButtonGroup,CardFooter,FormSelect,Badge,Fade,ListGroupItem,ListGroup} from "shards-react";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Modal } from 'react-bootstrap';
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends React.Component {
  image = require("../../images/avatars/m1.png");
  _selectId=0;
  liste_page=[];
  page_size=5;
  page_number=0;
  diseableNext=0;
  diseablePrev=1;
  constructor(props) {
    super(props);
    this.state = {
      show1: false,
      show: false,
      value: this.page_size
    };
    this.handleChange = this.handleChange.bind(this);
    this.liste_page = this.props.listePage(this.page_size,this.page_number, this.props.mesprojets)
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
    if(fin>=this.props.mesprojets.length){
       this.diseableNext=1;
    }
    if(this.page_number===0){
      this.diseablePrev=1;
    }
    this.liste_page =this.props.mesprojets.slice(deb, fin)
    this.forceUpdate();

  };

  handleChange(event) {
    this.setState({value: event.target.value});
    this.page_size=  event.target.value;
    this.page_number=0;
    this._listePage(3);
  }
  handleClose1=()=> {
    this._selectId=0;
    this.setState({ show1: false });
  };
  handleShow1=(id)=> {
      this._selectId=id;
      this.setState({ show1: true });
  };
  _tip=() => {
    this.props.tipProjet(this._selectId,this.montant.value);
  };

  handleClose=()=> {
    this._selectId=0;
    this.setState({ show: false });
  };
  handleShow=(id)=> {
    this._selectId=id;
    this.setState({ show: true });
  };
  _solutionner=()=>{
    this.props.solutionner(this._selectId,this.adresse_des.value, this.motif.value, this.montant.value);

  };

    render() {
      return(

        <Card small className="blog-comments">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Mes propositions de projets</h6>
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

              {/*/this.liste_page.map((projet, idx) => (
                  <div key={idx} className="blog-comments__item d-flex p-3" >

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
                        <span className="text-mutes"> </span>
                      </div>
                      <div className="blog-comments__meta text-mutes">
                        <a className="text-secondary" >
                        </a>{" "}

                        <a className="text-secondary " >
                          {projet.price.toString()} {"I3C"} - {projet.sol.toString()} {"I3C (solutionné)"}
                        </a>

                      </div>

                      <p className="m-0 my-1 mb-2 text-muted">{projet.description}</p>
                      <div className="blog-comments__actions">
                        <ButtonGroup size="sm">

                          <Button disabled={projet.etat!=1} onClick={() => this.handleShow1(projet.id)}  theme="white">
                            <span className="text-success">
                              <i className="material-icons">check</i>
                            </span>{" "}
                            Tip
                          </Button>
                          <Button disabled={projet.etat!=1} onClick={() => this.handleShow(projet.id)}  theme="white">
                            <span className="text-success">
                              <i className="material-icons">check</i>
                            </span>{" "}
                            Solutionner
                          </Button>

                        </ButtonGroup>
                        <Modal show={this.state.show1} onHide={this.handleClose1}>
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
                            <Button variant="secondary" onClick={this.handleClose1}>
                              Annuler
                            </Button>
                            <Button variant="primary" onClick={() => this._tip()}>
                              Valider
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Affectuer un transfert</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <Row form>

                            <Col md="6" className="form-group">
                          <label htmlFor="feNom">Adresse du solutionneur</label>
                            <input
                            id="feNom"
                            size="lg"
                            className="mb-3 form-control"
                            placeholder="Adresse solutionneur"
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

                              <label htmlFor="feDescription">Note</label>
                            <textarea
                              id="feDescription"
                              placeholder="Note"
                              rows="5"
                              className="mb-1 form-control"
                              ref={input => this.motif = input}
                            />

                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                              Annuler
                            </Button>
                            <Button variant="primary" onClick={() => this._solutionner()}>
                              Valider
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                      </div>
                    </div>
                  )) */}

                  <ListGroup small flush className="list-group-small">
                        {this.liste_page.map((projet, idx) => (
                        <ListGroupItem key={idx} className="d-flex px-3">
                        {/*  <Fade in={(projet.etat==0)?true:false}>
                          <Badge theme="info">En cours de validation</Badge>
                        </Fade>
                        <Fade in={(projet.etat==1)?true:false}>
                          <Badge theme="success">Validé</Badge>
                        </Fade> */}
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

                              <Button disabled={projet.etat!=1} onClick={() => this.handleShow1(projet.id)}  theme="white">
                                <span className="text-success">
                                  <i className="material-icons">check</i>
                                </span>{" "}
                                Tip
                              </Button>
                              <Button disabled={projet.etat!=1} onClick={() => this.handleShow(projet.id)}  theme="white">
                                <span className="text-success">
                                  <i className="material-icons">check</i>
                                </span>{" "}
                                Solutionner
                              </Button>

                            </ButtonGroup>
                            <Modal show={this.state.show1} onHide={this.handleClose1}>
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
                                <Button variant="secondary" onClick={this.handleClose1}>
                                  Annuler
                                </Button>
                                <Button variant="primary" onClick={() => this._tip()}>
                                  Valider
                                </Button>
                              </Modal.Footer>
                            </Modal>
                            <Modal show={this.state.show} onHide={this.handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Solutionner projet</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                              <Row form>

                                <Col md="6" className="form-group">
                              <label htmlFor="feNom">Adresse du solutionneur</label>
                                <input
                                id="feNom"
                                size="lg"
                                className="mb-3 form-control"
                                placeholder="Adresse solutionneur"
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
                                <label htmlFor="feDescription">Note</label>
                                <textarea
                                  id="feDescription"
                                  placeholder="Note"
                                  rows="5"
                                  className="mb-1 form-control"
                                  ref={input => this.motif = input}
                                />

                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                  Annuler
                                </Button>
                                <Button variant="primary" onClick={() => this._solutionner()}>
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

export default Editor;
