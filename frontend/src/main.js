import { createApp } from "vue";
import App from "./App.vue";

// router
import router from "./router";

// bootstrap bundle
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

import { createMetaManager, defaultConfig } from "vue-meta";
const metaManager = createMetaManager(false, {
  ...defaultConfig,
  meta: { tag: "meta", nameless: true },
});

// font aswesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import VueQRCodeComponent from "vue-qrcode-component";
import VueHtmlToPaper from "vue-html-to-paper";
const pinia = createPinia();
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
};
library.add(faLinkedinIn, faGithub, faFileLines);

createApp(App)
  .use(bootstrap)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(metaManager)
  .use(vuetify)
  .use(pinia)
  .use(VueHtmlToPaper, options)
  .component("qr-code", VueQRCodeComponent)
  .mount("#app");
