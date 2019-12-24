export default function(i) {
  if(i===0){
    return [
      /*{
        title: "Blog Dashboard",
        to: "/blog-overview",
        htmlBefore: '<i class="material-icons">edit</i>',
        htmlAfter: ""
      },*/
      {
        title: "Accueil",
        to: "/accueil",
        htmlBefore: '<i class="material-icons">edit</i>',
        htmlAfter: ""
      },
      {
        title: "Profil utilisateur",
        htmlBefore: '<i class="material-icons">person</i>',
        to: "/user-profile-lite",
      },

      {
        title: "Mes projets",
        htmlBefore: '<i class="material-icons">note_add</i>',
        to: "/add-new-post",
      },
      {
        title: "Gestion des projets",
        htmlBefore: '<i class="material-icons">note_add</i>',
        to: "/validate-post",
      },
      {
        title: "Transfert",
        htmlBefore: '<i class="material-icons">swap_horiz</i>',
        to: "/transfer",
      },
      {
        title: "Kiosque",
        htmlBefore: '<i class="material-icons">store_mall_directory</i>',
        to: "/kiosque",
      }

    ];
  }
  return [
    /*{
      title: "Blog Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },*/
    {
      title: "Accueil",
      to: "/accueil",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Profil utilisateur",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Gestion des utilisateurs",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-management",
    },
    {
      title: "Gestion kiosque",
      htmlBefore: '<i class="material-icons">store_mall_directory</i>',
      to: "/gestion-kiosque",
    },
  /*  {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },*/
    {
      title: "Mes projets",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Gestion des projets",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/validate-post",
    },
    {
      title: "Transfert",
      htmlBefore: '<i class="material-icons">swap_horiz</i>',
      to: "/transfer",
    }
  /*  {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },*/
  /*  {
      title: "Tables",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },*/

  /*  {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }*/
  ];
}
