import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";

/*export default () => (
  <Nav navbar className="border-left flex-row">
    <Notifications />
    <UserActions
      userDetails={this.props.userDetails}
     />
  </Nav>
);*/

class NavbarNav extends React.Component {

    render() {
      return(
        <Nav navbar className="border-left flex-row">
          <Notifications />
          <UserActions
            userDetails={this.props.userDetails}
            deconnexion={this.props.deconnexion}
           />
        </Nav>
      );
    }
}

export default NavbarNav;
