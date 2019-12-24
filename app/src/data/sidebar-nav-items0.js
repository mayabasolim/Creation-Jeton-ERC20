export default function() {
  let y=0;
  if(y==0){
    return [
      {
        title: "Blog Dashboard",
        to: "/blog-overview",
        htmlBefore: '<i class="material-icons">edit</i>',
        htmlAfter: ""
      },
      {
        title: "Acceuil",
        to: "/acceuil",
        htmlBefore: '<i class="material-icons">edit</i>',
        htmlAfter: ""
      }
    ]
  }
  return [
    {
      title: "Blog Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Acceuil",
      to: "/acceuil",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Profile utilisateur",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Gestion des utilisateurs",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-management",
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
      title: "Transfer",
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
