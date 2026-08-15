"use strict";

const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const indexSource = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const stylesSource = fs.readFileSync(path.join(projectRoot, "styles.css"), "utf8");
const appSource = fs.readFileSync(path.join(projectRoot, "app.js"), "utf8");
const versionMatch = appSource.match(/const APP_VERSION = "([^"]+)"/);
const version = versionMatch?.[1] || "desconhecida";

const output = `/* Text Express ${version} — carregador autossuficiente */
(() => {
  "use strict";

  const documentRef = document;
  const currentScript = documentRef.currentScript;
  const baseUrl = currentScript?.src
    ? new URL("./", currentScript.src).href
    : "https://king-programador.github.io/text-express/";

  const removeBrokenInstance = () => {
    const staleApp = window.textExpressApp;
    const staleRoot = documentRef.getElementById("text-express-app");
    try { documentRef.removeEventListener?.("keydown", staleApp?.onGlobalKeyDown, true); } catch {}
    try { documentRef.removeEventListener?.("focusin", staleApp?.onGlobalFocusIn, true); } catch {}
    try { documentRef.removeEventListener?.("selectionchange", staleApp?.onSelectionChange, true); } catch {}
    try { staleRoot?.remove(); } catch {}
    try { delete window.textExpressApp; } catch { window.textExpressApp = null; }
  };

  const openExistingApp = () => {
    const app = window.textExpressApp;
    const root = documentRef.getElementById("text-express-app");
    const panel = root?.querySelector?.(".te-panel");
    const launcher = root?.querySelector?.(".te-reopen-button");

    const healthy = Boolean(
      app
      && root
      && root.isConnected !== false
      && app.root === root
      && panel
      && launcher
      && typeof app.openApp === "function"
    );

    if (!healthy) {
      if (app || root) removeBrokenInstance();
      return false;
    }

    try {
      app.openApp();
      if (panel.classList?.contains?.("te-hidden")) {
        throw new Error("painel permaneceu oculto");
      }
      try { app.ensureDefaultDeckAvailable?.(); } catch (error) {
        console.error("Text Express — recuperação não bloqueante:", error);
      }
      return true;
    } catch (error) {
      console.error("Text Express — instância anterior inválida; reconstruindo:", error);
      removeBrokenInstance();
      return false;
    }
  };

  window.__textExpressStandaloneSkipBundle = openExistingApp();
  if (window.__textExpressStandaloneSkipBundle) return;

  try {
    let stylesheet = documentRef.getElementById("te-bookmarklet-style");
    if (!stylesheet) {
      stylesheet = documentRef.createElement("link");
      stylesheet.id = "te-bookmarklet-style";
      stylesheet.rel = "stylesheet";
      (documentRef.head || documentRef.documentElement).appendChild(stylesheet);
    }
    stylesheet.href = baseUrl + "styles.css?v=${version}";

    let inlineStyles = documentRef.getElementById("te-bookmarklet-inline-style");
    if (!inlineStyles) {
      inlineStyles = documentRef.createElement("style");
      inlineStyles.id = "te-bookmarklet-inline-style";
      (documentRef.head || documentRef.documentElement).appendChild(inlineStyles);
    }
    inlineStyles.textContent = ${JSON.stringify(stylesSource)};

    if (!documentRef.getElementById("text-express-app")) {
      const parsed = new DOMParser().parseFromString(
        ${JSON.stringify(indexSource)},
        "text/html"
      );
      const interfaceRoot = parsed.getElementById("text-express-app");
      if (!interfaceRoot) throw new Error("Interface incorporada não encontrada");
      const insertionTarget = documentRef.body || documentRef.documentElement;
      insertionTarget.insertAdjacentHTML("beforeend", interfaceRoot.outerHTML);
    }
  } catch (error) {
    window.__textExpressStandaloneSkipBundle = true;
    console.error("Text Express — preparação da interface:", error);
    window.alert(
      "O Text Express não conseguiu preparar a interface nesta página.\\n" +
      "Detalhe: " + (error?.message || String(error))
    );
  }
})();

if (!window.__textExpressStandaloneSkipBundle) {
  try {
${appSource}

    (() => {
      "use strict";
      const root = document.getElementById("text-express-app");
      if (!window.textExpressApp && window.TextExpressApp && root) {
        delete root.dataset.teInitialized;
        window.textExpressApp = new window.TextExpressApp(root);
        window.textExpressApp.init();
      }

      if (!window.textExpressApp) {
        throw new Error("A instância da aplicação não foi criada");
      }

      window.textExpressApp.openApp?.();
      const panel = root?.querySelector?.(".te-panel");
      if (!panel || panel.classList?.contains?.("te-hidden")) {
        throw new Error("O painel permaneceu oculto após a inicialização");
      }

      try { window.textExpressApp.ensureDefaultDeckAvailable?.(); } catch (error) {
        console.error("Text Express — recuperação não bloqueante:", error);
      }
    })();
  } catch (error) {
    console.error("Text Express — inicialização:", error);
    try { delete window.textExpressApp; } catch { window.textExpressApp = null; }
    const brokenRoot = document.getElementById("text-express-app");
    try { brokenRoot?.remove(); } catch {}
    window.alert(
      "O Text Express foi carregado, mas não conseguiu iniciar nesta página.\\n" +
      "Detalhe: " + (error?.message || String(error))
    );
  }
}

delete window.__textExpressStandaloneSkipBundle;
`;

fs.writeFileSync(path.join(projectRoot, "bookmarklet.js"), output, "utf8");
console.log(`bookmarklet.js autossuficiente gerado para a versão ${version}.`);
