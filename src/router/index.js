import { createWebHistory, createRouter } from "vue-router";
// import routes from "./routes";
import store from "../store"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[

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
  {
    path: "/importatrices",
    name: "importatrices",
    meta: { requiresAuth: true },
    component: () => import("../views/pme/importatrice.vue")
  },
    {
    path: "/distributrices",
    name: "distributrices",
    meta: { requiresAuth: true },
    component: () => import("../views/pme/distributrice.vue")
  },
  {
    path: "/add-unite",
    name: "add-unite",
    meta: { requiresAuth: true },
    component: () => import("../views/pme/addUnite.vue")
  },
  {
    path: "/detail-importatrice/:id",
    name: "detail-importatrice",
    meta: { requiresAuth: true },
    props:true,
    component: () => import("../views/pme/detailUnite.vue")
  },
  {
    path: "/detail-distributrice/:id",
    name: "detail-distributrice",
    meta: { requiresAuth: true },
    props:true,
    component: () => import("../views/pme/detailDistri.vue")
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

    // To start produits
  
    {
      path: "/produits",
      name: "produits",
      meta: { requiresAuth: true },
      component: () => import("../views/produit/default.vue")
    },
     
  
  ],
  // mode: "history",
 
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // }
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const authenticatedUser = store.getters['auth/myAuthenticatedUser'];
    console.log('isAuthenticated',isAuthenticated);
    console.log(authenticatedUser);
  if (requiresAuth && !isAuthenticated) {
    // Si la route nécessite une authentification et l'utilisateur n'est pas connecté,
    // redirigez-le vers la page de connexion
    next('/');
  } else if ((to.name === 'login' ) && isAuthenticated) {
    // Si l'utilisateur est connecté et essaie d'accéder aux pages d'inscription ou de connexion,
    // redirigez-le vers la page mon_espace
      if(authenticatedUser.direction === 'DNI'){
          next('/dni');

      }else{
        next('/dncic');

      }
  }
  else {
    next();
  }
});



export default router;
