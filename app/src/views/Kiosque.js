import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/kiosque/Editor";
import EditorAchat from "../components/kiosque/EditorAchat";

//import SidebarCategories from "../components/add-new-post/SidebarCategories";


class Kiosque extends React.Component {

    render() {
      return(
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Kiosque" subtitle="kiosque" className="text-sm-left" />
          </Row>

          <Row>
            {/* Editor */}

            <Col lg="9" md="12">

              <Editor
                kiosques={this.props.kiosques}
                achatKiosque={this.props.achatKiosque}
                listePage={this.props.listePage}
               />
            </Col>

            <Col lg="3" md="12">

              <EditorAchat
                  mesachats={this.props.mesachats}
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
export default Kiosque;
