
import React from "react";
import { Card, CardBody,CardHeader,Row, Col, Button,ButtonGroup} from "shards-react";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Modal } from 'react-bootstrap';
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends React.Component {
  image = require("../../images/avatars/m3.jpg");
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
  _achatKiosque=() => {
    this.props.achatKiosque(this._selectId);
  };

    render() {
      return(

        <Card small className="blog-comments">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Mes achats</h6>
        </CardHeader>

                <CardBody className="p-0">

                {this.props.mesachats.map((prod, idx) => (
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

                      </div>
                    </div>
                  ))}
                </CardBody>

          </Card>
      )
    }
}

export default Editor;
