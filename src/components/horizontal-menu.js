export const menuItems = [
   
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
            {
                id: 31,
                label: "menuitems.email.list.reademail",
                link: "/email/reademail/1",
                parentId: 29
            },
            {
                id: 50,
                label: "menuitems.email.list.droit",
                link: "/email/reademail/1",
                parentId: 29
            },
            {
                id: 51,
                label: "menuitems.email.list.menu",
                link: "/email/reademail/1",
                parentId: 29
            },
           
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
                link: "/invoices/list",
                parentId: 34
            },
            {
                id: 36,
                label: "menuitems.invoices.list.invoicedetail",
                link: "/invoices/detail",
                parentId: 34
            }
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
                link: "/projects/grid",
                parentId: 37
            },
            {
                id: 39,
                label: "menuitems.projects.list.projectlist",
                link: "/projects/list",
                parentId: 37
            },
            {
                id: 40,
                label: "menuitems.projects.list.overview",
                link: "/projects/overview",
                parentId: 37
            },
            {
                id: 41,
                label: "menuitems.projects.list.create",
                link: "/projects/create",
                parentId: 37
            }
        ]
    },
    {
        id: 9,
        label: "menuitems.archive.text",
        icon: "bx-folder",
        link: "/calendar"
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

