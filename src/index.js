import indexHTML from "./index.html";
import styleCSS from "./style.css";
import scriptJS from "./script.js";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(indexHTML, {
        headers: { "Content-Type": "text/html" }
      });
    }

    if (url.pathname === "/style.css") {
      return new Response(styleCSS, {
        headers: { "Content-Type": "text/css" }
      });
    }

    if (url.pathname === "/script.js") {
      return new Response(scriptJS, {
        headers: { "Content-Type": "application/javascript" }
      });
    }

    return new Response("Not found", { status: 404 });
  }
};
