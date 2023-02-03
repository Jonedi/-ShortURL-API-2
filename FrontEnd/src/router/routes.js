import { api } from "src/boot/axios";

const redirectLink = async(to, from, next) => {
  
  try {
    const { data } = await api.get(`/links/${to.params.nanoid}`)
    const redirect = () => window.location.href = data.longLink
    
    setTimeout( redirect, 5000 )
    next()
  } catch (e) {
    console.log(e);
    next('/notFound')
  }
}

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue"),
        meta: { auth: true }
      },
      { path: "protected", component: () => import("pages/ProtectedPage.vue"),
        meta: { auth: true }
      },
      { path: "about", component: () => import("pages/AboutPage.vue"),
        meta: { auth: true }
      },
      { path: "login", component: () => import("src/pages/LogPage.vue") },
      { path: "signup", component: () => import("src/pages/SignUpPage.vue") },
      { path: "/:nanoid", component: () => import("src/pages/RedirectsPage.vue"),
        beforeEnter: redirectLink
      },
    ],
  },

  {
    path: "/notFound",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
