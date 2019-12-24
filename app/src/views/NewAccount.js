import React from "react";
import { Container, Row, Col } from "shards-react";

import CreerCompte from "../components/user-profile-lite/CreerCompte";

class NewAccount extends React.Component {

    render() {
      return(
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
        {/*  <PageTitle title="" subtitle="Profil" md="12" className="ml-sm-auto mr-sm-auto" />*/}
        </Row>
        <Row>

          <Col lg="8">
          <CreerCompte
            creerCompte={this.props.creerCompte}/>
          </Col>
        </Row>
      </Container>
    );
    }
  }

export default NewAccount;
