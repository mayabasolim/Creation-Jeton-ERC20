import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/gestion-kiosque/Editor";
import EditorVente from "../components/gestion-kiosque/EditorVente";
import Add from "../components/gestion-kiosque/Add";
//import SidebarCategories from "../components/add-new-post/SidebarCategories";


class GestionKiosque extends React.Component {

    render() {
      return(
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Gestion kiosque" subtitle="kiosque" className="text-sm-left" />
          </Row>

          <Row>
            {/* Editor */}

            <Col lg="9" md="12">
            <Add
            ajouterKiosque={this.props.ajouterKiosque}
            />
              <Editor
                kiosques={this.props.kiosques}
                updateKiosque={this.props.updateKiosque}
                listePage={this.props.listePage}
               />
            </Col>
            <Col lg="3" md="12">

              <EditorVente
                  mesventes={this.props.mesventes}
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
export default GestionKiosque;
