import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/projet-favoris/Editor";
import EditorFav from "../components/projet-favoris/EditorFav";


class AddNewPost extends React.Component {

    render() {
      return(
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Gestion des projets" subtitle="Projet" className="text-sm-left" />
          </Row>

          <Row>
            {/* Editor */}

            <Col lg="9" md="12">
            <EditorFav
            creerProjet={this.props.creerProjet}
            projets={this.props.projets}
            validerProjet={this.props.validerProjet}
            tipProjet={this.props.tipProjet}
            ajouterFavoris={this.props.ajouterFavoris}
              projetsFavoris={this.props.projetsFavoris}
              userDetails={this.props.userDetails}
              listePage={this.props.listePage}
             />

            </Col>

          <Col lg="3" md="12">
          <Editor
          creerProjet={this.props.creerProjet}
          projets={this.props.projets}
          validerProjet={this.props.validerProjet}
          tipProjet={this.props.tipProjet}
          ajouterFavoris={this.props.ajouterFavoris}
          projetsFavoris={this.props.projetsFavoris}
          userDetails={this.props.userDetails}
          listePage={this.props.listePage}
           />
          </Col>
          </Row>

        </Container>
      )
    }
}
export default AddNewPost;
