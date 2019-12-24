import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";

class UserProfileLite extends React.Component {

    render() {
      return(
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Profil Utilisateur" subtitle="Profil" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
          <Col lg="4">
            <UserDetails
            account={this.props.account}
            balance={this.props.balance}
            userDetails={this.props.userDetails}/>
          </Col>
          <Col lg="8">
            <UserAccountDetails
            userDetails={this.props.userDetails}
            updateUtilisateur={this.props.updateUtilisateur}/>
          </Col>
        </Row>
      </Container>
    );
    }
  }

export default UserProfileLite;
