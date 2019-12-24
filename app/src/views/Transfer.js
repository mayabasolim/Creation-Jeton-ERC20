import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/transfer/Editor";
import Add from "../components/transfer/Add";
//import SidebarCategories from "../components/add-new-post/SidebarCategories";


class Transfer extends React.Component {

    render() {
      return(
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Mes transferts" subtitle="Transfert" className="text-sm-left" />
          </Row>

          <Row>
            {/* Editor */}

            <Col lg="12" md="12">
            <Add
            transfer={this.props.transfer}
            />
              <Editor
              projets={this.props.projets}
              mestransferts={this.props.mestransferts}
              tipProjet={this.props.tipProjet}
               />
            </Col>

            {/* Sidebar Widgets
            <Col lg="3" md="12">
              <SidebarActions
              />
              <SidebarCategories />
            </Col>*/}

          </Row>

        </Container>
      )
    }
}
export default Transfer;
