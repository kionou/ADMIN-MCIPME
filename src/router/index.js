import { createWebHistory, createRouter } from "vue-router";
// import routes from "./routes";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // To start account
    {
      path: "/",
      name: "login",
      
      component: () => import("../views/account/login2.vue"),
    },
    {
      path: "/login",
      name: "login-2",
      component: () => import("../views/account/login.vue"),
    },
    {
      path: "/reinitialiser",
      name: "reinitialiser",
      component: () => import("../views/account/recover.vue"),

    },
    {
      path: "/reinitialiser2",
      name: "reinitialiser2",
      component: () => import("../views/account/recoverpw-sample.vue"),
    },

    // To finish account

    // To start dashboards

    {
      path: "/dncic",
      name: "Dncic",
      meta: { requiresAuth: true },
      component: () => import("../views/dashboards/dncic.vue"),
    },
    {
      path: "/dni",
      name: "Dni",
      meta: { requiresAuth: true },
      component: () => import("../views/dashboards/default.vue"),
    },

    // To finish dashboards

    // To start users
    {
      path: "/utilisateurs",
      name: "users",
      meta: { requiresAuth: true },
      component: () => import("../views/users/index.vue"),
    },
    {
      path: "/historiques",
      name: "historiques",
      meta: { requiresAuth: true },
      component: () => import("../views/users/historique.vue")
    },
    {
      path: "/profil",
      name: "profil",
      meta: { requiresAuth: true },
      component: () => import("../views/profil/default.vue")
    },

    {
      path: "/partenaires",
      name: "partenaires",
      meta: { requiresAuth: true },
      component: () => import("../views/partenaires/defaut.vue"),
    },
    {
      path: "/partenaires/ajouter",
      name: "partenaire-add",
      meta: { requiresAuth: true },
      component: () => import("../views/partenaires/ajouter.vue"),
    },
    {
      path: "/partenaires/update/:id",
      name: "partenaire-put",
      props: true,
      meta: { requiresAuth: true },
      component: () => import("../views/partenaires/update.vue"),
    },
    // To finish partenaires

    // To start pme

    {
      path: "/industrielles",
      name: "industrielles",
      meta: { requiresAuth: true },
      component: () => import("../views/pme/dni/default.vue"),
    },

    {
      path: "/industrielle/ajouter",
      name: "industrielle-ajouter",
      meta: { requiresAuth: true },
      component: () => import("../views/pme/dni/addUnite.vue"),
    },
    {
      path: "/industrielle/update/:id",
      name: "industrielle-update",
      meta: { requiresAuth: true },
      props: true,
      component: () => import("../views/pme/dni/updateUnite.vue"),
    },
    {
      path: "/detail-industrielle/:id",
      name: "detail-industrielle",
      meta: { requiresAuth: true },
      props: true,
      component: () => import("../views/pme/dni/detail.vue"),
    },


      // dncic
    {
      path: "/importatrices",
      name: "importatrices",
      meta: { requiresAuth: true },
      component: () => import("../views/pme/dncic/importatrice.vue"),
    },
    {
      path: "/distributrices",
      name: "distributrices",
      meta: { requiresAuth: true },
      component: () => import("../views/pme/dncic/distributrice.vue"),
    },
    {
      path: "/exportatrices",
      name: "exportatrices",
      meta: { requiresAuth: true },
      component: () => import("../views/pme/dncic/exportatrice.vue"),
    },
    {
      path: "/entreprises/ajouter",
      name: "entreprises-ajouter",
      meta: { requiresAuth: true },
      component: () => import("../views/pme/dncic/addpme.vue"),
    },
    {
      path: "/entreprises/update/:id",
      name: "entreprises-update",
      meta: { requiresAuth: true },
      props:true,
      component: () => import("../views/pme/dncic/updatepme.vue")
    },
    {
      path: "/detail-entreprises/:id",
      name: "detail-entreprises",
      meta: { requiresAuth: true },
      props: true,
      component: () => import("../views/pme/dncic/detail.vue"),
    },
   
    // To finish pme

    // To start localites

    {
      path: "/localites",
      name: "localites",
      meta: { requiresAuth: true },
      component: () => import("../views/localites/default.vue"),
    },

    // To finish localites

    // To start secteur

    {
      path: "/secteurs",
      name: "secteurs",
      meta: { requiresAuth: true },
      component: () => import("../views/secteurs/default.vue"),
    },

    // To start archive

    {
      path: "/archive",
      name: "archive",
      meta: { requiresAuth: true },
      component: () => import("../views/archives/default.vue"),
    },
    {
      path: "/archive/detail/:id",
      name: "archive-detail",
      meta: { requiresAuth: true },
      props: true,
      component: () => import("../views/archives/detail.vue"),
    },

    // To start documents

    {
      path: "/documents",
      name: "documents",
      meta: { requiresAuth: true },
      component: () => import("../views/documents/default.vue"),
    },

    // To start juridique

    {
      path: "/status-juridique",
      name: "status-juridique",
      meta: { requiresAuth: true },
      component: () => import("../views/juridique/default.vue"),
    },

    // To start zone industrielle

    {
      path: "/zone-industrielle",
      name: "zone-industrielle",
      meta: { requiresAuth: true },
      component: () => import("../views/zone/default.vue"),
    },

    {
      path: "/zone-industrielle/ajouter",
      name: "ajouter-zone-industrielle",
      meta: { requiresAuth: true },
      component: () => import("../views/zone/add.vue"),
    },
    {
      path: "/zone-industrielle/update/:id",
      name: "update-zone-industrielle",
      meta: { requiresAuth: true },
      props:true,
      component: () => import("../views/zone/update.vue"),
    },

    // To start zone indicateurs

    {
      path: "/indicateurs",
      name: "indicateurs",
      meta: { requiresAuth: true },
      component: () => import("../views/indicateurs/default.vue"),
    },
    {
      path: "/graphes",
      name: "graphes",
      meta: { requiresAuth: true },
      component: () => import("../views/indicateurs/graphe.vue"),
    },

    // To start produits

    {
      path: "/produits",
      name: "produits",
      meta: { requiresAuth: true },
      component: () => import("../views/produit/default.vue"),
    },
    {
      path: "/produits/ajouter",
      name: "produits-ajouter",
      meta: { requiresAuth: true },
      component: () => import("../views/produit/add.vue"),
    },

    // To start demandes
    {
      path: "/types-demandes",
      name: "types-demandes",
      meta: { requiresAuth: true },
      component: () => import("../views/demandes/type.vue"),
    },
    {
      path: "/demandes",
      name: "demandes",
      meta: { requiresAuth: true },
      component: () => import("../views/demandes/ministre.vue"),
    },
    // {
    //   path: "/demandes-implantations",
    //   name: "demandes-implantations",
    //   meta: { requiresAuth: true },
    //   component: () => import("../views/demandes/implantation.vue"),
    // },
    // {
    //   path: "/demandes-produits",
    //   name: "demandes-produits",
    //   meta: { requiresAuth: true },
    //   component: () => import("../views/demandes/marche.vue"),
    // },

    // To start directions
    {
      path: "/directions",
      name: "directions",
      meta: { requiresAuth: true },
      component: () => import("../views/directions/default.vue"),
    },

     // To start Stocks

     {
      path: "/stock-pme/:id",
      name: "stock-pme",
      meta: { requiresAuth: true },
      props:true,
      component: () => import("../views/stocks/stockbypme.vue"),
    },

    {
      path: "/cartographie",
      name: "cartographie",
      meta: { requiresAuth: true },
      props:true,
      component: () => import("../views/cartographie/default.vue"),
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
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const authenticatedUser = store.getters["auth/myAuthenticatedUser"];
  console.log("isAuthenticated", isAuthenticated);
  console.log(authenticatedUser);
  if (requiresAuth && !isAuthenticated) {
    // Si la route nécessite une authentification et l'utilisateur n'est pas connecté,
    // redirigez-le vers la page de connexion
    next("/");
  } else if (to.name === "login" && isAuthenticated) {
    // Si l'utilisateur est connecté et essaie d'accéder aux pages d'inscription ou de connexion,
    // redirigez-le vers la page mon_espace
    if (authenticatedUser.direction === "DNI") {
      next("/dni");
    } else {
      next("/dncic");
    }
  } else {
    next();
  }
});

export default router;
