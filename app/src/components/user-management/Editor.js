
import React from "react";
import { Modal } from 'react-bootstrap';
import { Card,CardHeader, Fade,CardBody, CardFooter, Row, Col,Button,ButtonGroup,FormSelect,Badge} from "shards-react";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends React.Component {
  listes_page=[];
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
    this.listes_page = this.props.listePage(this.page_size,this.page_number, this.props.utilisateurs)
    //this.projet_page=this._listePage(3);

  }

  _listePage=(i)=>{
    console.log("hhh0h")
    this.diseablePrev=0
    this.diseableNext=0;
    if(i===0){
      this.page_number--;
    }else if(i===1){
      this.page_number++;
    }
    var deb=this.page_number * this.page_size;
    var fin=(this.page_number + 1) * this.page_size;
    if(fin>=this.props.utilisateurs.length){
       this.diseableNext=1;
    }
    if(this.page_number===0){
      this.diseablePrev=1;
    }
    console.log("hhh"+deb+ " fin  "+fin)
    this.listes_page =this.props.utilisateurs.slice(deb, fin)
    console.log("hhh1H " +JSON.stringify(this.listes_page))
    this.forceUpdate();

  };

  handleChange(event) {
    this.setState({value: event.target.value});
    this.page_size=  event.target.value;
    this.page_number=0;
    this._listePage(3);
  }


  _selectId=0;
  image = require("../../images/avatars/1.jpg");
  handleClose=()=> {
    this._selectId=0;
    this.setState({ show: false });
  };
  handleShow=(id)=> {
      this._selectId=id;
      this.setState({ show: true });
  };


  selectRowProp = {
    mode: 'checkbox',
  };


    _validate=(address) => {
      this.props.validerUtilisateur(address);
    };

  _sendEther=() => {
    console.log("iddd  "+this._selectId);
      this.props.sendEther(this._selectId,this.montant.value);
      };
    render() {
      return(
      <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Liste des utilisateurs</h6>
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
        {this.props.utilisateurs.map((user, idx) => (
          <div key={idx} className="blog-comments__item d-flex p-3">
            {/* Avatar */}

            <div className="blog-comments__avatar mr-3">
              <img src={this.image} alt={user.nom} />
            </div>

            {/* Content */}
            <div className="blog-comments__content">
              {/* Content :: Title */}
              <Fade in={user.actif==0}>
                <Badge theme="info">non actif</Badge>
              </Fade>

              <Fade in={user.actif==1}>
                <Badge theme="success">actif</Badge>
              </Fade>
              <div className="blog-comments__meta text-mutes">
                <a className="text-secondary" >
                  {user.nom}
                </a>{" "}

                <span className="text-mutes"> </span>
              </div>
              <div className="blog-comments__meta text-mutes">
                <a className="text-secondary" >
                  {/*projet.createur*/}
                </a>{" "}

                <a className="text-secondary" >
                  {user.mail}
                </a>

              </div>


              {/* Content :: Body */}

              <p className="m-0 my-1 mb-2 text-muted">{user.address}</p>

              {/* Content :: Actions */}
              <div className="blog-comments__actions">
                <ButtonGroup size="sm">
                  <Button disabled={user.actif==1} onClick={() => this._validate(user.address)}  theme="white">
                    <span className="text-success">
                      <i className="material-icons">check</i>
                    </span>{" "}
                    Valider
                  </Button>

                  <Button  onClick={() => this.handleShow(user.address)}  theme="white">
                    <span className="text-success">
                      <i className="material-icons">check</i>
                    </span>{" "}
                  Send Ether
                  </Button>

                </ButtonGroup>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Transfer d'ether</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Montant (ETH)
                  <input
                    id="fePrice"
                    size="lg"
                    className="mb-3 form-control"
                    placeholder="Montant en Ether"
                    type="number"
                    required
                    ref={input => this.montant = input}
                     />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Annuler
                    </Button>
                    <Button variant="primary" onClick={() => this._sendEther()}>
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
