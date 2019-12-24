import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";


class DefaultLayout extends React.Component {

    render() {
      return(
  <Container fluid>
    <Row>
      <MainSidebar
      account={this.props.account}
      account0={this.props.account0}
      userDetails={this.props.userDetails}
       />
      <Col
        className="main-content p-0"
        lg={{ size: 10, offset: 2 }}
        md={{ size: 9, offset: 3 }}
        sm="12"
        tag="main"
      >
        {!this.props.noNavbar && <MainNavbar
            userDetails={this.props.userDetails}
            deconnexion={this.props.deconnexion}
          />}
        {this.props.children}
        {!this.props.noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>
)}
}
DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
