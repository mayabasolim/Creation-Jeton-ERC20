
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
                <ListGroup small flush className="list-group-small">
                      {this.props.mestransferts.map((evenement, idx) => (
                      <ListGroupItem key={idx} className="d-flex px-3">

                        <span className="text-semibold text-fiord-blue">{evenement.destinataire}</span>
                        <span className="ml-auto text-right text-semibold text-reagent-gray">
                        {evenement.montant}
                        </span>
                      </ListGroupItem>
                    ))}
                  </ListGroup>

                </CardBody>

          </Card>
      )
    }
}

export default Editor;
