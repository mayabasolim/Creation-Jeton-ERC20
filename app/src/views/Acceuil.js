import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/acceuil/Editor";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";


class Acceuil extends React.Component {

    render() {
      return(
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Accueil" subtitle="Accueil" className="text-sm-left" />
          </Row>
          <Row>
            {/* Users Overview
            <Col lg="8" md="12" sm="12" className="mb-4">
              <UsersOverview />
            </Col>*/}

            {/* Users by Device
            <Col lg="4" md="6" sm="12" className="mb-4">
              <UsersByDevice />
            </Col>
*/}

          </Row>
          <Row>

            <Col lg="12" md="12">
              <Editor
              validerUtilisateur={this.props.validerUtilisateur}
              utilisateurs={this.props.utilisateurs}
              evenements={this.props.evenements}
               />
            </Col>

          </Row>

        </Container>
      )
    }
}
export default Acceuil;
