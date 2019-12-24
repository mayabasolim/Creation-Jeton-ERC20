import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";

import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";



class MainNavbar extends React.Component {
  layout=PropTypes.string;
  stickyTop= PropTypes.bool;
  stickyTop= true;
  classes = classNames(
    "main-navbar",
    "bg-white",
    this.stickyTop && "sticky-top"
  );
    render() {

        return (
          <div className={this.classes}>
            <Container className="p-0">
              <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
                <NavbarSearch />
                <NavbarNav
                  userDetails={this.props.userDetails}
                  deconnexion={this.props.deconnexion}
                />
                <NavbarToggle />
              </Navbar>
            </Container>
          </div>
        );
    }
}

export default MainNavbar;
