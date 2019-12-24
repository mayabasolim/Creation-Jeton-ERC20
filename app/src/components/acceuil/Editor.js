
import React from "react";
//import { Modal } from 'react-bootstrap';
import { Card,CardHeader, CardBody,ListGroup,ListGroupItem,} from "shards-react";
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };


  }

  image = require("../../images/avatars/m1.png");


  _validate=(address) => {
    this.props.validerUtilisateur(address);
  };

    render() {
      return(
      <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Mon actualité</h6>
      </CardHeader>
        <CardBody className="p-0">
          {/*  {this.props.evenements.map((user, idx) => (
            <div key={idx} className="blog-comments__item d-flex p-3">

              <div className="blog-comments__content">
                
                <div className="blog-comments__meta text-mutes">
                  <a className="text-secondary" >
                    {user.msg}
                  </a>{" "}

                  <span className="text-mutes"> </span>
                </div>

                <div className="blog-comments__actions">


                </div>
              </div>
            </div>
          ))}*/}
          <ListGroup small flush className="list-group-small">
                {this.props.evenements.map((evenement, idx) => (
                <ListGroupItem key={idx} className="d-flex px-3">

                  <span className="text-semibold text-fiord-blue">{evenement.msg}</span>
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
