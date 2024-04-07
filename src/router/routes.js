
export default [

  // To start account
  {
    path: "/",
    name: "login",
    component: () => import("../views/account/login.vue"),
   
  },
  {
    path: "/reinitialiser",
    name: "reinitialiser",
    component: () => import("../views/account/recoverpw-sample.vue")
  },

   // To finish account

    // To start dashboards

  {
    path: "/dncic",
    name: "Dncic",
    meta: { requiresAuth: true },
    component: () => import("../views/dashboards/dncic.vue")
  },
  {
    path: "/dni",
    name: "Dni",
    meta: { requiresAuth: true },
    component: () => import("../views/dashboards/default.vue")
  },

 // To finish dashboards


  // To start users
  {
    path: "/utilisateurs",
    name: "users",
    meta: { requiresAuth: true },
    component: () => import("../views/users/index.vue")
  },
  

 // To start partenaires

 {
  path: "/partenaires",
  name: "partenaires",
  meta: { requiresAuth: true },
  component: () => import("../views/partenaires/defaut.vue")
},
{
  path: "/partenaires/ajouter",
  name: "partenaire-add",
  meta: { requiresAuth: true },
  component: () => import("../views/partenaires/ajouter.vue")
},
{
  path: "/partenaires/update/:id",
  name: "partenaire-put",
  props:true,
  meta: { requiresAuth: true },
  component: () => import("../views/partenaires/update.vue")
},
// To finish partenaires

 // To start pme

 {
  path: "/industrie",
  name: "industrie",
  meta: { requiresAuth: true },
  component: () => import("../views/pme/default.vue")
},
// {
//   path: "/pme/ajouter",
//   name: "partenaire-add",
//   meta: { requiresAuth: true },
//   component: () => import("../views/pme/ajouter.vue")
// },
// To finish pme


  // To start localites

  {
    path: "/localites",
    name: "localites",
    meta: { requiresAuth: true },
    component: () => import("../views/localites/default.vue")
  },
 

 // To finish localites

 
 // To start secteur

 {
  path: "/secteurs",
  name: "secteurs",
  meta: { requiresAuth: true },
  component: () => import("../views/secteurs/default.vue")
},


 

 // To start archive

 {
  path: "/archive",
  name: "archive",
  meta: { requiresAuth: true },
  component: () => import("../views/archives/default.vue")
},
{
  path: "/archive/detail/:id",
  name: "archive-detail",
  meta: { requiresAuth: true },
  props:true,
  component: () => import("../views/archives/detail.vue")
},

// To start documents

{
  path: "/documents",
  name: "documents",
  meta: { requiresAuth: true },
  component: () => import("../views/documents/default.vue")
},


 // To start juridique

 {
  path: "/status-juridique",
  name: "status-juridique",
  meta: { requiresAuth: true },
  component: () => import("../views/juridique/default.vue")
},


 // To start zone industrielle

 {
  path: "/zone-industrielle",
  name: "zone-industrielle",
  meta: { requiresAuth: true },
  component: () => import("../views/zone/default.vue")
},
 
// To start zone indicateurs

{
  path: "/indicateurs",
  name: "indicateurs",
  meta: { requiresAuth: true },
  component: () => import("../views/indicateurs/default.vue")
},
 
 
  
  
 
 
  
  

];
