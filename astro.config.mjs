// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import { clickToSource } from 'astro-click-to-source';

// Plugin para eliminar comentarios HTML
const removeHtmlComments = {
  name: "remove-html-comments",
  apply: /** @type {const} */ ("build"),
  enforce: /** @type {const} */ ("post"),
  // @ts-ignore
  transformIndexHtml(html) {
    if (typeof html === "string") {
      return html.replace(/<!--[\s\S]*?-->/g, "");
    }
    return html;
  }
};

let DEPLOY_DOMAIN = "https://gonwms.github.io";
let DEPLOY_PATH = "/red-terapia/";

// UNCOMMENT FOR CUSTOM DOMAIN:
// DEPLOY_DOMAIN = "https://redterapia.com";
// DEPLOY_PATH = "/";

export default defineConfig({
  site: DEPLOY_DOMAIN,
  base: DEPLOY_PATH,
  build: { assets: "assets" },
  integrations: [
    clickToSource(),
    icon({
      include: {
        "simple-icons": ["*"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss(), removeHtmlComments],
  },
});
