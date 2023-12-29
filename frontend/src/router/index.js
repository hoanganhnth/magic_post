import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FormLogin from "../views/FormLogin.vue";
import ManageEmployee from "@/views/boss/ManageEmployee";
import ManageSystem from "@/views/boss/ManageSystem";
import ManageStatistical from "@/views/boss/ManageStatistical";

import StatisticalCollection from "@/views/leader_collectionPoint/StatisticalCollection";
import CreatAccountCollection from "@/views/leader_collectionPoint/CreatAccountCollection";
import StatisticalTransaction from "@/views/learder_transactionPoint/StatisticalTransaction";
import CreatAccountTransaction from "@/views/learder_transactionPoint/CreatAccountTransaction";

import OrderManage from "@/views/employee_transaction/OrderManage";
import StatisticsOrders from "@/views/employee_transaction/StatisticsOrders";
import PrintAndRecord from "@/views/employee_transaction/PrintAndRecord";

import CreatCollection from "@/views/employee_collections/CreatCollection";
const routes = [
  {
    path: "/employee_collection",
    name: "Employee Collection",
    component: CreatCollection,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/leader_transaction",
    name: "Leader Transaction",
    component: StatisticalTransaction,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/leader_transaction/creat",
    name: "Leader Transaction Account",
    component: CreatAccountTransaction,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/leader_collection",
    name: "Leader Collection",
    component: StatisticalCollection,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/leader_collection/creat",
    name: "Leader Collection Account",
    component: CreatAccountCollection,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/employee_transaction",
    name: "Employee Transaction",
    component: OrderManage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/employee_transaction/statistics",
    name: "Employee Transaction Statistics",
    component: StatisticsOrders,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/employee_transaction/print",
    name: "Employee Transaction Create New",
    component: PrintAndRecord,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/login", name: "Login", component: FormLogin },
  {
    path: "/boss/employee",
    name: "Boss Employee",
    component: ManageEmployee,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/boss/manage_collection",
    name: "Boss Collection",
    component: ManageSystem,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/boss",
    name: "Boss Statistical",
    component: ManageStatistical,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;

/**
 * Below code will display the component/active page title
 * Powered by: Nangialai Stoman
 */

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("userrole");
  if (to.meta.requiresAuth && !storedToken) {
    // Nếu route yêu cầu xác thực và không có token, chuyển hướng đến trang đăng nhập
    next("/login");
  } else {
    if (storedToken && to.meta.requiresAuth) {
      switch (storedRole) {
        case "leader":
          if (
            to.name === "Boss Employee" ||
            to.name === "Boss Collection" ||
            to.name === "Boss Statistical"
          ) {
            next();
          } else {
            // ko cho phep
          }
          break;
        case "Collection staff":
          if (to.name === "Employee Collection") {
            next();
          } else {
            next({ name: "Employee Collection" });
          }
          break;
        case "Transaction staff":
          if (
            to.name === "Employee Transaction" ||
            to.name === "Employee Transaction Statistics" ||
            to.name === "Employee Transaction Create New"
          ) {
            next();
          } else {
            next({ name: "Leader Collection" });
          }
          break;
        case "Head of collection point":
          if (
            to.name === "Leader Collection" ||
            to.name === "Leader Collection Account"
          ) {
            next();
          } else {
            next({ name: "Leader Collection" });
          }
          break;
        case "Head of transaction point":
          if (
            to.name === "Leader Transaction" ||
            to.name === "Leader Transaction Account"
          ) {
            next();
          } else {
            next({ name: "Leader Transaction" });
          }
          break;
      }
    } else {
      next();
    }
    // Nếu có token và trạng thái xác thực không sẵn sàng, thực hiện attempt
    // Các trường hợp khác, tiếp tục
  }

  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});
