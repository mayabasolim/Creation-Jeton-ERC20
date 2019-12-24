
import React from "react";
//import { Modal } from 'react-bootstrap';
import { Card,CardHeader, CardBody, Button,ButtonGroup} from "shards-react";
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
        <h6 className="m-0">Liste des utilisateurs</h6>
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

                  </ButtonGroup>

                </div>
              </div>
            </div>
          ))}
        </CardBody>

      </Card>

      )
    }
}

export default Editor;
