const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue"),
        meta: {
          auth: true
        }
      },
      { path: "login", component: () => import("src/pages/LogPage.vue") },
      { path: "signup", component: () => import("src/pages/SignUpPage.vue") },
      { path: "protected", component: () => import("pages/ProtectedPage.vue"),
        meta: {
          auth: true
        }
      },
      { path: "about", component: () => import("pages/AboutPage.vue"),
        meta: {
          auth: true
        }
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
