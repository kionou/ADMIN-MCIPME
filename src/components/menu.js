import store from "@/store";
const authenticatedUser = store.getters["auth/myAuthenticatedUser"];
console.log("menu", authenticatedUser);
let menuItems = [
  {
    id: 1,
    label: "menuitems.menu.text",
    isTitle: true,
  },
  {
    id: 29,
    label: "menuitems.email.text",
    icon: "bx-user",
    subItems: [
      {
        id: 30,
        label: "menuitems.email.list.inbox",
        link: "/utilisateurs",
        parentId: 29,
      },
      {
          id: 32,
          label: "menuitems.email.list.role",
          link: "/droits",
          parentId: 29
      },
      // {
      //     id: 32,
      //     label: "menuitems.email.list.droit",
      //     link: "/email/reademail/1",
      //     parentId: 29
      // },
      {
        id: 33,
        label: "menuitems.email.list.historique",
        link: "/historiques",
        parentId: 29,
      },
    ],
  },
  {
    id: 34,
    label: "menuitems.invoices.text",
    icon: "bx-buildings",
    subItems: [
      {
        id: 35,
        label: "menuitems.invoices.list.invoicelist",
        link: "/industrielles",
        parentId: 34,
      },
    ],
  },
  {
    id: 56,
    label: "menuitems.dncic.text",
    icon: "bx-buildings",
    subItems: [
      {
        id: 57,
        label: "menuitems.dncic.list.distributrice",
        link: "/distributrices",
        parentId: 56,
      },
      {
        id: 58,
        label: "menuitems.dncic.list.exportatrice",
        link: "/exportatrices",
        parentId: 56,
      },
      {
        id: 59,
        label: "menuitems.dncic.list.importatrice",
        link: "/importatrices",
        parentId: 56,
      },
    ],
  },
  {
    id: 37,
    label: "menuitems.projects.text",
    icon: "bx-cog",
    subItems: [
      {
        id: 38,
        label: "menuitems.projects.list.grid",
        link: "/documents",
        parentId: 37,
      },
      {
        id: 39,
        label: "menuitems.projects.list.projectlist",
        link: "/localites",
        parentId: 37,
      },
      {
        id: 40,
        label: "menuitems.projects.list.overview",
        link: "/partenaires",
        parentId: 37,
      },
      {
        id: 41,
        label: "menuitems.projects.list.create",
        link: "/secteurs",
        parentId: 37,
      },
      // {
      //   id: 50,
      //   label: "menuitems.projects.list.direction",
      //   link: "/directions",
      //   parentId: 37,
      // },
      {
        id: 56,
        label: "menuitems.projects.list.demande",
        link: "/types-demandes",
        parentId: 37,
      },
      {
        id: 57,
        label: "menuitems.projects.list.entreprise",
        link: "/types-entreprises",
        parentId: 37,
      },
      {
        id: 58,
        label: "menuitems.projects.list.departement",
        link: "/departements",
        parentId: 37,
      },
      {
        id: 52,
        label: "menuitems.projects.list.categorie",
        link: "/produits",
        parentId: 37,
      },
      // {
      //   id: 57,
      //   label: "menuitems.projects.list.graphe",
      //   link: "/graphes",
      //   parentId: 37,
      // },
      {
        id: 53,
        label: "menuitems.projects.list.zone",
        link: "/zone-industrielle",
        parentId: 37,
      },
      {
        id: 54,
        label: "menuitems.projects.list.indicateur",
        link: "/indicateurs",
        parentId: 37,
      },
      {
        id: 55,
        label: "menuitems.projects.list.juridique",
        link: "/status-juridique",
        parentId: 37,
      },
    ],
  },
  {
    id: 9,
    label: "menuitems.archive.text",
    icon: "bx-folder",
    link: "/archive",
  },
  {
    id: 42,
    label: "menuitems.tasks.text",
    icon: "bx-task",
    link: "/demandes",
    
  },
  {
    id: 60,
    label: "menuitems.cartographie.text",
    icon: "bx-map",
    link: "/cartographie",
  },
  {
    id: 61,
    label: "menuitems.statistique.text",
    icon: "bxs-bar-chart-alt-2",
    link: "/rapport-statistiques",
  },
  // {
  //     id: 46,
  //     label: "menuitems.contacts.text",
  //     icon: "bx-building",
  //     subItems: [
  //         {
  //             id: 47,
  //             label: "menuitems.contacts.list.usergrid",
  //             link: "/contacts/grid",
  //             parentId: 46
  //         },
  //         {
  //             id: 48,
  //             label: "menuitems.contacts.list.userlist",
  //             link: "/contacts/list",
  //             parentId: 46
  //         },
  //         {
  //             id: 49,
  //             label: "menuitems.contacts.list.profile",
  //             link: "/contacts/profile",
  //             parentId: 46
  //         }
  //     ]
  // },
];

const isDNIDepartment = authenticatedUser.direction === "DNI";

// Si l'utilisateur appartient à la direction "DNI", filtrez les éléments du menu
if (isDNIDepartment) {
  // Filtrer le menu pour exclure l'élément avec l'id 56 (menuitems.dncic.text)
  menuItems = menuItems.filter((item) => item.id !== 56);
} else if (authenticatedUser.direction === "DNCIC") {
  menuItems = menuItems.filter((item) => item.id !== 34);
  const parent37 = menuItems.find((item) => item.id === 37);
  if (parent37) {
    parent37.subItems = parent37.subItems.filter(
      (subItem) => subItem.id !== 53
    );
  }
}
console.log("menuItems", menuItems);

export { menuItems };
