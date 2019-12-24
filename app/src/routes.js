import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import { DefaultLayout0 } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import ValidatePost from "./views/ValidatePost";
import ProjetFavoris from "./views/ProjetFavoris";
import UserManagement from "./views/UserManagement";
import Acceuil from "./views/Acceuil";
import Transfer from "./views/Transfer";
import GestionKiosque from "./views/GestionKiosque"
import Kiosque from "./views/Kiosque"
import Errors from "./views/Errors";
import Login from "./views/Login";
import NewAccount from "./views/NewAccount";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    //component: () => <Redirect to="/blog-overview" />
    component: () => <Redirect to="/login" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/gestion-kiosque",
    layout: DefaultLayout,
    component: GestionKiosque
  },
  {
    path: "/kiosque",
    layout: DefaultLayout,
    component: Kiosque
  },
  {
    path: "/user-management",
    layout: DefaultLayout,
    component: UserManagement
  },
  {
    path: "/accueil",
    layout: DefaultLayout,
    component: Acceuil
  },
  {
    path: "/projet-favoris",
    layout: DefaultLayout,
    component: ProjetFavoris
  },
  {
    path: "/validate-post",
    layout: DefaultLayout,
    component: ValidatePost
  },
  {
    path: "/transfer",
    layout: DefaultLayout,
    component: Transfer
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/login",
    layout: DefaultLayout0,
    component: Login
  },
  {
    path: "/newAccount",
    layout: DefaultLayout0,
    component: NewAccount
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  }
];
