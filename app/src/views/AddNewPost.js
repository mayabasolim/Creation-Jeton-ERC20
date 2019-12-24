import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import Add from "../components/add-new-post/Add";
//import SidebarCategories from "../components/add-new-post/SidebarCategories";


class AddNewPost extends React.Component {

    render() {
      return(
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Mes projets" subtitle="Projet" className="text-sm-left" />
          </Row>

          <Row>
            {/* Editor */}

            <Col lg="9" md="12">
            <Add
            creerProjet={this.props.creerProjet}
            />
              <Editor
              projets={this.props.projets}
              mesprojets={this.props.mesprojets}
              tipProjet={this.props.tipProjet}
              solutionner={this.props.solutionner}
              listePage={this.props.listePage}
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
export default AddNewPost;
