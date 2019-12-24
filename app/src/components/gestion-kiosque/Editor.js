
import React from "react";
import { Card, CardBody,CardHeader,Row, Col, Button,ButtonGroup,CardFooter,FormSelect} from "shards-react";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Modal } from 'react-bootstrap';
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends React.Component {
  image = require("../../images/avatars/m3.jpg");
  _selectId=0;
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
    this.liste_page = this.props.listePage(this.page_size,this.page_number, this.props.kiosques)
  }
  handleClose=()=> {
    this._selectId=0;
    this.setState({ show: false });
  };
  handleShow=(id,nom,description,prix)=> {
      this._selectId=id;
      this.nom=nom;
      this.description=description;
      this.prix= prix;
      this.setState({ show: true });
  };
  _updateKiosque=() => {
    console.log("iddd  "+this._selectId);
    this.props.updateKiosque(this._selectId,this.nom.value,this.prix.value,this.description.value);
  };

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
    if(fin>=this.props.kiosques.length){
       this.diseableNext=1;
    }
    if(this.page_number===0){
      this.diseablePrev=1;
    }
    this.liste_page =this.props.kiosques.slice(deb, fin)
    this.forceUpdate();

  };

  handleChange(event) {
    this.setState({value: event.target.value});
    this.page_size=  event.target.value;
    this.page_number=0;
    this._listePage(3);
  }

    render() {
      return(

        <Card small className="blog-comments">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Produits/Services</h6>
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

                {this.liste_page.map((prod, idx) => (
                  <div key={idx} className="blog-comments__item d-flex p-3">
                    {/* Avatar
                    <div className="blog-comments__avatar mr-3">
                      <img src={this.image} alt={prod.createur} />
                    </div>*/}

                    {/* Content */}
                    <div className="blog-comments__content">
                      {/* Content :: Title */}
                      <div className="blog-comments__meta text-mutes">
                        <a className="text-secondary" >
                          {/*prod.createur*/}
                        </a>{" "}

                        <a className="text-secondary" >
                          {prod.nom}
                        </a>
                        <span className="text-mutes"> - 12/25/56 </span>
                      </div>
                      <div className="blog-comments__meta text-mutes">
                        <a className="text-secondary" >
                          {/*prod.createur*/}
                        </a>{" "}

                        <a className="text-secondary" >
                          {prod.prix} {"I3C"}
                        </a>

                      </div>
                      {/* Content :: Body */}

                      <p className="m-0 my-1 mb-2 text-muted">{prod.description}</p>
                      {/* Content :: Actions */}
                      <div className="blog-comments__actions">
                        <ButtonGroup size="sm">

                          <Button  onClick={() => this.handleShow(prod.id,prod.nom,prod.description,prod.prix)}  theme="white">
                            <span className="text-light">
                              <i className="material-icons">more_vert</i>
                            </span>{" "}
                          Modifier
                          </Button>


                        </ButtonGroup>
                        <Modal show={this.state.show} onHide={this.handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Modification produit/service</Modal.Title>
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
                            <Button variant="primary" onClick={() => this._updateKiosque()}>
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

export default Editor;
