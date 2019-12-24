import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/user-management/Editor";


class UserManagement extends React.Component {

    render() {
      return(
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Gestion des utilisateurs" subtitle="Projet" className="text-sm-left" />
          </Row>

          <Row>
            {/* Editor */}

            <Col lg="9" md="12">
              <Editor
              validerUtilisateur={this.props.validerUtilisateur}
              utilisateurs={this.props.utilisateurs}
              listePage={this.props.listePage}
              sendEther={this.props.sendEther}
               />
            </Col>

          </Row>

        </Container>
      )
    }
}
export default UserManagement;
