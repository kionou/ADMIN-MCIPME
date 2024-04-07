import store from '@/store'
const authenticatedUser = store.getters['auth/myAuthenticatedUser'];
console.log('menu',authenticatedUser);
let menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
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
                parentId: 29
            },
            // {
            //     id: 31,
            //     label: "menuitems.email.list.reademail",
            //     link: "/email/reademail/1",
            //     parentId: 29
            // },
           
        ]
    },
    {
        id: 34,
        label: "menuitems.invoices.text",
        icon: "bx-buildings",
        subItems: [
            {
                id: 35,
                label: "menuitems.invoices.list.invoicelist",
                link: "/industrie",
                parentId: 34
            },
            
        ]
    },
    {
        id: 56,
        label: "menuitems.dncic.text",
        icon: "bx-buildings",
        subItems: [
            {
                id: 57,
                label: "menuitems.dncic.list.importatrice",
                link: "/importatrices",
                parentId: 56
            },
            {
                id: 57,
                label: "menuitems.dncic.list.distributrice",
                link: "/distributrices",
                parentId: 56
            },
            
        ]
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
                parentId: 37
            },
            {
                id: 39,
                label: "menuitems.projects.list.projectlist",
                link: "/localites",
                parentId: 37
            },
            {
                id: 40,
                label: "menuitems.projects.list.overview",
                link: "/partenaires",
                parentId: 37
            },
            {
                id: 41,
                label: "menuitems.projects.list.create",
                link: "/secteurs",
                parentId: 37
            },
            // {
            //     id: 50,
            //     label: "menuitems.projects.list.demande",
            //     link: "/demande",
            //     parentId: 37
            // },
            {
                id: 51,
                label: "menuitems.projects.list.categorie",
                link: "/produits",
                parentId: 37
            },
            {
                id: 53,
                label: "menuitems.projects.list.zone",
                link: "/zone-industrielle",
                parentId: 37
            },
            {
                id: 54,
                label: "menuitems.projects.list.indicateur",
                link: "/indicateurs",
                parentId: 37
            },
            {
                id: 55,
                label: "menuitems.projects.list.juridique",
                link: "/status-juridique",
                parentId: 37
            },

        ]
    },
    {
        id: 9,
        label: "menuitems.archive.text",
        icon: "bx-folder",
        link: "/archive"
    },
    {
        id: 42,
        label: "menuitems.tasks.text",
        icon: "bx-task",
        subItems: [
            {
                id: 43,
                label: "menuitems.tasks.list.tasklist",
                link: "/tasks/list",
                parentId: 42
            },
            {
                id: 44,
                label: "menuitems.tasks.list.kanban",
                link: "/tasks/kanban",
                parentId: 42
            },
            {
                id: 45,
                label: "menuitems.tasks.list.createtask",
                link: "/tasks/create",
                parentId: 42
            }
        ]
    },
    {
        id: 46,
        label: "menuitems.contacts.text",
        icon: "bx-building",
        subItems: [
            {
                id: 47,
                label: "menuitems.contacts.list.usergrid",
                link: "/contacts/grid",
                parentId: 46
            },
            {
                id: 48,
                label: "menuitems.contacts.list.userlist",
                link: "/contacts/list",
                parentId: 46
            },
            {
                id: 49,
                label: "menuitems.contacts.list.profile",
                link: "/contacts/profile",
                parentId: 46
            }
        ]
    },

   
    
  
    
];


const isDNIDepartment = authenticatedUser.direction === 'DNI';

// Si l'utilisateur appartient à la direction "DNI", filtrez les éléments du menu
if (isDNIDepartment) {
    // Filtrer le menu pour exclure l'élément avec l'id 56 (menuitems.dncic.text)
    menuItems = menuItems.filter(item => item.id !== 56);
} else{
    menuItems = menuItems.filter(item => item.id !== 34);
    const parent37 = menuItems.find(item => item.id === 37);
    if (parent37) {
        parent37.subItems = parent37.subItems.filter(subItem => subItem.id !== 53);
    }

}
console.log('menuItems',menuItems);

export { menuItems };