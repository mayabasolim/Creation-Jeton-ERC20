import React from "react";
import { Container, Row, Col } from "shards-react";

//import PageTitle from "../components/common/PageTitle";
import LoginConnexion from "../components/user-profile-lite/LoginConnexion";
import CreerCompte from "../components/user-profile-lite/CreerCompte";

class Login extends React.Component {

    render() {
      return(
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
        {/*  <PageTitle title="" subtitle="Profil" md="12" className="ml-sm-auto mr-sm-auto" />*/}
        </Row>
        <Row>
          <Col lg="4">
            <LoginConnexion
            userDetails={this.props.userDetails}
            connexion={this.props.connexion}
            updateUtilisateur={this.props.updateUtilisateur}/>
          </Col>
          {/*<Col lg="8">
          <CreerCompte
            creerCompte={this.props.creerCompte}/>
          </Col>*/}
        </Row>
      </Container>
    );
    }
  }

export default Login;
