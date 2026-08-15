/* Text Express 28.0.6 — carregador autossuficiente */
(() => {
  "use strict";

  const documentRef = document;
  const targetVersion = "28.0.6";
  const currentScript = documentRef.currentScript;
  const baseUrl = currentScript?.src
    ? new URL("./", currentScript.src).href
    : "https://king-programador.github.io/text-express-v28/";

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
      && root.dataset?.version === targetVersion
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
    stylesheet.href = baseUrl + "styles.css?v=28.0.6";

    let inlineStyles = documentRef.getElementById("te-bookmarklet-inline-style");
    if (!inlineStyles) {
      inlineStyles = documentRef.createElement("style");
      inlineStyles.id = "te-bookmarklet-inline-style";
      (documentRef.head || documentRef.documentElement).appendChild(inlineStyles);
    }
    inlineStyles.textContent = "/* Text Express — estilos isolados por prefixo te- */\n.te-page {\n  margin: 0;\n  min-height: 100vh;\n  background: #eef3f8;\n  color: #172033;\n  font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif;\n}\n\n.te-demo-page {\n  min-height: 100vh;\n  box-sizing: border-box;\n  padding: 48px;\n  background:\n    radial-gradient(circle at 15% 10%, rgba(37, 99, 235, 0.12), transparent 34%),\n    linear-gradient(145deg, #f7f9fc, #e9eff7);\n}\n\n.te-demo-card {\n  width: min(640px, calc(100vw - 96px));\n  padding: 30px;\n  border: 1px solid #dce4ef;\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.88);\n  box-shadow: 0 24px 60px rgba(31, 45, 70, 0.12);\n  backdrop-filter: blur(10px);\n}\n\n.te-demo-eyebrow {\n  display: inline-flex;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: #e8f0ff;\n  color: #1d4ed8;\n  font-size: 12px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n\n.te-demo-card h1 {\n  margin: 16px 0 8px;\n  font-size: 38px;\n}\n\n.te-demo-card p {\n  margin: 0 0 22px;\n  color: #536079;\n  line-height: 1.6;\n}\n\n.te-demo-card label {\n  display: block;\n  margin: 18px 0 7px;\n  font-size: 13px;\n  font-weight: 700;\n}\n\n.te-demo-card textarea {\n  width: 100%;\n  box-sizing: border-box;\n  resize: vertical;\n  padding: 14px;\n  border: 1px solid #cbd6e5;\n  border-radius: 12px;\n  background: #fff;\n  color: #172033;\n  font: inherit;\n  line-height: 1.5;\n  outline: none;\n}\n\n.te-demo-card textarea:focus {\n  border-color: #2563eb;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);\n}\n\n#text-express-app,\n#text-express-app * {\n  box-sizing: border-box;\n}\n\n#text-express-app {\n  --te-primary: #2563eb;\n  --te-primary-strong: #174bc4;\n  --te-primary-soft: #eaf1ff;\n  --te-protocol: #7c3aed;\n  --te-protocol-soft: #f1eafe;\n  --te-favorite: #d99000;\n  --te-favorite-soft: #fff5d9;\n  --te-success: #16803d;\n  --te-danger: #d52b2b;\n  --te-danger-soft: #fff0f0;\n  --te-text: #172033;\n  --te-muted: #65728a;\n  --te-border: #dce3ed;\n  --te-surface: #ffffff;\n  --te-surface-2: #f7f9fc;\n  --te-surface-3: #eef3f8;\n  --te-header: #102443;\n  --te-shadow: 0 28px 75px rgba(15, 32, 61, 0.28);\n  --te-radius: 16px;\n  position: fixed;\n  z-index: 2147483000;\n  inset: 0;\n  pointer-events: none;\n  color: var(--te-text);\n  font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.4;\n}\n\n.te-dark #text-express-app,\n#text-express-app.te-dark {\n  --te-primary: #5b8cff;\n  --te-primary-strong: #7aa2ff;\n  --te-primary-soft: #172b52;\n  --te-protocol: #aa7cff;\n  --te-protocol-soft: #2b2046;\n  --te-favorite: #ffc340;\n  --te-favorite-soft: #3e3318;\n  --te-success: #48c977;\n  --te-danger: #ff6b6b;\n  --te-danger-soft: #3f2025;\n  --te-text: #edf3ff;\n  --te-muted: #a8b4c9;\n  --te-border: #33405a;\n  --te-surface: #192339;\n  --te-surface-2: #141d30;\n  --te-surface-3: #22304b;\n  --te-header: #0a162b;\n  --te-shadow: 0 28px 80px rgba(0, 0, 0, 0.48);\n}\n\n#text-express-app button,\n#text-express-app input,\n#text-express-app textarea,\n#text-express-app select {\n  font: inherit;\n}\n\n#text-express-app button {\n  cursor: pointer;\n}\n\n#text-express-app .te-hidden {\n  display: none !important;\n}\n\n#text-express-app .te-panel {\n  position: fixed;\n  right: 20px;\n  bottom: 20px;\n  display: flex;\n  flex-direction: column;\n  width: min(920px, calc(100vw - 32px));\n  height: min(690px, calc(100vh - 32px));\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--te-border) 82%, transparent);\n  border-radius: var(--te-radius);\n  background: var(--te-surface);\n  box-shadow: var(--te-shadow);\n  pointer-events: auto;\n}\n\n#text-express-app .te-panel.te-minimized {\n  width: min(520px, calc(100vw - 32px));\n  height: auto;\n}\n\n#text-express-app .te-panel.te-minimized .te-expandable {\n  display: none;\n}\n\n#text-express-app .te-header {\n  min-height: 62px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 0 16px 0 18px;\n  background: linear-gradient(135deg, var(--te-header), #15345f);\n  color: #fff;\n  user-select: none;\n  touch-action: none;\n}\n\n#text-express-app .te-header[data-te-drag-handle] {\n  cursor: move;\n}\n\n#text-express-app .te-brand {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n\n#text-express-app .te-brand-icon {\n  font-size: 26px;\n  filter: drop-shadow(0 2px 5px rgba(255, 193, 7, 0.35));\n}\n\n#text-express-app .te-brand strong {\n  display: block;\n  font-size: 19px;\n  letter-spacing: -0.02em;\n}\n\n#text-express-app .te-subtitle {\n  display: block;\n  margin-top: 1px;\n  color: rgba(255, 255, 255, 0.68);\n  font-size: 11px;\n}\n\n#text-express-app .te-header-actions {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n#text-express-app .te-count-badge {\n  display: inline-flex;\n  align-items: center;\n  min-height: 28px;\n  padding: 4px 10px;\n  margin-right: 4px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.09);\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n#text-express-app .te-icon-button {\n  width: 34px;\n  height: 34px;\n  display: inline-grid;\n  place-items: center;\n  padding: 0;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: inherit;\n  font-size: 22px;\n}\n\n#text-express-app .te-icon-button:hover,\n#text-express-app .te-icon-button:focus-visible {\n  background: rgba(255, 255, 255, 0.12);\n  outline: none;\n}\n\n#text-express-app .te-expandable {\n  min-height: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n#text-express-app .te-main-tabs {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  padding: 9px 12px;\n  border-bottom: 1px solid var(--te-border);\n  background: var(--te-surface);\n}\n\n#text-express-app .te-main-tab {\n  min-height: 40px;\n  border: 0;\n  border-radius: 9px;\n  background: var(--te-surface-2);\n  color: var(--te-muted);\n  font-weight: 750;\n  transition: 150ms ease;\n}\n\n#text-express-app .te-main-tab:hover {\n  background: var(--te-surface-3);\n  color: var(--te-text);\n}\n\n#text-express-app .te-main-tab.te-active[data-te-type=\"atendimento\"] {\n  background: linear-gradient(135deg, var(--te-primary), var(--te-primary-strong));\n  color: #fff;\n  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.22);\n}\n\n#text-express-app .te-main-tab.te-active[data-te-type=\"protocolo\"] {\n  background: linear-gradient(135deg, var(--te-protocol), #5b21b6);\n  color: #fff;\n  box-shadow: 0 6px 14px rgba(124, 58, 237, 0.22);\n}\n\n#text-express-app .te-main-tab.te-active[data-te-type=\"favoritos\"] {\n  background: linear-gradient(135deg, #f5b400, #d88800);\n  color: #fff;\n  box-shadow: 0 6px 14px rgba(217, 144, 0, 0.22);\n}\n\n#text-express-app .te-toolbar {\n  display: flex;\n  gap: 10px;\n  padding: 10px 12px 8px;\n  background: var(--te-surface);\n}\n\n#text-express-app .te-search-box {\n  min-width: 0;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 40px;\n  padding: 0 12px;\n  border: 1px solid var(--te-border);\n  border-radius: 10px;\n  background: var(--te-surface-2);\n  color: var(--te-muted);\n}\n\n#text-express-app .te-search-box:focus-within {\n  border-color: var(--te-primary);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--te-primary) 16%, transparent);\n}\n\n#text-express-app .te-search-box input {\n  min-width: 0;\n  flex: 1;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: var(--te-text);\n}\n\n#text-express-app .te-search-box input::placeholder,\n#text-express-app input::placeholder,\n#text-express-app textarea::placeholder {\n  color: color-mix(in srgb, var(--te-muted) 78%, transparent);\n}\n\n#text-express-app .te-primary-button,\n#text-express-app .te-secondary-button,\n#text-express-app .te-danger-button,\n#text-express-app .te-inline-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  min-height: 38px;\n  padding: 8px 14px;\n  border-radius: 9px;\n  font-weight: 750;\n  white-space: nowrap;\n  transition: 140ms ease;\n}\n\n#text-express-app .te-primary-button {\n  border: 1px solid var(--te-primary);\n  background: var(--te-primary);\n  color: #fff;\n  box-shadow: 0 4px 10px color-mix(in srgb, var(--te-primary) 25%, transparent);\n}\n\n#text-express-app .te-primary-button:hover {\n  background: var(--te-primary-strong);\n  border-color: var(--te-primary-strong);\n  transform: translateY(-1px);\n}\n\n#text-express-app .te-secondary-button {\n  border: 1px solid var(--te-border);\n  background: var(--te-surface);\n  color: var(--te-text);\n}\n\n#text-express-app .te-secondary-button:hover {\n  border-color: color-mix(in srgb, var(--te-primary) 45%, var(--te-border));\n  background: var(--te-primary-soft);\n  color: var(--te-primary);\n}\n\n#text-express-app .te-danger-button {\n  border: 1px solid color-mix(in srgb, var(--te-danger) 38%, var(--te-border));\n  background: var(--te-danger-soft);\n  color: var(--te-danger);\n}\n\n#text-express-app .te-danger-button:hover {\n  border-color: var(--te-danger);\n}\n\n#text-express-app .te-inline-button {\n  min-height: 34px;\n  padding: 6px 10px;\n  border: 1px solid var(--te-border);\n  background: var(--te-surface-2);\n  color: var(--te-primary);\n  font-size: 12px;\n}\n\n#text-express-app .te-category-bar {\n  display: flex;\n  gap: 7px;\n  padding: 0 12px 9px;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  border-bottom: 1px solid var(--te-border);\n  background: var(--te-surface);\n}\n\n#text-express-app .te-category-button {\n  min-height: 31px;\n  padding: 5px 11px;\n  border: 1px solid var(--te-border);\n  border-radius: 999px;\n  background: var(--te-surface);\n  color: var(--te-muted);\n  font-size: 12px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n#text-express-app .te-category-button:hover,\n#text-express-app .te-category-button.te-active {\n  border-color: var(--te-primary);\n  background: var(--te-primary);\n  color: #fff;\n}\n\n#text-express-app .te-content-area {\n  min-height: 0;\n  flex: 1;\n  display: grid;\n  grid-template-columns: minmax(330px, 43%) 1fr;\n  background: var(--te-surface-2);\n}\n\n#text-express-app .te-list-pane {\n  position: relative;\n  min-width: 0;\n  min-height: 0;\n  border-right: 1px solid var(--te-border);\n  background: var(--te-surface-2);\n}\n\n#text-express-app .te-list {\n  height: 100%;\n  overflow-y: auto;\n  padding: 8px;\n  scrollbar-width: thin;\n}\n\n#text-express-app .te-snippet-card {\n  position: relative;\n  display: grid;\n  grid-template-columns: 34px minmax(0, 1fr) auto;\n  gap: 9px;\n  padding: 12px 10px;\n  margin-bottom: 7px;\n  border: 1px solid var(--te-border);\n  border-radius: 11px;\n  background: var(--te-surface);\n  transition: 140ms ease;\n}\n\n#text-express-app .te-snippet-card:hover,\n#text-express-app .te-snippet-card.te-selected {\n  border-color: color-mix(in srgb, var(--te-primary) 70%, var(--te-border));\n  box-shadow: 0 7px 18px rgba(19, 39, 73, 0.09);\n}\n\n#text-express-app .te-snippet-card.te-selected {\n  background: color-mix(in srgb, var(--te-primary-soft) 65%, var(--te-surface));\n}\n\n#text-express-app .te-card-icon {\n  width: 34px;\n  height: 34px;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  background: var(--te-primary-soft);\n  color: var(--te-primary);\n  font-size: 16px;\n}\n\n#text-express-app .te-snippet-card[data-te-snippet-type=\"protocolo\"] .te-card-icon {\n  background: var(--te-protocol-soft);\n  color: var(--te-protocol);\n}\n\n#text-express-app .te-card-main {\n  min-width: 0;\n}\n\n#text-express-app .te-card-title-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 7px;\n}\n\n#text-express-app .te-card-title {\n  overflow: hidden;\n  color: var(--te-text);\n  font-weight: 800;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#text-express-app .te-category-tag {\n  display: inline-flex;\n  max-width: 145px;\n  padding: 3px 7px;\n  overflow: hidden;\n  border-radius: 999px;\n  background: var(--te-primary-soft);\n  color: var(--te-primary);\n  font-size: 10px;\n  font-weight: 750;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#text-express-app [data-te-snippet-type=\"protocolo\"] .te-category-tag,\n#text-express-app .te-detail-pane[data-te-snippet-type=\"protocolo\"] .te-category-tag {\n  background: var(--te-protocol-soft);\n  color: var(--te-protocol);\n}\n\n#text-express-app .te-shortcut-line {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-top: 3px;\n  color: var(--te-muted);\n  font-size: 11px;\n}\n\n#text-express-app .te-shortcut-line code,\n#text-express-app .te-detail-shortcut,\n#text-express-app code {\n  font-family: \"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace;\n}\n\n#text-express-app .te-card-excerpt {\n  display: -webkit-box;\n  margin: 7px 0 8px;\n  overflow: hidden;\n  color: var(--te-text);\n  font-size: 12px;\n  line-height: 1.45;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n\n#text-express-app .te-card-actions {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n\n#text-express-app .te-text-button {\n  min-height: 28px;\n  padding: 4px 7px;\n  border: 0;\n  border-radius: 7px;\n  background: transparent;\n  color: var(--te-muted);\n  font-size: 11px;\n  font-weight: 700;\n}\n\n#text-express-app .te-text-button:hover {\n  background: var(--te-surface-3);\n  color: var(--te-text);\n}\n\n#text-express-app .te-text-button.te-delete:hover {\n  background: var(--te-danger-soft);\n  color: var(--te-danger);\n}\n\n#text-express-app .te-card-insert {\n  margin-left: auto;\n  border: 1px solid color-mix(in srgb, var(--te-primary) 45%, var(--te-border));\n  color: var(--te-primary);\n}\n\n#text-express-app .te-favorite-button {\n  width: 28px;\n  height: 28px;\n  display: grid;\n  place-items: center;\n  padding: 0;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: #aab4c4;\n  font-size: 18px;\n}\n\n#text-express-app .te-favorite-button:hover,\n#text-express-app .te-favorite-button.te-active {\n  background: var(--te-favorite-soft);\n  color: var(--te-favorite);\n}\n\n#text-express-app .te-detail-pane {\n  min-width: 0;\n  overflow-y: auto;\n  padding: 18px;\n  background: var(--te-surface);\n  scrollbar-width: thin;\n}\n\n#text-express-app .te-detail-empty,\n#text-express-app .te-empty-state {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 24px;\n  color: var(--te-muted);\n  text-align: center;\n}\n\n#text-express-app .te-detail-empty > span,\n#text-express-app .te-empty-state > span {\n  font-size: 34px;\n}\n\n#text-express-app .te-detail-empty strong,\n#text-express-app .te-empty-state strong {\n  color: var(--te-text);\n  font-size: 16px;\n}\n\n#text-express-app .te-detail-empty p,\n#text-express-app .te-empty-state p {\n  max-width: 310px;\n  margin: 0;\n}\n\n#text-express-app .te-detail-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 14px;\n  padding-bottom: 14px;\n  border-bottom: 1px solid var(--te-border);\n}\n\n#text-express-app .te-detail-header h2 {\n  margin: 0 0 7px;\n  color: var(--te-text);\n  font-size: 20px;\n  line-height: 1.25;\n}\n\n#text-express-app .te-detail-meta {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 7px;\n}\n\n#text-express-app .te-detail-shortcut {\n  padding: 3px 7px;\n  border-radius: 7px;\n  background: var(--te-surface-3);\n  color: var(--te-text);\n  font-size: 11px;\n}\n\n#text-express-app .te-detail-section {\n  margin-top: 17px;\n}\n\n#text-express-app .te-detail-section > strong {\n  display: block;\n  margin-bottom: 8px;\n  color: var(--te-text);\n}\n\n#text-express-app .te-content-preview {\n  min-height: 130px;\n  padding: 14px;\n  border: 1px solid var(--te-border);\n  border-radius: 10px;\n  background: var(--te-surface-2);\n  color: var(--te-text);\n  line-height: 1.55;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n\n#text-express-app .te-variable-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  min-height: 24px;\n  align-items: center;\n}\n\n#text-express-app .te-variable-tag {\n  display: inline-flex;\n  padding: 3px 8px;\n  border-radius: 999px;\n  background: var(--te-primary-soft);\n  color: var(--te-primary);\n  font-size: 11px;\n  font-weight: 750;\n}\n\n#text-express-app .te-muted {\n  color: var(--te-muted);\n  font-size: 12px;\n}\n\n#text-express-app .te-how-to {\n  padding: 12px;\n  border: 1px solid color-mix(in srgb, var(--te-primary) 30%, var(--te-border));\n  border-radius: 10px;\n  background: var(--te-primary-soft);\n  color: var(--te-text);\n  font-size: 12px;\n  line-height: 1.55;\n}\n\n#text-express-app .te-how-to strong {\n  color: var(--te-primary);\n}\n\n#text-express-app .te-detail-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 17px;\n}\n\n#text-express-app .te-footer {\n  min-height: 58px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 9px 12px;\n  border-top: 1px solid var(--te-border);\n  background: var(--te-surface);\n}\n\n#text-express-app .te-status {\n  color: var(--te-muted);\n  font-size: 11px;\n  white-space: nowrap;\n}\n\n#text-express-app .te-footer-actions {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n#text-express-app .te-footer-actions button {\n  min-height: 34px;\n  padding: 6px 9px;\n  font-size: 11px;\n}\n\n#text-express-app .te-reopen-button {\n  position: fixed;\n  right: 22px;\n  bottom: 22px;\n  width: 58px;\n  height: 58px;\n  display: grid;\n  place-items: center;\n  padding: 0;\n  border: 0;\n  border-radius: 50%;\n  background: linear-gradient(145deg, #2563eb, #7c3aed);\n  color: #fff;\n  box-shadow: 0 16px 36px rgba(37, 99, 235, 0.42);\n  pointer-events: auto;\n  font-size: 26px;\n  transition: 160ms ease;\n}\n\n#text-express-app .te-reopen-button:hover {\n  transform: translateY(-3px) scale(1.03);\n}\n\n#text-express-app .te-modal-backdrop {\n  position: fixed;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  padding: 18px;\n  background: rgba(7, 18, 35, 0.58);\n  backdrop-filter: blur(4px);\n  pointer-events: auto;\n}\n\n#text-express-app .te-modal {\n  width: min(620px, calc(100vw - 32px));\n  max-height: min(760px, calc(100vh - 32px));\n  overflow-y: auto;\n  border: 1px solid var(--te-border);\n  border-radius: 15px;\n  background: var(--te-surface);\n  color: var(--te-text);\n  box-shadow: 0 30px 85px rgba(0, 0, 0, 0.34);\n  scrollbar-width: thin;\n}\n\n#text-express-app .te-variable-modal {\n  width: min(520px, calc(100vw - 32px));\n}\n\n#text-express-app .te-settings-modal {\n  width: min(560px, calc(100vw - 32px));\n}\n\n#text-express-app .te-modal-header {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 16px 18px;\n  border-bottom: 1px solid var(--te-border);\n  background: color-mix(in srgb, var(--te-surface) 94%, transparent);\n  backdrop-filter: blur(8px);\n}\n\n#text-express-app .te-modal-header .te-icon-button:hover {\n  background: var(--te-surface-3);\n}\n\n#text-express-app .te-modal-kicker {\n  display: block;\n  margin-bottom: 2px;\n  color: var(--te-primary);\n  font-size: 11px;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n#text-express-app .te-modal-header h2 {\n  margin: 0;\n  font-size: 20px;\n}\n\n#text-express-app .te-modal form {\n  padding: 18px;\n}\n\n#text-express-app .te-type-selector {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 8px;\n  margin: 0 0 17px;\n  padding: 0;\n  border: 0;\n}\n\n#text-express-app .te-type-selector legend {\n  grid-column: 1 / -1;\n  margin-bottom: 7px;\n  color: var(--te-text);\n  font-size: 12px;\n  font-weight: 750;\n}\n\n#text-express-app .te-type-selector label {\n  position: relative;\n}\n\n#text-express-app .te-type-selector input {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n\n#text-express-app .te-type-selector span {\n  min-height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid var(--te-border);\n  border-radius: 9px;\n  background: var(--te-surface-2);\n  color: var(--te-muted);\n  font-weight: 750;\n  cursor: pointer;\n}\n\n#text-express-app .te-type-selector input[value=\"atendimento\"]:checked + span {\n  border-color: var(--te-primary);\n  background: var(--te-primary-soft);\n  color: var(--te-primary);\n}\n\n#text-express-app .te-type-selector input[value=\"protocolo\"]:checked + span {\n  border-color: var(--te-protocol);\n  background: var(--te-protocol-soft);\n  color: var(--te-protocol);\n}\n\n#text-express-app .te-form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 14px;\n}\n\n#text-express-app .te-field {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n#text-express-app .te-field-wide {\n  grid-column: 1 / -1;\n}\n\n#text-express-app .te-field > span,\n#text-express-app .te-field > label {\n  color: var(--te-text);\n  font-size: 12px;\n  font-weight: 750;\n}\n\n#text-express-app .te-field input,\n#text-express-app .te-field select,\n#text-express-app .te-field textarea,\n#text-express-app .te-variable-fields input {\n  width: 100%;\n  border: 1px solid var(--te-border);\n  border-radius: 9px;\n  background: var(--te-surface-2);\n  color: var(--te-text);\n  outline: none;\n}\n\n#text-express-app .te-field input,\n#text-express-app .te-field select,\n#text-express-app .te-variable-fields input {\n  height: 40px;\n  padding: 0 11px;\n}\n\n#text-express-app .te-field textarea {\n  min-height: 150px;\n  padding: 11px;\n  resize: vertical;\n  line-height: 1.5;\n}\n\n#text-express-app .te-field input:focus,\n#text-express-app .te-field select:focus,\n#text-express-app .te-field textarea:focus,\n#text-express-app .te-variable-fields input:focus {\n  border-color: var(--te-primary);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--te-primary) 15%, transparent);\n}\n\n#text-express-app .te-field small {\n  color: var(--te-muted);\n  font-size: 10px;\n  line-height: 1.4;\n}\n\n#text-express-app .te-field-error {\n  min-height: 0;\n  color: var(--te-danger) !important;\n  font-weight: 700;\n}\n\n#text-express-app .te-input-with-action {\n  display: flex;\n  gap: 7px;\n}\n\n#text-express-app .te-input-with-action input {\n  min-width: 0;\n  flex: 1;\n}\n\n#text-express-app .te-check-field {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--te-text);\n  font-size: 12px;\n  font-weight: 700;\n}\n\n#text-express-app .te-check-field input,\n#text-express-app .te-setting-row input {\n  width: 18px;\n  height: 18px;\n  accent-color: var(--te-primary);\n}\n\n#text-express-app .te-modal-footer {\n  position: sticky;\n  bottom: -18px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 8px;\n  margin: 20px -18px -18px;\n  padding: 13px 18px;\n  border-top: 1px solid var(--te-border);\n  background: color-mix(in srgb, var(--te-surface) 95%, transparent);\n  backdrop-filter: blur(8px);\n}\n\n#text-express-app .te-variable-help {\n  margin: 0 0 14px;\n  color: var(--te-muted);\n  font-size: 12px;\n}\n\n#text-express-app .te-variable-fields {\n  display: grid;\n  gap: 11px;\n}\n\n#text-express-app .te-variable-fields label {\n  display: grid;\n  gap: 6px;\n  color: var(--te-text);\n  font-size: 12px;\n  font-weight: 750;\n}\n\n#text-express-app .te-settings-list {\n  display: grid;\n  gap: 4px;\n}\n\n#text-express-app .te-setting-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 18px;\n  padding: 13px 0;\n  border-bottom: 1px solid var(--te-border);\n}\n\n#text-express-app .te-setting-row span {\n  display: grid;\n  gap: 3px;\n}\n\n#text-express-app .te-setting-row strong {\n  font-size: 13px;\n}\n\n#text-express-app .te-setting-row small {\n  color: var(--te-muted);\n  font-size: 11px;\n}\n\n#text-express-app .te-keyboard-help {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  margin-top: 16px;\n  padding: 12px;\n  border-radius: 10px;\n  background: var(--te-surface-2);\n  color: var(--te-muted);\n  font-size: 11px;\n}\n\n#text-express-app .te-keyboard-help strong {\n  color: var(--te-text);\n}\n\n#text-express-app kbd {\n  display: inline-flex;\n  min-width: 24px;\n  min-height: 22px;\n  align-items: center;\n  justify-content: center;\n  padding: 2px 6px;\n  border: 1px solid var(--te-border);\n  border-bottom-width: 2px;\n  border-radius: 5px;\n  background: var(--te-surface);\n  color: var(--te-text);\n  font: 700 10px \"SFMono-Regular\", Consolas, monospace;\n}\n\n#text-express-app .te-toast-stack {\n  position: fixed;\n  top: 18px;\n  left: 50%;\n  z-index: 2147483646;\n  display: grid;\n  gap: 8px;\n  width: min(430px, calc(100vw - 32px));\n  transform: translateX(-50%);\n  pointer-events: none;\n}\n\n#text-express-app .te-toast {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  padding: 12px 14px;\n  border: 1px solid var(--te-border);\n  border-left: 4px solid var(--te-primary);\n  border-radius: 10px;\n  background: var(--te-surface);\n  color: var(--te-text);\n  box-shadow: 0 15px 38px rgba(9, 23, 47, 0.2);\n  animation: te-toast-in 180ms ease-out both;\n}\n\n#text-express-app .te-toast.te-success {\n  border-left-color: var(--te-success);\n}\n\n#text-express-app .te-toast.te-error {\n  border-left-color: var(--te-danger);\n}\n\n#text-express-app .te-toast.te-leaving {\n  animation: te-toast-out 180ms ease-in both;\n}\n\n@keyframes te-toast-in {\n  from { opacity: 0; transform: translateY(-10px) scale(0.98); }\n  to { opacity: 1; transform: translateY(0) scale(1); }\n}\n\n@keyframes te-toast-out {\n  from { opacity: 1; transform: translateY(0); }\n  to { opacity: 0; transform: translateY(-8px); }\n}\n\n@media (max-width: 820px) {\n  #text-express-app .te-panel {\n    right: 8px;\n    bottom: 8px;\n    width: calc(100vw - 16px);\n    height: calc(100vh - 16px);\n  }\n\n  #text-express-app .te-content-area {\n    grid-template-columns: 1fr;\n  }\n\n  #text-express-app .te-detail-pane {\n    display: none;\n  }\n\n  #text-express-app .te-list-pane {\n    border-right: 0;\n  }\n\n  #text-express-app .te-status {\n    display: none;\n  }\n\n  #text-express-app .te-footer {\n    justify-content: center;\n  }\n\n  #text-express-app .te-footer-actions {\n    width: 100%;\n    overflow-x: auto;\n  }\n}\n\n@media (max-width: 560px) {\n  .te-demo-page {\n    padding: 20px;\n  }\n\n  .te-demo-card {\n    width: 100%;\n    padding: 20px;\n  }\n\n  #text-express-app .te-subtitle,\n  #text-express-app .te-count-badge {\n    display: none;\n  }\n\n  #text-express-app .te-main-tabs {\n    gap: 4px;\n    padding: 7px;\n  }\n\n  #text-express-app .te-main-tab {\n    font-size: 11px;\n  }\n\n  #text-express-app .te-toolbar {\n    padding: 8px;\n  }\n\n  #text-express-app .te-primary-button {\n    padding-inline: 10px;\n  }\n\n  #text-express-app .te-form-grid {\n    grid-template-columns: 1fr;\n  }\n\n  #text-express-app .te-field-wide {\n    grid-column: auto;\n  }\n\n  #text-express-app .te-modal-backdrop {\n    padding: 8px;\n  }\n\n  #text-express-app .te-modal {\n    width: calc(100vw - 16px);\n    max-height: calc(100vh - 16px);\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  #text-express-app *,\n  #text-express-app *::before,\n  #text-express-app *::after {\n    scroll-behavior: auto !important;\n    animation-duration: 0.001ms !important;\n    transition-duration: 0.001ms !important;\n  }\n}\n\n\n/* ===== Text Express 2.0 — interface com ícones e categorias personalizáveis ===== */\n#text-express-app .te-icon-sprite { position:absolute; width:0; height:0; overflow:hidden; pointer-events:none; }\n#text-express-app .te-icon { width:1.05em; height:1.05em; flex:0 0 auto; fill:none; stroke:currentColor; stroke-width:1.9; stroke-linecap:round; stroke-linejoin:round; vertical-align:-0.15em; }\n#text-express-app { --te-ring:0 0 0 3px color-mix(in srgb,var(--te-primary) 18%,transparent); --te-card-shadow:0 8px 26px rgba(15,32,61,.08); }\n#text-express-app .te-panel { border-radius:22px; border-color:color-mix(in srgb,var(--te-border) 78%,transparent); box-shadow:0 34px 100px rgba(15,32,61,.34); }\n#text-express-app .te-header { min-height:66px; padding-inline:20px 14px; background:linear-gradient(120deg,#08172c 0%,#102d55 58%,#17447a 100%); }\n#text-express-app .te-brand-icon { display:grid; place-items:center; width:38px; height:38px; border-radius:12px; color:#ffe047; background:rgba(255,255,255,.09); box-shadow:inset 0 0 0 1px rgba(255,255,255,.1); }\n#text-express-app .te-brand-icon .te-icon { width:23px; height:23px; stroke-width:2.2; }\n#text-express-app .te-icon-button { display:grid; place-items:center; }\n#text-express-app .te-icon-button .te-icon { width:18px; height:18px; }\n#text-express-app .te-main-tabs { padding:10px 12px 8px; gap:8px; background:linear-gradient(180deg,var(--te-surface),var(--te-surface-2)); }\n#text-express-app .te-main-tab { min-height:42px; border-radius:12px; gap:8px; font-weight:760; }\n#text-express-app .te-main-tab .te-icon { width:18px; height:18px; }\n#text-express-app .te-toolbar { padding:10px 12px 8px; gap:10px; }\n#text-express-app .te-search-box { height:43px; border-radius:13px; padding-inline:13px; box-shadow:inset 0 1px 0 rgba(255,255,255,.35); }\n#text-express-app .te-search-box .te-icon { color:var(--te-muted); width:18px; height:18px; }\n#text-express-app .te-search-box:focus-within { box-shadow:var(--te-ring); }\n#text-express-app .te-primary-button,#text-express-app .te-secondary-button,#text-express-app .te-danger-button,#text-express-app .te-text-button { display:inline-flex; align-items:center; justify-content:center; gap:7px; }\n#text-express-app .te-primary-button { box-shadow:0 8px 18px color-mix(in srgb,var(--te-primary) 25%,transparent); }\n#text-express-app .te-primary-button:hover { transform:translateY(-1px); }\n#text-express-app .te-category-bar { display:flex; align-items:center; gap:7px; min-height:48px; padding:5px 12px 9px; overflow-x:auto; overflow-y:hidden; scrollbar-width:thin; border-bottom:1px solid var(--te-border); background:var(--te-surface); }\n#text-express-app .te-category-chip { --te-category-color:var(--te-primary); display:flex; align-items:center; flex:0 0 auto; border:1px solid color-mix(in srgb,var(--te-category-color) 28%,var(--te-border)); border-radius:999px; background:color-mix(in srgb,var(--te-category-color) 5%,var(--te-surface)); overflow:hidden; transition:.18s ease; }\n#text-express-app .te-category-chip:hover { transform:translateY(-1px); border-color:color-mix(in srgb,var(--te-category-color) 60%,var(--te-border)); box-shadow:0 5px 13px color-mix(in srgb,var(--te-category-color) 14%,transparent); }\n#text-express-app .te-category-chip.te-active { color:#fff; border-color:var(--te-category-color); background:linear-gradient(135deg,var(--te-category-color),color-mix(in srgb,var(--te-category-color) 72%,#111827)); box-shadow:0 6px 16px color-mix(in srgb,var(--te-category-color) 27%,transparent); }\n#text-express-app .te-category-button { display:inline-flex; align-items:center; gap:7px; height:34px; padding:0 10px 0 11px; color:inherit; border:0; border-radius:999px; background:transparent; white-space:nowrap; font-size:12px; font-weight:730; }\n#text-express-app .te-category-button .te-icon { width:15px; height:15px; color:var(--te-category-color); }\n#text-express-app .te-category-chip.te-active .te-category-button .te-icon { color:#fff; }\n#text-express-app .te-category-count { display:inline-grid; place-items:center; min-width:20px; height:20px; padding:0 5px; border-radius:999px; color:color-mix(in srgb,var(--te-category-color) 80%,#111); background:color-mix(in srgb,var(--te-category-color) 13%,var(--te-surface)); font-size:10px; font-weight:800; }\n#text-express-app .te-category-chip.te-active .te-category-count { color:#fff; background:rgba(255,255,255,.18); }\n#text-express-app .te-category-edit { display:grid; place-items:center; width:0; height:28px; padding:0; opacity:0; border:0; color:inherit; background:transparent; transition:.18s ease; }\n#text-express-app .te-category-chip:hover .te-category-edit,#text-express-app .te-category-chip:focus-within .te-category-edit { width:28px; opacity:.72; margin-right:3px; }\n#text-express-app .te-category-edit:hover { opacity:1 !important; border-radius:50%; background:rgba(127,127,127,.13); }\n#text-express-app .te-category-edit .te-icon { width:13px; height:13px; }\n#text-express-app .te-category-add-button { display:inline-flex; align-items:center; gap:6px; flex:0 0 auto; height:34px; padding:0 12px; border:1px dashed color-mix(in srgb,var(--te-primary) 58%,var(--te-border)); border-radius:999px; color:var(--te-primary); background:var(--te-primary-soft); font-size:12px; font-weight:760; }\n#text-express-app .te-category-add-button:hover { border-style:solid; transform:translateY(-1px); }\n#text-express-app .te-snippet-card { border-radius:15px; border-left:3px solid color-mix(in srgb,var(--te-card-accent) 70%,transparent); box-shadow:0 1px 0 rgba(20,35,60,.03); transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease; }\n#text-express-app .te-snippet-card:hover,#text-express-app .te-snippet-card.te-selected { transform:translateY(-1px); box-shadow:var(--te-card-shadow); }\n#text-express-app .te-card-icon { display:grid; place-items:center; width:36px; height:36px; border-radius:12px; color:var(--te-category-color); background:color-mix(in srgb,var(--te-category-color) 12%,var(--te-surface)); }\n#text-express-app .te-card-icon .te-icon { width:19px; height:19px; }\n#text-express-app .te-category-tag { display:inline-flex; align-items:center; gap:5px; color:var(--te-category-color); background:color-mix(in srgb,var(--te-category-color) 11%,var(--te-surface)); border:1px solid color-mix(in srgb,var(--te-category-color) 20%,transparent); }\n#text-express-app .te-category-tag .te-icon { width:12px; height:12px; }\n#text-express-app .te-shortcut-line span { display:inline-flex; align-items:center; gap:4px; }\n#text-express-app .te-shortcut-line .te-icon { width:12px; height:12px; }\n#text-express-app .te-text-button .te-icon { width:14px; height:14px; }\n#text-express-app .te-favorite-button { display:grid; place-items:center; }\n#text-express-app .te-favorite-button .te-icon { width:17px; height:17px; }\n#text-express-app .te-favorite-button.te-active .te-icon { fill:currentColor; }\n#text-express-app .te-detail-title-wrap { display:flex; align-items:flex-start; gap:12px; min-width:0; }\n#text-express-app .te-detail-category-icon { display:grid; place-items:center; flex:0 0 auto; width:42px; height:42px; border-radius:14px; color:var(--te-category-color); background:color-mix(in srgb,var(--te-category-color) 12%,var(--te-surface)); }\n#text-express-app .te-detail-category-icon .te-icon { width:22px; height:22px; }\n#text-express-app .te-detail-section>strong { display:inline-flex; align-items:center; gap:7px; }\n#text-express-app .te-detail-section>strong .te-icon { width:15px; height:15px; color:var(--te-detail-accent,var(--te-primary)); }\n#text-express-app .te-variable-tag { display:inline-flex; align-items:center; gap:5px; }\n#text-express-app .te-variable-tag .te-icon { width:12px; height:12px; }\n#text-express-app .te-footer { background:linear-gradient(180deg,var(--te-surface),var(--te-surface-2)); }\n#text-express-app .te-footer-actions .te-icon { width:14px; height:14px; }\n#text-express-app .te-inline-icon-button { display:grid; place-items:center; flex:0 0 auto; width:42px; border:1px solid var(--te-border); border-radius:10px; color:var(--te-primary); background:var(--te-primary-soft); }\n#text-express-app .te-inline-icon-button:hover { border-color:var(--te-primary); }\n#text-express-app .te-category-select-row select { min-width:0; flex:1; }\n#text-express-app .te-category-modal { width:min(650px,calc(100vw - 32px)); }\n#text-express-app .te-modal-heading-with-icon { display:flex; align-items:center; gap:11px; }\n#text-express-app .te-modal-heading-icon { display:grid; place-items:center; width:40px; height:40px; border-radius:13px; color:var(--te-primary); background:var(--te-primary-soft); }\n#text-express-app .te-modal-heading-icon .te-icon { width:21px; height:21px; }\n#text-express-app .te-category-type-selector span { display:inline-flex !important; align-items:center; gap:7px; }\n#text-express-app .te-icon-choice-grid { display:grid; grid-template-columns:repeat(11,minmax(34px,1fr)); gap:7px; }\n#text-express-app .te-icon-choice { display:grid; place-items:center; aspect-ratio:1; min-height:37px; padding:0; border:1px solid var(--te-border); border-radius:10px; color:var(--te-muted); background:var(--te-surface-2); }\n#text-express-app .te-icon-choice:hover,#text-express-app .te-icon-choice.te-active { color:var(--te-primary); border-color:var(--te-primary); background:var(--te-primary-soft); box-shadow:var(--te-ring); }\n#text-express-app .te-icon-choice .te-icon { width:18px; height:18px; }\n#text-express-app .te-color-picker-row { display:flex; align-items:center; gap:10px; }\n#text-express-app #te-category-form-color { width:46px; height:42px; padding:3px; border:1px solid var(--te-border); border-radius:10px; background:var(--te-surface); cursor:pointer; }\n#text-express-app .te-color-choice-grid { display:flex; flex-wrap:wrap; gap:6px; }\n#text-express-app .te-color-choice { display:grid; place-items:center; width:25px; height:25px; padding:0; border:2px solid transparent; border-radius:50%; background:transparent; }\n#text-express-app .te-color-choice span { width:17px; height:17px; border-radius:50%; background:var(--te-choice-color); box-shadow:inset 0 0 0 1px rgba(0,0,0,.1); }\n#text-express-app .te-color-choice:hover,#text-express-app .te-color-choice.te-active { border-color:var(--te-choice-color); transform:scale(1.08); }\n#text-express-app .te-category-preview { --te-category-color:var(--te-primary); display:inline-flex; align-items:center; gap:7px; min-height:36px; padding:0 11px; border:1px solid color-mix(in srgb,var(--te-category-color) 30%,var(--te-border)); border-radius:999px; color:var(--te-category-color); background:color-mix(in srgb,var(--te-category-color) 9%,var(--te-surface)); font-size:12px; font-weight:750; }\n#text-express-app .te-category-preview .te-icon { width:15px; height:15px; }\n#text-express-app .te-category-order-actions { display:flex; gap:8px; padding:0 22px 16px; }\n#text-express-app .te-category-modal-footer { flex-wrap:wrap; }\n#text-express-app .te-modal-footer-spacer { flex:1; }\n#text-express-app .te-toast { display:flex; align-items:center; gap:9px; }\n#text-express-app .te-toast .te-icon { width:18px; height:18px; }\n#text-express-app .te-detail-empty>.te-icon,#text-express-app .te-empty-state>.te-icon { width:30px; height:30px; color:var(--te-primary); }\n@media (max-width:760px) { #text-express-app .te-icon-choice-grid { grid-template-columns:repeat(7,1fr); } #text-express-app .te-category-edit { width:26px; opacity:.75; margin-right:3px; } }\n\n/* Ajustes finais de especificidade da interface 2.0 */\n#text-express-app .te-category-chip .te-category-button:hover { border-color:transparent; background:transparent; color:inherit; }\n#text-express-app .te-snippet-card[data-te-snippet-type=\"protocolo\"] .te-card-icon { color:var(--te-category-color); background:color-mix(in srgb,var(--te-category-color) 12%,var(--te-surface)); }\n#text-express-app [data-te-snippet-type=\"protocolo\"] .te-category-tag,\n#text-express-app .te-detail-pane[data-te-snippet-type=\"protocolo\"] .te-category-tag { color:var(--te-category-color); background:color-mix(in srgb,var(--te-category-color) 11%,var(--te-surface)); }\n#text-express-app .te-inline-button .te-icon { width:13px; height:13px; }\n#text-express-app .te-modal-footer .te-icon { width:15px; height:15px; }\n\n/* ===== Text Express 3.0 — launcher compacto ===== */\n\n/* O estado minimizado antigo deixa de exibir uma faixa horizontal. */\n#text-express-app .te-panel.te-minimized {\n  display: none !important;\n}\n\n/* Launcher pequeno, discreto e sempre acima do sistema aberto. */\n#text-express-app .te-reopen-button {\n  right: 16px;\n  bottom: 16px;\n  width: 44px;\n  height: 44px;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 14px;\n  background: linear-gradient(145deg, #1d4ed8, #6d28d9);\n  box-shadow:\n    0 10px 24px rgba(37, 99, 235, 0.3),\n    0 2px 6px rgba(15, 23, 42, 0.22);\n  font-size: 21px;\n  isolation: isolate;\n}\n\n#text-express-app .te-reopen-button .te-icon {\n  width: 23px;\n  height: 23px;\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.18));\n}\n\n#text-express-app .te-reopen-button:hover {\n  transform: translateY(-2px) scale(1.04);\n  box-shadow:\n    0 14px 30px rgba(37, 99, 235, 0.38),\n    0 3px 8px rgba(15, 23, 42, 0.24);\n}\n\n#text-express-app .te-reopen-button:active {\n  transform: translateY(0) scale(0.97);\n}\n\n#text-express-app .te-reopen-button:focus-visible {\n  outline: 3px solid color-mix(in srgb, #60a5fa 55%, transparent);\n  outline-offset: 3px;\n}\n\n/* Tooltip só aparece quando o usuário passa o mouse. */\n#text-express-app .te-launcher-label {\n  position: absolute;\n  right: calc(100% + 10px);\n  top: 50%;\n  z-index: -1;\n  width: max-content;\n  max-width: 180px;\n  padding: 7px 10px;\n  border: 1px solid color-mix(in srgb, var(--te-border) 78%, transparent);\n  border-radius: 9px;\n  background: var(--te-surface);\n  color: var(--te-text);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 1;\n  opacity: 0;\n  pointer-events: none;\n  transform: translate(8px, -50%);\n  transition: opacity 140ms ease, transform 140ms ease;\n  white-space: nowrap;\n}\n\n#text-express-app .te-reopen-button:hover .te-launcher-label,\n#text-express-app .te-reopen-button:focus-visible .te-launcher-label {\n  z-index: 1;\n  opacity: 1;\n  transform: translate(0, -50%);\n}\n\n/* Cabeçalho do painel aberto mais compacto. */\n#text-express-app .te-header {\n  min-height: 54px;\n  padding: 0 11px 0 14px;\n  gap: 10px;\n}\n\n#text-express-app .te-brand {\n  gap: 8px;\n}\n\n#text-express-app .te-brand-icon {\n  display: grid;\n  place-items: center;\n  width: 34px;\n  height: 34px;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, 0.09);\n  font-size: 19px;\n}\n\n#text-express-app .te-brand strong {\n  font-size: 16px;\n}\n\n#text-express-app .te-subtitle {\n  display: none;\n}\n\n#text-express-app .te-count-badge {\n  min-height: 24px;\n  padding: 3px 8px;\n  margin-right: 1px;\n  font-size: 10px;\n}\n\n#text-express-app .te-header-actions {\n  gap: 3px;\n}\n\n#text-express-app .te-header .te-icon-button {\n  width: 33px;\n  height: 33px;\n}\n\n/* Em telas pequenas o launcher permanece discreto. */\n@media (max-width: 540px) {\n  #text-express-app .te-reopen-button {\n    right: 12px;\n    bottom: 12px;\n    width: 42px;\n    height: 42px;\n    border-radius: 13px;\n  }\n\n  #text-express-app .te-launcher-label {\n    display: none;\n  }\n\n  #text-express-app .te-count-badge {\n    display: none;\n  }\n}\n\n/* ===== Text Express 4.0 — launcher menor e arrastável ===== */\n\n#text-express-app .te-reopen-button {\n  right: 14px;\n  bottom: 14px;\n  width: 38px;\n  height: 38px;\n  min-width: 38px;\n  min-height: 38px;\n  padding: 0;\n  border-radius: 12px;\n  cursor: grab;\n  touch-action: none;\n  user-select: none;\n  -webkit-user-select: none;\n  will-change: left, top, transform;\n}\n\n#text-express-app .te-reopen-button .te-icon {\n  width: 20px;\n  height: 20px;\n}\n\n#text-express-app .te-reopen-button.te-dragging {\n  cursor: grabbing;\n  transition: none !important;\n  transform: scale(1.03);\n  box-shadow:\n    0 16px 34px rgba(37, 99, 235, 0.42),\n    0 4px 12px rgba(15, 23, 42, 0.28);\n}\n\n#text-express-app .te-reopen-button.te-custom-position {\n  right: auto !important;\n  bottom: auto !important;\n}\n\n#text-express-app .te-reopen-button:hover:not(.te-dragging) {\n  transform: translateY(-1px) scale(1.03);\n}\n\n#text-express-app .te-launcher-label {\n  display: none;\n}\n\n@media (max-width: 540px) {\n  #text-express-app .te-reopen-button {\n    right: 10px;\n    bottom: 10px;\n    width: 36px;\n    height: 36px;\n    min-width: 36px;\n    min-height: 36px;\n    border-radius: 11px;\n  }\n\n  #text-express-app .te-reopen-button .te-icon {\n    width: 19px;\n    height: 19px;\n  }\n}\n\n/* ==========================================================\n   Text Express 5.0 — interface leve e fluxos de atendimento\n   ========================================================== */\n\n#text-express-app {\n  --te-shadow: 0 18px 48px rgba(15, 23, 42, .24);\n  --te-radius: 15px;\n}\n\n.te-dark #text-express-app,\n#text-express-app.te-dark {\n  --te-surface: #172033;\n  --te-surface-2: #111827;\n  --te-surface-3: #202b40;\n  --te-border: #2b3850;\n  --te-header: #0e1b30;\n  --te-muted: #9eabc0;\n}\n\n#text-express-app .te-panel {\n  width: min(820px, calc(100vw - 24px));\n  height: min(640px, calc(100vh - 24px));\n  border-radius: 15px;\n  box-shadow: var(--te-shadow);\n}\n\n#text-express-app .te-header {\n  min-height: 48px;\n  padding: 0 10px 0 13px;\n  border-bottom: 1px solid color-mix(in srgb, var(--te-border) 70%, transparent);\n  background: var(--te-header);\n}\n\n#text-express-app .te-brand-icon {\n  width: 30px;\n  height: 30px;\n  border-radius: 9px;\n}\n\n#text-express-app .te-brand strong {\n  font-size: 14px;\n}\n\n#text-express-app .te-count-badge {\n  min-height: 21px;\n  padding: 2px 7px;\n  font-size: 9px;\n  background: rgba(255,255,255,.08);\n}\n\n#text-express-app .te-header .te-icon-button {\n  width: 29px;\n  height: 29px;\n}\n\n#text-express-app .te-main-tabs {\n  min-height: 45px;\n  padding: 6px 10px;\n  gap: 5px;\n  border-bottom: 1px solid var(--te-border);\n  background: var(--te-surface);\n}\n\n#text-express-app .te-main-tab {\n  min-height: 32px;\n  padding: 5px 12px;\n  border: 0;\n  border-radius: 9px;\n  background: transparent;\n  color: var(--te-muted);\n  font-size: 12px;\n}\n\n#text-express-app .te-main-tab.te-active {\n  background: var(--te-primary-soft);\n  color: var(--te-primary);\n  box-shadow: none;\n}\n\n#text-express-app .te-toolbar {\n  min-height: 48px;\n  padding: 7px 10px;\n  gap: 8px;\n  background: var(--te-surface);\n}\n\n#text-express-app .te-search-box {\n  min-height: 34px;\n  border-radius: 9px;\n  background: var(--te-surface-2);\n  border-color: transparent;\n}\n\n#text-express-app .te-primary-button,\n#text-express-app .te-secondary-button,\n#text-express-app .te-danger-button {\n  min-height: 32px;\n  padding: 6px 10px;\n  border-radius: 8px;\n  font-size: 11px;\n}\n\n#text-express-app .te-category-bar {\n  min-height: 38px;\n  padding: 3px 10px 6px;\n  gap: 5px;\n  background: var(--te-surface);\n  scrollbar-width: none;\n}\n\n#text-express-app .te-category-bar::-webkit-scrollbar {\n  display: none;\n}\n\n#text-express-app .te-category-chip,\n#text-express-app .te-category-new-button {\n  min-height: 27px;\n  border-radius: 999px;\n  box-shadow: none;\n}\n\n#text-express-app .te-category-button {\n  min-height: 27px;\n  padding: 3px 8px;\n  font-size: 10px;\n}\n\n#text-express-app .te-category-count {\n  min-width: 17px;\n  height: 17px;\n  padding: 0 4px;\n  font-size: 8px;\n}\n\n#text-express-app .te-content-area {\n  grid-template-columns: minmax(260px, 38%) minmax(0, 1fr);\n  min-height: 0;\n  background: var(--te-surface);\n}\n\n#text-express-app .te-list-pane {\n  padding: 8px;\n  border-right: 1px solid var(--te-border);\n  background: var(--te-surface-2);\n}\n\n#text-express-app .te-list {\n  gap: 5px;\n}\n\n#text-express-app .te-snippet-card {\n  min-height: 0;\n  padding: 9px;\n  gap: 8px;\n  border: 1px solid transparent;\n  border-left: 2px solid color-mix(in srgb, var(--te-card-accent) 55%, transparent);\n  border-radius: 10px;\n  background: var(--te-surface);\n  box-shadow: none;\n  transform: none;\n}\n\n#text-express-app .te-snippet-card:hover {\n  border-color: color-mix(in srgb, var(--te-border) 85%, transparent);\n  box-shadow: none;\n  transform: none;\n}\n\n#text-express-app .te-snippet-card.te-selected {\n  border-color: color-mix(in srgb, var(--te-primary) 42%, var(--te-border));\n  background: color-mix(in srgb, var(--te-primary) 6%, var(--te-surface));\n  box-shadow: none;\n}\n\n#text-express-app .te-card-icon {\n  width: 30px;\n  height: 30px;\n  border-radius: 9px;\n}\n\n#text-express-app .te-card-title {\n  font-size: 12px;\n  font-weight: 700;\n}\n\n#text-express-app .te-card-excerpt {\n  max-height: 36px;\n  margin: 4px 0 5px;\n  font-size: 10.5px;\n  line-height: 1.45;\n  -webkit-line-clamp: 2;\n}\n\n#text-express-app .te-shortcut-line {\n  margin-top: 2px;\n  gap: 6px;\n  font-size: 9px;\n}\n\n#text-express-app .te-shortcut-line code,\n#text-express-app .te-flow-shortcuts code {\n  padding: 1px 5px;\n  border: 0;\n  border-radius: 5px;\n  background: var(--te-surface-3);\n  color: var(--te-primary);\n  font-size: 9px;\n}\n\n#text-express-app .te-card-actions {\n  min-height: 25px;\n  margin-top: 2px;\n  gap: 4px;\n}\n\n#text-express-app .te-text-button {\n  min-height: 25px;\n  padding: 3px 7px;\n  font-size: 9.5px;\n}\n\n#text-express-app .te-icon-action {\n  display: inline-grid;\n  place-items: center;\n  width: 27px;\n  height: 27px;\n  padding: 0;\n  border: 0;\n  border-radius: 7px;\n  background: transparent;\n  color: var(--te-muted);\n}\n\n#text-express-app .te-icon-action:hover {\n  background: var(--te-surface-3);\n  color: var(--te-text);\n}\n\n#text-express-app .te-icon-action.te-delete:hover {\n  color: var(--te-danger);\n  background: var(--te-danger-soft);\n}\n\n#text-express-app .te-icon-action .te-icon {\n  width: 13px;\n  height: 13px;\n}\n\n#text-express-app .te-favorite-button {\n  width: 27px;\n  height: 27px;\n}\n\n#text-express-app .te-detail-pane {\n  padding: 14px 16px;\n  background: var(--te-surface);\n}\n\n#text-express-app .te-detail-header {\n  padding-bottom: 10px;\n  border-bottom: 1px solid var(--te-border);\n}\n\n#text-express-app .te-detail-title-wrap h2 {\n  margin: 0;\n  font-size: 17px;\n}\n\n#text-express-app .te-detail-category-icon {\n  width: 34px;\n  height: 34px;\n  border-radius: 10px;\n}\n\n#text-express-app .te-detail-meta {\n  margin-top: 4px;\n  gap: 6px;\n  font-size: 9.5px;\n}\n\n#text-express-app .te-detail-section {\n  margin-top: 11px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n}\n\n#text-express-app .te-content-preview {\n  min-height: 90px;\n  max-height: 250px;\n  padding: 12px;\n  border: 1px solid var(--te-border);\n  border-radius: 10px;\n  background: var(--te-surface-2);\n  font-size: 12px;\n  line-height: 1.55;\n}\n\n#text-express-app .te-inline-section {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n#text-express-app .te-detail-actions-light {\n  margin-top: 12px;\n  padding-top: 10px;\n  border-top: 1px solid var(--te-border);\n}\n\n#text-express-app .te-footer {\n  min-height: 45px;\n  padding: 6px 10px;\n  background: var(--te-surface);\n  border-top: 1px solid var(--te-border);\n}\n\n#text-express-app .te-status {\n  font-size: 9px;\n}\n\n#text-express-app .te-footer-actions {\n  gap: 4px;\n}\n\n#text-express-app .te-footer-actions button {\n  min-height: 29px;\n  padding: 4px 7px;\n  font-size: 9px;\n}\n\n/* Fluxos na lista */\n#text-express-app .te-flow-card {\n  border-left-color: var(--te-primary);\n}\n\n#text-express-app .te-flow-count {\n  flex: none;\n  padding: 2px 6px;\n  border-radius: 999px;\n  background: var(--te-primary-soft);\n  color: var(--te-primary);\n  font-size: 8px;\n  font-weight: 800;\n}\n\n#text-express-app .te-flow-shortcuts {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 3px;\n  margin: 4px 0;\n}\n\n/* Visualização da sequência */\n#text-express-app .te-flow-detail-header {\n  align-items: flex-start;\n}\n\n#text-express-app .te-flow-header-actions {\n  display: flex;\n  align-items: center;\n  gap: 3px;\n}\n\n#text-express-app .te-flow-section-title {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 7px;\n}\n\n#text-express-app .te-flow-section-title strong {\n  font-size: 11px;\n}\n\n#text-express-app .te-flow-section-title small {\n  color: var(--te-muted);\n  font-size: 9px;\n}\n\n#text-express-app .te-flow-variable-section {\n  margin-top: 11px;\n  padding: 10px;\n  border: 1px solid var(--te-border);\n  border-radius: 10px;\n  background: var(--te-surface-2);\n}\n\n#text-express-app .te-flow-variable-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 7px;\n}\n\n#text-express-app .te-flow-variable-grid label {\n  display: grid;\n  gap: 3px;\n}\n\n#text-express-app .te-flow-variable-grid span {\n  font-size: 9px;\n  color: var(--te-muted);\n}\n\n#text-express-app .te-flow-variable-grid input {\n  min-height: 31px;\n  padding: 6px 8px;\n  border: 1px solid var(--te-border);\n  border-radius: 7px;\n  background: var(--te-surface);\n  color: var(--te-text);\n}\n\n#text-express-app .te-flow-steps-view {\n  margin-top: 12px;\n}\n\n#text-express-app .te-flow-step {\n  margin-bottom: 5px;\n  overflow: hidden;\n  border: 1px solid var(--te-border);\n  border-radius: 9px;\n  background: var(--te-surface);\n}\n\n#text-express-app .te-flow-step.te-active {\n  border-color: color-mix(in srgb, var(--te-primary) 48%, var(--te-border));\n}\n\n#text-express-app .te-flow-step.te-used {\n  border-left: 3px solid var(--te-success);\n}\n\n#text-express-app .te-flow-step-summary {\n  display: grid;\n  grid-template-columns: 24px minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: 7px;\n  width: 100%;\n  min-height: 38px;\n  padding: 6px 8px;\n  border: 0;\n  background: transparent;\n  color: var(--te-text);\n  text-align: left;\n}\n\n#text-express-app .te-flow-step-summary:hover {\n  background: var(--te-surface-2);\n}\n\n#text-express-app .te-flow-step-number {\n  display: grid;\n  place-items: center;\n  width: 23px;\n  height: 23px;\n  border-radius: 7px;\n  background: var(--te-surface-3);\n  color: var(--te-primary);\n  font-size: 9px;\n  font-weight: 800;\n}\n\n#text-express-app .te-flow-step-number .te-icon {\n  width: 12px;\n  height: 12px;\n}\n\n#text-express-app .te-flow-step-name {\n  overflow: hidden;\n  font-size: 11px;\n  font-weight: 700;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#text-express-app .te-flow-step-summary code {\n  font-size: 8.5px;\n  color: var(--te-primary);\n}\n\n#text-express-app .te-optional-badge {\n  padding: 2px 5px;\n  border-radius: 999px;\n  background: var(--te-surface-3);\n  color: var(--te-muted);\n  font-size: 8px;\n}\n\n#text-express-app .te-flow-step-body {\n  padding: 0 9px 9px 39px;\n}\n\n#text-express-app .te-flow-step-body p {\n  margin: 0 0 8px;\n  color: var(--te-text);\n  font-size: 11px;\n  line-height: 1.5;\n  white-space: pre-wrap;\n}\n\n#text-express-app .te-flow-step-actions {\n  display: flex;\n  gap: 5px;\n}\n\n/* Seletor e editor de sequência no modal */\n#text-express-app .te-model-kind-selector {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 7px;\n  margin: 0 20px 10px;\n  padding: 0;\n  border: 0;\n}\n\n#text-express-app .te-model-kind-selector legend {\n  grid-column: 1 / -1;\n  margin-bottom: 3px;\n  color: var(--te-muted);\n  font-size: 10px;\n  font-weight: 700;\n}\n\n#text-express-app .te-model-kind-selector label {\n  position: relative;\n}\n\n#text-express-app .te-model-kind-selector input {\n  position: absolute;\n  opacity: 0;\n}\n\n#text-express-app .te-model-kind-selector label > span {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  gap: 9px;\n  min-height: 46px;\n  padding: 9px 13px;\n  border: 1px solid var(--te-border);\n  border-radius: 11px;\n  background: var(--te-surface);\n  color: var(--te-muted);\n  font-size: 12px;\n  font-weight: 750;\n  line-height: 1.2;\n  cursor: pointer;\n  transition: border-color .16s ease, background .16s ease, color .16s ease, box-shadow .16s ease, transform .16s ease;\n}\n\n#text-express-app .te-model-kind-selector label > span:hover {\n  transform: translateY(-1px);\n  border-color: color-mix(in srgb, var(--te-primary) 55%, var(--te-border));\n  background: var(--te-surface-2);\n}\n\n#text-express-app .te-model-kind-selector label > span > .te-icon {\n  width: 17px;\n  height: 17px;\n  flex: 0 0 auto;\n}\n\n#text-express-app .te-model-kind-selector [data-te-kind-label] {\n  display: inline;\n  min-height: 0;\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  line-height: inherit;\n}\n\n#text-express-app .te-model-kind-selector input:focus-visible + span {\n  box-shadow: var(--te-ring);\n}\n\n#text-express-app .te-model-kind-selector input:checked + span {\n  border-color: var(--te-primary);\n  background: color-mix(in srgb, var(--te-primary) 13%, var(--te-surface));\n  color: var(--te-primary);\n  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--te-primary) 12%, transparent);\n}\n\n#text-express-app .te-flow-editor {\n  display: grid;\n  gap: 8px;\n  padding: 10px;\n  border: 1px solid var(--te-border);\n  border-radius: 10px;\n  background: var(--te-surface-2);\n}\n\n#text-express-app .te-flow-editor-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n}\n\n#text-express-app .te-flow-editor-heading > div {\n  display: grid;\n  gap: 2px;\n}\n\n#text-express-app .te-flow-editor-heading strong {\n  font-size: 11px;\n}\n\n#text-express-app .te-flow-editor-heading small {\n  color: var(--te-muted);\n  font-size: 9px;\n}\n\n#text-express-app .te-compact-button {\n  flex: none;\n}\n\n#text-express-app .te-flow-editor-steps {\n  display: grid;\n  gap: 7px;\n}\n\n#text-express-app .te-flow-step-editor {\n  padding: 9px;\n  border: 1px solid var(--te-border);\n  border-radius: 9px;\n  background: var(--te-surface);\n}\n\n#text-express-app .te-flow-step-editor > header {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin-bottom: 7px;\n}\n\n#text-express-app .te-flow-step-editor-number {\n  display: grid;\n  place-items: center;\n  width: 22px;\n  height: 22px;\n  border-radius: 6px;\n  background: var(--te-primary-soft);\n  color: var(--te-primary);\n  font-size: 9px;\n  font-weight: 800;\n}\n\n#text-express-app .te-flow-step-editor > header strong {\n  flex: 1;\n  font-size: 10px;\n}\n\n#text-express-app .te-flow-editor-actions {\n  display: flex;\n  gap: 2px;\n}\n\n#text-express-app .te-flow-editor-actions button:disabled {\n  opacity: .3;\n  pointer-events: none;\n}\n\n#text-express-app .te-flow-step-editor-grid {\n  display: grid;\n  grid-template-columns: 1.2fr 1fr .7fr;\n  gap: 7px;\n}\n\n#text-express-app .te-flow-step-editor-grid label {\n  display: grid;\n  gap: 3px;\n}\n\n#text-express-app .te-flow-step-editor-grid label > span {\n  color: var(--te-muted);\n  font-size: 9px;\n}\n\n#text-express-app .te-flow-step-editor-grid input,\n#text-express-app .te-flow-step-editor-grid select,\n#text-express-app .te-flow-step-editor-grid textarea {\n  width: 100%;\n  padding: 7px 8px;\n  border: 1px solid var(--te-border);\n  border-radius: 7px;\n  background: var(--te-surface-2);\n  color: var(--te-text);\n  font-size: 10px;\n}\n\n#text-express-app .te-flow-step-content-field {\n  grid-column: 1 / -1;\n}\n\n#text-express-app .te-flow-step-content-field textarea {\n  resize: vertical;\n  line-height: 1.45;\n}\n\n#text-express-app .te-flow-optional-check {\n  display: flex !important;\n  align-items: center;\n  align-self: end;\n  min-height: 32px;\n}\n\n#text-express-app .te-flow-optional-check input {\n  width: auto;\n}\n\n/* Modal um pouco mais largo apenas quando necessário */\n#text-express-app #te-snippet-modal .te-modal {\n  width: min(720px, calc(100vw - 24px));\n  max-height: min(720px, calc(100vh - 24px));\n}\n\n#text-express-app #te-snippet-form {\n  overflow-y: auto;\n}\n\n@media (max-width: 760px) {\n  #text-express-app .te-panel {\n    width: calc(100vw - 12px);\n    height: calc(100vh - 12px);\n  }\n\n  #text-express-app .te-content-area {\n    grid-template-columns: 1fr;\n  }\n\n  #text-express-app .te-detail-pane {\n    display: none;\n  }\n\n  #text-express-app .te-flow-step-editor-grid,\n  #text-express-app .te-flow-variable-grid {\n    grid-template-columns: 1fr;\n  }\n\n  #text-express-app .te-model-kind-selector {\n    grid-template-columns: 1fr;\n  }\n}\n\n/* ==========================================================\n   Text Express 6.0 — tela grande\n   ========================================================== */\n\n#text-express-app .te-panel.te-fullscreen {\n  position: fixed !important;\n  inset: 0 !important;\n  top: 0 !important;\n  right: 0 !important;\n  bottom: 0 !important;\n  left: 0 !important;\n  width: 100vw !important;\n  width: 100dvw !important;\n  max-width: none !important;\n  height: 100vh !important;\n  height: 100dvh !important;\n  max-height: none !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  transform: none !important;\n  box-shadow: none !important;\n}\n\n#text-express-app .te-panel.te-fullscreen .te-header {\n  cursor: default;\n}\n\n#text-express-app .te-panel.te-fullscreen .te-expandable {\n  min-height: 0;\n}\n\n#text-express-app .te-panel.te-fullscreen .te-content-area {\n  min-height: 0;\n}\n\n#text-express-app .te-panel.te-fullscreen .te-list-pane,\n#text-express-app .te-panel.te-fullscreen .te-detail-pane {\n  min-height: 0;\n}\n\n#text-express-app .te-fullscreen-button[aria-pressed=\"true\"] {\n  background: rgba(255, 255, 255, .11);\n  color: #fff;\n}\n\n#text-express-app .te-fullscreen-button[aria-pressed=\"true\"]:hover {\n  background: rgba(255, 255, 255, .18);\n}\n\n@media (max-width: 760px) {\n  #text-express-app .te-panel.te-fullscreen {\n    width: 100vw !important;\n    width: 100dvw !important;\n    height: 100vh !important;\n    height: 100dvh !important;\n  }\n}\n\n/* ==========================================================\n   Text Express 7.0 — memória, salvamento e sincronização\n   ========================================================== */\n\n#text-express-app .te-variable-help code,\n#text-express-app .te-setting-profile code {\n  padding: 1px 4px;\n  border-radius: 5px;\n  background: var(--te-surface-3);\n  color: var(--te-primary);\n  font-size: .92em;\n}\n\n#text-express-app .te-setting-profile {\n  display: grid;\n  gap: 8px;\n  padding: 11px 12px;\n  border: 1px solid var(--te-border);\n  border-radius: 10px;\n  background: var(--te-surface-2);\n}\n\n#text-express-app .te-setting-profile label {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(180px, 42%);\n  align-items: center;\n  gap: 12px;\n}\n\n#text-express-app .te-setting-profile label > span {\n  display: grid;\n  gap: 3px;\n}\n\n#text-express-app .te-setting-profile strong {\n  font-size: 11px;\n}\n\n#text-express-app .te-setting-profile small {\n  color: var(--te-muted);\n  font-size: 9px;\n  line-height: 1.4;\n}\n\n#text-express-app .te-setting-profile input {\n  width: 100%;\n  min-height: 34px;\n  padding: 7px 9px;\n  border: 1px solid var(--te-border);\n  border-radius: 8px;\n  background: var(--te-surface);\n  color: var(--te-text);\n}\n\n#text-express-app .te-setting-clear-button {\n  justify-self: end;\n  min-height: 28px;\n  font-size: 9px;\n}\n\n#text-express-app .te-model-modal-footer {\n  min-height: 51px;\n}\n\n#text-express-app .te-model-save-status {\n  display: inline-flex;\n  align-items: center;\n  min-width: 0;\n  min-height: 26px;\n  color: var(--te-muted);\n  font-size: 9px;\n  line-height: 1.3;\n}\n\n#text-express-app .te-model-save-status.te-saving {\n  color: var(--te-primary);\n}\n\n#text-express-app .te-model-save-status.te-saved {\n  color: var(--te-success);\n}\n\n#text-express-app .te-model-save-status.te-save-error {\n  color: var(--te-danger);\n}\n\n@media (max-width: 620px) {\n  #text-express-app .te-setting-profile label {\n    grid-template-columns: 1fr;\n  }\n\n  #text-express-app .te-setting-clear-button {\n    justify-self: stretch;\n  }\n\n  #text-express-app .te-model-save-status {\n    width: 100%;\n    order: -1;\n  }\n\n  #text-express-app .te-model-modal-footer {\n    flex-wrap: wrap;\n  }\n}\n\n/* ==========================================================\n   Text Express 8.0 — legibilidade completa em tela cheia\n   Aplica-se ao editor, variáveis, configurações e categorias.\n   ========================================================== */\n\n/* Fundo e posicionamento de todas as janelas internas. */\n#text-express-app.te-fullscreen-active .te-modal-backdrop {\n  padding: 24px;\n}\n\n/* Base comum para todas as janelas. */\n#text-express-app.te-fullscreen-active .te-modal {\n  width: min(900px, calc(100vw - 64px));\n  max-width: none;\n  max-height: calc(100vh - 48px);\n  border-radius: 15px;\n  font-size: 14px;\n}\n\n/* Largura apropriada para cada tipo de janela. */\n#text-express-app.te-fullscreen-active #te-snippet-modal .te-modal {\n  width: min(1180px, calc(100vw - 64px));\n}\n\n#text-express-app.te-fullscreen-active #te-category-modal .te-modal {\n  width: min(980px, calc(100vw - 64px));\n}\n\n#text-express-app.te-fullscreen-active #te-settings-modal .te-modal {\n  width: min(900px, calc(100vw - 64px));\n}\n\n#text-express-app.te-fullscreen-active #te-variable-modal .te-modal {\n  width: min(760px, calc(100vw - 64px));\n}\n\n/* Cabeçalho das janelas. */\n#text-express-app.te-fullscreen-active .te-modal-header {\n  min-height: 68px;\n  padding: 14px 20px;\n}\n\n#text-express-app.te-fullscreen-active .te-modal-kicker {\n  font-size: 11px;\n  line-height: 1.25;\n  letter-spacing: .045em;\n}\n\n#text-express-app.te-fullscreen-active .te-modal-header h2 {\n  margin-top: 3px;\n  font-size: 21px;\n  line-height: 1.2;\n}\n\n#text-express-app.te-fullscreen-active .te-modal-header .te-icon-button {\n  width: 38px;\n  height: 38px;\n}\n\n/* Campos, rótulos e textos auxiliares em todos os formulários. */\n#text-express-app.te-fullscreen-active .te-modal form {\n  font-size: 14px;\n}\n\n#text-express-app.te-fullscreen-active .te-form-grid {\n  gap: 14px 16px;\n  padding: 16px 22px 18px;\n}\n\n#text-express-app.te-fullscreen-active .te-field > span,\n#text-express-app.te-fullscreen-active .te-field label > span,\n#text-express-app.te-fullscreen-active .te-modal label > span {\n  font-size: 12px;\n  line-height: 1.4;\n}\n\n#text-express-app.te-fullscreen-active .te-modal input[type=\"text\"],\n#text-express-app.te-fullscreen-active .te-modal input:not([type]),\n#text-express-app.te-fullscreen-active .te-modal select {\n  min-height: 42px;\n  padding: 9px 11px;\n  font-size: 14px;\n}\n\n#text-express-app.te-fullscreen-active .te-modal textarea {\n  min-height: 130px;\n  padding: 11px 12px;\n  font-size: 14px;\n  line-height: 1.58;\n}\n\n#text-express-app.te-fullscreen-active .te-modal small,\n#text-express-app.te-fullscreen-active .te-field-help,\n#text-express-app.te-fullscreen-active .te-field-error {\n  font-size: 11px;\n  line-height: 1.45;\n}\n\n/* Botões das janelas. */\n#text-express-app.te-fullscreen-active .te-modal .te-primary-button,\n#text-express-app.te-fullscreen-active .te-modal .te-secondary-button,\n#text-express-app.te-fullscreen-active .te-modal .te-danger-button {\n  min-height: 40px;\n  padding: 8px 14px;\n  font-size: 12.5px;\n}\n\n#text-express-app.te-fullscreen-active .te-modal .te-inline-button {\n  min-height: 38px;\n  padding: 7px 12px;\n  font-size: 11px;\n}\n\n#text-express-app.te-fullscreen-active .te-modal .te-icon-action,\n#text-express-app.te-fullscreen-active .te-modal .te-inline-icon-button {\n  width: 36px;\n  height: 36px;\n}\n\n#text-express-app.te-fullscreen-active .te-modal-footer {\n  min-height: 64px;\n  padding: 11px 20px;\n}\n\n/* Seletor Atendimento/Protocolo e Fala/Sequência. */\n#text-express-app.te-fullscreen-active .te-type-selector,\n#text-express-app.te-fullscreen-active .te-model-kind-selector {\n  margin-left: 22px;\n  margin-right: 22px;\n  gap: 10px;\n}\n\n#text-express-app.te-fullscreen-active .te-type-selector legend,\n#text-express-app.te-fullscreen-active .te-model-kind-selector legend {\n  font-size: 11px;\n}\n\n#text-express-app.te-fullscreen-active .te-type-selector span,\n#text-express-app.te-fullscreen-active .te-model-kind-selector span {\n  min-height: 42px;\n  padding: 8px 12px;\n  font-size: 12px;\n}\n\n/* ==========================================================\n   Editor de modelos e sequências\n   ========================================================== */\n\n#text-express-app.te-fullscreen-active #te-snippet-form {\n  overflow-y: auto;\n  scrollbar-width: auto;\n  scrollbar-color:\n    color-mix(in srgb, var(--te-primary) 52%, var(--te-border))\n    var(--te-surface-2);\n}\n\n#text-express-app.te-fullscreen-active #te-snippet-form::-webkit-scrollbar {\n  width: 12px;\n}\n\n#text-express-app.te-fullscreen-active #te-snippet-form::-webkit-scrollbar-track {\n  background: var(--te-surface-2);\n}\n\n#text-express-app.te-fullscreen-active #te-snippet-form::-webkit-scrollbar-thumb {\n  border: 3px solid var(--te-surface-2);\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--te-primary) 52%, var(--te-border));\n}\n\n#text-express-app.te-fullscreen-active .te-flow-editor {\n  gap: 12px;\n  padding: 14px;\n  border-radius: 12px;\n}\n\n#text-express-app.te-fullscreen-active .te-flow-editor-heading strong {\n  font-size: 14px;\n}\n\n#text-express-app.te-fullscreen-active .te-flow-editor-heading small {\n  font-size: 11px;\n  line-height: 1.45;\n}\n\n#text-express-app.te-fullscreen-active .te-flow-step-editor {\n  padding: 14px;\n  border-radius: 11px;\n}\n\n#text-express-app.te-fullscreen-active .te-flow-step-editor > header {\n  margin-bottom: 12px;\n}\n\n#text-express-app.te-fullscreen-active .te-flow-step-editor > header strong {\n  font-size: 13px;\n}\n\n#text-express-app.te-fullscreen-active .te-flow-step-editor-number {\n  width: 28px;\n  height: 28px;\n  font-size: 11px;\n}\n\n#text-express-app.te-fullscreen-active .te-flow-step-editor-grid {\n  grid-template-columns: 1.25fr 1fr .72fr;\n  gap: 12px;\n}\n\n#text-express-app.te-fullscreen-active .te-flow-step-editor-grid label > span {\n  font-size: 11px;\n}\n\n#text-express-app.te-fullscreen-active .te-flow-step-editor-grid input,\n#text-express-app.te-fullscreen-active .te-flow-step-editor-grid select {\n  min-height: 40px;\n  padding: 9px 10px;\n  font-size: 13px;\n}\n\n#text-express-app.te-fullscreen-active .te-flow-step-editor-grid textarea {\n  min-height: 125px;\n  padding: 11px;\n  font-size: 14px;\n  line-height: 1.58;\n}\n\n#text-express-app.te-fullscreen-active .te-model-save-status {\n  font-size: 11px;\n}\n\n/* ==========================================================\n   Janela de variáveis\n   ========================================================== */\n\n#text-express-app.te-fullscreen-active .te-variable-help {\n  margin: 0;\n  padding: 18px 22px 8px;\n  font-size: 13px;\n  line-height: 1.55;\n}\n\n#text-express-app.te-fullscreen-active .te-variable-fields {\n  gap: 14px;\n  padding: 12px 22px 22px;\n}\n\n#text-express-app.te-fullscreen-active .te-variable-fields label {\n  gap: 7px;\n}\n\n#text-express-app.te-fullscreen-active .te-variable-fields label > span {\n  font-size: 12px;\n  font-weight: 750;\n}\n\n#text-express-app.te-fullscreen-active .te-variable-fields input {\n  min-height: 46px;\n  padding: 10px 12px;\n  font-size: 15px;\n}\n\n/* ==========================================================\n   Configurações\n   ========================================================== */\n\n#text-express-app.te-fullscreen-active .te-settings-list {\n  gap: 12px;\n  padding: 18px 22px;\n}\n\n#text-express-app.te-fullscreen-active .te-setting-profile {\n  gap: 12px;\n  padding: 15px 16px;\n}\n\n#text-express-app.te-fullscreen-active .te-setting-profile strong,\n#text-express-app.te-fullscreen-active .te-setting-row strong {\n  font-size: 14px;\n}\n\n#text-express-app.te-fullscreen-active .te-setting-profile small,\n#text-express-app.te-fullscreen-active .te-setting-row small {\n  font-size: 11.5px;\n  line-height: 1.45;\n}\n\n#text-express-app.te-fullscreen-active .te-setting-profile input {\n  min-height: 44px;\n  padding: 9px 11px;\n  font-size: 14px;\n}\n\n#text-express-app.te-fullscreen-active .te-setting-row {\n  min-height: 68px;\n  padding: 13px 15px;\n}\n\n#text-express-app.te-fullscreen-active .te-setting-row input[type=\"checkbox\"] {\n  width: 21px;\n  height: 21px;\n}\n\n#text-express-app.te-fullscreen-active .te-keyboard-help {\n  margin: 0 22px 18px;\n  padding: 13px 15px;\n  font-size: 12px;\n}\n\n#text-express-app.te-fullscreen-active .te-keyboard-help strong {\n  font-size: 13px;\n}\n\n/* ==========================================================\n   Categorias\n   ========================================================== */\n\n#text-express-app.te-fullscreen-active .te-modal-heading-icon {\n  width: 48px;\n  height: 48px;\n}\n\n#text-express-app.te-fullscreen-active .te-modal-heading-icon .te-icon {\n  width: 24px;\n  height: 24px;\n}\n\n#text-express-app.te-fullscreen-active .te-icon-choice-grid {\n  grid-template-columns: repeat(11, minmax(46px, 1fr));\n  gap: 9px;\n}\n\n#text-express-app.te-fullscreen-active .te-icon-choice {\n  min-height: 48px;\n  border-radius: 11px;\n}\n\n#text-express-app.te-fullscreen-active .te-icon-choice .te-icon {\n  width: 22px;\n  height: 22px;\n}\n\n#text-express-app.te-fullscreen-active #te-category-form-color {\n  width: 58px;\n  height: 48px;\n}\n\n#text-express-app.te-fullscreen-active .te-color-choice {\n  width: 31px;\n  height: 31px;\n}\n\n#text-express-app.te-fullscreen-active .te-color-choice span {\n  width: 21px;\n  height: 21px;\n}\n\n#text-express-app.te-fullscreen-active .te-category-preview {\n  min-height: 42px;\n  padding: 0 14px;\n  font-size: 13px;\n}\n\n#text-express-app.te-fullscreen-active .te-category-order-actions {\n  padding: 0 22px 18px;\n}\n\n/* ==========================================================\n   Adaptação para telas menores\n   ========================================================== */\n\n@media (max-width: 1100px) {\n  #text-express-app.te-fullscreen-active .te-modal-backdrop {\n    padding: 15px;\n  }\n\n  #text-express-app.te-fullscreen-active .te-modal,\n  #text-express-app.te-fullscreen-active #te-snippet-modal .te-modal,\n  #text-express-app.te-fullscreen-active #te-category-modal .te-modal,\n  #text-express-app.te-fullscreen-active #te-settings-modal .te-modal,\n  #text-express-app.te-fullscreen-active #te-variable-modal .te-modal {\n    width: calc(100vw - 30px);\n    max-height: calc(100vh - 30px);\n  }\n\n  #text-express-app.te-fullscreen-active .te-flow-step-editor-grid {\n    grid-template-columns: 1fr 1fr;\n  }\n\n  #text-express-app.te-fullscreen-active .te-icon-choice-grid {\n    grid-template-columns: repeat(8, minmax(44px, 1fr));\n  }\n}\n\n@media (max-width: 720px) {\n  #text-express-app.te-fullscreen-active .te-modal-backdrop {\n    padding: 6px;\n  }\n\n  #text-express-app.te-fullscreen-active .te-modal,\n  #text-express-app.te-fullscreen-active #te-snippet-modal .te-modal,\n  #text-express-app.te-fullscreen-active #te-category-modal .te-modal,\n  #text-express-app.te-fullscreen-active #te-settings-modal .te-modal,\n  #text-express-app.te-fullscreen-active #te-variable-modal .te-modal {\n    width: calc(100vw - 12px);\n    max-height: calc(100vh - 12px);\n    border-radius: 10px;\n  }\n\n  #text-express-app.te-fullscreen-active .te-form-grid {\n    padding: 12px;\n  }\n\n  #text-express-app.te-fullscreen-active .te-type-selector,\n  #text-express-app.te-fullscreen-active .te-model-kind-selector {\n    margin-left: 12px;\n    margin-right: 12px;\n  }\n\n  #text-express-app.te-fullscreen-active .te-flow-step-editor-grid,\n  #text-express-app.te-fullscreen-active .te-setting-profile label {\n    grid-template-columns: 1fr;\n  }\n\n  #text-express-app.te-fullscreen-active .te-icon-choice-grid {\n    grid-template-columns: repeat(6, 1fr);\n  }\n\n  #text-express-app.te-fullscreen-active .te-variable-help,\n  #text-express-app.te-fullscreen-active .te-variable-fields,\n  #text-express-app.te-fullscreen-active .te-settings-list {\n    padding-left: 12px;\n    padding-right: 12px;\n  }\n}\n\n/* ==========================================================\n   Text Express 9.0 — categorias arrastáveis horizontalmente\n   ========================================================== */\n\n#text-express-app .te-category-bar {\n  overscroll-behavior-x: contain;\n  scroll-behavior: smooth;\n  touch-action: pan-y;\n  user-select: none;\n  -webkit-user-select: none;\n  cursor: default;\n}\n\n#text-express-app .te-category-bar.te-can-drag {\n  cursor: grab;\n}\n\n#text-express-app .te-category-bar.te-can-drag:active,\n#text-express-app .te-category-bar.te-dragging {\n  cursor: grabbing;\n}\n\n#text-express-app .te-category-bar.te-dragging {\n  scroll-behavior: auto;\n}\n\n#text-express-app .te-category-bar.te-dragging,\n#text-express-app .te-category-bar.te-dragging * {\n  user-select: none !important;\n  -webkit-user-select: none !important;\n}\n\n#text-express-app .te-category-bar.te-dragging .te-category-chip,\n#text-express-app .te-category-bar.te-dragging .te-category-add-button {\n  pointer-events: none;\n}\n\n#text-express-app .te-category-bar:focus-visible {\n  outline: 2px solid color-mix(in srgb, var(--te-primary) 70%, transparent);\n  outline-offset: -2px;\n}\n\n/* Sombra discreta nas bordas para indicar conteúdo lateral. */\n#text-express-app .te-category-bar.te-can-drag {\n  background-image:\n    linear-gradient(to right, var(--te-surface), transparent 22px),\n    linear-gradient(to left, var(--te-surface), transparent 22px);\n  background-position: left center, right center;\n  background-repeat: no-repeat;\n  background-size: 28px 100%, 28px 100%;\n  background-attachment: local, local;\n}\n\n\n/* ==========================================================\n   Text Express 10.0 — tópicos clicáveis e editáveis\n   ========================================================== */\n\n#text-express-app .te-category-bar:not(.te-dragging) .te-category-button,\n#text-express-app .te-category-bar:not(.te-dragging) .te-category-edit {\n  pointer-events: auto;\n}\n\n#text-express-app .te-category-edit {\n  width: 25px;\n  min-width: 25px;\n  height: 25px;\n  margin-right: 3px;\n  opacity: .5;\n  cursor: pointer;\n}\n\n#text-express-app .te-category-chip:hover .te-category-edit,\n#text-express-app .te-category-chip:focus-within .te-category-edit,\n#text-express-app .te-category-edit:hover,\n#text-express-app .te-category-edit:focus-visible {\n  width: 25px;\n  opacity: 1;\n}\n\n#text-express-app .te-category-chip.te-active {\n  outline: 1px solid color-mix(in srgb, var(--te-category-color) 70%, transparent);\n  outline-offset: 1px;\n}\n\n#text-express-app .te-category-button,\n#text-express-app .te-category-edit {\n  position: relative;\n  z-index: 1;\n}\n\n#text-express-app .te-category-bar.te-dragging .te-category-button,\n#text-express-app .te-category-bar.te-dragging .te-category-edit,\n#text-express-app .te-category-bar.te-dragging .te-category-add-button {\n  pointer-events: none !important;\n}\n\n/* ==========================================================\n   Text Express 15.0 — posição numérica simples\n   ========================================================== */\n\n#text-express-app .te-position-button {\n  position: relative;\n  display: inline-grid;\n  flex: none;\n  place-items: center;\n  width: 28px;\n  height: 27px;\n  padding: 0;\n  border: 1px solid transparent;\n  border-radius: 7px;\n  background: transparent;\n  color: var(--te-muted);\n  cursor: pointer;\n}\n\n#text-express-app .te-position-button svg {\n  width: 15px;\n  height: 15px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n\n#text-express-app .te-position-current {\n  position: absolute;\n  top: -5px;\n  right: -5px;\n  display: grid;\n  place-items: center;\n  min-width: 15px;\n  height: 15px;\n  padding: 0 3px;\n  border: 2px solid var(--te-surface);\n  border-radius: 999px;\n  background: var(--te-surface-3);\n  color: var(--te-muted);\n  font-size: 7px;\n  font-weight: 850;\n  line-height: 1;\n}\n\n#text-express-app .te-position-button:hover,\n#text-express-app .te-position-button:focus-visible {\n  border-color: color-mix(in srgb, var(--te-primary) 55%, var(--te-border));\n  background: var(--te-primary-soft);\n  color: var(--te-primary);\n}\n\n#text-express-app .te-position-button:hover .te-position-current,\n#text-express-app .te-position-button:focus-visible .te-position-current {\n  background: var(--te-primary);\n  color: #fff;\n}\n\n#text-express-app .te-card-actions .te-position-button {\n  order: 2;\n}\n\n#text-express-app .te-card-actions .te-card-insert {\n  order: 1;\n}\n\n#text-express-app .te-card-actions [data-te-action=\"edit\"] {\n  order: 3;\n}\n\n#text-express-app .te-card-actions [data-te-action=\"delete\"] {\n  order: 4;\n}\n\n/* Popover quase imperceptível, aberto apenas ao clicar na seta. */\n#text-express-app .te-position-popover {\n  position: fixed;\n  z-index: 2147483646;\n  width: 224px;\n  padding: 10px;\n  border: 1px solid var(--te-border);\n  border-radius: 11px;\n  background: var(--te-surface);\n  color: var(--te-text);\n  box-shadow:\n    0 18px 44px rgba(3, 10, 28, .34),\n    0 0 0 1px rgba(255, 255, 255, .025);\n}\n\n#text-express-app .te-position-form {\n  display: grid;\n  gap: 9px;\n}\n\n#text-express-app .te-position-popover-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n#text-express-app .te-position-popover-header strong {\n  font-size: 11px;\n}\n\n#text-express-app .te-position-close {\n  display: grid;\n  place-items: center;\n  width: 24px;\n  height: 24px;\n  padding: 0;\n  border: 0;\n  border-radius: 6px;\n  background: transparent;\n  color: var(--te-muted);\n  font-size: 17px;\n  cursor: pointer;\n}\n\n#text-express-app .te-position-close:hover {\n  background: var(--te-surface-3);\n  color: var(--te-text);\n}\n\n#text-express-app .te-position-control {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 8px;\n}\n\n#text-express-app .te-position-input {\n  width: 100%;\n  min-height: 38px;\n  padding: 7px 9px;\n  border: 1px solid var(--te-border);\n  border-radius: 8px;\n  background: var(--te-surface-2);\n  color: var(--te-text);\n  font-size: 15px;\n  font-weight: 800;\n  text-align: center;\n}\n\n#text-express-app .te-position-input:focus {\n  border-color: var(--te-primary);\n  outline: 2px solid color-mix(in srgb, var(--te-primary) 20%, transparent);\n}\n\n#text-express-app .te-position-of {\n  color: var(--te-muted);\n  font-size: 10px;\n  white-space: nowrap;\n}\n\n#text-express-app .te-position-popover-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n#text-express-app .te-position-context {\n  overflow: hidden;\n  color: var(--te-muted);\n  font-size: 8.5px;\n  line-height: 1.25;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#text-express-app .te-position-confirm {\n  min-height: 30px;\n  padding: 5px 11px;\n  border: 0;\n  border-radius: 7px;\n  background: var(--te-primary);\n  color: #fff;\n  font-size: 10px;\n  font-weight: 800;\n  cursor: pointer;\n}\n\n#text-express-app .te-position-confirm:hover {\n  filter: brightness(1.06);\n}\n\n#text-express-app .te-position-moved {\n  animation: te-v15-position-flash 650ms ease;\n}\n\n@keyframes te-v15-position-flash {\n  0% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--te-success) 58%, transparent);\n  }\n  42% {\n    box-shadow: 0 0 0 4px color-mix(in srgb, var(--te-success) 30%, transparent);\n  }\n  100% {\n    box-shadow: 0 0 0 0 transparent;\n  }\n}\n\n@media (max-width: 540px) {\n  #text-express-app .te-position-popover {\n    width: min(224px, calc(100vw - 18px));\n  }\n}\n\n/* ==========================================================\n   Text Express 17.0 — movimento direto corrigido\n   ========================================================== */\n\n/* Remove completamente a interface numérica da versão anterior. */\n#text-express-app .te-position-button,\n#text-express-app .te-position-popover {\n  display: none !important;\n}\n\n#text-express-app .te-direct-move-handle {\n  display: inline-grid;\n  flex: none;\n  place-items: center;\n  width: 28px;\n  height: 27px;\n  padding: 0;\n  border: 1px solid transparent;\n  border-radius: 7px;\n  background: transparent;\n  color: var(--te-muted);\n  cursor: grab;\n  touch-action: none;\n}\n\n#text-express-app .te-direct-move-handle svg {\n  width: 16px;\n  height: 16px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n\n#text-express-app .te-direct-move-handle:hover,\n#text-express-app .te-direct-move-handle:focus-visible {\n  border-color: color-mix(in srgb, var(--te-primary) 58%, var(--te-border));\n  background: var(--te-primary-soft);\n  color: var(--te-primary);\n}\n\n#text-express-app .te-direct-move-handle:active {\n  cursor: grabbing;\n}\n\n#text-express-app .te-card-actions .te-direct-move-handle {\n  order: 2;\n}\n\n#text-express-app .te-card-actions .te-card-insert {\n  order: 1;\n}\n\n#text-express-app .te-card-actions [data-te-action=\"edit\"] {\n  order: 3;\n}\n\n#text-express-app .te-card-actions [data-te-action=\"delete\"] {\n  order: 4;\n}\n\n/*\n * O próprio card permanece no local de destino com o tamanho completo.\n * O conteúdo fica oculto e a posição aparece no centro.\n */\n#text-express-app .te-snippet-card.te-direct-placeholder {\n  min-height: var(--te-placeholder-height, auto);\n  border: 3px dashed var(--te-primary) !important;\n  background:\n    linear-gradient(\n      135deg,\n      color-mix(in srgb, var(--te-primary) 17%, transparent),\n      color-mix(in srgb, var(--te-primary) 6%, var(--te-surface))\n    ) !important;\n  box-shadow:\n    inset 0 0 0 1px color-mix(in srgb, var(--te-primary) 25%, transparent),\n    0 7px 20px color-mix(in srgb, var(--te-primary) 12%, transparent) !important;\n  cursor: grabbing;\n  transition: none !important;\n}\n\n#text-express-app .te-snippet-card.te-direct-placeholder > * {\n  visibility: hidden !important;\n}\n\n#text-express-app .te-snippet-card.te-direct-placeholder::after {\n  position: absolute;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  padding: 10px;\n  color: var(--te-primary);\n  content: attr(data-te-drop-position);\n  font-size: 12px;\n  font-weight: 850;\n  letter-spacing: .01em;\n  text-align: center;\n  visibility: visible;\n  pointer-events: none;\n}\n\n/* Clone visual que acompanha o ponteiro. */\n#text-express-app .te-snippet-card.te-direct-drag-ghost {\n  border-color: var(--te-primary) !important;\n  background: color-mix(\n    in srgb,\n    var(--te-primary-soft) 58%,\n    var(--te-surface)\n  ) !important;\n  box-shadow:\n    0 20px 44px rgba(3, 10, 28, .38),\n    0 0 0 2px color-mix(in srgb, var(--te-primary) 38%, transparent) !important;\n  opacity: .97;\n  cursor: grabbing !important;\n  transition: none !important;\n}\n\n#text-express-app .te-snippet-card.te-direct-drag-ghost button {\n  pointer-events: none !important;\n}\n\n#text-express-app .te-list.te-direct-reordering {\n  cursor: grabbing;\n  scroll-behavior: auto !important;\n  user-select: none;\n  -webkit-user-select: none;\n}\n\n#text-express-app .te-list.te-direct-reordering .te-snippet-card {\n  transition: none !important;\n}\n\n#text-express-app .te-direct-move-saved {\n  animation: te-v16-move-saved 600ms ease;\n}\n\n@keyframes te-v16-move-saved {\n  0% {\n    box-shadow: 0 0 0 0 color-mix(in srgb, var(--te-success) 55%, transparent);\n  }\n  42% {\n    box-shadow: 0 0 0 4px color-mix(in srgb, var(--te-success) 30%, transparent);\n  }\n  100% {\n    box-shadow: 0 0 0 0 transparent;\n  }\n}\n\n@media (max-width: 540px) {\n  #text-express-app .te-direct-move-handle {\n    width: 30px;\n    height: 29px;\n  }\n}\n\n/* ==========================================================\n   Text Express 18.0 — importação completa\n   ========================================================== */\n\n#text-express-app .te-import-choice-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 2147483647;\n  display: grid;\n  place-items: center;\n  padding: 18px;\n  background: rgba(3, 10, 28, .68);\n  backdrop-filter: blur(5px);\n}\n\n#text-express-app .te-import-choice-dialog {\n  width: min(560px, calc(100vw - 28px));\n  overflow: hidden;\n  border: 1px solid var(--te-border);\n  border-radius: 15px;\n  background: var(--te-surface);\n  color: var(--te-text);\n  box-shadow: 0 28px 80px rgba(3, 10, 28, .52);\n}\n\n#text-express-app .te-import-choice-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 14px;\n  padding: 17px 18px 14px;\n  border-bottom: 1px solid var(--te-border);\n}\n\n#text-express-app .te-import-choice-kicker {\n  color: var(--te-primary);\n  font-size: 9px;\n  font-weight: 850;\n  letter-spacing: .07em;\n}\n\n#text-express-app .te-import-choice-header h2 {\n  margin: 4px 0 0;\n  font-size: 18px;\n  line-height: 1.25;\n}\n\n#text-express-app .te-import-choice-close {\n  display: grid;\n  flex: none;\n  place-items: center;\n  width: 31px;\n  height: 31px;\n  padding: 0;\n  border: 0;\n  border-radius: 8px;\n  background: transparent;\n  color: var(--te-muted);\n  font-size: 21px;\n  cursor: pointer;\n}\n\n#text-express-app .te-import-choice-close:hover {\n  background: var(--te-surface-3);\n  color: var(--te-text);\n}\n\n#text-express-app .te-import-choice-summary {\n  display: grid;\n  gap: 3px;\n  padding: 12px 18px;\n  background: var(--te-surface-2);\n}\n\n#text-express-app .te-import-choice-summary strong {\n  overflow: hidden;\n  font-size: 11px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#text-express-app .te-import-choice-summary span {\n  color: var(--te-muted);\n  font-size: 9.5px;\n}\n\n#text-express-app .te-import-choice-options {\n  display: grid;\n  gap: 9px;\n  padding: 15px 18px 10px;\n}\n\n#text-express-app .te-import-option {\n  display: grid;\n  grid-template-columns: 39px minmax(0, 1fr);\n  align-items: center;\n  gap: 11px;\n  width: 100%;\n  padding: 12px;\n  border: 1px solid var(--te-border);\n  border-radius: 11px;\n  background: var(--te-surface-2);\n  color: var(--te-text);\n  text-align: left;\n  cursor: pointer;\n}\n\n#text-express-app .te-import-option:hover,\n#text-express-app .te-import-option:focus-visible {\n  border-color: color-mix(in srgb, var(--te-primary) 62%, var(--te-border));\n  background: var(--te-primary-soft);\n  outline: 0;\n}\n\n#text-express-app .te-import-option-primary {\n  border-color: color-mix(in srgb, var(--te-primary) 48%, var(--te-border));\n}\n\n#text-express-app .te-import-option-icon {\n  display: grid;\n  place-items: center;\n  width: 39px;\n  height: 39px;\n  border-radius: 10px;\n  background: var(--te-surface-3);\n  color: var(--te-primary);\n  font-size: 21px;\n  font-weight: 800;\n}\n\n#text-express-app .te-import-option > span:last-child {\n  display: grid;\n  gap: 3px;\n}\n\n#text-express-app .te-import-option strong {\n  font-size: 12px;\n}\n\n#text-express-app .te-import-option small {\n  color: var(--te-muted);\n  font-size: 9.5px;\n  line-height: 1.45;\n}\n\n#text-express-app .te-import-option em {\n  justify-self: start;\n  margin-top: 2px;\n  padding: 2px 6px;\n  border-radius: 999px;\n  background: var(--te-primary);\n  color: #fff;\n  font-size: 8px;\n  font-style: normal;\n  font-weight: 800;\n}\n\n#text-express-app .te-import-choice-warning {\n  margin: 0;\n  padding: 5px 18px 15px;\n  color: var(--te-muted);\n  font-size: 8.8px;\n  line-height: 1.4;\n}\n\n@media (max-width: 540px) {\n  #text-express-app .te-import-choice-overlay {\n    padding: 8px;\n  }\n\n  #text-express-app .te-import-choice-dialog {\n    width: calc(100vw - 16px);\n  }\n}\n\n/* ==========================================================\n   Text Express 21.0 — base visual preservada e interação por card\n   ========================================================== */\n\n#text-express-app .te-import-choice-overlay {\n  pointer-events: auto !important;\n}\n\n#text-express-app .te-import-choice-dialog,\n#text-express-app .te-import-choice-dialog *,\n#text-express-app .te-import-option,\n#text-express-app .te-import-choice-close {\n  pointer-events: auto !important;\n}\n\n#text-express-app .te-import-choice-header h2 {\n  color: var(--te-text) !important;\n}\n\n#text-express-app .te-import-option {\n  position: relative;\n  z-index: 1;\n}\n\n#text-express-app .te-import-option:active {\n  transform: translateY(1px);\n}\n\n#text-express-app .te-import-option:focus-visible,\n#text-express-app .te-import-choice-close:focus-visible {\n  outline: 2px solid var(--te-primary);\n  outline-offset: 2px;\n}\n\n/* ==========================================================\n   Text Express 22.0 — menu persistente de sequências\n   ========================================================== */\n#text-express-app .te-sequence-menu {\n  position: fixed;\n  right: 26px;\n  bottom: 26px;\n  z-index: 2147483646;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, calc(100vw - 32px));\n  max-height: min(760px, calc(100vh - 32px));\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--te-primary) 44%, var(--te-border));\n  border-radius: 20px;\n  background:\n    linear-gradient(180deg, color-mix(in srgb, var(--te-header) 96%, #172554) 0%, color-mix(in srgb, var(--te-header) 88%, #111827) 100%);\n  color: #f8fbff;\n  box-shadow: 0 28px 90px rgba(3, 10, 28, .55), 0 0 0 1px rgba(255,255,255,.05) inset;\n  pointer-events: auto;\n}\n\n#text-express-app .te-sequence-menu-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n  padding: 16px 17px 14px;\n  border-bottom: 1px solid rgba(255,255,255,.1);\n}\n\n#text-express-app .te-sequence-menu-title-wrap,\n#text-express-app .te-sequence-menu-meta,\n#text-express-app .te-sequence-menu-kicker {\n  display: flex;\n  align-items: center;\n}\n\n#text-express-app .te-sequence-menu-title-wrap {\n  min-width: 0;\n  gap: 11px;\n}\n\n#text-express-app .te-sequence-menu-title-wrap > div {\n  min-width: 0;\n}\n\n#text-express-app .te-sequence-menu-icon {\n  display: grid;\n  flex: 0 0 auto;\n  place-items: center;\n  width: 42px;\n  height: 42px;\n  border-radius: 13px;\n  background: linear-gradient(135deg, #7c3aed, #4f46e5);\n  box-shadow: 0 10px 25px rgba(124,58,237,.35);\n}\n\n#text-express-app .te-sequence-menu-icon .te-icon {\n  width: 21px;\n  height: 21px;\n}\n\n#text-express-app .te-sequence-menu-kicker {\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 3px;\n  color: #cbd5e1;\n  font-size: 11px;\n  font-weight: 800;\n  letter-spacing: .06em;\n}\n\n#text-express-app .te-sequence-open-badge {\n  padding: 3px 8px;\n  border: 1px solid rgba(74,222,128,.28);\n  border-radius: 999px;\n  background: rgba(22,163,74,.2);\n  color: #86efac;\n  font-size: 9px;\n  letter-spacing: .02em;\n  text-transform: none;\n}\n\n#text-express-app .te-sequence-menu-title-wrap strong {\n  display: block;\n  overflow: hidden;\n  color: #fff;\n  font-size: 15px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#text-express-app .te-sequence-menu-meta {\n  flex: 0 0 auto;\n  gap: 11px;\n  color: #dbeafe;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n#text-express-app .te-sequence-close {\n  display: grid;\n  grid-template-columns: auto auto;\n  align-items: center;\n  gap: 4px;\n  min-width: 50px;\n  min-height: 36px;\n  padding: 6px 8px;\n  border: 1px solid rgba(255,255,255,.12);\n  border-radius: 10px;\n  background: rgba(255,255,255,.06);\n  color: #fff;\n}\n\n#text-express-app .te-sequence-close:hover {\n  background: rgba(255,255,255,.12);\n}\n\n#text-express-app .te-sequence-close .te-icon {\n  width: 16px;\n  height: 16px;\n}\n\n#text-express-app .te-sequence-close small {\n  color: #94a3b8;\n  font-size: 8px;\n  font-weight: 800;\n}\n\n#text-express-app .te-sequence-search {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  margin: 13px 14px 10px;\n  padding: 0 12px;\n  min-height: 43px;\n  border: 1px solid rgba(148,163,184,.28);\n  border-radius: 12px;\n  background: rgba(15,23,42,.48);\n  color: #94a3b8;\n}\n\n#text-express-app .te-sequence-search:focus-within {\n  border-color: #8b5cf6;\n  box-shadow: 0 0 0 3px rgba(139,92,246,.18);\n}\n\n#text-express-app .te-sequence-search .te-icon {\n  width: 17px;\n  height: 17px;\n}\n\n#text-express-app .te-sequence-search input {\n  width: 100%;\n  min-width: 0;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: #fff;\n}\n\n#text-express-app .te-sequence-search input::placeholder {\n  color: #8291aa;\n}\n\n#text-express-app .te-sequence-list {\n  display: grid;\n  gap: 8px;\n  overflow: auto;\n  padding: 2px 14px 13px;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(139,92,246,.6) transparent;\n}\n\n#text-express-app .te-sequence-item {\n  display: grid;\n  grid-template-columns: 50px minmax(0, 1fr) 28px;\n  align-items: center;\n  gap: 11px;\n  width: 100%;\n  padding: 10px;\n  border: 1px solid rgba(148,163,184,.22);\n  border-radius: 13px;\n  background: rgba(15,23,42,.5);\n  color: #fff;\n  text-align: left;\n  transition: border-color .16s ease, background .16s ease, transform .16s ease, box-shadow .16s ease;\n}\n\n#text-express-app .te-sequence-item:hover,\n#text-express-app .te-sequence-item:focus-visible {\n  transform: translateY(-1px);\n  border-color: rgba(139,92,246,.78);\n  background: rgba(49,46,129,.35);\n  box-shadow: 0 9px 24px rgba(0,0,0,.18);\n  outline: none;\n}\n\n#text-express-app .te-sequence-item.te-current {\n  border-color: #8b5cf6;\n  background: linear-gradient(135deg, rgba(91,33,182,.38), rgba(30,41,59,.72));\n  box-shadow: 0 0 0 2px rgba(139,92,246,.14) inset;\n}\n\n#text-express-app .te-sequence-item.te-used {\n  border-color: rgba(74,222,128,.34);\n}\n\n#text-express-app .te-sequence-number {\n  display: grid;\n  place-items: center;\n  width: 50px;\n  height: 50px;\n  border-radius: 12px;\n  background: linear-gradient(145deg, #7c3aed, #4f46e5);\n  color: #fff;\n  font-size: 25px;\n  font-weight: 900;\n  box-shadow: 0 8px 18px rgba(79,70,229,.28);\n}\n\n#text-express-app .te-sequence-item-content {\n  display: grid;\n  min-width: 0;\n  gap: 4px;\n}\n\n#text-express-app .te-sequence-item-content strong {\n  color: #fff;\n  font-size: 12.5px;\n}\n\n#text-express-app .te-sequence-item-content > span:not(.te-sequence-keywords) {\n  display: -webkit-box;\n  overflow: hidden;\n  color: #cbd5e1;\n  font-size: 11px;\n  line-height: 1.45;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n\n#text-express-app .te-sequence-keywords {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-top: 2px;\n}\n\n#text-express-app .te-sequence-keywords code {\n  padding: 3px 6px;\n  border: 1px solid rgba(167,139,250,.34);\n  border-radius: 7px;\n  background: rgba(76,29,149,.24);\n  color: #c4b5fd;\n  font-size: 9px;\n  font-weight: 800;\n}\n\n#text-express-app .te-sequence-keywords em {\n  color: #718096;\n  font-size: 9px;\n  font-style: normal;\n}\n\n#text-express-app .te-sequence-item-action {\n  display: grid;\n  place-items: center;\n  color: #a78bfa;\n}\n\n#text-express-app .te-sequence-item.te-used .te-sequence-item-action {\n  color: #4ade80;\n}\n\n#text-express-app .te-sequence-item-action .te-icon {\n  width: 18px;\n  height: 18px;\n}\n\n#text-express-app .te-sequence-menu-footer {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  gap: 6px 16px;\n  padding: 11px 15px 13px;\n  border-top: 1px solid rgba(255,255,255,.09);\n  background: rgba(15,23,42,.42);\n  color: #94a3b8;\n  font-size: 9.5px;\n}\n\n#text-express-app .te-sequence-menu-footer span {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n}\n\n#text-express-app .te-sequence-menu-footer .te-icon {\n  width: 13px;\n  height: 13px;\n  color: #a78bfa;\n}\n\n#text-express-app .te-sequence-empty {\n  display: grid;\n  place-items: center;\n  gap: 6px;\n  min-height: 150px;\n  padding: 20px;\n  border: 1px dashed rgba(148,163,184,.28);\n  border-radius: 13px;\n  color: #94a3b8;\n  text-align: center;\n}\n\n#text-express-app .te-sequence-empty .te-icon {\n  width: 28px;\n  height: 28px;\n  color: #a78bfa;\n}\n\n#text-express-app .te-sequence-empty strong {\n  color: #e2e8f0;\n}\n\n#text-express-app .te-sequence-open-detail {\n  white-space: nowrap;\n}\n\n#text-express-app .te-flow-keywords-field {\n  grid-column: 1 / -1;\n  display: grid;\n  gap: 6px;\n}\n\n#text-express-app .te-flow-keywords-field > span {\n  font-size: 11px;\n  font-weight: 800;\n}\n\n#text-express-app .te-flow-keywords-field input {\n  width: 100%;\n}\n\n#text-express-app .te-flow-keywords-field small {\n  color: var(--te-muted);\n  font-size: 9.5px;\n}\n\n@media (max-width: 680px) {\n  #text-express-app .te-sequence-menu {\n    right: 8px;\n    bottom: 8px;\n    width: calc(100vw - 16px);\n    max-height: calc(100vh - 16px);\n    border-radius: 16px;\n  }\n\n  #text-express-app .te-sequence-menu-header {\n    align-items: flex-start;\n  }\n\n  #text-express-app .te-sequence-menu-meta {\n    flex-direction: column-reverse;\n    align-items: flex-end;\n    gap: 5px;\n  }\n\n  #text-express-app .te-sequence-item {\n    grid-template-columns: 44px minmax(0, 1fr) 22px;\n    gap: 8px;\n  }\n\n  #text-express-app .te-sequence-number {\n    width: 44px;\n    height: 44px;\n    font-size: 21px;\n  }\n}\n\n/* ==========================================================\n   Text Express 25.0 — arraste corrigido e redimensionamento\n   ========================================================== */\n#text-express-app .te-resizable-window {\n  min-width: 0;\n  min-height: 0;\n}\n\n#text-express-app .te-panel.te-window-moving,\n#text-express-app .te-panel.te-window-resizing,\n#text-express-app .te-sequence-menu.te-window-moving,\n#text-express-app .te-sequence-menu.te-window-resizing {\n  user-select: none;\n  transition: none !important;\n}\n\n#text-express-app .te-right-drag-handle {\n  cursor: move;\n  cursor: grab;\n}\n\n#text-express-app .te-sequence-menu-header.te-right-drag-handle {\n  position: relative;\n  user-select: none;\n  touch-action: none;\n}\n\n#text-express-app .te-sequence-menu.te-window-moving .te-sequence-menu-header,\n#text-express-app .te-panel.te-window-moving [data-te-drag-handle] {\n  cursor: grabbing;\n}\n\n#text-express-app .te-resize-handle {\n  position: absolute;\n  z-index: 80;\n  display: block;\n  background: transparent;\n  touch-action: none;\n}\n\n#text-express-app .te-resize-n,\n#text-express-app .te-resize-s {\n  left: 14px;\n  right: 14px;\n  height: 9px;\n  cursor: ns-resize;\n}\n\n#text-express-app .te-resize-n { top: 0; }\n#text-express-app .te-resize-s { bottom: 0; }\n\n#text-express-app .te-resize-e,\n#text-express-app .te-resize-w {\n  top: 14px;\n  bottom: 14px;\n  width: 9px;\n  cursor: ew-resize;\n}\n\n#text-express-app .te-resize-e { right: 0; }\n#text-express-app .te-resize-w { left: 0; }\n\n#text-express-app .te-resize-ne,\n#text-express-app .te-resize-nw,\n#text-express-app .te-resize-se,\n#text-express-app .te-resize-sw {\n  width: 16px;\n  height: 16px;\n}\n\n#text-express-app .te-resize-ne {\n  top: 0;\n  right: 0;\n  cursor: nesw-resize;\n}\n\n#text-express-app .te-resize-nw {\n  top: 0;\n  left: 0;\n  cursor: nwse-resize;\n}\n\n#text-express-app .te-resize-se {\n  right: 0;\n  bottom: 0;\n  cursor: nwse-resize;\n}\n\n#text-express-app .te-resize-sw {\n  left: 0;\n  bottom: 0;\n  cursor: nesw-resize;\n}\n\n#text-express-app .te-resize-se::after,\n#text-express-app .te-resize-sw::after {\n  content: \"\";\n  position: absolute;\n  bottom: 4px;\n  width: 7px;\n  height: 7px;\n  opacity: .42;\n  border-bottom: 2px solid currentColor;\n}\n\n#text-express-app .te-resize-se::after {\n  right: 4px;\n  border-right: 2px solid currentColor;\n  color: var(--te-muted);\n}\n\n#text-express-app .te-resize-sw::after {\n  left: 4px;\n  border-left: 2px solid currentColor;\n  color: var(--te-muted);\n}\n\n#text-express-app .te-sequence-menu .te-resize-se::after,\n#text-express-app .te-sequence-menu .te-resize-sw::after {\n  color: #a78bfa;\n}\n\n#text-express-app .te-panel.te-fullscreen > .te-resize-handle,\n#text-express-app .te-panel.te-minimized > .te-resize-handle {\n  display: none;\n}\n\n#text-express-app .te-sequence-list {\n  flex: 1 1 auto;\n  min-height: 0;\n}\n\n@media (max-width: 680px) {\n  #text-express-app .te-panel.te-resizable-window,\n  #text-express-app .te-sequence-menu.te-resizable-window {\n    min-width: 0;\n    min-height: 0;\n  }\n}\n\n/* ==========================================================\n * Text Express 27.0 — fluxos opcionais de Protocolo\n * ========================================================== */\n.te-sequence-back {\n  min-width: 44px;\n  height: 38px;\n  border: 1px solid var(--te-border);\n  border-radius: 10px;\n  background: var(--te-surface-soft);\n  color: var(--te-text);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  cursor: pointer;\n  font: inherit;\n}\n\n.te-sequence-back small {\n  font-size: 10px;\n  font-weight: 800;\n  text-transform: uppercase;\n}\n\n.te-sequence-back:hover {\n  border-color: var(--te-primary);\n  color: var(--te-primary);\n}\n\n.te-protocol-workflow-menu .te-sequence-menu-icon,\n.te-protocol-workflow-menu .te-sequence-number {\n  color: #e64b4b;\n}\n\n.te-protocol-flow-actions-preview {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 8px;\n}\n\n.te-protocol-flow-actions-preview span,\n.te-protocol-action-inline,\n.te-protocol-action-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  border: 1px solid var(--te-border);\n  border-radius: 999px;\n  background: var(--te-surface-soft);\n  color: var(--te-text-muted);\n  font-size: 11px;\n  font-weight: 700;\n  line-height: 1.2;\n  padding: 4px 8px;\n}\n\n.te-protocol-action-inline {\n  width: fit-content;\n  margin-top: 4px;\n  color: var(--te-primary);\n}\n\n.te-protocol-action-badge {\n  margin-left: auto;\n  white-space: nowrap;\n}\n\n.te-protocol-flow-step-editor .te-flow-step-editor-grid {\n  align-items: start;\n}\n\n.te-protocol-flow-step-editor .te-flow-step-content-field {\n  grid-column: 1 / -1;\n}\n\n.te-protocol-flow-step-editor .te-flow-step-content-field select,\n.te-protocol-flow-step-editor .te-flow-step-content-field input {\n  width: 100%;\n}\n\n.te-protocol-flow-step-editor code {\n  font-size: 11px;\n}\n\n@media (max-width: 760px) {\n  .te-protocol-action-badge {\n    display: none;\n  }\n\n  .te-sequence-back small {\n    display: none;\n  }\n}\n\n\n/* ==========================================================\n * Text Express 27.1 — acabamento do modal e fluxo fixo de Protocolo\n * ========================================================== */\n#text-express-app #te-snippet-modal #te-modal-kicker {\n  display: none !important;\n}\n\n#text-express-app #te-snippet-modal #te-modal-title {\n  margin: 0;\n  color: var(--te-text);\n  font-size: 19px;\n  font-weight: 850;\n  letter-spacing: -.015em;\n}\n\n#text-express-app .te-protocol-flow-fixed-note {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  margin: 0;\n  padding: 9px 11px;\n  border: 1px solid color-mix(in srgb, var(--te-primary) 26%, var(--te-border));\n  border-radius: 9px;\n  background: color-mix(in srgb, var(--te-primary) 7%, var(--te-surface));\n  color: var(--te-text-muted);\n  font-size: 10px;\n  line-height: 1.45;\n}\n\n#text-express-app .te-protocol-flow-fixed-note .te-icon {\n  width: 15px;\n  height: 15px;\n  flex: 0 0 auto;\n  margin-top: 1px;\n  color: var(--te-primary);\n}\n\n#text-express-app .te-protocol-flow-step-editor > header > strong {\n  font-size: 12px;\n}\n\n#text-express-app .te-protocol-flow-step-editor .te-flow-step-content-field {\n  padding-top: 2px;\n}\n\n#text-express-app .te-protocol-flow-step-editor .te-flow-step-content-field textarea {\n  min-height: 96px;\n  resize: vertical;\n}\n\n#text-express-app .te-protocol-workflow-menu .te-sequence-item-content > .te-protocol-preview {\n  display: -webkit-box;\n  overflow: hidden;\n  color: #dbe5f3;\n  font-size: 11px;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 4;\n}\n\n#text-express-app .te-protocol-workflow-menu .te-sequence-item {\n  align-items: flex-start;\n}\n\n#text-express-app .te-protocol-workflow-menu .te-sequence-item-action {\n  padding-top: 16px;\n}\n\n@media (max-width: 560px) {\n  #text-express-app .te-model-kind-selector {\n    grid-template-columns: 1fr;\n  }\n}\n\n#text-express-app .te-model-kind-selector [data-te-kind-label] {\n  display: contents !important;\n  min-height: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  background: transparent !important;\n  box-shadow: none !important;\n}\n\n#text-express-app.te-fullscreen-active .te-model-kind-selector label > span {\n  min-height: 46px;\n  padding: 9px 13px;\n  font-size: 12px;\n}\n\n/* ==========================================================\n * Text Express 27.2 — editor flexível e pesquisa inteligente\n * ========================================================== */\n#text-express-app .te-protocol-flow-step-editor > header > strong {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#text-express-app .te-sequence-empty span {\n  max-width: 420px;\n}\n\n/* ==========================================================\n * Text Express 27.3 — cartões de Protocolo no mesmo padrão\n * visual das Falas da sequência\n * ========================================================== */\n#text-express-app .te-protocol-card-editor {\n  padding: 10px;\n}\n\n#text-express-app .te-protocol-card-editor > header {\n  min-height: 28px;\n}\n\n#text-express-app .te-protocol-card-editor > header > strong {\n  font-size: 10px;\n}\n\n#text-express-app .te-protocol-card-editor .te-protocol-text-field textarea {\n  min-height: 96px;\n}\n\n#text-express-app .te-protocol-card-editor .te-protocol-action-type-field {\n  grid-column: 1 / -1;\n  display: grid;\n  gap: 4px;\n  padding-top: 7px;\n  border-top: 1px dashed var(--te-border);\n}\n\n#text-express-app .te-protocol-card-editor .te-protocol-action-type-field > small {\n  color: var(--te-muted);\n  font-size: 9px;\n  line-height: 1.4;\n}\n\n#text-express-app .te-protocol-card-editor .te-flow-keywords-field {\n  margin-top: 1px;\n}\n\n#text-express-app .te-protocol-card-editor .te-flow-keywords-field > span,\n#text-express-app .te-protocol-card-editor .te-protocol-action-type-field > span {\n  color: var(--te-muted);\n  font-size: 9px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: .04em;\n}\n\n#text-express-app.te-fullscreen-active .te-protocol-card-editor .te-protocol-text-field textarea {\n  min-height: 120px;\n}\n\n@media (max-width: 760px) {\n  #text-express-app .te-protocol-card-editor .te-flow-optional-check {\n    align-self: start;\n  }\n}\n\n/* ==========================================================\n * Text Express 28.0 — etiqueta opcional no editor de Protocolo\n * ========================================================== */\n#text-express-app #te-protocol-label-field {\n  padding: 11px 12px;\n  border: 1px solid color-mix(in srgb, var(--te-protocol) 24%, var(--te-border));\n  border-radius: 11px;\n  background: color-mix(in srgb, var(--te-protocol) 5%, var(--te-surface));\n}\n\n#text-express-app #te-protocol-label-field > span {\n  color: var(--te-protocol);\n}\n\n#text-express-app #te-form-system-label:focus {\n  border-color: var(--te-protocol);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--te-protocol) 15%, transparent);\n}\n\n/* Text Express 28.0.2 — confirmações pequenas das etiquetas. */\n#text-express-app .te-toast.te-label-notice {\n  justify-self: center;\n  width: max-content;\n  max-width: min(330px, calc(100vw - 40px));\n  gap: 6px;\n  padding: 7px 10px;\n  border-left-width: 3px;\n  border-radius: 8px;\n  font-size: 10px;\n  line-height: 1.25;\n  box-shadow: 0 8px 22px rgba(9, 23, 47, 0.16);\n}\n\n#text-express-app .te-toast.te-label-notice .te-icon {\n  width: 13px;\n  height: 13px;\n}\n\n\n/* Text Express 28.0.6 — dados rápidos do contato em Protocolos. */\n.te-protocol-contact-modal {\n  width: min(620px, calc(100vw - 32px));\n}\n\n.te-protocol-contact-body {\n  display: grid;\n  gap: 16px;\n  padding: 18px 20px 4px;\n}\n\n.te-contact-fieldset {\n  min-width: 0;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n\n.te-contact-fieldset > legend {\n  margin-bottom: 9px;\n  font-size: 12px;\n  font-weight: 800;\n  color: var(--te-muted, #64748b);\n  letter-spacing: .02em;\n}\n\n.te-contact-choice-grid,\n.te-contact-mode-grid {\n  display: grid;\n  gap: 8px;\n}\n\n.te-contact-choice-grid {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.te-contact-mode-grid {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.te-contact-choice-grid label,\n.te-contact-mode-grid label {\n  position: relative;\n  min-width: 0;\n  cursor: pointer;\n}\n\n.te-contact-choice-grid input,\n.te-contact-mode-grid input {\n  position: absolute;\n  inline-size: 1px;\n  block-size: 1px;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.te-contact-choice-grid span,\n.te-contact-mode-grid span {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 40px;\n  padding: 8px 10px;\n  border: 1px solid var(--te-border, #dbe3ee);\n  border-radius: 10px;\n  background: var(--te-surface, #fff);\n  color: var(--te-text, #182230);\n  font-size: 12px;\n  font-weight: 750;\n  line-height: 1.25;\n  text-align: center;\n  transition: border-color .14s ease, background .14s ease, box-shadow .14s ease;\n}\n\n.te-contact-choice-grid input:checked + span,\n.te-contact-mode-grid input:checked + span {\n  border-color: var(--te-primary, #2563eb);\n  background: color-mix(in srgb, var(--te-primary, #2563eb) 10%, var(--te-surface, #fff));\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--te-primary, #2563eb) 14%, transparent);\n  color: var(--te-primary, #2563eb);\n}\n\n.te-contact-choice-grid input:focus-visible + span,\n.te-contact-mode-grid input:focus-visible + span {\n  outline: 2px solid var(--te-primary, #2563eb);\n  outline-offset: 2px;\n}\n\n.te-contact-field-muted {\n  opacity: .56;\n}\n\n.te-contact-preview-note {\n  margin: -2px 0 0;\n  color: var(--te-muted, #64748b);\n  font-size: 11px;\n  line-height: 1.45;\n}\n\n@media (max-width: 640px) {\n  .te-protocol-contact-body {\n    padding-inline: 14px;\n  }\n\n  .te-contact-choice-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n\n/* Text Express 28.0.6 — padronização visual das sequências. */\n#text-express-app .te-flow-card > .te-card-icon .te-icon {\n  width: 18px;\n  height: 18px;\n}\n\n#text-express-app .te-flow-card .te-card-insert {\n  font-weight: 800;\n  letter-spacing: .01em;\n}\n";

    if (!documentRef.getElementById("text-express-app")) {
      const parsed = new DOMParser().parseFromString(
        "<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <meta name=\"color-scheme\" content=\"light dark\">\n  <title>Text Express</title>\n  <link rel=\"stylesheet\" href=\"styles.css\">\n</head>\n<body class=\"te-page\">\n  <main class=\"te-demo-page\" aria-label=\"Página demonstrativa do Text Express\">\n    <section class=\"te-demo-card\">\n      <span class=\"te-demo-eyebrow\">Demonstração local</span>\n      <h1>Text Express</h1>\n      <p>Use o campo abaixo para testar os atalhos. Por exemplo, digite <strong>/sky</strong> e pressione Espaço.</p>\n      <label for=\"te-demo-message\">Mensagem de atendimento</label>\n      <textarea id=\"te-demo-message\" rows=\"8\" placeholder=\"Digite uma mensagem ou um atalho...\"></textarea>\n      <label for=\"te-demo-protocol\">Registro do protocolo</label>\n      <textarea id=\"te-demo-protocol\" rows=\"8\" placeholder=\"Digite um protocolo ou use o painel...\"></textarea>\n    </section>\n  </main>\n\n  <div id=\"text-express-app\" class=\"te-app\" data-version=\"28.0.6\">\n    <svg class=\"te-icon-sprite\" aria-hidden=\"true\" focusable=\"false\">\n      <symbol id=\"te-i-zap\" viewBox=\"0 0 24 24\"><path d=\"M13 2 3 14h9l-1 8 10-12h-9l1-8Z\"/></symbol>\n      <symbol id=\"te-i-message-circle\" viewBox=\"0 0 24 24\"><path d=\"M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.6-4.2A8.5 8.5 0 1 1 21 11.5Z\"/><path d=\"M8 12h.01M12 12h.01M16 12h.01\"/></symbol>\n      <symbol id=\"te-i-file-text\" viewBox=\"0 0 24 24\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z\"/><path d=\"M14 2v6h6M8 13h8M8 17h8M8 9h2\"/></symbol>\n      <symbol id=\"te-i-star\" viewBox=\"0 0 24 24\"><path d=\"m12 2 3 6.1 6.7 1-4.9 4.7 1.2 6.7-6-3.2-6 3.2 1.2-6.7-4.9-4.7 6.7-1Z\"/></symbol>\n      <symbol id=\"te-i-moon\" viewBox=\"0 0 24 24\"><path d=\"M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z\"/></symbol>\n      <symbol id=\"te-i-sun\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4\"/></symbol>\n      <symbol id=\"te-i-minus\" viewBox=\"0 0 24 24\"><path d=\"M5 12h14\"/></symbol>\n      <symbol id=\"te-i-maximize-2\" viewBox=\"0 0 24 24\"><path d=\"M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7\"/></symbol>\n      <symbol id=\"te-i-minimize-2\" viewBox=\"0 0 24 24\"><path d=\"M4 14h6v6M20 10h-6V4M10 14l-7 7M14 10l7-7\"/></symbol>\n      <symbol id=\"te-i-x\" viewBox=\"0 0 24 24\"><path d=\"m18 6-12 12M6 6l12 12\"/></symbol>\n      <symbol id=\"te-i-search\" viewBox=\"0 0 24 24\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m20 20-4-4\"/></symbol>\n      <symbol id=\"te-i-plus\" viewBox=\"0 0 24 24\"><path d=\"M12 5v14M5 12h14\"/></symbol>\n      <symbol id=\"te-i-settings\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1H21v4h-.1a1.7 1.7 0 0 0-1.5 1Z\"/></symbol>\n      <symbol id=\"te-i-upload\" viewBox=\"0 0 24 24\"><path d=\"M12 16V4M7 9l5-5 5 5M5 20h14\"/></symbol>\n      <symbol id=\"te-i-download\" viewBox=\"0 0 24 24\"><path d=\"M12 4v12M7 11l5 5 5-5M5 20h14\"/></symbol>\n      <symbol id=\"te-i-rotate-ccw\" viewBox=\"0 0 24 24\"><path d=\"M3 12a9 9 0 1 0 3-6.7L3 8\"/><path d=\"M3 3v5h5\"/></symbol>\n      <symbol id=\"te-i-edit\" viewBox=\"0 0 24 24\"><path d=\"M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z\"/></symbol>\n      <symbol id=\"te-i-trash\" viewBox=\"0 0 24 24\"><path d=\"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6\"/></symbol>\n      <symbol id=\"te-i-send\" viewBox=\"0 0 24 24\"><path d=\"m22 2-7 20-4-9-9-4Z\"/><path d=\"M22 2 11 13\"/></symbol>\n      <symbol id=\"te-i-copy\" viewBox=\"0 0 24 24\"><rect x=\"9\" y=\"9\" width=\"11\" height=\"11\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></symbol>\n      <symbol id=\"te-i-chevron-left\" viewBox=\"0 0 24 24\"><path d=\"m15 18-6-6 6-6\"/></symbol>\n      <symbol id=\"te-i-chevron-right\" viewBox=\"0 0 24 24\"><path d=\"m9 18 6-6-6-6\"/></symbol>\n      <symbol id=\"te-i-folder\" viewBox=\"0 0 24 24\"><path d=\"M3 5h7l2 2h9v12H3Z\"/></symbol>\n      <symbol id=\"te-i-wifi\" viewBox=\"0 0 24 24\"><path d=\"M5 12.6a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a14 14 0 0 1 20 0\"/><circle cx=\"12\" cy=\"20\" r=\"1\"/></symbol>\n      <symbol id=\"te-i-globe\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18\"/></symbol>\n      <symbol id=\"te-i-phone\" viewBox=\"0 0 24 24\"><path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z\"/></symbol>\n      <symbol id=\"te-i-monitor\" viewBox=\"0 0 24 24\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"M8 21h8M12 17v4\"/></symbol>\n      <symbol id=\"te-i-wrench\" viewBox=\"0 0 24 24\"><path d=\"M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L20 16.4a2.1 2.1 0 0 1-3 3l-7.7-7.7\"/></symbol>\n      <symbol id=\"te-i-server\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"7\" rx=\"2\"/><rect x=\"3\" y=\"14\" width=\"18\" height=\"7\" rx=\"2\"/><path d=\"M7 6h.01M7 17h.01\"/></symbol>\n      <symbol id=\"te-i-wallet\" viewBox=\"0 0 24 24\"><path d=\"M20 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h16v10H5a3 3 0 0 1-3-3V6\"/><path d=\"M16 13h2\"/></symbol>\n      <symbol id=\"te-i-radio\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"2\"/><path d=\"M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5\"/></symbol>\n      <symbol id=\"te-i-users\" viewBox=\"0 0 24 24\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8\"/></symbol>\n      <symbol id=\"te-i-network\" viewBox=\"0 0 24 24\"><rect x=\"9\" y=\"2\" width=\"6\" height=\"6\" rx=\"1\"/><rect x=\"2\" y=\"16\" width=\"6\" height=\"6\" rx=\"1\"/><rect x=\"16\" y=\"16\" width=\"6\" height=\"6\" rx=\"1\"/><path d=\"M12 8v4M5 16v-4h14v4\"/></symbol>\n      <symbol id=\"te-i-layout-grid\" viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/></symbol>\n      <symbol id=\"te-i-reply\" viewBox=\"0 0 24 24\"><path d=\"m9 17-5-5 5-5M4 12h10a6 6 0 0 1 6 6v1\"/></symbol>\n      <symbol id=\"te-i-clipboard-list\" viewBox=\"0 0 24 24\"><rect x=\"5\" y=\"4\" width=\"14\" height=\"18\" rx=\"2\"/><path d=\"M9 4V2h6v2M9 10h6M9 14h6M9 18h4\"/></symbol>\n      <symbol id=\"te-i-alert-triangle\" viewBox=\"0 0 24 24\"><path d=\"M10.3 3.7 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z\"/><path d=\"M12 9v4M12 17h.01\"/></symbol>\n      <symbol id=\"te-i-compass\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m16 8-2.5 5.5L8 16l2.5-5.5Z\"/></symbol>\n      <symbol id=\"te-i-check-circle\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m8 12 3 3 5-6\"/></symbol>\n      <symbol id=\"te-i-play-circle\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m10 8 6 4-6 4Z\"/></symbol>\n      <symbol id=\"te-i-clock\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></symbol>\n      <symbol id=\"te-i-tag\" viewBox=\"0 0 24 24\"><path d=\"M20 13 13 20l-9-9V4h7Z\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1\"/></symbol>\n      <symbol id=\"te-i-headphones\" viewBox=\"0 0 24 24\"><path d=\"M4 14a8 8 0 0 1 16 0M4 14v5h4v-6H4M20 14v5h-4v-6h4\"/></symbol>\n      <symbol id=\"te-i-shield-check\" viewBox=\"0 0 24 24\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z\"/><path d=\"m9 12 2 2 4-4\"/></symbol>\n      <symbol id=\"te-i-database\" viewBox=\"0 0 24 24\"><ellipse cx=\"12\" cy=\"5\" rx=\"8\" ry=\"3\"/><path d=\"M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6\"/></symbol>\n      <symbol id=\"te-i-smartphone\" viewBox=\"0 0 24 24\"><rect x=\"6\" y=\"2\" width=\"12\" height=\"20\" rx=\"2\"/><path d=\"M10 18h4\"/></symbol>\n      <symbol id=\"te-i-package\" viewBox=\"0 0 24 24\"><path d=\"m12 2 9 5-9 5-9-5Z\"/><path d=\"m3 7 9 5 9-5v10l-9 5-9-5Z\"/></symbol>\n      <symbol id=\"te-i-map-pin\" viewBox=\"0 0 24 24\"><path d=\"M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"2\"/></symbol>\n      <symbol id=\"te-i-bell\" viewBox=\"0 0 24 24\"><path d=\"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4\"/></symbol>\n      <symbol id=\"te-i-palette\" viewBox=\"0 0 24 24\"><path d=\"M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h3a6 6 0 0 0 0-12Z\"/><circle cx=\"7\" cy=\"10\" r=\"1\"/><circle cx=\"9\" cy=\"6\" r=\"1\"/><circle cx=\"14\" cy=\"6\" r=\"1\"/></symbol>\n      <symbol id=\"te-i-save\" viewBox=\"0 0 24 24\"><path d=\"M5 3h12l2 2v16H5Z\"/><path d=\"M8 3v6h8V3M8 21v-7h8v7\"/></symbol>\n      <symbol id=\"te-i-info\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5M12 8h.01\"/></symbol>\n      <symbol id=\"te-i-sliders\" viewBox=\"0 0 24 24\"><path d=\"M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6\"/></symbol>\n      <symbol id=\"te-i-check\" viewBox=\"0 0 24 24\"><path d=\"m5 12 4 4L19 6\"/></symbol>\n      <symbol id=\"te-i-more-horizontal\" viewBox=\"0 0 24 24\"><circle cx=\"5\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"19\" cy=\"12\" r=\"1\"/></symbol>\n    </svg>\n    <section class=\"te-panel te-hidden\" role=\"dialog\" aria-label=\"Text Express\" aria-modal=\"false\">\n      <header class=\"te-header\" data-te-drag-handle>\n        <div class=\"te-brand\">\n          <span class=\"te-brand-icon\" aria-hidden=\"true\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-zap\"></use></svg></span>\n          <div>\n            <strong>Text Express</strong>\n            <span class=\"te-subtitle\">Atendimento e protocolos</span>\n          </div>\n        </div>\n\n        <div class=\"te-header-actions\">\n          <span class=\"te-count-badge\" id=\"te-count-badge\" aria-live=\"polite\">0 modelos</span>\n          <button class=\"te-icon-button\" type=\"button\" data-te-action=\"theme\" title=\"Alternar tema\" aria-label=\"Alternar tema\">\n            <span class=\"te-theme-icon\" aria-hidden=\"true\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-moon\"></use></svg></span>\n          </button>\n          <button class=\"te-icon-button\" type=\"button\" data-te-action=\"minimize\" title=\"Recolher para o ícone\" aria-label=\"Recolher para o ícone\">\n            <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-minus\"></use></svg>\n          </button>\n          <button class=\"te-icon-button te-fullscreen-button\" type=\"button\" data-te-action=\"fullscreen\" title=\"Preencher toda a tela\" aria-label=\"Preencher toda a tela\" aria-pressed=\"false\">\n            <svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-maximize-2\"></use></svg>\n          </button>\n          <button class=\"te-icon-button\" type=\"button\" data-te-action=\"close\" title=\"Fechar painel e manter o ícone\" aria-label=\"Fechar painel e manter o ícone\">\n            <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-x\"></use></svg>\n          </button>\n        </div>\n      </header>\n\n      <div class=\"te-expandable\">\n        <nav class=\"te-main-tabs\" aria-label=\"Tipos de modelo\">\n          <button class=\"te-main-tab te-active\" type=\"button\" data-te-type=\"atendimento\">\n            <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-message-circle\"></use></svg> Atendimento\n          </button>\n          <button class=\"te-main-tab\" type=\"button\" data-te-type=\"protocolo\">\n            <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-file-text\"></use></svg> Protocolo\n          </button>\n          <button class=\"te-main-tab\" type=\"button\" data-te-type=\"favoritos\">\n            <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-star\"></use></svg> Favoritos\n          </button>\n        </nav>\n\n        <section class=\"te-toolbar\" aria-label=\"Busca e criação\">\n          <label class=\"te-search-box\">\n            <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-search\"></use></svg>\n            <input id=\"te-search-input\" type=\"search\" autocomplete=\"off\" placeholder=\"Buscar por nome, atalho ou conteúdo...\" aria-label=\"Buscar modelos\">\n          </label>\n          <button class=\"te-primary-button\" type=\"button\" data-te-action=\"new\">\n            <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-plus\"></use></svg> Novo\n          </button>\n        </section>\n\n        <nav class=\"te-category-bar\" id=\"te-category-bar\" aria-label=\"Categorias. Arraste horizontalmente para visualizar mais opções.\" tabindex=\"0\"></nav>\n\n        <section class=\"te-content-area\">\n          <div class=\"te-list-pane\">\n            <div class=\"te-list\" id=\"te-snippet-list\" aria-live=\"polite\"></div>\n            <div class=\"te-empty-state te-hidden\" id=\"te-empty-state\">\n              <svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-search\"></use></svg>\n              <strong>Nenhum modelo encontrado</strong>\n              <p>Altere os filtros ou crie um novo modelo.</p>\n            </div>\n          </div>\n\n          <aside class=\"te-detail-pane\" id=\"te-detail-pane\" aria-label=\"Detalhes do modelo\">\n            <div class=\"te-detail-empty\">\n              <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-zap\"></use></svg>\n              <strong>Selecione um modelo</strong>\n              <p>Veja o conteúdo completo, as variáveis e o atalho de ativação.</p>\n            </div>\n          </aside>\n        </section>\n\n        <footer class=\"te-footer\">\n          <div class=\"te-status\" id=\"te-status-counts\">Atendimento: 0 · Protocolo: 0 · Total: 0</div>\n          <div class=\"te-footer-actions\">\n            <button class=\"te-secondary-button\" type=\"button\" data-te-action=\"settings\" title=\"Configurações\">\n              <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-settings\"></use></svg> Configurações\n            </button>\n            <button class=\"te-secondary-button\" type=\"button\" data-te-action=\"import\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-upload\"></use></svg> Importar</button>\n            <button class=\"te-secondary-button\" type=\"button\" data-te-action=\"export\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-download\"></use></svg> Exportar</button>\n            <button class=\"te-danger-button\" type=\"button\" data-te-action=\"reset\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-rotate-ccw\"></use></svg> Restaurar padrões</button>\n          </div>\n        </footer>\n      </div>\n    </section>\n\n    <button class=\"te-reopen-button\" type=\"button\" data-te-action=\"reopen\" title=\"Clique para abrir ou arraste para mover\" aria-label=\"Abrir ou mover o Text Express\"><span class=\"te-launcher-label\">Abrir Text Express</span>\n      <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-zap\"></use></svg>\n    </button>\n\n    <input class=\"te-hidden\" id=\"te-import-input\" type=\"file\" accept=\"application/json,.json\">\n\n    <div class=\"te-modal-backdrop te-hidden\" id=\"te-snippet-modal\" role=\"presentation\">\n      <section class=\"te-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"te-modal-title\">\n        <header class=\"te-modal-header\">\n          <div>\n            <span class=\"te-modal-kicker te-hidden\" id=\"te-modal-kicker\" aria-hidden=\"true\"></span>\n            <h2 id=\"te-modal-title\">Criar modelo</h2>\n          </div>\n          <button class=\"te-icon-button\" type=\"button\" data-te-action=\"modal-close\" aria-label=\"Fechar modal\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-x\"></use></svg></button>\n        </header>\n\n        <form id=\"te-snippet-form\" novalidate>\n          <input id=\"te-form-id\" type=\"hidden\">\n\n          <fieldset class=\"te-type-selector\">\n            <legend>Tipo</legend>\n            <label>\n              <input type=\"radio\" name=\"te-type\" value=\"atendimento\" checked>\n              <span><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-message-circle\"></use></svg> Atendimento</span>\n            </label>\n            <label>\n              <input type=\"radio\" name=\"te-type\" value=\"protocolo\">\n              <span><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-file-text\"></use></svg> Protocolo</span>\n            </label>\n          </fieldset>\n\n          <fieldset class=\"te-model-kind-selector te-hidden\" id=\"te-model-kind-selector\">\n            <legend id=\"te-model-kind-legend\">Formato do atendimento</legend>\n            <label>\n              <input type=\"radio\" name=\"te-model-kind\" value=\"unico\" checked>\n              <span><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-message-circle\"></use></svg> <span data-te-kind-label=\"unico\">Fala única</span></span>\n            </label>\n            <label>\n              <input type=\"radio\" name=\"te-model-kind\" value=\"fluxo\">\n              <span><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-clipboard-list\"></use></svg> <span data-te-kind-label=\"fluxo\">Sequência de falas</span></span>\n            </label>\n          </fieldset>\n\n          <div class=\"te-form-grid\">\n            <label class=\"te-field te-field-wide\">\n              <span>Nome do modelo</span>\n              <input id=\"te-form-name\" type=\"text\" maxlength=\"100\" required placeholder=\"Ex.: Solicitar reinício dos equipamentos\">\n              <small class=\"te-field-error\" data-te-error=\"name\"></small>\n            </label>\n\n            <label class=\"te-field te-field-wide\">\n              <span>Atalho de ativação</span>\n              <div class=\"te-input-with-action\">\n                <input id=\"te-form-shortcut\" type=\"text\" maxlength=\"60\" required spellcheck=\"false\" placeholder=\"/reiniciar\">\n                <button type=\"button\" class=\"te-inline-button\" data-te-action=\"suggest-shortcut\"><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-zap\"></use></svg> Sugerir</button>\n              </div>\n              <small>Você escolhe o comando. Ele sempre começará com “/”.</small>\n              <small class=\"te-field-error\" data-te-error=\"shortcut\"></small>\n            </label>\n\n            <label class=\"te-field\">\n              <span>Expandir ao pressionar</span>\n              <select id=\"te-form-trigger\">\n                <option value=\"space\">Espaço</option>\n                <option value=\"tab\">Tab</option>\n                <option value=\"enter\">Enter</option>\n              </select>\n            </label>\n\n            <div class=\"te-field\">\n              <span>Categoria</span>\n              <div class=\"te-input-with-action te-category-select-row\">\n                <select id=\"te-form-category\" aria-label=\"Categoria do modelo\"></select>\n                <button type=\"button\" class=\"te-inline-icon-button\" data-te-action=\"category-add-from-form\" title=\"Criar categoria\" aria-label=\"Criar categoria\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-plus\"></use></svg></button>\n              </div>\n            </div>\n\n            <label class=\"te-field te-field-wide te-hidden\" id=\"te-protocol-label-field\">\n              <span>Etiqueta automática do protocolo</span>\n              <input id=\"te-form-system-label\" type=\"text\" maxlength=\"180\" list=\"te-system-label-options\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"Pesquise uma etiqueta ou digite uma nova\">\n              <datalist id=\"te-system-label-options\"></datalist>\n              <small>Opcional. Vale para o cartão inteiro e, em cartões com sequência, é usada uma única vez mesmo ao trocar de opção.</small>\n            </label>\n\n            <div class=\"te-field te-field-wide\" id=\"te-single-content-wrap\">\n              <label>\n                <span>Conteúdo do modelo</span>\n                <textarea id=\"te-form-content\" rows=\"7\" placeholder=\"Digite o texto que será inserido...\"></textarea>\n              </label>\n              <small class=\"te-field-error\" data-te-error=\"content\"></small>\n            </div>\n\n            <section class=\"te-flow-editor te-field-wide te-hidden\" id=\"te-flow-editor\" aria-label=\"Editor da sequência de falas\">\n              <div class=\"te-flow-editor-heading\">\n                <div>\n                  <strong id=\"te-flow-editor-title\">Falas da sequência</strong>\n                  <small id=\"te-flow-editor-help\">O atalho principal abre a sequência. Os atalhos numerados inserem uma fala diretamente.</small>\n                </div>\n                <button class=\"te-secondary-button te-compact-button\" type=\"button\" data-te-action=\"flow-step-add\">\n                  <svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-plus\"></use></svg> <span id=\"te-flow-add-label\">Adicionar fala</span>\n                </button>\n              </div>\n              <div class=\"te-flow-editor-steps\" id=\"te-flow-editor-steps\"></div>\n              <small class=\"te-field-error\" id=\"te-flow-error\"></small>\n            </section>\n\n            <div class=\"te-field te-field-wide\">\n              <span>Variáveis detectadas</span>\n              <div class=\"te-variable-tags\" id=\"te-variable-preview\">\n                <span class=\"te-muted\">Nenhuma variável encontrada.</span>\n              </div>\n              <small>Use o formato <code>[nome]</code>, <code>[prazo]</code> ou qualquer outro campo entre colchetes.</small>\n            </div>\n\n            <label class=\"te-check-field te-field-wide\">\n              <input id=\"te-form-favorite\" type=\"checkbox\">\n              <span>Adicionar aos favoritos</span>\n            </label>\n          </div>\n\n          <footer class=\"te-modal-footer te-model-modal-footer\">\n            <span class=\"te-model-save-status\" id=\"te-model-save-status\" role=\"status\" aria-live=\"polite\"></span>\n            <span class=\"te-modal-footer-spacer\"></span>\n            <button class=\"te-secondary-button\" type=\"button\" data-te-action=\"modal-close\"><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-x\"></use></svg> Fechar</button>\n            <button class=\"te-primary-button\" type=\"submit\"><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-save\"></use></svg> Salvar e concluir</button>\n          </footer>\n        </form>\n      </section>\n    </div>\n\n\n    <div class=\"te-modal-backdrop te-hidden\" id=\"te-category-modal\" role=\"presentation\">\n      <section class=\"te-modal te-category-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"te-category-modal-title\">\n        <header class=\"te-modal-header\">\n          <div class=\"te-modal-heading-with-icon\"><span class=\"te-modal-heading-icon\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-palette\"></use></svg></span><div>\n            <span class=\"te-modal-kicker\" id=\"te-category-modal-kicker\">Nova categoria</span>\n            <h2 id=\"te-category-modal-title\">Criar categoria</h2>\n          </div></div>\n          <button class=\"te-icon-button\" type=\"button\" data-te-action=\"category-close\" aria-label=\"Fechar\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-x\"></use></svg></button>\n        </header>\n        <form id=\"te-category-form\" novalidate>\n          <input id=\"te-category-form-id\" type=\"hidden\">\n          <input id=\"te-category-form-icon\" type=\"hidden\" value=\"folder\">\n          <fieldset class=\"te-type-selector te-category-type-selector\">\n            <legend>Exibir em</legend>\n            <label><input type=\"radio\" name=\"te-category-type\" value=\"atendimento\" checked><span><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-message-circle\"></use></svg> Atendimento</span></label>\n            <label><input type=\"radio\" name=\"te-category-type\" value=\"protocolo\"><span><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-file-text\"></use></svg> Protocolo</span></label>\n          </fieldset>\n          <div class=\"te-form-grid\">\n            <label class=\"te-field te-field-wide\"><span>Nome da categoria</span><input id=\"te-category-form-name\" maxlength=\"48\" placeholder=\"Ex.: Cobranças e pagamentos\" required><small class=\"te-field-error\" id=\"te-category-name-error\"></small></label>\n            <div class=\"te-field te-field-wide\"><span>Ícone</span><div class=\"te-icon-choice-grid\" id=\"te-category-icon-grid\"></div></div>\n            <div class=\"te-field\"><span>Cor da categoria</span><div class=\"te-color-picker-row\"><input id=\"te-category-form-color\" type=\"color\" value=\"#4f7cff\"><div class=\"te-color-choice-grid\" id=\"te-category-color-grid\"></div></div></div>\n            <div class=\"te-field\"><span>Pré-visualização</span><div class=\"te-category-preview\" id=\"te-category-preview\"></div><small id=\"te-category-usage\">A categoria será salva no navegador.</small></div>\n          </div>\n          <div class=\"te-category-order-actions\">\n            <button id=\"te-category-move-left\" class=\"te-secondary-button te-hidden\" type=\"button\" data-te-action=\"category-move-left\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-chevron-left\"></use></svg> Mover à esquerda</button>\n            <button id=\"te-category-move-right\" class=\"te-secondary-button te-hidden\" type=\"button\" data-te-action=\"category-move-right\">Mover à direita <svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-chevron-right\"></use></svg></button>\n          </div>\n          <footer class=\"te-modal-footer te-category-modal-footer\">\n            <button id=\"te-category-delete-button\" class=\"te-danger-button te-hidden\" type=\"button\" data-te-action=\"category-delete\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-trash\"></use></svg> Excluir categoria</button>\n            <span class=\"te-modal-footer-spacer\"></span>\n            <button class=\"te-secondary-button\" type=\"button\" data-te-action=\"category-close\">Cancelar</button>\n            <button class=\"te-primary-button\" type=\"submit\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-save\"></use></svg> Salvar categoria</button>\n          </footer>\n        </form>\n      </section>\n    </div>\n\n    <div class=\"te-modal-backdrop te-hidden\" id=\"te-variable-modal\" role=\"presentation\">\n      <section class=\"te-modal te-variable-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"te-variable-title\">\n        <header class=\"te-modal-header\">\n          <div>\n            <span class=\"te-modal-kicker\">Preencher modelo</span>\n            <h2 id=\"te-variable-title\">Informe as variáveis</h2>\n          </div>\n          <button class=\"te-icon-button\" type=\"button\" data-te-action=\"variable-cancel\" aria-label=\"Cancelar preenchimento\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-x\"></use></svg></button>\n        </header>\n        <form id=\"te-variable-form\">\n          <p class=\"te-variable-help\">Os valores abaixo serão substituídos no texto antes da inserção. O nome informado em <code>[atendente]</code> será lembrado automaticamente neste navegador.</p>\n          <div class=\"te-variable-fields\" id=\"te-variable-fields\"></div>\n          <footer class=\"te-modal-footer\">\n            <button class=\"te-secondary-button\" type=\"button\" data-te-action=\"variable-cancel\"><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-x\"></use></svg> Cancelar</button>\n            <button class=\"te-primary-button\" type=\"submit\"><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-check\"></use></svg> Aplicar e inserir</button>\n          </footer>\n        </form>\n      </section>\n    </div>\n\n    <div class=\"te-modal-backdrop te-hidden\" id=\"te-protocol-contact-modal\" role=\"presentation\">\n      <section class=\"te-modal te-protocol-contact-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"te-protocol-contact-title\">\n        <header class=\"te-modal-header\">\n          <div>\n            <span class=\"te-modal-kicker\">Somente Protocolo</span>\n            <h2 id=\"te-protocol-contact-title\">Dados do contato</h2>\n          </div>\n          <button class=\"te-icon-button\" type=\"button\" data-te-action=\"protocol-contact-cancel\" aria-label=\"Cancelar inserção\"><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-x\"></use></svg></button>\n        </header>\n        <form id=\"te-protocol-contact-form\" novalidate>\n          <div class=\"te-protocol-contact-body\">\n            <fieldset class=\"te-contact-fieldset\">\n              <legend>Quem fez o contato?</legend>\n              <div class=\"te-contact-choice-grid te-contact-role-grid\">\n                <label><input type=\"radio\" name=\"te-protocol-contact-role\" value=\"Titular\" checked><span>Titular</span></label>\n                <label><input type=\"radio\" name=\"te-protocol-contact-role\" value=\"Filho(a) do titular\"><span>Filho(a) do titular</span></label>\n                <label><input type=\"radio\" name=\"te-protocol-contact-role\" value=\"Irmão(ã)\"><span>Irmão(ã)</span></label>\n                <label><input type=\"radio\" name=\"te-protocol-contact-role\" value=\"Amigo(a)\"><span>Amigo(a)</span></label>\n                <label><input type=\"radio\" name=\"te-protocol-contact-role\" value=\"Esposo(a)\"><span>Esposo(a)</span></label>\n                <label><input type=\"radio\" name=\"te-protocol-contact-role\" value=\"Funcionário(a)\"><span>Funcionário(a)</span></label>\n                <label><input type=\"radio\" name=\"te-protocol-contact-role\" value=\"Outro\"><span>Outro</span></label>\n              </div>\n            </fieldset>\n\n            <label class=\"te-field te-hidden\" id=\"te-protocol-contact-relation-field\">\n              <span>Relação com o titular</span>\n              <input id=\"te-protocol-contact-relation\" type=\"text\" maxlength=\"80\" autocomplete=\"off\" placeholder=\"Ex.: Vizinho, Cunhado, Síndico\">\n              <small class=\"te-field-error\" id=\"te-protocol-contact-relation-error\"></small>\n            </label>\n\n            <label class=\"te-field te-hidden\" id=\"te-protocol-contact-name-field\">\n              <span>Nome de quem fez o contato</span>\n              <input id=\"te-protocol-contact-name\" type=\"text\" maxlength=\"80\" autocomplete=\"off\" placeholder=\"Ex.: João\">\n              <small class=\"te-field-error\" id=\"te-protocol-contact-name-error\"></small>\n            </label>\n\n            <fieldset class=\"te-contact-fieldset\">\n              <legend>Contato</legend>\n              <div class=\"te-contact-mode-grid\">\n                <label><input type=\"radio\" name=\"te-protocol-contact-mode\" value=\"number\" checked><span>Informar número</span></label>\n                <label><input type=\"radio\" name=\"te-protocol-contact-mode\" value=\"anonymous\"><span>Contato anônimo</span></label>\n              </div>\n            </fieldset>\n\n            <label class=\"te-field\" id=\"te-protocol-contact-number-field\">\n              <span>Número do contato</span>\n              <input id=\"te-protocol-contact-number\" type=\"text\" maxlength=\"40\" inputmode=\"tel\" autocomplete=\"off\" placeholder=\"Ex.: 8199999-9999\">\n              <small class=\"te-field-error\" id=\"te-protocol-contact-number-error\"></small>\n            </label>\n\n            <p class=\"te-contact-preview-note\">O Text Express adicionará esses dados somente ao protocolo que está sendo inserido.</p>\n          </div>\n          <footer class=\"te-modal-footer\">\n            <button class=\"te-secondary-button\" type=\"button\" data-te-action=\"protocol-contact-cancel\"><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-x\"></use></svg> Cancelar</button>\n            <button class=\"te-primary-button\" type=\"submit\"><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-check\"></use></svg> Inserir protocolo</button>\n          </footer>\n        </form>\n      </section>\n    </div>\n\n    <div class=\"te-modal-backdrop te-hidden\" id=\"te-settings-modal\" role=\"presentation\">\n      <section class=\"te-modal te-settings-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"te-settings-title\">\n        <header class=\"te-modal-header\">\n          <div>\n            <span class=\"te-modal-kicker\">Preferências</span>\n            <h2 id=\"te-settings-title\">Configurações</h2>\n          </div>\n          <button class=\"te-icon-button\" type=\"button\" data-te-action=\"settings-close\" aria-label=\"Fechar configurações\"><svg class=\"te-icon \" aria-hidden=\"true\"><use href=\"#te-i-x\"></use></svg></button>\n        </header>\n        <form id=\"te-settings-form\">\n          <div class=\"te-settings-list\">\n            <div class=\"te-setting-profile\">\n              <label for=\"te-setting-attendant-name\">\n                <span>\n                  <strong>Nome do atendente</strong>\n                  <small>Preenchido automaticamente sempre que um modelo usar <code>[atendente]</code>.</small>\n                </span>\n                <input id=\"te-setting-attendant-name\" type=\"text\" maxlength=\"80\" autocomplete=\"name\" placeholder=\"Digite seu nome\">\n              </label>\n              <button class=\"te-secondary-button te-setting-clear-button\" type=\"button\" data-te-action=\"clear-attendant\">Limpar nome lembrado</button>\n            </div>\n            <label class=\"te-setting-row\">\n              <span>\n                <strong>Expansão automática</strong>\n                <small>Substituir atalhos digitados nos campos de texto.</small>\n              </span>\n              <input id=\"te-setting-auto-expand\" type=\"checkbox\" checked>\n            </label>\n            <label class=\"te-setting-row\">\n              <span>\n                <strong>Manter painel aberto após inserir</strong>\n                <small>Útil para inserir vários textos durante o mesmo atendimento.</small>\n              </span>\n              <input id=\"te-setting-keep-open\" type=\"checkbox\" checked>\n            </label>\n            <label class=\"te-setting-row\">\n              <span>\n                <strong>Confirmar antes de excluir</strong>\n                <small>Evita remoções acidentais.</small>\n              </span>\n              <input id=\"te-setting-confirm-delete\" type=\"checkbox\" checked>\n            </label>\n          </div>\n          <div class=\"te-keyboard-help\">\n            <strong>Atalho global</strong>\n            <span><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> abre ou reabre o painel.</span>\n          </div>\n          <footer class=\"te-modal-footer\">\n            <button class=\"te-primary-button\" type=\"submit\"><svg class=\"te-icon\" aria-hidden=\"true\"><use href=\"#te-i-save\"></use></svg> Salvar configurações</button>\n          </footer>\n        </form>\n      </section>\n    </div>\n\n    <div class=\"te-toast-stack\" id=\"te-toast-stack\" aria-live=\"polite\" aria-atomic=\"true\"></div>\n  </div>\n\n  <script src=\"app.js\"></script>\n</body>\n</html>\n",
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
      "O Text Express não conseguiu preparar a interface nesta página.\n" +
      "Detalhe: " + (error?.message || String(error))
    );
  }
})();

if (!window.__textExpressStandaloneSkipBundle) {
  try {
/*
 * Text Express 28.0.6
 * Expansor de textos para atendimento e registro de protocolos.
 * Sem dependências externas.
 */
(() => {
  "use strict";

  const APP_VERSION = "28.0.6";
  const STORAGE_KEYS = Object.freeze({
    snippets: "text_express_snippets",
    darkMode: "te_dark_mode",
    settings: "text_express_settings",
    position: "text_express_position",
    launcherPosition: "text_express_launcher_position",
    categories: "text_express_categories",
    rememberedVariables: "text_express_remembered_variables",
    uiState: "text_express_ui_state",
    panelGeometry: "text_express_panel_geometry_v24",
    sequenceGeometry: "text_express_sequence_geometry_v24"
  });

  const DEFAULT_SETTINGS = Object.freeze({
    autoExpand: true,
    keepOpenAfterInsert: true,
    confirmBeforeDelete: true
  });

  // Opções compartilhadas pela normalização, renderização e editor de categorias.
  // Estas constantes existiam como referências na V28, mas não haviam sido
  // declaradas no bundle, causando falha total na inicialização do bookmarklet.
  const CATEGORY_ICON_OPTIONS = Object.freeze([
    "folder", "message-circle", "check-circle", "clipboard-list", "network",
    "phone", "monitor", "globe", "users", "zap", "send", "server",
    "radio", "wallet", "compass", "headphones", "wifi", "smartphone",
    "map-pin", "database", "package", "wrench", "shield-check", "tag",
    "bell", "clock", "file-text", "layout-grid", "reply"
  ]);

  const CATEGORY_COLOR_OPTIONS = Object.freeze([
    "#2563eb", "#4f46e5", "#7c3aed", "#db2777", "#e64b4b",
    "#f97316", "#d97706", "#16a36a", "#0f766e", "#0891b2",
    "#64748b", "#334155"
  ]);

  const TRIGGER_LABELS = Object.freeze({
    space: "Espaço",
    tab: "Tab",
    enter: "Enter"
  });

  const DEFAULT_CATEGORIES = [{"id":"cat-atd-saudacoes","tipo":"atendimento","nome":"Saudações","icone":"message-circle","cor":"#16a36a","ordem":20,"padrao":false},{"id":"cat-atd-encerramentos","tipo":"atendimento","nome":"Encerramentos","icone":"check-circle","cor":"#e64b4b","ordem":30,"padrao":true},{"id":"cat-atd-dados-incorretos","tipo":"atendimento","nome":"Dados incorretos","icone":"clipboard-list","cor":"#e64b4b","ordem":40,"padrao":false},{"id":"cat-atd-problemas","tipo":"atendimento","nome":"Internet","icone":"network","cor":"#8b5cf6","ordem":50,"padrao":true},{"id":"cat-atd-orientacoes","tipo":"atendimento","nome":"Telefonia","icone":"phone","cor":"#0891b2","ordem":60,"padrao":true},{"id":"cat-atd-respostas","tipo":"atendimento","nome":"TV","icone":"monitor","cor":"#16a36a","ordem":70,"padrao":true},{"id":"cat-atd-abertura-de-o-s","tipo":"atendimento","nome":"Abertura de O.s","icone":"globe","cor":"#e64b4b","ordem":999,"padrao":false},{"id":"cat-atd-solicitacoes","tipo":"atendimento","nome":"Serviços com valores","icone":"clipboard-list","cor":"#f97316","ordem":1009,"padrao":true},{"id":"cat-atd-transferencias","tipo":"atendimento","nome":"Transferências","icone":"users","cor":"#16a36a","ordem":1019,"padrao":false},{"id":"cat-atd-cobrancas-de-atendimento","tipo":"atendimento","nome":"Cobranças de atendimento","icone":"zap","cor":"#0f766e","ordem":1029,"padrao":false},{"id":"cat-atd-outros","tipo":"atendimento","nome":"Outros","icone":"folder","cor":"#64748b","ordem":1039,"padrao":true},{"id":"cat-prot-instalacao-reparo","tipo":"protocolo","nome":"Abertura de O.s","icone":"send","cor":"#e64b4b","ordem":20,"padrao":true},{"id":"cat-prot-internet","tipo":"protocolo","nome":"Internet","icone":"globe","cor":"#4f46e5","ordem":30,"padrao":true},{"id":"cat-prot-telefonia","tipo":"protocolo","nome":"Telefonia","icone":"phone","cor":"#16a36a","ordem":50,"padrao":true},{"id":"cat-prot-tv","tipo":"protocolo","nome":"TV","icone":"monitor","cor":"#db2777","ordem":70,"padrao":true},{"id":"cat-prot-sistemas-aplicativos","tipo":"protocolo","nome":"Aplicativos","icone":"server","cor":"#2563eb","ordem":80,"padrao":true},{"id":"cat-prot-fwa","tipo":"protocolo","nome":"FWA","icone":"radio","cor":"#d97706","ordem":90,"padrao":true},{"id":"cat-prot-financeiro","tipo":"protocolo","nome":"Atendimentos com valores","icone":"wallet","cor":"#16a36a","ordem":100,"padrao":true},{"id":"cat-prot-orientacao","tipo":"protocolo","nome":"Orientação","icone":"compass","cor":"#0891b2","ordem":150,"padrao":true},{"id":"cat-prot-outros","tipo":"protocolo","nome":"Outros","icone":"folder","cor":"#64748b","ordem":190,"padrao":true},{"id":"cat-prot-cobrancas","tipo":"protocolo","nome":"Cobranças","icone":"headphones","cor":"#f97316","ordem":200,"padrao":false}];

  const DEFAULT_SNIPPETS = [{"id":"te-protocolo-8a8ae06e-8355-4651-b42d-3cf824f4fc67","tipo":"protocolo","nome":"Sky+","atalho":"/sky","categoriaId":"cat-prot-tv","categoria":"TV","grupo":"","contexto":"","conteudo":"Informa que está sem acesso ao serviço de TV da brisanet , informado que a brisanet migrou para o Sky+ e Amazon Prime , Orientado cliente a fazer a ativação , Cliente ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Criado pelo usuário","modelo":"unico","etapas":[],"updatedAt":"2026-08-06T13:08:40.442Z","revision":1},{"id":"te-atendimento-dbc923fc-f51e-4275-884d-65457483aa10","tipo":"atendimento","nome":"Oferta 5G","atalho":"/5g","categoriaId":"cat-atd-saudacoes","categoria":"Saudações","grupo":"","contexto":"","conteudo":"Você já está conectado com a gente, mas sabia que dá para aproveitar ainda mais? 😍 Temos planos com mais internet, benefícios exclusivos e você ainda pode garantir chips para outros membros da família também navegarem com essa qualidade toda!\nQuer que eu te mostre as novidades e como expandir a experiência *Brisamóvel* aí na sua casa? Prometo ser breve! 😉\n\nO nosso chip 5G é o nosso serviço de internet móvel, ideal para quem busca qualidade e estabilidade no sinal — perfeito para navegar, usar redes sociais, assistir vídeos e muito mais, sem travamentos.\nVocê pode optar por manter seu número atual com a portabilidade ou, se preferir, ativar um número novo. \n⚠️ Só lembrando: o DDD não pode ser alterado, ele permanece conforme sua região.\nTemos ofertas disponíveis:\n\n🚨 OFERTAS IMPERDÍVEIS POR TEMPO LIMITADO! 🚨\n\nAproveite condições especiais e escolha o plano ideal para você:\n\n🥉 20GB\n💥 De R$ 34,99 por apenas R$ 29,99/mês (por 12 meses)\n✅ WhatsApp, Facebook e Messenger ilimitados\n✅ Ligações e SMS ilimitados\n✅ 2GB de roaming\n\n🥈 30GB ⭐ MELHOR CUSTO-BENEFÍCIO\n💥 De R$ 49,99 por apenas R$ 29,99/mês (por 6 meses)\n✅ 10GB a mais pelo mesmo valor do plano de 20GB!\n✅ WhatsApp, Facebook e Messenger ilimitados\n✅ Ligações e SMS ilimitados\n✅ 3GB de roaming\n\n🥇 100GB 🔥\n💥 De R$ 59,99 por apenas R$ 39,99/mês (por 3 meses)\n✅ Muito mais internet para quem usa o celular o dia todo\n✅ WhatsApp, Facebook e Messenger ilimitados\n✅ Ligações e SMS ilimitados\n✅ 5GB de roaming\n\n👑 150GB – MELHOR OFERTA!\n💜 De R$ 79,99 por apenas R$ 69,99/mês (por 12 meses)\n🚀 Ideal para quem não quer se preocupar com internet!\n✅ 150GB de internet\n✅ WhatsApp, Facebook e Messenger ilimitados\n✅ Ligações e SMS ilimitados\n✅ 10GB de roaming\n\n📲 Essa é uma excelente oportunidade para economizar e ainda levar muito mais internet. Me diga qual plano chamou mais sua atenção que faço a contratação para você agora mesmo!\n\nPodemos seguir com a reserva do seu chip e agendar a ativação?\nAssim você já garante sua conexão com a qualidade que só a Brisanet oferece! 😉\n\nAntes de tudo, só preciso confirmar algumas informações com você:\n.Qual sua cidade e bairro? \n.Você gostaria de manter seu número atual (portabilidade) ou deseja um novo número?\n\n⚠️ Importante: o DDD será mantido conforme sua região, não é possível alterá-lo.\n\nAguarde só um momento, onde estarei realizando a pré-venda no sistema\n\nEstamos quase lá. Pode informar a disponibilidade de atendimento? Manhã ou tarde?\n\nAgradecemos de coração pela sua escolha, [Nome do Cliente]! 💙\nSeu chip Brisamóvel já está com atendimento agendado — a entrega e ativação serão feitas pela nossa equipe técnica no dia e horário combinados, direto aí na sua casa.\nAssim, garantimos que tudo chegue funcionando perfeitamente, sem complicação! 😉\nO prazo de entrega é o mesmo da instalação da fibra: até 7 dias úteis. Você recebe com rapidez, segurança e toda a comodidade que merece.\n\nA fatura do chip será gerada diretamente no aplicativo Brisamóvel, de forma prática e segura.","variaveis":["Nome do Cliente"],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Criado pelo usuário","modelo":"fluxo","etapas":[{"id":"te-etapa-2f4e93b8-536c-40a2-9585-7323f9ef0d7f","nome":"Oferta","atalho":"/5g1","conteudo":"Você já está conectado com a gente, mas sabia que dá para aproveitar ainda mais? 😍 Temos planos com mais internet, benefícios exclusivos e você ainda pode garantir chips para outros membros da família também navegarem com essa qualidade toda!\nQuer que eu te mostre as novidades e como expandir a experiência *Brisamóvel* aí na sua casa? Prometo ser breve! 😉","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-ed2b27fe-db98-4611-b945-0e2af458629e","nome":"Explicando chip","atalho":"/5g2","conteudo":"O nosso chip 5G é o nosso serviço de internet móvel, ideal para quem busca qualidade e estabilidade no sinal — perfeito para navegar, usar redes sociais, assistir vídeos e muito mais, sem travamentos.\nVocê pode optar por manter seu número atual com a portabilidade ou, se preferir, ativar um número novo. \n⚠️ Só lembrando: o DDD não pode ser alterado, ele permanece conforme sua região.\nTemos ofertas disponíveis:","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-28010309-5d53-4627-a012-bcb354485744","nome":"Planos","atalho":"/5g3","conteudo":"🚨 OFERTAS IMPERDÍVEIS POR TEMPO LIMITADO! 🚨\n\nAproveite condições especiais e escolha o plano ideal para você:\n\n🥉 20GB\n💥 De R$ 34,99 por apenas R$ 29,99/mês (por 12 meses)\n✅ WhatsApp, Facebook e Messenger ilimitados\n✅ Ligações e SMS ilimitados\n✅ 2GB de roaming\n\n🥈 30GB ⭐ MELHOR CUSTO-BENEFÍCIO\n💥 De R$ 49,99 por apenas R$ 29,99/mês (por 6 meses)\n✅ 10GB a mais pelo mesmo valor do plano de 20GB!\n✅ WhatsApp, Facebook e Messenger ilimitados\n✅ Ligações e SMS ilimitados\n✅ 3GB de roaming\n\n🥇 100GB 🔥\n💥 De R$ 59,99 por apenas R$ 39,99/mês (por 3 meses)\n✅ Muito mais internet para quem usa o celular o dia todo\n✅ WhatsApp, Facebook e Messenger ilimitados\n✅ Ligações e SMS ilimitados\n✅ 5GB de roaming\n\n👑 150GB – MELHOR OFERTA!\n💜 De R$ 79,99 por apenas R$ 69,99/mês (por 12 meses)\n🚀 Ideal para quem não quer se preocupar com internet!\n✅ 150GB de internet\n✅ WhatsApp, Facebook e Messenger ilimitados\n✅ Ligações e SMS ilimitados\n✅ 10GB de roaming\n\n📲 Essa é uma excelente oportunidade para economizar e ainda levar muito mais internet. Me diga qual plano chamou mais sua atenção que faço a contratação para você agora mesmo!","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-9f03530f-7394-46b0-801f-e290f418e396","nome":"Eae vai querer ?","atalho":"/5g4","conteudo":"Podemos seguir com a reserva do seu chip e agendar a ativação?\nAssim você já garante sua conexão com a qualidade que só a Brisanet oferece! 😉","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-37257844-a654-47fd-9d04-780b49de9734","nome":"Fala 5","atalho":"/5g5","conteudo":"Antes de tudo, só preciso confirmar algumas informações com você:\n.Qual sua cidade e bairro? \n.Você gostaria de manter seu número atual (portabilidade) ou deseja um novo número?\n\n⚠️ Importante: o DDD será mantido conforme sua região, não é possível alterá-lo.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-92ea22fd-2e65-4244-994e-df2deea2b66b","nome":"Aguarda 1 min","atalho":"/5g6","conteudo":"Aguarde só um momento, onde estarei realizando a pré-venda no sistema","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-2edd5b21-f331-412a-933a-d4e707703627","nome":"Agendamento","atalho":"/5g7","conteudo":"Estamos quase lá. Pode informar a disponibilidade de atendimento? Manhã ou tarde?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-9f6e0c87-dc39-4d38-9f5c-6ed336a1eaad","nome":"Obrigado pela preferência!!","atalho":"/5g8","conteudo":"Agradecemos de coração pela sua escolha, [Nome do Cliente]! 💙\nSeu chip Brisamóvel já está com atendimento agendado — a entrega e ativação serão feitas pela nossa equipe técnica no dia e horário combinados, direto aí na sua casa.\nAssim, garantimos que tudo chegue funcionando perfeitamente, sem complicação! 😉\nO prazo de entrega é o mesmo da instalação da fibra: até 7 dias úteis. Você recebe com rapidez, segurança e toda a comodidade que merece.","triggerKey":"space","opcional":false,"variaveis":["Nome do Cliente"],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-3b5ecf66-c60f-4abe-9b5f-1dbab45fc8a7","nome":"Fatura no app!!","atalho":"/5g9","conteudo":"A fatura do chip será gerada diretamente no aplicativo Brisamóvel, de forma prática e segura.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"2026-08-06T12:45:00.214Z","revision":1},{"id":"te-protocolo-8256a6d8-2b3d-4093-84f0-fcb76cf1a8ff","tipo":"protocolo","nome":"inativo chat","atalho":"/inativochat","categoriaId":"cat-prot-outros","categoria":"Outros","grupo":"","contexto":"","conteudo":"Cliente entrou em contato via chat, ao iniciar o atendimento, o mesmo não correspondeu ao diálogo. Não foi feita sondagem. Atendimento encerrado por inatividade.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Criado pelo usuário","modelo":"unico","etapas":[],"updatedAt":"2026-07-22T11:21:56.937Z","revision":1},{"id":"te-atendimento-3c1c61a1-eb5a-4de8-8541-8363dfa24382","tipo":"atendimento","nome":"TP-LINK SEM CUSTO ONU 2.4","atalho":"/tp-link-sem-custo-onu-2-4","categoriaId":"cat-atd-abertura-de-o-s","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Verifiquei que tem um modelo de modem antigo, estarei abrindo uma ordem de serviço para realizar a instalação do equipamento roteador Tp-Link. O modelo atual continuará instalado para conversão do sinal óptico em sinal de internet. Será instalado um novo equipamento para distribuir o sinal por rede cabeada e wi-fi em sua residência, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atendimento-ec96bd73-9d1c-4ae5-95d0-d80b7c14082e","tipo":"atendimento","nome":"COBRANÇA DE INSTALAÇÃO","atalho":"/cobranca-de-instalacao","categoriaId":"cat-atd-cobrancas-de-atendimento","categoria":"Cobranças de atendimento","grupo":"","contexto":"","conteudo":"Visto que sua solicitação foi feita **, onde temos o prazo de 5 a 7 dias úteis para concluir todo o procedimento. Apesar do prazo, devido sua cobrança, estou solicitando o máximo de agilidade dos responsáveis para que sua alteração de endereço seja concluída o quanto antes. Peço que aguarde, ok?\n\nVisto com o setor responsável que sua solicitação está no estágio final, que consiste em uma de nossas equipes ir ao local concluir a instalação. Peço que aguarde o contato do nosso departamento de agendamento para que seja agendado esse procedimento.\n\nVisto com o setor responsável que a equipe designada pelo reparo em sua residência estará se deslocando ao local X para concluir o procedimento.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-ee514a81-9dcd-46ac-a6b8-ee584b8bcd8c","nome":"Fala 1","atalho":"/cobranca-de-instalacao1","conteudo":"Visto que sua solicitação foi feita **, onde temos o prazo de 5 a 7 dias úteis para concluir todo o procedimento. Apesar do prazo, devido sua cobrança, estou solicitando o máximo de agilidade dos responsáveis para que sua alteração de endereço seja concluída o quanto antes. Peço que aguarde, ok?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-6e23e5be-b901-4885-853f-a06be0fdf47c","nome":"Fala 2","atalho":"/cobranca-de-instalacao2","conteudo":"Visto com o setor responsável que sua solicitação está no estágio final, que consiste em uma de nossas equipes ir ao local concluir a instalação. Peço que aguarde o contato do nosso departamento de agendamento para que seja agendado esse procedimento.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-f05ea1fe-60a9-4f50-9423-a927538826a6","nome":"Fala 3","atalho":"/cobranca-de-instalacao3","conteudo":"Visto com o setor responsável que a equipe designada pelo reparo em sua residência estará se deslocando ao local X para concluir o procedimento.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-0d88170c-b199-4208-abc7-29e83581a97e","tipo":"atendimento","nome":"COBRANÇA DE ALT DE PLANO","atalho":"/cobranca-de-alt-de-plano","categoriaId":"cat-atd-cobrancas-de-atendimento","categoria":"Cobranças de atendimento","grupo":"","contexto":"","conteudo":"A atualização, após assinatura dos contratos, ocorre em um prazo de até 5 dias. Peço que aguarde.\n\nVocê já assinou os contratos?\n\nVocê deve assinar os novos contratos no aplicativo *brisacliente*, após isso, em um prazo de 3 a 5 dias seu plano será atualizado.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-d3e27765-f6de-4f0b-8f88-05e238de50c4","nome":"Fala 1","atalho":"/cobranca-de-alt-de-plano1","conteudo":"A atualização, após assinatura dos contratos, ocorre em um prazo de até 5 dias. Peço que aguarde.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-04e42786-2f75-4707-b617-472f4a82669d","nome":"Fala 2","atalho":"/cobranca-de-alt-de-plano2","conteudo":"Você já assinou os contratos?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-9de4125b-53ac-440d-a2db-6082110b8039","nome":"Fala 3","atalho":"/cobranca-de-alt-de-plano3","conteudo":"Você deve assinar os novos contratos no aplicativo *brisacliente*, após isso, em um prazo de 3 a 5 dias seu plano será atualizado.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-1cb34195-21f7-45f9-98de-8c541200fc6f","tipo":"atendimento","nome":"Cobrança de reparo — Fora do prazo","atalho":"/fora","categoriaId":"cat-atd-cobrancas-de-atendimento","categoria":"Cobranças de atendimento","grupo":"","contexto":"","conteudo":"Vi que esse atendimento já se encontra fora do prazo , Vou ter que verificar com o pessoal responsável por esse agendamento em sua cidade , 1 minuto , Certo ?\n\nVisto com o responsável pelas equipes em sua cidade que a equipe designada pelo reparo em sua residência estará se deslocando ao local X","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-292646eb-6649-4a6a-a7a9-a4c0272d3a81","nome":"Fala 1","atalho":"/fora1","conteudo":"Vi que esse atendimento já se encontra fora do prazo , Vou ter que verificar com o pessoal responsável por esse agendamento em sua cidade , 1 minuto , Certo ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-0893f903-85be-40bd-8aac-2a89cd29cf3e","nome":"Fala 2","atalho":"/fora2","conteudo":"Visto com o responsável pelas equipes em sua cidade que a equipe designada pelo reparo em sua residência estará se deslocando ao local X","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-6388026f-3bb1-4e6b-ba64-f3cfb80ac1ba","tipo":"atendimento","nome":"Cobrança de reparo — dentro do prazo","atalho":"/dentro","categoriaId":"cat-atd-cobrancas-de-atendimento","categoria":"Cobranças de atendimento","grupo":"","contexto":"","conteudo":"Verifiquei no sistema que consta um chamado externo aberto onde uma de nossas equipes irá em sua residência verificar o problema, O seu atendimento está agendado para o dia (xxxx) No periodo da tarde/manhã.\n\nMas pode ficar tranquilo, já solicitei o máximo de agilidade em seu atendimento, então peço, por gentileza, que fique no aguardo. Pois nossas equipes de agendamento já vão fazer contato com você caso venha a surgir alguma vaga para reagendar essa visita , Certo ?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-88dbd5e2-1ba5-44da-96be-d3e262cb97a4","nome":"Fala 1","atalho":"/dentro1","conteudo":"Verifiquei no sistema que consta um chamado externo aberto onde uma de nossas equipes irá em sua residência verificar o problema, O seu atendimento está agendado para o dia (xxxx) No periodo da tarde/manhã.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-7678e9ea-4e8f-49d7-a3fe-52729f9c6ebd","nome":"Fala 2","atalho":"/dentro2","conteudo":"Mas pode ficar tranquilo, já solicitei o máximo de agilidade em seu atendimento, então peço, por gentileza, que fique no aguardo. Pois nossas equipes de agendamento já vão fazer contato com você caso venha a surgir alguma vaga para reagendar essa visita , Certo ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-c5639d9e-cb5e-41ae-a579-fa2fc14ec87c","tipo":"atendimento","nome":"PORTAS LANs ONU","atalho":"/portas","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"O aparelho oferecido pela Brisanet ao cliente como comodato não é um roteador; na verdade, se trata de um modem (ONU *Fiberhome*), cujas portas LANs são direcionadas para serviços independentes: *LAN 1 é direcionada para o serviço de internet*, *LAN 2, 3 e 4, para o serviço de TV a cabo da Brisanet* e as portas *Phone 1, Phone 2 ou só Phone, são específicas para o uso do serviço de telefonia fixa da empresa.*\n\nPara que o cliente possa utilizar outro equipamento por cabo, ele deve ter um roteador próprio.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-f0486c8a-f074-4ad9-baff-cd8983b31e19","nome":"Fala 1","atalho":"/portas1","conteudo":"O aparelho oferecido pela Brisanet ao cliente como comodato não é um roteador; na verdade, se trata de um modem (ONU *Fiberhome*), cujas portas LANs são direcionadas para serviços independentes: *LAN 1 é direcionada para o serviço de internet*, *LAN 2, 3 e 4, para o serviço de TV a cabo da Brisanet* e as portas *Phone 1, Phone 2 ou só Phone, são específicas para o uso do serviço de telefonia fixa da empresa.*","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-15d31fe7-a3a9-437c-a7d8-0c291d23b875","nome":"Fala 2","atalho":"/portas2","conteudo":"Para que o cliente possa utilizar outro equipamento por cabo, ele deve ter um roteador próprio.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-d17abb73-eef7-48d9-9504-d1df39ce8423","tipo":"atendimento","nome":"PORTA WPS","atalho":"/wps","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"O aparelho oferecido pela Brisanet ao cliente como comodato, por questões de segurança, vem com algumas funções desabilitadas, incluindo, a função WPS.\n\nPara que o cliente possa utilizar esta função, ele deve ter um roteador próprio.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-f7b7459d-0309-47eb-a337-4119e009f531","nome":"Fala 1","atalho":"/wps1","conteudo":"O aparelho oferecido pela Brisanet ao cliente como comodato, por questões de segurança, vem com algumas funções desabilitadas, incluindo, a função WPS.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-946137e8-6dcc-4419-bde8-40156eec1064","nome":"Fala 2","atalho":"/wps2","conteudo":"Para que o cliente possa utilizar esta função, ele deve ter um roteador próprio.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-552ad3c7-15e3-4995-86fb-640335bd1be3","tipo":"atendimento","nome":"Alteração de senha","atalho":"/senha","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"Peço que conecte seu celular nos dados móveis ou em outra rede Wi-Fi pois, quando eu gerar a nova senha, todos os dispositivos serão desconectados automaticamente, ok?\n\nSua nova senha de acesso da rede Wi-Fi X é: X    \n\nTesta e veja se conectou.\n\nA personalização da senha Wi-Fi, por enquanto, é possível somente no App Brisacliente:\n \nAcesse o App Brisacliente, na aba Planos, clique em Configurações de Wi-fi;\n\nLocalize a opção Alterar senha de Wi-Fi;\n\nClique em Alterar a senha manualmente;\n\nInsira a senha desejada e confirme.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-c15aac31-a476-4f24-924e-32da1c29ea8d","nome":"Fala 1","atalho":"/senha1","conteudo":"Peço que conecte seu celular nos dados móveis ou em outra rede Wi-Fi pois, quando eu gerar a nova senha, todos os dispositivos serão desconectados automaticamente, ok?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-de811bf2-14a9-40d9-a523-1691f5424324","nome":"Fala 2","atalho":"/senha2","conteudo":"Sua nova senha de acesso da rede Wi-Fi X é: X    \n\nTesta e veja se conectou.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-a1c9f40c-10c5-4753-9887-afc78f7c5096","nome":"Fala 3","atalho":"/senha3","conteudo":"A personalização da senha Wi-Fi, por enquanto, é possível somente no App Brisacliente:\n \nAcesse o App Brisacliente, na aba Planos, clique em Configurações de Wi-fi;\n\nLocalize a opção Alterar senha de Wi-Fi;\n\nClique em Alterar a senha manualmente;\n\nInsira a senha desejada e confirme.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-6d552f4a-6765-43c9-8764-0c24a4db3016","tipo":"atendimento","nome":"Alteração de cômodo","atalho":"/alteracao","categoriaId":"cat-atd-solicitacoes","categoria":"Serviços com valores","grupo":"","contexto":"","conteudo":"Essa alteração é de cômodo ou só de parede no mesmo cômodo ?\n\nEm referência ao serviço adicional de *alteração de cômodo*, existe uma taxa de apenas R$30,00 pelo procedimento. Se houver necessidade de utilização/troca de um novo cabo de fibra, será cobrado R$0,60 centavos adicionais por cada metro utilizado do poste até a casa. Caso deseje que seja conectado via cabo de rede algum dos seus equipamentos, será gerado o valor de R$1,30 por metro utilizado. O valor total será acrescentado na(s) sua(s) próxima(s) fatura(s). Nossa equipe levará um termo de compromisso para ser assinado no ato do procedimento.\n\nSe a alteração for no mesmo cômodo, será cobrado apenas R$20,00 do procedimento. Se houver necessidade de utilização/troca de um novo cabo de fibra, será cobrado R$0,60 centavos adicionais por cada metro utilizado.\n\nPosso abrir a solicitação ?\n\nAqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-e06aef79-a194-4e43-8462-7ed52aa5d66f","nome":"Fala 1","atalho":"/alteracao1","conteudo":"Essa alteração é de cômodo ou só de parede no mesmo cômodo ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-b0f8b7f3-fc78-4ee3-9c44-d986ca74b3f0","nome":"Fala 2","atalho":"/alteracao2","conteudo":"Em referência ao serviço adicional de *alteração de cômodo*, existe uma taxa de apenas R$30,00 pelo procedimento. Se houver necessidade de utilização/troca de um novo cabo de fibra, será cobrado R$0,60 centavos adicionais por cada metro utilizado do poste até a casa. Caso deseje que seja conectado via cabo de rede algum dos seus equipamentos, será gerado o valor de R$1,30 por metro utilizado. O valor total será acrescentado na(s) sua(s) próxima(s) fatura(s). Nossa equipe levará um termo de compromisso para ser assinado no ato do procedimento.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-d8b18f91-5533-4904-85e0-799260fd1751","nome":"Fala 3","atalho":"/alteracao3","conteudo":"Se a alteração for no mesmo cômodo, será cobrado apenas R$20,00 do procedimento. Se houver necessidade de utilização/troca de um novo cabo de fibra, será cobrado R$0,60 centavos adicionais por cada metro utilizado.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-c8773865-b3fc-4719-bae5-fa5a04c556d3","nome":"Fala 4","atalho":"/alteracao4","conteudo":"Posso abrir a solicitação ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-b79a4df3-1434-4cb4-b79d-d95b9a570767","nome":"Fala 5","atalho":"/alteracao5","conteudo":"Aqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-0070a588-55e9-47e3-9be8-ad3aa43de092","tipo":"atendimento","nome":"Telefonia desativada","atalho":"/desativado","categoriaId":"cat-atd-orientacoes","categoria":"Telefonia","grupo":"","contexto":"","conteudo":"Identifiquei uma falha no sistema de telefonia de sua casa , Estou fazendo ativação para tentar corrigir esse problema , Certo ?\n\nFinalizado os procedimentos , Pode testar agora e ver se deu certo ? Só ligar para nossa central para validar por exemplo , Numero: 10517","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-27737e4c-be39-4ba1-bbbd-7f75ed3a1bde","nome":"Fala 1","atalho":"/desativado1","conteudo":"Identifiquei uma falha no sistema de telefonia de sua casa , Estou fazendo ativação para tentar corrigir esse problema , Certo ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-2b870b00-e84e-4dde-a38f-63f93a0ba3b4","nome":"Fala 2","atalho":"/desativado2","conteudo":"Finalizado os procedimentos , Pode testar agora e ver se deu certo ? Só ligar para nossa central para validar por exemplo , Numero: 10517","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-4464ffd3-010e-4d2f-b5f5-759387131bd8","tipo":"atendimento","nome":"Telefone mudo","atalho":"/mudo","categoriaId":"cat-atd-orientacoes","categoria":"Telefonia","grupo":"","contexto":"","conteudo":"Na lateral do telefone fixo tem um botão do volume com as opções *HI* que significa alto, e *LO* que significa baixo e *OFF* que significa sem som. Está em qual opção?\n\nNa lateral do telefone fixo tem um botão com as opções *P* e *T*. Está em qual opção?\n\nPor gentileza, altere de *P* para *T* e, em seguida, teste novamente o serviço de telefonia fixa.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-724801b4-98c0-4e27-95af-79898920d075","nome":"Fala 1","atalho":"/mudo1","conteudo":"Na lateral do telefone fixo tem um botão do volume com as opções *HI* que significa alto, e *LO* que significa baixo e *OFF* que significa sem som. Está em qual opção?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-83d51e09-3e4e-440e-8fe1-bf1d1da948cf","nome":"Fala 2","atalho":"/mudo2","conteudo":"Na lateral do telefone fixo tem um botão com as opções *P* e *T*. Está em qual opção?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-8e05762e-510c-4688-b058-bac7b6c13710","nome":"Fala 3","atalho":"/mudo3","conteudo":"Por gentileza, altere de *P* para *T* e, em seguida, teste novamente o serviço de telefonia fixa.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-657fc2f2-0f9f-417d-b432-c5337064fe17","tipo":"atendimento","nome":"Equipamento danificado devido Manuseio do cliente","atalho":"/danificado","categoriaId":"cat-atd-solicitacoes","categoria":"Serviços com valores","grupo":"","contexto":"","conteudo":"A Brisanet não aconselha a remoção do equipamento (ex.: modem, roteador, cabo, conector etc) sem assistência técnica, devido os mesmos serem sensíveis, podendo vir a danificá-los, o que pode gerar custos ao cliente, pois nosso equipamento está sob sua responsabilidade.\n\nComo houve esse manuseio e dano nesse equipamento , inicialmente vai ser gerado a taxa da visita que é de 20,00 R$ onde se for identificado mais algum dano pela equipe pode ser gerado mais valores , dependendo da verificação deles. Certo ?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-36b6cfa8-539d-475c-a05b-45aa0b46c9b2","nome":"Fala 1","atalho":"/danificado1","conteudo":"A Brisanet não aconselha a remoção do equipamento (ex.: modem, roteador, cabo, conector etc) sem assistência técnica, devido os mesmos serem sensíveis, podendo vir a danificá-los, o que pode gerar custos ao cliente, pois nosso equipamento está sob sua responsabilidade.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-e05eb738-0546-4ec7-87f4-07da6eade66b","nome":"Fala 2","atalho":"/danificado2","conteudo":"Como houve esse manuseio e dano nesse equipamento , inicialmente vai ser gerado a taxa da visita que é de 20,00 R$ onde se for identificado mais algum dano pela equipe pode ser gerado mais valores , dependendo da verificação deles. Certo ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-7be5d4ce-a19a-440f-b42a-edd46223c499","tipo":"atendimento","nome":"INADIPLÊNCIA FINANCEIRA","atalho":"/bloqueio","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"Verifiquei aqui no sistema e vi que você está sem acesso devido um bloqueio na sua parte financeira , e devido isso acabou deixando o seu contrato BLOQUEADO , Certo ?\n\nPara restabelecer o serviço só quitar a fatura em atraso ou solicitar o desbloqueio temporário no aplicativo , tudo bem ?\n\nOu se você quiser posso te passar para o setor financeiro , para solicitar isso , Da certo ?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-3d7fc05f-6306-4ab4-b84c-603eb74a77fe","nome":"Fala 1","atalho":"/bloqueio1","conteudo":"Verifiquei aqui no sistema e vi que você está sem acesso devido um bloqueio na sua parte financeira , e devido isso acabou deixando o seu contrato BLOQUEADO , Certo ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-0bbfe997-4217-4ce0-aae5-a1e9567668bf","nome":"Fala 2","atalho":"/bloqueio2","conteudo":"Para restabelecer o serviço só quitar a fatura em atraso ou solicitar o desbloqueio temporário no aplicativo , tudo bem ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-c96f0ebf-0c20-48d7-836d-b557582550bb","nome":"Fala 3","atalho":"/bloqueio3","conteudo":"Ou se você quiser posso te passar para o setor financeiro , para solicitar isso , Da certo ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-efbdfcff-0919-4cdb-948b-bff50aecf83a","tipo":"atendimento","nome":"SEM ACESSO (TUDO NORMAL)","atalho":"/normal","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"As primeiras verificações mostraram que, com o nosso equipamento, no sistema, está tudo normal. Mas como você está sem acesso, isso pode significar que o equipamento travou.\n\nAguarde mais um momento enquanto executo os devidos procedimentos para reparar o acesso, certo? Já peço para você verificar novamente.\n\nObrigado por aguardar, Testa agora e veja se normalizou , Por gentileza\n\nPor gentileza desligue os nossos equipamentos da tomada e, em seguida, ligue-os novamente. Após isso, verifique o seu acesso.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-96caea13-bd17-47d1-8324-5acddf6e2d7b","nome":"Fala 1","atalho":"/normal1","conteudo":"As primeiras verificações mostraram que, com o nosso equipamento, no sistema, está tudo normal. Mas como você está sem acesso, isso pode significar que o equipamento travou.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-d536e22a-753c-47c8-b87e-d08681aed66f","nome":"Fala 2","atalho":"/normal2","conteudo":"Aguarde mais um momento enquanto executo os devidos procedimentos para reparar o acesso, certo? Já peço para você verificar novamente.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-d062e8df-5f48-43bc-ae94-803218b44677","nome":"Fala 3","atalho":"/normal3","conteudo":"Obrigado por aguardar, Testa agora e veja se normalizou , Por gentileza","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-441474b0-0275-408c-8751-daa94a82c5f2","nome":"Fala 4","atalho":"/normal4","conteudo":"Por gentileza desligue os nossos equipamentos da tomada e, em seguida, ligue-os novamente. Após isso, verifique o seu acesso.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-5391b272-5a28-4445-89c9-93223125b11b","tipo":"atendimento","nome":"Solicitação de cancelamento","atalho":"/cancelamento","categoriaId":"cat-atd-transferencias","categoria":"Transferências","grupo":"","contexto":"","conteudo":"Solicitação de cancelamento é com o nosso setor de cancelamento vou repassar você para fila do setor para tratar com eles.\n\nSolicitação de cancelamento é com o nosso setor de cancelamento e por hoje ser um domingo não eles não estão atendendo , somente amanhã a partir das 08 Horas da manhã.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-8809e6e4-10c1-47a4-9ae8-c5e3d4c6d4f3","nome":"Fala 1","atalho":"/cancelamento1","conteudo":"Solicitação de cancelamento é com o nosso setor de cancelamento vou repassar você para fila do setor para tratar com eles.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-6fbab2fa-7d8e-4336-a0e3-da16cce87049","nome":"Fala 2","atalho":"/cancelamento2","conteudo":"Solicitação de cancelamento é com o nosso setor de cancelamento e por hoje ser um domingo não eles não estão atendendo , somente amanhã a partir das 08 Horas da manhã.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-b7cdb676-138d-4daf-8eb5-f1613337a8d7","tipo":"atendimento","nome":"ALCANCE DO WIFI","atalho":"/alcance","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"Nesses casos onde o equipamento da brisanet não está sendo suficiente para entrega do sinal na residência do cliente a brisanet orienta o cliente a instalar um segundo ponto de acesso no caso um roteador particular nesses pontos onde o sinal não está chegando bem , Entendeu ?\n\nPosso mandar alguém no local para verificar se é uma questão com o equipamento da brisanet ou se é necessário mesmo fazer isso que te orientei , tudo bem ?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-cb1be4cf-3eb8-42e2-b11b-6d0b834dafac","nome":"Fala 1","atalho":"/alcance1","conteudo":"Nesses casos onde o equipamento da brisanet não está sendo suficiente para entrega do sinal na residência do cliente a brisanet orienta o cliente a instalar um segundo ponto de acesso no caso um roteador particular nesses pontos onde o sinal não está chegando bem , Entendeu ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-d5d86d39-79c9-45b5-a9ac-b702f4cec2f2","nome":"Fala 2","atalho":"/alcance2","conteudo":"Posso mandar alguém no local para verificar se é uma questão com o equipamento da brisanet ou se é necessário mesmo fazer isso que te orientei , tudo bem ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-1677c0d4-9c21-4c5b-8b29-0baea3db2a18","tipo":"atendimento","nome":"Personalizar rede","atalho":"/personalizar","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"No caso só tem como personalizar a rede após o (Brisa-) , Não tem como retirar esse hifen. EX: Brisa-1234\n\nNo caso da senha eu não consigo gerar uma senha personalizada , As senhas geradas daqui são feitas aleatoriamente , Caso você tenha acesso ao aplicativo brisacliente você consegue personalizar essa senha por lá.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-5649ac66-25d8-492b-9aa8-94cde14cdbcc","nome":"Fala 1","atalho":"/personalizar1","conteudo":"No caso só tem como personalizar a rede após o (Brisa-) , Não tem como retirar esse hifen. EX: Brisa-1234","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-47186363-502f-4c30-8d0c-f1df9aecafaf","nome":"Fala 2","atalho":"/personalizar2","conteudo":"No caso da senha eu não consigo gerar uma senha personalizada , As senhas geradas daqui são feitas aleatoriamente , Caso você tenha acesso ao aplicativo brisacliente você consegue personalizar essa senha por lá.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-35c96b43-96a3-4c5a-9292-fbee999ca889","tipo":"atendimento","nome":"Redes unificadas","atalho":"/redes","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"Verifiquei no sistema que foi instalado na sua residência o equipamento mais recente que a empresa fornece, onde, este equipamento, unifica as duas redes Wi-Fi (2.4 e 5.8) em uma só. Nos seus dispositivos irá aparecer apenas uma rede, brisa-xxxxx, porém os dispositivos irão se conectar de acordo com a inteligência de cada um.\n\nEx.: se estiver acessando próximo ao modem, provavelmente vai estar utilizando a rede turbo (5.8Ghz) e caso esteja utilizando o celular em um local que fique mais distante do modem, por a rede turbo ter um alcance mais limitado, automaticamente é feito a autenticação, onde estará utilizando a rede 2.4Ghz.\n\nDevido isso alguns aparelhos não conseguem identificar e conectar em alguns aparelhos , Tipo : Alexa , Câmera wifi.\n\nNesse caso você deve usar um roteador particular com essa rede separa para fazer essa conexão nesses aparelhos.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-37b3d927-a8a9-4587-8bc8-4cf3b113901d","nome":"Fala 1","atalho":"/redes1","conteudo":"Verifiquei no sistema que foi instalado na sua residência o equipamento mais recente que a empresa fornece, onde, este equipamento, unifica as duas redes Wi-Fi (2.4 e 5.8) em uma só. Nos seus dispositivos irá aparecer apenas uma rede, brisa-xxxxx, porém os dispositivos irão se conectar de acordo com a inteligência de cada um.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-d79d76a8-5b6b-43e7-b26d-2d6baa3c90a8","nome":"Fala 2","atalho":"/redes2","conteudo":"Ex.: se estiver acessando próximo ao modem, provavelmente vai estar utilizando a rede turbo (5.8Ghz) e caso esteja utilizando o celular em um local que fique mais distante do modem, por a rede turbo ter um alcance mais limitado, automaticamente é feito a autenticação, onde estará utilizando a rede 2.4Ghz.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-3b03f38f-0c4d-4152-ad3b-14c22c41c3f9","nome":"Fala 3","atalho":"/redes3","conteudo":"Devido isso alguns aparelhos não conseguem identificar e conectar em alguns aparelhos , Tipo : Alexa , Câmera wifi.\n\nNesse caso você deve usar um roteador particular com essa rede separa para fazer essa conexão nesses aparelhos.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-2b63168f-dd6d-403c-8f0e-79c22a12f995","tipo":"atendimento","nome":"Plano não chega ao contratado pelo Wi-Fi","atalho":"/plano","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"A Brisanet não garante a entrega do plano contratado por meio de conexão sem fio, apenas por conexão cabeada, tendo em vista que a conexão sem fio é uma conexão difusa que possibilita interferências e problemas de conexão, não ofertando um teste confiável na entrega do plano, mesmo que você esteja próximo do equipamento. Tudo bem?\n\nO teste deve ser realizado somente via cabo, conforme resolução da Anatel. Tem como efetuar ?\n\nA nível de melhorar o seu acesso, vou realizar alguns procedimentos no sistema. Porém, esse procedimento não vai fazer com que a velocidade chegue conforme o contratado, visto que o teste está sendo feito via wi-fi, onde é uma rede propicia a muita interferência e não proporciona um teste correto.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-cb740ca8-4a20-4d2c-a511-bb12c5fd0d7f","nome":"Fala 1","atalho":"/plano1","conteudo":"A Brisanet não garante a entrega do plano contratado por meio de conexão sem fio, apenas por conexão cabeada, tendo em vista que a conexão sem fio é uma conexão difusa que possibilita interferências e problemas de conexão, não ofertando um teste confiável na entrega do plano, mesmo que você esteja próximo do equipamento. Tudo bem?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-f435bed4-984e-4822-a7f9-5cbf6d6a1e3a","nome":"Fala 2","atalho":"/plano2","conteudo":"O teste deve ser realizado somente via cabo, conforme resolução da Anatel. Tem como efetuar ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-3a31bbd5-688a-4e0f-b02f-5a448e4a8148","nome":"Fala 3","atalho":"/plano3","conteudo":"A nível de melhorar o seu acesso, vou realizar alguns procedimentos no sistema. Porém, esse procedimento não vai fazer com que a velocidade chegue conforme o contratado, visto que o teste está sendo feito via wi-fi, onde é uma rede propicia a muita interferência e não proporciona um teste correto.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-a140a3e6-4ce1-46b6-93b1-c9b26d6161fc","tipo":"atendimento","nome":"SINAL IRREGULAR","atalho":"/irregular","categoriaId":"cat-atd-abertura-de-o-s","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Verifiquei no sistema que há uma irregularidade na conexão à fibra. Isso significa que há um problema na conexão poste/modem, que está causando toda a instabilidade que me informou anteriormente.\n\nNo caso, como se trata de um problema físico, será necessário abrir um chamado externo, onde uma de nossas equipes irá ao local para verificar e corrigir a falha.\n\nAqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-3bc33c94-72d0-499b-8656-f9ff25c549ef","nome":"Fala 1","atalho":"/irregular1","conteudo":"Verifiquei no sistema que há uma irregularidade na conexão à fibra. Isso significa que há um problema na conexão poste/modem, que está causando toda a instabilidade que me informou anteriormente.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-87666627-7eca-45a9-ae5f-85bc7a50cef3","nome":"Fala 2","atalho":"/irregular2","conteudo":"No caso, como se trata de um problema físico, será necessário abrir um chamado externo, onde uma de nossas equipes irá ao local para verificar e corrigir a falha.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-fffcd1b8-3bc9-4126-b581-135a3c7d259f","nome":"Fala 3","atalho":"/irregular3","conteudo":"Aqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-f93c4a42-ef06-4239-8e5f-27ec41f307fb","tipo":"atendimento","nome":"PON PISCANDO","atalho":"/pon","categoriaId":"cat-atd-abertura-de-o-s","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Poderia verificar se a *LED PON* está piscando ou apagada?\n\nA LED PON, quando piscando, indica um problema físico. Pode se tratar de uma falha no conector do modem, fibra rompida, tanto dentro como fora da residência. Em outras palavras, ela indica que o sinal que vem da caixa lá no poste não está chegando no aparelho ou está chegando muito fraco.\n\nNo caso, será necessário abrir um chamado externo, onde uma de nossas equipes irá ao local para verificar e corrigir a falha.\n\nAqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-b66512f0-6431-4e16-b9b7-2f35ecd2b437","nome":"Fala 1","atalho":"/pon1","conteudo":"Poderia verificar se a *LED PON* está piscando ou apagada?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-e45bf2bd-e8ca-456a-b76b-6b182c724028","nome":"Fala 2","atalho":"/pon2","conteudo":"A LED PON, quando piscando, indica um problema físico. Pode se tratar de uma falha no conector do modem, fibra rompida, tanto dentro como fora da residência. Em outras palavras, ela indica que o sinal que vem da caixa lá no poste não está chegando no aparelho ou está chegando muito fraco.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-d78a11e9-cf4b-4746-b642-d5859a760052","nome":"Fala 3","atalho":"/pon3","conteudo":"No caso, será necessário abrir um chamado externo, onde uma de nossas equipes irá ao local para verificar e corrigir a falha.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-fc5de4c9-4f80-4908-84dc-f9f9ba1b69b4","nome":"Fala 4","atalho":"/pon4","conteudo":"Aqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-445962b8-76f5-4bae-bc27-3977732dc301","tipo":"atendimento","nome":"NENHUMA LED ATIVA","atalho":"/nenhuma","categoriaId":"cat-atd-abertura-de-o-s","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Tem alguma led ativa na ONU/ROTEADOR ?\n\nEm sua casa algum chegou a manusear ou causar algum dano nesse equipamento ?\n\nHouve queda de energia , chuva ou infiltração , Próximo do equipamento ?\n\nNesse caso como não tem nenhuma led ativa no equipamento , pode ser algum problema com a fonte do equipamento , dessa forma vou mandar uma equipe no local para verificar com você , Certo ?\n\nSe for identificado algum manuseio ou dano ocasionado por alguem no local pode ser gerado valores , Tudo bem ?\n\nAqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-bb9db116-7ed9-4010-9d11-506a7a335098","nome":"Fala 1","atalho":"/nenhuma1","conteudo":"Tem alguma led ativa na ONU/ROTEADOR ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-31ba8101-0ba0-497e-a2ad-969a54cc1d79","nome":"Fala 2","atalho":"/nenhuma2","conteudo":"Em sua casa algum chegou a manusear ou causar algum dano nesse equipamento ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-7133202b-b86a-49d6-8327-5b3ed59459dd","nome":"Fala 3","atalho":"/nenhuma3","conteudo":"Houve queda de energia , chuva ou infiltração , Próximo do equipamento ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-f4f40b9d-b5e5-49a7-9a52-e3411c63fe5a","nome":"Fala 4","atalho":"/nenhuma4","conteudo":"Nesse caso como não tem nenhuma led ativa no equipamento , pode ser algum problema com a fonte do equipamento , dessa forma vou mandar uma equipe no local para verificar com você , Certo ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-cad3f22b-d6f0-4035-85d3-cf9c8f38286d","nome":"Fala 5","atalho":"/nenhuma5","conteudo":"Se for identificado algum manuseio ou dano ocasionado por alguem no local pode ser gerado valores , Tudo bem ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-5b65aed4-a502-4353-8774-208bfc93ae4d","nome":"Fala 6","atalho":"/nenhuma6","conteudo":"Aqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-01512d2e-76b3-46d8-bc2f-cd1b4a5e12eb","tipo":"atendimento","nome":"Lentidão","atalho":"/lentidao","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"Esse é um problema que está ocorrendo em todos os aparelhos conectados?\n\nIndependente de estar perto ou longe do roteador?\n\nTem horários específicos para esse problema ocorrer?\n\nVou efetuar uma reconfiguração completa no serviço, o acesso pode cair, mas retornará em seguida. Só um momento , tudo bem ?\n\nObrigado por aguardar! Todos os procedimentos foram finalizados , Peço que realize alguns testes e veja se normalizou. Tudo bem?\n\nPeço que por gentileza, reinicie os equipamentos para ser validado as configurações.\n\nPeço que você teste durante o dia caso apresente qualquer outra falha pode nos retornar que se for preciso mandamos alguém no local verificar melhor , tudo bem ?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-158a8a13-f7b8-46b8-bdbe-cfd7eaad5546","nome":"Fala 1","atalho":"/lentidao1","conteudo":"Esse é um problema que está ocorrendo em todos os aparelhos conectados?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-7b59d64c-82d1-4843-b9d6-e04c1aee64c3","nome":"Fala 2","atalho":"/lentidao2","conteudo":"Independente de estar perto ou longe do roteador?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-d1385f5f-9b13-4824-bc0d-b965bc6d275f","nome":"Fala 3","atalho":"/lentidao3","conteudo":"Tem horários específicos para esse problema ocorrer?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-e5e41376-5445-4135-b582-f6dbd8d7dfde","nome":"Fala 4","atalho":"/lentidao4","conteudo":"Vou efetuar uma reconfiguração completa no serviço, o acesso pode cair, mas retornará em seguida. Só um momento , tudo bem ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-43939c23-f388-4372-a975-6e0a900819fb","nome":"Fala 5","atalho":"/lentidao5","conteudo":"Obrigado por aguardar! Todos os procedimentos foram finalizados , Peço que realize alguns testes e veja se normalizou. Tudo bem?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-f1e3892a-667c-4fdd-b802-81617b946713","nome":"Fala 6","atalho":"/lentidao6","conteudo":"Peço que por gentileza, reinicie os equipamentos para ser validado as configurações.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-1b85111e-c009-4c10-b369-be8af34cde3e","nome":"Fala 7","atalho":"/lentidao7","conteudo":"Peço que você teste durante o dia caso apresente qualquer outra falha pode nos retornar que se for preciso mandamos alguém no local verificar melhor , tudo bem ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-11999d2c-feb2-4aeb-af8d-34548c6cb3a3","tipo":"atendimento","nome":"Rota inoperante","atalho":"/rota","categoriaId":"cat-atd-problemas","categoria":"Internet","grupo":"","contexto":"","conteudo":"Verifiquei no sistema e constatei que você está sem acesso devido a rota no qual você é conectado(a) está inoperante, decorrente de um rompimento na fibra óptica que atende sua área.\n\nPorém, como o problema já foi identificado e nossa equipe está trabalhando para normalização, peço que, de tempos em tempos, verifique a sua conexão, pois a qualquer momento o serviço retorna, tudo bem? 🧡🧡\n\nAlém disso, como se trata de um problema geral na rede, o prazo para normalização do serviço é de até 24 horas. A Brisanet está acelerando o reparo e o chamado foi aberto com urgência para que o serviço seja restabelecido o mais rápido possível. Tudo bem? 🧡🧡\n\nInfelizmente o reparo tem demorado mais que o esperado, mas as equipes de campo estão trabalhando para restabelecer o serviço o mais rápido possível. Peço que aguarde, ok?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-1c2bb08b-a698-4125-9930-24a30036a966","nome":"Fala 1","atalho":"/rota1","conteudo":"Verifiquei no sistema e constatei que você está sem acesso devido a rota no qual você é conectado(a) está inoperante, decorrente de um rompimento na fibra óptica que atende sua área.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-a37de7cc-3e9e-4585-857c-d3adde81ae28","nome":"Fala 2","atalho":"/rota2","conteudo":"Porém, como o problema já foi identificado e nossa equipe está trabalhando para normalização, peço que, de tempos em tempos, verifique a sua conexão, pois a qualquer momento o serviço retorna, tudo bem? 🧡🧡","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-7c3d72d8-00ef-4511-a535-55249b8eecbd","nome":"Fala 3","atalho":"/rota3","conteudo":"Além disso, como se trata de um problema geral na rede, o prazo para normalização do serviço é de até 24 horas. A Brisanet está acelerando o reparo e o chamado foi aberto com urgência para que o serviço seja restabelecido o mais rápido possível. Tudo bem? 🧡🧡","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-ecad59a8-bd11-410e-9f11-21e48b13ee49","nome":"Fala 4","atalho":"/rota4","conteudo":"Infelizmente o reparo tem demorado mais que o esperado, mas as equipes de campo estão trabalhando para restabelecer o serviço o mais rápido possível. Peço que aguarde, ok?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atendimento-5bbfdd45-8e97-4f47-ac91-5c152f259cd4","tipo":"atendimento","nome":"Los","atalho":"/los","categoriaId":"cat-atd-abertura-de-o-s","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Pode verificar se tem uma *LED VERMELHA* piscando no modem (*aparelho menor*)?\n\nAntes do acesso cair, alguém chegou a manusear o equipamento? Retirar algum cabo?\n\nSe possível, por gentileza me envie uma foto dos equipamentos para que eu analise.\n\nEssa luz vermelha piscando (LOS), indica um problema físico. Ela representa uma falha no conector do modem, fibra rompida, tanto dentro como fora da residência, rota inoperante, entre outros problemas. Em outras palavras, o sinal que vem da caixa lá no poste não está chegando no aparelho.\n\nNesse caso, estou abrindo um chamado externo, onde uma de nossas equipes irá ao local para verificar e corrigir a falha. 😊 É importante ressaltar que, para que essa visita aconteça, é necessário estar com o número de protocolo deste atendimento em mãos.\n\nAqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?\n\nEm relação ao horário, o nosso setor de agendamento estará entrando em contato para marcar a visita, assim considerando o que se aplica melhor ao seu tempo livre.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base importada","modelo":"fluxo","etapas":[{"id":"te-etapa-a658a03a-9b77-4825-bc19-fcb68544e3d0","nome":"Fala 1","atalho":"/los1","conteudo":"Pode verificar se tem uma *LED VERMELHA* piscando no modem (*aparelho menor*)?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-7d153ab6-7005-4778-84da-da32ea99062c","nome":"Fala 2","atalho":"/los2","conteudo":"Antes do acesso cair, alguém chegou a manusear o equipamento? Retirar algum cabo?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-436b1a70-9e4c-4baf-9fc9-6b488ab604e3","nome":"Fala 3","atalho":"/los3","conteudo":"Se possível, por gentileza me envie uma foto dos equipamentos para que eu analise.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-f6e2e042-9fe5-4ed1-a074-b6d9bb9cd1ad","nome":"Fala 4","atalho":"/los4","conteudo":"Essa luz vermelha piscando (LOS), indica um problema físico. Ela representa uma falha no conector do modem, fibra rompida, tanto dentro como fora da residência, rota inoperante, entre outros problemas. Em outras palavras, o sinal que vem da caixa lá no poste não está chegando no aparelho.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-d912406f-d004-42b4-befc-50cd7d876930","nome":"Fala 5","atalho":"/los5","conteudo":"Nesse caso, estou abrindo um chamado externo, onde uma de nossas equipes irá ao local para verificar e corrigir a falha. 😊 É importante ressaltar que, para que essa visita aconteça, é necessário estar com o número de protocolo deste atendimento em mãos.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-4d45d889-02bf-4bd6-ba50-4224c5577cb7","nome":"Fala 6","atalho":"/los6","conteudo":"Aqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-0103d241-a7b5-4bfd-b566-fe3541bd1602","nome":"Fala 7","atalho":"/los7","conteudo":"Em relação ao horário, o nosso setor de agendamento estará entrando em contato para marcar a visita, assim considerando o que se aplica melhor ao seu tempo livre.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atd-001","tipo":"atendimento","nome":"Saudação","atalho":"/oi","categoriaId":"cat-atd-saudacoes","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Olá, tudo bem? 😊 Me chamo [atendente], faço parte do time de suporte técnico da Brisanet e vou te atender hoje.\n\nFalo com o(a) titular do contrato?\n\nPor questão de segurança, me confirma os seguintes dados, por gentileza.\n\n*Nome completo do titular:*\n*Data de nascimento:*\n*Rua:*\n*Bairro:*\n*Número da residência:*\n\nObrigado pelas informações! Como posso te ajudar? 😊","variaveis":["atendente"],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"fluxo","etapas":[{"id":"te-etapa-58c95a72-851a-4646-b282-40386a1a2034","nome":"Saudação","atalho":"/oi1","conteudo":"Olá, tudo bem? 😊 Me chamo [atendente], faço parte do time de suporte técnico da Brisanet e vou te atender hoje.\n\nFalo com o(a) titular do contrato?","triggerKey":"space","opcional":false,"variaveis":["atendente"],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-0c1e5499-064a-408e-8688-f604c09b1b63","nome":"Confirmação de Dados","atalho":"/oi2","conteudo":"Por questão de segurança, me confirma os seguintes dados, por gentileza.\n\n*Nome completo do titular:*\n*Data de nascimento:*\n*Rua:*\n*Bairro:*\n*Número da residência:*","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-0ed5fee5-6ae6-4da3-a436-0a2243bfcd26","nome":"Dados confirmados","atalho":"/oi3","conteudo":"Obrigado pelas informações! Como posso te ajudar? 😊","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atd-003","tipo":"atendimento","nome":"Confirmar dados pendentes","atalho":"/a-saudacao-03","categoriaId":"cat-atd-saudacoes","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Pode por gentileza confirmar os dados? Para prosseguirmos com o atendimento.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-004","tipo":"atendimento","nome":"Você ainda está aí?","atalho":"/oii","categoriaId":"cat-atd-saudacoes","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Olá! Você ainda está aí?\n\nPoxa! Nosso atendimento está sendo encerrado por falta de comunicação. A Brisanet agradece seu contato. Caso preferir, pode entrar em contato com o 0800 281 3017 *(grátis para celular)*, escritório local, site: *www.brisanet.com.br* e *redes sociais*. 🧡🧡🧡","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"fluxo","etapas":[{"id":"te-etapa-68869583-521f-4daa-895b-81f12b2f46cf","nome":"Fala 1","atalho":"/oii1","conteudo":"Olá! Você ainda está aí?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-75d63feb-a9fc-4651-8903-8954fe632ee8","nome":"Fala 2","atalho":"/oii2","conteudo":"Poxa! Nosso atendimento está sendo encerrado por falta de comunicação. A Brisanet agradece seu contato. Caso preferir, pode entrar em contato com o 0800 281 3017 *(grátis para celular)*, escritório local, site: *www.brisanet.com.br* e *redes sociais*. 🧡🧡🧡","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"2026-07-22T11:50:07.915Z","revision":2},{"id":"te-atd-005","tipo":"atendimento","nome":"Momento","atalho":"/min","categoriaId":"cat-atd-saudacoes","categoria":"Saudações","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Só mais um instante\n\nSó um momento","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"fluxo","etapas":[{"id":"te-etapa-68e6cf53-82b3-4927-addd-96db397279a7","nome":"Fala 1","atalho":"/1min","conteudo":"Só mais um instante","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-8b9db53d-82fa-47ac-b531-15a425f0cfa4","nome":"Fala 2","atalho":"/1min2","conteudo":"Só um momento","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atd-010","tipo":"atendimento","nome":"Encaminhar SAC 5G","atalho":"/sac","categoriaId":"cat-atd-transferencias","categoria":"Transferências","grupo":"Atendimento geral","contexto":"SAUDAÇÃO","conteudo":"Peço que aguarde um instante enquanto encaminho você ao setor *SAC 5G*. Por lá, nossa equipe especializada fará a análise detalhada da sua demanda, tudo bem?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-012","tipo":"atendimento","nome":"Bairro Errado","atalho":"/bairro","categoriaId":"cat-atd-dados-incorretos","categoria":"Dados incorretos","grupo":"Atendimento geral","contexto":"DADOS INCORRETOS","conteudo":"O bairro informado está diferente do que mostra em cadastro, verifique por gentileza.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-013","tipo":"atendimento","nome":"Rua errada","atalho":"/rua","categoriaId":"cat-atd-dados-incorretos","categoria":"Dados incorretos","grupo":"Atendimento geral","contexto":"DADOS INCORRETOS","conteudo":"A rua informada está diferente do que mostra em cadastro, verifique por gentileza.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-014","tipo":"atendimento","nome":"Data de nascimento errada","atalho":"/data","categoriaId":"cat-atd-dados-incorretos","categoria":"Dados incorretos","grupo":"Atendimento geral","contexto":"DADOS INCORRETOS","conteudo":"A data de nascimento informada difere da que consta em cadastro, verifique por gentileza.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-015","tipo":"atendimento","nome":"Nome errado","atalho":"/nome","categoriaId":"cat-atd-dados-incorretos","categoria":"Dados incorretos","grupo":"Atendimento geral","contexto":"DADOS INCORRETOS","conteudo":"O nome do titular está diferente do que mostra em cadastro, verifique por gentileza.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-016","tipo":"atendimento","nome":"Corrigir endereço","atalho":"/corrigiren","categoriaId":"cat-atd-dados-incorretos","categoria":"Dados incorretos","grupo":"Atendimento geral","contexto":"DADOS INCORRETOS","conteudo":"Como o endereço está divergente em nosso sistema, oriento que *(em outro momento)* envie um comprovante de residência e o CPF/CNPJ do titular para o e-mail: dados@grupobrisanet.com.br para a correção ser feita.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-017","tipo":"atendimento","nome":"Encerramento","atalho":"/a-encerramento-01","categoriaId":"cat-atd-encerramentos","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Peço que você teste durante o dia caso apresente qualquer outra falha pode nos retornar que se for preciso mandamos alguém no local verificar melhor , tudo bem ?\n\nAjudo em algo mais? 😊\n\nAgradeço pela sua atenção  e te desejo um excelente dia! Um grande abraço, fique com Deus! 💙💙\n\nGostaria de pedir sua ajuda para avaliar o meu atendimento. Sua opinião é fundamental para melhorarmos nossos serviços. 😊🧡","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"fluxo","etapas":[{"id":"te-etapa-7c96855b-2b70-45a2-8187-d7244f4d2e55","nome":"Testar durante o dia","atalho":"/enc1","conteudo":"Peço que você teste durante o dia caso apresente qualquer outra falha pode nos retornar que se for preciso mandamos alguém no local verificar melhor , tudo bem ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-28b17ac3-b0b1-4d6a-842a-214cea769ae8","nome":"Ajudo ?","atalho":"/enc2","conteudo":"Ajudo em algo mais? 😊","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-a556344a-ffce-44e6-80f5-71ae81da94de","nome":"Otimo dia","atalho":"/enc3","conteudo":"Agradeço pela sua atenção  e te desejo um excelente dia! Um grande abraço, fique com Deus! 💙💙","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-a0dd7351-7447-44cc-afeb-0950442c5879","nome":"Avalia ai","atalho":"/enc4","conteudo":"Gostaria de pedir sua ajuda para avaliar o meu atendimento. Sua opinião é fundamental para melhorarmos nossos serviços. 😊🧡","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-atd-027","tipo":"atendimento","nome":"Demanda alta no momento","atalho":"/alta","categoriaId":"cat-atd-encerramentos","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"ENCERRAMENTO","conteudo":"Peço desculpa pela demora em te responder, neste momento, estamos com um volume alto de contato e, por isso, você ficou esperando um tempinho para ser atendido.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-030","tipo":"atendimento","nome":"Não soube confirmar os dados","atalho":"/nsabe","categoriaId":"cat-atd-encerramentos","categoria":"Encerramentos","grupo":"Atendimento geral","contexto":"Cliente não CONFIRMA OS DADOS","conteudo":"Como você não me confirmou as informações solicitadas e por questão de segurança dos dados pessoais do titular, não posso seguir com nosso atendimento. Peço que entre em contato em outro momento com o nome e endereço completo, e data de nascimento do titular, tudo bem? !","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-033","tipo":"atendimento","nome":"Transferência para o corporativo","atalho":"/a-outros-03","categoriaId":"cat-atd-transferencias","categoria":"Transferências","grupo":"Atendimento geral","contexto":"OUTROS","conteudo":"Como o endereço informado se trata de um ponto corporativo e, para que possamos atender melhor a sua demanda, estarei transferindo você ao setor *Suporte Corporativo*. Só um instante!","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-034","tipo":"atendimento","nome":"Não posso ouvir audio","atalho":"/a-outros-04","categoriaId":"cat-atd-saudacoes","categoria":"Saudações","grupo":"Atendimento geral","contexto":"OUTROS","conteudo":"No momento a plataforma está passando por problemas técnicos que impossibilitam baixar áudio, pode escrever por gentileza.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-atd-035","tipo":"atendimento","nome":"Lamento o tempo de espera","atalho":"/a-outros-05","categoriaId":"cat-atd-saudacoes","categoria":"Saudações","grupo":"Atendimento geral","contexto":"OUTROS","conteudo":"Lamento o tempo de espera. No momento estamos com uma alta demanda de atendimento. 💬","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-flow-sem-gerencia","tipo":"atendimento","nome":"Roteador sem gerência","atalho":"/roteador","categoriaId":"cat-atd-abertura-de-o-s","categoria":"Abertura de O.s","grupo":"Sem Gerência TP-Link","contexto":"SEM GERÊNCIA TP-LINK","conteudo":"Vi aqui no sistema que o motivo da sua falta de acesso é devido seu roteador está sem gerência, é um erro no sistema desse aparelho maior.\n\nEstou fazendo algumas atualizações no sistema para tentar normalizar esse seu serviço, Tudo bem?\n\nTem um cabo de rede que liga do aparelho menor para o maior geralmente é um cabo amarelo ou cinza , Veja se esse cabo está conectado na porta azul ou laranja do roteador Tp-link\n\nEsse mesmo cabo veja se está na porta LAN 1 da ONU (aparelho menor)\n\nComo foi feito todos os procedimentos de forma remota porém sem sucesso , dessa forma vou encaminhar uma equipe no local para que possa verificar esse problema com você certo ?\n\nAqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?\n\nFinalizei as atualizações de forma remota , pode testar agora se normalizou ?","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de atendimento","modelo":"fluxo","etapas":[{"id":"te-flow-sem-gerencia-etapa-1","nome":"Explicar o problema","atalho":"/roteador1","conteudo":"Vi aqui no sistema que o motivo da sua falta de acesso é devido seu roteador está sem gerência, é um erro no sistema desse aparelho maior.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-flow-sem-gerencia-etapa-2","nome":"Informar as atualizações","atalho":"/roteador2","conteudo":"Estou fazendo algumas atualizações no sistema para tentar normalizar esse seu serviço, Tudo bem?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-flow-sem-gerencia-etapa-3","nome":"Solicitar o reinício","atalho":"/roteador3","conteudo":"Tem um cabo de rede que liga do aparelho menor para o maior geralmente é um cabo amarelo ou cinza , Veja se esse cabo está conectado na porta azul ou laranja do roteador Tp-link","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-26fc359e-a58f-4ecb-947e-594325b24304","nome":"Fala 4","atalho":"/roteador4","conteudo":"Esse mesmo cabo veja se está na porta LAN 1 da ONU (aparelho menor)","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-e5c6eb73-68ed-4eb6-9009-051c65e851ba","nome":"Fala 5","atalho":"/roteador5","conteudo":"Como foi feito todos os procedimentos de forma remota porém sem sucesso , dessa forma vou encaminhar uma equipe no local para que possa verificar esse problema com você certo ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-7b5762f5-c9da-4deb-bcd4-1715c4c8e7df","nome":"Fala 6","atalho":"/roteador6","conteudo":"Aqui na agenda apresenta vagas para hoje no período da TARDE/MANHÃ , posso agendar a visita ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-f2081d63-b6f7-45c6-b51d-c0da089e666a","nome":"Fala 7","atalho":"/roteador7","conteudo":"Finalizei as atualizações de forma remota , pode testar agora se normalizou ?","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"","revision":0},{"id":"te-prot-001","tipo":"protocolo","nome":"Cabo de fibra rompido","atalho":"/cabo","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que está sem acesso, Com LOS ATIVA, Segundo o cliente o cabo de fibra que liga sua residência foi rompido, Cliente não sabe informar qual o motivo do cabo está rompido, visto rota normal e operante, Dessa forma aberto O. S para que possa ser verificado no local, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-002","tipo":"protocolo","nome":"Cabo de fibra rompido — caminhão","atalho":"/caminhao","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que está sem acesso, Com LOS ATIVA, Segundo o cliente o cabo de fibra que liga sua residência foi rompido, Ciente informa que um caminhão passou e rompeu essa fibra, visto rota normal e operante, Dessa forma aberto O. S para que possa ser verificado no local, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-003","tipo":"protocolo","nome":"Lentidão","atalho":"/lentidao","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informa que está com lentidão, Segundo ele a conexão é instável em todos os aparelhos no local e vem acontecendo durante o dia todo, feito toda a sondagem de instabilidade, ele informa também que poucas pessoas usam seu acesso e não há compartilhamento de senha, Dessa forma foi alterado o canal e reiniciado a ONU em seguida cliente realiza alguns testes e confirma serviço normal.\n\nInforma que está com lentidão, Segundo ele a conexão é instável em todos os aparelhos no local e vem acontecendo durante o dia todo, feito toda a sondagem de instabilidade, ele informa também que poucas pessoas usam seu acesso e não há compartilhamento de senha, Dessa forma foi alterado o canal e reiniciado a ONU em seguida cliente realiza alguns testes e confirma serviço instável , por gentileza verificar no local.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"fluxo","etapas":[{"id":"te-etapa-4d73cd39-d4f2-4dbd-9928-9701aedc1297","nome":"Normalizado","atalho":"/lentidao1","conteudo":"Informa que está com lentidão, Segundo ele a conexão é instável em todos os aparelhos no local e vem acontecendo durante o dia todo, feito toda a sondagem de instabilidade, ele informa também que poucas pessoas usam seu acesso e não há compartilhamento de senha, Dessa forma foi alterado o canal e reiniciado a ONU em seguida cliente realiza alguns testes e confirma serviço normal.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-98ecd6f9-2cc4-4f99-b302-adc60ca9eacd","nome":"Aberto O.S.","atalho":"/lentidao2","conteudo":"Informa que está com lentidão, Segundo ele a conexão é instável em todos os aparelhos no local e vem acontecendo durante o dia todo, feito toda a sondagem de instabilidade, ele informa também que poucas pessoas usam seu acesso e não há compartilhamento de senha, Dessa forma foi alterado o canal e reiniciado a ONU em seguida cliente realiza alguns testes e confirma serviço instável , por gentileza verificar no local.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"2026-07-22T11:08:45.801Z","revision":5},{"id":"te-prot-004","tipo":"protocolo","nome":"Quedas na conexão","atalho":"/quedas","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informa problema de lentidão e quedas na sua conexão. verificado que o sinal da fibra está normal, cliente informa que o problema ocorre em todos os dispositivos, durante o dia todo, o equipamento fica livre, utiliza a rede Wi-Fi próximo ao equipamento e não compartilha senha com vizinhos, Então foi alterado o canal, ativado e reiniciado os equipamentos pelo sistema, após realizar testes foi constatado normalidade no serviço.\n\nInforma problema de lentidão e quedas na sua conexão. verificado que o sinal da fibra está normal, cliente informa que o problema ocorre em todos os dispositivos, durante o dia todo, o equipamento fica livre, utiliza a rede Wi-Fi próximo ao equipamento e não compartilha senha com vizinhos, Então foi alterado o canal, ativado e reiniciado os equipamentos pelo sistema, Cliente informa que o problema persiste dessa forma verificar no local , por gentileza.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"fluxo","etapas":[{"id":"te-etapa-b597518d-b257-4d1f-9dea-85134a942e18","nome":"Normalizado","atalho":"/quedas1","conteudo":"Informa problema de lentidão e quedas na sua conexão. verificado que o sinal da fibra está normal, cliente informa que o problema ocorre em todos os dispositivos, durante o dia todo, o equipamento fica livre, utiliza a rede Wi-Fi próximo ao equipamento e não compartilha senha com vizinhos, Então foi alterado o canal, ativado e reiniciado os equipamentos pelo sistema, após realizar testes foi constatado normalidade no serviço.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-0f6b17fc-f9a0-4583-b858-6081762055fe","nome":"Aberto O.S.","atalho":"/quedas2","conteudo":"Informa problema de lentidão e quedas na sua conexão. verificado que o sinal da fibra está normal, cliente informa que o problema ocorre em todos os dispositivos, durante o dia todo, o equipamento fica livre, utiliza a rede Wi-Fi próximo ao equipamento e não compartilha senha com vizinhos, Então foi alterado o canal, ativado e reiniciado os equipamentos pelo sistema, Cliente informa que o problema persiste dessa forma verificar no local , por gentileza.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"2026-07-22T11:11:30.205Z","revision":15},{"id":"te-prot-005","tipo":"protocolo","nome":"Rota inoperante — aberto para o monitoramento","atalho":"/monit","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informa que está sem acesso, Visto rota inoperante e não tinha chamado em aberto no SASKI, Dessa forma aberto chamado para o IMOC verificar e repassado o prazo ao cliente o mesmo ciente e no aguarde da resolução do problema.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-006","tipo":"protocolo","nome":"Rota inoperante","atalho":"/rota","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informa que está sem acesso, Visto rota inoperante e chamado em aberto, Dessa forma repassado o prazo de acordo com o Saski, cliente ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-007","tipo":"protocolo","nome":"Torre inoperante FWA","atalho":"/torre","categoriaId":"cat-prot-fwa","categoria":"FWA","grupo":"","contexto":"","conteudo":"Problema geral afetando todos os clientes da cidade que utilizam o FWA, devido a falha na torre de sinal. O setor responsável já foi acionado e está verificando a situação, com previsão de normalização do serviço em até 12 horas. Foi informado ao cliente que se trata de um problema geral e que todos os usuários da cidade estão sem sinal, orientando-o a aguardar a resolução do problema dentro do prazo estimado. Cliente ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-008","tipo":"protocolo","nome":"Roteador sem gerência","atalho":"/roteador","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informa que está sem acesso, Visto roteador sem gerência no sistema, Dessa forma foi orientado o cliente a reiniciar os equipamentos no local, em seguida o mesmo realiza testes e confirma serviço normal.\n\nInforma que está sem acesso, Visto roteador sem gerência no sistema, Visto conectado na porta correta, Dessa forma foi orientado o cliente a reiniciar os equipamentos no local também foi ativado e reiniciado no sistema porém sem sucesso, dessa forma como foi realizado todos os procedimentos possíveis aberto O. S. para que possa ser verificado no local, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"fluxo","etapas":[{"id":"te-etapa-376115a6-fc24-415d-8201-4eae0ba26a61","nome":"Normalizado","atalho":"/roteador1","conteudo":"Informa que está sem acesso, Visto roteador sem gerência no sistema, Dessa forma foi orientado o cliente a reiniciar os equipamentos no local, em seguida o mesmo realiza testes e confirma serviço normal.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-be192f3b-4a54-4b29-a677-c20b494fa139","nome":"Aberto O.S.","atalho":"/roteador2","conteudo":"Informa que está sem acesso, Visto roteador sem gerência no sistema, Visto conectado na porta correta, Dessa forma foi orientado o cliente a reiniciar os equipamentos no local também foi ativado e reiniciado no sistema porém sem sucesso, dessa forma como foi realizado todos os procedimentos possíveis aberto O. S. para que possa ser verificado no local, por gentileza verificar.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"2026-07-22T11:14:57.830Z","revision":13},{"id":"te-prot-010","tipo":"protocolo","nome":"Ligações internacionais — solicitação de desbloqueio","atalho":"/internacional","categoriaId":"cat-prot-telefonia","categoria":"Telefonia","grupo":"","contexto":"","conteudo":"Solicita o desbloqueio do seu telefone fixo para ligações internacionais, por gentileza desbloquear a linha da cliente para esse tipo de ligação, a mesma ciente que pode ser gerado taxas adicionais sobre essas ligações.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-011","tipo":"protocolo","nome":"CPE sem sinal — abertura de O.S.","atalho":"/cpe","categoriaId":"cat-prot-fwa","categoria":"FWA","grupo":"","contexto":"","conteudo":"Informa que está sem acesso, visto torre normal e operante, realizado os procedimentos remotos porém sem sucesso, dessa forma aberto O. S. para que seja visto no local.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-013","tipo":"protocolo","nome":"LOS","atalho":"/los","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que está totalmente sem acesso. Visto com o cliente que o led LOS está ativo. Verificado que não houve nenhum manuseio, ou danos físicos no equipamento. Verificado também que não houve nenhum curto, ou infiltração na residência, Rota normal, Aberto O. S para a equipe ir no local verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-016","tipo":"protocolo","nome":"Instabilidade em serviços AWS","atalho":"/aws","categoriaId":"cat-prot-orientacao","categoria":"Orientação","grupo":"","contexto":"","conteudo":"Próprio titular. Entrou em contato relatando lentidão e falha ao acessar alguns sites e serviços. Verificado que o sinal em sua residência está normal e, ao consultar o site Downdetector, foi identificado problema generalizado nos servidores da AWS (Amazon Web Services), afetando diversos sites e plataformas no Brasil e no mundo. Informado ao cliente que a instabilidade é global e não se encontra na rede da Brisanet. Ao nível de manutenção e satisfação do cliente, foi alterado canal e modo, ativado o roteador/roteador e reiniciados os aparelhos. Solicitado ao cliente que acompanhe o acesso nas próximas 24h e, caso o problema persista após a normalização dos serviços da AWS, entrar em contato novamente. Cliente ciente de que o problema não está relacionado ao provedor.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-017","tipo":"protocolo","nome":"Manutenção geral","atalho":"/geral","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Titular entrou em contato informando que esta com instabilidade em seu acesso, Visto problema geral ,  foi informando o restante do prazo para normalização do serviço. Por ser algo regionalizado, não será realizado sondagem. A cliente está ciente que é algo temporário e o setor responsável já está tratando. Contato: [contato].","variaveis":["contato"],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-019","tipo":"protocolo","nome":"ONU desligada da energia — acesso normalizado","atalho":"/desligada","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Relata que não tem sinal de internet. Verificado no sistema ONU desligada. Onde verificado com o cliente que não apresenta nenhum led acessa na ONU. Solicitei para verificar a fonte na tomada e ligar no botão power, verificando se também tem energia na residência. Após religar o equipamento o acesso foi normalizado.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-021","tipo":"protocolo","nome":"Bloqueio total FWA — pagamento há menos de 24 horas","atalho":"/bloqueiot","categoriaId":"cat-prot-fwa","categoria":"FWA","grupo":"","contexto":"","conteudo":"Com status de bloqueio total no sistema, onde o pagamento dele foi identificado a menos de 24 horas, repassado o prazo para restabelecer o serviço, cliente ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-022","tipo":"protocolo","nome":"Bloqueio total FWA — situação com mais de 24 horas","atalho":"/bloqueio","categoriaId":"cat-prot-fwa","categoria":"FWA","grupo":"","contexto":"","conteudo":"Cliente entra em contato informando que está sem o acesso à internet após bloqueio financeiro, mas já faz mais de 24 que realizou o pagamento e mesmo assim não normalizou, visto que no sistema já foi ativado, mas ainda se encontra com (Bloqueio Total), enviado e-mail para os responsáveis verificar problema. A cliente ficou ciente de todas as informações.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-023","tipo":"protocolo","nome":"Cabo drop após reparo da sua ROTA","atalho":"/caborota","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que está sem acesso, visto que a sua rota estava inoperante onde já foi feito o reparo da rota e somente em sua casa permanece sem acesso com LOS ativa, aberto chamado para que possa ser feito reparo no local, cliente ciente do prazo e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-024","tipo":"protocolo","nome":"Torre inoperante FWA","atalho":"/torreino","categoriaId":"cat-prot-fwa","categoria":"FWA","grupo":"","contexto":"","conteudo":"Cliente informa que está sem acesso, visto torre inoperante na região, dessa forma repassado o prazo para normalização do serviço no local, cliente ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-026","tipo":"protocolo","nome":"Jogo instável — serviço normalizado","atalho":"/jogo","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"O mesmo relata instabilidade no jogo, informado que pode ser um possível problema no servido do jogo onde isso pode estar ocasionando esses problemas, feito alterações no sistema o mesmo realiza testes em seguida e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-027","tipo":"protocolo","nome":"Orientação sobre IPv6","atalho":"/ipv6","categoriaId":"cat-prot-sistemas-aplicativos","categoria":"Aplicativos","grupo":"","contexto":"","conteudo":"Próprio(a) titular. Entrou em contato com o número: Solicitou gerenciamento do protocolo IPv6 para uso particular onde foi repassado para o/a mesmo/a que o uso do IPv6 na rede da Brisanet é apenas para conexão de requisições de dados a internet a sistemas que já utilizam IPv6 como protocolo de acesso. Caso a requisição com IPv6 encontre sistemas que utilizam do protocolo IPv4 o mesmo realizará a conversão da requisição em IPv6 para IPv4. Logo o uso do IPv6 na rede Brisanet funciona apenas da seguinte forma: Em modo Router (Roteador) o cliente tem acesso ao protocolo IPv6 apenas em cidades em que o mesmo já foi implementado onde o cliente não tem gerência do mesmo, pois o Modem da Brisanet por padrão não disponibiliza o gerenciamento da ONU. Já em modo Bridge (Transparente) o protocolo IPv6 não têm disponibilidade, assim, o cliente não terá acesso ao IPv6 com o roteador TP-Link Brisanet e também não terá acesso com um Roteador Particular com conexão em Bridge e também não terá em Router pelo modo em DHCP. Dessa forma, o cliente apenas tem disponibilizado o IPv6 com a ONU em modo Router em cidades em que o mesmo já foi implementado, mas o mesmo não tem gerência do protocolo, apenas se utiliza do mesmo para conexão a internet. Cliente ciente das informações.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-028","tipo":"protocolo","nome":"Brisa HDTV travada — abertura de O.S.","atalho":"/tvs","categoriaId":"cat-prot-tv","categoria":"TV","grupo":"","contexto":"","conteudo":"Informa que a tela da TV está travada com o nome Brisanet HDTV, feito os procedimentos no local porém sem sucesso, dessa forma aberto O. S. para que possa ser verificado no local.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-030","tipo":"protocolo","nome":"Roteador reiniciando varias vezes","atalho":"/p-quedas-na-conexao-roteador-reinicia","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Em contato informando que esta passando por quedas na conexão, onde a seu roteador reinicia sozinho e em seguida apresenta um led laranja, mas que normaliza. Como é um problema recorrente e vem acontecendo durante o dia todo , já trocou de tomada e foi feito os procedimentos remotos , aberto O.s para que seja visto esse problema no local.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"2026-07-22T11:15:47.472Z","revision":4},{"id":"te-prot-031","tipo":"protocolo","nome":"Alteração de endereço mal sucedida","atalho":"/altmal","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"O mesmo informa que está sem acesso, com LOS ativa, Visto rota normal e operante, questionado ao cliente se houve manuseio dos equipamentos no local ou até mesmo danos, cliente confirma que não, Fibra visivelmente normal sem nenhum problema, também não houve nenhuma queda de energia ou infiltração próximo do equipamento, cliente informa que oi feita a alteração de endereço hoje e quando chegou na residência e ele já se encontra sem acesso com LOS ativa, dessa forma aberto uma alteração de endereço mal sucedida para que o gestor da equipe responsável possa verificar e direcionar a equipe até o local para realizar o reparo, cliente ciente do prazo e no aguarde da visita, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-032","tipo":"protocolo","nome":"Sistema internos em manutenção","atalho":"/sistema","categoriaId":"cat-prot-sistemas-aplicativos","categoria":"Aplicativos","grupo":"","contexto":"","conteudo":"Cliente entrou em contato relatando instabilidade no acesso. Porém, devido a um problema técnico interno que está afetando parcialmente nossos sistemas e impedindo a execução de procedimentos, foi informado que estamos trabalhando na correção do problema. O prazo estimado para resolução é de 1 hora. O cliente foi notificado e está ciente da situação onde foi orientado ao mesmo que, caso após esse prazo o problema continue, que o mesmo entre em contato novamente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-036","tipo":"protocolo","nome":"Sem acesso com sinal e IP normais — normalizado","atalho":"/normal","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informa está sem acesso a sua internet, verificado sinal normal e ip normal, dessa forma alterado o canal e reiniciado a ONU em seguida cliente realiza testes e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-037","tipo":"protocolo","nome":"OLT em manutenção","atalho":"/p-olt-em-manutencao","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informando estar sem acesso. Verificado que devido à manutenção no gerenciador de distribuição de internet OLT (Optical Line Terminal) o mesmo veio a ficar sem internet. Passado o prazo da URA referente a normalização. Cliente ciente das informações.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-038","tipo":"protocolo","nome":"Instabilidade geral — normalizada","atalho":"/p-instabilidade-geral-normalizada","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informa que está com instabilidade na rede, onde foi identificado instabilidade geral na rede, dessa forma realizado os procedimentos onde em seguida cliente realiza testes e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-039","tipo":"protocolo","nome":"Troca da ONU 2.4 por TP-Link","atalho":"/p-troca-da-onu-2-4-por-tp-link","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Entra em contato solicitando a troca da sua ONU 2.4 para tentar melhorar o serviço no local, visto que ela utiliza uma ONU 2.4, solicitado a troca para que possa melhorar a conexão da cliente no local, sem custos a nível de satisfação da cliente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-040","tipo":"protocolo","nome":"Impressora sem configuração WPS","atalho":"/wps","categoriaId":"cat-prot-orientacao","categoria":"Orientação","grupo":"","contexto":"","conteudo":"Entra em contato informando que não está conseguindo configurar sua impressora pela tecla WPS em nosso equipamento, informado a cliente que essa função é desabilitada em nosso equipamento e que para configurar seu aparelho ela vai precisar utilizar um roteador particular com essa função que ela possa habilita-la.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-041","tipo":"protocolo","nome":"Fibra danificada por cachorro","atalho":"/cachorro","categoriaId":"cat-prot-financeiro","categoria":"Atendimentos com valores","grupo":"","contexto":"","conteudo":"Informa que seu cachorro quebrou a fibra que liga a ONU, a mesma com LOS ativa, informado o valor de 20,00 R$ pela visita onde se for constatado mais danos no equipamento dependendo da verificação da equipe pode ser gerado mais valores a mesma ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-042","tipo":"protocolo","nome":"Fibra danificada por obra na residência","atalho":"/obra","categoriaId":"cat-prot-financeiro","categoria":"Atendimentos com valores","grupo":"","contexto":"","conteudo":"Informa que quebrou a fibra que liga a ONU, Devido uma obra que está sendo feita no local, a mesma com LOS ativa, informado o valor de 20,00 R$ pela visita onde se for constatado mais danos no equipamento dependendo da verificação da equipe pode ser gerado mais valores a mesma ciente e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-044","tipo":"protocolo","nome":"Configuração estruturada","atalho":"/configuracao","categoriaId":"cat-prot-financeiro","categoria":"Atendimentos com valores","grupo":"","contexto":"","conteudo":"Entra em contato solicitando o cabeamento de seu equipamento particular, informado o valor de 90,00 R$ onde o mesmo tem direito a 20 metros de cabo de rede onde se ultrapassar essa metragem é cobrado o valor de 01,30 a cada metro utilizado, o mesmo ciente dos valores e no aguarde da visita, por gentileza verificar.\n\nEntra em contato solicitando o cabeamento de seu equipamento particular, informado o valor de 90,00 R$ onde o mesmo tem direito a 20 metros de cabo de rede onde se ultrapassar essa metragem é cobrado o valor de 01,30 a cada metro utilizado, o mesmo ciente dos valores ficou de fazer contato em outro momento para solicitar o serviço.\n\nEntra em contato solicitando o cabeamento de seu equipamento particular, informado o valor de 90,00 R$ onde o mesmo tem direito a 20 metros de cabo de rede onde se ultrapassar essa metragem é cobrado o valor de 01,30 a cada metro utilizado, o mesmo não aceita os valores dessa forma visto com a supervisão e feito acordo com o cliente com 50% de desconto onde ele vai pagar 45,00 R$ , Caso ultrapasse os 20 metros de cabo vai ser cobrado o valor de 01,30 R$ por metro de cabo utilizado.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"fluxo","etapas":[{"id":"te-etapa-6b5a116f-c047-4b0b-a9f5-609b12203353","nome":"Aberto chamado","atalho":"/configuracao1","conteudo":"Entra em contato solicitando o cabeamento de seu equipamento particular, informado o valor de 90,00 R$ onde o mesmo tem direito a 20 metros de cabo de rede onde se ultrapassar essa metragem é cobrado o valor de 01,30 a cada metro utilizado, o mesmo ciente dos valores e no aguarde da visita, por gentileza verificar.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-8ccd3ec7-5930-472d-8fbd-2aa0be3add9a","nome":"Vai Solicitar depois","atalho":"/configuracao2","conteudo":"Entra em contato solicitando o cabeamento de seu equipamento particular, informado o valor de 90,00 R$ onde o mesmo tem direito a 20 metros de cabo de rede onde se ultrapassar essa metragem é cobrado o valor de 01,30 a cada metro utilizado, o mesmo ciente dos valores ficou de fazer contato em outro momento para solicitar o serviço.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-dd336acd-2070-47da-8369-1b1dd422bb13","nome":"Negociado desconto de 50%","atalho":"/configuracao3","conteudo":"Entra em contato solicitando o cabeamento de seu equipamento particular, informado o valor de 90,00 R$ onde o mesmo tem direito a 20 metros de cabo de rede onde se ultrapassar essa metragem é cobrado o valor de 01,30 a cada metro utilizado, o mesmo não aceita os valores dessa forma visto com a supervisão e feito acordo com o cliente com 50% de desconto onde ele vai pagar 45,00 R$ , Caso ultrapasse os 20 metros de cabo vai ser cobrado o valor de 01,30 R$ por metro de cabo utilizado.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"2026-08-06T13:11:19.150Z","revision":4},{"id":"te-prot-045","tipo":"protocolo","nome":"Câmera particular em redes unificadas","atalho":"/camera","categoriaId":"cat-prot-orientacao","categoria":"Orientação","grupo":"","contexto":"","conteudo":"Informa que perdeu acesso ao serviço de suas câmeras particulares no local, visto que seus aparelhos tem acesso apenas a rede 2.4 e nesse equipamento da Brisanet como possui as redes unificadas tem essa dificuldade para fazer essa conexão, orientado cliente a comprar um roteador particular só para conexão dessas câmeras ou é possível fazer a troca desse roteador pela ONU 5.8, informado as desvantagens desse equipamento, o mesmo ciente ficou de verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-046","tipo":"protocolo","nome":"Conecta+","atalho":"/conecta","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"A/o mesma/o entra em contato solicitando o cabeamento de seu computador particular no local, Visto que a/o cliente é assinante do conecta+, foi informado que ela tem direito ao cabeamento e configuração de até 4 dispositivos no local onde ela tem direito até 30 metros de cabo de rede e se ultrapassar essa metragem é cobrado o valor de 01,30 a cada metro utilizado, A/o mesma/o ciente dos valores e no aguarde da visita, por gentileza verificar no local.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-047","tipo":"protocolo","nome":"Telefone na tecla incorreta — normalizado","atalho":"/teclain","categoriaId":"cat-prot-telefonia","categoria":"Telefonia","grupo":"","contexto":"","conteudo":"Informa que seu telefone fixo não está recebendo e nem realizando ligações, Visto telefone registrado e na porta correta, foi visto que estava na tecla LO, Orientado cliente a colocar na letra HI em seguida realizado testes com o cliente o mesmo confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-048","tipo":"protocolo","nome":"Bloqueio por inadimplência","atalho":"/inadimplencia","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Entra em contato informando que esta sem acesso à internet, visto que o contrato está bloqueado por ausência de pagamento/inadimplência financeira. Passado a informação para o cliente. O mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-051","tipo":"protocolo","nome":"Ligação caiu","atalho":"/caiu","categoriaId":"cat-prot-outros","categoria":"Outros","grupo":"","contexto":"","conteudo":"Ligação caiu tentei contato com a cliente porém sem sucesso, dessa forma encerrado o chamado.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-053","tipo":"protocolo","nome":"PON piscando","atalho":"/pon","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"entra em contato , o/a mesmo/a informa esta sem acesso com a LED PON ativa , Questionado ao mesmo/a sobre manuseio dos equipamentos o/a mesmo/a informa que ninguém chegou a manusear os equipamentos , também informa que não houve nenhuma queda de energia no local , Dessa forma reconfigurado a ONU em seguida o/a mesmo/a testa e informa Acesso normalizado.\n\nInforma que está sem acesso com a PON PISCANDO, Feito a sondagem, o/a mesmo/a informa que não houve manuseio dos equipamentos da Brisanet, nem queda de energia ou infiltração próximo do aparelho, visto rota normal e operante, Dessa Forma aberto O. S. para verificação no local, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"fluxo","etapas":[{"id":"te-etapa-f0ffd34b-c64e-4a14-b1fb-1669441c6e29","nome":"Normalizado","atalho":"/pon1","conteudo":"entra em contato , o/a mesmo/a informa esta sem acesso com a LED PON ativa , Questionado ao mesmo/a sobre manuseio dos equipamentos o/a mesmo/a informa que ninguém chegou a manusear os equipamentos , também informa que não houve nenhuma queda de energia no local , Dessa forma reconfigurado a ONU em seguida o/a mesmo/a testa e informa Acesso normalizado.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""},{"id":"te-etapa-c01efd67-b7aa-4085-8d85-82f0c2e9141b","nome":"Aberto O.S.","atalho":"/pon2","conteudo":"Informa que está sem acesso com a PON PISCANDO, Feito a sondagem, o/a mesmo/a informa que não houve manuseio dos equipamentos da Brisanet, nem queda de energia ou infiltração próximo do aparelho, visto rota normal e operante, Dessa Forma aberto O. S. para verificação no local, por gentileza verificar.","triggerKey":"space","opcional":false,"variaveis":[],"palavrasChave":[],"acaoTipo":"inserir","acaoAlvoId":"","acaoUrl":"","acaoPersonalizada":""}],"updatedAt":"2026-07-22T11:18:39.560Z","revision":5},{"id":"te-prot-056","tipo":"protocolo","nome":"Queda de energia — problema geral","atalho":"/energia","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informa que está sem acesso, devido uma queda de energia, visto que se trata de um problema geral em sua região devido essa oscilação, foi orientado cliente a aguardar, o mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-058","tipo":"protocolo","nome":"Roteador sem LEDs ativos — abertura de O.S.","atalho":"/rnenhum","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que não tem nenhuma led ativa no TP-Link da Brisanet, visto rota normal e operante, a/o mesma/o informa que ninguém veio a mexer no equipamento ou causar nenhum tipo de dano, também não houve queda de energia nem infiltração próximo do equipamento, Dessa forma informado a mesma que se for constatado algum tipo de dano no equipamento, dependendo da avaliação do técnico pode gerar custos, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-059","tipo":"protocolo","nome":"ONU somente com LED Power ativo — abertura de O.S.","atalho":"/powera","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que está sem acesso, apenas a led power está ativa na ONU, Foi alterado a tomada, visto botão power ativo e mesmo assim o equipamento permanece apenas com a power ativa, questionado se houve manuseio dos equipamentos o mesmo informa que não, também não houve nenhuma queda de energia ou infiltração próximo do equipamento, Dessa forma como foi realizado todos os procedimentos no local e mesmo assim sem sucesso, Cliente ciente que se for constatado mal uso pode ser gerado valores dependendo da verificação da equipe no local, aberto O. S. para que possa ser verificado no local.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-060","tipo":"protocolo","nome":"Alcance insuficiente do Wi-Fi","atalho":"/alcance","categoriaId":"cat-prot-orientacao","categoria":"Orientação","grupo":"","contexto":"","conteudo":"Entra em contato informando que o sinal não esta chegando em alguns pontos de sua residência, Foi informado a mesma que dependendo do local onde o equipamento está instalado pode ocorrer esse tipo de instabilidade, O indicado nesses casos onde o sinal não sendo distribuído para toda a residência, é que seja instalado ou um roteador particular ou um repetidor de sinal justamente para que esse sinal possa ser ampliado para toda a residência o mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-061","tipo":"protocolo","nome":"Redes unificadas — rede turbo não visível","atalho":"/unificada","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Deseja saber porque a rede turbo não está visível em seu dispositivo, Visto que o mesma possui redes unificadas, Foi informado ao mesmo que vai apresentar sempre o mesmo nome de rede no seu dispositivo, se o seu equipamento for compatível ele vai conseguir utilizar ambas as redes porém vai apresentar sempre o mesmo nome de rede, dependendo da distância que ela acessar do equipamento vai ter a alternância dessas duas redes o mesma ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-062","tipo":"protocolo","nome":"Plano não chega ao contratado pelo Wi-Fi","atalho":"/plano","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Entra em contato informando que seu plano não está chegando o contratado, Visto que o mesmo está efetuando esses testes através da rede Wi-Fi, foi informado ao mesmo sobre as possíveis interferência que podem ocorrer na rede, indicado o mesmo a fazer o teste através de uma rede cabeada pois como seria uma ligação física não ia sofrer com nenhum tipo de interferência e esse plano chegaria corretamente, O mesmo ciente ficou de verificar no local.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-063","tipo":"protocolo","nome":"Quedas na conexão - Recorrente","atalho":"/p-revisao-de-equipamentos-por-quedas","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Cliente entra em contato, o mesmo informa que está sofrendo com quedas em sua conexão e lentidão o mesmo informa que já é um problema recorrente em seu sistema, e crer que seja um problema ou com seu moldem ou com o cabo de fibra que vem para sua residência, dessa forma o mesmo solicita que uma equipe vá até o local para realizar uma revisão em seus equipamentos para que possa ser encontrado o motivo dessa instabilidade em sua rede.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"2026-07-22T11:19:47.377Z","revision":3},{"id":"te-prot-064","tipo":"protocolo","nome":"Alteração de endereço — cobrança dentro do prazo","atalho":"/p-alteracao-de-endereco-cobranca-dent","categoriaId":"cat-prot-cobrancas","categoria":"Cobranças","grupo":"","contexto":"","conteudo":"Entra em contato cobrando sua alteração de endereço, Visto que a solicitação estava dentro prazo, porém o mesmo solicita urgência, Coloquei todas as informações no chamado externo em aberto cobrando a alteração de endereço do cliente, reforçado também o prazo junto ao cliente o mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-065","tipo":"protocolo","nome":"Alteração de endereço — cobrança fora do prazo","atalho":"/p-alteracao-de-endereco-cobranca-fora","categoriaId":"cat-prot-cobrancas","categoria":"Cobranças","grupo":"","contexto":"","conteudo":"Cliente entra em contato cobrando sua alt. de endereço, visto chamado em aberto e fora do prazo, onde o chamado já se encontra para uma equipe externa, dessa forma entrei em contato com o agendador de reparo da cidade em seguida repassei o prazo a cliente a mesma ciente e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-066","tipo":"protocolo","nome":"Cobrança de reparo — dentro do prazo","atalho":"/p-cobranca-de-reparo-dentro-do-prazo","categoriaId":"cat-prot-cobrancas","categoria":"Cobranças","grupo":"","contexto":"","conteudo":"Entra em contato cobrando o reparo de sua conexão, Visto chamado em aberto e dentro do prazo de atendimento, foi reforçado o prazo junto do cliente e realizado a cobrança no chamado aberto a/o mesma/o ciente e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-067","tipo":"protocolo","nome":"Cobrança de reparo — fora do prazo","atalho":"/p-cobranca-de-reparo-fora-do-prazo","categoriaId":"cat-prot-cobrancas","categoria":"Cobranças","grupo":"","contexto":"","conteudo":"Entra em contato cobrando o reparo de sua conexão, visto chamado em aberto e fora do prazo de atendimento, entrei em contato com os responsáveis pela equipe e foi repassado o prazo a/o cliente a/o mesma ciente e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-068","tipo":"protocolo","nome":"Alteração de senha","atalho":"/senha","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Entra em contato solicitando alteração da senha da sua rede, Dessa forma alterado a senha no sistema e repassado a nova senha ao cliente, o mesmo se conecta com a senha repassada e informa acesso normal.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-069","tipo":"protocolo","nome":"Cabo de fibra baixo","atalho":"/baixo","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que o cabo de fibra que liga sua residência está baixo, Como possui o risco de acidente, devido afiação está baixo, Dessa forma aberto O. S. para que uma equipe vá até o local fazer ancoragem desse cabo de fibra de forma correta, o mesmo ciente do prazo e no aguarde da visita, por gentileza priorizar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"2026-07-22T11:20:04.441Z","revision":2},{"id":"te-prot-070","tipo":"protocolo","nome":"Cabo de fibra baixo - Caminhão","atalho":"/baixoc","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que um caminhão passou e arrancou uma parte da fibra e deixou ela baixa, Ele se encontra com acesso porém como tem essa parte baixa da fibra ele solicita a visita de uma equipe no local para corrigir essa afiação, Dessa forma aberto O. S. para que possa ser feito a ancoragem dessa fibra, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"2026-07-22T11:20:19.864Z","revision":3},{"id":"te-prot-071","tipo":"protocolo","nome":"Mudança de endereço — Encaminhado SAC COMERCIAL","atalho":"/p-mudanca-de-endereco-solicitacao-enc","categoriaId":"cat-prot-outros","categoria":"Outros","grupo":"","contexto":"","conteudo":"O mesmo deseja realizar uma alteração de endereço, Dessa forma repassado para o setor responsável que é o setor de alteração de endereço, A/O mesma/o ficou de verificar junto ao setor responsável.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-072","tipo":"protocolo","nome":"Alteração de cômodo — mesmo cômodo","atalho":"/mesmoco","categoriaId":"cat-prot-financeiro","categoria":"Atendimentos com valores","grupo":"","contexto":"","conteudo":"Entra em contato solicitando uma alt. de cômodo, Foi informado ao mesmo que se for no mesmo cômodo é cobrado o valor de 20 reais mais a metragem de cabo de fibra utilizada que é 00,60 centavos ou 01,30 no caso do cabo de rede, o/a mesmo/a ciente dos valores e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-073","tipo":"protocolo","nome":"Alteração de cômodo — outro cômodo","atalho":"/altcomo","categoriaId":"cat-prot-financeiro","categoria":"Atendimentos com valores","grupo":"","contexto":"","conteudo":"Entra em contato solicitando uma alteração de cômodo, informado ao mesmo que é cobrado o valor de 30 reais mais a metragem de cabo de fibra que é 00,60 centavos a cada metro utilizado ou 01,30 no caso do cabo de rede, O/A mesma/o ciente dos valores e no aguarde da visita, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-074","tipo":"protocolo","nome":"Sinal irregular","atalho":"/irregular","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Entra em contato informando que está com quedas na conexão, Dessa forma consultado o sinal do cabo de fibra e visto sinal muito irregular em comparação com o sinal da sua rota, Dessa forma aberto O. S. para que uma equipe vá até o local fazer o reparo e deixar esse sinal dentro dos padrões da empresa, Cliente ciente do prazo e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"2026-07-22T11:20:34.448Z","revision":3},{"id":"te-prot-075","tipo":"protocolo","nome":"Rota com sinal irregular — chamado em aberto","atalho":"/p-rota-com-sinal-irregular-chamado-em","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Cliente entra em contato informando que está sem acesso, visto rota com sinal irregular e chamado aberto no saski, repassado o prazo para normalização o mesmo ciente e no aguarde do reparo.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-076","tipo":"protocolo","nome":"Abertura de portas da ONU","atalho":"/p-abertura-de-portas-da-onu","categoriaId":"cat-prot-orientacao","categoria":"Orientação","grupo":"","contexto":"","conteudo":"O/A mesmo/a entra em contato solicitando a abertura de mais portas para o uso de internet, Informado a/o mesmo que na ONU apenas a porta lan 1 é liberada para o uso de internet, Para abertura de mais portas seria necessário a utilização ou de um roteador particular ou de switch o/a mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-077","tipo":"protocolo","nome":"Reclamação de instalação — sem acesso","atalho":"/p-reclamacao-de-instalacao-sem-acesso","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"O mesmo informa que está sem acesso, com LOS ativa, Visto rota normal e operante, questionado ao cliente se houve manuseio dos equipamentos no local ou até mesmo danos, cliente confirma que não, Fibra visivelmente normal sem nenhum problema, também não houve nenhuma queda de energia ou infiltração próximo do equipamento, Visto que seu serviço foi instalado recentemente e ele já se encontra sem acesso com LOS ativa, dessa forma aberto uma reclamação de instalação para que o gestor da equipe responsável possa verificar e direcionar a equipe até o local para realizar o reparo, cliente ciente do prazo e no aguarde da visita, por gentileza verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-078","tipo":"protocolo","nome":"ONU sem IP — normalizado","atalho":"/p-onu-sem-ip-normalizado","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Cliente entra em contato, confirma dados, visto ONU sem Ip, dessa forma reconfigurado o equipamento e após isso o mesmo testa e informa acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-079","tipo":"protocolo","nome":"Sem conexão com VPN","atalho":"/p-sem-conexao-com-vpn","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Cliente entra em contato, confirma dados, o mesmo informa que não está conseguindo acessar sua VPN, cliente informa que já viu essa questão com o setor de TI, onde o problema seria na rede, informado ao mesmo que nesse caso seria necessário fazer a configuração da ONU em modo bridge além de ter conectado um roteador particular em modo PPOE, caso com esses procedimentos não venha a normalizar vai ser preciso adquirir o endereço de IP fixo, o mesmo ciente das informações.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-080","tipo":"protocolo","nome":"Plano não chega ao contratado na rede cabeada — abertura de O.S.","atalho":"/p-plano-nao-chega-ao-contratado-na-re","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informou que seu plano não estava chegando ao contratado. O seu computador estava conectado via rede cabeada foi realizado testes pelo velocímetro, porém verificado que não estaria chegando o plano contratado, verificado que a sua placa é compatível e os cabos UTPs, dessa forma foi reconfigurado e reiniciado a ONU, após realizar testes o mesmo informou que o serviço não normalizou, dessa forma foi aberto uma O. S para equipe passar no local e verificar. Cliente ciente do prazo de 48h e no aguardo.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-081","tipo":"protocolo","nome":"Plano não chega ao contratado na rede cabeada — normalizado","atalho":"/p-plano-nao-chega-ao-contratado-na-2","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informa que o plano não está chegando ao contratado, O mesmo informa que foi realizado o teste pela rede cabeada e um computador. Questionado se tem outros equipamentos conectados durante os testes, se o equipamento suporte a banda contratada, se foi feito em velocímetro ou se tem Roteadores e Switch conectados à ONU, Reconfigurado a ONU. O mesmo informa que normalizou.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-082","tipo":"protocolo","nome":"Plano não chega ao contratado — equipamento com barramento 100","atalho":"/p-plano-nao-chega-ao-contratado-equip","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Informa que seu plano não está chegando ao contratado, Visto que os testes estão sendo feitos na rede cabeada direito no equipamento da Brisanet, Cliente não utiliza nenhum roteador particular ou switch e somente ele está conectado na rede, cliente informa que seu equipamento é compatível com o plano contratado, Dessa forma foi reconfigurado a ONU em seguida cliente realiza testes e informa que o erro permanece, dessa forma solicitado um acesso remoto realizado testes junto do cliente e visto que sua maquina é barramento 100, o mesmo ciente da limitação ficou de realizar testes em equipamento compatível com sua velocidade.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-083","tipo":"protocolo","nome":"Controle remoto com problema","atalho":"/p-controle-remoto-com-problema","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Cliente entra em contato, confirma dados, a mesma informa que seu controle remoto de sua Tv está com mal funcionamento, cliente já tentou trocar as pilhas porém sem sucesso, a mesma informa que ninguém veio a derrubar ou causar nenhum tipo de dano, a mesma ciente que se for constatado algum tipo de dano por parte do cliente, pode ser que venha a gerar custos dependendo da avaliação do técnico, cliente ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-084","tipo":"protocolo","nome":"TV sem conexão Wi-Fi — visita particular","atalho":"/p-tv-sem-conexao-wi-fi-visita-particu","categoriaId":"cat-prot-financeiro","categoria":"Atendimentos com valores","grupo":"","contexto":"","conteudo":"Cliente entra em contato, confirma dados, o mesmo informa que sua TV não esta funcionando o Wi-Fi em sua TV, tentado reconfigurar e trocar a frequência, tentado orientar o mesmo a se conectar nesse aparelho porém sem sucesso, como se tratava apenas de sua TV foi informado ao mesmo que poderia ser algum problema relacionado a esse equipamento e para que eu possa enviar uma equipe até o local seria cobrado o valor de 20 reais pela visita, o mesmo ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-085","tipo":"protocolo","nome":"Auxílio no aplicativo Brisa Cliente","atalho":"/p-auxilio-no-aplicativo-brisa-cliente","categoriaId":"cat-prot-sistemas-aplicativos","categoria":"Aplicativos","grupo":"","contexto":"","conteudo":"Cliente entra em contato, o mesmo solicita auxílio para acessar o aplicativo BRISA CLIENTE; instruções repassadas e dúvidas sobre o portal sanadas.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-086","tipo":"protocolo","nome":"NAT restrito em jogos online","atalho":"/p-nat-restrito-em-jogos-online","categoriaId":"cat-prot-orientacao","categoria":"Orientação","grupo":"","contexto":"","conteudo":"Cliente entra em contato, confirma dados, o mesmo informa está com problemas em acessar alguns jogos onlines, logo, foi analisado que o mesmo está com restrição de NAT, visto que utiliza a ONU em modo router. Então foi indicado ao cliente realizar a aquisição de um roteador particular e alterar a ONU para modo Bridge, em última instância, se o problema não for resolvido, foi indicado a contratação de um plano de IP fixo. Cliente ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-087","tipo":"protocolo","nome":"IPTV com lentidão exclusiva","atalho":"/p-iptv-com-lentidao-exclusiva","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"Entrou em contato informando estar com problemas de lentidão exclusivamente em um serviço de IPTV pois quando está assistindo alguma programação, o serviço fica travando. Dessa forma expliquei ao cliente que o se são utilizados servidores piratas que não comporta vários acessos ao mesmo tempo. Dessa forma pedi para o cliente testar em outros aplicativos (Netflix e YouTube) onde veio a verificar que o serviço está normal; resumindo, a conexão do cliente está normal, o único problema é no seu equipamento particular que não opera como a mesma deseja.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-088","tipo":"protocolo","nome":"Reclamação de instalação — cabo de rede não disponibilizado","atalho":"/p-reclamacao-de-instalacao-cabo-de-re","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que o cabo de rede não foi disponibilizado no ato da instalação. Segundo o cliente ele fez a solicitação a equipe no local porém não foi disponibilizado. Foi aberto uma reclamação de instalação para o gestor de instalação da equipe, para verificação do ocorrido e caso necessário mandar uma equipe técnica novamente ao local. Cliente ciente do prazo e no aguarde da visita.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-089","tipo":"protocolo","nome":"Alteração da ONU para modo Bridge","atalho":"/p-alteracao-da-onu-para-modo-bridge","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"(Cliente) solicitou a troca do modo da ONU para o modo Bridge, realizado a alteração e ativação da ONU foi passado as informações de PPPoE (Login: E-mail no Revan, senha criada para o modo transparente) o/a mesmo/a adicionou ao seu dispositivo roteador particular na opção PPPoE as informações deixando todo o gerenciamento da rede de internet ao seu equipamento. Atendimento realizado com sucesso.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-090","tipo":"protocolo","nome":"Alteração da ONU de Bridge para Router","atalho":"/p-alteracao-da-onu-de-bridge-para-rou","categoriaId":"cat-prot-internet","categoria":"Internet","grupo":"","contexto":"","conteudo":"(Cliente) solicitou a troca do modo da ONU de Bridge para Router deixando o gerenciamento pela ONU onde o mesmo testou o acesso ao sistema aprovando utilização. Chamado finalizado com sucesso.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-091","tipo":"protocolo","nome":"Aquisição de roteador TP-Link","atalho":"/p-aquisicao-de-roteador-tp-link","categoriaId":"cat-prot-financeiro","categoria":"Atendimentos com valores","grupo":"","contexto":"","conteudo":"Cliente entrou em contato solicitando o Roteador TP-Link. informado ao mesmo sobre a taxa de R$100,00 para adquirir o equipamento, podendo ser parcelado em até 4x de R$25,00. Cliente ciente dos valores e no aguardo da visita. Por gentileza aos responsáveis verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-092","tipo":"protocolo","nome":"Erro NTP — abertura de O.S.","atalho":"/p-erro-ntp-abertura-de-o-s","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que o serviço de Tv não está funcionando, Segundo o mesmo apresenta erro de NTP, Visto cabeamento correto entre o STB e a ONU, foi feito todo o procedimento de NET> IP > DHCP.. Letra A vermelha duas vezes e sair varias vezes porém sem sucesso, foi reiniciado os equipamentos manualmente mais sem êxito, Dessa forma aberto O. S para que uma equipe vá até o local verificar o mesmo ciente do prazo e no aguarde.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-093","tipo":"protocolo","nome":"Erro NTP — serviço normalizado","atalho":"/p-erro-ntp-servico-normalizado","categoriaId":"cat-prot-tv","categoria":"TV","grupo":"","contexto":"","conteudo":"Cliente informa que o serviço de Tv não está funcionando, Segundo o mesmo apresenta erro de NTP, Visto cabeamento correto entre o STB e a ONU, foi feito todo o procedimento de NET> IP > DHCP.. Letra A vermelha duas vezes e sair varias vezes porém sem sucesso, foi reiniciado os equipamentos manualmente em seguida cliente testa e confirma serviço normal.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-094","tipo":"protocolo","nome":"TV com tela preta ou travada — restaurada","atalho":"/p-tv-com-tela-preta-ou-travada-restau","categoriaId":"cat-prot-tv","categoria":"TV","grupo":"","contexto":"","conteudo":"(Cliente) entrou em contato informando que sua TV estaria com a Tela Preta / Travada, feito o procedimento para voltar aos padrões de fábrica do Set Box (Menu + Botão B de cor verde aparecendo a informação: Deseja restaurar para configurações de fábrica? apertando Ok restaurando o Set Box) e com isso o serviço foi normalizado. Cliente realizou testes.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-095","tipo":"protocolo","nome":"Receptor bloqueado — desbloqueado pela liderança","atalho":"/p-receptor-bloqueado-desbloqueado-pel","categoriaId":"cat-prot-tv","categoria":"TV","grupo":"","contexto":"","conteudo":"Entrou em contato informando que está sua TV está sem serviço, Seu receptor está bloqueado sendo que a situação financeira está ok dessa forma falei com o líder de plantão, onde o serviço de TV foi desbloqueado, após isso o serviço ficou normal.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-096","tipo":"protocolo","nome":"TV na porta incorreta — normalizada","atalho":"/p-tv-na-porta-incorreta-normalizada","categoriaId":"cat-prot-tv","categoria":"TV","grupo":"","contexto":"","conteudo":"Cliente entra em contato, confirma dados, informa que a TV está com tela preta, com falha de autenticação, visto STB na porta errada, dessa forma pedi para o cliente colocar na porta Lan 2, que é a porta correta, ao fazer esse procedimento o cliente informa acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-097","tipo":"protocolo","nome":"Telefonia com problema geral","atalho":"/p-telefonia-com-problema-geral","categoriaId":"cat-prot-telefonia","categoria":"Telefonia","grupo":"","contexto":"","conteudo":"Cliente entra em contato, confirma dados, o mesmo informa que não está conseguindo realizar ligações, visto que se trata de um problema geral na telefonia, repassado o prazo de 24 horas para normalização a mesma ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-098","tipo":"protocolo","nome":"Telefonia bloqueada por limite","atalho":"/p-telefonia-bloqueada-por-limite","categoriaId":"cat-prot-telefonia","categoria":"Telefonia","grupo":"","contexto":"","conteudo":"Cliente entra em contato, informa que não está conseguindo realizar ligações, visto bloqueado por limite, repassado informações a cliente, ficou ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-099","tipo":"protocolo","nome":"Telefone desativado — normalizado","atalho":"/p-telefone-desativado-normalizado","categoriaId":"cat-prot-telefonia","categoria":"Telefonia","grupo":"","contexto":"","conteudo":"Informa que não consegue usar o seu telefone fixo, telefone não realiza nem recebe chamadas, está mudo, visto telefonia desativada, ativado ONU, em seguida cliente testa e confirma acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-100","tipo":"protocolo","nome":"Telefonia com falha de autenticação — normalizada","atalho":"/p-telefonia-com-falha-de-autenticacao","categoriaId":"cat-prot-telefonia","categoria":"Telefonia","grupo":"","contexto":"","conteudo":"Informa que não consegue usar o seu telefone fixo, telefone não realiza nem recebe chamadas, está mudo, visto telefonia com falha de autenticação, ativado ONU, em seguida cliente testa e confirma acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-101","tipo":"protocolo","nome":"Telefonia com chiado — abertura de O.S.","atalho":"/p-telefonia-com-chiado-abertura-de-o","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Cliente entra em contato, confirma dados, informando que o telefone fixo está com um chiado no fone, dessa forma foi verificado que o equipamento é da empresa, foram verificado os cabos, reconfigurado a ONU/telefonia, porém o mesmo informa que o problema ainda persiste mesmo após os procedimentos, dessa forma foi aberto O. S. por gentileza passar no local e verificar.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-102","tipo":"protocolo","nome":"Telefone na porta incorreta — normalizado","atalho":"/p-telefone-na-porta-incorreta-normali","categoriaId":"cat-prot-telefonia","categoria":"Telefonia","grupo":"","contexto":"","conteudo":"Cliente entra em contato, confirma dados, informa que não conseguir usar o seu telefone fixo, telefone não realiza nem recebe chamadas, está mudo, visto telefonia registrada e normal, visto na porta Phone 2, auxiliado ao mesmo/a a colocar na porta Phone 1, em seguida cliente testa e confirma acesso normalizado.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-103","tipo":"protocolo","nome":"Telefone mudo — abertura de O.S.","atalho":"/p-telefone-mudo-abertura-de-o-s","categoriaId":"cat-prot-instalacao-reparo","categoria":"Abertura de O.s","grupo":"","contexto":"","conteudo":"Informa que não conseguir usar o seu telefone fixo ele está mudo, Visto na porta correta e registrado normal, Foi verificado as teclas laterais desse seu telefone e todas posicionadas de forma correta, realizado testes serviço ainda continua mudo, Dessa forma aberto O. S para verificação.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-104","tipo":"protocolo","nome":"Troca de número de telefone fixo","atalho":"/p-troca-de-numero-de-telefone-fixo","categoriaId":"cat-prot-telefonia","categoria":"Telefonia","grupo":"","contexto":"","conteudo":"(Cliente) solicitou a troca do número de telefone por um novo [motivo]. Informado ao/à mesmo/a que será enviado um E-mail para o setor responsável. O e-mail deverá ser direcionado aos responsáveis internos para realização da troca do número atual por um novo. Repassado o prazo de 5 dias para resolução da solicitação, cliente ciente das informações. Aguardando informações do processo.","variaveis":["motivo"],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0},{"id":"te-prot-105","tipo":"protocolo","nome":"Visita técnica para cabeamento particular","atalho":"/p-visita-tecnica-para-cabeamento-part","categoriaId":"cat-prot-financeiro","categoria":"Atendimentos com valores","grupo":"","contexto":"","conteudo":"Entra em contato, confirma dados, Informa que deseja cabear sua TV informado valor da visita particular de 20 reais, incluso 15 metros de cabos, e caso passe desse valor será cobrado 1,30 por metro o mesmo ciente, aberto O. S, informado prazo de 48 horas, cliente ciente.","variaveis":[],"favorito":false,"ativo":true,"triggerKey":"space","origem":"Base de protocolos","modelo":"unico","etapas":[],"updatedAt":"","revision":0}];

  class TextExpressApp {
    constructor(root) {
      this.root = root;
      this.panel = root.querySelector(".te-panel");
      this.reopenButton = root.querySelector(".te-reopen-button");
      this.listElement = root.querySelector("#te-snippet-list");
      this.emptyState = root.querySelector("#te-empty-state");
      this.detailPane = root.querySelector("#te-detail-pane");
      this.categoryBar = root.querySelector("#te-category-bar");
      this.searchInput = root.querySelector("#te-search-input");
      this.countBadge = root.querySelector("#te-count-badge");
      this.statusCounts = root.querySelector("#te-status-counts");
      this.importInput = root.querySelector("#te-import-input");
      this.snippetModal = root.querySelector("#te-snippet-modal");
      this.snippetForm = root.querySelector("#te-snippet-form");
      this.variableModal = root.querySelector("#te-variable-modal");
      this.variableForm = root.querySelector("#te-variable-form");
      this.variableFields = root.querySelector("#te-variable-fields");
      this.settingsModal = root.querySelector("#te-settings-modal");
      this.settingsForm = root.querySelector("#te-settings-form");
      this.categoryModal = root.querySelector("#te-category-modal");
      this.categoryForm = root.querySelector("#te-category-form");
      this.categoryIconGrid = root.querySelector("#te-category-icon-grid");
      this.categoryColorGrid = root.querySelector("#te-category-color-grid");
      this.toastStack = root.querySelector("#te-toast-stack");

      this.snippets = [];
      this.categories = [];
      this.settings = { ...DEFAULT_SETTINGS };
      this.activeType = "atendimento";
      this.activeCategory = "Todos";
      this.selectedId = null;
      this.editingId = null;
      this.editingCategoryId = null;
      this.shortcutMap = new Map();
      this.lastActiveElement = null;
      this.contentEditableRanges = new WeakMap();
      this.variableResolver = null;
      this.storageAvailable = true;
      this.dragState = null;
      this.isClosed = false;

      this.onGlobalKeyDown = this.onGlobalKeyDown.bind(this);
      this.onGlobalFocusIn = this.onGlobalFocusIn.bind(this);
      this.onSelectionChange = this.onSelectionChange.bind(this);
      this.onDragMove = this.onDragMove.bind(this);
      this.onDragEnd = this.onDragEnd.bind(this);
    }

    init() {
      if (!this.root || this.root.dataset.teInitialized === "true") return;
      this.root.dataset.teInitialized = "true";
      this.checkStorage();
      this.loadSettings();
      this.loadTheme();
      this.loadCategories();
      this.loadSnippets();
      this.restorePosition();
      this.setupEvents();
      this.setupLauncherDrag();
      this.restoreLauncherPosition();
      this.rebuildShortcutMap();
      this.render();
      this.collapseToLauncher();

      if (!this.storageAvailable) {
        this.showToast("O armazenamento local está bloqueado nesta página. As alterações valerão apenas nesta sessão.", "error", 6000);
      }
    }

    checkStorage() {
      try {
        const key = "__te_storage_test__";
        window.localStorage.setItem(key, "1");
        window.localStorage.removeItem(key);
        this.storageAvailable = true;
      } catch (error) {
        this.storageAvailable = false;
      }
    }

    storageGet(key) {
      if (!this.storageAvailable) return null;
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        this.storageAvailable = false;
        return null;
      }
    }

    storageSet(key, value) {
      if (!this.storageAvailable) return false;
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch (error) {
        this.storageAvailable = false;
        return false;
      }
    }

    loadSettings() {
      const saved = this.storageGet(STORAGE_KEYS.settings);
      if (!saved) return;
      try {
        const parsed = JSON.parse(saved);
        this.settings = {
          autoExpand: parsed.autoExpand !== false,
          keepOpenAfterInsert: parsed.keepOpenAfterInsert !== false,
          confirmBeforeDelete: parsed.confirmBeforeDelete !== false
        };
      } catch (error) {
        this.settings = { ...DEFAULT_SETTINGS };
      }
    }

    saveSettings() {
      this.storageSet(STORAGE_KEYS.settings, JSON.stringify(this.settings));
    }

    loadTheme() {
      const saved = this.storageGet(STORAGE_KEYS.darkMode);
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const enabled = saved === null ? prefersDark : saved === "true";
      this.applyTheme(enabled);
    }

    applyTheme(enabled) {
      document.body.classList.toggle("te-dark", enabled);
      this.root.classList.toggle("te-dark", enabled);
      const use = this.root.querySelector(".te-theme-icon use");
      if (use) use.setAttribute("href", enabled ? "#te-i-sun" : "#te-i-moon");
    }

    toggleTheme() {
      const enabled = !this.root.classList.contains("te-dark");
      this.applyTheme(enabled);
      this.storageSet(STORAGE_KEYS.darkMode, String(enabled));
      this.showToast(enabled ? "Modo escuro ativado." : "Modo claro ativado.", "success");
    }


    getDefaultCategories() {
      return DEFAULT_CATEGORIES.map((item) => this.normalizeCategory(item));
    }

    loadCategories() {
      const saved = this.storageGet(STORAGE_KEYS.categories);
      if (!saved) {
        this.categories = this.getDefaultCategories();
        this.saveCategories();
        return;
      }
      try {
        const parsed = JSON.parse(saved);
        const source = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.categories) ? parsed.categories : null;
        if (!source) throw new Error("Formato inválido");
        const seen = new Set();
        this.categories = source.map((item) => this.normalizeCategory(item)).filter((item) => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        });
        for (const tipo of ["atendimento", "protocolo"]) {
          if (!this.categories.some((item) => item.tipo === tipo)) {
            this.categories.push(this.normalizeCategory({ tipo, nome: "Outros", icone: "folder", cor: "#64748b", ordem: 999 }));
          }
        }
        this.sortCategories();
      } catch (error) {
        this.categories = this.getDefaultCategories();
        this.saveCategories();
      }
    }

    saveCategories() {
      this.sortCategories();
      const payload = {
        app: "Text Express",
        schemaVersion: 5,
        appVersion: APP_VERSION,
        updatedAt: new Date().toISOString(),
        categories: this.categories
      };
      this.storageSet(STORAGE_KEYS.categories, JSON.stringify(payload));
    }

    normalizeCategory(raw = {}) {
      const tipo = raw.tipo === "protocolo" ? "protocolo" : "atendimento";
      const nome = String(raw.nome || "Nova categoria").trim().slice(0, 48) || "Nova categoria";
      const icone = CATEGORY_ICON_OPTIONS.includes(raw.icone) ? raw.icone : "folder";
      const cor = /^#[0-9a-f]{6}$/i.test(String(raw.cor || "")) ? String(raw.cor).toLowerCase() : "#64748b";
      const ordem = Number.isFinite(Number(raw.ordem)) ? Number(raw.ordem) : 999;
      return {
        id: this.isSafeId(raw.id) ? String(raw.id) : this.generateCategoryId(tipo, nome),
        tipo,
        nome,
        icone,
        cor,
        ordem,
        padrao: Boolean(raw.padrao)
      };
    }

    generateCategoryId(tipo, nome = "categoria") {
      const slug = this.slugify(nome).slice(0, 36) || "categoria";
      const base = `cat-${tipo === "protocolo" ? "prot" : "atd"}-${slug}`;
      if (!this.categories.some((item) => item.id === base)) return base;
      return `${base}-${Date.now().toString(36)}`;
    }

    slugify(value) {
      return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    sortCategories() {
      this.categories.sort((a, b) => a.tipo.localeCompare(b.tipo) || a.ordem - b.ordem || a.nome.localeCompare(b.nome, "pt-BR"));
    }

    getCategoryById(id) {
      return this.categories.find((item) => item.id === id) || null;
    }

    findCategoryByName(nome, tipo) {
      const normalized = this.normalizeSearchText(nome);
      return this.categories.find((item) => item.tipo === tipo && this.normalizeSearchText(item.nome) === normalized) || null;
    }

    resolveCategory(categoryId, categoryName, tipo) {
      let category = categoryId ? this.getCategoryById(String(categoryId)) : null;
      if (category && category.tipo !== tipo) category = null;
      if (!category && categoryName) category = this.findCategoryByName(categoryName, tipo);
      if (!category) category = this.findCategoryByName("Outros", tipo) || this.getCategoriesForType(tipo)[0] || null;
      if (!category) {
        category = this.normalizeCategory({ tipo, nome: categoryName || "Outros", icone: "folder", cor: "#64748b", ordem: 999 });
        this.categories.push(category);
        this.saveCategories();
      }
      return category;
    }

    getCategoryForSnippet(snippet) {
      return this.resolveCategory(snippet.categoriaId, snippet.categoria, snippet.tipo);
    }

    icon(name, extraClass = "") {
      const safe = CATEGORY_ICON_OPTIONS.includes(name) || ["plus","edit","trash","copy","star","send","download","upload","rotate-ccw","x","chevron-left","chevron-right","palette","save","info","moon","sun","minus","maximize-2","sliders","heart","check","more-horizontal","play-circle"].includes(name) ? name : "folder";
      return `<svg class="te-icon ${this.escapeAttr(extraClass)}" aria-hidden="true"><use href="#te-i-${this.escapeAttr(safe)}"></use></svg>`;
    }

    getDefaultSnippets() {
      return DEFAULT_SNIPPETS.map((item) => this.normalizeSnippet(item));
    }

    loadSnippets() {
      const saved = this.storageGet(STORAGE_KEYS.snippets);
      if (!saved) {
        this.snippets = this.getDefaultSnippets();
        this.saveSnippets();
        return;
      }

      try {
        const parsed = JSON.parse(saved);
        const source = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.snippets) ? parsed.snippets : null;
        if (!source) throw new Error("Formato inválido");
        this.snippets = this.normalizeCollection(source);
        if (!this.snippets.length) throw new Error("Base vazia");
      } catch (error) {
        this.snippets = this.getDefaultSnippets();
        this.saveSnippets();
      }
    }

    saveSnippets() {
      const payload = {
        app: "Text Express",
        schemaVersion: 5,
        appVersion: APP_VERSION,
        updatedAt: new Date().toISOString(),
        snippets: this.snippets
      };
      const saved = this.storageSet(STORAGE_KEYS.snippets, JSON.stringify(payload));
      if (!saved && this.storageAvailable === false) {
        this.showToast("Não foi possível salvar no armazenamento local.", "error");
      }
      this.rebuildShortcutMap();
    }

    normalizeCollection(items) {
      const ids = new Set();
      const shortcuts = new Set();
      const normalized = [];

      for (const raw of items) {
        const item = this.normalizeSnippet(raw);
        if (!item.conteudo || !item.nome) continue;
        if (ids.has(item.id)) item.id = this.generateId(item.tipo);
        ids.add(item.id);
        item.atalho = this.makeUniqueShortcut(item.atalho, shortcuts);
        shortcuts.add(item.atalho);
        normalized.push(item);
      }
      return normalized;
    }

    normalizeSnippet(raw = {}) {
      const tipo = raw.tipo === "protocolo" ? "protocolo" : "atendimento";
      const nome = String(raw.nome || "Modelo sem nome").trim().slice(0, 100);
      const conteudo = String(raw.conteudo || raw.content || "").replace(/\r\n/g, "\n").trim();
      const category = this.resolveCategory(raw.categoriaId || raw.categoryId, raw.categoria || raw.category, tipo);
      const atalhoBase = raw.atalho || raw.shortcut || this.suggestShortcutFromName(nome);
      const triggerKey = ["space", "tab", "enter"].includes(raw.triggerKey) ? raw.triggerKey : "space";
      return {
        id: this.isSafeId(raw.id) ? String(raw.id) : this.generateId(tipo),
        tipo,
        nome,
        atalho: this.normalizeShortcut(atalhoBase),
        categoriaId: category.id,
        categoria: category.nome,
        grupo: raw.grupo ? String(raw.grupo).slice(0, 80) : "",
        contexto: raw.contexto ? String(raw.contexto).slice(0, 120) : "",
        conteudo,
        variaveis: this.extractVariables(conteudo),
        favorito: Boolean(raw.favorito),
        ativo: raw.ativo !== false,
        triggerKey,
        origem: raw.origem ? String(raw.origem).slice(0, 150) : "Text Express"
      };
    }

    isSafeId(value) {
      return typeof value === "string" && /^[a-zA-Z0-9_-]{3,100}$/.test(value);
    }

    generateId(tipo = "modelo") {
      if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return `te-${tipo}-${window.crypto.randomUUID()}`;
      }
      return `te-${tipo}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }

    normalizeShortcut(value) {
      let text = String(value || "").trim().toLowerCase();
      text = text.replace(/^\/+/, "");
      text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      text = text.replace(/\s+/g, "-").replace(/[^a-z0-9_-]/g, "-").replace(/-+/g, "-");
      text = text.replace(/^[-_]+|[-_]+$/g, "");
      return `/${text || "modelo"}`;
    }

    suggestShortcutFromName(name) {
      return this.normalizeShortcut(name || "modelo");
    }

    makeUniqueShortcut(shortcut, usedSet = null, ignoreId = null) {
      const used = usedSet || new Set(this.snippets.filter((item) => item.id !== ignoreId).map((item) => item.atalho));
      const base = this.normalizeShortcut(shortcut);
      if (!used.has(base)) return base;
      let index = 2;
      while (used.has(`${base}-${index}`)) index += 1;
      return `${base}-${index}`;
    }

    rebuildShortcutMap() {
      this.shortcutMap = new Map();
      for (const snippet of this.snippets) {
        if (snippet.ativo && snippet.atalho) this.shortcutMap.set(snippet.atalho.toLowerCase(), snippet);
      }
    }

    setupEvents() {
      this.root.addEventListener("click", (event) => this.handleRootClick(event));
      this.root.addEventListener("change", (event) => this.handleRootChange(event));
      this.root.addEventListener("input", (event) => this.handleRootInput(event));
      this.searchInput.addEventListener("input", () => this.renderSnippets());
      this.snippetForm.addEventListener("submit", (event) => this.saveSnippet(event));
      this.categoryForm.addEventListener("submit", (event) => this.saveCategory(event));
      this.variableForm.addEventListener("submit", (event) => this.submitVariables(event));
      this.settingsForm.addEventListener("submit", (event) => this.submitSettings(event));
      this.importInput.addEventListener("change", (event) => this.handleImportFile(event));

      const contentField = this.root.querySelector("#te-form-content");
      contentField.addEventListener("input", () => this.detectVariables(contentField.value));
      this.root.querySelector("#te-form-name").addEventListener("blur", () => {
        const shortcutField = this.root.querySelector("#te-form-shortcut");
        if (!shortcutField.value.trim()) shortcutField.value = this.getAvailableSuggestedShortcut();
      });
      this.root.querySelector("#te-form-shortcut").addEventListener("blur", (event) => {
        event.target.value = this.normalizeShortcut(event.target.value);
        this.validateShortcutField();
      });

      document.addEventListener("keydown", this.onGlobalKeyDown, true);
      document.addEventListener("focusin", this.onGlobalFocusIn, true);
      document.addEventListener("selectionchange", this.onSelectionChange, true);
      window.addEventListener("resize", () => this.constrainPanel());

      const dragHandle = this.root.querySelector("[data-te-drag-handle]");
      dragHandle.addEventListener("pointerdown", (event) => this.onDragStart(event));
    }

    handleRootClick(event) {
      const typeButton = event.target.closest("[data-te-type]");
      if (typeButton) {
        this.activeType = typeButton.dataset.teType;
        this.activeCategory = "Todos";
        this.selectedId = null;
        this.searchInput.value = "";
        this.render();
        return;
      }

      const actionButton = event.target.closest("[data-te-action]");
      const card = event.target.closest("[data-te-card-id]");
      if (actionButton) {
        const action = actionButton.dataset.teAction;
        const id = actionButton.dataset.teId || (card && card.dataset.teCardId) || null;
        const categoryId = actionButton.dataset.teCategoryId || null;
        const iconName = actionButton.dataset.teIconName || null;
        const color = actionButton.dataset.teColor || null;
        const actions = {
          theme: () => this.toggleTheme(),
          minimize: () => this.toggleMinimize(),
          close: () => this.closeApp(),
          reopen: () => this.openApp(),
          new: () => this.openModal(),
          import: () => this.importSnippets(),
          export: () => this.exportSnippets(),
          reset: () => this.resetSnippets(),
          settings: () => this.openSettings(),
          "settings-close": () => this.closeSettings(),
          "modal-close": () => this.closeModal(),
          "suggest-shortcut": () => this.applySuggestedShortcut(),
          "variable-cancel": () => this.finishVariablePrompt(null),
          insert: () => this.insertSnippet(id),
          copy: () => this.copySnippet(id),
          edit: () => this.editSnippet(id),
          delete: () => this.deleteSnippet(id),
          favorite: () => this.toggleFavorite(id),
          "category-new": () => this.openCategoryModal(),
          "category-add-from-form": () => this.openCategoryModal(null, this.root.querySelector('input[name="te-type"]:checked')?.value || "atendimento", true),
          "category-edit": () => this.openCategoryModal(this.getCategoryById(categoryId)),
          "category-close": () => this.closeCategoryModal(),
          "category-delete": () => this.deleteCategory(this.editingCategoryId),
          "category-move-left": () => this.moveCategory(this.editingCategoryId, -1),
          "category-move-right": () => this.moveCategory(this.editingCategoryId, 1),
          "category-icon": () => this.selectCategoryIcon(iconName),
          "category-color": () => this.selectCategoryColor(color)
        };
        if (actions[action]) {
          event.preventDefault();
          event.stopPropagation();
          actions[action]();
          return;
        }
      }

      const categoryButton = event.target.closest("[data-te-category]");
      if (categoryButton) {
        this.activeCategory = categoryButton.dataset.teCategory;
        this.selectedId = null;
        this.renderCategories();
        this.renderSnippets();
        return;
      }

      if (card) {
        this.selectedId = card.dataset.teCardId;
        this.renderSnippets();
      }
    }

    handleRootChange(event) {
      if (event.target.matches('input[name="te-type"]')) {
        this.updateCategoryOptions(event.target.value);
      }
      if (event.target.matches('input[name="te-category-type"]')) {
        this.updateCategoryPreview();
      }
      if (event.target.id === "te-category-form-color") {
        this.selectCategoryColor(event.target.value);
      }
    }

    handleRootInput(event) {
      if (event.target.id === "te-category-form-name") this.updateCategoryPreview();
    }


    render() {
      this.root.querySelectorAll("[data-te-type]").forEach((button) => {
        button.classList.toggle("te-active", button.dataset.teType === this.activeType);
      });
      this.renderCategories();
      this.renderSnippets();
      this.updateCount();
    }

    getCategoriesForType(type) {
      let ids = null;
      if (type === "favoritos") {
        ids = new Set(this.snippets.filter((item) => item.favorito && item.ativo).map((item) => item.categoriaId));
      }
      return this.categories
        .filter((category) => type === "favoritos" ? ids.has(category.id) : category.tipo === type)
        .sort((a, b) => a.ordem - b.ordem || a.nome.localeCompare(b.nome, "pt-BR"));
    }

    renderCategories() {
      const categories = this.getCategoriesForType(this.activeType);
      const visibleItems = this.snippets.filter((item) => item.ativo && (this.activeType === "favoritos" ? item.favorito : item.tipo === this.activeType));
      const allCount = visibleItems.length;
      if (this.activeCategory !== "Todos" && !categories.some((item) => item.id === this.activeCategory)) this.activeCategory = "Todos";

      const categoryHtml = categories.map((category) => {
        const count = visibleItems.filter((item) => item.categoriaId === category.id).length;
        return `
          <div class="te-category-chip ${category.id === this.activeCategory ? "te-active" : ""}" style="--te-category-color:${this.escapeAttr(category.cor)}">
            <button type="button" class="te-category-button" data-te-category="${this.escapeAttr(category.id)}" title="Filtrar por ${this.escapeAttr(category.nome)}">
              ${this.icon(category.icone)}
              <span>${this.escapeHtml(category.nome)}</span>
              <span class="te-category-count">${count}</span>
            </button>
            <button type="button" class="te-category-edit" data-te-action="category-edit" data-te-category-id="${this.escapeAttr(category.id)}" title="Editar categoria" aria-label="Editar categoria ${this.escapeAttr(category.nome)}">
              ${this.icon("edit")}
            </button>
          </div>`;
      }).join("");

      this.categoryBar.innerHTML = `
        <div class="te-category-chip te-category-all ${this.activeCategory === "Todos" ? "te-active" : ""}" style="--te-category-color:var(--te-primary)">
          <button type="button" class="te-category-button" data-te-category="Todos">
            ${this.icon("layout-grid")}<span>Todos</span><span class="te-category-count">${allCount}</span>
          </button>
        </div>
        ${categoryHtml}
        <button type="button" class="te-category-add-button" data-te-action="category-new" title="Adicionar categoria">
          ${this.icon("plus")}<span>Categoria</span>
        </button>`;
    }

    getFilteredSnippets() {
      const query = this.normalizeSearchText(this.searchInput.value);
      return this.snippets.filter((snippet) => {
        if (!snippet.ativo) return false;
        const matchesType = this.activeType === "favoritos" ? snippet.favorito : snippet.tipo === this.activeType;
        if (!matchesType) return false;
        if (this.activeCategory !== "Todos" && snippet.categoriaId !== this.activeCategory) return false;
        if (!query) return true;
        const category = this.getCategoryForSnippet(snippet);
        const haystack = this.normalizeSearchText([
          snippet.nome, snippet.atalho, snippet.conteudo, category.nome, snippet.grupo, snippet.contexto
        ].join(" "));
        return haystack.includes(query);
      });
    }

    normalizeSearchText(value) {
      return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    renderSnippets() {
      const items = this.getFilteredSnippets();
      if (!items.some((item) => item.id === this.selectedId)) this.selectedId = items[0] ? items[0].id : null;

      this.listElement.innerHTML = items.map((snippet) => this.renderCard(snippet)).join("");
      this.emptyState.classList.toggle("te-hidden", items.length > 0);
      this.listElement.classList.toggle("te-hidden", items.length === 0);
      this.renderDetail(this.selectedId ? this.snippets.find((item) => item.id === this.selectedId) : null);
    }

    renderCard(snippet) {
      const selected = snippet.id === this.selectedId ? "te-selected" : "";
      const category = this.getCategoryForSnippet(snippet);
      return `
        <article class="te-snippet-card ${selected}" data-te-card-id="${this.escapeAttr(snippet.id)}" data-te-snippet-type="${snippet.tipo}" style="--te-card-accent:${this.escapeAttr(category.cor)}">
          <span class="te-card-icon" aria-hidden="true" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon(category.icone)}</span>
          <div class="te-card-main">
            <div class="te-card-title-row">
              <span class="te-card-title" title="${this.escapeAttr(snippet.nome)}">${this.escapeHtml(snippet.nome)}</span>
              <span class="te-category-tag" title="${this.escapeAttr(category.nome)}" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon(category.icone)}${this.escapeHtml(category.nome)}</span>
            </div>
            <div class="te-shortcut-line">
              <code>${this.escapeHtml(snippet.atalho)}</code>
              <span>${this.icon("play-circle")} ${this.escapeHtml(TRIGGER_LABELS[snippet.triggerKey] || "Espaço")}</span>
            </div>
            <p class="te-card-excerpt">${this.escapeHtml(snippet.conteudo)}</p>
            <div class="te-card-actions">
              <button class="te-text-button" type="button" data-te-action="edit" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("edit")} Editar</button>
              <button class="te-text-button te-delete" type="button" data-te-action="delete" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("trash")} Excluir</button>
              <button class="te-text-button te-card-insert" type="button" data-te-action="insert" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("send")} Inserir</button>
            </div>
          </div>
          <button class="te-favorite-button ${snippet.favorito ? "te-active" : ""}" type="button" data-te-action="favorite" data-te-id="${this.escapeAttr(snippet.id)}" title="${snippet.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}" aria-label="${snippet.favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}">${this.icon("star")}</button>
        </article>`;
    }

    renderDetail(snippet) {
      if (!snippet) {
        this.detailPane.removeAttribute("data-te-snippet-type");
        this.detailPane.innerHTML = `<div class="te-detail-empty">${this.icon("zap")}<strong>Selecione um modelo</strong><p>Veja o conteúdo completo, as variáveis e o atalho de ativação.</p></div>`;
        return;
      }
      const category = this.getCategoryForSnippet(snippet);
      this.detailPane.dataset.teSnippetType = snippet.tipo;
      this.detailPane.style.setProperty("--te-detail-accent", category.cor);
      const variableHtml = snippet.variaveis.length
        ? snippet.variaveis.map((variable) => `<span class="te-variable-tag">${this.icon("tag")}${this.escapeHtml(variable)}</span>`).join("")
        : '<span class="te-muted">Nenhuma variável encontrada.</span>';
      this.detailPane.innerHTML = `
        <div class="te-detail-header">
          <div class="te-detail-title-wrap">
            <span class="te-detail-category-icon" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon(category.icone)}</span>
            <div><h2>${this.escapeHtml(snippet.nome)}</h2><div class="te-detail-meta">
              <span class="te-category-tag" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon(category.icone)}${this.escapeHtml(category.nome)}</span>
              <code class="te-detail-shortcut">${this.escapeHtml(snippet.atalho)}</code>
              <span class="te-muted">+ ${this.escapeHtml(TRIGGER_LABELS[snippet.triggerKey] || "Espaço")}</span>
            </div></div>
          </div>
          <button class="te-favorite-button ${snippet.favorito ? "te-active" : ""}" type="button" data-te-action="favorite" data-te-id="${this.escapeAttr(snippet.id)}" title="Favorito">${this.icon("star")}</button>
        </div>
        <section class="te-detail-section"><strong>${this.icon("file-text")} Conteúdo</strong><div class="te-content-preview">${this.escapeHtml(snippet.conteudo)}</div></section>
        <section class="te-detail-section"><strong>${this.icon("tag")} Variáveis detectadas</strong><div class="te-variable-tags">${variableHtml}</div></section>
        <section class="te-detail-section te-how-to"><strong>${this.icon("info")} Como usar</strong><br>Digite <code>${this.escapeHtml(snippet.atalho)}</code> e pressione <strong>${this.escapeHtml(TRIGGER_LABELS[snippet.triggerKey] || "Espaço")}</strong>, ou clique em “Inserir”.</section>
        <div class="te-detail-actions">
          <button class="te-primary-button" type="button" data-te-action="insert" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("send")} Inserir no campo ativo</button>
          <button class="te-secondary-button" type="button" data-te-action="copy" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("copy")} Copiar</button>
          <button class="te-secondary-button" type="button" data-te-action="edit" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("edit")} Editar</button>
          <button class="te-danger-button" type="button" data-te-action="delete" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("trash")} Excluir</button>
        </div>`;
    }

    updateCount() {
      const atendimento = this.snippets.filter((item) => item.tipo === "atendimento" && item.ativo).length;
      const protocolo = this.snippets.filter((item) => item.tipo === "protocolo" && item.ativo).length;
      const total = atendimento + protocolo;
      this.countBadge.textContent = `${total} ${total === 1 ? "modelo" : "modelos"}`;
      this.statusCounts.textContent = `Atendimento: ${atendimento} · Protocolo: ${protocolo} · Total: ${total}`;
    }

    openModal(data = null) {
      const type = data ? data.tipo : this.activeType === "protocolo" ? "protocolo" : "atendimento";
      this.editingId = data ? data.id : null;
      this.root.querySelector("#te-modal-kicker").textContent = data ? "Editar modelo" : "Novo modelo";
      this.root.querySelector("#te-modal-title").textContent = data ? "Editar modelo" : "Criar modelo";
      this.root.querySelector("#te-form-id").value = data ? data.id : "";
      this.root.querySelectorAll('input[name="te-type"]').forEach((input) => input.checked = input.value === type);
      this.root.querySelector("#te-form-name").value = data ? data.nome : "";
      this.root.querySelector("#te-form-shortcut").value = data ? data.atalho : "";
      this.root.querySelector("#te-form-trigger").value = data ? data.triggerKey : "space";
      this.root.querySelector("#te-form-content").value = data ? data.conteudo : "";
      this.root.querySelector("#te-form-favorite").checked = data ? data.favorito : false;
      this.clearFormErrors();
      this.updateCategoryOptions(type, data ? data.categoriaId : null);
      this.detectVariables(data ? data.conteudo : "");
      this.snippetModal.classList.remove("te-hidden");
      window.setTimeout(() => this.root.querySelector("#te-form-name").focus(), 30);
    }

    closeModal() {
      this.snippetModal.classList.add("te-hidden");
      this.snippetForm.reset();
      this.editingId = null;
      this.clearFormErrors();
    }

    updateCategoryOptions(type, selected = null) {
      const field = this.root.querySelector("#te-form-category");
      const categories = this.getCategoriesForType(type);
      const desired = selected || field.value || categories[0]?.id;
      field.innerHTML = categories.map((category) => `<option value="${this.escapeAttr(category.id)}">${this.escapeHtml(category.nome)}</option>`).join("");
      field.value = categories.some((category) => category.id === desired) ? desired : (categories[0]?.id || "");
    }

    clearFormErrors() {
      this.root.querySelectorAll("[data-te-error]").forEach((element) => {
        element.textContent = "";
      });
    }

    setFormError(field, message) {
      const target = this.root.querySelector(`[data-te-error="${field}"]`);
      if (target) target.textContent = message;
    }

    saveSnippet(event) {
      event.preventDefault();
      this.clearFormErrors();
      const id = this.root.querySelector("#te-form-id").value;
      const tipo = this.root.querySelector('input[name="te-type"]:checked')?.value || "atendimento";
      const nome = this.root.querySelector("#te-form-name").value.trim();
      const atalho = this.normalizeShortcut(this.root.querySelector("#te-form-shortcut").value);
      const triggerKey = this.root.querySelector("#te-form-trigger").value;
      const categoriaId = this.root.querySelector("#te-form-category").value;
      const category = this.getCategoryById(categoriaId) || this.resolveCategory(null, "Outros", tipo);
      const conteudo = this.root.querySelector("#te-form-content").value.trim();
      const favorito = this.root.querySelector("#te-form-favorite").checked;
      let valid = true;
      if (!nome) { this.setFormError("name", "Informe um nome para o modelo."); valid = false; }
      if (!conteudo) { this.setFormError("content", "Informe o conteúdo que será inserido."); valid = false; }
      const duplicate = this.snippets.find((item) => item.id !== id && item.atalho === atalho);
      if (duplicate) { this.setFormError("shortcut", `Esse atalho já pertence ao modelo “${duplicate.nome}”.`); valid = false; }
      if (!valid) return;
      const existingIndex = id ? this.snippets.findIndex((item) => item.id === id) : -1;
      const base = existingIndex >= 0 ? this.snippets[existingIndex] : {};
      const snippet = this.normalizeSnippet({ ...base, id: existingIndex >= 0 ? id : this.generateId(tipo), tipo, nome, atalho, triggerKey, categoriaId: category.id, categoria: category.nome, conteudo, favorito, ativo: true, origem: existingIndex >= 0 ? base.origem : "Criado pelo usuário" });
      if (existingIndex >= 0) this.snippets.splice(existingIndex, 1, snippet); else this.snippets.unshift(snippet);
      this.saveSnippets();
      this.activeType = tipo; this.activeCategory = "Todos"; this.selectedId = snippet.id;
      this.closeModal(); this.render();
      this.showToast(existingIndex >= 0 ? "Modelo atualizado com sucesso." : "Modelo criado com sucesso.", "success");
    }


    openCategoryModal(category = null, forcedType = null, returnToSnippet = false) {
      const type = category?.tipo || forcedType || (this.activeType === "protocolo" ? "protocolo" : "atendimento");
      this.editingCategoryId = category?.id || null;
      this.categoryModal.dataset.returnToSnippet = returnToSnippet ? "true" : "false";
      this.root.querySelector("#te-category-modal-kicker").textContent = category ? "Personalizar categoria" : "Nova categoria";
      this.root.querySelector("#te-category-modal-title").textContent = category ? "Editar categoria" : "Criar categoria";
      this.root.querySelector("#te-category-form-id").value = category?.id || "";
      this.root.querySelector("#te-category-form-name").value = category?.nome || "";
      this.root.querySelector("#te-category-form-icon").value = category?.icone || "folder";
      this.root.querySelector("#te-category-form-color").value = category?.cor || CATEGORY_COLOR_OPTIONS[0];
      this.root.querySelectorAll('input[name="te-category-type"]').forEach((input) => {
        input.checked = input.value === type;
        input.disabled = Boolean(category && this.getCategoryUsage(category.id) > 0);
      });
      const usage = category ? this.getCategoryUsage(category.id) : 0;
      this.root.querySelector("#te-category-usage").textContent = category ? `${usage} modelo(s) usando esta categoria.` : "A categoria será salva no navegador.";
      this.root.querySelector("#te-category-delete-button").classList.toggle("te-hidden", !category);
      this.root.querySelector("#te-category-move-left").classList.toggle("te-hidden", !category);
      this.root.querySelector("#te-category-move-right").classList.toggle("te-hidden", !category);
      this.renderCategoryChoices();
      this.updateCategoryPreview();
      this.categoryModal.classList.remove("te-hidden");
      window.setTimeout(() => this.root.querySelector("#te-category-form-name").focus(), 30);
    }

    closeCategoryModal() {
      this.categoryModal.classList.add("te-hidden");
      this.editingCategoryId = null;
    }

    renderCategoryChoices() {
      const selectedIcon = this.root.querySelector("#te-category-form-icon").value || "folder";
      const selectedColor = this.root.querySelector("#te-category-form-color").value || CATEGORY_COLOR_OPTIONS[0];
      this.categoryIconGrid.innerHTML = CATEGORY_ICON_OPTIONS.map((name) => `<button type="button" class="te-icon-choice ${name === selectedIcon ? "te-active" : ""}" data-te-action="category-icon" data-te-icon-name="${this.escapeAttr(name)}" title="${this.escapeAttr(name)}">${this.icon(name)}</button>`).join("");
      this.categoryColorGrid.innerHTML = CATEGORY_COLOR_OPTIONS.map((color) => `<button type="button" class="te-color-choice ${color.toLowerCase() === selectedColor.toLowerCase() ? "te-active" : ""}" data-te-action="category-color" data-te-color="${this.escapeAttr(color)}" style="--te-choice-color:${this.escapeAttr(color)}" title="${this.escapeAttr(color)}"><span></span></button>`).join("");
    }

    selectCategoryIcon(name) {
      if (!CATEGORY_ICON_OPTIONS.includes(name)) return;
      this.root.querySelector("#te-category-form-icon").value = name;
      this.renderCategoryChoices();
      this.updateCategoryPreview();
    }

    selectCategoryColor(color) {
      if (!/^#[0-9a-f]{6}$/i.test(String(color || ""))) return;
      this.root.querySelector("#te-category-form-color").value = color;
      this.renderCategoryChoices();
      this.updateCategoryPreview();
    }

    updateCategoryPreview() {
      const name = this.root.querySelector("#te-category-form-name").value.trim() || "Nome da categoria";
      const icon = this.root.querySelector("#te-category-form-icon").value || "folder";
      const color = this.root.querySelector("#te-category-form-color").value || CATEGORY_COLOR_OPTIONS[0];
      const preview = this.root.querySelector("#te-category-preview");
      preview.style.setProperty("--te-category-color", color);
      preview.innerHTML = `${this.icon(icon)}<span>${this.escapeHtml(name)}</span><span class="te-category-count">0</span>`;
    }

    saveCategory(event) {
      event.preventDefault();
      const id = this.root.querySelector("#te-category-form-id").value;
      const existing = id ? this.getCategoryById(id) : null;
      const tipo = existing?.tipo || this.root.querySelector('input[name="te-category-type"]:checked')?.value || "atendimento";
      const nome = this.root.querySelector("#te-category-form-name").value.trim();
      const icone = this.root.querySelector("#te-category-form-icon").value;
      const cor = this.root.querySelector("#te-category-form-color").value;
      const error = this.root.querySelector("#te-category-name-error");
      error.textContent = "";
      if (!nome) { error.textContent = "Informe o nome da categoria."; return; }
      const duplicate = this.categories.find((item) => item.id !== id && item.tipo === tipo && this.normalizeSearchText(item.nome) === this.normalizeSearchText(nome));
      if (duplicate) { error.textContent = "Já existe uma categoria com esse nome neste tipo."; return; }
      let category;
      if (existing) {
        existing.nome = nome; existing.icone = CATEGORY_ICON_OPTIONS.includes(icone) ? icone : "folder"; existing.cor = cor;
        category = existing;
      } else {
        const maxOrder = Math.max(0, ...this.categories.filter((item) => item.tipo === tipo).map((item) => item.ordem));
        category = this.normalizeCategory({ id: this.generateCategoryId(tipo, nome), tipo, nome, icone, cor, ordem: maxOrder + 10, padrao: false });
        this.categories.push(category);
      }
      this.snippets.forEach((snippet) => { if (snippet.categoriaId === category.id) snippet.categoria = category.nome; });
      this.saveCategories(); this.saveSnippets();
      const returnToSnippet = this.categoryModal.dataset.returnToSnippet === "true";
      this.closeCategoryModal();
      if (returnToSnippet && !this.snippetModal.classList.contains("te-hidden")) this.updateCategoryOptions(tipo, category.id);
      this.activeType = tipo; this.activeCategory = category.id; this.render();
      this.showToast(existing ? "Categoria atualizada." : "Categoria criada.", "success");
    }

    getCategoryUsage(categoryId) {
      return this.snippets.filter((item) => item.categoriaId === categoryId).length;
    }

    deleteCategory(id) {
      const category = this.getCategoryById(id);
      if (!category) return;
      const usage = this.getCategoryUsage(id);
      const message = usage ? `Excluir “${category.nome}”? ${usage} modelo(s) serão movidos para “Outros”.` : `Excluir a categoria “${category.nome}”?`;
      if (!window.confirm(message)) return;
      let fallback = this.categories.find((item) => item.tipo === category.tipo && item.id !== id && this.normalizeSearchText(item.nome) === "outros");
      if (!fallback) fallback = this.categories.find((item) => item.tipo === category.tipo && item.id !== id);
      if (!fallback) {
        fallback = this.normalizeCategory({ tipo: category.tipo, nome: "Outros", icone: "folder", cor: "#64748b", ordem: 999 });
        this.categories.push(fallback);
      }
      this.snippets.forEach((snippet) => { if (snippet.categoriaId === id) { snippet.categoriaId = fallback.id; snippet.categoria = fallback.nome; } });
      this.categories = this.categories.filter((item) => item.id !== id);
      if (this.activeCategory === id) this.activeCategory = "Todos";
      this.saveCategories(); this.saveSnippets(); this.closeCategoryModal(); this.render();
      this.showToast("Categoria excluída e modelos reorganizados.", "success");
    }

    moveCategory(id, direction) {
      const category = this.getCategoryById(id);
      if (!category) return;
      const list = this.getCategoriesForType(category.tipo);
      const index = list.findIndex((item) => item.id === id);
      const targetIndex = index + direction;
      if (index < 0 || targetIndex < 0 || targetIndex >= list.length) return;
      const target = list[targetIndex];
      const temp = category.ordem; category.ordem = target.ordem; target.ordem = temp;
      this.saveCategories(); this.renderCategories();
      this.showToast(direction < 0 ? "Categoria movida para a esquerda." : "Categoria movida para a direita.", "success");
    }

    editSnippet(id) {
      const snippet = this.snippets.find((item) => item.id === id);
      if (snippet) this.openModal(snippet);
    }

    deleteSnippet(id) {
      const snippet = this.snippets.find((item) => item.id === id);
      if (!snippet) return;
      if (this.settings.confirmBeforeDelete && !window.confirm(`Excluir o modelo “${snippet.nome}”?`)) return;
      this.snippets = this.snippets.filter((item) => item.id !== id);
      if (this.selectedId === id) this.selectedId = null;
      this.saveSnippets();
      this.render();
      this.showToast("Modelo excluído.", "success");
    }

    toggleFavorite(id) {
      const snippet = this.snippets.find((item) => item.id === id);
      if (!snippet) return;
      snippet.favorito = !snippet.favorito;
      this.saveSnippets();
      this.render();
      this.showToast(snippet.favorito ? "Adicionado aos favoritos." : "Removido dos favoritos.", "success");
    }

    getAvailableSuggestedShortcut() {
      const name = this.root.querySelector("#te-form-name").value;
      return this.makeUniqueShortcut(this.suggestShortcutFromName(name), null, this.editingId);
    }

    applySuggestedShortcut() {
      const shortcut = this.getAvailableSuggestedShortcut();
      this.root.querySelector("#te-form-shortcut").value = shortcut;
      this.validateShortcutField();
    }

    validateShortcutField() {
      const field = this.root.querySelector("#te-form-shortcut");
      const shortcut = this.normalizeShortcut(field.value);
      field.value = shortcut;
      const duplicate = this.snippets.find((item) => item.id !== this.editingId && item.atalho === shortcut);
      this.setFormError("shortcut", duplicate ? `Esse atalho já pertence ao modelo “${duplicate.nome}”.` : "");
      return !duplicate;
    }

    extractVariables(content) {
      const variables = [];
      const regex = /\[([^\[\]\n]{1,80})\]/g;
      let match;
      while ((match = regex.exec(String(content || ""))) !== null) {
        const name = match[1].trim();
        if (name && !variables.includes(name)) variables.push(name);
      }
      return variables;
    }

    detectVariables(content) {
      const variables = this.extractVariables(content);
      const preview = this.root.querySelector("#te-variable-preview");
      preview.innerHTML = variables.length
        ? variables.map((variable) => `<span class="te-variable-tag">${this.escapeHtml(variable)}</span>`).join("")
        : '<span class="te-muted">Nenhuma variável encontrada.</span>';
      return variables;
    }

    async processVariables(content) {
      const variables = this.extractVariables(content);
      if (!variables.length) return content;
      const values = await this.requestVariableValues(variables);
      if (!values) return null;
      let result = content;
      for (const variable of variables) {
        const pattern = new RegExp(`\\[${this.escapeRegExp(variable)}\\]`, "g");
        result = result.replace(pattern, values[variable] ?? "");
      }
      return result;
    }

    requestVariableValues(variables) {
      if (this.variableResolver) this.finishVariablePrompt(null);
      this.variableFields.innerHTML = variables.map((variable, index) => `
        <label>
          <span>${this.escapeHtml(variable)}</span>
          <input type="text" name="te-variable-${index}" data-te-variable-name="${this.escapeAttr(variable)}" autocomplete="off" placeholder="Informe ${this.escapeAttr(variable)}">
        </label>
      `).join("");
      this.variableModal.classList.remove("te-hidden");
      window.setTimeout(() => {
        const first = this.variableFields.querySelector("input");
        if (first) first.focus();
      }, 30);
      return new Promise((resolve) => {
        this.variableResolver = resolve;
      });
    }

    submitVariables(event) {
      event.preventDefault();
      const values = {};
      this.variableFields.querySelectorAll("[data-te-variable-name]").forEach((input) => {
        values[input.dataset.teVariableName] = input.value;
      });
      this.finishVariablePrompt(values);
    }

    finishVariablePrompt(result) {
      if (!this.variableResolver) {
        this.variableModal.classList.add("te-hidden");
        return;
      }
      const resolve = this.variableResolver;
      this.variableResolver = null;
      this.variableModal.classList.add("te-hidden");
      this.variableFields.innerHTML = "";
      resolve(result);
    }

    async insertSnippet(id) {
      const snippet = this.snippets.find((item) => item.id === id);
      if (!snippet) return;
      const context = this.captureInsertionContext(this.lastActiveElement, 0);
      const content = await this.processVariables(snippet.conteudo);
      if (content === null) {
        this.showToast("Inserção cancelada.");
        return;
      }

      if (context && this.applyInsertionContext(context, content)) {
        this.showToast("Texto inserido no campo ativo.", "success");
      } else {
        await this.copyText(content);
        this.showToast("Nenhum campo ativo. O texto foi copiado.", "success");
      }

      if (!this.settings.keepOpenAfterInsert) this.toggleMinimize(true);
    }

    async copySnippet(id) {
      const snippet = this.snippets.find((item) => item.id === id);
      if (!snippet) return;
      const content = await this.processVariables(snippet.conteudo);
      if (content === null) return;
      await this.copyText(content);
      this.showToast("Texto copiado para a área de transferência.", "success");
    }

    async copyText(text) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch (error) {
        // Usa o fallback abaixo.
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.appendChild(textarea);
      textarea.select();
      let success = false;
      try {
        success = document.execCommand("copy");
      } catch (error) {
        success = false;
      }
      textarea.remove();
      if (!success) throw new Error("Falha ao copiar");
      return true;
    }

    onGlobalFocusIn(event) {
      const editable = this.getEditableRoot(event.target);
      if (!editable || this.root.contains(editable)) return;
      this.lastActiveElement = editable;
      this.captureContentEditableRange(editable);
    }

    onSelectionChange() {
      const active = document.activeElement;
      const editable = this.getEditableRoot(active);
      if (editable && !this.root.contains(editable)) {
        this.lastActiveElement = editable;
        this.captureContentEditableRange(editable);
      }
    }

    getEditableRoot(target) {
      if (!target || target === document.body || target === document.documentElement) return null;
      if (target instanceof HTMLTextAreaElement) {
        return !target.disabled && !target.readOnly ? target : null;
      }
      if (target instanceof HTMLInputElement) {
        const allowed = ["text", "search", "email", "tel", "url", ""];
        return allowed.includes((target.type || "text").toLowerCase()) && !target.disabled && !target.readOnly ? target : null;
      }
      if (target.nodeType === Node.ELEMENT_NODE) {
        const editable = target.closest('[contenteditable="true"], [contenteditable="plaintext-only"], [role="textbox"]');
        if (editable && (editable.isContentEditable || editable.getAttribute("role") === "textbox")) return editable;
      }
      return null;
    }

    captureContentEditableRange(element) {
      if (!element || (!element.isContentEditable && element.getAttribute("role") !== "textbox")) return;
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      const range = selection.getRangeAt(0);
      if (element.contains(range.commonAncestorContainer)) {
        this.contentEditableRanges.set(element, range.cloneRange());
      }
    }

    captureInsertionContext(element, shortcutLength = 0) {
      if (!element || !element.isConnected || !this.getEditableRoot(element)) return null;
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        const start = typeof element.selectionStart === "number" ? element.selectionStart : element.value.length;
        const end = typeof element.selectionEnd === "number" ? element.selectionEnd : start;
        return {
          kind: "input",
          element,
          start: shortcutLength ? Math.max(0, start - shortcutLength) : start,
          end
        };
      }

      const range = this.getCurrentOrStoredRange(element);
      if (!range) return null;
      return {
        kind: "contenteditable",
        element,
        range: range.cloneRange(),
        shortcutLength
      };
    }

    getCurrentOrStoredRange(element) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount) {
        const current = selection.getRangeAt(0);
        if (element.contains(current.commonAncestorContainer)) return current;
      }
      const stored = this.contentEditableRanges.get(element);
      return stored ? stored.cloneRange() : null;
    }

    applyInsertionContext(context, content) {
      const element = context && context.element;
      if (!element || !element.isConnected) return false;
      if (context.kind === "input") return this.insertIntoInput(element, content, context.start, context.end);
      if (context.kind === "contenteditable") return this.insertIntoContentEditable(element, content, context.range, context.shortcutLength);
      return false;
    }

    insertIntoInput(element, content, start, end) {
      try {
        const value = element.value || "";
        const next = value.slice(0, start) + content + value.slice(end);
        const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
        if (descriptor && descriptor.set) descriptor.set.call(element, next);
        else element.value = next;
        const caret = start + content.length;
        element.focus({ preventScroll: true });
        if (typeof element.setSelectionRange === "function") element.setSelectionRange(caret, caret);
        this.dispatchInputEvents(element, content);
        this.lastActiveElement = element;
        return true;
      } catch (error) {
        return false;
      }
    }

    insertIntoContentEditable(element, content, savedRange, shortcutLength = 0) {
      try {
        element.focus({ preventScroll: true });
        const selection = window.getSelection();
        selection.removeAllRanges();
        const range = savedRange.cloneRange();
        selection.addRange(range);

        if (shortcutLength > 0) {
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
          if (typeof selection.modify === "function") {
            for (let index = 0; index < shortcutLength; index += 1) {
              selection.modify("extend", "backward", "character");
            }
          } else if (range.endContainer.nodeType === Node.TEXT_NODE && range.endOffset >= shortcutLength) {
            range.setStart(range.endContainer, range.endOffset - shortcutLength);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }

        const activeRange = selection.rangeCount ? selection.getRangeAt(0) : range;
        activeRange.deleteContents();
        const textNode = document.createTextNode(content);
        activeRange.insertNode(textNode);
        activeRange.setStartAfter(textNode);
        activeRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(activeRange);
        this.contentEditableRanges.set(element, activeRange.cloneRange());
        this.dispatchInputEvents(element, content);
        this.lastActiveElement = element;
        return true;
      } catch (error) {
        return false;
      }
    }

    dispatchInputEvents(element, content) {
      try {
        element.dispatchEvent(new InputEvent("input", {
          bubbles: true,
          composed: true,
          inputType: "insertText",
          data: content
        }));
      } catch (error) {
        element.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
      }
      element.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    }

    onGlobalKeyDown(event) {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        this.openApp();
        return;
      }

      if (event.key === "Escape") {
        if (!this.variableModal.classList.contains("te-hidden")) {
          event.preventDefault();
          this.finishVariablePrompt(null);
        } else if (!this.snippetModal.classList.contains("te-hidden")) {
          event.preventDefault();
          this.closeModal();
        } else if (!this.settingsModal.classList.contains("te-hidden")) {
          event.preventDefault();
          this.closeSettings();
        }
        return;
      }

      if (!this.settings.autoExpand || event.defaultPrevented || event.isComposing || event.ctrlKey || event.altKey || event.metaKey) return;
      const triggerKey = this.getTriggerKey(event);
      if (!triggerKey) return;
      const editable = this.getEditableRoot(event.target);
      if (!editable || this.root.contains(editable)) return;
      const match = this.findShortcutBeforeCaret(editable, triggerKey);
      if (!match) return;

      event.preventDefault();
      this.lastActiveElement = editable;
      const context = this.captureInsertionContext(editable, match.shortcut.length);
      void this.expandShortcut(match.snippet, context);
    }

    getTriggerKey(event) {
      if (event.key === " " || event.key === "Spacebar") return "space";
      if (event.key === "Tab") return "tab";
      if (event.key === "Enter") return "enter";
      return null;
    }

    findShortcutBeforeCaret(element, triggerKey) {
      let before = "";
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        const caret = typeof element.selectionStart === "number" ? element.selectionStart : element.value.length;
        if (element.selectionStart !== element.selectionEnd) return null;
        before = element.value.slice(0, caret);
      } else {
        const range = this.getCurrentOrStoredRange(element);
        if (!range || !range.collapsed) return null;
        const prefix = range.cloneRange();
        prefix.selectNodeContents(element);
        prefix.setEnd(range.endContainer, range.endOffset);
        before = prefix.toString();
      }

      const match = before.match(/(?:^|\s)(\/[^\s]+)$/);
      if (!match) return null;
      const shortcut = match[1].toLowerCase();
      const snippet = this.shortcutMap.get(shortcut);
      if (!snippet || snippet.triggerKey !== triggerKey) return null;
      return { shortcut, snippet };
    }

    async expandShortcut(snippet, context) {
      if (!context) return;
      const content = await this.processVariables(snippet.conteudo);
      if (content === null) return;
      if (this.applyInsertionContext(context, content)) {
        this.showToast(`Atalho ${snippet.atalho} expandido.`, "success");
      } else {
        await this.copyText(content);
        this.showToast("Não foi possível inserir; o texto foi copiado.", "error");
      }
    }

    importSnippets() {
      this.importInput.value = "";
      this.importInput.click();
    }

    async handleImportFile(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      if (file.size > 8 * 1024 * 1024) { this.showToast("O arquivo excede o limite de 8 MB.", "error"); return; }
      try {
        const parsed = JSON.parse(await file.text());
        const source = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.snippets) ? parsed.snippets : null;
        if (!source) throw new Error("O JSON não contém uma lista de modelos.");
        if (parsed && Array.isArray(parsed.categories)) {
          for (const rawCategory of parsed.categories) {
            const candidate = this.normalizeCategory(rawCategory);
            const existing = this.findCategoryByName(candidate.nome, candidate.tipo);
            if (!existing) { candidate.id = this.generateCategoryId(candidate.tipo, candidate.nome); this.categories.push(candidate); }
          }
          this.saveCategories();
        }
        const usedIds = new Set(this.snippets.map((item) => item.id));
        const usedShortcuts = new Set(this.snippets.map((item) => item.atalho));
        const signatures = new Set(this.snippets.map((item) => this.snippetSignature(item)));
        let imported = 0, skipped = 0, renamed = 0;
        for (const raw of source) {
          const item = this.normalizeSnippet(raw);
          if (!item.nome || !item.conteudo) { skipped += 1; continue; }
          const signature = this.snippetSignature(item);
          if (signatures.has(signature)) { skipped += 1; continue; }
          if (usedIds.has(item.id)) item.id = this.generateId(item.tipo);
          const originalShortcut = item.atalho;
          item.atalho = this.makeUniqueShortcut(item.atalho, usedShortcuts);
          if (item.atalho !== originalShortcut) renamed += 1;
          usedIds.add(item.id); usedShortcuts.add(item.atalho); signatures.add(signature); this.snippets.push(item); imported += 1;
        }
        this.saveSnippets(); this.activeCategory = "Todos"; this.render();
        this.showToast(`${imported} modelo(s) importado(s). ${skipped} ignorado(s)${renamed ? ` e ${renamed} atalho(s) renomeado(s)` : ""}.`, "success", 5500);
      } catch (error) { this.showToast(`Não foi possível importar: ${error.message}`, "error", 5500); }
      finally { event.target.value = ""; }
    }

    snippetSignature(item) {
      return this.normalizeSearchText(`${item.tipo}|${item.nome}|${item.conteudo}`).replace(/\s+/g, " ").trim();
    }

    exportSnippets() {
      const payload = { app: "Text Express", schemaVersion: 5, appVersion: APP_VERSION, exportedAt: new Date().toISOString(), total: this.snippets.length, categories: this.categories, snippets: this.snippets };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob); const link = document.createElement("a"); const date = new Date().toISOString().slice(0, 10);
      link.href = url; link.download = `text-express-backup-${date}.json`; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
      this.showToast("Backup completo exportado com categorias e modelos.", "success");
    }

    resetSnippets() {
      const confirmed = window.confirm("Restaurar os modelos e categorias padrão? Os itens personalizados serão apagados. Exporte um backup antes, caso necessário.");
      if (!confirmed) return;
      this.categories = this.getDefaultCategories();
      this.snippets = this.getDefaultSnippets();
      this.activeType = "atendimento"; this.activeCategory = "Todos"; this.selectedId = null; this.searchInput.value = "";
      this.saveCategories(); this.saveSnippets(); this.render();
      this.showToast("Modelos e categorias padrão restaurados.", "success");
    }

    openSettings() {
      this.root.querySelector("#te-setting-auto-expand").checked = this.settings.autoExpand;
      this.root.querySelector("#te-setting-keep-open").checked = this.settings.keepOpenAfterInsert;
      this.root.querySelector("#te-setting-confirm-delete").checked = this.settings.confirmBeforeDelete;
      this.settingsModal.classList.remove("te-hidden");
    }

    closeSettings() {
      this.settingsModal.classList.add("te-hidden");
    }

    submitSettings(event) {
      event.preventDefault();
      this.settings = {
        autoExpand: this.root.querySelector("#te-setting-auto-expand").checked,
        keepOpenAfterInsert: this.root.querySelector("#te-setting-keep-open").checked,
        confirmBeforeDelete: this.root.querySelector("#te-setting-confirm-delete").checked
      };
      this.saveSettings();
      this.closeSettings();
      this.showToast("Configurações salvas.", "success");
    }

    getLauncherPosition() {
      const saved = this.storageGet(STORAGE_KEYS.launcherPosition);
      if (!saved) return null;
      try {
        const parsed = JSON.parse(saved);
        if (!Number.isFinite(parsed?.left) || !Number.isFinite(parsed?.top)) return null;
        return parsed;
      } catch {
        return null;
      }
    }

    saveLauncherPosition(left, top) {
      this.storageSet(
        STORAGE_KEYS.launcherPosition,
        JSON.stringify({ left: Math.round(left), top: Math.round(top) })
      );
    }

    clampLauncherPosition(left, top) {
      const rect = this.reopenButton.getBoundingClientRect();
      const width = rect.width || 38;
      const height = rect.height || 38;
      const margin = 6;
      return {
        left: Math.min(
          Math.max(margin, left),
          Math.max(margin, window.innerWidth - width - margin)
        ),
        top: Math.min(
          Math.max(margin, top),
          Math.max(margin, window.innerHeight - height - margin)
        )
      };
    }

    applyLauncherPosition(left, top, persist = false) {
      const point = this.clampLauncherPosition(left, top);
      this.reopenButton.classList.add("te-custom-position");
      this.reopenButton.style.left = `${point.left}px`;
      this.reopenButton.style.top = `${point.top}px`;
      this.reopenButton.style.right = "auto";
      this.reopenButton.style.bottom = "auto";
      if (persist) this.saveLauncherPosition(point.left, point.top);
    }

    restoreLauncherPosition() {
      const saved = this.getLauncherPosition();
      if (!saved) return;
      window.requestAnimationFrame(() => {
        this.applyLauncherPosition(saved.left, saved.top, false);
      });
    }

    setupLauncherDrag() {
      const launcher = this.reopenButton;
      if (!launcher || launcher.dataset.teDragReady === "true") return;
      launcher.dataset.teDragReady = "true";

      let pointerId = null;
      let startX = 0;
      let startY = 0;
      let startLeft = 0;
      let startTop = 0;
      let moved = false;
      let suppressClick = false;

      const onPointerMove = (event) => {
        if (event.pointerId !== pointerId) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        if (!moved && Math.hypot(dx, dy) >= 4) {
          moved = true;
          launcher.classList.add("te-dragging");
        }

        if (!moved) return;

        event.preventDefault();
        this.applyLauncherPosition(startLeft + dx, startTop + dy, false);
      };

      const finishDrag = (event) => {
        if (event.pointerId !== pointerId) return;

        try {
          launcher.releasePointerCapture(pointerId);
        } catch {}

        if (moved) {
          const rect = launcher.getBoundingClientRect();
          this.applyLauncherPosition(rect.left, rect.top, true);
          suppressClick = true;
          window.setTimeout(() => {
            suppressClick = false;
          }, 100);
        }

        launcher.classList.remove("te-dragging");
        pointerId = null;
        moved = false;
      };

      launcher.addEventListener("pointerdown", (event) => {
        if (event.button !== undefined && event.button !== 0) return;

        const rect = launcher.getBoundingClientRect();
        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        moved = false;

        try {
          launcher.setPointerCapture(pointerId);
        } catch {}
      });

      launcher.addEventListener("pointermove", onPointerMove);
      launcher.addEventListener("pointerup", finishDrag);
      launcher.addEventListener("pointercancel", finishDrag);

      launcher.addEventListener(
        "click",
        (event) => {
          if (!suppressClick) return;
          event.preventDefault();
          event.stopImmediatePropagation();
        },
        true
      );

      window.addEventListener("resize", () => {
        if (!launcher.classList.contains("te-custom-position")) return;
        const rect = launcher.getBoundingClientRect();
        this.applyLauncherPosition(rect.left, rect.top, true);
      });
    }

    collapseToLauncher() {
      this.panel.classList.remove("te-minimized");
      this.panel.classList.add("te-hidden");
      this.reopenButton.classList.remove("te-hidden");
      this.isClosed = true;
      const use = this.root.querySelector('[data-te-action="minimize"] use');
      if (use) use.setAttribute("href", "#te-i-minus");
    }

    toggleMinimize(forceMinimize = null) {
      if (forceMinimize === false) {
        this.openApp();
        return;
      }
      this.collapseToLauncher();
    }

    closeApp() {
      this.collapseToLauncher();
    }

    openApp() {
      this.panel.classList.remove("te-minimized", "te-hidden");
      this.reopenButton.classList.add("te-hidden");
      this.isClosed = false;
      const use = this.root.querySelector('[data-te-action="minimize"] use');
      if (use) use.setAttribute("href", "#te-i-minus");
      this.constrainPanel();
      window.requestAnimationFrame(() => {
        this.searchInput?.focus({ preventScroll: true });
      });
    }

    toggleApp() {
      if (this.panel.classList.contains("te-hidden")) this.openApp();
      else this.collapseToLauncher();
    }

    onDragStart(event) {
      if (event.button !== 0 || event.target.closest("button, input, select, textarea, a")) return;
      const rect = this.panel.getBoundingClientRect();
      this.dragState = {
        pointerId: event.pointerId,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top
      };
      this.panel.style.left = `${rect.left}px`;
      this.panel.style.top = `${rect.top}px`;
      this.panel.style.right = "auto";
      this.panel.style.bottom = "auto";
      event.currentTarget.setPointerCapture?.(event.pointerId);
      document.addEventListener("pointermove", this.onDragMove, true);
      document.addEventListener("pointerup", this.onDragEnd, true);
      event.preventDefault();
    }

    onDragMove(event) {
      if (!this.dragState || event.pointerId !== this.dragState.pointerId) return;
      const rect = this.panel.getBoundingClientRect();
      const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
      const maxTop = Math.max(8, window.innerHeight - rect.height - 8);
      const left = Math.min(Math.max(8, event.clientX - this.dragState.offsetX), maxLeft);
      const top = Math.min(Math.max(8, event.clientY - this.dragState.offsetY), maxTop);
      this.panel.style.left = `${left}px`;
      this.panel.style.top = `${top}px`;
    }

    onDragEnd(event) {
      if (!this.dragState || event.pointerId !== this.dragState.pointerId) return;
      this.dragState = null;
      document.removeEventListener("pointermove", this.onDragMove, true);
      document.removeEventListener("pointerup", this.onDragEnd, true);
      const rect = this.panel.getBoundingClientRect();
      this.storageSet(STORAGE_KEYS.position, JSON.stringify({ left: Math.round(rect.left), top: Math.round(rect.top) }));
    }

    restorePosition() {
      const saved = this.storageGet(STORAGE_KEYS.position);
      if (!saved) return;
      try {
        const position = JSON.parse(saved);
        if (!Number.isFinite(position.left) || !Number.isFinite(position.top)) return;
        this.panel.style.left = `${position.left}px`;
        this.panel.style.top = `${position.top}px`;
        this.panel.style.right = "auto";
        this.panel.style.bottom = "auto";
        requestAnimationFrame(() => this.constrainPanel());
      } catch (error) {
        // Ignora posição inválida.
      }
    }

    constrainPanel() {
      if (this.panel.classList.contains("te-hidden")) return;
      const rect = this.panel.getBoundingClientRect();
      if (!this.panel.style.left && !this.panel.style.top) return;
      const left = Math.min(Math.max(8, rect.left), Math.max(8, window.innerWidth - rect.width - 8));
      const top = Math.min(Math.max(8, rect.top), Math.max(8, window.innerHeight - rect.height - 8));
      this.panel.style.left = `${left}px`;
      this.panel.style.top = `${top}px`;
      this.panel.style.right = "auto";
      this.panel.style.bottom = "auto";
    }

    showToast(message, type = "info", duration = 3000) {
      if (!this.toastStack) return;
      const toast = document.createElement("div");
      toast.className = `te-toast te-${type}`;
      const iconName = type === "success" ? "check-circle" : type === "error" ? "alert-triangle" : "info";
      toast.innerHTML = `${this.icon(iconName)}<span>${this.escapeHtml(message)}</span>`;
      this.toastStack.appendChild(toast);
      window.setTimeout(() => { toast.classList.add("te-leaving"); window.setTimeout(() => toast.remove(), 200); }, duration);
    }

    escapeHtml(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    escapeAttr(value) {
      return this.escapeHtml(value).replace(/`/g, "&#096;");
    }

    escapeRegExp(value) {
      return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  }


  /* ==========================================================
   * Text Express 5.0 — Sequências exclusivas do Atendimento
   * ========================================================== */
  const TE_V5_LEGACY_FLOW_IDS = Object.freeze(["te-atd-069", "te-atd-070", "te-atd-071"]);

  const teV5Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    loadSnippets: TextExpressApp.prototype.loadSnippets,
    normalizeSnippet: TextExpressApp.prototype.normalizeSnippet,
    openModal: TextExpressApp.prototype.openModal,
    closeModal: TextExpressApp.prototype.closeModal,
    handleRootClick: TextExpressApp.prototype.handleRootClick,
    handleRootChange: TextExpressApp.prototype.handleRootChange,
    handleRootInput: TextExpressApp.prototype.handleRootInput,
    insertSnippet: TextExpressApp.prototype.insertSnippet,
    copySnippet: TextExpressApp.prototype.copySnippet
  });

  TextExpressApp.prototype.init = function () {
    this.flowProgress = new Map();
    this.flowVariableValues = new Map();
    this.editingFlowSteps = [];
    return teV5Original.init.call(this);
  };

  TextExpressApp.prototype.normalizeFlowStep = function (raw = {}, index = 0, parentShortcut = "/fluxo") {
    const nome = String(raw.nome || `Fala ${index + 1}`).trim().slice(0, 100) || `Fala ${index + 1}`;
    const conteudo = String(raw.conteudo || raw.content || "").replace(/\r\n/g, "\n").trim();
    const suggested = `${this.normalizeShortcut(parentShortcut).replace(/[-_]$/, "")}${index + 1}`;
    return {
      id: this.isSafeId(raw.id) ? String(raw.id) : this.generateId("etapa"),
      nome,
      atalho: this.normalizeShortcut(raw.atalho || raw.shortcut || suggested),
      conteudo,
      triggerKey: ["space", "tab", "enter"].includes(raw.triggerKey) ? raw.triggerKey : "space",
      opcional: Boolean(raw.opcional),
      variaveis: this.extractVariables(conteudo)
    };
  };

  TextExpressApp.prototype.normalizeSnippet = function (raw = {}) {
    const tipo = raw.tipo === "protocolo" ? "protocolo" : "atendimento";
    const isFlow = tipo === "atendimento"
      && raw.modelo === "fluxo"
      && Array.isArray(raw.etapas);

    if (!isFlow) {
      const base = teV5Original.normalizeSnippet.call(this, raw);
      base.modelo = "unico";
      base.etapas = [];
      return base;
    }

    const parentShortcut = this.normalizeShortcut(
      raw.atalho || raw.shortcut || this.suggestShortcutFromName(raw.nome || "fluxo")
    );
    const etapas = raw.etapas
      .map((step, index) => this.normalizeFlowStep(step, index, parentShortcut))
      .filter((step) => step.conteudo && step.nome);

    const joinedContent = etapas.map((step) => step.conteudo).join("\n\n");
    const base = teV5Original.normalizeSnippet.call(this, {
      ...raw,
      tipo: "atendimento",
      conteudo: joinedContent || String(raw.conteudo || "")
    });

    base.modelo = "fluxo";
    base.atalho = parentShortcut;
    base.etapas = etapas;
    base.conteudo = joinedContent;
    base.variaveis = [...new Set(etapas.flatMap((step) => step.variaveis))];
    return base;
  };

  TextExpressApp.prototype.normalizeCollection = function (items) {
    const ids = new Set();
    const shortcuts = new Set();
    const normalized = [];

    for (const raw of items || []) {
      const item = this.normalizeSnippet(raw);
      if (!item.nome) continue;
      if (item.modelo === "fluxo" && !item.etapas.length) continue;
      if (item.modelo !== "fluxo" && !item.conteudo) continue;

      if (ids.has(item.id)) item.id = this.generateId(item.tipo);
      ids.add(item.id);

      item.atalho = this.makeUniqueShortcut(item.atalho, shortcuts);
      shortcuts.add(item.atalho);

      if (item.modelo === "fluxo") {
        item.etapas = item.etapas.map((step, index) => {
          const normalizedStep = this.normalizeFlowStep(step, index, item.atalho);
          normalizedStep.atalho = this.makeUniqueShortcut(normalizedStep.atalho, shortcuts);
          shortcuts.add(normalizedStep.atalho);
          return normalizedStep;
        });
        item.conteudo = item.etapas.map((step) => step.conteudo).join("\n\n");
        item.variaveis = [...new Set(item.etapas.flatMap((step) => step.variaveis))];
      }

      normalized.push(item);
    }
    return normalized;
  };

  TextExpressApp.prototype.createLegacySemGerenciaFlow = function (legacyItems) {
    const category = this.getCategoryForSnippet(legacyItems[0]);
    return this.normalizeSnippet({
      id: "te-flow-sem-gerencia",
      tipo: "atendimento",
      modelo: "fluxo",
      nome: "Roteador sem gerência",
      atalho: "/semgerencia",
      categoriaId: category.id,
      categoria: category.nome,
      grupo: "Sem Gerência TP-Link",
      contexto: "SEM GERÊNCIA TP-LINK",
      favorito: legacyItems.some((item) => item.favorito),
      ativo: true,
      origem: "Base de atendimento",
      triggerKey: "space",
      etapas: [
        {
          id: "te-flow-sem-gerencia-etapa-1",
          nome: "Explicar o problema",
          atalho: "/semgerencia1",
          conteudo: legacyItems[0].conteudo,
          triggerKey: "space"
        },
        {
          id: "te-flow-sem-gerencia-etapa-2",
          nome: "Informar as atualizações",
          atalho: "/semgerencia2",
          conteudo: legacyItems[1].conteudo,
          triggerKey: "space"
        },
        {
          id: "te-flow-sem-gerencia-etapa-3",
          nome: "Solicitar o reinício",
          atalho: "/semgerencia3",
          conteudo: legacyItems[2].conteudo,
          triggerKey: "space"
        }
      ]
    });
  };

  TextExpressApp.prototype.migrateLegacySemGerenciaFlow = function () {
    if (this.snippets.some((item) => item.id === "te-flow-sem-gerencia" || item.modelo === "fluxo" && item.atalho === "/semgerencia")) {
      return false;
    }

    const legacyItems = TE_V5_LEGACY_FLOW_IDS
      .map((id) => this.snippets.find((item) => item.id === id))
      .filter(Boolean);

    if (legacyItems.length !== TE_V5_LEGACY_FLOW_IDS.length) return false;

    const flow = this.createLegacySemGerenciaFlow(legacyItems);
    const firstIndex = Math.min(...legacyItems.map((item) => this.snippets.indexOf(item)));
    this.snippets = this.snippets.filter((item) => !TE_V5_LEGACY_FLOW_IDS.includes(item.id));
    this.snippets.splice(Math.max(0, firstIndex), 0, flow);
    return true;
  };

  TextExpressApp.prototype.loadSnippets = function () {
    teV5Original.loadSnippets.call(this);
    if (this.migrateLegacySemGerenciaFlow()) this.saveSnippets();
  };

  TextExpressApp.prototype.getAllShortcutOwners = function (ignoreModelId = null) {
    const owners = new Map();
    for (const snippet of this.snippets) {
      if (snippet.id === ignoreModelId) continue;
      owners.set(snippet.atalho, snippet.nome);
      if (snippet.modelo === "fluxo") {
        snippet.etapas.forEach((step) => owners.set(step.atalho, `${snippet.nome} — ${step.nome}`));
      }
    }
    return owners;
  };

  TextExpressApp.prototype.rebuildShortcutMap = function () {
    this.shortcutMap = new Map();
    for (const snippet of this.snippets) {
      if (!snippet.ativo || !snippet.atalho) continue;

      if (snippet.modelo === "fluxo" && snippet.tipo === "atendimento") {
        this.shortcutMap.set(snippet.atalho.toLowerCase(), {
          kind: "flow",
          snippet,
          triggerKey: snippet.triggerKey
        });

        snippet.etapas.forEach((step, index) => {
          this.shortcutMap.set(step.atalho.toLowerCase(), {
            kind: "flow-step",
            snippet,
            step,
            stepIndex: index,
            triggerKey: step.triggerKey
          });
        });
      } else {
        this.shortcutMap.set(snippet.atalho.toLowerCase(), {
          kind: "snippet",
          snippet,
          triggerKey: snippet.triggerKey
        });
      }
    }
  };

  TextExpressApp.prototype.getFilteredSnippets = function () {
    const query = this.normalizeSearchText(this.searchInput.value);
    return this.snippets.filter((snippet) => {
      if (!snippet.ativo) return false;
      const matchesType = this.activeType === "favoritos"
        ? snippet.favorito
        : snippet.tipo === this.activeType;
      if (!matchesType) return false;
      if (this.activeCategory !== "Todos" && snippet.categoriaId !== this.activeCategory) return false;
      if (!query) return true;

      const category = this.getCategoryForSnippet(snippet);
      const flowText = snippet.modelo === "fluxo"
        ? snippet.etapas.flatMap((step) => [step.nome, step.atalho, step.conteudo]).join(" ")
        : "";
      const haystack = this.normalizeSearchText([
        snippet.nome,
        snippet.atalho,
        snippet.conteudo,
        category.nome,
        snippet.grupo,
        snippet.contexto,
        flowText
      ].join(" "));
      return haystack.includes(query);
    });
  };

  TextExpressApp.prototype.getFlowState = function (flow) {
    if (!this.flowProgress.has(flow.id)) {
      this.flowProgress.set(flow.id, { current: 0, used: new Set() });
    }
    const state = this.flowProgress.get(flow.id);
    state.current = Math.min(Math.max(0, state.current), Math.max(0, flow.etapas.length - 1));
    return state;
  };

  TextExpressApp.prototype.getFlowValues = function (flowId) {
    if (!this.flowVariableValues.has(flowId)) this.flowVariableValues.set(flowId, {});
    return this.flowVariableValues.get(flowId);
  };

  TextExpressApp.prototype.renderCard = function (snippet) {
    const selected = snippet.id === this.selectedId ? "te-selected" : "";
    const category = this.getCategoryForSnippet(snippet);

    if (snippet.modelo === "fluxo") {
      const shortcuts = snippet.etapas.slice(0, 3).map((step) => `<code>${this.escapeHtml(step.atalho)}</code>`).join("");
      return `
        <article class="te-snippet-card te-flow-card ${selected}" data-te-card-id="${this.escapeAttr(snippet.id)}" data-te-snippet-type="atendimento" style="--te-card-accent:${this.escapeAttr(category.cor)}">
          <span class="te-card-icon" aria-hidden="true" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon("play-circle")}</span>
          <div class="te-card-main">
            <div class="te-card-title-row">
              <span class="te-card-title" title="${this.escapeAttr(snippet.nome)}">${this.escapeHtml(snippet.nome)}</span>
              <span class="te-flow-count">${snippet.etapas.length} falas</span>
            </div>
            <div class="te-shortcut-line"><code>${this.escapeHtml(snippet.atalho)}</code><span>abre a sequência</span></div>
            <div class="te-flow-shortcuts">${shortcuts}</div>
            <div class="te-card-actions">
              <button class="te-text-button te-card-insert" type="button" data-te-action="flow-open" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("play-circle")} Abrir sequência</button>
              <button class="te-icon-action" type="button" data-te-action="edit" data-te-id="${this.escapeAttr(snippet.id)}" title="Editar">${this.icon("edit")}</button>
              <button class="te-icon-action te-delete" type="button" data-te-action="delete" data-te-id="${this.escapeAttr(snippet.id)}" title="Excluir">${this.icon("trash")}</button>
            </div>
          </div>
          <button class="te-favorite-button ${snippet.favorito ? "te-active" : ""}" type="button" data-te-action="favorite" data-te-id="${this.escapeAttr(snippet.id)}" title="Favorito">${this.icon("star")}</button>
        </article>`;
    }

    return `
      <article class="te-snippet-card te-single-card ${selected}" data-te-card-id="${this.escapeAttr(snippet.id)}" data-te-snippet-type="${snippet.tipo}" style="--te-card-accent:${this.escapeAttr(category.cor)}">
        <span class="te-card-icon" aria-hidden="true" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon(category.icone)}</span>
        <div class="te-card-main">
          <div class="te-card-title-row">
            <span class="te-card-title" title="${this.escapeAttr(snippet.nome)}">${this.escapeHtml(snippet.nome)}</span>
          </div>
          <div class="te-shortcut-line"><code>${this.escapeHtml(snippet.atalho)}</code><span>${TRIGGER_LABELS[snippet.triggerKey] || "Espaço"}</span></div>
          <p class="te-card-excerpt">${this.escapeHtml(snippet.conteudo)}</p>
          <div class="te-card-actions">
            <button class="te-text-button te-card-insert" type="button" data-te-action="insert" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("send")} Inserir</button>
            <button class="te-icon-action" type="button" data-te-action="edit" data-te-id="${this.escapeAttr(snippet.id)}" title="Editar">${this.icon("edit")}</button>
            <button class="te-icon-action te-delete" type="button" data-te-action="delete" data-te-id="${this.escapeAttr(snippet.id)}" title="Excluir">${this.icon("trash")}</button>
          </div>
        </div>
        <button class="te-favorite-button ${snippet.favorito ? "te-active" : ""}" type="button" data-te-action="favorite" data-te-id="${this.escapeAttr(snippet.id)}" title="Favorito">${this.icon("star")}</button>
      </article>`;
  };

  TextExpressApp.prototype.renderDetail = function (snippet) {
    if (!snippet) {
      this.detailPane.removeAttribute("data-te-snippet-type");
      this.detailPane.innerHTML = `<div class="te-detail-empty">${this.icon("zap")}<strong>Selecione um modelo</strong><p>Escolha uma fala, sequência ou protocolo.</p></div>`;
      return;
    }

    if (snippet.modelo === "fluxo") {
      this.renderFlowDetail(snippet);
      return;
    }

    const category = this.getCategoryForSnippet(snippet);
    this.detailPane.dataset.teSnippetType = snippet.tipo;
    this.detailPane.style.setProperty("--te-detail-accent", category.cor);
    const variableHtml = snippet.variaveis.length
      ? snippet.variaveis.map((variable) => `<span class="te-variable-tag">${this.icon("tag")}${this.escapeHtml(variable)}</span>`).join("")
      : "";

    this.detailPane.innerHTML = `
      <div class="te-detail-header te-detail-header-light">
        <div class="te-detail-title-wrap">
          <span class="te-detail-category-icon" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon(category.icone)}</span>
          <div>
            <h2>${this.escapeHtml(snippet.nome)}</h2>
            <div class="te-detail-meta">
              <span>${this.escapeHtml(category.nome)}</span>
              <code>${this.escapeHtml(snippet.atalho)}</code>
              <span>${TRIGGER_LABELS[snippet.triggerKey] || "Espaço"}</span>
            </div>
          </div>
        </div>
        <button class="te-favorite-button ${snippet.favorito ? "te-active" : ""}" type="button" data-te-action="favorite" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("star")}</button>
      </div>
      <section class="te-detail-section te-detail-content-section">
        <div class="te-content-preview">${this.escapeHtml(snippet.conteudo)}</div>
      </section>
      ${variableHtml ? `<section class="te-detail-section te-inline-section"><strong>Campos:</strong><div class="te-variable-tags">${variableHtml}</div></section>` : ""}
      <div class="te-detail-actions te-detail-actions-light">
        <button class="te-primary-button" type="button" data-te-action="insert" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("send")} Inserir</button>
        <button class="te-secondary-button" type="button" data-te-action="copy" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("copy")} Copiar</button>
        <button class="te-icon-action" type="button" data-te-action="edit" data-te-id="${this.escapeAttr(snippet.id)}" title="Editar">${this.icon("edit")}</button>
        <button class="te-icon-action te-delete" type="button" data-te-action="delete" data-te-id="${this.escapeAttr(snippet.id)}" title="Excluir">${this.icon("trash")}</button>
      </div>`;
  };

  TextExpressApp.prototype.renderFlowDetail = function (flow) {
    const category = this.getCategoryForSnippet(flow);
    const state = this.getFlowState(flow);
    const values = this.getFlowValues(flow.id);
    const variables = [...new Set(flow.etapas.flatMap((step) => step.variaveis || []))];

    this.detailPane.dataset.teSnippetType = "atendimento";
    this.detailPane.style.setProperty("--te-detail-accent", category.cor);

    const variableFields = variables.length
      ? `<section class="te-flow-variable-section">
          <div class="te-flow-section-title"><strong>Campos do fluxo</strong><small>Preencha uma vez e use em todas as falas.</small></div>
          <div class="te-flow-variable-grid">
            ${variables.map((variable) => `
              <label>
                <span>${this.escapeHtml(variable)}</span>
                <input type="text" value="${this.escapeAttr(values[variable] || "")}" data-te-flow-variable="${this.escapeAttr(variable)}" data-te-flow-id="${this.escapeAttr(flow.id)}" autocomplete="off">
              </label>`).join("")}
          </div>
        </section>`
      : "";

    const stepsHtml = flow.etapas.map((step, index) => {
      const active = state.current === index;
      const used = state.used.has(index);
      return `
        <article class="te-flow-step ${active ? "te-active" : ""} ${used ? "te-used" : ""}">
          <button class="te-flow-step-summary" type="button" data-te-action="flow-step-select" data-te-id="${this.escapeAttr(flow.id)}" data-te-step-index="${index}">
            <span class="te-flow-step-number">${used ? this.icon("check") : index + 1}</span>
            <span class="te-flow-step-name">${this.escapeHtml(step.nome)}</span>
            ${step.opcional ? '<span class="te-optional-badge">opcional</span>' : ""}
            <code>${this.escapeHtml(step.atalho)}</code>
          </button>
          <div class="te-flow-step-body ${active ? "" : "te-hidden"}">
            <p>${this.escapeHtml(step.conteudo)}</p>
            <div class="te-flow-step-actions">
              <button class="te-secondary-button" type="button" data-te-action="flow-step-insert" data-te-id="${this.escapeAttr(flow.id)}" data-te-step-index="${index}">${this.icon("send")} Inserir</button>
              <button class="te-primary-button" type="button" data-te-action="flow-step-insert-next" data-te-id="${this.escapeAttr(flow.id)}" data-te-step-index="${index}">${this.icon("chevron-right")} Inserir e avançar</button>
            </div>
          </div>
        </article>`;
    }).join("");

    this.detailPane.innerHTML = `
      <div class="te-detail-header te-flow-detail-header">
        <div class="te-detail-title-wrap">
          <span class="te-detail-category-icon" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon("play-circle")}</span>
          <div>
            <h2>${this.escapeHtml(flow.nome)}</h2>
            <div class="te-detail-meta">
              <span>Sequência de ${flow.etapas.length} falas</span>
              <code>${this.escapeHtml(flow.atalho)}</code>
              <span>abre a sequência</span>
            </div>
          </div>
        </div>
        <div class="te-flow-header-actions">
          <button class="te-icon-action" type="button" data-te-action="flow-reset" data-te-id="${this.escapeAttr(flow.id)}" title="Reiniciar sequência">${this.icon("rotate-ccw")}</button>
          <button class="te-icon-action" type="button" data-te-action="edit" data-te-id="${this.escapeAttr(flow.id)}" title="Editar">${this.icon("edit")}</button>
          <button class="te-favorite-button ${flow.favorito ? "te-active" : ""}" type="button" data-te-action="favorite" data-te-id="${this.escapeAttr(flow.id)}">${this.icon("star")}</button>
        </div>
      </div>
      ${variableFields}
      <section class="te-flow-steps-view">
        <div class="te-flow-section-title">
          <strong>Etapas do atendimento</strong>
          <small>Etapa ${state.current + 1} de ${flow.etapas.length}</small>
        </div>
        ${stepsHtml}
      </section>`;
  };

  TextExpressApp.prototype.updateCount = function () {
    const atendimento = this.snippets.filter((item) => item.tipo === "atendimento" && item.ativo).length;
    const protocolo = this.snippets.filter((item) => item.tipo === "protocolo" && item.ativo).length;
    const falas = this.snippets
      .filter((item) => item.tipo === "atendimento" && item.modelo === "fluxo" && item.ativo)
      .reduce((total, item) => total + item.etapas.length, 0);
    const total = atendimento + protocolo;
    this.countBadge.textContent = `${total} ${total === 1 ? "modelo" : "modelos"}`;
    this.statusCounts.textContent = `Atendimento: ${atendimento} · Protocolos: ${protocolo}${falas ? ` · Falas em fluxos: ${falas}` : ""}`;
  };

  TextExpressApp.prototype.openModal = function (data = null) {
    teV5Original.openModal.call(this, data);
    const isFlow = data?.tipo === "atendimento" && data?.modelo === "fluxo";
    this.editingFlowSteps = isFlow
      ? data.etapas.map((step, index) => this.normalizeFlowStep(step, index, data.atalho))
      : [];
    this.root.querySelectorAll('input[name="te-model-kind"]').forEach((input) => {
      input.checked = input.value === (isFlow ? "fluxo" : "unico");
    });
    this.renderFlowEditorSteps();
    this.updateModelKindUI();
  };

  TextExpressApp.prototype.closeModal = function () {
    this.editingFlowSteps = [];
    teV5Original.closeModal.call(this);
  };

  TextExpressApp.prototype.updateModelKindUI = function () {
    const type = this.root.querySelector('input[name="te-type"]:checked')?.value || "atendimento";
    const kindSelector = this.root.querySelector("#te-model-kind-selector");
    const singleWrap = this.root.querySelector("#te-single-content-wrap");
    const flowEditor = this.root.querySelector("#te-flow-editor");

    kindSelector.classList.toggle("te-hidden", type !== "atendimento");

    if (type !== "atendimento") {
      this.root.querySelector('input[name="te-model-kind"][value="unico"]').checked = true;
    }

    const kind = type === "atendimento"
      ? this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico"
      : "unico";

    const isFlow = kind === "fluxo";
    singleWrap.classList.toggle("te-hidden", isFlow);
    flowEditor.classList.toggle("te-hidden", !isFlow);

    if (isFlow && this.editingFlowSteps.length < 2) {
      const baseShortcut = this.root.querySelector("#te-form-shortcut").value || "/fluxo";
      while (this.editingFlowSteps.length < 2) {
        const index = this.editingFlowSteps.length;
        this.editingFlowSteps.push(this.normalizeFlowStep({
          nome: `Fala ${index + 1}`,
          atalho: `${this.normalizeShortcut(baseShortcut)}${index + 1}`,
          conteudo: ""
        }, index, baseShortcut));
      }
      this.renderFlowEditorSteps();
    }

    const title = this.root.querySelector("#te-modal-title");
    if (!this.editingId) title.textContent = isFlow ? "Criar sequência de falas" : "Criar modelo";
    this.updateFlowVariablePreview();
  };

  TextExpressApp.prototype.renderFlowEditorSteps = function () {
    const container = this.root.querySelector("#te-flow-editor-steps");
    if (!container) return;

    container.innerHTML = this.editingFlowSteps.map((step, index) => `
      <article class="te-flow-step-editor" data-te-flow-editor-index="${index}">
        <header>
          <span class="te-flow-step-editor-number">${index + 1}</span>
          <strong>Fala ${index + 1}</strong>
          <div class="te-flow-editor-actions">
            <button class="te-icon-action" type="button" data-te-action="flow-editor-up" data-te-step-index="${index}" title="Mover para cima" ${index === 0 ? "disabled" : ""}>${this.icon("chevron-left")}</button>
            <button class="te-icon-action" type="button" data-te-action="flow-editor-down" data-te-step-index="${index}" title="Mover para baixo" ${index === this.editingFlowSteps.length - 1 ? "disabled" : ""}>${this.icon("chevron-right")}</button>
            <button class="te-icon-action te-delete" type="button" data-te-action="flow-editor-remove" data-te-step-index="${index}" title="Excluir fala">${this.icon("trash")}</button>
          </div>
        </header>
        <div class="te-flow-step-editor-grid">
          <label>
            <span>Nome da fala</span>
            <input type="text" data-te-flow-field="nome" maxlength="100" value="${this.escapeAttr(step.nome)}" placeholder="Ex.: Explicar o problema">
          </label>
          <label>
            <span>Atalho direto</span>
            <input type="text" data-te-flow-field="atalho" maxlength="60" value="${this.escapeAttr(step.atalho)}" spellcheck="false" placeholder="/fluxo${index + 1}">
          </label>
          <label>
            <span>Ativar com</span>
            <select data-te-flow-field="triggerKey">
              <option value="space" ${step.triggerKey === "space" ? "selected" : ""}>Espaço</option>
              <option value="tab" ${step.triggerKey === "tab" ? "selected" : ""}>Tab</option>
              <option value="enter" ${step.triggerKey === "enter" ? "selected" : ""}>Enter</option>
            </select>
          </label>
          <label class="te-flow-optional-check">
            <input type="checkbox" data-te-flow-field="opcional" ${step.opcional ? "checked" : ""}>
            <span>Fala opcional</span>
          </label>
          <label class="te-flow-step-content-field">
            <span>Texto enviado ao cliente</span>
            <textarea rows="4" data-te-flow-field="conteudo" placeholder="Digite a fala...">${this.escapeHtml(step.conteudo)}</textarea>
          </label>
        </div>
      </article>`).join("");

    this.updateFlowVariablePreview();
  };

  TextExpressApp.prototype.syncEditingFlowSteps = function () {
    const editors = [...this.root.querySelectorAll(".te-flow-step-editor")];
    this.editingFlowSteps = editors.map((editor, index) => {
      const get = (field) => editor.querySelector(`[data-te-flow-field="${field}"]`);
      return this.normalizeFlowStep({
        id: this.editingFlowSteps[index]?.id,
        nome: get("nome")?.value,
        atalho: get("atalho")?.value,
        conteudo: get("conteudo")?.value,
        triggerKey: get("triggerKey")?.value,
        opcional: Boolean(get("opcional")?.checked)
      }, index, this.root.querySelector("#te-form-shortcut").value || "/fluxo");
    });
    return this.editingFlowSteps;
  };

  TextExpressApp.prototype.addFlowEditorStep = function () {
    this.syncEditingFlowSteps();
    const index = this.editingFlowSteps.length;
    const parent = this.root.querySelector("#te-form-shortcut").value || "/fluxo";
    this.editingFlowSteps.push(this.normalizeFlowStep({
      nome: `Fala ${index + 1}`,
      atalho: `${this.normalizeShortcut(parent)}${index + 1}`,
      conteudo: ""
    }, index, parent));
    this.renderFlowEditorSteps();
  };

  TextExpressApp.prototype.removeFlowEditorStep = function (index) {
    this.syncEditingFlowSteps();
    if (this.editingFlowSteps.length <= 2) {
      this.root.querySelector("#te-flow-error").textContent = "Uma sequência precisa ter pelo menos duas falas.";
      return;
    }
    this.editingFlowSteps.splice(index, 1);
    this.renderFlowEditorSteps();
  };

  TextExpressApp.prototype.moveFlowEditorStep = function (index, direction) {
    this.syncEditingFlowSteps();
    const target = index + direction;
    if (target < 0 || target >= this.editingFlowSteps.length) return;
    [this.editingFlowSteps[index], this.editingFlowSteps[target]] =
      [this.editingFlowSteps[target], this.editingFlowSteps[index]];
    this.renderFlowEditorSteps();
  };

  TextExpressApp.prototype.updateFlowVariablePreview = function () {
    const kind = this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico";
    if (kind !== "fluxo") return;
    const steps = this.syncingFlowPreview
      ? this.editingFlowSteps
      : (() => {
          this.syncingFlowPreview = true;
          const current = this.root.querySelectorAll(".te-flow-step-editor").length
            ? this.syncEditingFlowSteps()
            : this.editingFlowSteps;
          this.syncingFlowPreview = false;
          return current;
        })();

    const variables = [...new Set(steps.flatMap((step) => this.extractVariables(step.conteudo)))];
    const preview = this.root.querySelector("#te-variable-preview");
    preview.innerHTML = variables.length
      ? variables.map((variable) => `<span class="te-variable-tag">${this.escapeHtml(variable)}</span>`).join("")
      : '<span class="te-muted">Nenhuma variável encontrada.</span>';
  };

  TextExpressApp.prototype.validateShortcutField = function () {
    const field = this.root.querySelector("#te-form-shortcut");
    const shortcut = this.normalizeShortcut(field.value);
    field.value = shortcut;
    const owner = this.getAllShortcutOwners(this.editingId).get(shortcut);
    this.setFormError("shortcut", owner ? `Esse atalho já pertence a “${owner}”.` : "");
    return !owner;
  };

  TextExpressApp.prototype.saveSnippet = function (event) {
    event.preventDefault();
    this.clearFormErrors();
    const flowError = this.root.querySelector("#te-flow-error");
    if (flowError) flowError.textContent = "";

    const id = this.root.querySelector("#te-form-id").value;
    const tipo = this.root.querySelector('input[name="te-type"]:checked')?.value || "atendimento";
    const modelo = tipo === "atendimento"
      ? this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico"
      : "unico";
    const nome = this.root.querySelector("#te-form-name").value.trim();
    const atalho = this.normalizeShortcut(this.root.querySelector("#te-form-shortcut").value);
    const triggerKey = this.root.querySelector("#te-form-trigger").value;
    const categoriaId = this.root.querySelector("#te-form-category").value;
    const category = this.getCategoryById(categoriaId) || this.resolveCategory(null, "Outros", tipo);
    const favorito = this.root.querySelector("#te-form-favorite").checked;
    const owners = this.getAllShortcutOwners(id);
    let valid = true;

    if (!nome) {
      this.setFormError("name", "Informe um nome para o modelo.");
      valid = false;
    }

    if (owners.has(atalho)) {
      this.setFormError("shortcut", `Esse atalho já pertence a “${owners.get(atalho)}”.`);
      valid = false;
    }

    let conteudo = "";
    let etapas = [];

    if (modelo === "fluxo") {
      etapas = this.syncEditingFlowSteps();
      if (etapas.length < 2) {
        flowError.textContent = "Uma sequência precisa ter pelo menos duas falas.";
        valid = false;
      }

      const localShortcuts = new Set([atalho]);
      for (let index = 0; index < etapas.length; index += 1) {
        const step = etapas[index];
        if (!step.nome || !step.conteudo) {
          flowError.textContent = `Preencha o nome e o texto da fala ${index + 1}.`;
          valid = false;
          break;
        }

        step.atalho = this.normalizeShortcut(step.atalho);
        if (localShortcuts.has(step.atalho)) {
          flowError.textContent = `O atalho ${step.atalho} está repetido dentro da sequência.`;
          valid = false;
          break;
        }
        if (owners.has(step.atalho)) {
          flowError.textContent = `O atalho ${step.atalho} já pertence a “${owners.get(step.atalho)}”.`;
          valid = false;
          break;
        }
        localShortcuts.add(step.atalho);
      }
      conteudo = etapas.map((step) => step.conteudo).join("\n\n");
    } else {
      conteudo = this.root.querySelector("#te-form-content").value.trim();
      if (!conteudo) {
        this.setFormError("content", "Informe o conteúdo que será inserido.");
        valid = false;
      }
    }

    if (!valid) return;

    const existingIndex = id ? this.snippets.findIndex((item) => item.id === id) : -1;
    const base = existingIndex >= 0 ? this.snippets[existingIndex] : {};
    const snippet = this.normalizeSnippet({
      ...base,
      id: existingIndex >= 0 ? id : this.generateId(tipo),
      tipo,
      modelo,
      nome,
      atalho,
      triggerKey,
      categoriaId: category.id,
      categoria: category.nome,
      conteudo,
      etapas,
      favorito,
      ativo: true,
      origem: existingIndex >= 0 ? base.origem : "Criado pelo usuário"
    });

    if (existingIndex >= 0) this.snippets.splice(existingIndex, 1, snippet);
    else this.snippets.unshift(snippet);

    this.saveSnippets();
    this.activeType = tipo;
    this.activeCategory = "Todos";
    this.selectedId = snippet.id;
    this.closeModal();
    this.render();
    this.showToast(
      existingIndex >= 0
        ? modelo === "fluxo" ? "Sequência atualizada." : "Modelo atualizado."
        : modelo === "fluxo" ? "Sequência criada." : "Modelo criado.",
      "success"
    );
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    const actionButton = event.target.closest("[data-te-action]");
    const action = actionButton?.dataset.teAction;
    const id = actionButton?.dataset.teId;
    const stepIndex = Number(actionButton?.dataset.teStepIndex);

    if (action && [
      "flow-open",
      "flow-step-select",
      "flow-step-insert",
      "flow-step-insert-next",
      "flow-reset",
      "flow-step-add",
      "flow-editor-remove",
      "flow-editor-up",
      "flow-editor-down"
    ].includes(action)) {
      event.preventDefault();
      event.stopPropagation();

      if (action === "flow-open") {
        this.selectedId = id;
        this.activeType = "atendimento";
        this.render();
      } else if (action === "flow-step-select") {
        const flow = this.snippets.find((item) => item.id === id && item.modelo === "fluxo");
        if (flow) {
          this.getFlowState(flow).current = stepIndex;
          this.renderDetail(flow);
        }
      } else if (action === "flow-step-insert") {
        void this.insertFlowStep(id, stepIndex, false);
      } else if (action === "flow-step-insert-next") {
        void this.insertFlowStep(id, stepIndex, true);
      } else if (action === "flow-reset") {
        this.resetFlow(id);
      } else if (action === "flow-step-add") {
        this.addFlowEditorStep();
      } else if (action === "flow-editor-remove") {
        this.removeFlowEditorStep(stepIndex);
      } else if (action === "flow-editor-up") {
        this.moveFlowEditorStep(stepIndex, -1);
      } else if (action === "flow-editor-down") {
        this.moveFlowEditorStep(stepIndex, 1);
      }
      return;
    }

    return teV5Original.handleRootClick.call(this, event);
  };

  TextExpressApp.prototype.handleRootChange = function (event) {
    teV5Original.handleRootChange.call(this, event);
    if (event.target.matches('input[name="te-type"], input[name="te-model-kind"]')) {
      this.updateModelKindUI();
    }
    if (event.target.matches("[data-te-flow-field]")) {
      this.syncEditingFlowSteps();
      this.updateFlowVariablePreview();
    }
  };

  TextExpressApp.prototype.handleRootInput = function (event) {
    teV5Original.handleRootInput.call(this, event);

    if (event.target.matches("[data-te-flow-field]")) {
      this.syncEditingFlowSteps();
      this.updateFlowVariablePreview();
    }

    if (event.target.matches("[data-te-flow-variable]")) {
      const flowId = event.target.dataset.teFlowId;
      const variable = event.target.dataset.teFlowVariable;
      const values = this.getFlowValues(flowId);
      values[variable] = event.target.value;
    }
  };

  TextExpressApp.prototype.processFlowStep = async function (flow, step) {
    const variables = this.extractVariables(step.conteudo);
    if (!variables.length) return step.conteudo;

    const values = this.getFlowValues(flow.id);
    const missing = variables.filter((variable) => !String(values[variable] ?? "").trim());

    if (missing.length) {
      const supplied = await this.requestVariableValues(missing);
      if (!supplied) return null;
      Object.assign(values, supplied);
    }

    let result = step.conteudo;
    for (const variable of variables) {
      const pattern = new RegExp(`\\[${this.escapeRegExp(variable)}\\]`, "g");
      result = result.replace(pattern, values[variable] ?? "");
    }
    return result;
  };

  TextExpressApp.prototype.insertFlowStep = async function (flowId, stepIndex, advance = false) {
    const flow = this.snippets.find((item) => item.id === flowId && item.modelo === "fluxo");
    const step = flow?.etapas[stepIndex];
    if (!flow || !step) return;

    const context = this.captureInsertionContext(this.lastActiveElement, 0);
    const content = await this.processFlowStep(flow, step);
    if (content === null) {
      this.showToast("Inserção cancelada.");
      return;
    }

    if (context && this.applyInsertionContext(context, content)) {
      this.showToast(`Fala ${stepIndex + 1} inserida.`, "success");
    } else {
      await this.copyText(content);
      this.showToast(`Fala ${stepIndex + 1} copiada.`, "success");
    }

    const state = this.getFlowState(flow);
    state.used.add(stepIndex);
    if (advance) state.current = Math.min(stepIndex + 1, flow.etapas.length - 1);
    else state.current = stepIndex;
    this.renderDetail(flow);

    if (!this.settings.keepOpenAfterInsert) this.toggleMinimize(true);
  };

  TextExpressApp.prototype.resetFlow = function (flowId) {
    const flow = this.snippets.find((item) => item.id === flowId && item.modelo === "fluxo");
    if (!flow) return;
    this.flowProgress.set(flowId, { current: 0, used: new Set() });
    this.flowVariableValues.delete(flowId);
    this.renderDetail(flow);
    this.showToast("Sequência reiniciada.", "success");
  };

  TextExpressApp.prototype.insertSnippet = async function (id) {
    const snippet = this.snippets.find((item) => item.id === id);
    if (snippet?.modelo === "fluxo") {
      this.selectedId = snippet.id;
      this.activeType = "atendimento";
      this.openApp();
      this.render();
      return;
    }
    return teV5Original.insertSnippet.call(this, id);
  };

  TextExpressApp.prototype.copySnippet = async function (id) {
    const snippet = this.snippets.find((item) => item.id === id);
    if (snippet?.modelo === "fluxo") {
      const state = this.getFlowState(snippet);
      const step = snippet.etapas[state.current];
      const content = await this.processFlowStep(snippet, step);
      if (content === null) return;
      await this.copyText(content);
      state.used.add(state.current);
      this.renderDetail(snippet);
      this.showToast("Fala atual copiada.", "success");
      return;
    }
    return teV5Original.copySnippet.call(this, id);
  };

  TextExpressApp.prototype.findShortcutBeforeCaret = function (element, triggerKey) {
    let before = "";
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      const caret = typeof element.selectionStart === "number" ? element.selectionStart : element.value.length;
      if (element.selectionStart !== element.selectionEnd) return null;
      before = element.value.slice(0, caret);
    } else {
      const range = this.getCurrentOrStoredRange(element);
      if (!range || !range.collapsed) return null;
      const prefix = range.cloneRange();
      prefix.selectNodeContents(element);
      prefix.setEnd(range.endContainer, range.endOffset);
      before = prefix.toString();
    }

    const match = before.match(/(?:^|\s)(\/[^\s]+)$/);
    if (!match) return null;
    const shortcut = match[1].toLowerCase();
    const entry = this.shortcutMap.get(shortcut);
    if (!entry || entry.triggerKey !== triggerKey) return null;
    return { shortcut, snippet: entry };
  };

  TextExpressApp.prototype.expandShortcut = async function (entry, context) {
    if (!context || !entry) return;

    if (!entry.kind) {
      const content = await this.processVariables(entry.conteudo);
      if (content !== null) this.applyInsertionContext(context, content);
      return;
    }

    if (entry.kind === "flow") {
      this.applyInsertionContext(context, "");
      this.activeType = "atendimento";
      this.activeCategory = "Todos";
      this.selectedId = entry.snippet.id;
      this.openApp();
      this.render();
      this.showToast(`Sequência “${entry.snippet.nome}” aberta.`, "success");
      return;
    }

    if (entry.kind === "flow-step") {
      const content = await this.processFlowStep(entry.snippet, entry.step);
      if (content === null) return;
      if (this.applyInsertionContext(context, content)) {
        const state = this.getFlowState(entry.snippet);
        state.current = entry.stepIndex;
        state.used.add(entry.stepIndex);
        this.showToast(`${entry.step.atalho} expandido.`, "success");
        if (this.selectedId === entry.snippet.id) this.renderDetail(entry.snippet);
      } else {
        await this.copyText(content);
        this.showToast("Não foi possível inserir; a fala foi copiada.", "error");
      }
      return;
    }

    const content = await this.processVariables(entry.snippet.conteudo);
    if (content === null) return;
    if (this.applyInsertionContext(context, content)) {
      this.showToast(`Atalho ${entry.snippet.atalho} expandido.`, "success");
    } else {
      await this.copyText(content);
      this.showToast("Não foi possível inserir; o texto foi copiado.", "error");
    }
  };



  /* ==========================================================
   * Text Express 6.0 — painel em tela grande
   * Ordem dos controles: tema, minimizar, tela grande e fechar.
   * ========================================================== */
  const teV6Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    handleRootClick: TextExpressApp.prototype.handleRootClick,
    onGlobalKeyDown: TextExpressApp.prototype.onGlobalKeyDown,
    onDragStart: TextExpressApp.prototype.onDragStart,
    collapseToLauncher: TextExpressApp.prototype.collapseToLauncher
  });

  TextExpressApp.prototype.init = function () {
    this.isFullscreen = false;
    this.fullscreenRestoreStyle = null;
    return teV6Original.init.call(this);
  };

  TextExpressApp.prototype.updateFullscreenButton = function () {
    const button = this.root.querySelector('[data-te-action="fullscreen"]');
    if (!button) return;

    const use = button.querySelector("use");
    const expanded = Boolean(this.isFullscreen);

    if (use) {
      use.setAttribute("href", expanded ? "#te-i-minimize-2" : "#te-i-maximize-2");
    }

    button.setAttribute("aria-pressed", expanded ? "true" : "false");
    button.setAttribute(
      "aria-label",
      expanded ? "Voltar ao tamanho normal" : "Preencher toda a tela"
    );
    button.setAttribute(
      "title",
      expanded ? "Voltar ao tamanho normal (Esc)" : "Preencher toda a tela"
    );
  };

  TextExpressApp.prototype.enterFullscreen = function () {
    if (this.isFullscreen || this.panel.classList.contains("te-hidden")) return;

    this.fullscreenRestoreStyle = this.panel.hasAttribute("style")
      ? this.panel.getAttribute("style")
      : null;

    this.dragState = null;
    document.removeEventListener("pointermove", this.onDragMove, true);
    document.removeEventListener("pointerup", this.onDragEnd, true);

    this.panel.classList.add("te-fullscreen");
    this.isFullscreen = true;
    this.updateFullscreenButton();

    window.requestAnimationFrame(() => {
      this.searchInput?.focus({ preventScroll: true });
    });
  };

  TextExpressApp.prototype.exitFullscreen = function () {
    if (!this.isFullscreen) return;

    this.panel.classList.remove("te-fullscreen");

    if (this.fullscreenRestoreStyle === null) {
      this.panel.removeAttribute("style");
    } else {
      this.panel.setAttribute("style", this.fullscreenRestoreStyle);
    }

    this.fullscreenRestoreStyle = null;
    this.isFullscreen = false;
    this.updateFullscreenButton();

    window.requestAnimationFrame(() => {
      this.constrainPanel();
    });
  };

  TextExpressApp.prototype.toggleFullscreen = function () {
    if (this.isFullscreen) this.exitFullscreen();
    else this.enterFullscreen();
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    const actionButton = event.target.closest('[data-te-action="fullscreen"]');
    if (actionButton) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleFullscreen();
      return;
    }

    return teV6Original.handleRootClick.call(this, event);
  };

  TextExpressApp.prototype.onGlobalKeyDown = function (event) {
    if (
      event.key === "Escape"
      && this.isFullscreen
      && this.variableModal.classList.contains("te-hidden")
      && this.snippetModal.classList.contains("te-hidden")
      && this.settingsModal.classList.contains("te-hidden")
      && this.categoryModal.classList.contains("te-hidden")
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.exitFullscreen();
      return;
    }

    return teV6Original.onGlobalKeyDown.call(this, event);
  };

  TextExpressApp.prototype.onDragStart = function (event) {
    if (this.isFullscreen) return;
    return teV6Original.onDragStart.call(this, event);
  };

  TextExpressApp.prototype.collapseToLauncher = function () {
    if (this.isFullscreen) this.exitFullscreen();
    return teV6Original.collapseToLauncher.call(this);
  };



  /* ==========================================================
   * Text Express 7.0
   * - Memoriza [atendente] após o primeiro preenchimento.
   * - Salva automaticamente alterações de modelos existentes.
   * - Verifica a gravação no armazenamento.
   * - Sincroniza scripts entre abas do mesmo sistema/origem.
   * ========================================================== */
  const TE_V7_SYNC_CHANNEL = "text-express-model-sync-v1";
  const TE_V7_AUTOSAVE_DELAY = 650;

  const teV7Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    normalizeSnippet: TextExpressApp.prototype.normalizeSnippet,
    loadSnippets: TextExpressApp.prototype.loadSnippets,
    openModal: TextExpressApp.prototype.openModal,
    closeModal: TextExpressApp.prototype.closeModal,
    openSettings: TextExpressApp.prototype.openSettings,
    submitSettings: TextExpressApp.prototype.submitSettings,
    handleRootClick: TextExpressApp.prototype.handleRootClick,
    processFlowStep: TextExpressApp.prototype.processFlowStep
  });

  TextExpressApp.prototype.normalizeVariableStorageKey = function (name) {
    return String(name || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  };

  TextExpressApp.prototype.getPersistentVariableKey = function (name) {
    const normalized = this.normalizeVariableStorageKey(name);
    const aliases = new Set([
      "atendente",
      "nome atendente",
      "nome do atendente",
      "operador",
      "nome operador",
      "nome do operador",
      "agente",
      "nome agente",
      "nome do agente"
    ]);
    return aliases.has(normalized) ? "atendente" : null;
  };

  TextExpressApp.prototype.loadRememberedVariables = function () {
    this.rememberedVariables = {};
    const saved = this.storageGet(STORAGE_KEYS.rememberedVariables);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return;
      for (const [key, value] of Object.entries(parsed)) {
        const clean = String(value ?? "").trim();
        if (clean) this.rememberedVariables[key] = clean;
      }
    } catch {
      this.rememberedVariables = {};
    }
  };

  TextExpressApp.prototype.saveRememberedVariables = function () {
    const saved = this.storageSet(
      STORAGE_KEYS.rememberedVariables,
      JSON.stringify(this.rememberedVariables || {})
    );

    if (saved && this.syncChannel) {
      try {
        this.syncChannel.postMessage({
          type: "remembered-variables",
          values: this.rememberedVariables
        });
      } catch {}
    }
    return saved;
  };

  TextExpressApp.prototype.getRememberedVariableValue = function (name) {
    const key = this.getPersistentVariableKey(name);
    if (!key) return "";
    return String(this.rememberedVariables?.[key] || "").trim();
  };

  TextExpressApp.prototype.rememberVariableValue = function (name, value) {
    const key = this.getPersistentVariableKey(name);
    const clean = String(value ?? "").trim();
    if (!key || !clean) return false;
    this.rememberedVariables[key] = clean;
    this.saveRememberedVariables();
    return true;
  };

  TextExpressApp.prototype.clearRememberedAttendant = function () {
    if (!this.rememberedVariables) this.rememberedVariables = {};
    delete this.rememberedVariables.atendente;
    this.saveRememberedVariables();
    const field = this.root.querySelector("#te-setting-attendant-name");
    if (field) field.value = "";
    this.showToast("Nome do atendente removido.", "success");
  };

  TextExpressApp.prototype.replaceVariablesWithValues = function (content, values) {
    let result = String(content || "");
    for (const [variable, value] of Object.entries(values || {})) {
      const pattern = new RegExp(`\\[${this.escapeRegExp(variable)}\\]`, "g");
      result = result.replace(pattern, value ?? "");
    }
    return result;
  };

  TextExpressApp.prototype.processVariables = async function (content) {
    const variables = this.extractVariables(content);
    if (!variables.length) return content;

    const values = {};
    const missing = [];

    for (const variable of variables) {
      const remembered = this.getRememberedVariableValue(variable);
      if (remembered) values[variable] = remembered;
      else missing.push(variable);
    }

    if (missing.length) {
      const supplied = await this.requestVariableValues(missing);
      if (!supplied) return null;

      for (const [variable, value] of Object.entries(supplied)) {
        values[variable] = value;
        this.rememberVariableValue(variable, value);
      }
    }

    return this.replaceVariablesWithValues(content, values);
  };

  TextExpressApp.prototype.submitVariables = function (event) {
    event.preventDefault();
    const values = {};
    this.variableFields.querySelectorAll("[data-te-variable-name]").forEach((input) => {
      const name = input.dataset.teVariableName;
      const value = input.value;
      values[name] = value;
      this.rememberVariableValue(name, value);
    });
    this.finishVariablePrompt(values);
  };

  TextExpressApp.prototype.processFlowStep = async function (flow, step) {
    const variables = this.extractVariables(step.conteudo);
    if (!variables.length) return step.conteudo;

    const flowValues = this.getFlowValues(flow.id);
    const values = {};
    const missing = [];

    for (const variable of variables) {
      const remembered = this.getRememberedVariableValue(variable);
      const currentFlowValue = String(flowValues[variable] ?? "").trim();

      if (remembered) {
        values[variable] = remembered;
        flowValues[variable] = remembered;
      } else if (currentFlowValue) {
        values[variable] = currentFlowValue;
      } else {
        missing.push(variable);
      }
    }

    if (missing.length) {
      const supplied = await this.requestVariableValues(missing);
      if (!supplied) return null;

      for (const [variable, value] of Object.entries(supplied)) {
        flowValues[variable] = value;
        values[variable] = value;
        this.rememberVariableValue(variable, value);
      }
    }

    return this.replaceVariablesWithValues(step.conteudo, values);
  };

  TextExpressApp.prototype.normalizeSnippet = function (raw = {}) {
    const snippet = teV7Original.normalizeSnippet.call(this, raw);
    snippet.updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : "";
    snippet.revision = Number.isFinite(Number(raw.revision)) ? Number(raw.revision) : 0;
    return snippet;
  };

  TextExpressApp.prototype.createSyncRevision = function () {
    this.localRevisionCounter = (this.localRevisionCounter || 0) + 1;
    return Date.now() * 1000 + (this.localRevisionCounter % 1000);
  };

  TextExpressApp.prototype.readPayloadRevision = function (payload) {
    const direct = Number(payload?.revision);
    if (Number.isFinite(direct) && direct > 0) return direct;
    const date = Date.parse(payload?.updatedAt || "");
    return Number.isFinite(date) ? date : 0;
  };

  TextExpressApp.prototype.saveSnippets = function () {
    const payload = {
      app: "Text Express",
      schemaVersion: 7,
      appVersion: APP_VERSION,
      updatedAt: new Date().toISOString(),
      revision: this.createSyncRevision(),
      snippets: this.snippets
    };

    const serialized = JSON.stringify(payload);
    const written = this.storageSet(STORAGE_KEYS.snippets, serialized);
    let verified = false;

    if (written) {
      try {
        const check = JSON.parse(this.storageGet(STORAGE_KEYS.snippets) || "{}");
        verified = Number(check.revision) === Number(payload.revision);
      } catch {
        verified = false;
      }
    }

    this.rebuildShortcutMap();

    if (!verified) {
      this.showToast(
        "Não foi possível confirmar o salvamento. Verifique se o navegador permite armazenamento local.",
        "error",
        6500
      );
      return false;
    }

    this.lastSnippetsRevision = payload.revision;

    if (!this.isApplyingExternalSync && this.syncChannel) {
      try {
        this.syncChannel.postMessage({
          type: "snippets",
          payload: serialized
        });
      } catch {}
    }

    return true;
  };

  TextExpressApp.prototype.loadSnippets = function () {
    teV7Original.loadSnippets.call(this);
    try {
      const payload = JSON.parse(this.storageGet(STORAGE_KEYS.snippets) || "{}");
      this.lastSnippetsRevision = this.readPayloadRevision(payload);
    } catch {
      this.lastSnippetsRevision = 0;
    }
  };

  TextExpressApp.prototype.applyExternalSnippetPayload = function (rawPayload) {
    if (!rawPayload) return false;

    try {
      const payload = typeof rawPayload === "string"
        ? JSON.parse(rawPayload)
        : rawPayload;
      const source = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.snippets)
          ? payload.snippets
          : null;

      if (!source) return false;

      const revision = this.readPayloadRevision(payload);
      if (revision && revision <= Number(this.lastSnippetsRevision || 0)) return false;

      const normalized = this.normalizeCollection(source);
      if (!normalized.length) return false;

      this.isApplyingExternalSync = true;
      this.snippets = normalized;
      this.lastSnippetsRevision = revision || Date.now();

      if (this.selectedId && !this.snippets.some((item) => item.id === this.selectedId)) {
        this.selectedId = null;
      }

      this.rebuildShortcutMap();
      this.render();
      this.isApplyingExternalSync = false;
      return true;
    } catch {
      this.isApplyingExternalSync = false;
      return false;
    }
  };

  TextExpressApp.prototype.setupSnippetSync = function () {
    if (typeof BroadcastChannel === "function") {
      try {
        this.syncChannel = new BroadcastChannel(TE_V7_SYNC_CHANNEL);
        this.syncChannel.addEventListener("message", (event) => {
          const data = event.data || {};
          if (data.type === "snippets" && this.applyExternalSnippetPayload(data.payload)) {
            this.showToast("Scripts sincronizados com outra aba.", "success", 2600);
          } else if (data.type === "remembered-variables" && data.values) {
            this.rememberedVariables = { ...data.values };
          }
        });
      } catch {
        this.syncChannel = null;
      }
    }

    window.addEventListener("storage", (event) => {
      if (event.storageArea !== window.localStorage) return;

      if (event.key === STORAGE_KEYS.snippets && event.newValue) {
        if (this.applyExternalSnippetPayload(event.newValue)) {
          this.showToast("Alterações dos scripts sincronizadas.", "success", 2600);
        }
      }

      if (event.key === STORAGE_KEYS.rememberedVariables) {
        this.loadRememberedVariables();
      }
    });
  };

  TextExpressApp.prototype.setModelSaveStatus = function (message, state = "") {
    const status = this.root.querySelector("#te-model-save-status");
    if (!status) return;
    status.textContent = message || "";
    status.classList.remove("te-saving", "te-saved", "te-save-error");
    if (state) status.classList.add(state);
  };

  TextExpressApp.prototype.formatAutosaveTime = function () {
    try {
      return new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date());
    } catch {
      return "";
    }
  };

  TextExpressApp.prototype.collectSnippetFromForm = function (showErrors = false) {
    if (showErrors) this.clearFormErrors();
    const flowError = this.root.querySelector("#te-flow-error");
    if (showErrors && flowError) flowError.textContent = "";

    const id = this.root.querySelector("#te-form-id").value;
    const tipo = this.root.querySelector('input[name="te-type"]:checked')?.value || "atendimento";
    const modelo = tipo === "atendimento"
      ? this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico"
      : "unico";
    const nome = this.root.querySelector("#te-form-name").value.trim();
    const atalho = this.normalizeShortcut(this.root.querySelector("#te-form-shortcut").value);
    const triggerKey = this.root.querySelector("#te-form-trigger").value;
    const categoriaId = this.root.querySelector("#te-form-category").value;
    const category = this.getCategoryById(categoriaId) || this.resolveCategory(null, "Outros", tipo);
    const favorito = this.root.querySelector("#te-form-favorite").checked;
    const owners = this.getAllShortcutOwners(id);
    const errors = [];

    if (!nome) {
      errors.push("Informe um nome para o modelo.");
      if (showErrors) this.setFormError("name", "Informe um nome para o modelo.");
    }

    if (owners.has(atalho)) {
      const message = `Esse atalho já pertence a “${owners.get(atalho)}”.`;
      errors.push(message);
      if (showErrors) this.setFormError("shortcut", message);
    }

    let conteudo = "";
    let etapas = [];

    if (modelo === "fluxo") {
      etapas = this.syncEditingFlowSteps();

      if (etapas.length < 2) {
        errors.push("Uma sequência precisa ter pelo menos duas falas.");
      }

      const localShortcuts = new Set([atalho]);

      for (let index = 0; index < etapas.length; index += 1) {
        const step = etapas[index];

        if (!step.nome || !step.conteudo) {
          errors.push(`Preencha o nome e o texto da fala ${index + 1}.`);
          break;
        }

        step.atalho = this.normalizeShortcut(step.atalho);

        if (localShortcuts.has(step.atalho)) {
          errors.push(`O atalho ${step.atalho} está repetido dentro da sequência.`);
          break;
        }

        if (owners.has(step.atalho)) {
          errors.push(`O atalho ${step.atalho} já pertence a “${owners.get(step.atalho)}”.`);
          break;
        }

        localShortcuts.add(step.atalho);
      }

      conteudo = etapas.map((step) => step.conteudo).join("\n\n");

      if (showErrors && flowError && errors.length) {
        flowError.textContent = errors[errors.length - 1];
      }
    } else {
      conteudo = this.root.querySelector("#te-form-content").value.trim();

      if (!conteudo) {
        errors.push("Informe o conteúdo que será inserido.");
        if (showErrors) this.setFormError("content", "Informe o conteúdo que será inserido.");
      }
    }

    if (errors.length) {
      return {
        valid: false,
        errors,
        id,
        tipo,
        modelo
      };
    }

    const existingIndex = id
      ? this.snippets.findIndex((item) => item.id === id)
      : -1;
    const base = existingIndex >= 0 ? this.snippets[existingIndex] : {};
    const now = new Date().toISOString();

    const snippet = this.normalizeSnippet({
      ...base,
      id: existingIndex >= 0 ? id : this.generateId(tipo),
      tipo,
      modelo,
      nome,
      atalho,
      triggerKey,
      categoriaId: category.id,
      categoria: category.nome,
      conteudo,
      etapas,
      favorito,
      ativo: true,
      origem: existingIndex >= 0 ? base.origem : "Criado pelo usuário",
      updatedAt: now,
      revision: Number(base.revision || 0) + 1
    });

    snippet.updatedAt = now;
    snippet.revision = Number(base.revision || 0) + 1;

    return {
      valid: true,
      id,
      tipo,
      modelo,
      existingIndex,
      snippet
    };
  };

  TextExpressApp.prototype.applyCollectedSnippet = function (collected) {
    if (!collected?.valid) return false;

    if (collected.existingIndex >= 0) {
      this.snippets.splice(collected.existingIndex, 1, collected.snippet);
    } else {
      this.snippets.unshift(collected.snippet);
      collected.existingIndex = 0;
    }

    return this.saveSnippets();
  };

  TextExpressApp.prototype.autosaveCurrentModel = function (silent = false) {
    if (this.snippetModal.classList.contains("te-hidden")) return false;

    const id = this.root.querySelector("#te-form-id").value;
    if (!id) {
      if (!silent) {
        this.setModelSaveStatus(
          "Novo modelo: use “Salvar e concluir” para criar.",
          ""
        );
      }
      return false;
    }

    const collected = this.collectSnippetFromForm(false);

    if (!collected.valid || collected.existingIndex < 0) {
      if (!silent) {
        this.setModelSaveStatus(
          "Alterações pendentes: complete os campos obrigatórios.",
          "te-save-error"
        );
      }
      return false;
    }

    const saved = this.applyCollectedSnippet(collected);

    if (!saved) {
      this.setModelSaveStatus(
        "Não foi possível salvar automaticamente.",
        "te-save-error"
      );
      return false;
    }

    this.selectedId = collected.snippet.id;
    this.render();

    if (!silent) {
      const time = this.formatAutosaveTime();
      this.setModelSaveStatus(
        `Salvo automaticamente${time ? ` às ${time}` : ""}.`,
        "te-saved"
      );
    }

    return true;
  };

  TextExpressApp.prototype.scheduleModelAutosave = function () {
    if (this.snippetModal.classList.contains("te-hidden")) return;

    const id = this.root.querySelector("#te-form-id").value;

    if (!id) {
      this.setModelSaveStatus(
        "Novo modelo: use “Salvar e concluir” para criar.",
        ""
      );
      return;
    }

    this.setModelSaveStatus("Salvando alterações…", "te-saving");
    window.clearTimeout(this.modelAutosaveTimer);
    this.modelAutosaveTimer = window.setTimeout(() => {
      this.autosaveCurrentModel(false);
    }, TE_V7_AUTOSAVE_DELAY);
  };

  TextExpressApp.prototype.setupModelAutosave = function () {
    const schedule = (event) => {
      if (!event.target.closest("#te-snippet-form")) return;
      this.scheduleModelAutosave();
    };

    this.snippetForm.addEventListener("input", schedule);
    this.snippetForm.addEventListener("change", schedule);
  };

  TextExpressApp.prototype.saveSnippet = function (event) {
    event.preventDefault();
    window.clearTimeout(this.modelAutosaveTimer);

    const collected = this.collectSnippetFromForm(true);
    if (!collected.valid) {
      this.setModelSaveStatus(
        "Existem campos que precisam ser corrigidos.",
        "te-save-error"
      );
      return;
    }

    const saved = this.applyCollectedSnippet(collected);

    if (!saved) {
      this.setModelSaveStatus(
        "O navegador não confirmou o salvamento.",
        "te-save-error"
      );
      return;
    }

    this.activeType = collected.tipo;
    this.activeCategory = "Todos";
    this.selectedId = collected.snippet.id;
    this.suppressAutosaveOnClose = true;
    this.closeModal();
    this.suppressAutosaveOnClose = false;
    this.render();

    this.showToast(
      collected.existingIndex >= 0
        ? collected.modelo === "fluxo"
          ? "Sequência salva e sincronizada."
          : "Modelo salvo e sincronizado."
        : collected.modelo === "fluxo"
          ? "Sequência criada."
          : "Modelo criado.",
      "success"
    );
  };

  TextExpressApp.prototype.openModal = function (data = null) {
    teV7Original.openModal.call(this, data);
    window.clearTimeout(this.modelAutosaveTimer);

    if (data) {
      this.setModelSaveStatus(
        "Alterações neste modelo são salvas automaticamente.",
        ""
      );
    } else {
      this.setModelSaveStatus(
        "Novo modelo: preencha os campos e salve para criar.",
        ""
      );
    }
  };

  TextExpressApp.prototype.closeModal = function () {
    window.clearTimeout(this.modelAutosaveTimer);

    if (
      !this.suppressAutosaveOnClose
      && this.editingId
      && !this.snippetModal.classList.contains("te-hidden")
    ) {
      this.autosaveCurrentModel(true);
    }

    this.setModelSaveStatus("");
    return teV7Original.closeModal.call(this);
  };

  TextExpressApp.prototype.openSettings = function () {
    teV7Original.openSettings.call(this);
    const field = this.root.querySelector("#te-setting-attendant-name");
    if (field) field.value = this.getRememberedVariableValue("atendente");
  };

  TextExpressApp.prototype.submitSettings = function (event) {
    const field = this.root.querySelector("#te-setting-attendant-name");
    const attendant = String(field?.value || "").trim();

    if (attendant) {
      this.rememberedVariables.atendente = attendant;
    } else {
      delete this.rememberedVariables.atendente;
    }

    this.saveRememberedVariables();
    return teV7Original.submitSettings.call(this, event);
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    const clearButton = event.target.closest('[data-te-action="clear-attendant"]');

    if (clearButton) {
      event.preventDefault();
      event.stopPropagation();
      this.clearRememberedAttendant();
      return;
    }

    return teV7Original.handleRootClick.call(this, event);
  };

  TextExpressApp.prototype.init = function () {
    this.rememberedVariables = {};
    this.modelAutosaveTimer = null;
    this.syncChannel = null;
    this.lastSnippetsRevision = 0;
    this.localRevisionCounter = 0;
    this.isApplyingExternalSync = false;
    this.suppressAutosaveOnClose = false;

    const result = teV7Original.init.call(this);

    this.loadRememberedVariables();
    this.setupModelAutosave();
    this.setupSnippetSync();

    return result;
  };



  /* ==========================================================
   * Text Express 8.0 — legibilidade completa em tela cheia
   * ========================================================== */
  const teV8Original = Object.freeze({
    enterFullscreen: TextExpressApp.prototype.enterFullscreen,
    exitFullscreen: TextExpressApp.prototype.exitFullscreen
  });

  TextExpressApp.prototype.enterFullscreen = function () {
    const result = teV8Original.enterFullscreen.call(this);
    this.root.classList.add("te-fullscreen-active");
    return result;
  };

  TextExpressApp.prototype.exitFullscreen = function () {
    const result = teV8Original.exitFullscreen.call(this);
    this.root.classList.remove("te-fullscreen-active");
    return result;
  };



  /* ==========================================================
   * Text Express 9.0 — faixa de categorias arrastável
   * ========================================================== */
  const teV9Original = Object.freeze({
    init: TextExpressApp.prototype.init
  });

  TextExpressApp.prototype.updateCategoryDragState = function () {
    const bar = this.categoryBar;
    if (!bar) return;

    const canDrag = bar.scrollWidth > bar.clientWidth + 2;
    bar.classList.toggle("te-can-drag", canDrag);
    bar.setAttribute(
      "aria-roledescription",
      canDrag ? "lista horizontal arrastável" : "lista de categorias"
    );
  };

  TextExpressApp.prototype.setupCategoryDragScroll = function () {
    const bar = this.categoryBar;
    if (!bar || bar.dataset.teDragScrollReady === "true") return;

    bar.dataset.teDragScrollReady = "true";

    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let dragging = false;
    let suppressNextClick = false;
    const DRAG_THRESHOLD = 6;

    const resetPointer = () => {
      bar.classList.remove("te-dragging");
      pointerId = null;
      dragging = false;
    };

    const finishDrag = (event) => {
      if (pointerId === null || event.pointerId !== pointerId) return;

      if (dragging) {
        try {
          if (bar.hasPointerCapture(pointerId)) {
            bar.releasePointerCapture(pointerId);
          }
        } catch {}

        suppressNextClick = true;
        window.setTimeout(() => {
          suppressNextClick = false;
        }, 180);
      }

      resetPointer();
    };

    bar.addEventListener("pointerdown", (event) => {
      if (!bar.classList.contains("te-can-drag")) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startScrollLeft = bar.scrollLeft;
      dragging = false;

      /*
       * A captura não ocorre no clique inicial.
       * Assim, o botão da categoria e o lápis recebem cliques normais.
       */
    });

    bar.addEventListener("pointermove", (event) => {
      if (pointerId === null || event.pointerId !== pointerId) return;

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      if (!dragging) {
        const horizontalIntent =
          Math.abs(deltaX) >= DRAG_THRESHOLD &&
          Math.abs(deltaX) > Math.abs(deltaY);

        if (!horizontalIntent) return;

        dragging = true;
        bar.classList.add("te-dragging");

        try {
          bar.setPointerCapture(pointerId);
        } catch {}
      }

      event.preventDefault();
      bar.scrollLeft = startScrollLeft - deltaX;
      this.rememberCategoryScrollPosition?.();
    });

    bar.addEventListener("pointerup", finishDrag);
    bar.addEventListener("pointercancel", finishDrag);

    bar.addEventListener("lostpointercapture", (event) => {
      if (pointerId !== null && event.pointerId === pointerId && dragging) {
        resetPointer();
      }
    });

    bar.addEventListener(
      "click",
      (event) => {
        if (!suppressNextClick) return;
        suppressNextClick = false;
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      true
    );

    bar.addEventListener(
      "wheel",
      (event) => {
        if (!bar.classList.contains("te-can-drag")) return;
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
        if (!event.deltaY) return;

        const before = bar.scrollLeft;
        bar.scrollLeft += event.deltaY;

        if (bar.scrollLeft !== before) {
          this.rememberCategoryScrollPosition?.();
          event.preventDefault();
        }
      },
      { passive: false }
    );

    bar.addEventListener("scroll", () => {
      this.rememberCategoryScrollPosition?.();
    }, { passive: true });

    bar.addEventListener("keydown", (event) => {
      if (!bar.classList.contains("te-can-drag")) return;
      const step = Math.max(120, Math.round(bar.clientWidth * 0.28));

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        bar.scrollBy({ left: -step, behavior: "smooth" });
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        bar.scrollBy({ left: step, behavior: "smooth" });
      } else if (event.key === "Home") {
        event.preventDefault();
        bar.scrollTo({ left: 0, behavior: "smooth" });
      } else if (event.key === "End") {
        event.preventDefault();
        bar.scrollTo({ left: bar.scrollWidth, behavior: "smooth" });
      }
    });

    if (typeof ResizeObserver === "function") {
      this.categoryDragResizeObserver = new ResizeObserver(() => {
        this.updateCategoryDragState();
        this.restoreCategoryScrollPosition?.();
      });
      this.categoryDragResizeObserver.observe(bar);
    }

    if (typeof MutationObserver === "function") {
      this.categoryDragMutationObserver = new MutationObserver(() => {
        window.requestAnimationFrame(() => {
          this.updateCategoryDragState();
          this.restoreCategoryScrollPosition?.();
        });
      });
      this.categoryDragMutationObserver.observe(bar, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    window.addEventListener("resize", () => {
      this.updateCategoryDragState();
      this.restoreCategoryScrollPosition?.();
    });

    window.requestAnimationFrame(() => {
      this.updateCategoryDragState();
      this.restoreCategoryScrollPosition?.();
    });
  };

  TextExpressApp.prototype.init = function () {
    const result = teV9Original.init.call(this);
    this.setupCategoryDragScroll();
    return result;
  };



  /* ==========================================================
   * Text Express 10.0 — tópicos de Protocolo interativos
   * ========================================================== */
  const teV10Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    renderCategories: TextExpressApp.prototype.renderCategories,
    handleRootClick: TextExpressApp.prototype.handleRootClick
  });

  TextExpressApp.prototype.getCategoryScrollKey = function () {
    return ["atendimento", "protocolo", "favoritos"].includes(this.activeType)
      ? this.activeType
      : "atendimento";
  };

  TextExpressApp.prototype.rememberCategoryScrollPosition = function () {
    if (!this.categoryBar) return;
    if (!this.categoryScrollPositions) {
      this.categoryScrollPositions = {
        atendimento: 0,
        protocolo: 0,
        favoritos: 0
      };
    }

    this.categoryScrollPositions[this.getCategoryScrollKey()] =
      Math.max(0, Number(this.categoryBar.scrollLeft) || 0);
  };

  TextExpressApp.prototype.restoreCategoryScrollPosition = function () {
    if (!this.categoryBar || !this.categoryScrollPositions) return;

    const desired =
      Number(this.categoryScrollPositions[this.getCategoryScrollKey()]) || 0;
    const maximum = Math.max(
      0,
      this.categoryBar.scrollWidth - this.categoryBar.clientWidth
    );

    this.categoryBar.scrollLeft = Math.min(desired, maximum);
  };

  TextExpressApp.prototype.renderCategories = function () {
    this.rememberCategoryScrollPosition();
    const result = teV10Original.renderCategories.call(this);

    window.requestAnimationFrame(() => {
      this.updateCategoryDragState?.();
      this.restoreCategoryScrollPosition();

      const activeButton = this.categoryBar?.querySelector(
        ".te-category-chip.te-active .te-category-button"
      );

      if (activeButton && this.activeCategory !== "Todos") {
        const barRect = this.categoryBar.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        if (buttonRect.left < barRect.left || buttonRect.right > barRect.right) {
          activeButton.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest"
          });
        }
      }
    });

    return result;
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    const editButton = event.target.closest(
      "#te-category-bar [data-te-action='category-edit']"
    );

    if (editButton) {
      event.preventDefault();
      event.stopPropagation();

      const category = this.getCategoryById(editButton.dataset.teCategoryId);
      if (category) {
        this.openCategoryModal(category);
      } else {
        this.showToast("Categoria não localizada.", "error");
      }
      return;
    }

    const categoryButton = event.target.closest(
      "#te-category-bar [data-te-category]"
    );

    if (categoryButton) {
      event.preventDefault();
      event.stopPropagation();

      this.rememberCategoryScrollPosition();
      this.activeCategory = categoryButton.dataset.teCategory || "Todos";
      this.selectedId = null;
      this.renderCategories();
      this.renderSnippets();
      return;
    }

    return teV10Original.handleRootClick.call(this, event);
  };

  TextExpressApp.prototype.init = function () {
    this.categoryScrollPositions = {
      atendimento: 0,
      protocolo: 0,
      favoritos: 0
    };
    return teV10Original.init.call(this);
  };



  /* ==========================================================
   * Text Express 15.0
   * - Posição numérica simples em Atendimento e Protocolo.
   * - Sem arrastar e sem botões duplos.
   * - Recuperação automática de categorias ausentes/colapsadas.
   * ========================================================== */
  const teV15Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    loadCategories: TextExpressApp.prototype.loadCategories,
    loadSnippets: TextExpressApp.prototype.loadSnippets,
    renderCard: TextExpressApp.prototype.renderCard,
    handleRootClick: TextExpressApp.prototype.handleRootClick
  });

  TextExpressApp.prototype.normalizeV15CategoryName = function (value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  TextExpressApp.prototype.getDefaultCategoryDefinition = function (
    tipo,
    nameOrId
  ) {
    const normalized = this.normalizeV15CategoryName(nameOrId);

    return DEFAULT_CATEGORIES.find((category) => {
      return category.tipo === tipo &&
        (
          category.id === nameOrId ||
          this.normalizeV15CategoryName(category.nome) === normalized
        );
    }) || null;
  };

  TextExpressApp.prototype.loadCategories = function () {
    teV15Original.loadCategories.call(this);

    let changed = false;
    const byId = new Map(this.categories.map((category) => [category.id, category]));

    /*
     * Recoloca toda categoria padrão ausente, mas mantém:
     * - categorias criadas pelo usuário;
     * - nomes, ícones e cores editados em categorias ainda existentes.
     */
    for (const rawDefault of DEFAULT_CATEGORIES) {
      if (byId.has(rawDefault.id)) continue;

      const sameName = this.categories.find((category) => {
        return category.tipo === rawDefault.tipo &&
          this.normalizeV15CategoryName(category.nome) ===
            this.normalizeV15CategoryName(rawDefault.nome);
      });

      if (sameName) {
        /*
         * Se a mesma categoria existe com outro ID, adota o ID estável
         * e preserva a personalização visual.
         */
        const oldId = sameName.id;
        sameName.id = rawDefault.id;
        sameName.padrao = true;

        if (!this.v15CategoryIdRemap) this.v15CategoryIdRemap = new Map();
        this.v15CategoryIdRemap.set(oldId, rawDefault.id);

        byId.set(rawDefault.id, sameName);
        changed = true;
        continue;
      }

      const restored = this.normalizeCategory(rawDefault);
      this.categories.push(restored);
      byId.set(restored.id, restored);
      changed = true;
    }

    this.sortCategories();

    if (changed) {
      this.saveCategories();
      this.v15CategoriesRestored = true;
    }
  };

  TextExpressApp.prototype.getExpectedDefaultCategory = function (
    defaultSnippet
  ) {
    if (!defaultSnippet) return null;

    return this.getDefaultCategoryDefinition(
      defaultSnippet.tipo === "protocolo" ? "protocolo" : "atendimento",
      defaultSnippet.categoriaId ||
        defaultSnippet.categoryId ||
        defaultSnippet.categoria ||
        defaultSnippet.category
    );
  };

  TextExpressApp.prototype.repairCollapsedDefaultCategories = function () {
    const defaultsById = new Map(
      DEFAULT_SNIPPETS.map((snippet) => [snippet.id, snippet])
    );

    let changed = false;

    for (const tipo of ["atendimento", "protocolo"]) {
      const matched = this.snippets.filter((snippet) => {
        const original = defaultsById.get(snippet.id);
        return original && original.tipo === tipo;
      });

      if (matched.length < 10) continue;

      const expectedIds = new Set();
      const currentCounts = new Map();
      let mismatchCount = 0;

      for (const snippet of matched) {
        const original = defaultsById.get(snippet.id);
        const expected = this.getExpectedDefaultCategory(original);

        if (!expected) continue;

        expectedIds.add(expected.id);
        currentCounts.set(
          snippet.categoriaId,
          (currentCounts.get(snippet.categoriaId) || 0) + 1
        );

        if (snippet.categoriaId !== expected.id) mismatchCount += 1;
      }

      const dominant = [...currentCounts.entries()]
        .sort((a, b) => b[1] - a[1])[0] || [null, 0];

      const dominantRatio = matched.length
        ? dominant[1] / matched.length
        : 0;

      /*
       * Só faz reparação ampla quando há sinais claros de colapso:
       * - a base original esperava várias categorias;
       * - mais de 70% foi parar em uma única categoria;
       * - quantidade relevante está fora da categoria esperada.
       */
      const collapsed =
        expectedIds.size >= 3 &&
        dominantRatio >= 0.70 &&
        mismatchCount >= Math.max(10, Math.floor(matched.length * 0.28));

      for (const snippet of matched) {
        const original = defaultsById.get(snippet.id);
        const expected = this.getExpectedDefaultCategory(original);

        if (!expected) continue;

        const categoryExists = this.categories.some(
          (category) => category.id === snippet.categoriaId
        );

        const remappedId = this.v15CategoryIdRemap?.get(snippet.categoriaId);

        if (remappedId) {
          snippet.categoriaId = remappedId;
          const remapped = this.getCategoryById(remappedId);
          if (remapped) snippet.categoria = remapped.nome;
          changed = true;
          continue;
        }

        if (!categoryExists || collapsed) {
          if (
            snippet.categoriaId !== expected.id ||
            snippet.categoria !== expected.nome
          ) {
            snippet.categoriaId = expected.id;
            snippet.categoria = expected.nome;
            changed = true;
          }
        }
      }
    }

    /*
     * Modelos personalizados com uma categoria removida são enviados
     * somente para "Outros" do tipo correto; não são apagados.
     */
    for (const snippet of this.snippets) {
      const exists = this.categories.some(
        (category) =>
          category.id === snippet.categoriaId &&
          category.tipo === snippet.tipo
      );

      if (exists) continue;

      const fallback =
        this.findCategoryByName("Outros", snippet.tipo) ||
        this.getCategoriesForType(snippet.tipo)[0];

      if (fallback) {
        snippet.categoriaId = fallback.id;
        snippet.categoria = fallback.nome;
        changed = true;
      }
    }

    if (changed) {
      this.saveSnippets();
      this.v15SnippetCategoriesRestored = true;
    }
  };

  TextExpressApp.prototype.loadSnippets = function () {
    teV15Original.loadSnippets.call(this);
    this.repairCollapsedDefaultCategories();
  };

  TextExpressApp.prototype.canChooseNumericPosition = function () {
    return this.activeType === "atendimento" ||
      this.activeType === "protocolo";
  };

  TextExpressApp.prototype.getCurrentVisiblePosition = function (snippetId) {
    const items = this.getFilteredSnippets();
    const index = items.findIndex((item) => item.id === snippetId);

    return {
      items,
      index,
      position: index >= 0 ? index + 1 : 0,
      total: items.length
    };
  };

  TextExpressApp.prototype.getPositionButtonMarkup = function (snippet) {
    if (!this.canChooseNumericPosition()) return "";

    const state = this.getCurrentVisiblePosition(snippet.id);
    if (state.index < 0) return "";

    return `
      <button
        class="te-position-button"
        type="button"
        data-te-action="model-position-open"
        data-te-id="${this.escapeAttr(snippet.id)}"
        title="Escolher posição do modelo"
        aria-label="Escolher posição de ${this.escapeAttr(snippet.nome)}. Posição atual ${state.position} de ${state.total}">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <path d="m8 7 4-4 4 4"></path>
          <path d="M12 3v18"></path>
          <path d="m8 17 4 4 4-4"></path>
        </svg>
        <span class="te-position-current">${state.position}</span>
      </button>`;
  };

  TextExpressApp.prototype.renderCard = function (snippet) {
    let html = teV15Original.renderCard.call(this, snippet);
    const positionButton = this.getPositionButtonMarkup(snippet);

    if (!positionButton) return html;

    const editPattern =
      /(<button class="te-icon-action" type="button" data-te-action="edit")/;

    if (editPattern.test(html)) {
      return html.replace(editPattern, `${positionButton}$1`);
    }

    const textEditPattern =
      /(<button class="te-text-button" type="button" data-te-action="edit")/;

    if (textEditPattern.test(html)) {
      return html.replace(textEditPattern, `${positionButton}$1`);
    }

    return html.replace("</article>", `${positionButton}</article>`);
  };

  TextExpressApp.prototype.ensurePositionPopover = function () {
    if (this.positionPopover) return;

    const popover = document.createElement("div");
    popover.className = "te-position-popover te-hidden";
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-modal", "false");
    popover.setAttribute("aria-label", "Escolher posição do modelo");

    popover.innerHTML = `
      <form class="te-position-form">
        <div class="te-position-popover-header">
          <strong>Mover para a posição</strong>
          <button
            class="te-position-close"
            type="button"
            data-te-position-close
            aria-label="Fechar">×</button>
        </div>
        <div class="te-position-control">
          <input
            class="te-position-input"
            type="number"
            min="1"
            step="1"
            inputmode="numeric"
            autocomplete="off"
            aria-label="Número da posição">
          <span class="te-position-of">de 1</span>
        </div>
        <div class="te-position-popover-footer">
          <small class="te-position-context"></small>
          <button class="te-position-confirm" type="submit">Mover</button>
        </div>
      </form>`;

    this.root.appendChild(popover);

    this.positionPopover = popover;
    this.positionForm = popover.querySelector(".te-position-form");
    this.positionInput = popover.querySelector(".te-position-input");
    this.positionOf = popover.querySelector(".te-position-of");
    this.positionContext = popover.querySelector(".te-position-context");

    this.positionForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const id = this.positionPopover.dataset.teSnippetId;
      const requested = Number.parseInt(this.positionInput.value, 10);

      this.moveModelToNumericPosition(id, requested);
    });

    popover
      .querySelector("[data-te-position-close]")
      .addEventListener("click", () => this.closePositionPopover());

    document.addEventListener(
      "pointerdown",
      (event) => {
        if (this.positionPopover.classList.contains("te-hidden")) return;

        const insidePopover = event.target.closest?.(".te-position-popover");
        const positionButton = event.target.closest?.(
          '[data-te-action="model-position-open"]'
        );

        if (!insidePopover && !positionButton) {
          this.closePositionPopover();
        }
      },
      true
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Escape" &&
          !this.positionPopover.classList.contains("te-hidden")
        ) {
          event.preventDefault();
          this.closePositionPopover();
        }
      },
      true
    );
  };

  TextExpressApp.prototype.openPositionPopover = function (
    snippetId,
    anchorButton
  ) {
    this.ensurePositionPopover();

    const snippet = this.snippets.find((item) => item.id === snippetId);
    const state = this.getCurrentVisiblePosition(snippetId);

    if (!snippet || state.index < 0 || !state.total) return;

    this.positionPopover.dataset.teSnippetId = snippetId;
    this.positionInput.min = "1";
    this.positionInput.max = String(state.total);
    this.positionInput.value = String(state.position);
    this.positionOf.textContent = `de ${state.total}`;
    this.positionContext.textContent =
      this.activeCategory === "Todos"
        ? `Organizando ${this.activeType === "protocolo" ? "Protocolos" : "Atendimentos"}`
        : "Organizando o tópico atual";

    this.positionPopover.classList.remove("te-hidden");

    const anchorRect = anchorButton.getBoundingClientRect();
    const popoverRect = this.positionPopover.getBoundingClientRect();
    const margin = 8;

    let left = anchorRect.right - popoverRect.width;
    let top = anchorRect.bottom + margin;

    left = Math.max(
      margin,
      Math.min(left, window.innerWidth - popoverRect.width - margin)
    );

    if (top + popoverRect.height > window.innerHeight - margin) {
      top = anchorRect.top - popoverRect.height - margin;
    }

    top = Math.max(
      margin,
      Math.min(top, window.innerHeight - popoverRect.height - margin)
    );

    this.positionPopover.style.left = `${Math.round(left)}px`;
    this.positionPopover.style.top = `${Math.round(top)}px`;

    window.setTimeout(() => {
      this.positionInput.focus();
      this.positionInput.select();
    }, 20);
  };

  TextExpressApp.prototype.closePositionPopover = function () {
    if (!this.positionPopover) return;

    this.positionPopover.classList.add("te-hidden");
    delete this.positionPopover.dataset.teSnippetId;
  };

  TextExpressApp.prototype.moveModelToNumericPosition = function (
    snippetId,
    requestedPosition
  ) {
    const state = this.getCurrentVisiblePosition(snippetId);

    if (state.index < 0 || !state.total) {
      this.closePositionPopover();
      return false;
    }

    const targetPosition = Math.min(
      state.total,
      Math.max(1, Number.isFinite(requestedPosition)
        ? requestedPosition
        : state.position)
    );

    const targetIndex = targetPosition - 1;

    if (targetIndex === state.index) {
      this.closePositionPopover();
      this.showToast("O modelo já está nessa posição.", "success", 1700);
      return true;
    }

    const orderedIds = state.items.map((item) => item.id);
    const [movedId] = orderedIds.splice(state.index, 1);
    orderedIds.splice(targetIndex, 0, movedId);

    const visibleIdSet = new Set(orderedIds);
    const slots = [];

    this.snippets.forEach((snippet, index) => {
      if (visibleIdSet.has(snippet.id)) slots.push(index);
    });

    const snippetsById = new Map(
      this.snippets.map((snippet) => [snippet.id, snippet])
    );

    const reordered = orderedIds
      .map((id) => snippetsById.get(id))
      .filter(Boolean);

    if (slots.length !== reordered.length) {
      this.closePositionPopover();
      this.showToast("Não foi possível reorganizar o modelo.", "error");
      return false;
    }

    slots.forEach((slot, index) => {
      this.snippets[slot] = reordered[index];
    });

    this.selectedId = snippetId;

    const saved = this.saveSnippets();

    if (!saved) {
      this.closePositionPopover();
      this.showToast("Não foi possível salvar a nova posição.", "error");
      return false;
    }

    this.closePositionPopover();
    this.renderSnippets();

    window.requestAnimationFrame(() => {
      const card = [...this.listElement.querySelectorAll("[data-te-card-id]")]
        .find((element) => element.dataset.teCardId === snippetId);

      card?.classList.add("te-position-moved");

      card?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });

      window.setTimeout(() => {
        card?.classList.remove("te-position-moved");
      }, 650);
    });

    this.showToast(
      `Modelo movido para a posição ${targetPosition}.`,
      "success",
      2200
    );

    return true;
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    const positionButton = event.target.closest(
      '[data-te-action="model-position-open"]'
    );

    if (positionButton) {
      event.preventDefault();
      event.stopPropagation();

      this.openPositionPopover(
        positionButton.dataset.teId,
        positionButton
      );
      return;
    }

    return teV15Original.handleRootClick.call(this, event);
  };

  TextExpressApp.prototype.init = function () {
    this.v15CategoryIdRemap = new Map();
    this.positionPopover = null;

    const result = teV15Original.init.call(this);

    this.ensurePositionPopover();

    if (
      this.v15CategoriesRestored ||
      this.v15SnippetCategoriesRestored
    ) {
      window.setTimeout(() => {
        this.showToast(
          "Categorias de Atendimento e Protocolo foram restauradas.",
          "success",
          4200
        );
      }, 250);
    }

    return result;
  };



  /* ==========================================================
   * Text Express 17.0 — movimento direto corrigido
   * - Sem janela numérica.
   * - Sem drag-and-drop nativo.
   * - Clone visual leve e placeholder do tamanho real do card.
   * - Atendimento e Protocolo.
   * ========================================================== */
  const teV16Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    renderCardWithoutNumericPosition: teV15Original.renderCard,
    handleRootClick: TextExpressApp.prototype.handleRootClick
  });

  TextExpressApp.prototype.canDirectlyReorder = function () {
    return this.activeType === "atendimento" ||
      this.activeType === "protocolo";
  };

  TextExpressApp.prototype.getDirectMoveHandle = function () {
    return `
      <button
        class="te-direct-move-handle"
        type="button"
        data-te-direct-move-handle
        title="Segure e mova para qualquer posição"
        aria-label="Segure e mova este modelo para cima ou para baixo">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <path d="m8 7 4-4 4 4"></path>
          <path d="M12 3v18"></path>
          <path d="m8 17 4 4 4-4"></path>
        </svg>
      </button>`;
  };

  TextExpressApp.prototype.renderCard = function (snippet) {
    /*
     * Usa a renderização anterior à posição numérica da V15.
     * Isso remove completamente o número e o popover.
     */
    let html = teV16Original.renderCardWithoutNumericPosition.call(
      this,
      snippet
    );

    if (!this.canDirectlyReorder()) return html;

    html = html.replace(
      /class="te-snippet-card\b/,
      'class="te-snippet-card te-direct-reorder-card'
    );

    const handle = this.getDirectMoveHandle();
    const editPattern =
      /(<button class="te-icon-action" type="button" data-te-action="edit")/;

    if (editPattern.test(html)) {
      return html.replace(editPattern, `${handle}$1`);
    }

    const textEditPattern =
      /(<button class="te-text-button" type="button" data-te-action="edit")/;

    if (textEditPattern.test(html)) {
      return html.replace(textEditPattern, `${handle}$1`);
    }

    return html.replace("</article>", `${handle}</article>`);
  };

  TextExpressApp.prototype.getDirectVisibleOrder = function () {
    return [...this.listElement.querySelectorAll(
      ".te-snippet-card[data-te-card-id]"
    )]
      .map((card) => card.dataset.teCardId)
      .filter(Boolean);
  };

  TextExpressApp.prototype.persistDirectVisibleOrder = function (
    orderedVisibleIds
  ) {
    if (!this.canDirectlyReorder()) return false;

    const visibleItems = this.getFilteredSnippets();
    const visibleIdSet = new Set(visibleItems.map((item) => item.id));

    if (
      orderedVisibleIds.length !== visibleItems.length ||
      orderedVisibleIds.some((id) => !visibleIdSet.has(id))
    ) {
      return false;
    }

    const visibleSlots = [];
    const snippetsById = new Map(
      this.snippets.map((snippet) => [snippet.id, snippet])
    );

    this.snippets.forEach((snippet, index) => {
      if (visibleIdSet.has(snippet.id)) visibleSlots.push(index);
    });

    const reordered = orderedVisibleIds
      .map((id) => snippetsById.get(id))
      .filter(Boolean);

    if (visibleSlots.length !== reordered.length) return false;

    visibleSlots.forEach((slot, index) => {
      this.snippets[slot] = reordered[index];
    });

    return this.saveSnippets();
  };

  TextExpressApp.prototype.setupDirectCardReorder = function () {
    const list = this.listElement;
    if (!list || list.dataset.teDirectReorderReady === "true") return;

    list.dataset.teDirectReorderReady = "true";

    let pointerId = null;
    let handle = null;
    let sourceCard = null;
    let ghost = null;
    let startY = 0;
    let latestY = 0;
    let initialOrder = [];
    let initialScrollTop = 0;
    let sourceRect = null;
    let frameId = 0;
    let active = false;
    let suppressNextClick = false;
    let endingPointerCapture = false;

    const EDGE_ZONE = 68;
    const MAX_SCROLL_SPEED = 26;

    const getCardsExceptSource = () => {
      return [...list.querySelectorAll(
        ".te-snippet-card[data-te-card-id]:not(.te-direct-placeholder)"
      )];
    };

    const calculatePosition = () => {
      const cards = [
        ...list.querySelectorAll(
          ".te-snippet-card[data-te-card-id]"
        )
      ];

      const index = cards.indexOf(sourceCard);
      return index >= 0 ? index + 1 : 1;
    };

    const updatePlaceholderLabel = () => {
      if (!sourceCard) return;

      const position = calculatePosition();
      const total = this.getFilteredSnippets().length;

      sourceCard.dataset.teDropPosition =
        `Soltar aqui · posição ${position} de ${total}`;
    };

    const movePlaceholder = (clientY) => {
      if (!sourceCard) return;

      const candidates = getCardsExceptSource();
      let destination = null;

      for (const card of candidates) {
        const rect = card.getBoundingClientRect();

        if (clientY < rect.top + rect.height / 2) {
          destination = card;
          break;
        }
      }

      if (destination) {
        if (sourceCard.nextElementSibling !== destination) {
          list.insertBefore(sourceCard, destination);
        }
      } else if (sourceCard !== list.lastElementChild) {
        list.appendChild(sourceCard);
      }

      updatePlaceholderLabel();
    };

    const autoScroll = () => {
      const rect = list.getBoundingClientRect();
      let delta = 0;

      if (latestY < rect.top + EDGE_ZONE) {
        const ratio = Math.max(
          0,
          Math.min(1, (rect.top + EDGE_ZONE - latestY) / EDGE_ZONE)
        );
        delta = -Math.ceil(5 + ratio * MAX_SCROLL_SPEED);
      } else if (latestY > rect.bottom - EDGE_ZONE) {
        const ratio = Math.max(
          0,
          Math.min(1, (latestY - (rect.bottom - EDGE_ZONE)) / EDGE_ZONE)
        );
        delta = Math.ceil(5 + ratio * MAX_SCROLL_SPEED);
      }

      if (delta) list.scrollTop += delta;
    };

    const renderFrame = () => {
      frameId = 0;

      if (!active || !ghost || !sourceRect) return;

      const deltaY = latestY - startY;

      ghost.style.transform =
        `translate3d(0, ${Math.round(deltaY)}px, 0)`;

      autoScroll();
      movePlaceholder(latestY);

      /*
       * Mantém atualizando enquanto o ponteiro estiver na zona de rolagem.
       */
      const rect = list.getBoundingClientRect();
      const nearEdge =
        latestY < rect.top + EDGE_ZONE ||
        latestY > rect.bottom - EDGE_ZONE;

      if (nearEdge) requestFrame();
    };

    const requestFrame = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(renderFrame);
    };

    const createGhost = () => {
      const clone = sourceCard.cloneNode(true);

      clone.classList.remove(
        "te-selected",
        "te-direct-placeholder",
        "te-position-moved"
      );
      clone.classList.add("te-direct-drag-ghost");
      clone.removeAttribute("data-te-drop-position");
      clone.setAttribute("aria-hidden", "true");

      clone.querySelectorAll("button, input, textarea, select, a")
        .forEach((element) => {
          element.tabIndex = -1;
          element.setAttribute("aria-hidden", "true");
        });

      clone.style.position = "fixed";
      clone.style.left = `${Math.round(sourceRect.left)}px`;
      clone.style.top = `${Math.round(sourceRect.top)}px`;
      clone.style.width = `${Math.round(sourceRect.width)}px`;
      clone.style.height = `${Math.round(sourceRect.height)}px`;
      clone.style.margin = "0";
      clone.style.zIndex = "2147483646";
      clone.style.pointerEvents = "none";
      clone.style.transform = "translate3d(0, 0, 0)";
      clone.style.willChange = "transform";

      this.root.appendChild(clone);
      return clone;
    };

    const clearVisualState = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }

      ghost?.remove();

      if (sourceCard) {
        sourceCard.classList.remove("te-direct-placeholder");
        sourceCard.removeAttribute("data-te-drop-position");
        sourceCard.setAttribute("aria-grabbed", "false");
      }

      list.classList.remove("te-direct-reordering");

      ghost = null;
    };

    const restoreInitialOrder = () => {
      if (!initialOrder.length) return;

      const cardsById = new Map(
        [...list.querySelectorAll(
          ".te-snippet-card[data-te-card-id]"
        )].map((card) => [card.dataset.teCardId, card])
      );

      initialOrder.forEach((id) => {
        const card = cardsById.get(id);
        if (card) list.appendChild(card);
      });
    };

    const releasePointer = () => {
      try {
        if (list.hasPointerCapture(pointerId)) {
          list.releasePointerCapture(pointerId);
        }
      } catch {}
    };

    const resetState = () => {
      pointerId = null;
      handle = null;
      sourceCard = null;
      startY = 0;
      latestY = 0;
      initialOrder = [];
      sourceRect = null;
      active = false;
      endingPointerCapture = false;
    };

    const cancelMovement = (showToast = false) => {
      if (!active) {
        resetState();
        return;
      }

      endingPointerCapture = true;
      releasePointer();
      clearVisualState();
      restoreInitialOrder();
      list.scrollTop = initialScrollTop;
      resetState();

      if (showToast) {
        this.showToast("Movimento cancelado.", "success", 1500);
      }
    };

    const finishMovement = () => {
      if (!active || !sourceCard) {
        resetState();
        return;
      }

      const movedId = sourceCard.dataset.teCardId;
      const finalOrder = this.getDirectVisibleOrder();
      const changed = finalOrder.join("|") !== initialOrder.join("|");
      const savedScrollTop = list.scrollTop;
      const newPosition = finalOrder.indexOf(movedId) + 1;

      endingPointerCapture = true;
      releasePointer();
      clearVisualState();

      if (!changed) {
        resetState();
        return;
      }

      const saved = this.persistDirectVisibleOrder(finalOrder);

      if (!saved) {
        restoreInitialOrder();
        resetState();
        this.renderSnippets();
        this.showToast("Não foi possível salvar a nova ordem.", "error");
        return;
      }

      this.selectedId = movedId || this.selectedId;
      resetState();
      this.renderSnippets();

      window.requestAnimationFrame(() => {
        list.scrollTop = savedScrollTop;

        const movedCard = [...list.querySelectorAll("[data-te-card-id]")]
          .find((card) => card.dataset.teCardId === movedId);

        movedCard?.classList.add("te-direct-move-saved");

        window.setTimeout(() => {
          movedCard?.classList.remove("te-direct-move-saved");
        }, 600);
      });

      suppressNextClick = true;
      window.setTimeout(() => {
        suppressNextClick = false;
      }, 140);

      this.showToast(
        `Modelo movido para a posição ${newPosition}.`,
        "success",
        1800
      );
    };

    list.addEventListener("pointerdown", (event) => {
      const moveHandle = event.target.closest(
        "[data-te-direct-move-handle]"
      );

      if (
        !moveHandle ||
        !this.canDirectlyReorder() ||
        (event.pointerType === "mouse" && event.button !== 0)
      ) {
        return;
      }

      const card = moveHandle.closest(
        ".te-snippet-card[data-te-card-id]"
      );

      if (!card) return;

      event.preventDefault();
      event.stopPropagation();

      pointerId = event.pointerId;
      handle = moveHandle;
      sourceCard = card;
      sourceRect = sourceCard.getBoundingClientRect();
      startY = event.clientY;
      latestY = event.clientY;
      initialOrder = this.getDirectVisibleOrder();
      initialScrollTop = list.scrollTop;
      active = true;

      sourceCard.classList.add("te-direct-placeholder");
      sourceCard.setAttribute("aria-grabbed", "true");
      list.classList.add("te-direct-reordering");
      updatePlaceholderLabel();

      ghost = createGhost();

      try {
        list.setPointerCapture(pointerId);
      } catch {}

      requestFrame();
    });

    list.addEventListener("pointermove", (event) => {
      if (
        !active ||
        pointerId === null ||
        event.pointerId !== pointerId
      ) {
        return;
      }

      event.preventDefault();
      latestY = event.clientY;
      requestFrame();
    });

    list.addEventListener("pointerup", (event) => {
      if (
        !active ||
        pointerId === null ||
        event.pointerId !== pointerId
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      finishMovement();
    });

    list.addEventListener("pointercancel", (event) => {
      if (
        !active ||
        pointerId === null ||
        event.pointerId !== pointerId
      ) {
        return;
      }

      cancelMovement(false);
    });

    list.addEventListener("lostpointercapture", (event) => {
      if (endingPointerCapture) return;

      if (
        active &&
        pointerId !== null &&
        event.pointerId === pointerId
      ) {
        cancelMovement(false);
      }
    });

    list.addEventListener(
      "click",
      (event) => {
        if (!suppressNextClick) return;

        suppressNextClick = false;
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      true
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "Escape" || !active) return;

        event.preventDefault();
        cancelMovement(true);
      },
      true
    );
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    /*
     * A alça não executa clique comum; ela serve apenas ao movimento.
     */
    const handle = event.target.closest("[data-te-direct-move-handle]");

    if (handle) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    return teV16Original.handleRootClick.call(this, event);
  };

  TextExpressApp.prototype.init = function () {
    const result = teV16Original.init.call(this);

    /*
     * A V15 criou o popover numérico durante a inicialização.
     * Ele permanece fechado e é removido visualmente nesta versão.
     */
    if (this.positionPopover) {
      this.positionPopover.classList.add("te-hidden");
      this.positionPopover.setAttribute("aria-hidden", "true");
    }

    this.setupDirectCardReorder();
    return result;
  };



  /* ==========================================================
   * Text Express 18.0 — importação completa confiável
   * ========================================================== */
  const teV18Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    exportSnippets: TextExpressApp.prototype.exportSnippets
  });

  TextExpressApp.prototype.ensureImportChoiceDialog = function () {
    if (this.importChoiceDialog) return;

    const overlay = document.createElement("div");
    overlay.className = "te-import-choice-overlay te-hidden";
    overlay.setAttribute("role", "presentation");

    overlay.innerHTML = `
      <section
        class="te-import-choice-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="te-import-choice-title">
        <header class="te-import-choice-header">
          <div>
            <span class="te-import-choice-kicker">IMPORTAR BACKUP</span>
            <h2 id="te-import-choice-title">Como deseja carregar os dados?</h2>
          </div>
          <button
            class="te-import-choice-close"
            type="button"
            data-te-import-choice="cancel"
            aria-label="Fechar">×</button>
        </header>

        <div class="te-import-choice-summary">
          <strong class="te-import-file-name"></strong>
          <span class="te-import-file-details"></span>
        </div>

        <div class="te-import-choice-options">
          <button
            class="te-import-option te-import-option-primary"
            type="button"
            data-te-import-choice="replace">
            <span class="te-import-option-icon">↻</span>
            <span>
              <strong>Restaurar backup completo</strong>
              <small>
                Deixa este navegador igual ao navegador antigo:
                modelos, alterações, exclusões, categorias e ordem.
              </small>
              <em>Recomendado para trocar de navegador</em>
            </span>
          </button>

          <button
            class="te-import-option"
            type="button"
            data-te-import-choice="merge">
            <span class="te-import-option-icon">＋</span>
            <span>
              <strong>Mesclar com os dados atuais</strong>
              <small>
                Atualiza modelos com o mesmo ID e acrescenta modelos novos,
                sem apagar os demais itens atuais.
              </small>
            </span>
          </button>
        </div>

        <p class="te-import-choice-warning">
          A restauração completa substituirá os dados existentes neste
          navegador. O arquivo selecionado não será alterado.
        </p>
      </section>`;

    this.root.appendChild(overlay);
    this.importChoiceDialog = overlay;
    this.importFileName = overlay.querySelector(".te-import-file-name");
    this.importFileDetails = overlay.querySelector(".te-import-file-details");

    overlay.addEventListener("click", (event) => {
      const button = event.target.closest("[data-te-import-choice]");

      if (button) {
        event.preventDefault();
        const choice = button.dataset.teImportChoice;

        if (choice === "cancel") {
          this.finishImportChoice(null);
        } else {
          this.finishImportChoice(choice);
        }
        return;
      }

      if (event.target === overlay) {
        this.finishImportChoice(null);
      }
    });
  };

  TextExpressApp.prototype.requestImportChoice = function (
    file,
    parsed,
    snippetCount,
    categoryCount
  ) {
    this.ensureImportChoiceDialog();

    this.importFileName.textContent = file.name || "Backup do Text Express";
    this.importFileDetails.textContent =
      `${snippetCount} modelo(s) · ${categoryCount} categoria(s)` +
      (parsed.exportedAt
        ? ` · exportado em ${new Date(parsed.exportedAt).toLocaleString("pt-BR")}`
        : "");

    this.importChoiceDialog.classList.remove("te-hidden");

    return new Promise((resolve) => {
      this.importChoiceResolver = resolve;
    });
  };

  TextExpressApp.prototype.finishImportChoice = function (choice) {
    if (!this.importChoiceDialog) return;

    this.importChoiceDialog.classList.add("te-hidden");

    const resolver = this.importChoiceResolver;
    this.importChoiceResolver = null;

    if (resolver) resolver(choice);
  };

  TextExpressApp.prototype.validateImportPayload = function (parsed) {
    const source = Array.isArray(parsed)
      ? parsed
      : parsed && Array.isArray(parsed.snippets)
        ? parsed.snippets
        : null;

    if (!source) {
      throw new Error("O arquivo não contém uma lista válida de modelos.");
    }

    if (!source.length) {
      throw new Error("O backup não contém modelos para importar.");
    }

    const categories =
      parsed && Array.isArray(parsed.categories)
        ? parsed.categories
        : [];

    return {
      source,
      categories,
      fullBackup: Boolean(
        parsed &&
        !Array.isArray(parsed) &&
        parsed.app === "Text Express" &&
        Array.isArray(parsed.snippets)
      )
    };
  };

  TextExpressApp.prototype.normalizeImportedCategories = function (
    rawCategories
  ) {
    const seen = new Set();
    const normalized = [];

    for (const raw of rawCategories || []) {
      const category = this.normalizeCategory(raw);

      if (seen.has(category.id)) continue;
      seen.add(category.id);
      normalized.push(category);
    }

    for (const tipo of ["atendimento", "protocolo"]) {
      if (!normalized.some((category) => category.tipo === tipo)) {
        const fallback =
          DEFAULT_CATEGORIES.find(
            (category) =>
              category.tipo === tipo &&
              this.normalizeSearchText(category.nome) === "outros"
          ) ||
          {
            tipo,
            nome: "Outros",
            icone: "folder",
            cor: "#64748b",
            ordem: 999,
            padrao: true
          };

        const category = this.normalizeCategory(fallback);

        if (!seen.has(category.id)) {
          seen.add(category.id);
          normalized.push(category);
        }
      }
    }

    normalized.sort(
      (a, b) =>
        a.tipo.localeCompare(b.tipo) ||
        a.ordem - b.ordem ||
        a.nome.localeCompare(b.nome, "pt-BR")
    );

    return normalized;
  };

  TextExpressApp.prototype.restoreCompleteBackup = function (
    parsed,
    source,
    rawCategories
  ) {
    const previousCategories = this.categories;
    const previousSnippets = this.snippets;

    try {
      if (rawCategories.length) {
        this.categories = this.normalizeImportedCategories(rawCategories);
      } else {
        this.categories = this.getDefaultCategories();
      }

      const normalizedSnippets = this.normalizeCollection(source);

      if (!normalizedSnippets.length) {
        throw new Error("Nenhum modelo válido foi encontrado no backup.");
      }

      /*
       * A ordem do array do backup é preservada.
       * Exclusões feitas no navegador antigo também são preservadas,
       * pois a base atual é substituída integralmente.
       */
      this.snippets = normalizedSnippets;

      const categoriesSaved = this.storageSet(
        STORAGE_KEYS.categories,
        JSON.stringify({
          app: "Text Express",
          schemaVersion: 6,
          appVersion: APP_VERSION,
          updatedAt: new Date().toISOString(),
          categories: this.categories
        })
      );

      const snippetsSaved = this.saveSnippets();

      if (!categoriesSaved || snippetsSaved === false) {
        throw new Error(
          "O navegador não confirmou a gravação dos dados importados."
        );
      }

      if (
        parsed.settings &&
        typeof parsed.settings === "object" &&
        !Array.isArray(parsed.settings)
      ) {
        this.settings = {
          ...this.settings,
          ...parsed.settings
        };
        this.saveSettings();
      }

      if (
        parsed.rememberedVariables &&
        typeof parsed.rememberedVariables === "object" &&
        !Array.isArray(parsed.rememberedVariables)
      ) {
        this.rememberedVariables = {
          ...parsed.rememberedVariables
        };
        this.saveRememberedVariables?.();
      }

      this.activeCategory = "Todos";
      this.selectedId = null;
      this.searchInput.value = "";
      this.render();

      return {
        models: this.snippets.length,
        categories: this.categories.length
      };
    } catch (error) {
      this.categories = previousCategories;
      this.snippets = previousSnippets;
      this.rebuildShortcutMap();
      throw error;
    }
  };

  TextExpressApp.prototype.mergeImportedBackup = function (
    parsed,
    source,
    rawCategories
  ) {
    let categoriesCreated = 0;
    let categoriesUpdated = 0;

    for (const rawCategory of rawCategories) {
      const candidate = this.normalizeCategory(rawCategory);

      const existingIndex = this.categories.findIndex(
        (category) =>
          category.id === candidate.id ||
          (
            category.tipo === candidate.tipo &&
            this.normalizeSearchText(category.nome) ===
              this.normalizeSearchText(candidate.nome)
          )
      );

      if (existingIndex >= 0) {
        const existing = this.categories[existingIndex];

        this.categories[existingIndex] = {
          ...existing,
          ...candidate,
          id: existing.id
        };
        categoriesUpdated += 1;
      } else {
        this.categories.push(candidate);
        categoriesCreated += 1;
      }
    }

    this.sortCategories();
    this.saveCategories();

    const existingById = new Map(
      this.snippets.map((item, index) => [item.id, index])
    );
    const usedShortcuts = new Set(
      this.snippets.map((item) => item.atalho)
    );
    const existingSignatures = new Set(
      this.snippets.map((item) => this.snippetSignature(item))
    );

    let updated = 0;
    let added = 0;
    let skipped = 0;
    let renamed = 0;

    for (const raw of source) {
      const item = this.normalizeSnippet(raw);

      if (!item.nome || !item.conteudo) {
        skipped += 1;
        continue;
      }

      const existingIndex = existingById.get(item.id);

      /*
       * Mesmo ID significa o mesmo modelo.
       * A versão importada substitui a versão atual, preservando
       * alterações de conteúdo, nome, atalho, favorito e categoria.
       */
      if (Number.isInteger(existingIndex)) {
        const previous = this.snippets[existingIndex];
        usedShortcuts.delete(previous.atalho);

        const originalShortcut = item.atalho;
        item.atalho = this.makeUniqueShortcut(
          item.atalho,
          usedShortcuts
        );

        if (item.atalho !== originalShortcut) renamed += 1;

        this.snippets[existingIndex] = item;
        usedShortcuts.add(item.atalho);
        existingSignatures.add(this.snippetSignature(item));
        updated += 1;
        continue;
      }

      const signature = this.snippetSignature(item);

      if (existingSignatures.has(signature)) {
        skipped += 1;
        continue;
      }

      const originalShortcut = item.atalho;
      item.atalho = this.makeUniqueShortcut(item.atalho, usedShortcuts);

      if (item.atalho !== originalShortcut) renamed += 1;

      this.snippets.push(item);
      existingById.set(item.id, this.snippets.length - 1);
      usedShortcuts.add(item.atalho);
      existingSignatures.add(signature);
      added += 1;
    }

    const saved = this.saveSnippets();

    if (saved === false) {
      throw new Error("O navegador não confirmou a gravação da mesclagem.");
    }

    this.activeCategory = "Todos";
    this.selectedId = null;
    this.searchInput.value = "";
    this.render();

    return {
      updated,
      added,
      skipped,
      renamed,
      categoriesCreated,
      categoriesUpdated
    };
  };

  TextExpressApp.prototype.handleImportFile = async function (event) {
    const file = event.target.files && event.target.files[0];

    if (!file) return;

    if (file.size > 12 * 1024 * 1024) {
      this.showToast(
        "O arquivo excede o limite de 12 MB.",
        "error"
      );
      event.target.value = "";
      return;
    }

    try {
      const parsed = JSON.parse(await file.text());
      const validated = this.validateImportPayload(parsed);

      let choice = "merge";

      if (validated.fullBackup) {
        choice = await this.requestImportChoice(
          file,
          parsed,
          validated.source.length,
          validated.categories.length
        );

        if (!choice) {
          this.showToast("Importação cancelada.");
          return;
        }
      }

      if (choice === "replace") {
        const result = this.restoreCompleteBackup(
          parsed,
          validated.source,
          validated.categories
        );

        this.showToast(
          `Backup restaurado: ${result.models} modelo(s) e ` +
          `${result.categories} categoria(s).`,
          "success",
          6000
        );
      } else {
        const result = this.mergeImportedBackup(
          parsed,
          validated.source,
          validated.categories
        );

        this.showToast(
          `${result.updated} atualizado(s), ` +
          `${result.added} adicionado(s) e ` +
          `${result.skipped} ignorado(s).`,
          "success",
          6000
        );
      }
    } catch (error) {
      this.showToast(
        `Não foi possível importar: ${error.message}`,
        "error",
        6500
      );
    } finally {
      event.target.value = "";
    }
  };

  TextExpressApp.prototype.exportSnippets = function () {
    const payload = {
      app: "Text Express",
      backupType: "complete",
      schemaVersion: 6,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      total: this.snippets.length,
      categories: this.categories,
      snippets: this.snippets,
      settings: this.settings,
      rememberedVariables: this.rememberedVariables || {}
    };

    const blob = new Blob(
      [JSON.stringify(payload, null, 2)],
      { type: "application/json;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `text-express-backup-completo-${date}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    this.showToast(
      "Backup completo exportado com modelos, categorias e configurações.",
      "success",
      4500
    );
  };

  TextExpressApp.prototype.init = function () {
    const result = teV18Original.init.call(this);
    this.ensureImportChoiceDialog();
    return result;
  };



  /* ==========================================================
   * Text Express 19.0 — estado visual persistente
   *
   * Guarda:
   * - última aba;
   * - categoria selecionada por aba;
   * - pesquisa de cada aba;
   * - posição horizontal das categorias;
   * - posição vertical das listas;
   * - card selecionado em cada visualização.
   * ========================================================== */
  const teV19Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    handleRootClick: TextExpressApp.prototype.handleRootClick,
    renderCategories: TextExpressApp.prototype.renderCategories,
    renderSnippets: TextExpressApp.prototype.renderSnippets,
    openApp: TextExpressApp.prototype.openApp,
    collapseToLauncher: TextExpressApp.prototype.collapseToLauncher,
    exportSnippets: TextExpressApp.prototype.exportSnippets,
    restoreCompleteBackup: TextExpressApp.prototype.restoreCompleteBackup
  });

  TextExpressApp.prototype.getDefaultUiState = function () {
    return {
      version: 1,
      activeType: "protocolo",
      activeCategoryByType: {
        atendimento: "Todos",
        protocolo: "Todos",
        favoritos: "Todos"
      },
      searchByType: {
        atendimento: "",
        protocolo: "",
        favoritos: ""
      },
      categoryScrollPositions: {
        atendimento: 0,
        protocolo: 0,
        favoritos: 0
      },
      listScrollPositions: {},
      selectedIdByView: {},
      updatedAt: ""
    };
  };

  TextExpressApp.prototype.normalizeUiType = function (value) {
    return ["atendimento", "protocolo", "favoritos"].includes(value)
      ? value
      : "atendimento";
  };

  TextExpressApp.prototype.normalizeStoredUiState = function (raw) {
    const defaults = this.getDefaultUiState();
    const source =
      raw && typeof raw === "object" && !Array.isArray(raw)
        ? raw
        : {};

    const normalized = {
      ...defaults,
      activeType: this.normalizeUiType(source.activeType),
      activeCategoryByType: {
        ...defaults.activeCategoryByType
      },
      searchByType: {
        ...defaults.searchByType
      },
      categoryScrollPositions: {
        ...defaults.categoryScrollPositions
      },
      listScrollPositions: {},
      selectedIdByView: {},
      updatedAt: typeof source.updatedAt === "string"
        ? source.updatedAt
        : ""
    };

    for (const type of ["atendimento", "protocolo", "favoritos"]) {
      const category = source.activeCategoryByType?.[type];
      normalized.activeCategoryByType[type] =
        typeof category === "string" && category
          ? category
          : "Todos";

      const search = source.searchByType?.[type];
      normalized.searchByType[type] =
        typeof search === "string"
          ? search.slice(0, 500)
          : "";

      const categoryScroll =
        Number(source.categoryScrollPositions?.[type]);

      normalized.categoryScrollPositions[type] =
        Number.isFinite(categoryScroll)
          ? Math.max(0, categoryScroll)
          : 0;
    }

    if (
      source.listScrollPositions &&
      typeof source.listScrollPositions === "object" &&
      !Array.isArray(source.listScrollPositions)
    ) {
      for (const [key, value] of Object.entries(
        source.listScrollPositions
      )) {
        const number = Number(value);

        if (
          typeof key === "string" &&
          key.length <= 700 &&
          Number.isFinite(number)
        ) {
          normalized.listScrollPositions[key] = Math.max(0, number);
        }
      }
    }

    if (
      source.selectedIdByView &&
      typeof source.selectedIdByView === "object" &&
      !Array.isArray(source.selectedIdByView)
    ) {
      for (const [key, value] of Object.entries(
        source.selectedIdByView
      )) {
        if (
          typeof key === "string" &&
          key.length <= 700 &&
          typeof value === "string" &&
          value.length <= 300
        ) {
          normalized.selectedIdByView[key] = value;
        }
      }
    }

    return normalized;
  };

  TextExpressApp.prototype.loadUiState = function () {
    const saved = this.storageGet(STORAGE_KEYS.uiState);

    if (!saved) {
      this.uiState = this.getDefaultUiState();
      return;
    }

    try {
      this.uiState = this.normalizeStoredUiState(
        JSON.parse(saved)
      );
    } catch {
      this.uiState = this.getDefaultUiState();
    }
  };

  TextExpressApp.prototype.saveUiState = function () {
    if (!this.uiState) return false;

    this.uiState.updatedAt = new Date().toISOString();

    return this.storageSet(
      STORAGE_KEYS.uiState,
      JSON.stringify(this.uiState)
    );
  };

  TextExpressApp.prototype.scheduleUiStateSave = function () {
    window.clearTimeout(this.uiStateSaveTimer);

    this.uiStateSaveTimer = window.setTimeout(() => {
      this.captureCurrentUiState();
      this.saveUiState();
    }, 120);
  };

  TextExpressApp.prototype.getUiViewKey = function (
    type = this.activeType,
    category = this.activeCategory
  ) {
    const safeType = this.normalizeUiType(type);
    const safeCategory =
      typeof category === "string" && category
        ? category
        : "Todos";

    return `${safeType}::${safeCategory}`;
  };

  TextExpressApp.prototype.captureCurrentUiState = function () {
    if (!this.uiState) {
      this.uiState = this.getDefaultUiState();
    }

    const type = this.normalizeUiType(this.activeType);
    const category =
      typeof this.activeCategory === "string" &&
      this.activeCategory
        ? this.activeCategory
        : "Todos";
    const viewKey = this.getUiViewKey(type, category);

    this.uiState.activeType = type;
    this.uiState.activeCategoryByType[type] = category;
    this.uiState.searchByType[type] =
      String(this.searchInput?.value || "").slice(0, 500);

    if (this.categoryBar) {
      const categoryScroll = Math.max(
        0,
        Number(this.categoryBar.scrollLeft) || 0
      );

      this.uiState.categoryScrollPositions[type] =
        categoryScroll;

      if (this.categoryScrollPositions) {
        this.categoryScrollPositions[type] = categoryScroll;
      }
    }

    if (this.listElement) {
      this.uiState.listScrollPositions[viewKey] =
        Math.max(
          0,
          Number(this.listElement.scrollTop) || 0
        );
    }

    if (
      typeof this.selectedId === "string" &&
      this.selectedId
    ) {
      this.uiState.selectedIdByView[viewKey] =
        this.selectedId;
    } else {
      delete this.uiState.selectedIdByView[viewKey];
    }

    return this.uiState;
  };

  TextExpressApp.prototype.isUiCategoryValid = function (
    type,
    categoryId
  ) {
    if (categoryId === "Todos") return true;

    if (type === "favoritos") {
      return this.getCategoriesForType("favoritos")
        .some((category) => category.id === categoryId);
    }

    return this.categories.some(
      (category) =>
        category.tipo === type &&
        category.id === categoryId
    );
  };

  TextExpressApp.prototype.applyUiStateToCurrentView = function () {
    if (!this.uiState) {
      this.uiState = this.getDefaultUiState();
    }

    const type = this.normalizeUiType(
      this.uiState.activeType
    );
    const requestedCategory =
      this.uiState.activeCategoryByType[type] || "Todos";
    const category = this.isUiCategoryValid(
      type,
      requestedCategory
    )
      ? requestedCategory
      : "Todos";

    this.activeType = type;
    this.activeCategory = category;

    if (this.searchInput) {
      this.searchInput.value =
        this.uiState.searchByType[type] || "";
    }

    if (!this.categoryScrollPositions) {
      this.categoryScrollPositions = {
        atendimento: 0,
        protocolo: 0,
        favoritos: 0
      };
    }

    this.categoryScrollPositions = {
      ...this.categoryScrollPositions,
      ...this.uiState.categoryScrollPositions
    };

    const viewKey = this.getUiViewKey(type, category);
    const selectedId =
      this.uiState.selectedIdByView[viewKey];

    this.selectedId =
      typeof selectedId === "string" &&
      this.snippets.some(
        (snippet) => snippet.id === selectedId
      )
        ? selectedId
        : null;
  };

  TextExpressApp.prototype.restoreCurrentUiPositions = function () {
    if (!this.uiState) return;

    const type = this.normalizeUiType(this.activeType);
    const viewKey = this.getUiViewKey(
      type,
      this.activeCategory
    );

    window.requestAnimationFrame(() => {
      if (this.categoryBar) {
        const maximum = Math.max(
          0,
          this.categoryBar.scrollWidth -
            this.categoryBar.clientWidth
        );
        const requested = Math.max(
          0,
          Number(
            this.uiState.categoryScrollPositions[type]
          ) || 0
        );

        this.categoryBar.scrollLeft =
          Math.min(requested, maximum);

        if (this.categoryScrollPositions) {
          this.categoryScrollPositions[type] =
            this.categoryBar.scrollLeft;
        }
      }

      if (this.listElement) {
        const maximum = Math.max(
          0,
          this.listElement.scrollHeight -
            this.listElement.clientHeight
        );
        const requested = Math.max(
          0,
          Number(
            this.uiState.listScrollPositions[viewKey]
          ) || 0
        );

        this.listElement.scrollTop =
          Math.min(requested, maximum);
      }
    });
  };

  TextExpressApp.prototype.switchToSavedUiType = function (
    nextType
  ) {
    this.captureCurrentUiState();

    const type = this.normalizeUiType(nextType);
    const requestedCategory =
      this.uiState.activeCategoryByType[type] || "Todos";

    this.activeType = type;
    this.activeCategory = this.isUiCategoryValid(
      type,
      requestedCategory
    )
      ? requestedCategory
      : "Todos";
    this.selectedId =
      this.uiState.selectedIdByView[
        this.getUiViewKey(type, this.activeCategory)
      ] || null;
    this.searchInput.value =
      this.uiState.searchByType[type] || "";

    this.uiState.activeType = type;

    this.render();
    this.restoreCurrentUiPositions();
    this.scheduleUiStateSave();
  };

  TextExpressApp.prototype.selectPersistentCategory = function (
    categoryId
  ) {
    this.captureCurrentUiState();

    const type = this.normalizeUiType(this.activeType);
    const category = this.isUiCategoryValid(
      type,
      categoryId
    )
      ? categoryId
      : "Todos";

    this.activeCategory = category;
    this.uiState.activeCategoryByType[type] = category;

    const viewKey = this.getUiViewKey(type, category);
    this.selectedId =
      this.uiState.selectedIdByView[viewKey] || null;

    this.renderCategories();
    this.renderSnippets();
    this.restoreCurrentUiPositions();
    this.scheduleUiStateSave();
  };

  TextExpressApp.prototype.setupUiStatePersistence = function () {
    if (this.uiStatePersistenceReady) return;
    this.uiStatePersistenceReady = true;

    this.searchInput?.addEventListener(
      "input",
      () => {
        const type = this.normalizeUiType(
          this.activeType
        );

        this.uiState.searchByType[type] =
          String(this.searchInput.value || "")
            .slice(0, 500);

        const viewKey = this.getUiViewKey();
        this.uiState.listScrollPositions[viewKey] = 0;
        this.scheduleUiStateSave();
      },
      true
    );

    this.categoryBar?.addEventListener(
      "scroll",
      () => {
        const type = this.normalizeUiType(
          this.activeType
        );
        const value = Math.max(
          0,
          Number(this.categoryBar.scrollLeft) || 0
        );

        this.uiState.categoryScrollPositions[type] =
          value;

        if (this.categoryScrollPositions) {
          this.categoryScrollPositions[type] = value;
        }

        this.scheduleUiStateSave();
      },
      { passive: true }
    );

    this.listElement?.addEventListener(
      "scroll",
      () => {
        const viewKey = this.getUiViewKey();

        this.uiState.listScrollPositions[viewKey] =
          Math.max(
            0,
            Number(this.listElement.scrollTop) || 0
          );

        this.scheduleUiStateSave();
      },
      { passive: true }
    );

    window.addEventListener("pagehide", () => {
      this.captureCurrentUiState();
      this.saveUiState();
    });

    window.addEventListener("beforeunload", () => {
      this.captureCurrentUiState();
      this.saveUiState();
    });
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    const typeButton = event.target.closest("[data-te-type]");

    if (typeButton) {
      event.preventDefault();
      event.stopPropagation();

      this.switchToSavedUiType(
        typeButton.dataset.teType
      );
      return;
    }

    const categoryButton = event.target.closest(
      "#te-category-bar [data-te-category]"
    );

    if (categoryButton) {
      event.preventDefault();
      event.stopPropagation();

      this.selectPersistentCategory(
        categoryButton.dataset.teCategory || "Todos"
      );
      return;
    }

    const card = event.target.closest(
      "[data-te-card-id]"
    );

    const result =
      teV19Original.handleRootClick.call(this, event);

    if (
      card &&
      !event.target.closest("[data-te-action]")
    ) {
      const viewKey = this.getUiViewKey();

      this.uiState.selectedIdByView[viewKey] =
        card.dataset.teCardId;
      this.scheduleUiStateSave();
    }

    return result;
  };

  TextExpressApp.prototype.renderCategories = function () {
    const result =
      teV19Original.renderCategories.call(this);

    this.restoreCurrentUiPositions();

    return result;
  };

  TextExpressApp.prototype.renderSnippets = function () {
    const viewKey = this.getUiViewKey();
    const savedSelected =
      this.uiState?.selectedIdByView?.[viewKey];

    if (
      typeof savedSelected === "string" &&
      this.snippets.some(
        (snippet) => snippet.id === savedSelected
      )
    ) {
      this.selectedId = savedSelected;
    }

    const result =
      teV19Original.renderSnippets.call(this);

    if (this.selectedId) {
      this.uiState.selectedIdByView[viewKey] =
        this.selectedId;
    }

    this.restoreCurrentUiPositions();

    return result;
  };

  TextExpressApp.prototype.openApp = function () {
    const result = teV19Original.openApp.call(this);

    this.restoreCurrentUiPositions();

    return result;
  };

  TextExpressApp.prototype.collapseToLauncher = function () {
    this.captureCurrentUiState();
    this.saveUiState();

    return teV19Original.collapseToLauncher.call(this);
  };

  TextExpressApp.prototype.restoreCompleteBackup = function (
    parsed,
    source,
    rawCategories
  ) {
    const result =
      teV19Original.restoreCompleteBackup.call(
        this,
        parsed,
        source,
        rawCategories
      );

    if (
      parsed?.uiState &&
      typeof parsed.uiState === "object" &&
      !Array.isArray(parsed.uiState)
    ) {
      this.uiState = this.normalizeStoredUiState(
        parsed.uiState
      );
      this.saveUiState();
      this.applyUiStateToCurrentView();
      this.render();
      this.restoreCurrentUiPositions();
    }

    return result;
  };

  TextExpressApp.prototype.exportSnippets = function () {
    const uiState = this.captureCurrentUiState();
    this.saveUiState();

    const payload = {
      app: "Text Express",
      backupType: "complete",
      schemaVersion: 7,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      total: this.snippets.length,
      categories: this.categories,
      snippets: this.snippets,
      settings: this.settings,
      rememberedVariables:
        this.rememberedVariables || {},
      uiState
    };

    const blob = new Blob(
      [JSON.stringify(payload, null, 2)],
      { type: "application/json;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download =
      `text-express-backup-completo-${date}.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    this.showToast(
      "Backup completo exportado com dados e posições da interface.",
      "success",
      4500
    );
  };

  TextExpressApp.prototype.init = function () {
    this.uiState = this.getDefaultUiState();
    this.uiStateSaveTimer = null;
    this.uiStatePersistenceReady = false;

    const result = teV19Original.init.call(this);

    this.loadUiState();
    this.applyUiStateToCurrentView();
    this.setupUiStatePersistence();
    this.render();
    this.restoreCurrentUiPositions();

    return result;
  };



  /* ==========================================================
   * Text Express 20.0 — janela de importação clicável
   * ========================================================== */
  const teV20Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    ensureImportChoiceDialog:
      TextExpressApp.prototype.ensureImportChoiceDialog,
    requestImportChoice:
      TextExpressApp.prototype.requestImportChoice,
    finishImportChoice:
      TextExpressApp.prototype.finishImportChoice
  });

  TextExpressApp.prototype.ensureImportChoiceDialog = function () {
    teV20Original.ensureImportChoiceDialog.call(this);

    const overlay = this.importChoiceDialog;
    if (!overlay) return;

    /*
     * O elemento raiz do Text Express usa pointer-events:none para não
     * bloquear a página hospedeira. A janela precisa reativar cliques.
     */
    overlay.style.pointerEvents = "auto";
    overlay.setAttribute("aria-hidden", "true");

    if (overlay.dataset.teV20ClickReady === "true") return;
    overlay.dataset.teV20ClickReady = "true";

    const executeChoice = (choice, event) => {
      event?.preventDefault();
      event?.stopPropagation();
      event?.stopImmediatePropagation();

      this.finishImportChoice(
        choice === "cancel" ? null : choice
      );
    };

    overlay
      .querySelectorAll("[data-te-import-choice]")
      .forEach((button) => {
        button.style.pointerEvents = "auto";

        button.addEventListener(
          "click",
          (event) => {
            executeChoice(
              button.dataset.teImportChoice,
              event
            );
          },
          true
        );

        /*
         * Alguns sistemas interceptam o click, mas não o pointerup.
         * Este fallback garante resposta ao botão esquerdo e ao toque.
         */
        button.addEventListener(
          "pointerup",
          (event) => {
            if (
              event.pointerType === "mouse" &&
              event.button !== 0
            ) {
              return;
            }

            if (
              button.dataset.teV20PointerExecuted === "true"
            ) {
              return;
            }

            button.dataset.teV20PointerExecuted = "true";

            window.setTimeout(() => {
              delete button.dataset.teV20PointerExecuted;
            }, 250);

            executeChoice(
              button.dataset.teImportChoice,
              event
            );
          },
          true
        );
      });

    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key !== "Escape" ||
          overlay.classList.contains("te-hidden")
        ) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        this.finishImportChoice(null);
      },
      true
    );
  };

  TextExpressApp.prototype.requestImportChoice = function (
    file,
    parsed,
    snippetCount,
    categoryCount
  ) {
    this.ensureImportChoiceDialog();

    const promise = teV20Original.requestImportChoice.call(
      this,
      file,
      parsed,
      snippetCount,
      categoryCount
    );

    this.importChoiceDialog.setAttribute(
      "aria-hidden",
      "false"
    );

    window.requestAnimationFrame(() => {
      const primary = this.importChoiceDialog.querySelector(
        '[data-te-import-choice="replace"]'
      );
      primary?.focus({ preventScroll: true });
    });

    return promise;
  };

  TextExpressApp.prototype.finishImportChoice = function (
    choice
  ) {
    if (this.importChoiceDialog) {
      this.importChoiceDialog.setAttribute(
        "aria-hidden",
        "true"
      );
    }

    return teV20Original.finishImportChoice.call(
      this,
      choice
    );
  };

  TextExpressApp.prototype.init = function () {
    const result = teV20Original.init.call(this);
    this.ensureImportChoiceDialog();
    return result;
  };


  /* ==========================================================
   * Text Express 21.0 — visualização por card, atalhos por área
   * e carregador externo compacto para o favorito.
   * ========================================================== */
  const teV21Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    handleRootClick: TextExpressApp.prototype.handleRootClick,
    renderCard: TextExpressApp.prototype.renderCard,
    switchToSavedUiType: TextExpressApp.prototype.switchToSavedUiType,
    mergeImportedBackup: TextExpressApp.prototype.mergeImportedBackup
  });

  TextExpressApp.prototype.getSnippetShortcutValues = function (snippet) {
    if (!snippet) return [];

    const values = [];
    if (snippet.atalho) values.push(this.normalizeShortcut(snippet.atalho));

    if (
      snippet.tipo === "atendimento" &&
      snippet.modelo === "fluxo" &&
      Array.isArray(snippet.etapas)
    ) {
      for (const step of snippet.etapas) {
        if (step?.atalho) values.push(this.normalizeShortcut(step.atalho));
      }
    }

    return values;
  };

  TextExpressApp.prototype.getUsedShortcutsForType = function (
    type,
    ignoreModelId = null
  ) {
    const normalizedType = type === "protocolo" ? "protocolo" : "atendimento";
    const used = new Set();

    for (const snippet of this.snippets) {
      if (snippet.id === ignoreModelId || snippet.tipo !== normalizedType) continue;
      this.getSnippetShortcutValues(snippet).forEach((shortcut) => used.add(shortcut));
    }

    return used;
  };

  TextExpressApp.prototype.ensureUniqueSnippetShortcuts = function (
    snippet,
    usedShortcuts
  ) {
    const used = usedShortcuts || new Set();
    const originalParent = snippet.atalho;

    snippet.atalho = this.makeUniqueShortcut(snippet.atalho, used);
    used.add(snippet.atalho);

    let renamed = snippet.atalho !== originalParent ? 1 : 0;

    if (
      snippet.tipo === "atendimento" &&
      snippet.modelo === "fluxo" &&
      Array.isArray(snippet.etapas)
    ) {
      snippet.etapas = snippet.etapas.map((step, index) => {
        const normalizedStep = this.normalizeFlowStep(
          step,
          index,
          snippet.atalho
        );
        const originalStep = normalizedStep.atalho;
        normalizedStep.atalho = this.makeUniqueShortcut(
          normalizedStep.atalho,
          used
        );
        used.add(normalizedStep.atalho);
        if (normalizedStep.atalho !== originalStep) renamed += 1;
        return normalizedStep;
      });

      snippet.conteudo = snippet.etapas
        .map((step) => step.conteudo)
        .join("\n\n");
      snippet.variaveis = [
        ...new Set(snippet.etapas.flatMap((step) => step.variaveis || []))
      ];
    }

    return renamed;
  };

  TextExpressApp.prototype.normalizeCollection = function (items) {
    const ids = new Set();
    const usedByType = {
      atendimento: new Set(),
      protocolo: new Set()
    };
    const normalized = [];

    for (const raw of items || []) {
      const item = this.normalizeSnippet(raw);

      if (!item.nome) continue;
      if (item.modelo === "fluxo" && !item.etapas.length) continue;
      if (item.modelo !== "fluxo" && !item.conteudo) continue;

      if (ids.has(item.id)) item.id = this.generateId(item.tipo);
      ids.add(item.id);

      this.ensureUniqueSnippetShortcuts(
        item,
        usedByType[item.tipo]
      );

      normalized.push(item);
    }

    return normalized;
  };

  TextExpressApp.prototype.getAllShortcutOwners = function (
    ignoreModelId = null,
    requestedType = null
  ) {
    const formType = this.root
      ?.querySelector('input[name="te-type"]:checked')
      ?.value;
    const currentSnippet = ignoreModelId
      ? this.snippets.find((snippet) => snippet.id === ignoreModelId)
      : null;
    const type = requestedType === "protocolo" || requestedType === "atendimento"
      ? requestedType
      : formType === "protocolo" || formType === "atendimento"
        ? formType
        : currentSnippet?.tipo === "protocolo"
          ? "protocolo"
          : "atendimento";

    const owners = new Map();

    for (const snippet of this.snippets) {
      if (snippet.id === ignoreModelId || snippet.tipo !== type) continue;

      owners.set(this.normalizeShortcut(snippet.atalho), snippet.nome);

      if (snippet.modelo === "fluxo") {
        for (const step of snippet.etapas || []) {
          owners.set(
            this.normalizeShortcut(step.atalho),
            `${snippet.nome} — ${step.nome}`
          );
        }
      }
    }

    return owners;
  };

  TextExpressApp.prototype.getAvailableSuggestedShortcut = function () {
    const name = this.root.querySelector("#te-form-name")?.value || "modelo";
    const type = this.root
      .querySelector('input[name="te-type"]:checked')
      ?.value === "protocolo"
      ? "protocolo"
      : "atendimento";
    const used = this.getUsedShortcutsForType(type, this.editingId);

    return this.makeUniqueShortcut(
      this.suggestShortcutFromName(name),
      used
    );
  };

  TextExpressApp.prototype.validateShortcutField = function () {
    const field = this.root.querySelector("#te-form-shortcut");
    const shortcut = this.normalizeShortcut(field.value);
    const type = this.root
      .querySelector('input[name="te-type"]:checked')
      ?.value === "protocolo"
      ? "protocolo"
      : "atendimento";

    field.value = shortcut;

    const owner = this.getAllShortcutOwners(
      this.editingId,
      type
    ).get(shortcut);

    this.setFormError(
      "shortcut",
      owner ? `Esse atalho já pertence a “${owner}” nesta área.` : ""
    );

    return !owner;
  };

  TextExpressApp.prototype.createShortcutEntry = function (
    snippet,
    step = null,
    stepIndex = -1
  ) {
    if (step) {
      return {
        kind: "flow-step",
        snippet,
        step,
        stepIndex,
        triggerKey: step.triggerKey
      };
    }

    if (snippet.modelo === "fluxo" && snippet.tipo === "atendimento") {
      return {
        kind: "flow",
        snippet,
        triggerKey: snippet.triggerKey
      };
    }

    return {
      kind: "snippet",
      snippet,
      triggerKey: snippet.triggerKey
    };
  };

  TextExpressApp.prototype.rebuildShortcutMap = function () {
    this.shortcutMapsByType = {
      atendimento: new Map(),
      protocolo: new Map()
    };

    for (const snippet of this.snippets) {
      if (!snippet.ativo || !snippet.atalho) continue;

      const map = this.shortcutMapsByType[snippet.tipo];
      if (!map) continue;

      map.set(
        this.normalizeShortcut(snippet.atalho),
        this.createShortcutEntry(snippet)
      );

      if (
        snippet.tipo === "atendimento" &&
        snippet.modelo === "fluxo"
      ) {
        (snippet.etapas || []).forEach((step, index) => {
          if (!step.atalho) return;
          map.set(
            this.normalizeShortcut(step.atalho),
            this.createShortcutEntry(snippet, step, index)
          );
        });
      }
    }

    const scope = this.getShortcutScopeType?.() || "atendimento";
    this.shortcutMap = this.shortcutMapsByType[scope] || new Map();
  };

  TextExpressApp.prototype.getShortcutScopeType = function () {
    if (this.activeType === "protocolo") return "protocolo";
    if (this.activeType === "atendimento") return "atendimento";

    const selected = this.snippets.find(
      (snippet) => snippet.id === this.selectedId && snippet.favorito
    );

    if (selected) return selected.tipo;
    return this.lastShortcutType === "protocolo"
      ? "protocolo"
      : "atendimento";
  };

  TextExpressApp.prototype.getShortcutMapForCurrentView = function () {
    const type = this.getShortcutScopeType();
    const source = this.shortcutMapsByType?.[type] || new Map();

    if (this.activeType !== "favoritos") return source;

    const favoritesOnly = new Map();
    for (const [shortcut, entry] of source.entries()) {
      if (entry?.snippet?.favorito) favoritesOnly.set(shortcut, entry);
    }
    return favoritesOnly;
  };

  TextExpressApp.prototype.findShortcutBeforeCaret = function (
    element,
    triggerKey
  ) {
    let before = "";

    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement
    ) {
      const caret = typeof element.selectionStart === "number"
        ? element.selectionStart
        : element.value.length;

      if (element.selectionStart !== element.selectionEnd) return null;
      before = element.value.slice(0, caret);
    } else {
      const range = this.getCurrentOrStoredRange(element);
      if (!range || !range.collapsed) return null;

      const prefix = range.cloneRange();
      prefix.selectNodeContents(element);
      prefix.setEnd(range.endContainer, range.endOffset);
      before = prefix.toString();
    }

    const match = before.match(/(?:^|\s)(\/[^\s]+)$/);
    if (!match) return null;

    const shortcut = this.normalizeShortcut(match[1]);
    const entry = this.getShortcutMapForCurrentView().get(shortcut);

    if (!entry || entry.triggerKey !== triggerKey) return null;
    return { shortcut, snippet: entry };
  };

  TextExpressApp.prototype.selectCardForPreview = function (snippetId) {
    const snippet = this.snippets.find((item) => item.id === snippetId);
    if (!snippet) return false;

    this.selectedId = snippet.id;
    this.lastShortcutType = snippet.tipo;

    this.listElement
      ?.querySelectorAll(".te-snippet-card.te-selected")
      .forEach((card) => {
        card.classList.remove("te-selected");
        card.setAttribute("aria-selected", "false");
      });

    const selectedCard = [...(
      this.listElement?.querySelectorAll("[data-te-card-id]") || []
    )].find((card) => card.dataset.teCardId === snippet.id);

    selectedCard?.classList.add("te-selected");
    selectedCard?.setAttribute("aria-selected", "true");

    this.renderDetail(snippet);

    if (this.uiState) {
      this.uiState.selectedIdByView[this.getUiViewKey()] = snippet.id;
      this.scheduleUiStateSave();
    }

    return true;
  };

  TextExpressApp.prototype.renderCard = function (snippet) {
    let html = teV21Original.renderCard.call(this, snippet);

    html = html.replace(
      /data-te-card-id=/,
      `tabindex="0" role="button" aria-selected="${snippet.id === this.selectedId ? "true" : "false"}" data-te-card-id=`
    );

    return html;
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    const card = event.target.closest(
      ".te-snippet-card[data-te-card-id]"
    );
    const interactiveControl = event.target.closest(
      "[data-te-action], [data-te-direct-move-handle], button, input, select, textarea, a"
    );

    if (card && !interactiveControl) {
      event.preventDefault();
      event.stopPropagation();
      this.selectCardForPreview(card.dataset.teCardId);
      return;
    }

    return teV21Original.handleRootClick.call(this, event);
  };

  TextExpressApp.prototype.switchToSavedUiType = function (nextType) {
    const result = teV21Original.switchToSavedUiType.call(this, nextType);

    if (nextType === "atendimento" || nextType === "protocolo") {
      this.lastShortcutType = nextType;
    }

    this.shortcutMap = this.getShortcutMapForCurrentView();
    return result;
  };

  TextExpressApp.prototype.setupCardPreviewInteraction = function () {
    if (!this.listElement || this.listElement.dataset.teV21PreviewReady === "true") {
      return;
    }

    this.listElement.dataset.teV21PreviewReady = "true";

    this.listElement.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("[data-te-action], button, input, select, textarea, a")) return;

      const card = event.target.closest(
        ".te-snippet-card[data-te-card-id]"
      );
      if (!card) return;

      event.preventDefault();
      this.selectCardForPreview(card.dataset.teCardId);
    });
  };

  TextExpressApp.prototype.mergeImportedBackup = function (
    parsed,
    source,
    rawCategories
  ) {
    let categoriesCreated = 0;
    let categoriesUpdated = 0;

    for (const rawCategory of rawCategories) {
      const candidate = this.normalizeCategory(rawCategory);
      const existingIndex = this.categories.findIndex(
        (category) =>
          category.id === candidate.id ||
          (
            category.tipo === candidate.tipo &&
            this.normalizeSearchText(category.nome) ===
              this.normalizeSearchText(candidate.nome)
          )
      );

      if (existingIndex >= 0) {
        const existing = this.categories[existingIndex];
        this.categories[existingIndex] = {
          ...existing,
          ...candidate,
          id: existing.id
        };
        categoriesUpdated += 1;
      } else {
        this.categories.push(candidate);
        categoriesCreated += 1;
      }
    }

    this.sortCategories();
    this.saveCategories();

    const existingById = new Map(
      this.snippets.map((item, index) => [item.id, index])
    );
    const usedByType = {
      atendimento: this.getUsedShortcutsForType("atendimento"),
      protocolo: this.getUsedShortcutsForType("protocolo")
    };
    const existingSignatures = new Set(
      this.snippets.map((item) => this.snippetSignature(item))
    );

    let updated = 0;
    let added = 0;
    let skipped = 0;
    let renamed = 0;

    for (const raw of source) {
      const item = this.normalizeSnippet(raw);

      if (!item.nome || !item.conteudo) {
        skipped += 1;
        continue;
      }

      const existingIndex = existingById.get(item.id);
      const used = usedByType[item.tipo];

      if (Number.isInteger(existingIndex)) {
        const previous = this.snippets[existingIndex];
        const previousUsed = usedByType[previous.tipo];
        this.getSnippetShortcutValues(previous).forEach((shortcut) => {
          previousUsed.delete(shortcut);
        });

        renamed += this.ensureUniqueSnippetShortcuts(item, used);
        this.snippets[existingIndex] = item;
        existingSignatures.add(this.snippetSignature(item));
        updated += 1;
        continue;
      }

      const signature = this.snippetSignature(item);
      if (existingSignatures.has(signature)) {
        skipped += 1;
        continue;
      }

      renamed += this.ensureUniqueSnippetShortcuts(item, used);
      this.snippets.push(item);
      existingById.set(item.id, this.snippets.length - 1);
      existingSignatures.add(signature);
      added += 1;
    }

    const saved = this.saveSnippets();
    if (saved === false) {
      throw new Error("O navegador não confirmou a gravação da mesclagem.");
    }

    this.activeCategory = "Todos";
    this.selectedId = null;
    this.searchInput.value = "";
    this.render();

    return {
      updated,
      added,
      skipped,
      renamed,
      categoriesCreated,
      categoriesUpdated
    };
  };

  TextExpressApp.prototype.init = function () {
    this.lastShortcutType = "atendimento";

    const result = teV21Original.init.call(this);

    if (this.activeType === "protocolo" || this.activeType === "atendimento") {
      this.lastShortcutType = this.activeType;
    } else {
      const selected = this.snippets.find((snippet) => snippet.id === this.selectedId);
      if (selected) this.lastShortcutType = selected.tipo;
    }

    this.rebuildShortcutMap();
    this.shortcutMap = this.getShortcutMapForCurrentView();
    this.setupCardPreviewInteraction();

    return result;
  };

  /* ==========================================================
   * Text Express 22.0 — menu persistente de sequências
   * - abre pelo comando principal ou pelo botão ABRIR SEQUÊNCIA;
   * - seleciona falas por número, palavra-chave ou clique;
   * - insere somente o texto da fala, sem o número;
   * - permanece aberto ao alternar entre atendimentos;
   * - amplia a compatibilidade com editores modernos, Shadow DOM
   *   e iframes de mesma origem.
   * ========================================================== */
  const teV22Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    normalizeFlowStep: TextExpressApp.prototype.normalizeFlowStep,
    normalizeSnippet: TextExpressApp.prototype.normalizeSnippet,
    renderCard: TextExpressApp.prototype.renderCard,
    renderFlowDetail: TextExpressApp.prototype.renderFlowDetail,
    renderFlowEditorSteps: TextExpressApp.prototype.renderFlowEditorSteps,
    syncEditingFlowSteps: TextExpressApp.prototype.syncEditingFlowSteps,
    handleRootClick: TextExpressApp.prototype.handleRootClick,
    handleRootInput: TextExpressApp.prototype.handleRootInput,
    onGlobalFocusIn: TextExpressApp.prototype.onGlobalFocusIn,
    onSelectionChange: TextExpressApp.prototype.onSelectionChange,
    onGlobalKeyDown: TextExpressApp.prototype.onGlobalKeyDown,
    findShortcutBeforeCaret: TextExpressApp.prototype.findShortcutBeforeCaret,
    expandShortcut: TextExpressApp.prototype.expandShortcut,
    insertFlowStep: TextExpressApp.prototype.insertFlowStep,
    getEditableRoot: TextExpressApp.prototype.getEditableRoot,
    captureContentEditableRange: TextExpressApp.prototype.captureContentEditableRange,
    getCurrentOrStoredRange: TextExpressApp.prototype.getCurrentOrStoredRange,
    captureInsertionContext: TextExpressApp.prototype.captureInsertionContext,
    insertIntoInput: TextExpressApp.prototype.insertIntoInput,
    insertIntoContentEditable: TextExpressApp.prototype.insertIntoContentEditable,
    dispatchInputEvents: TextExpressApp.prototype.dispatchInputEvents
  });

  TextExpressApp.prototype.parseSequenceKeywords = function (raw) {
    const source = Array.isArray(raw)
      ? raw
      : String(raw || "").split(/[;,\n]+/);
    const result = [];
    const used = new Set();

    for (const value of source) {
      const text = String(value || "").trim();
      if (!text) continue;
      const keyword = this.normalizeShortcut(text);
      if (!keyword || keyword === "/" || used.has(keyword)) continue;
      used.add(keyword);
      result.push(keyword);
    }

    return result;
  };

  TextExpressApp.prototype.normalizeFlowStep = function (raw = {}, index = 0, parentShortcut = "/fluxo") {
    const step = teV22Original.normalizeFlowStep.call(this, raw, index, parentShortcut);
    const aliases = raw.palavrasChave ?? raw.palavras_chave ?? raw.keywords ?? raw.aliases ?? [];
    step.palavrasChave = this.parseSequenceKeywords(aliases)
      .filter((keyword) => keyword !== step.atalho);
    return step;
  };

  TextExpressApp.prototype.normalizeSnippet = function (raw = {}) {
    const snippet = teV22Original.normalizeSnippet.call(this, raw);
    if (snippet.tipo !== "atendimento" || snippet.modelo !== "fluxo") return snippet;

    const reserved = new Set([this.normalizeShortcut(snippet.atalho)]);
    for (const step of snippet.etapas || []) reserved.add(this.normalizeShortcut(step.atalho));

    const aliasesUsed = new Set();
    snippet.etapas = (snippet.etapas || []).map((step) => {
      const aliases = this.parseSequenceKeywords(step.palavrasChave || []);
      step.palavrasChave = aliases.filter((keyword) => {
        if (reserved.has(keyword) || aliasesUsed.has(keyword)) return false;
        aliasesUsed.add(keyword);
        return true;
      });
      return step;
    });

    return snippet;
  };

  TextExpressApp.prototype.ensureSequenceMenu = function () {
    if (this.sequenceMenu?.isConnected) return this.sequenceMenu;

    const menu = document.createElement("section");
    menu.id = "te-sequence-menu";
    menu.className = "te-sequence-menu te-hidden";
    menu.setAttribute("role", "dialog");
    menu.setAttribute("aria-modal", "false");
    menu.setAttribute("aria-label", "Sequência de atendimento aberta");
    menu.innerHTML = `
      <header class="te-sequence-menu-header">
        <div class="te-sequence-menu-title-wrap">
          <span class="te-sequence-menu-icon">${this.icon("clipboard-list")}</span>
          <div>
            <div class="te-sequence-menu-kicker">
              <span id="te-sequence-command">SEQUÊNCIA</span>
              <span class="te-sequence-open-badge">Aberta</span>
            </div>
            <strong id="te-sequence-title">Selecione uma sequência</strong>
          </div>
        </div>
        <div class="te-sequence-menu-meta">
          <span id="te-sequence-count">0 perguntas</span>
          <button class="te-sequence-close" type="button" data-te-action="sequence-close" title="Fechar sequência (ESC)" aria-label="Fechar sequência">
            ${this.icon("x")}<small>ESC</small>
          </button>
        </div>
      </header>
      <label class="te-sequence-search">
        ${this.icon("search")}
        <input id="te-sequence-search-input" type="search" autocomplete="off" placeholder="Buscar por número, texto ou palavra-chave..." aria-label="Buscar nesta sequência">
      </label>
      <div class="te-sequence-list" id="te-sequence-list"></div>
      <footer class="te-sequence-menu-footer">
        <span>${this.icon("zap")} No chat vazio, digite apenas o número. Também funciona por palavra-chave.</span>
        <span>O menu permanece aberto após inserir.</span>
      </footer>`;

    this.root.appendChild(menu);
    this.sequenceMenu = menu;
    this.sequenceSearchInput = menu.querySelector("#te-sequence-search-input");
    this.sequenceList = menu.querySelector("#te-sequence-list");
    return menu;
  };

  TextExpressApp.prototype.getActiveSequence = function () {
    if (!this.activeSequenceId) return null;
    return this.snippets.find((item) =>
      item.id === this.activeSequenceId &&
      item.tipo === "atendimento" &&
      item.modelo === "fluxo" &&
      item.ativo
    ) || null;
  };

  TextExpressApp.prototype.getSequenceStepKeywords = function (step) {
    return [...new Set([
      this.normalizeShortcut(step.atalho),
      ...this.parseSequenceKeywords(step.palavrasChave || [])
    ].filter(Boolean))];
  };

  TextExpressApp.prototype.renderSequenceMenu = function () {
    this.ensureSequenceMenu();
    const flow = this.getActiveSequence();
    if (!flow) {
      this.closeSequenceMenu(false);
      return;
    }

    const query = this.normalizeSearchText(this.sequenceSearchInput?.value || "");
    const state = this.getFlowState(flow);
    const matches = (flow.etapas || [])
      .map((step, index) => ({ step, index }))
      .filter(({ step, index }) => {
        if (!query) return true;
        const haystack = this.normalizeSearchText([
          String(index + 1),
          step.nome,
          step.conteudo,
          step.atalho,
          ...(step.palavrasChave || [])
        ].join(" "));
        return haystack.includes(query.replace(/^\//, "")) || haystack.includes(query);
      });

    this.sequenceMenu.querySelector("#te-sequence-command").textContent = `SEQUÊNCIA ${flow.atalho}`;
    this.sequenceMenu.querySelector("#te-sequence-title").textContent = flow.nome;
    this.sequenceMenu.querySelector("#te-sequence-count").textContent = `${flow.etapas.length} ${flow.etapas.length === 1 ? "pergunta" : "perguntas"}`;

    this.sequenceList.innerHTML = matches.length
      ? matches.map(({ step, index }) => {
          const keywords = this.getSequenceStepKeywords(step);
          const chips = keywords.map((keyword) => `<code>${this.escapeHtml(keyword)}</code>`).join("");
          return `
            <button class="te-sequence-item ${state.current === index ? "te-current" : ""} ${state.used.has(index) ? "te-used" : ""}" type="button" data-te-action="sequence-step-insert" data-te-id="${this.escapeAttr(flow.id)}" data-te-step-index="${index}">
              <span class="te-sequence-number">${index + 1}</span>
              <span class="te-sequence-item-content">
                <strong>${this.escapeHtml(step.nome)}</strong>
                <span>${this.escapeHtml(step.conteudo)}</span>
                <span class="te-sequence-keywords">${chips || "<em>Sem palavra-chave adicional</em>"}</span>
              </span>
              <span class="te-sequence-item-action">${state.used.has(index) ? this.icon("check-circle") : this.icon("send")}</span>
            </button>`;
        }).join("")
      : `<div class="te-sequence-empty">${this.icon("search")}<strong>Nenhuma pergunta encontrada</strong><span>Limpe a busca ou use outra palavra-chave.</span></div>`;
  };

  TextExpressApp.prototype.openSequenceMenu = function (flowOrId, options = {}) {
    const flow = typeof flowOrId === "string"
      ? this.snippets.find((item) => item.id === flowOrId)
      : flowOrId;

    if (!flow || flow.tipo !== "atendimento" || flow.modelo !== "fluxo") {
      this.showToast("Essa sequência não está disponível no Atendimento.", "error");
      return false;
    }

    this.ensureSequenceMenu();
    this.activeSequenceId = flow.id;
    if (!options.preserveSearch && this.sequenceSearchInput) this.sequenceSearchInput.value = "";
    this.renderSequenceMenu();
    this.sequenceMenu.classList.remove("te-hidden");
    this.sequenceMenu.setAttribute("aria-hidden", "false");
    return true;
  };

  TextExpressApp.prototype.closeSequenceMenu = function (announce = true) {
    this.ensureSequenceMenu();
    const wasOpen = !this.sequenceMenu.classList.contains("te-hidden");
    this.sequenceMenu.classList.add("te-hidden");
    this.sequenceMenu.setAttribute("aria-hidden", "true");
    this.activeSequenceId = null;
    if (this.sequenceSearchInput) this.sequenceSearchInput.value = "";
    if (announce && wasOpen) this.showToast("Sequência fechada.");
  };

  TextExpressApp.prototype.isSequenceMenuOpen = function () {
    return Boolean(this.sequenceMenu && !this.sequenceMenu.classList.contains("te-hidden") && this.getActiveSequence());
  };

  TextExpressApp.prototype.renderCard = function (snippet) {
    let html = teV22Original.renderCard.call(this, snippet);
    if (snippet?.modelo === "fluxo") {
      html = html.replace(/Abrir sequência/g, "ABRIR SEQUÊNCIA");
    }
    return html;
  };

  TextExpressApp.prototype.renderFlowDetail = function (flow) {
    const result = teV22Original.renderFlowDetail.call(this, flow);
    const actions = this.detailPane?.querySelector(".te-flow-header-actions");
    if (actions && !actions.querySelector('[data-te-action="sequence-open"]')) {
      const button = document.createElement("button");
      button.className = "te-primary-button te-sequence-open-detail";
      button.type = "button";
      button.dataset.teAction = "sequence-open";
      button.dataset.teId = flow.id;
      button.innerHTML = `${this.icon("play-circle")} ABRIR SEQUÊNCIA`;
      actions.prepend(button);
    }
    return result;
  };

  TextExpressApp.prototype.renderFlowEditorSteps = function () {
    const result = teV22Original.renderFlowEditorSteps.call(this);
    const editors = [...this.root.querySelectorAll(".te-flow-step-editor")];

    editors.forEach((editor, index) => {
      const grid = editor.querySelector(".te-flow-step-editor-grid");
      if (!grid || grid.querySelector('[data-te-flow-field="palavrasChave"]')) return;
      const step = this.editingFlowSteps[index] || {};
      const label = document.createElement("label");
      label.className = "te-flow-keywords-field";
      label.innerHTML = `
        <span>Palavras-chave desta pergunta</span>
        <input type="text" data-te-flow-field="palavrasChave" value="${this.escapeAttr((step.palavrasChave || []).join(", "))}" spellcheck="false" placeholder="/led, /mexeu, /foto">
        <small>Separe por vírgulas. Elas funcionam enquanto esta sequência estiver aberta.</small>`;
      grid.appendChild(label);
    });

    return result;
  };

  TextExpressApp.prototype.syncEditingFlowSteps = function () {
    const result = teV22Original.syncEditingFlowSteps.call(this);
    const editors = [...this.root.querySelectorAll(".te-flow-step-editor")];
    editors.forEach((editor, index) => {
      if (!this.editingFlowSteps[index]) return;
      const field = editor.querySelector('[data-te-flow-field="palavrasChave"]');
      this.editingFlowSteps[index].palavrasChave = this.parseSequenceKeywords(field?.value || "")
        .filter((keyword) => keyword !== this.editingFlowSteps[index].atalho);
    });
    return result;
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    const actionButton = event.target.closest("[data-te-action]");
    const action = actionButton?.dataset.teAction;

    if (action === "sequence-close") {
      event.preventDefault();
      event.stopPropagation();
      this.closeSequenceMenu();
      return;
    }

    if (action === "sequence-step-insert") {
      event.preventDefault();
      event.stopPropagation();
      const stepIndex = Number(actionButton.dataset.teStepIndex);
      void this.insertSequenceStep(actionButton.dataset.teId, stepIndex);
      return;
    }

    if (action === "sequence-open" || action === "flow-open") {
      const id = actionButton.dataset.teId;
      const flow = this.snippets.find((item) => item.id === id && item.modelo === "fluxo" && item.tipo === "atendimento");
      if (flow) {
        event.preventDefault();
        event.stopPropagation();
        this.selectedId = flow.id;
        this.activeType = "atendimento";
        this.lastShortcutType = "atendimento";
        this.render();
        this.openSequenceMenu(flow);
        this.showToast(`Sequência “${flow.nome}” aberta.`, "success");
        return;
      }
    }

    return teV22Original.handleRootClick.call(this, event);
  };

  TextExpressApp.prototype.handleRootInput = function (event) {
    if (event.target?.id === "te-sequence-search-input") {
      this.renderSequenceMenu();
      return;
    }
    return teV22Original.handleRootInput.call(this, event);
  };

  TextExpressApp.prototype.getEventOrigin = function (event) {
    const path = typeof event?.composedPath === "function" ? event.composedPath() : [];
    return path.find((node) => node && node.nodeType === 1) || event?.target || null;
  };

  TextExpressApp.prototype.isTextInputElement = function (element) {
    const tag = String(element?.tagName || "").toLowerCase();
    if (tag === "textarea") return !element.disabled && !element.readOnly;
    if (tag !== "input") return false;
    const allowed = ["text", "search", "email", "tel", "url", ""];
    return allowed.includes(String(element.type || "text").toLowerCase()) && !element.disabled && !element.readOnly;
  };

  TextExpressApp.prototype.getEditableRoot = function (target) {
    if (!target) return null;
    const ownerDocument = target.ownerDocument || document;
    if (target === ownerDocument.body || target === ownerDocument.documentElement) return null;
    if (this.isTextInputElement(target)) return target;

    let node = target.nodeType === 1 ? target : target.parentElement;
    while (node) {
      if (this.isTextInputElement(node)) return node;
      const contentEditable = node.getAttribute?.("contenteditable");
      const role = node.getAttribute?.("role");
      if (
        contentEditable === "true" ||
        contentEditable === "plaintext-only" ||
        node.isContentEditable ||
        role === "textbox"
      ) return node;

      const root = node.getRootNode?.();
      if (root?.host && root !== ownerDocument) node = root.host;
      else node = node.parentElement;
    }

    return teV22Original.getEditableRoot.call(this, target);
  };

  TextExpressApp.prototype.getEditableFromEvent = function (event) {
    const path = typeof event?.composedPath === "function" ? event.composedPath() : [];
    for (const node of path) {
      const editable = this.getEditableRoot(node);
      if (editable) return editable;
    }
    return this.getEditableRoot(event?.target);
  };

  TextExpressApp.prototype.getSelectionForElement = function (element) {
    const ownerWindow = element?.ownerDocument?.defaultView || window;
    return ownerWindow.getSelection?.() || null;
  };

  TextExpressApp.prototype.captureContentEditableRange = function (element) {
    if (!element || this.isTextInputElement(element)) return;
    const selection = this.getSelectionForElement(element);
    if (!selection || !selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (element.contains(range.commonAncestorContainer)) {
      this.contentEditableRanges.set(element, range.cloneRange());
    }
  };

  TextExpressApp.prototype.getCurrentOrStoredRange = function (element) {
    const selection = this.getSelectionForElement(element);
    if (selection && selection.rangeCount) {
      const current = selection.getRangeAt(0);
      if (element.contains(current.commonAncestorContainer)) return current;
    }
    const stored = this.contentEditableRanges.get(element);
    return stored ? stored.cloneRange() : null;
  };

  TextExpressApp.prototype.captureInsertionContext = function (element, shortcutLength = 0) {
    if (!element || !element.isConnected || !this.getEditableRoot(element)) return null;
    if (this.isTextInputElement(element)) {
      const start = typeof element.selectionStart === "number" ? element.selectionStart : String(element.value || "").length;
      const end = typeof element.selectionEnd === "number" ? element.selectionEnd : start;
      return {
        kind: "input",
        element,
        start: shortcutLength ? Math.max(0, start - shortcutLength) : start,
        end
      };
    }

    const range = this.getCurrentOrStoredRange(element);
    if (!range) return null;
    return {
      kind: "contenteditable",
      element,
      range: range.cloneRange(),
      shortcutLength
    };
  };

  TextExpressApp.prototype.dispatchBeforeInputEvent = function (element, content, inputType = "insertText") {
    const ownerWindow = element?.ownerDocument?.defaultView || window;
    try {
      return element.dispatchEvent(new ownerWindow.InputEvent("beforeinput", {
        bubbles: true,
        composed: true,
        cancelable: true,
        inputType,
        data: content
      }));
    } catch (error) {
      return element.dispatchEvent(new ownerWindow.Event("beforeinput", {
        bubbles: true,
        composed: true,
        cancelable: true
      }));
    }
  };

  TextExpressApp.prototype.dispatchInputEvents = function (element, content, inputType = "insertText") {
    const ownerWindow = element?.ownerDocument?.defaultView || window;
    try {
      element.dispatchEvent(new ownerWindow.InputEvent("input", {
        bubbles: true,
        composed: true,
        inputType,
        data: content
      }));
    } catch (error) {
      element.dispatchEvent(new ownerWindow.Event("input", { bubbles: true, composed: true }));
    }
    element.dispatchEvent(new ownerWindow.Event("change", { bubbles: true, composed: true }));
  };

  TextExpressApp.prototype.insertIntoInput = function (element, content, start, end) {
    try {
      const ownerWindow = element.ownerDocument?.defaultView || window;
      const value = String(element.value || "");
      const next = value.slice(0, start) + content + value.slice(end);
      const tag = String(element.tagName || "").toLowerCase();
      const prototype = tag === "textarea"
        ? ownerWindow.HTMLTextAreaElement?.prototype
        : ownerWindow.HTMLInputElement?.prototype;
      const descriptor = prototype && Object.getOwnPropertyDescriptor(prototype, "value");

      element.focus({ preventScroll: true });
      this.dispatchBeforeInputEvent(element, content, end > start ? "insertReplacementText" : "insertText");
      if (descriptor?.set) descriptor.set.call(element, next);
      else element.value = next;

      const caret = start + content.length;
      if (typeof element.setSelectionRange === "function") element.setSelectionRange(caret, caret);
      this.dispatchInputEvents(element, content, end > start ? "insertReplacementText" : "insertText");
      this.lastActiveElement = element;
      return String(element.value || "") === next;
    } catch (error) {
      return false;
    }
  };

  TextExpressApp.prototype.extendSelectionBackward = function (selection, range, amount, ownerWindow) {
    if (!amount) return;
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);

    if (typeof selection.modify === "function") {
      for (let index = 0; index < amount; index += 1) {
        selection.modify("extend", "backward", "character");
      }
      return;
    }

    const NodeCtor = ownerWindow.Node;
    if (range.endContainer.nodeType === NodeCtor.TEXT_NODE && range.endOffset >= amount) {
      range.setStart(range.endContainer, range.endOffset - amount);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  TextExpressApp.prototype.insertIntoContentEditable = function (element, content, savedRange, shortcutLength = 0) {
    try {
      const ownerDocument = element.ownerDocument || document;
      const ownerWindow = ownerDocument.defaultView || window;
      const selection = ownerWindow.getSelection();
      if (!selection) return false;

      element.focus({ preventScroll: true });
      selection.removeAllRanges();
      const range = savedRange.cloneRange();
      selection.addRange(range);
      this.extendSelectionBackward(selection, range, shortcutLength, ownerWindow);

      const selectedRange = selection.rangeCount ? selection.getRangeAt(0) : range;
      this.dispatchBeforeInputEvent(
        element,
        content,
        selectedRange.collapsed ? "insertText" : "insertReplacementText"
      );

      let inserted = false;
      try {
        inserted = Boolean(ownerDocument.execCommand?.("insertText", false, content));
      } catch (error) {
        inserted = false;
      }

      if (!inserted) {
        const activeRange = selection.rangeCount ? selection.getRangeAt(0) : selectedRange;
        activeRange.deleteContents();
        const textNode = ownerDocument.createTextNode(content);
        activeRange.insertNode(textNode);
        activeRange.setStartAfter(textNode);
        activeRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(activeRange);
      }

      if (selection.rangeCount) {
        this.contentEditableRanges.set(element, selection.getRangeAt(0).cloneRange());
      }
      this.dispatchInputEvents(element, content, shortcutLength ? "insertReplacementText" : "insertText");
      this.lastActiveElement = element;
      return true;
    } catch (error) {
      return false;
    }
  };

  TextExpressApp.prototype.onGlobalFocusIn = function (event) {
    const editable = this.getEditableFromEvent(event);
    if (!editable || this.root.contains(editable)) return;
    this.lastActiveElement = editable;
    this.captureContentEditableRange(editable);
  };

  TextExpressApp.prototype.onSelectionChange = function (event) {
    const sourceDocument = event?.currentTarget?.nodeType === 9 ? event.currentTarget : document;
    let active = sourceDocument.activeElement;
    while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
    const editable = this.getEditableRoot(active);
    if (editable && !this.root.contains(editable)) {
      this.lastActiveElement = editable;
      this.captureContentEditableRange(editable);
    }
  };

  TextExpressApp.prototype.getTextBeforeCaret = function (element) {
    if (this.isTextInputElement(element)) {
      const caret = typeof element.selectionStart === "number" ? element.selectionStart : String(element.value || "").length;
      return String(element.value || "").slice(0, caret);
    }
    const range = this.getCurrentOrStoredRange(element);
    if (!range || !range.collapsed) return "";
    const prefix = range.cloneRange();
    prefix.selectNodeContents(element);
    prefix.setEnd(range.endContainer, range.endOffset);
    return prefix.toString();
  };

  TextExpressApp.prototype.findShortcutBeforeCaret = function (element, triggerKey) {
    const before = this.getTextBeforeCaret(element);
    const match = before.match(/(?:^|\s)(\/[^\s]+)$/);
    if (!match) return null;
    const shortcut = this.normalizeShortcut(match[1]);
    const entry = this.getShortcutMapForCurrentView().get(shortcut);
    if (!entry || entry.triggerKey !== triggerKey) return null;
    return { shortcut, snippet: entry };
  };

  TextExpressApp.prototype.findActiveSequenceKeywordBeforeCaret = function (element, triggerKey) {
    const flow = this.getActiveSequence();
    if (!flow || !this.isSequenceMenuOpen()) return null;
    const before = this.getTextBeforeCaret(element);
    const match = before.match(/(?:^|\s)(\/[^\s]+)$/);
    if (!match) return null;
    const shortcut = this.normalizeShortcut(match[1]);

    for (let index = 0; index < flow.etapas.length; index += 1) {
      const step = flow.etapas[index];
      if (step.triggerKey !== triggerKey) continue;
      if (this.getSequenceStepKeywords(step).includes(shortcut)) {
        return { shortcut, flow, step, stepIndex: index };
      }
    }
    return null;
  };

  TextExpressApp.prototype.isEditableBlankForNumberSelection = function (element) {
    if (!element) return false;
    if (this.isTextInputElement(element)) {
      const value = String(element.value || "");
      const start = typeof element.selectionStart === "number" ? element.selectionStart : value.length;
      const end = typeof element.selectionEnd === "number" ? element.selectionEnd : start;
      if (start !== end && start === 0 && end === value.length) return true;
      return value.replace(/[\s\u200B-\u200D\uFEFF]/g, "") === "";
    }
    return String(element.innerText ?? element.textContent ?? "")
      .replace(/[\s\u200B-\u200D\uFEFF]/g, "") === "";
  };

  TextExpressApp.prototype.insertSequenceStep = async function (flowId, stepIndex, suppliedContext = null) {
    const flow = this.snippets.find((item) =>
      item.id === flowId && item.tipo === "atendimento" && item.modelo === "fluxo"
    );
    const step = flow?.etapas?.[stepIndex];
    if (!flow || !step) return false;

    const context = suppliedContext || this.captureInsertionContext(this.lastActiveElement, 0);
    const content = await this.processFlowStep(flow, step);
    if (content === null) {
      this.showToast("Inserção cancelada.");
      return false;
    }

    let inserted = false;
    if (context) inserted = this.applyInsertionContext(context, content);
    if (!inserted) {
      await this.copyText(content);
      this.showToast(`Pergunta ${stepIndex + 1} copiada porque o chat bloqueou a inserção.`, "error", 5000);
    } else {
      this.showToast(`Pergunta ${stepIndex + 1} inserida.`, "success");
    }

    const state = this.getFlowState(flow);
    state.current = stepIndex;
    state.used.add(stepIndex);
    if (this.selectedId === flow.id) this.renderDetail(flow);
    if (this.activeSequenceId === flow.id) this.renderSequenceMenu();
    return inserted;
  };

  TextExpressApp.prototype.insertFlowStep = async function (flowId, stepIndex, advance = false) {
    const inserted = await this.insertSequenceStep(flowId, stepIndex);
    const flow = this.snippets.find((item) => item.id === flowId && item.modelo === "fluxo");
    if (inserted && advance && flow) {
      const state = this.getFlowState(flow);
      state.current = Math.min(stepIndex + 1, flow.etapas.length - 1);
      if (this.selectedId === flow.id) this.renderDetail(flow);
      if (this.activeSequenceId === flow.id) this.renderSequenceMenu();
    }
    return inserted;
  };

  TextExpressApp.prototype.expandShortcut = async function (entry, context) {
    if (entry?.kind === "flow") {
      if (!context) return;
      this.lastActiveElement = context.element;
      this.applyInsertionContext(context, "");
      this.activeType = "atendimento";
      this.lastShortcutType = "atendimento";
      this.activeCategory = "Todos";
      this.selectedId = entry.snippet.id;
      this.openSequenceMenu(entry.snippet);
      this.showToast(`Sequência “${entry.snippet.nome}” aberta.`, "success");
      return;
    }

    if (entry?.kind === "flow-step") {
      const result = await teV22Original.expandShortcut.call(this, entry, context);
      if (this.activeSequenceId === entry.snippet.id) this.renderSequenceMenu();
      return result;
    }

    return teV22Original.expandShortcut.call(this, entry, context);
  };

  TextExpressApp.prototype.onGlobalKeyDown = function (event) {
    if (
      event.key === "Escape" &&
      this.isSequenceMenuOpen() &&
      this.variableModal.classList.contains("te-hidden") &&
      this.snippetModal.classList.contains("te-hidden") &&
      this.settingsModal.classList.contains("te-hidden") &&
      this.categoryModal.classList.contains("te-hidden")
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.closeSequenceMenu();
      return;
    }

    if (
      this.isSequenceMenuOpen() &&
      !event.defaultPrevented &&
      !event.isComposing &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      const editable = this.getEditableFromEvent(event);
      if (editable && !this.root.contains(editable)) {
        this.lastActiveElement = editable;
        this.captureContentEditableRange(editable);
        const flow = this.getActiveSequence();

        if (/^[1-9]$/.test(event.key) && this.isEditableBlankForNumberSelection(editable)) {
          const stepIndex = Number(event.key) - 1;
          if (flow?.etapas?.[stepIndex]) {
            event.preventDefault();
            event.stopPropagation();
            const context = this.captureInsertionContext(editable, 0);
            void this.insertSequenceStep(flow.id, stepIndex, context);
            return;
          }
        }

        const triggerKey = this.getTriggerKey(event);
        if (triggerKey) {
          const aliasMatch = this.findActiveSequenceKeywordBeforeCaret(editable, triggerKey);
          if (aliasMatch) {
            event.preventDefault();
            event.stopPropagation();
            const context = this.captureInsertionContext(editable, aliasMatch.shortcut.length);
            void this.insertSequenceStep(aliasMatch.flow.id, aliasMatch.stepIndex, context);
            return;
          }
        }
      }
    }

    return teV22Original.onGlobalKeyDown.call(this, event);
  };

  TextExpressApp.prototype.installDocumentBridge = function (doc) {
    if (!doc || this.bridgedDocuments.has(doc)) return;
    this.bridgedDocuments.add(doc);

    if (doc !== document) {
      doc.addEventListener("keydown", this.onGlobalKeyDown, true);
      doc.addEventListener("focusin", this.onGlobalFocusIn, true);
      doc.addEventListener("selectionchange", this.onSelectionChange, true);
    }

    const scan = (rootNode) => {
      if (!rootNode?.querySelectorAll && !rootNode?.matches) return;
      const frames = [];
      if (rootNode.matches?.("iframe")) frames.push(rootNode);
      if (rootNode.querySelectorAll) frames.push(...rootNode.querySelectorAll("iframe"));
      for (const iframe of frames) {
        const connect = () => {
          try {
            const frameDocument = iframe.contentDocument;
            if (frameDocument) {
              this.installDocumentBridge(frameDocument);
              scan(frameDocument);
            }
          } catch (error) {
            // Iframes de outra origem são protegidos pelo navegador.
          }
        };
        iframe.addEventListener("load", connect, { passive: true });
        connect();
      }

      if (rootNode.shadowRoot) scan(rootNode.shadowRoot);
      if (rootNode.querySelectorAll) {
        for (const element of rootNode.querySelectorAll("*")) {
          if (element.shadowRoot) scan(element.shadowRoot);
        }
      }
    };

    scan(doc);
    const Observer = doc.defaultView?.MutationObserver || MutationObserver;
    const observer = new Observer((records) => {
      for (const record of records) {
        for (const node of record.addedNodes || []) {
          if (node.nodeType === 1 || node.nodeType === 11) scan(node);
        }
      }
    });
    observer.observe(doc.documentElement || doc, { childList: true, subtree: true });
    this.documentBridgeObservers.push(observer);
  };


  TextExpressApp.prototype.init = function () {
    this.activeSequenceId = null;
    this.sequenceMenu = null;
    this.sequenceSearchInput = null;
    this.sequenceList = null;
    this.bridgedDocuments = new WeakSet();
    this.documentBridgeObservers = [];

    const result = teV22Original.init.call(this);
    this.ensureSequenceMenu();
    this.installDocumentBridge(document);
    this.root.dataset.version = APP_VERSION;
    return result;
  };


  /* ==========================================================
   * Text Express 23.0 — base sanitizada de cartões e categorias
   * - substitui uma única vez a base local anterior;
   * - mantém somente cartões, sequências e categorias do backup;
   * - remove nome lembrado, preferências, tema, posições e estado visual;
   * - depois da migração, novas personalizações permanecem salvas.
   * ========================================================== */
  const TE_V23_BASE_VERSION = "2026-07-17-cards-categories-clean-v1";
  const TE_V23_BASE_STORAGE_KEY = "text_express_base_data_version";

  const teV23Original = Object.freeze({
    init: TextExpressApp.prototype.init
  });

  TextExpressApp.prototype.prepareSanitizedBase = function () {
    try {
      const current = window.localStorage.getItem(TE_V23_BASE_STORAGE_KEY);
      if (current === TE_V23_BASE_VERSION) return false;

      const keysToReset = [
        STORAGE_KEYS.snippets,
        STORAGE_KEYS.categories,
        STORAGE_KEYS.settings,
        STORAGE_KEYS.rememberedVariables,
        STORAGE_KEYS.uiState,
        STORAGE_KEYS.darkMode,
        STORAGE_KEYS.position,
        STORAGE_KEYS.launcherPosition
      ];

      for (const key of keysToReset) window.localStorage.removeItem(key);
      window.localStorage.setItem(TE_V23_BASE_STORAGE_KEY, TE_V23_BASE_VERSION);
      return true;
    } catch (error) {
      return false;
    }
  };

  TextExpressApp.prototype.init = function () {
    const baseReplaced = this.prepareSanitizedBase();
    const result = teV23Original.init.call(this);
    this.root.dataset.version = APP_VERSION;

    if (baseReplaced) {
      window.requestAnimationFrame(() => {
        this.showToast(
          "Base limpa aplicada: cartões e categorias preservados; dados pessoais removidos.",
          "success",
          6500
        );
      });
    }

    return result;
  };



  /* ==========================================================
   * Text Express 25.0 — correção do arraste das janelas
   * - menu de sequência: botão direito no cabeçalho para mover;
   * - painel principal: mantém o arraste atual e aceita botão direito;
   * - ambos podem ser redimensionados pelas bordas e cantos;
   * - posição e tamanho ficam salvos no navegador.
   * ========================================================== */
  const teV24Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    ensureSequenceMenu: TextExpressApp.prototype.ensureSequenceMenu,
    onDragEnd: TextExpressApp.prototype.onDragEnd
  });

  TextExpressApp.prototype.getManagedWindowConfig = function (scope) {
    if (scope === "sequence") {
      return {
        storageKey: STORAGE_KEYS.sequenceGeometry,
        minWidth: 330,
        minHeight: 250,
        margin: 8
      };
    }
    return {
      storageKey: STORAGE_KEYS.panelGeometry,
      minWidth: 520,
      minHeight: 430,
      margin: 8
    };
  };

  TextExpressApp.prototype.addResizeHandles = function (target, scope) {
    if (!target || target.dataset.teResizableReady === "true") return;
    target.dataset.teResizableReady = "true";
    target.classList.add("te-resizable-window");
    target.dataset.teManagedWindow = scope;

    for (const edge of ["n", "ne", "e", "se", "s", "sw", "w", "nw"]) {
      const handle = document.createElement("span");
      handle.className = `te-resize-handle te-resize-${edge}`;
      handle.dataset.teResizeEdge = edge;
      handle.setAttribute("aria-hidden", "true");
      handle.title = "Arraste para redimensionar";
      target.appendChild(handle);
    }

    target.addEventListener("pointerdown", (event) => {
      const handle = event.target.closest?.("[data-te-resize-edge]");
      if (!handle || handle.parentElement !== target) return;
      this.startManagedResize(target, scope, handle.dataset.teResizeEdge, event);
    }, true);
  };

  TextExpressApp.prototype.startManagedResize = function (target, scope, edge, event) {
    if (event.button !== 0 || !target || !edge) return;
    if (scope === "panel" && (target.classList.contains("te-fullscreen") || target.classList.contains("te-hidden"))) return;

    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    target.style.left = `${rect.left}px`;
    target.style.top = `${rect.top}px`;
    target.style.right = "auto";
    target.style.bottom = "auto";
    target.style.width = `${rect.width}px`;
    target.style.height = `${rect.height}px`;
    target.style.maxWidth = "none";
    target.style.maxHeight = "none";

    this.managedResizeState = {
      target,
      scope,
      edge,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom
    };

    target.classList.add("te-window-resizing");
    event.currentTarget?.setPointerCapture?.(event.pointerId);

    const move = (moveEvent) => this.moveManagedResize(moveEvent);
    const end = (endEvent) => {
      if (!this.managedResizeState || endEvent.pointerId !== this.managedResizeState.pointerId) return;
      document.removeEventListener("pointermove", move, true);
      document.removeEventListener("pointerup", end, true);
      document.removeEventListener("pointercancel", end, true);
      const state = this.managedResizeState;
      this.managedResizeState = null;
      state.target.classList.remove("te-window-resizing");
      this.saveManagedGeometry(state.target, state.scope);
    };

    document.addEventListener("pointermove", move, true);
    document.addEventListener("pointerup", end, true);
    document.addEventListener("pointercancel", end, true);
    event.preventDefault();
    event.stopPropagation();
  };

  TextExpressApp.prototype.moveManagedResize = function (event) {
    const state = this.managedResizeState;
    if (!state || event.pointerId !== state.pointerId) return;

    const config = this.getManagedWindowConfig(state.scope);
    const margin = config.margin;
    const viewportWidth = Math.max(1, window.innerWidth);
    const viewportHeight = Math.max(1, window.innerHeight);
    const minWidth = Math.min(config.minWidth, Math.max(180, viewportWidth - margin * 2));
    const minHeight = Math.min(config.minHeight, Math.max(160, viewportHeight - margin * 2));
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;

    let left = state.left;
    let right = state.right;
    let top = state.top;
    let bottom = state.bottom;

    if (state.edge.includes("w")) {
      left = Math.min(Math.max(margin, state.left + dx), right - minWidth);
    }
    if (state.edge.includes("e")) {
      right = Math.max(Math.min(viewportWidth - margin, state.right + dx), left + minWidth);
    }
    if (state.edge.includes("n")) {
      top = Math.min(Math.max(margin, state.top + dy), bottom - minHeight);
    }
    if (state.edge.includes("s")) {
      bottom = Math.max(Math.min(viewportHeight - margin, state.bottom + dy), top + minHeight);
    }

    state.target.style.left = `${Math.round(left)}px`;
    state.target.style.top = `${Math.round(top)}px`;
    state.target.style.width = `${Math.round(right - left)}px`;
    state.target.style.height = `${Math.round(bottom - top)}px`;
    event.preventDefault();
  };

  TextExpressApp.prototype.startManagedDrag = function (target, scope, event) {
    if (!target || !event) return;

    const isSequence = scope === "sequence";
    const allowedButton = event.button === 2 || (isSequence && event.button === 0);
    if (!allowedButton) return;
    if (event.target.closest?.("button, input, textarea, select, a, [data-te-resize-edge]")) return;
    if (scope === "panel" && (target.classList.contains("te-fullscreen") || target.classList.contains("te-hidden"))) return;

    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    event.preventDefault();
    event.stopPropagation();

    target.style.left = `${rect.left}px`;
    target.style.top = `${rect.top}px`;
    target.style.right = "auto";
    target.style.bottom = "auto";
    target.style.width = `${rect.width}px`;
    target.style.height = `${rect.height}px`;
    target.style.maxWidth = "none";
    target.style.maxHeight = "none";

    this.managedDragState = {
      target,
      scope,
      pointerId: event.pointerId,
      button: event.button,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };

    target.classList.add("te-window-moving");

    const blockContextMenu = (contextEvent) => {
      contextEvent.preventDefault();
      contextEvent.stopPropagation();
    };

    const move = (moveEvent) => {
      const state = this.managedDragState;
      if (!state || moveEvent.pointerId !== state.pointerId) return;
      const currentRect = state.target.getBoundingClientRect();
      const margin = this.getManagedWindowConfig(state.scope).margin;
      const maxLeft = Math.max(margin, window.innerWidth - currentRect.width - margin);
      const maxTop = Math.max(margin, window.innerHeight - currentRect.height - margin);
      const left = Math.min(Math.max(margin, moveEvent.clientX - state.offsetX), maxLeft);
      const top = Math.min(Math.max(margin, moveEvent.clientY - state.offsetY), maxTop);
      state.target.style.left = `${Math.round(left)}px`;
      state.target.style.top = `${Math.round(top)}px`;
      moveEvent.preventDefault();
      moveEvent.stopPropagation();
    };

    const finish = (endEvent) => {
      const state = this.managedDragState;
      if (!state || endEvent.pointerId !== state.pointerId) return;
      document.removeEventListener("pointermove", move, true);
      document.removeEventListener("pointerup", finish, true);
      document.removeEventListener("pointercancel", finish, true);
      document.removeEventListener("contextmenu", blockContextMenu, true);
      this.managedDragState = null;
      state.target.classList.remove("te-window-moving");
      this.saveManagedGeometry(state.target, state.scope);
      endEvent.preventDefault();
      endEvent.stopPropagation();
    };

    document.addEventListener("pointermove", move, true);
    document.addEventListener("pointerup", finish, true);
    document.addEventListener("pointercancel", finish, true);
    document.addEventListener("contextmenu", blockContextMenu, true);
  };

  TextExpressApp.prototype.saveManagedGeometry = function (target, scope) {
    if (!target || target.classList.contains("te-hidden")) return;
    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const geometry = {
      left: Math.round(rect.left),
      top: Math.round(rect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    };
    this.storageSet(this.getManagedWindowConfig(scope).storageKey, JSON.stringify(geometry));
    if (scope === "panel") {
      this.storageSet(STORAGE_KEYS.position, JSON.stringify({ left: geometry.left, top: geometry.top }));
    }
  };

  TextExpressApp.prototype.restoreManagedGeometry = function (target, scope) {
    if (!target) return false;
    const saved = this.storageGet(this.getManagedWindowConfig(scope).storageKey);
    if (!saved) return false;

    try {
      const geometry = JSON.parse(saved);
      if (![geometry.left, geometry.top, geometry.width, geometry.height].every(Number.isFinite)) return false;
      const config = this.getManagedWindowConfig(scope);
      const maxWidth = Math.max(180, window.innerWidth - config.margin * 2);
      const maxHeight = Math.max(160, window.innerHeight - config.margin * 2);
      const minWidth = Math.min(config.minWidth, maxWidth);
      const minHeight = Math.min(config.minHeight, maxHeight);
      const width = Math.min(Math.max(minWidth, geometry.width), maxWidth);
      const height = Math.min(Math.max(minHeight, geometry.height), maxHeight);
      const left = Math.min(Math.max(config.margin, geometry.left), Math.max(config.margin, window.innerWidth - width - config.margin));
      const top = Math.min(Math.max(config.margin, geometry.top), Math.max(config.margin, window.innerHeight - height - config.margin));

      target.style.left = `${Math.round(left)}px`;
      target.style.top = `${Math.round(top)}px`;
      target.style.right = "auto";
      target.style.bottom = "auto";
      target.style.width = `${Math.round(width)}px`;
      target.style.height = `${Math.round(height)}px`;
      target.style.maxWidth = "none";
      target.style.maxHeight = "none";
      return true;
    } catch (error) {
      return false;
    }
  };

  TextExpressApp.prototype.constrainManagedWindow = function (target, scope) {
    if (!target || target.classList.contains("te-hidden")) return;
    if (!target.style.left && !target.style.top && !target.style.width && !target.style.height) return;
    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const config = this.getManagedWindowConfig(scope);
    const maxWidth = Math.max(180, window.innerWidth - config.margin * 2);
    const maxHeight = Math.max(160, window.innerHeight - config.margin * 2);
    const width = Math.min(rect.width, maxWidth);
    const height = Math.min(rect.height, maxHeight);
    const left = Math.min(Math.max(config.margin, rect.left), Math.max(config.margin, window.innerWidth - width - config.margin));
    const top = Math.min(Math.max(config.margin, rect.top), Math.max(config.margin, window.innerHeight - height - config.margin));
    target.style.left = `${Math.round(left)}px`;
    target.style.top = `${Math.round(top)}px`;
    target.style.right = "auto";
    target.style.bottom = "auto";
    target.style.width = `${Math.round(width)}px`;
    target.style.height = `${Math.round(height)}px`;
    target.style.maxWidth = "none";
    target.style.maxHeight = "none";
  };

  TextExpressApp.prototype.setupManagedWindow = function (target, scope, dragHandle) {
    if (!target) return;
    this.addResizeHandles(target, scope);
    if (target.dataset.teManagedInteractions !== "true") {
      target.dataset.teManagedInteractions = "true";
      if (dragHandle) {
        dragHandle.classList.add("te-right-drag-handle");
        dragHandle.title = scope === "sequence"
          ? "Arraste este cabeçalho com o botão esquerdo ou direito para mover a sequência"
          : "Arraste para mover. Também funciona com o botão direito";
        dragHandle.addEventListener("contextmenu", (event) => {
          if (event.target.closest?.("button, input, textarea, select, a")) return;
          event.preventDefault();
          event.stopPropagation();
        }, true);
        dragHandle.addEventListener("dragstart", (event) => event.preventDefault(), true);
        dragHandle.addEventListener("pointerdown", (event) => {
          const canStart = event.button === 2 || (scope === "sequence" && event.button === 0);
          if (canStart) this.startManagedDrag(target, scope, event);
        }, true);
      }
    }
    this.restoreManagedGeometry(target, scope);
  };

  TextExpressApp.prototype.ensureSequenceMenu = function () {
    const menu = teV24Original.ensureSequenceMenu.call(this);
    this.setupManagedWindow(menu, "sequence", menu?.querySelector(".te-sequence-menu-header"));
    return menu;
  };

  TextExpressApp.prototype.onDragEnd = function (event) {
    const wasDragging = Boolean(this.dragState && event.pointerId === this.dragState.pointerId);
    const result = teV24Original.onDragEnd.call(this, event);
    if (wasDragging) this.saveManagedGeometry(this.panel, "panel");
    return result;
  };

  TextExpressApp.prototype.init = function () {
    this.managedDragState = null;
    this.managedResizeState = null;
    const result = teV24Original.init.call(this);
    this.setupManagedWindow(this.panel, "panel", this.root.querySelector("[data-te-drag-handle]"));
    this.ensureSequenceMenu();
    this.root.dataset.version = APP_VERSION;

    if (!this.managedWindowResizeListener) {
      this.managedWindowResizeListener = () => {
        this.constrainManagedWindow(this.panel, "panel");
        this.constrainManagedWindow(this.sequenceMenu, "sequence");
      };
      window.addEventListener("resize", this.managedWindowResizeListener);
    }
    return result;
  };


  /* ==========================================================
   * Text Express 26.0 — fluxo de Atendimento e abertura em Protocolo
   * - novas ativações começam na área Protocolo;
   * - ABRIR SEQUÊNCIA recolhe o painel principal para o ícone;
   * - o ícone flutuante restaura o painel sem fechar a sequência;
   * - ao restaurar ou mover janelas, a sequência evita sobreposição;
   * - a cópia de uma fala exibe confirmação curta e discreta.
   * ========================================================== */
  const teV26Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    openApp: TextExpressApp.prototype.openApp,
    handleRootClick: TextExpressApp.prototype.handleRootClick,
    insertSequenceStep: TextExpressApp.prototype.insertSequenceStep,
    saveManagedGeometry: TextExpressApp.prototype.saveManagedGeometry
  });

  TextExpressApp.prototype.rectanglesOverlap = function (first, second, gap = 0) {
    if (!first || !second) return false;
    return !(
      first.right + gap <= second.left ||
      first.left >= second.right + gap ||
      first.bottom + gap <= second.top ||
      first.top >= second.bottom + gap
    );
  };

  TextExpressApp.prototype.avoidPanelSequenceOverlap = function () {
    if (this.teAvoidingWindowOverlap) return false;
    if (!this.panel || !this.sequenceMenu) return false;
    if (this.panel.classList.contains("te-hidden") || this.sequenceMenu.classList.contains("te-hidden")) return false;
    if (this.panel.classList.contains("te-fullscreen")) return false;

    const panelRect = this.panel.getBoundingClientRect();
    const sequenceRect = this.sequenceMenu.getBoundingClientRect();
    if (!panelRect.width || !panelRect.height || !sequenceRect.width || !sequenceRect.height) return false;
    if (!this.rectanglesOverlap(panelRect, sequenceRect, 10)) return false;

    const config = this.getManagedWindowConfig("sequence");
    const margin = Math.max(8, config.margin || 8);
    const gap = 12;
    const viewportWidth = Math.max(1, window.innerWidth);
    const viewportHeight = Math.max(1, window.innerHeight);
    const minWidth = Math.min(config.minWidth, Math.max(180, viewportWidth - margin * 2));
    const minHeight = Math.min(config.minHeight, Math.max(160, viewportHeight - margin * 2));

    const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
    const candidates = [];
    const addCandidate = (side, left, top, availableWidth, availableHeight) => {
      if (availableWidth < minWidth || availableHeight < minHeight) return;
      const width = Math.min(sequenceRect.width, availableWidth);
      const height = Math.min(sequenceRect.height, availableHeight);
      let nextLeft = left;
      let nextTop = top;

      if (side === "left" || side === "right") {
        nextTop = clamp(sequenceRect.top, margin, viewportHeight - height - margin);
      } else {
        nextLeft = clamp(sequenceRect.left, margin, viewportWidth - width - margin);
      }

      const movement = Math.hypot(nextLeft - sequenceRect.left, nextTop - sequenceRect.top);
      const retainedArea = width * height;
      candidates.push({ left: nextLeft, top: nextTop, width, height, score: retainedArea - movement * 30 });
    };

    addCandidate(
      "left",
      margin,
      sequenceRect.top,
      Math.max(0, panelRect.left - gap - margin),
      viewportHeight - margin * 2
    );
    addCandidate(
      "right",
      panelRect.right + gap,
      sequenceRect.top,
      Math.max(0, viewportWidth - panelRect.right - gap - margin),
      viewportHeight - margin * 2
    );
    addCandidate(
      "top",
      sequenceRect.left,
      margin,
      viewportWidth - margin * 2,
      Math.max(0, panelRect.top - gap - margin)
    );
    addCandidate(
      "bottom",
      sequenceRect.left,
      panelRect.bottom + gap,
      viewportWidth - margin * 2,
      Math.max(0, viewportHeight - panelRect.bottom - gap - margin)
    );

    if (!candidates.length) return false;
    candidates.sort((first, second) => second.score - first.score);
    const best = candidates[0];

    this.teAvoidingWindowOverlap = true;
    this.sequenceMenu.style.left = `${Math.round(best.left)}px`;
    this.sequenceMenu.style.top = `${Math.round(best.top)}px`;
    this.sequenceMenu.style.right = "auto";
    this.sequenceMenu.style.bottom = "auto";
    this.sequenceMenu.style.width = `${Math.round(best.width)}px`;
    this.sequenceMenu.style.height = `${Math.round(best.height)}px`;
    this.sequenceMenu.style.maxWidth = "none";
    this.sequenceMenu.style.maxHeight = "none";
    teV26Original.saveManagedGeometry.call(this, this.sequenceMenu, "sequence");
    this.teAvoidingWindowOverlap = false;
    return true;
  };

  TextExpressApp.prototype.openApp = function () {
    const result = teV26Original.openApp.call(this);
    if (this.isSequenceMenuOpen?.()) {
      window.requestAnimationFrame(() => this.avoidPanelSequenceOverlap());
    }
    return result;
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    const action = event.target.closest?.("[data-te-action]")?.dataset.teAction;
    const opensSequence = action === "sequence-open" || action === "flow-open";
    const result = teV26Original.handleRootClick.call(this, event);

    if (opensSequence && this.isSequenceMenuOpen?.()) {
      this.collapseToLauncher();
      window.requestAnimationFrame(() => this.constrainManagedWindow(this.sequenceMenu, "sequence"));
    }
    return result;
  };

  TextExpressApp.prototype.insertSequenceStep = async function (flowId, stepIndex, suppliedContext = null) {
    const flow = this.snippets.find((item) =>
      item.id === flowId && item.tipo === "atendimento" && item.modelo === "fluxo"
    );
    const step = flow?.etapas?.[stepIndex];
    if (!flow || !step) return false;

    const context = suppliedContext || this.captureInsertionContext(this.lastActiveElement, 0);
    const content = await this.processFlowStep(flow, step);
    if (content === null) {
      this.showToast("Inserção cancelada.");
      return false;
    }

    let inserted = false;
    if (context) inserted = this.applyInsertionContext(context, content);
    if (!inserted) {
      await this.copyText(content);
      this.showToast("Texto copiado.", "success", 1800);
    } else {
      this.showToast(`Pergunta ${stepIndex + 1} inserida.`, "success");
    }

    const state = this.getFlowState(flow);
    state.current = stepIndex;
    state.used.add(stepIndex);
    if (this.selectedId === flow.id) this.renderDetail(flow);
    if (this.activeSequenceId === flow.id) this.renderSequenceMenu();
    return inserted;
  };

  TextExpressApp.prototype.saveManagedGeometry = function (target, scope) {
    const result = teV26Original.saveManagedGeometry.call(this, target, scope);
    if (!this.teAvoidingWindowOverlap && this.isSequenceMenuOpen?.() && !this.panel?.classList.contains("te-hidden")) {
      window.requestAnimationFrame(() => this.avoidPanelSequenceOverlap());
    }
    return result;
  };

  TextExpressApp.prototype.init = function () {
    this.teAvoidingWindowOverlap = false;
    const result = teV26Original.init.call(this);

    /* Cada nova página/guia começa diretamente em Protocolo. */
    if (!this.uiState) this.uiState = this.getDefaultUiState();
    this.uiState.activeType = "protocolo";
    this.activeType = "protocolo";
    this.lastShortcutType = "protocolo";

    const requestedCategory = this.uiState.activeCategoryByType?.protocolo || "Todos";
    this.activeCategory = this.isUiCategoryValid?.("protocolo", requestedCategory)
      ? requestedCategory
      : "Todos";
    this.selectedId = this.uiState.selectedIdByView?.[
      this.getUiViewKey?.("protocolo", this.activeCategory) || `protocolo::${this.activeCategory}`
    ] || null;
    if (this.searchInput) this.searchInput.value = this.uiState.searchByType?.protocolo || "";

    this.render();
    this.restoreCurrentUiPositions?.();
    this.saveUiState?.();
    this.root.dataset.version = APP_VERSION;
    return result;
  };



  /* ==========================================================
   * Text Express — captura persistente do chat de Atendimento
   * Candidato de compatibilidade para a próxima versão.
   *
   * O listener delegado no document continua sendo a via normal.
   * Esta camada adicional atua somente quando o editor do chat:
   * - intercepta o keydown antes de ele alcançar o document;
   * - recria o campo dentro de Shadow DOM, inclusive fechado;
   * - move o editor para um iframe acessível da mesma origem;
   * - substitui repetidamente o DOM durante o atendimento.
   * ========================================================== */
  const teChatCompatibilityOriginal = Object.freeze({
    init: TextExpressApp.prototype.init
  });

  TextExpressApp.prototype.claimPersistentShortcutEvent = function (event) {
    if (!event || this.persistentShortcutHandledEvents.has(event)) return false;
    this.persistentShortcutHandledEvents.add(event);
    event.preventDefault?.();
    event.stopImmediatePropagation?.();
    event.stopPropagation?.();
    return true;
  };

  TextExpressApp.prototype.getDeepActiveEditable = function (sourceDocument = document) {
    let currentDocument = sourceDocument;
    const visited = new Set();

    try {
      while (currentDocument && !visited.has(currentDocument)) {
        visited.add(currentDocument);
        let active = currentDocument.activeElement;
        if (!active) return null;

        while (active) {
          const editable = this.getEditableRoot(active);
          if (editable) return editable;

          if (String(active.tagName || "").toLowerCase() === "iframe") {
            try {
              currentDocument = active.contentDocument;
              active = currentDocument?.activeElement || null;
              if (active) continue;
            } catch (error) {
              return null;
            }
          }

          const shadowActive = active.shadowRoot?.activeElement;
          if (shadowActive) {
            active = shadowActive;
            continue;
          }

          return null;
        }
      }
    } catch (error) {
      return null;
    }

    return null;
  };

  TextExpressApp.prototype.resolvePersistentShortcutEditable = function (event) {
    const eventEditable = this.getEditableFromEvent?.(event);
    if (eventEditable) return eventEditable;

    const eventDocument = event?.target?.ownerDocument
      || event?.view?.document
      || event?.currentTarget?.document
      || document;
    const activeEditable = this.getDeepActiveEditable(eventDocument);
    if (activeEditable) return activeEditable;

    if (
      this.lastActiveElement?.isConnected &&
      this.getEditableRoot(this.lastActiveElement)
    ) {
      return this.lastActiveElement;
    }

    return null;
  };

  TextExpressApp.prototype.onPersistentShortcutKeyDown = function (event) {
    if (
      !event ||
      this.persistentShortcutHandledEvents.has(event) ||
      event.isComposing ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey
    ) {
      return;
    }

    const editable = this.resolvePersistentShortcutEditable(event);
    if (!editable || this.root.contains(editable)) return;

    this.lastActiveElement = editable;
    this.captureContentEditableRange(editable);

    if (this.isSequenceMenuOpen?.()) {
      const flow = this.getActiveSequence?.();

      if (
        /^[1-9]$/.test(event.key) &&
        this.isEditableBlankForNumberSelection?.(editable)
      ) {
        const stepIndex = Number(event.key) - 1;
        if (flow?.etapas?.[stepIndex]) {
          const context = this.captureInsertionContext(editable, 0);
          if (!context || !this.claimPersistentShortcutEvent(event)) return;
          void this.insertSequenceStep(flow.id, stepIndex, context);
          return;
        }
      }

      const sequenceTrigger = this.getTriggerKey(event);
      if (sequenceTrigger) {
        const aliasMatch = this.findActiveSequenceKeywordBeforeCaret?.(
          editable,
          sequenceTrigger
        );
        if (aliasMatch) {
          const context = this.captureInsertionContext(
            editable,
            aliasMatch.shortcut.length
          );
          if (!context || !this.claimPersistentShortcutEvent(event)) return;
          void this.insertSequenceStep(
            aliasMatch.flow.id,
            aliasMatch.stepIndex,
            context
          );
          return;
        }
      }
    }

    if (!this.settings.autoExpand) return;
    const triggerKey = this.getTriggerKey(event);
    if (!triggerKey) return;

    const match = this.findShortcutBeforeCaret(editable, triggerKey);
    if (!match) return;

    const context = this.captureInsertionContext(
      editable,
      match.shortcut.length
    );
    if (!context || !this.claimPersistentShortcutEvent(event)) return;

    this.lastActiveElement = editable;
    void this.expandShortcut(match.snippet, context);
  };

  TextExpressApp.prototype.installPersistentShortcutTarget = function (target) {
    if (!target?.addEventListener || this.persistentShortcutTargets.has(target)) return;
    this.persistentShortcutTargets.add(target);
    target.addEventListener("keydown", this.onPersistentShortcutKeyDown, true);

    if (target.nodeType === 11) {
      target.addEventListener("focusin", this.onGlobalFocusIn, true);
      target.addEventListener("selectionchange", this.onSelectionChange, true);
    }
  };

  TextExpressApp.prototype.patchAttachShadowForWindow = function (targetWindow) {
    const prototype = targetWindow?.Element?.prototype;
    const current = prototype?.attachShadow;
    if (!prototype || typeof current !== "function") return;

    const installed = this.persistentAttachShadowPatches.get(prototype);
    if (installed && prototype.attachShadow === installed.wrapper) return;

    const app = this;
    const original = current;
    function attachShadow(init) {
      const shadowRoot = original.call(this, init);
      try {
        app.bridgePersistentCompatibilityRoot(shadowRoot);
      } catch (error) {
        // O componente continua funcionando mesmo se o bridge for bloqueado.
      }
      return shadowRoot;
    }

    try {
      Object.defineProperty(prototype, "attachShadow", {
        configurable: true,
        writable: true,
        value: attachShadow
      });
      this.persistentAttachShadowPatches.set(prototype, {
        original,
        wrapper: attachShadow
      });
    } catch (error) {
      // Alguns ambientes protegem o protótipo; os demais bridges permanecem.
    }
  };

  TextExpressApp.prototype.connectPersistentIframe = function (iframe) {
    if (!iframe || String(iframe.tagName || "").toLowerCase() !== "iframe") return;

    if (!this.persistentIframeLoadTargets.has(iframe)) {
      this.persistentIframeLoadTargets.add(iframe);
      iframe.addEventListener("load", () => {
        try {
          if (iframe.contentDocument) {
            this.bridgePersistentCompatibilityRoot(iframe.contentDocument);
          }
        } catch (error) {
          // Iframes de outra origem são isolados pelo navegador.
        }
      }, { passive: true });
    }

    try {
      if (iframe.contentDocument) {
        this.bridgePersistentCompatibilityRoot(iframe.contentDocument);
      }
    } catch (error) {
      // Iframes de outra origem são isolados pelo navegador.
    }
  };

  TextExpressApp.prototype.scanPersistentCompatibilityNodeContents = function (rootNode) {
    if (!rootNode?.querySelectorAll) return;

    for (const iframe of rootNode.querySelectorAll("iframe")) {
      this.connectPersistentIframe(iframe);
    }

    for (const element of rootNode.querySelectorAll("*")) {
      if (element.shadowRoot) {
        this.bridgePersistentCompatibilityRoot(element.shadowRoot);
      }
    }
  };

  TextExpressApp.prototype.scanPersistentCompatibilityNode = function (node) {
    if (!node) return;

    if (node.nodeType === 9 || node.nodeType === 11) {
      this.bridgePersistentCompatibilityRoot(node);
    }

    if (node.nodeType !== 1 && node.nodeType !== 9 && node.nodeType !== 11) return;

    if (String(node.tagName || "").toLowerCase() === "iframe") {
      this.connectPersistentIframe(node);
    }

    if (node.shadowRoot) {
      this.bridgePersistentCompatibilityRoot(node.shadowRoot);
    }

    this.scanPersistentCompatibilityNodeContents(node);
  };

  TextExpressApp.prototype.observePersistentCompatibilityRoot = function (rootNode) {
    if (!rootNode || this.persistentCompatibilityObserverRecords.has(rootNode)) return;

    const ownerDocument = rootNode.nodeType === 9 ? rootNode : rootNode.ownerDocument;
    const Observer = ownerDocument?.defaultView?.MutationObserver || MutationObserver;
    const observeTarget = rootNode.nodeType === 9 ? rootNode.documentElement : rootNode;
    if (!Observer || !observeTarget) return;

    try {
      const observer = new Observer((records) => {
        for (const record of records) {
          for (const addedNode of record.addedNodes || []) {
            this.scanPersistentCompatibilityNode(addedNode);
          }
        }
      });
      observer.observe(observeTarget, { childList: true, subtree: true });
      this.persistentCompatibilityObserverRecords.set(rootNode, observer);
    } catch (error) {
      // O health check periódico ainda cobre documentos acessíveis.
    }
  };

  TextExpressApp.prototype.bridgePersistentCompatibilityRoot = function (rootNode) {
    if (!rootNode) return;

    const ownerDocument = rootNode.nodeType === 9 ? rootNode : rootNode.ownerDocument;
    const ownerWindow = ownerDocument?.defaultView;

    if (ownerWindow) {
      this.installPersistentShortcutTarget(ownerWindow);
      this.patchAttachShadowForWindow(ownerWindow);
      this.persistentCompatibilityDocuments.add(ownerDocument);
    }

    if (rootNode.nodeType === 11) {
      this.installPersistentShortcutTarget(rootNode);
    }

    this.observePersistentCompatibilityRoot(rootNode);
    this.scanPersistentCompatibilityNodeContents(rootNode);
  };

  TextExpressApp.prototype.isPersistentCompatibilityRootAlive = function (rootNode) {
    if (!rootNode) return false;

    if (rootNode.nodeType === 9) {
      if (rootNode === document) return true;
      try {
        const ownerWindow = rootNode.defaultView;
        return Boolean(
          ownerWindow &&
          ownerWindow.document === rootNode &&
          ownerWindow.frameElement?.isConnected
        );
      } catch (error) {
        return false;
      }
    }

    if (rootNode.nodeType === 11 && rootNode.host) {
      return Boolean(rootNode.host.isConnected);
    }

    return Boolean(rootNode.isConnected);
  };

  TextExpressApp.prototype.prunePersistentCompatibilityRoots = function () {
    for (const [rootNode, observer] of this.persistentCompatibilityObserverRecords) {
      if (this.isPersistentCompatibilityRootAlive(rootNode)) continue;
      observer.disconnect?.();
      this.persistentCompatibilityObserverRecords.delete(rootNode);
      if (rootNode.nodeType === 9) {
        this.persistentCompatibilityDocuments.delete(rootNode);
      }
    }
  };

  TextExpressApp.prototype.runPersistentShortcutHealthCheck = function () {
    this.prunePersistentCompatibilityRoots();

    for (const compatibleDocument of [...this.persistentCompatibilityDocuments]) {
      try {
        if (!compatibleDocument?.documentElement) continue;
        const compatibleWindow = compatibleDocument.defaultView;
        this.installPersistentShortcutTarget(compatibleWindow);
        this.patchAttachShadowForWindow(compatibleWindow);

        for (const iframe of compatibleDocument.querySelectorAll("iframe")) {
          this.connectPersistentIframe(iframe);
        }

        let active = compatibleDocument.activeElement;
        while (active) {
          if (active.shadowRoot) {
            this.bridgePersistentCompatibilityRoot(active.shadowRoot);
            active = active.shadowRoot.activeElement;
            continue;
          }
          break;
        }
      } catch (error) {
        this.persistentCompatibilityDocuments.delete(compatibleDocument);
      }
    }
  };

  TextExpressApp.prototype.setupPersistentShortcutCapture = function () {
    if (this.persistentShortcutCaptureReady) return;
    this.persistentShortcutCaptureReady = true;

    this.persistentShortcutHandledEvents = new WeakSet();
    this.persistentShortcutTargets = new WeakSet();
    this.persistentIframeLoadTargets = new WeakSet();
    this.persistentAttachShadowPatches = new WeakMap();
    this.persistentCompatibilityObserverRecords = new Map();
    this.persistentCompatibilityDocuments = new Set();
    this.onPersistentShortcutKeyDown = this.onPersistentShortcutKeyDown.bind(this);

    this.bridgePersistentCompatibilityRoot(document);

    this.persistentShortcutHealthTimer = window.setInterval(
      () => this.runPersistentShortcutHealthCheck(),
      2500
    );

    window.addEventListener("focus", () => this.runPersistentShortcutHealthCheck(), true);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) this.runPersistentShortcutHealthCheck();
    }, true);
    window.addEventListener("pagehide", () => {
      if (this.persistentShortcutHealthTimer) {
        window.clearInterval(this.persistentShortcutHealthTimer);
        this.persistentShortcutHealthTimer = null;
      }
    }, { once: true });
  };

  TextExpressApp.prototype.init = function () {
    this.setupPersistentShortcutCapture();
    const result = teChatCompatibilityOriginal.init.call(this);
    this.runPersistentShortcutHealthCheck();
    return result;
  };

  /* ==========================================================
   * Text Express 27.0 — Fluxos opcionais na área de Protocolos
   * - reutiliza o menu, a pesquisa e a navegação das Sequências;
   * - mantém protocolos comuns com inserção imediata;
   * - permite inserir texto, abrir outro fluxo, abrir uma sequência,
   *   abrir um endereço externo ou executar uma ação registrada;
   * - suporta fluxos encadeados com navegação de retorno.
   * ========================================================== */
  const TE_V27_FLOW_ACTIONS = Object.freeze({
    INSERT: "inserir",
    FLOW: "fluxo",
    SEQUENCE: "sequencia",
    URL: "url",
    CUSTOM: "personalizada"
  });

  const TE_V27_ALLOWED_FLOW_ACTIONS = new Set(Object.values(TE_V27_FLOW_ACTIONS));

  const teV27Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    normalizeFlowStep: TextExpressApp.prototype.normalizeFlowStep,
    normalizeSnippet: TextExpressApp.prototype.normalizeSnippet,
    getSnippetShortcutValues: TextExpressApp.prototype.getSnippetShortcutValues,
    ensureUniqueSnippetShortcuts: TextExpressApp.prototype.ensureUniqueSnippetShortcuts,
    createShortcutEntry: TextExpressApp.prototype.createShortcutEntry,
    rebuildShortcutMap: TextExpressApp.prototype.rebuildShortcutMap,
    openModal: TextExpressApp.prototype.openModal,
    closeModal: TextExpressApp.prototype.closeModal,
    updateModelKindUI: TextExpressApp.prototype.updateModelKindUI,
    renderFlowEditorSteps: TextExpressApp.prototype.renderFlowEditorSteps,
    syncEditingFlowSteps: TextExpressApp.prototype.syncEditingFlowSteps,
    addFlowEditorStep: TextExpressApp.prototype.addFlowEditorStep,
    removeFlowEditorStep: TextExpressApp.prototype.removeFlowEditorStep,
    updateFlowVariablePreview: TextExpressApp.prototype.updateFlowVariablePreview,
    collectSnippetFromForm: TextExpressApp.prototype.collectSnippetFromForm,
    renderCard: TextExpressApp.prototype.renderCard,
    renderFlowDetail: TextExpressApp.prototype.renderFlowDetail,
    handleRootClick: TextExpressApp.prototype.handleRootClick,
    handleRootChange: TextExpressApp.prototype.handleRootChange,
    handleRootInput: TextExpressApp.prototype.handleRootInput,
    getActiveSequence: TextExpressApp.prototype.getActiveSequence,
    ensureSequenceMenu: TextExpressApp.prototype.ensureSequenceMenu,
    renderSequenceMenu: TextExpressApp.prototype.renderSequenceMenu,
    openSequenceMenu: TextExpressApp.prototype.openSequenceMenu,
    closeSequenceMenu: TextExpressApp.prototype.closeSequenceMenu,
    insertSnippet: TextExpressApp.prototype.insertSnippet,
    copySnippet: TextExpressApp.prototype.copySnippet,
    insertSequenceStep: TextExpressApp.prototype.insertSequenceStep,
    insertFlowStep: TextExpressApp.prototype.insertFlowStep,
    expandShortcut: TextExpressApp.prototype.expandShortcut,
    resetFlow: TextExpressApp.prototype.resetFlow,
    updateCount: TextExpressApp.prototype.updateCount
  });

  TextExpressApp.prototype.getFlowActionType = function (raw = {}) {
    const rawAction = raw && typeof raw.acao === "object" ? raw.acao : {};
    const candidate = String(
      raw.acaoTipo ??
      raw.actionType ??
      raw.tipoAcao ??
      rawAction.tipo ??
      (typeof raw.acao === "string" ? raw.acao : "") ??
      TE_V27_FLOW_ACTIONS.INSERT
    ).trim().toLowerCase();

    const aliases = {
      insert: TE_V27_FLOW_ACTIONS.INSERT,
      inserir_texto: TE_V27_FLOW_ACTIONS.INSERT,
      texto: TE_V27_FLOW_ACTIONS.INSERT,
      flow: TE_V27_FLOW_ACTIONS.FLOW,
      abrir_fluxo: TE_V27_FLOW_ACTIONS.FLOW,
      sequence: TE_V27_FLOW_ACTIONS.SEQUENCE,
      abrir_sequencia: TE_V27_FLOW_ACTIONS.SEQUENCE,
      link: TE_V27_FLOW_ACTIONS.URL,
      abrir_url: TE_V27_FLOW_ACTIONS.URL,
      external: TE_V27_FLOW_ACTIONS.URL,
      custom: TE_V27_FLOW_ACTIONS.CUSTOM,
      acao_personalizada: TE_V27_FLOW_ACTIONS.CUSTOM
    };

    const normalized = aliases[candidate] || candidate;
    return TE_V27_ALLOWED_FLOW_ACTIONS.has(normalized)
      ? normalized
      : TE_V27_FLOW_ACTIONS.INSERT;
  };

  TextExpressApp.prototype.normalizeFlowStep = function (raw = {}, index = 0, parentShortcut = "/fluxo") {
    const step = teV27Original.normalizeFlowStep.call(this, raw, index, parentShortcut);
    const rawAction = raw && typeof raw.acao === "object" ? raw.acao : {};

    step.acaoTipo = this.getFlowActionType(raw);
    step.acaoAlvoId = String(
      raw.acaoAlvoId ?? raw.targetId ?? raw.alvoId ?? rawAction.alvoId ?? rawAction.targetId ?? ""
    ).trim().slice(0, 160);
    step.acaoUrl = String(
      raw.acaoUrl ?? raw.url ?? rawAction.url ?? ""
    ).trim().slice(0, 2000);
    step.acaoPersonalizada = String(
      raw.acaoPersonalizada ?? raw.customAction ?? raw.actionKey ?? rawAction.chave ?? rawAction.key ?? ""
    ).trim().slice(0, 120);

    return step;
  };

  TextExpressApp.prototype.describeFlowStepAction = function (step, options = {}) {
    const includeTargetName = options.includeTargetName !== false;
    const type = this.getFlowActionType(step);

    if (type === TE_V27_FLOW_ACTIONS.INSERT) {
      return step.conteudo || "Inserir texto no campo ativo";
    }

    if (type === TE_V27_FLOW_ACTIONS.URL) {
      return step.acaoUrl ? `Abrir ${step.acaoUrl}` : "Abrir atendimento externo";
    }

    if (type === TE_V27_FLOW_ACTIONS.CUSTOM) {
      return step.acaoPersonalizada
        ? `Executar ação “${step.acaoPersonalizada}”`
        : "Executar ação personalizada";
    }

    const target = this.snippets?.find((item) => item.id === step.acaoAlvoId);
    const targetName = includeTargetName && target?.nome ? ` “${target.nome}”` : "";
    if (type === TE_V27_FLOW_ACTIONS.FLOW) return `Abrir outro fluxo${targetName}`;
    if (type === TE_V27_FLOW_ACTIONS.SEQUENCE) return `Abrir sequência${targetName}`;
    return "Executar opção";
  };

  TextExpressApp.prototype.getFlowActionIcon = function (step) {
    const type = this.getFlowActionType(step);
    if (type === TE_V27_FLOW_ACTIONS.FLOW) return "clipboard-list";
    if (type === TE_V27_FLOW_ACTIONS.SEQUENCE) return "play-circle";
    if (type === TE_V27_FLOW_ACTIONS.URL) return "globe";
    if (type === TE_V27_FLOW_ACTIONS.CUSTOM) return "zap";
    return "send";
  };

  TextExpressApp.prototype.getFlowActionLabel = function (step) {
    const type = this.getFlowActionType(step);
    if (type === TE_V27_FLOW_ACTIONS.FLOW) return "Outro fluxo";
    if (type === TE_V27_FLOW_ACTIONS.SEQUENCE) return "Sequência";
    if (type === TE_V27_FLOW_ACTIONS.URL) return "Atendimento externo";
    if (type === TE_V27_FLOW_ACTIONS.CUSTOM) return "Ação personalizada";
    return "Inserir texto";
  };

  TextExpressApp.prototype.normalizeSnippet = function (raw = {}) {
    const tipo = raw.tipo === "protocolo" ? "protocolo" : "atendimento";
    const isProtocolFlow = tipo === "protocolo" && raw.modelo === "fluxo" && Array.isArray(raw.etapas);

    if (!isProtocolFlow) return teV27Original.normalizeSnippet.call(this, raw);

    const parentShortcut = this.normalizeShortcut(
      raw.atalho || raw.shortcut || this.suggestShortcutFromName(raw.nome || "fluxo")
    );
    const etapas = raw.etapas
      .map((step, index) => this.normalizeFlowStep(step, index, parentShortcut))
      .filter((step) => step.nome);
    const joinedContent = etapas
      .map((step) => step.conteudo || this.describeFlowStepAction(step, { includeTargetName: false }))
      .filter(Boolean)
      .join("\n\n");

    const base = teV5Original.normalizeSnippet.call(this, {
      ...raw,
      tipo: "protocolo",
      conteudo: joinedContent || String(raw.conteudo || "Fluxo de protocolo")
    });

    base.modelo = "fluxo";
    base.atalho = parentShortcut;
    base.etapas = etapas;
    base.conteudo = joinedContent || "Fluxo de protocolo";
    base.variaveis = [...new Set(etapas.flatMap((step) => step.variaveis || []))];
    base.updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : "";
    base.revision = Number.isFinite(Number(raw.revision)) ? Number(raw.revision) : 0;

    const reserved = new Set([this.normalizeShortcut(base.atalho)]);
    for (const step of base.etapas) reserved.add(this.normalizeShortcut(step.atalho));
    const aliasesUsed = new Set();
    base.etapas = base.etapas.map((step) => {
      const aliases = this.parseSequenceKeywords(step.palavrasChave || []);
      step.palavrasChave = aliases.filter((keyword) => {
        if (reserved.has(keyword) || aliasesUsed.has(keyword)) return false;
        aliasesUsed.add(keyword);
        return true;
      });
      return step;
    });

    return base;
  };

  TextExpressApp.prototype.getSnippetShortcutValues = function (snippet) {
    if (!snippet) return [];
    const values = [];
    if (snippet.atalho) values.push(this.normalizeShortcut(snippet.atalho));
    if (snippet.modelo === "fluxo" && Array.isArray(snippet.etapas)) {
      for (const step of snippet.etapas) {
        if (step?.atalho) values.push(this.normalizeShortcut(step.atalho));
      }
    }
    return values;
  };

  TextExpressApp.prototype.ensureUniqueSnippetShortcuts = function (snippet, usedShortcuts) {
    const used = usedShortcuts || new Set();
    const originalParent = snippet.atalho;
    snippet.atalho = this.makeUniqueShortcut(snippet.atalho, used);
    used.add(snippet.atalho);
    let renamed = snippet.atalho !== originalParent ? 1 : 0;

    if (snippet.modelo === "fluxo" && Array.isArray(snippet.etapas)) {
      snippet.etapas = snippet.etapas.map((step, index) => {
        const normalizedStep = this.normalizeFlowStep(step, index, snippet.atalho);
        const originalStep = normalizedStep.atalho;
        normalizedStep.atalho = this.makeUniqueShortcut(normalizedStep.atalho, used);
        used.add(normalizedStep.atalho);
        if (normalizedStep.atalho !== originalStep) renamed += 1;
        return normalizedStep;
      });
      snippet.conteudo = snippet.etapas
        .map((step) => step.conteudo || this.describeFlowStepAction(step, { includeTargetName: false }))
        .join("\n\n");
      snippet.variaveis = [...new Set(snippet.etapas.flatMap((step) => step.variaveis || []))];
    }

    return renamed;
  };

  TextExpressApp.prototype.createShortcutEntry = function (snippet, step = null, stepIndex = -1) {
    if (step) {
      return {
        kind: "flow-step",
        snippet,
        step,
        stepIndex,
        triggerKey: step.triggerKey
      };
    }
    if (snippet.modelo === "fluxo") {
      return {
        kind: "flow",
        snippet,
        triggerKey: snippet.triggerKey
      };
    }
    return teV27Original.createShortcutEntry.call(this, snippet, step, stepIndex);
  };

  TextExpressApp.prototype.rebuildShortcutMap = function () {
    this.shortcutMapsByType = {
      atendimento: new Map(),
      protocolo: new Map()
    };

    for (const snippet of this.snippets) {
      if (!snippet.ativo || !snippet.atalho) continue;
      const map = this.shortcutMapsByType[snippet.tipo];
      if (!map) continue;

      map.set(this.normalizeShortcut(snippet.atalho), this.createShortcutEntry(snippet));
      if (snippet.modelo === "fluxo") {
        (snippet.etapas || []).forEach((step, index) => {
          if (!step.atalho) return;
          map.set(
            this.normalizeShortcut(step.atalho),
            this.createShortcutEntry(snippet, step, index)
          );
        });
      }
    }

    const scope = this.getShortcutScopeType?.() || "atendimento";
    this.shortcutMap = this.shortcutMapsByType[scope] || new Map();
  };

  TextExpressApp.prototype.getFlowEditorType = function () {
    return this.root.querySelector('input[name="te-type"]:checked')?.value === "protocolo"
      ? "protocolo"
      : "atendimento";
  };

  TextExpressApp.prototype.getProtocolFlowTargets = function () {
    return this.snippets
      .filter((item) => item.tipo === "protocolo" && item.modelo === "fluxo" && item.id !== this.editingId)
      .sort((first, second) => first.nome.localeCompare(second.nome, "pt-BR"));
  };

  TextExpressApp.prototype.getAttendanceSequenceTargets = function () {
    return this.snippets
      .filter((item) => item.tipo === "atendimento" && item.modelo === "fluxo")
      .sort((first, second) => first.nome.localeCompare(second.nome, "pt-BR"));
  };

  TextExpressApp.prototype.renderFlowTargetOptions = function (targets, selectedId, placeholder) {
    const exists = targets.some((item) => item.id === selectedId);
    const unavailable = selectedId && !exists
      ? `<option value="${this.escapeAttr(selectedId)}" selected>Destino indisponível</option>`
      : "";
    return `<option value="">${this.escapeHtml(placeholder)}</option>${unavailable}${targets.map((item) => `
      <option value="${this.escapeAttr(item.id)}" ${item.id === selectedId ? "selected" : ""}>${this.escapeHtml(item.nome)} (${this.escapeHtml(item.atalho)})</option>`).join("")}`;
  };

  TextExpressApp.prototype.openModal = function (data = null) {
    teV27Original.openModal.call(this, data);
    const isFlow = data?.modelo === "fluxo";
    if (isFlow) {
      this.editingFlowSteps = (data.etapas || []).map((step, index) =>
        this.normalizeFlowStep(step, index, data.atalho)
      );
      this.root.querySelectorAll('input[name="te-model-kind"]').forEach((input) => {
        input.checked = input.value === "fluxo";
      });
      this.renderFlowEditorSteps();
      this.updateModelKindUI();
    }
  };

  TextExpressApp.prototype.updateModelKindUI = function () {
    const type = this.getFlowEditorType();
    const kindSelector = this.root.querySelector("#te-model-kind-selector");
    const singleWrap = this.root.querySelector("#te-single-content-wrap");
    const flowEditor = this.root.querySelector("#te-flow-editor");
    const kind = this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico";
    const isFlow = kind === "fluxo";

    kindSelector?.classList.remove("te-hidden");
    singleWrap?.classList.toggle("te-hidden", isFlow);
    flowEditor?.classList.toggle("te-hidden", !isFlow);

    const legend = this.root.querySelector("#te-model-kind-legend");
    const uniqueLabel = this.root.querySelector('[data-te-kind-label="unico"]');
    const flowLabel = this.root.querySelector('[data-te-kind-label="fluxo"]');
    if (legend) legend.textContent = type === "protocolo" ? "Formato do protocolo" : "Formato do atendimento";
    if (uniqueLabel) uniqueLabel.textContent = type === "protocolo" ? "Protocolo comum" : "Fala única";
    if (flowLabel) flowLabel.textContent = type === "protocolo" ? "Fluxo de protocolo" : "Sequência de falas";

    const heading = this.root.querySelector("#te-flow-editor-title");
    const help = this.root.querySelector("#te-flow-editor-help");
    const addLabel = this.root.querySelector("#te-flow-add-label");
    if (heading) heading.textContent = type === "protocolo" ? "Opções do fluxo" : "Falas da sequência";
    if (help) {
      help.textContent = type === "protocolo"
        ? "O atalho principal ou o botão Inserir abre o menu. Cada opção pode executar uma ação diferente."
        : "O atalho principal abre a sequência. Os atalhos numerados inserem uma fala diretamente.";
    }
    if (addLabel) addLabel.textContent = type === "protocolo" ? "Adicionar opção" : "Adicionar fala";

    if (isFlow && this.editingFlowSteps.length < 2) {
      const baseShortcut = this.root.querySelector("#te-form-shortcut")?.value || "/fluxo";
      while (this.editingFlowSteps.length < 2) {
        const index = this.editingFlowSteps.length;
        this.editingFlowSteps.push(this.normalizeFlowStep({
          nome: type === "protocolo" ? `Opção ${index + 1}` : `Fala ${index + 1}`,
          atalho: `${this.normalizeShortcut(baseShortcut)}${index + 1}`,
          conteudo: "",
          acaoTipo: TE_V27_FLOW_ACTIONS.INSERT
        }, index, baseShortcut));
      }
      this.renderFlowEditorSteps();
    }

    const title = this.root.querySelector("#te-modal-title");
    if (!this.editingId && title) {
      title.textContent = isFlow
        ? type === "protocolo" ? "Criar fluxo de protocolo" : "Criar sequência de falas"
        : "Criar modelo";
    }
    this.updateFlowVariablePreview();
  };

  TextExpressApp.prototype.renderFlowEditorSteps = function () {
    const type = this.getFlowEditorType();
    if (type !== "protocolo") return teV27Original.renderFlowEditorSteps.call(this);

    const container = this.root.querySelector("#te-flow-editor-steps");
    if (!container) return;
    const flowTargets = this.getProtocolFlowTargets();
    const sequenceTargets = this.getAttendanceSequenceTargets();

    container.innerHTML = this.editingFlowSteps.map((step, index) => {
      const actionType = this.getFlowActionType(step);
      const isInsert = actionType === TE_V27_FLOW_ACTIONS.INSERT;
      const isFlow = actionType === TE_V27_FLOW_ACTIONS.FLOW;
      const isSequence = actionType === TE_V27_FLOW_ACTIONS.SEQUENCE;
      const isUrl = actionType === TE_V27_FLOW_ACTIONS.URL;
      const isCustom = actionType === TE_V27_FLOW_ACTIONS.CUSTOM;
      return `
        <article class="te-flow-step-editor te-protocol-flow-step-editor" data-te-flow-editor-index="${index}">
          <header>
            <span class="te-flow-step-editor-number">${index + 1}</span>
            <strong>Opção ${index + 1}</strong>
            <div class="te-flow-editor-actions">
              <button class="te-icon-action" type="button" data-te-action="flow-editor-up" data-te-step-index="${index}" title="Mover para cima" ${index === 0 ? "disabled" : ""}>${this.icon("chevron-left")}</button>
              <button class="te-icon-action" type="button" data-te-action="flow-editor-down" data-te-step-index="${index}" title="Mover para baixo" ${index === this.editingFlowSteps.length - 1 ? "disabled" : ""}>${this.icon("chevron-right")}</button>
              <button class="te-icon-action te-delete" type="button" data-te-action="flow-editor-remove" data-te-step-index="${index}" title="Excluir opção">${this.icon("trash")}</button>
            </div>
          </header>
          <div class="te-flow-step-editor-grid">
            <label>
              <span>Nome da opção</span>
              <input type="text" data-te-flow-field="nome" maxlength="100" value="${this.escapeAttr(step.nome)}" placeholder="Ex.: Inserção normal">
            </label>
            <label>
              <span>Atalho direto</span>
              <input type="text" data-te-flow-field="atalho" maxlength="60" value="${this.escapeAttr(step.atalho)}" spellcheck="false" placeholder="/fluxo${index + 1}">
            </label>
            <label>
              <span>Ativar com</span>
              <select data-te-flow-field="triggerKey">
                <option value="space" ${step.triggerKey === "space" ? "selected" : ""}>Espaço</option>
                <option value="tab" ${step.triggerKey === "tab" ? "selected" : ""}>Tab</option>
                <option value="enter" ${step.triggerKey === "enter" ? "selected" : ""}>Enter</option>
              </select>
            </label>
            <label>
              <span>Ação executada</span>
              <select data-te-flow-field="acaoTipo">
                <option value="inserir" ${isInsert ? "selected" : ""}>Inserir um script</option>
                <option value="fluxo" ${isFlow ? "selected" : ""}>Abrir outro fluxo</option>
                <option value="sequencia" ${isSequence ? "selected" : ""}>Abrir sequência do Atendimento</option>
                <option value="url" ${isUrl ? "selected" : ""}>Abrir atendimento externo</option>
                <option value="personalizada" ${isCustom ? "selected" : ""}>Executar ação personalizada</option>
              </select>
            </label>
            <label class="te-flow-optional-check">
              <input type="checkbox" data-te-flow-field="opcional" ${step.opcional ? "checked" : ""}>
              <span>Opção complementar</span>
            </label>
            <label class="te-flow-keywords-field">
              <span>Palavras-chave desta opção</span>
              <input type="text" data-te-flow-field="palavrasChave" value="${this.escapeAttr((step.palavrasChave || []).join(", "))}" spellcheck="false" placeholder="/normal, /externo">
              <small>Separe por vírgulas. Funcionam enquanto o fluxo estiver aberto.</small>
            </label>
            <label class="te-flow-step-content-field ${isInsert ? "" : "te-hidden"}" data-te-flow-action-panel="inserir">
              <span>Texto inserido no protocolo</span>
              <textarea rows="4" data-te-flow-field="conteudo" placeholder="Digite o script...">${this.escapeHtml(step.conteudo)}</textarea>
            </label>
            <label class="te-flow-step-content-field ${isFlow ? "" : "te-hidden"}" data-te-flow-action-panel="fluxo">
              <span>Fluxo de destino</span>
              <select data-te-flow-field="acaoAlvoIdFluxo">
                ${this.renderFlowTargetOptions(flowTargets, step.acaoAlvoId, "Selecione outro fluxo de protocolo")}
              </select>
              <small>O menu atual será substituído pelo fluxo escolhido e poderá voltar pela seta.</small>
            </label>
            <label class="te-flow-step-content-field ${isSequence ? "" : "te-hidden"}" data-te-flow-action-panel="sequencia">
              <span>Sequência de destino</span>
              <select data-te-flow-field="acaoAlvoIdSequencia">
                ${this.renderFlowTargetOptions(sequenceTargets, step.acaoAlvoId, "Selecione uma sequência do Atendimento")}
              </select>
            </label>
            <label class="te-flow-step-content-field ${isUrl ? "" : "te-hidden"}" data-te-flow-action-panel="url">
              <span>Endereço do atendimento externo</span>
              <input type="url" data-te-flow-field="acaoUrl" value="${this.escapeAttr(step.acaoUrl || "")}" placeholder="https://sistema.exemplo/atendimento">
              <small>São aceitos endereços HTTP ou HTTPS. A página será aberta em nova guia.</small>
            </label>
            <label class="te-flow-step-content-field ${isCustom ? "" : "te-hidden"}" data-te-flow-action-panel="personalizada">
              <span>Identificador da ação personalizada</span>
              <input type="text" data-te-flow-field="acaoPersonalizada" value="${this.escapeAttr(step.acaoPersonalizada || "")}" placeholder="ex.: abrir-painel-tecnico">
              <small>A ação deve ser registrada por uma integração usando <code>registerProtocolFlowAction</code>.</small>
            </label>
          </div>
        </article>`;
    }).join("");

    this.updateFlowVariablePreview();
  };

  TextExpressApp.prototype.syncEditingFlowSteps = function () {
    const type = this.getFlowEditorType();
    if (type !== "protocolo") return teV27Original.syncEditingFlowSteps.call(this);

    const editors = [...this.root.querySelectorAll(".te-flow-step-editor")];
    this.editingFlowSteps = editors.map((editor, index) => {
      const get = (field) => editor.querySelector(`[data-te-flow-field="${field}"]`);
      const actionType = this.getFlowActionType({ acaoTipo: get("acaoTipo")?.value });
      const targetId = actionType === TE_V27_FLOW_ACTIONS.FLOW
        ? get("acaoAlvoIdFluxo")?.value
        : actionType === TE_V27_FLOW_ACTIONS.SEQUENCE
          ? get("acaoAlvoIdSequencia")?.value
          : "";

      return this.normalizeFlowStep({
        id: this.editingFlowSteps[index]?.id,
        nome: get("nome")?.value,
        atalho: get("atalho")?.value,
        conteudo: get("conteudo")?.value,
        triggerKey: get("triggerKey")?.value,
        opcional: Boolean(get("opcional")?.checked),
        palavrasChave: get("palavrasChave")?.value,
        acaoTipo: actionType,
        acaoAlvoId: targetId,
        acaoUrl: get("acaoUrl")?.value,
        acaoPersonalizada: get("acaoPersonalizada")?.value
      }, index, this.root.querySelector("#te-form-shortcut")?.value || "/fluxo");
    });
    return this.editingFlowSteps;
  };

  TextExpressApp.prototype.addFlowEditorStep = function () {
    if (this.getFlowEditorType() !== "protocolo") return teV27Original.addFlowEditorStep.call(this);
    this.syncEditingFlowSteps();
    const index = this.editingFlowSteps.length;
    const parent = this.root.querySelector("#te-form-shortcut")?.value || "/fluxo";
    this.editingFlowSteps.push(this.normalizeFlowStep({
      nome: `Opção ${index + 1}`,
      atalho: `${this.normalizeShortcut(parent)}${index + 1}`,
      conteudo: "",
      acaoTipo: TE_V27_FLOW_ACTIONS.INSERT
    }, index, parent));
    this.renderFlowEditorSteps();
  };

  TextExpressApp.prototype.removeFlowEditorStep = function (index) {
    if (this.getFlowEditorType() !== "protocolo") return teV27Original.removeFlowEditorStep.call(this, index);
    this.syncEditingFlowSteps();
    if (this.editingFlowSteps.length <= 2) {
      this.root.querySelector("#te-flow-error").textContent = "Um fluxo precisa ter pelo menos duas opções.";
      return;
    }
    this.editingFlowSteps.splice(index, 1);
    this.renderFlowEditorSteps();
  };

  TextExpressApp.prototype.updateFlowVariablePreview = function () {
    const kind = this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico";
    if (kind !== "fluxo") return;
    if (this.getFlowEditorType() !== "protocolo") {
      return teV27Original.updateFlowVariablePreview.call(this);
    }

    const current = this.root.querySelectorAll(".te-flow-step-editor").length
      ? this.syncEditingFlowSteps()
      : this.editingFlowSteps;
    const variables = [...new Set(current
      .filter((step) => this.getFlowActionType(step) === TE_V27_FLOW_ACTIONS.INSERT)
      .flatMap((step) => this.extractVariables(step.conteudo)))];
    const preview = this.root.querySelector("#te-variable-preview");
    if (preview) {
      preview.innerHTML = variables.length
        ? variables.map((variable) => `<span class="te-variable-tag">${this.escapeHtml(variable)}</span>`).join("")
        : '<span class="te-muted">Nenhuma variável encontrada.</span>';
    }
  };

  TextExpressApp.prototype.isSafeExternalFlowUrl = function (value) {
    try {
      const url = new URL(String(value || "").trim(), window.location.href);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch (error) {
      return "";
    }
  };

  TextExpressApp.prototype.validateProtocolFlowStep = function (step, index) {
    if (!step.nome) return `Preencha o nome da opção ${index + 1}.`;
    const actionType = this.getFlowActionType(step);
    if (actionType === TE_V27_FLOW_ACTIONS.INSERT && !step.conteudo) {
      return `Preencha o texto da opção ${index + 1}.`;
    }
    if (actionType === TE_V27_FLOW_ACTIONS.FLOW) {
      const target = this.snippets.find((item) => item.id === step.acaoAlvoId && item.tipo === "protocolo" && item.modelo === "fluxo");
      if (!target) return `Selecione o fluxo de destino da opção ${index + 1}.`;
    }
    if (actionType === TE_V27_FLOW_ACTIONS.SEQUENCE) {
      const target = this.snippets.find((item) => item.id === step.acaoAlvoId && item.tipo === "atendimento" && item.modelo === "fluxo");
      if (!target) return `Selecione a sequência de destino da opção ${index + 1}.`;
    }
    if (actionType === TE_V27_FLOW_ACTIONS.URL && !this.isSafeExternalFlowUrl(step.acaoUrl)) {
      return `Informe um endereço HTTP ou HTTPS válido na opção ${index + 1}.`;
    }
    if (actionType === TE_V27_FLOW_ACTIONS.CUSTOM && !step.acaoPersonalizada) {
      return `Informe o identificador da ação personalizada na opção ${index + 1}.`;
    }
    return "";
  };

  TextExpressApp.prototype.collectSnippetFromForm = function (showErrors = false) {
    if (showErrors) this.clearFormErrors();
    const flowError = this.root.querySelector("#te-flow-error");
    if (showErrors && flowError) flowError.textContent = "";

    const id = this.root.querySelector("#te-form-id").value;
    const tipo = this.getFlowEditorType();
    const modelo = this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico";
    const nome = this.root.querySelector("#te-form-name").value.trim();
    const atalho = this.normalizeShortcut(this.root.querySelector("#te-form-shortcut").value);
    const triggerKey = this.root.querySelector("#te-form-trigger").value;
    const categoriaId = this.root.querySelector("#te-form-category").value;
    const category = this.getCategoryById(categoriaId) || this.resolveCategory(null, "Outros", tipo);
    const favorito = this.root.querySelector("#te-form-favorite").checked;
    const owners = this.getAllShortcutOwners(id, tipo);
    const errors = [];

    if (!nome) {
      errors.push("Informe um nome para o modelo.");
      if (showErrors) this.setFormError("name", "Informe um nome para o modelo.");
    }
    if (owners.has(atalho)) {
      const message = `Esse atalho já pertence a “${owners.get(atalho)}” nesta área.`;
      errors.push(message);
      if (showErrors) this.setFormError("shortcut", message);
    }

    let conteudo = "";
    let etapas = [];

    if (modelo === "fluxo") {
      etapas = this.syncEditingFlowSteps();
      if (etapas.length < 2) errors.push(tipo === "protocolo"
        ? "Um fluxo precisa ter pelo menos duas opções."
        : "Uma sequência precisa ter pelo menos duas falas.");

      const localShortcuts = new Set([atalho]);
      for (let index = 0; index < etapas.length; index += 1) {
        const step = etapas[index];
        const specificError = tipo === "protocolo"
          ? this.validateProtocolFlowStep(step, index)
          : (!step.nome || !step.conteudo ? `Preencha o nome e o texto da fala ${index + 1}.` : "");
        if (specificError) {
          errors.push(specificError);
          break;
        }

        step.atalho = this.normalizeShortcut(step.atalho);
        if (localShortcuts.has(step.atalho)) {
          errors.push(`O atalho ${step.atalho} está repetido dentro do fluxo.`);
          break;
        }
        if (owners.has(step.atalho)) {
          errors.push(`O atalho ${step.atalho} já pertence a “${owners.get(step.atalho)}”.`);
          break;
        }
        localShortcuts.add(step.atalho);
      }

      conteudo = etapas
        .map((step) => step.conteudo || this.describeFlowStepAction(step, { includeTargetName: false }))
        .join("\n\n");
      if (showErrors && flowError && errors.length) flowError.textContent = errors[errors.length - 1];
    } else {
      conteudo = this.root.querySelector("#te-form-content").value.trim();
      if (!conteudo) {
        errors.push("Informe o conteúdo que será inserido.");
        if (showErrors) this.setFormError("content", "Informe o conteúdo que será inserido.");
      }
    }

    if (errors.length) return { valid: false, errors, id, tipo, modelo };

    const existingIndex = id ? this.snippets.findIndex((item) => item.id === id) : -1;
    const base = existingIndex >= 0 ? this.snippets[existingIndex] : {};
    const now = new Date().toISOString();
    const snippet = this.normalizeSnippet({
      ...base,
      id: existingIndex >= 0 ? id : this.generateId(tipo),
      tipo,
      modelo,
      nome,
      atalho,
      triggerKey,
      categoriaId: category.id,
      categoria: category.nome,
      conteudo,
      etapas,
      favorito,
      ativo: true,
      origem: existingIndex >= 0 ? base.origem : "Criado pelo usuário",
      updatedAt: now,
      revision: Number(base.revision || 0) + 1
    });
    snippet.updatedAt = now;
    snippet.revision = Number(base.revision || 0) + 1;

    return { valid: true, id, tipo, modelo, existingIndex, snippet };
  };

  TextExpressApp.prototype.renderCard = function (snippet) {
    if (snippet?.modelo !== "fluxo" || snippet.tipo !== "protocolo") {
      return teV27Original.renderCard.call(this, snippet);
    }

    const selected = snippet.id === this.selectedId ? "te-selected" : "";
    const category = this.getCategoryForSnippet(snippet);
    const actionLabels = snippet.etapas.slice(0, 3)
      .map((step) => `<span>${this.icon(this.getFlowActionIcon(step))}${this.escapeHtml(step.nome)}</span>`)
      .join("");
    return `
      <article class="te-snippet-card te-flow-card te-protocol-flow-card ${selected}" tabindex="0" role="button" aria-selected="${snippet.id === this.selectedId ? "true" : "false"}" data-te-card-id="${this.escapeAttr(snippet.id)}" data-te-snippet-type="protocolo" style="--te-card-accent:${this.escapeAttr(category.cor)}">
        <span class="te-card-icon" aria-hidden="true" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon("play-circle")}</span>
        <div class="te-card-main">
          <div class="te-card-title-row">
            <span class="te-card-title" title="${this.escapeAttr(snippet.nome)}">${this.escapeHtml(snippet.nome)}</span>
            <span class="te-flow-count">${snippet.etapas.length} opções</span>
          </div>
          <div class="te-shortcut-line"><code>${this.escapeHtml(snippet.atalho)}</code><span>abre a sequência</span></div>
          <div class="te-protocol-flow-actions-preview">${actionLabels}</div>
          <div class="te-card-actions">
            <button class="te-text-button" type="button" data-te-action="edit" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("edit")} Editar</button>
            <button class="te-text-button te-delete" type="button" data-te-action="delete" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("trash")} Excluir</button>
            <button class="te-text-button te-card-insert" type="button" data-te-action="flow-open" data-te-id="${this.escapeAttr(snippet.id)}">${this.icon("play-circle")} ABRIR SEQUÊNCIA</button>
          </div>
        </div>
        <button class="te-favorite-button ${snippet.favorito ? "te-active" : ""}" type="button" data-te-action="favorite" data-te-id="${this.escapeAttr(snippet.id)}" title="Favorito">${this.icon("star")}</button>
      </article>`;
  };

  TextExpressApp.prototype.renderFlowDetail = function (flow) {
    if (flow?.tipo !== "protocolo") return teV27Original.renderFlowDetail.call(this, flow);

    const category = this.getCategoryForSnippet(flow);
    const state = this.getFlowState(flow);
    this.detailPane.dataset.teSnippetType = "protocolo";
    this.detailPane.style.setProperty("--te-detail-accent", category.cor);

    const stepsHtml = flow.etapas.map((step, index) => {
      const active = state.current === index;
      const used = state.used.has(index);
      return `
        <article class="te-flow-step ${active ? "te-active" : ""} ${used ? "te-used" : ""}">
          <button class="te-flow-step-summary" type="button" data-te-action="flow-step-select" data-te-id="${this.escapeAttr(flow.id)}" data-te-step-index="${index}">
            <span class="te-flow-step-number">${used ? this.icon("check") : index + 1}</span>
            <span class="te-flow-step-name">${this.escapeHtml(step.nome)}</span>
            <span class="te-protocol-action-badge">${this.icon(this.getFlowActionIcon(step))}${this.escapeHtml(this.getFlowActionLabel(step))}</span>
            <code>${this.escapeHtml(step.atalho)}</code>
          </button>
          <div class="te-flow-step-body ${active ? "" : "te-hidden"}">
            <p>${this.escapeHtml(this.describeFlowStepAction(step))}</p>
            <div class="te-flow-step-actions">
              <button class="te-primary-button" type="button" data-te-action="flow-step-insert" data-te-id="${this.escapeAttr(flow.id)}" data-te-step-index="${index}">${this.icon(this.getFlowActionIcon(step))} Executar opção</button>
            </div>
          </div>
        </article>`;
    }).join("");

    this.detailPane.innerHTML = `
      <div class="te-detail-header te-flow-detail-header">
        <div class="te-detail-title-wrap">
          <span class="te-detail-category-icon" style="--te-category-color:${this.escapeAttr(category.cor)}">${this.icon("play-circle")}</span>
          <div>
            <h2>${this.escapeHtml(flow.nome)}</h2>
            <div class="te-detail-meta">
              <span>Sequência de ${flow.etapas.length} opções</span>
              <code>${this.escapeHtml(flow.atalho)}</code>
              <span>abre a sequência</span>
            </div>
          </div>
        </div>
        <div class="te-flow-header-actions">
          <button class="te-primary-button te-sequence-open-detail" type="button" data-te-action="flow-open" data-te-id="${this.escapeAttr(flow.id)}">${this.icon("play-circle")} ABRIR SEQUÊNCIA</button>
          <button class="te-icon-action" type="button" data-te-action="flow-reset" data-te-id="${this.escapeAttr(flow.id)}" title="Reiniciar sequência">${this.icon("rotate-ccw")}</button>
          <button class="te-icon-action" type="button" data-te-action="edit" data-te-id="${this.escapeAttr(flow.id)}" title="Editar">${this.icon("edit")}</button>
          <button class="te-favorite-button ${flow.favorito ? "te-active" : ""}" type="button" data-te-action="favorite" data-te-id="${this.escapeAttr(flow.id)}">${this.icon("star")}</button>
        </div>
      </div>
      <section class="te-flow-steps-view">
        <div class="te-flow-section-title"><strong>Opções do protocolo</strong><small>Opção ${state.current + 1} de ${flow.etapas.length}</small></div>
        ${stepsHtml}
      </section>`;
  };

  TextExpressApp.prototype.ensureSequenceMenu = function () {
    const menu = teV27Original.ensureSequenceMenu.call(this);
    if (!menu.querySelector('[data-te-action="workflow-back"]')) {
      const meta = menu.querySelector(".te-sequence-menu-meta");
      const back = document.createElement("button");
      back.className = "te-sequence-back te-hidden";
      back.type = "button";
      back.dataset.teAction = "workflow-back";
      back.title = "Voltar ao fluxo anterior";
      back.setAttribute("aria-label", "Voltar ao fluxo anterior");
      back.innerHTML = `${this.icon("chevron-left")}<small>Voltar</small>`;
      meta?.prepend(back);
    }
    return menu;
  };

  TextExpressApp.prototype.getActiveSequence = function () {
    if (!this.activeSequenceId) return null;
    return this.snippets.find((item) =>
      item.id === this.activeSequenceId && item.modelo === "fluxo" && item.ativo
    ) || null;
  };

  TextExpressApp.prototype.getWorkflowStepPreview = function (flow, step) {
    if (flow.tipo === "atendimento" || this.getFlowActionType(step) === TE_V27_FLOW_ACTIONS.INSERT) {
      return step.conteudo;
    }
    return this.describeFlowStepAction(step);
  };

  TextExpressApp.prototype.renderSequenceMenu = function () {
    this.ensureSequenceMenu();
    const flow = this.getActiveSequence();
    if (!flow) {
      this.closeSequenceMenu(false);
      return;
    }

    const isProtocol = flow.tipo === "protocolo";
    const query = this.normalizeSearchText(this.sequenceSearchInput?.value || "");
    const state = this.getFlowState(flow);
    const matches = (flow.etapas || [])
      .map((step, index) => ({ step, index }))
      .filter(({ step, index }) => {
        if (!query) return true;
        const haystack = this.normalizeSearchText([
          String(index + 1),
          step.nome,
          this.getWorkflowStepPreview(flow, step),
          step.atalho,
          ...(step.palavrasChave || []),
          this.getFlowActionLabel(step)
        ].join(" "));
        return haystack.includes(query.replace(/^\//, "")) || haystack.includes(query);
      });

    const command = this.sequenceMenu.querySelector("#te-sequence-command");
    const title = this.sequenceMenu.querySelector("#te-sequence-title");
    const count = this.sequenceMenu.querySelector("#te-sequence-count");
    const back = this.sequenceMenu.querySelector('[data-te-action="workflow-back"]');
    const footerSpans = this.sequenceMenu.querySelectorAll(".te-sequence-menu-footer span");

    if (command) command.textContent = `${isProtocol ? "FLUXO" : "SEQUÊNCIA"} ${flow.atalho}`;
    if (title) title.textContent = flow.nome;
    if (count) count.textContent = `${flow.etapas.length} ${isProtocol ? (flow.etapas.length === 1 ? "opção" : "opções") : (flow.etapas.length === 1 ? "pergunta" : "perguntas")}`;
    back?.classList.toggle("te-hidden", !(this.workflowNavigationStack?.length));
    this.sequenceMenu.setAttribute("aria-label", isProtocol ? "Fluxo de protocolo aberto" : "Sequência de atendimento aberta");
    this.sequenceMenu.classList.toggle("te-protocol-workflow-menu", isProtocol);
    if (footerSpans[0]) footerSpans[0].innerHTML = `${this.icon("zap")} No campo vazio, digite apenas o número. Também funciona por palavra-chave.`;
    if (footerSpans[1]) footerSpans[1].textContent = isProtocol ? "O menu permanece aberto após executar." : "O menu permanece aberto após inserir.";

    this.sequenceList.innerHTML = matches.length
      ? matches.map(({ step, index }) => {
          const keywords = this.getSequenceStepKeywords(step);
          const chips = keywords.map((keyword) => `<code>${this.escapeHtml(keyword)}</code>`).join("");
          const preview = this.getWorkflowStepPreview(flow, step);
          return `
            <button class="te-sequence-item ${state.current === index ? "te-current" : ""} ${state.used.has(index) ? "te-used" : ""}" type="button" data-te-action="sequence-step-insert" data-te-id="${this.escapeAttr(flow.id)}" data-te-step-index="${index}">
              <span class="te-sequence-number">${index + 1}</span>
              <span class="te-sequence-item-content">
                <strong>${this.escapeHtml(step.nome)}</strong>
                <span class="${isProtocol ? "te-protocol-preview" : ""}" ${isProtocol ? `title="${this.escapeAttr(preview)}"` : ""}>${this.escapeHtml(preview)}</span>
                ${isProtocol ? `<span class="te-protocol-action-inline">${this.icon(this.getFlowActionIcon(step))}${this.escapeHtml(this.getFlowActionLabel(step))}</span>` : ""}
                <span class="te-sequence-keywords">${chips || "<em>Sem palavra-chave adicional</em>"}</span>
              </span>
              <span class="te-sequence-item-action">${state.used.has(index) ? this.icon("check-circle") : this.icon(this.getFlowActionIcon(step))}</span>
            </button>`;
        }).join("")
      : `<div class="te-sequence-empty">${this.icon("search")}<strong>Nenhuma opção encontrada</strong><span>Limpe a busca ou use outra palavra-chave.</span></div>`;
  };

  TextExpressApp.prototype.openSequenceMenu = function (flowOrId, options = {}) {
    const flow = typeof flowOrId === "string"
      ? this.snippets.find((item) => item.id === flowOrId)
      : flowOrId;
    if (!flow || flow.modelo !== "fluxo" || !flow.ativo) {
      this.showToast("Esse fluxo não está disponível.", "error");
      return false;
    }

    this.ensureSequenceMenu();
    if (!options.preserveStack && !options.pushCurrent) this.workflowNavigationStack = [];
    if (options.pushCurrent && this.activeSequenceId && this.activeSequenceId !== flow.id) {
      this.workflowNavigationStack = this.workflowNavigationStack || [];
      this.workflowNavigationStack.push(this.activeSequenceId);
      if (this.workflowNavigationStack.length > 20) this.workflowNavigationStack.shift();
    }
    this.activeSequenceId = flow.id;
    if (!options.preserveSearch && this.sequenceSearchInput) this.sequenceSearchInput.value = "";
    this.renderSequenceMenu();
    this.sequenceMenu.classList.remove("te-hidden");
    this.sequenceMenu.setAttribute("aria-hidden", "false");
    return true;
  };

  TextExpressApp.prototype.closeSequenceMenu = function (announce = true) {
    const flow = this.getActiveSequence();
    const wasProtocol = flow?.tipo === "protocolo";
    const result = teV27Original.closeSequenceMenu.call(this, false);
    this.workflowNavigationStack = [];
    this.sequenceMenu?.classList.remove("te-protocol-workflow-menu");
    if (announce) this.showToast(wasProtocol ? "Fluxo fechado." : "Sequência fechada.");
    return result;
  };

  TextExpressApp.prototype.navigateWorkflowBack = function () {
    const previousId = this.workflowNavigationStack?.pop();
    if (!previousId) return false;
    const previous = this.snippets.find((item) => item.id === previousId && item.modelo === "fluxo");
    if (!previous) return this.navigateWorkflowBack();
    return this.openSequenceMenu(previous, { preserveStack: true });
  };

  TextExpressApp.prototype.handleRootClick = function (event) {
    const actionButton = event.target.closest?.("[data-te-action]");
    const action = actionButton?.dataset.teAction;

    if (action === "workflow-back") {
      event.preventDefault();
      event.stopPropagation();
      this.navigateWorkflowBack();
      return;
    }

    if (action === "flow-open" || action === "sequence-open") {
      const flow = this.snippets.find((item) => item.id === actionButton.dataset.teId && item.modelo === "fluxo");
      if (flow) {
        event.preventDefault();
        event.stopPropagation();
        this.selectedId = flow.id;
        this.lastShortcutType = flow.tipo;
        this.openSequenceMenu(flow);
        this.showToast(`${flow.tipo === "protocolo" ? "Fluxo" : "Sequência"} “${flow.nome}” aberto.`, "success");
        this.collapseToLauncher?.();
        window.requestAnimationFrame(() => this.constrainManagedWindow?.(this.sequenceMenu, "sequence"));
        return;
      }
    }

    return teV27Original.handleRootClick.call(this, event);
  };

  TextExpressApp.prototype.handleRootChange = function (event) {
    const result = teV27Original.handleRootChange.call(this, event);
    if (event.target.matches?.('[data-te-flow-field="acaoTipo"]')) {
      this.syncEditingFlowSteps();
      this.renderFlowEditorSteps();
    }
    return result;
  };

  TextExpressApp.prototype.handleRootInput = function (event) {
    return teV27Original.handleRootInput.call(this, event);
  };

  TextExpressApp.prototype.clearFlowShortcutContext = function (context) {
    if (!context) return true;
    return this.applyInsertionContext(context, "");
  };

  TextExpressApp.prototype.markWorkflowStepUsed = function (flow, stepIndex) {
    const state = this.getFlowState(flow);
    state.current = stepIndex;
    state.used.add(stepIndex);
    if (this.selectedId === flow.id) this.renderDetail(flow);
    if (this.activeSequenceId === flow.id) this.renderSequenceMenu();
  };

  TextExpressApp.prototype.registerProtocolFlowAction = function (key, handler) {
    const normalizedKey = String(key || "").trim();
    if (!normalizedKey || typeof handler !== "function") return false;
    this.protocolFlowActionHandlers.set(normalizedKey, handler);
    return true;
  };

  TextExpressApp.prototype.unregisterProtocolFlowAction = function (key) {
    return this.protocolFlowActionHandlers.delete(String(key || "").trim());
  };

  TextExpressApp.prototype.executeCustomProtocolFlowAction = async function (flow, step, stepIndex, context) {
    const handler = this.protocolFlowActionHandlers.get(step.acaoPersonalizada);
    if (!handler) {
      this.showToast(`A ação “${step.acaoPersonalizada}” não está registrada.`, "error", 5000);
      return false;
    }
    try {
      const result = await handler({ app: this, flow, step, stepIndex, context });
      if (typeof result === "string") {
        const refreshedContext = this.captureInsertionContext(
          context?.element || this.lastActiveElement,
          0
        ) || context;
        const inserted = refreshedContext
          ? this.applyInsertionContext(refreshedContext, result)
          : false;
        if (!inserted) await this.copyText(result);
      }
      if (result?.openFlowId) {
        const target = this.snippets.find((item) => item.id === result.openFlowId && item.modelo === "fluxo");
        if (target) this.openSequenceMenu(target, { pushCurrent: true });
      }
      if (result?.message) this.showToast(String(result.message), "success");
      return result !== false;
    } catch (error) {
      console.error("Text Express: ação personalizada", error);
      this.showToast("A ação personalizada não pôde ser executada.", "error");
      return false;
    }
  };

  TextExpressApp.prototype.executeWorkflowStep = async function (flow, step, stepIndex, suppliedContext = null) {
    const actionType = flow.tipo === "atendimento"
      ? TE_V27_FLOW_ACTIONS.INSERT
      : this.getFlowActionType(step);
    const context = suppliedContext || this.captureInsertionContext(this.lastActiveElement, 0);

    if (actionType === TE_V27_FLOW_ACTIONS.INSERT) {
      const content = await this.processFlowStep(flow, step);
      if (content === null) {
        this.showToast("Execução cancelada.");
        return false;
      }
      let inserted = false;
      if (context) inserted = this.applyInsertionContext(context, content);
      if (!inserted) {
        await this.copyText(content);
        this.showToast("Texto copiado.", "success", 1800);
      } else {
        this.showToast(flow.tipo === "protocolo" ? `Opção ${stepIndex + 1} inserida.` : `Pergunta ${stepIndex + 1} inserida.`, "success");
      }
      this.markWorkflowStepUsed(flow, stepIndex);
      return inserted || true;
    }

    if (suppliedContext && !this.clearFlowShortcutContext(suppliedContext)) {
      this.showToast("Não foi possível remover o atalho digitado.", "error");
      return false;
    }

    if (actionType === TE_V27_FLOW_ACTIONS.FLOW || actionType === TE_V27_FLOW_ACTIONS.SEQUENCE) {
      const expectedType = actionType === TE_V27_FLOW_ACTIONS.FLOW ? "protocolo" : "atendimento";
      const target = this.snippets.find((item) =>
        item.id === step.acaoAlvoId && item.tipo === expectedType && item.modelo === "fluxo" && item.ativo
      );
      if (!target) {
        this.showToast("O fluxo de destino não está disponível.", "error");
        return false;
      }
      this.markWorkflowStepUsed(flow, stepIndex);
      this.openSequenceMenu(target, { pushCurrent: true });
      this.showToast(`${target.tipo === "protocolo" ? "Fluxo" : "Sequência"} “${target.nome}” aberto.`, "success");
      return true;
    }

    if (actionType === TE_V27_FLOW_ACTIONS.URL) {
      const safeUrl = this.isSafeExternalFlowUrl(step.acaoUrl);
      if (!safeUrl) {
        this.showToast("O endereço externo configurado não é válido.", "error");
        return false;
      }
      let opened = null;
      try {
        opened = window.open(safeUrl, "_blank");
        if (opened) opened.opener = null;
      } catch (error) {
        opened = null;
      }
      this.markWorkflowStepUsed(flow, stepIndex);
      this.showToast(
        opened === null
          ? "A abertura foi solicitada. Se a nova guia não apareceu, permita pop-ups para este sistema."
          : "Atendimento externo aberto.",
        opened === null ? "error" : "success",
        4500
      );
      return true;
    }

    if (actionType === TE_V27_FLOW_ACTIONS.CUSTOM) {
      const handled = await this.executeCustomProtocolFlowAction(flow, step, stepIndex, suppliedContext);
      if (handled) this.markWorkflowStepUsed(flow, stepIndex);
      return handled;
    }

    return false;
  };

  TextExpressApp.prototype.insertSequenceStep = async function (flowId, stepIndex, suppliedContext = null) {
    const flow = this.snippets.find((item) => item.id === flowId && item.modelo === "fluxo");
    const step = flow?.etapas?.[stepIndex];
    if (!flow || !step) return false;
    return this.executeWorkflowStep(flow, step, stepIndex, suppliedContext);
  };

  TextExpressApp.prototype.insertFlowStep = async function (flowId, stepIndex, advance = false) {
    const result = await this.insertSequenceStep(flowId, stepIndex);
    const flow = this.snippets.find((item) => item.id === flowId && item.modelo === "fluxo");
    if (result && advance && flow && this.activeSequenceId === flow.id) {
      const state = this.getFlowState(flow);
      state.current = Math.min(stepIndex + 1, flow.etapas.length - 1);
      if (this.selectedId === flow.id) this.renderDetail(flow);
      this.renderSequenceMenu();
    }
    return result;
  };

  TextExpressApp.prototype.insertSnippet = async function (id) {
    const snippet = this.snippets.find((item) => item.id === id);
    if (snippet?.modelo === "fluxo") {
      this.selectedId = snippet.id;
      this.lastShortcutType = snippet.tipo;
      this.openSequenceMenu(snippet);
      this.collapseToLauncher?.();
      return true;
    }
    return teV27Original.insertSnippet.call(this, id);
  };

  TextExpressApp.prototype.copySnippet = async function (id) {
    const snippet = this.snippets.find((item) => item.id === id);
    if (snippet?.tipo === "protocolo" && snippet.modelo === "fluxo") {
      this.openSequenceMenu(snippet);
      this.showToast("Escolha uma opção do fluxo.", "success");
      return true;
    }
    return teV27Original.copySnippet.call(this, id);
  };

  TextExpressApp.prototype.expandShortcut = async function (entry, context) {
    if (entry?.kind === "flow") {
      if (!context) return;
      this.lastActiveElement = context.element;
      this.applyInsertionContext(context, "");
      this.lastShortcutType = entry.snippet.tipo;
      this.selectedId = entry.snippet.id;
      this.openSequenceMenu(entry.snippet);
      this.showToast(`${entry.snippet.tipo === "protocolo" ? "Fluxo" : "Sequência"} “${entry.snippet.nome}” aberto.`, "success");
      return;
    }
    if (entry?.kind === "flow-step") {
      return this.insertSequenceStep(entry.snippet.id, entry.stepIndex, context);
    }
    return teV27Original.expandShortcut.call(this, entry, context);
  };

  TextExpressApp.prototype.resetFlow = function (flowId) {
    const flow = this.snippets.find((item) => item.id === flowId && item.modelo === "fluxo");
    if (!flow) return;
    this.flowProgress.set(flowId, { current: 0, used: new Set() });
    this.flowVariableValues.delete(flowId);
    if (this.selectedId === flow.id) this.renderDetail(flow);
    if (this.activeSequenceId === flow.id) this.renderSequenceMenu();
    this.showToast(flow.tipo === "protocolo" ? "Fluxo reiniciado." : "Sequência reiniciada.", "success");
  };

  TextExpressApp.prototype.updateCount = function () {
    const result = teV27Original.updateCount.call(this);
    const protocolFlows = this.snippets.filter((item) => item.tipo === "protocolo" && item.modelo === "fluxo" && item.ativo).length;
    if (protocolFlows && this.statusCounts) {
      this.statusCounts.textContent += ` · Fluxos de protocolo: ${protocolFlows}`;
    }
    return result;
  };

  TextExpressApp.prototype.init = function () {
    this.workflowNavigationStack = [];
    this.protocolFlowActionHandlers = new Map();
    const result = teV27Original.init.call(this);
    this.ensureSequenceMenu();
    this.root.dataset.version = APP_VERSION;
    return result;
  };


  /* ==========================================================
   * Text Express 27.1 — fluxo de Protocolo com duas saídas fixas
   * ========================================================== */
  const TE_V271_PROTOCOL_FLOW_PRESETS = Object.freeze([
    Object.freeze({ nome: "Normalizado", shortcutSuffix: "1" }),
    Object.freeze({ nome: "Aberto O.S.", shortcutSuffix: "2" })
  ]);

  const teV271Original = {
    normalizeSnippet: TextExpressApp.prototype.normalizeSnippet,
    openModal: TextExpressApp.prototype.openModal,
    updateModelKindUI: TextExpressApp.prototype.updateModelKindUI,
    renderFlowEditorSteps: TextExpressApp.prototype.renderFlowEditorSteps,
    syncEditingFlowSteps: TextExpressApp.prototype.syncEditingFlowSteps,
    addFlowEditorStep: TextExpressApp.prototype.addFlowEditorStep,
    removeFlowEditorStep: TextExpressApp.prototype.removeFlowEditorStep,
    validateProtocolFlowStep: TextExpressApp.prototype.validateProtocolFlowStep,
    getWorkflowStepPreview: TextExpressApp.prototype.getWorkflowStepPreview,
    renderSequenceMenu: TextExpressApp.prototype.renderSequenceMenu
  };

  TextExpressApp.prototype.buildProtocolFlowPair = function (steps = [], parentShortcut = "/fluxo") {
    const source = Array.isArray(steps) ? steps.filter(Boolean) : [];
    const normalizedParent = this.normalizeShortcut(parentShortcut || "/fluxo");
    const used = new Set();
    const normalizedNames = source.map((step) => this.normalizeSearchText(step?.nome || ""));

    const pick = (index) => {
      const preset = TE_V271_PROTOCOL_FLOW_PRESETS[index];
      const patterns = index === 0
        ? ["normalizado", "normal", "resolvido"]
        : ["aberto os", "abertura os", "ordem de servico", "os aberta"];
      let foundIndex = normalizedNames.findIndex((name, candidateIndex) =>
        !used.has(candidateIndex) && patterns.some((pattern) => name.includes(pattern))
      );
      if (foundIndex < 0) foundIndex = source.findIndex((_, candidateIndex) => !used.has(candidateIndex));
      if (foundIndex >= 0) used.add(foundIndex);
      const existing = foundIndex >= 0 ? source[foundIndex] : {};
      return this.normalizeFlowStep({
        ...existing,
        nome: preset.nome,
        atalho: existing.atalho || `${normalizedParent}${preset.shortcutSuffix}`,
        triggerKey: existing.triggerKey || "space",
        conteudo: String(existing.conteudo || ""),
        acaoTipo: existing.acaoTipo || TE_V27_FLOW_ACTIONS.INSERT,
        opcional: false
      }, index, normalizedParent);
    };

    return TE_V271_PROTOCOL_FLOW_PRESETS.map((_, index) => pick(index));
  };

  TextExpressApp.prototype.normalizeSnippet = function (raw = {}) {
    const normalized = teV271Original.normalizeSnippet.call(this, raw);
    if (normalized?.tipo !== "protocolo" || normalized?.modelo !== "fluxo") return normalized;

    normalized.etapas = this.buildProtocolFlowPair(normalized.etapas, normalized.atalho);
    normalized.conteudo = normalized.etapas
      .map((step) => step.conteudo || this.describeFlowStepAction(step, { includeTargetName: false }))
      .filter(Boolean)
      .join("\n\n") || "Fluxo de protocolo";
    normalized.variaveis = [...new Set(normalized.etapas.flatMap((step) => step.variaveis || []))];
    return normalized;
  };

  TextExpressApp.prototype.openModal = function (data = null) {
    teV271Original.openModal.call(this, data);
    if (data?.tipo === "protocolo" && data?.modelo === "fluxo") {
      this.editingFlowSteps = this.buildProtocolFlowPair(data.etapas, data.atalho);
      this.renderFlowEditorSteps();
      this.updateModelKindUI();
    }
  };

  TextExpressApp.prototype.updateModelKindUI = function () {
    teV271Original.updateModelKindUI.call(this);
    const type = this.getFlowEditorType();
    const kind = this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico";
    const isProtocolFlow = type === "protocolo" && kind === "fluxo";
    const addButton = this.root.querySelector('[data-te-action="flow-step-add"]');
    const help = this.root.querySelector("#te-flow-editor-help");
    const title = this.root.querySelector("#te-modal-title");

    addButton?.classList.toggle("te-hidden", isProtocolFlow);
    if (isProtocolFlow) {
      const baseShortcut = this.root.querySelector("#te-form-shortcut")?.value || "/fluxo";
      this.editingFlowSteps = this.buildProtocolFlowPair(this.editingFlowSteps, baseShortcut);
      if (help) help.textContent = "O fluxo de Protocolo possui somente duas opções: Normalizado e Aberto O.S. O texto de cada protocolo aparece no menu antes da escolha.";
      this.renderFlowEditorSteps();
    }

    if (title) {
      const editing = Boolean(this.editingId);
      if (type === "protocolo") {
        title.textContent = kind === "fluxo"
          ? (editing ? "Editar fluxo de protocolo" : "Criar fluxo de protocolo")
          : (editing ? "Editar protocolo" : "Criar protocolo");
      } else if (kind === "fluxo") {
        title.textContent = editing ? "Editar sequência de atendimento" : "Criar sequência de atendimento";
      } else {
        title.textContent = editing ? "Editar modelo de atendimento" : "Criar modelo de atendimento";
      }
    }
  };

  TextExpressApp.prototype.renderFlowEditorSteps = function () {
    const type = this.getFlowEditorType();
    if (type !== "protocolo") return teV271Original.renderFlowEditorSteps.call(this);

    const container = this.root.querySelector("#te-flow-editor-steps");
    if (!container) return;
    const parentShortcut = this.root.querySelector("#te-form-shortcut")?.value || "/fluxo";
    this.editingFlowSteps = this.buildProtocolFlowPair(this.editingFlowSteps, parentShortcut);
    const flowTargets = this.getProtocolFlowTargets();
    const sequenceTargets = this.getAttendanceSequenceTargets();

    container.innerHTML = `
      <p class="te-protocol-flow-fixed-note">${this.icon("info")}<span>Este fluxo é fixo e exibirá somente <strong>1. Normalizado</strong> e <strong>2. Aberto O.S.</strong>. Em cada opção, informe o protocolo que o usuário verá antes de executar a ação.</span></p>
      ${this.editingFlowSteps.map((step, index) => {
        const actionType = this.getFlowActionType(step);
        const isInsert = actionType === TE_V27_FLOW_ACTIONS.INSERT;
        const isFlow = actionType === TE_V27_FLOW_ACTIONS.FLOW;
        const isSequence = actionType === TE_V27_FLOW_ACTIONS.SEQUENCE;
        const isUrl = actionType === TE_V27_FLOW_ACTIONS.URL;
        const isCustom = actionType === TE_V27_FLOW_ACTIONS.CUSTOM;
        return `
          <article class="te-flow-step-editor te-protocol-flow-step-editor" data-te-flow-editor-index="${index}">
            <header>
              <span class="te-flow-step-editor-number">${index + 1}</span>
              <strong>${this.escapeHtml(step.nome)}</strong>
            </header>
            <div class="te-flow-step-editor-grid">
              <input type="hidden" data-te-flow-field="nome" value="${this.escapeAttr(step.nome)}">
              <label>
                <span>Atalho direto</span>
                <input type="text" data-te-flow-field="atalho" maxlength="60" value="${this.escapeAttr(step.atalho)}" spellcheck="false" placeholder="${this.escapeAttr(this.normalizeShortcut(parentShortcut))}${index + 1}">
              </label>
              <label>
                <span>Ativar com</span>
                <select data-te-flow-field="triggerKey">
                  <option value="space" ${step.triggerKey === "space" ? "selected" : ""}>Espaço</option>
                  <option value="tab" ${step.triggerKey === "tab" ? "selected" : ""}>Tab</option>
                  <option value="enter" ${step.triggerKey === "enter" ? "selected" : ""}>Enter</option>
                </select>
              </label>
              <label>
                <span>Ação executada</span>
                <select data-te-flow-field="acaoTipo">
                  <option value="inserir" ${isInsert ? "selected" : ""}>Inserir o protocolo</option>
                  <option value="fluxo" ${isFlow ? "selected" : ""}>Abrir outro fluxo</option>
                  <option value="sequencia" ${isSequence ? "selected" : ""}>Abrir sequência do Atendimento</option>
                  <option value="url" ${isUrl ? "selected" : ""}>Abrir atendimento externo</option>
                  <option value="personalizada" ${isCustom ? "selected" : ""}>Executar ação personalizada</option>
                </select>
              </label>
              <label class="te-flow-keywords-field">
                <span>Palavras-chave desta opção</span>
                <input type="text" data-te-flow-field="palavrasChave" value="${this.escapeAttr((step.palavrasChave || []).join(", "))}" spellcheck="false" placeholder="${index === 0 ? "/normalizado, /normal" : "/os, /aberto-os"}">
                <small>Separe por vírgulas. Funcionam enquanto o fluxo estiver aberto.</small>
              </label>
              <label class="te-flow-step-content-field">
                <span>Texto do protocolo exibido no menu</span>
                <textarea rows="5" data-te-flow-field="conteudo" placeholder="Digite o protocolo completo da opção ${this.escapeAttr(step.nome)}...">${this.escapeHtml(step.conteudo)}</textarea>
                <small>${isInsert ? "Este texto será exibido no menu e inserido no campo ativo." : "Este texto será exibido no menu para conferência; ao selecionar, a ação configurada abaixo será executada."}</small>
              </label>
              <label class="te-flow-step-content-field ${isFlow ? "" : "te-hidden"}" data-te-flow-action-panel="fluxo">
                <span>Fluxo de destino</span>
                <select data-te-flow-field="acaoAlvoIdFluxo">${this.renderFlowTargetOptions(flowTargets, step.acaoAlvoId, "Selecione outro fluxo de protocolo")}</select>
                <small>O menu atual será substituído pelo fluxo escolhido e poderá voltar pela seta.</small>
              </label>
              <label class="te-flow-step-content-field ${isSequence ? "" : "te-hidden"}" data-te-flow-action-panel="sequencia">
                <span>Sequência de destino</span>
                <select data-te-flow-field="acaoAlvoIdSequencia">${this.renderFlowTargetOptions(sequenceTargets, step.acaoAlvoId, "Selecione uma sequência do Atendimento")}</select>
              </label>
              <label class="te-flow-step-content-field ${isUrl ? "" : "te-hidden"}" data-te-flow-action-panel="url">
                <span>Endereço do atendimento externo</span>
                <input type="url" data-te-flow-field="acaoUrl" value="${this.escapeAttr(step.acaoUrl || "")}" placeholder="https://sistema.exemplo/atendimento">
                <small>São aceitos endereços HTTP ou HTTPS. A página será aberta em uma nova guia.</small>
              </label>
              <label class="te-flow-step-content-field ${isCustom ? "" : "te-hidden"}" data-te-flow-action-panel="personalizada">
                <span>Identificador da ação personalizada</span>
                <input type="text" data-te-flow-field="acaoPersonalizada" value="${this.escapeAttr(step.acaoPersonalizada || "")}" placeholder="ex.: abrir-painel-tecnico">
                <small>A ação deve ser registrada por uma integração usando <code>registerProtocolFlowAction</code>.</small>
              </label>
            </div>
          </article>`;
      }).join("")}`;

    this.updateFlowVariablePreview();
  };

  TextExpressApp.prototype.syncEditingFlowSteps = function () {
    if (this.getFlowEditorType() !== "protocolo") return teV271Original.syncEditingFlowSteps.call(this);
    const editors = [...this.root.querySelectorAll(".te-protocol-flow-step-editor")].slice(0, 2);
    const parentShortcut = this.root.querySelector("#te-form-shortcut")?.value || "/fluxo";
    const collected = editors.map((editor, index) => {
      const get = (field) => editor.querySelector(`[data-te-flow-field="${field}"]`);
      const actionType = this.getFlowActionType({ acaoTipo: get("acaoTipo")?.value });
      const targetId = actionType === TE_V27_FLOW_ACTIONS.FLOW
        ? get("acaoAlvoIdFluxo")?.value
        : actionType === TE_V27_FLOW_ACTIONS.SEQUENCE
          ? get("acaoAlvoIdSequencia")?.value
          : "";
      return this.normalizeFlowStep({
        id: this.editingFlowSteps[index]?.id,
        nome: TE_V271_PROTOCOL_FLOW_PRESETS[index].nome,
        atalho: get("atalho")?.value,
        conteudo: get("conteudo")?.value,
        triggerKey: get("triggerKey")?.value,
        opcional: false,
        palavrasChave: get("palavrasChave")?.value,
        acaoTipo: actionType,
        acaoAlvoId: targetId,
        acaoUrl: get("acaoUrl")?.value,
        acaoPersonalizada: get("acaoPersonalizada")?.value
      }, index, parentShortcut);
    });
    this.editingFlowSteps = this.buildProtocolFlowPair(collected, parentShortcut);
    return this.editingFlowSteps;
  };

  TextExpressApp.prototype.addFlowEditorStep = function () {
    if (this.getFlowEditorType() === "protocolo") {
      this.showToast("O Fluxo de Protocolo possui somente Normalizado e Aberto O.S.");
      return false;
    }
    return teV271Original.addFlowEditorStep.call(this);
  };

  TextExpressApp.prototype.removeFlowEditorStep = function (index) {
    if (this.getFlowEditorType() === "protocolo") return false;
    return teV271Original.removeFlowEditorStep.call(this, index);
  };

  TextExpressApp.prototype.validateProtocolFlowStep = function (step, index) {
    if (!String(step?.conteudo || "").trim()) {
      return `Preencha o texto do protocolo “${TE_V271_PROTOCOL_FLOW_PRESETS[index]?.nome || `opção ${index + 1}`}”.`;
    }
    return teV271Original.validateProtocolFlowStep.call(this, step, index);
  };

  TextExpressApp.prototype.getWorkflowStepPreview = function (flow, step) {
    if (flow?.tipo === "protocolo") {
      return String(step?.conteudo || "").trim() || this.describeFlowStepAction(step);
    }
    return teV271Original.getWorkflowStepPreview.call(this, flow, step);
  };

  TextExpressApp.prototype.renderSequenceMenu = function () {
    const result = teV271Original.renderSequenceMenu.call(this);
    const flow = this.getActiveSequence();
    if (flow?.tipo === "protocolo") {
      this.sequenceList?.querySelectorAll(".te-sequence-item").forEach((item) => {
        const index = Number(item.dataset.teStepIndex);
        const preview = item.querySelector(".te-sequence-item-content > span:not(.te-sequence-keywords):not(.te-protocol-action-inline)");
        if (preview) {
          preview.classList.add("te-protocol-preview");
          preview.title = this.getWorkflowStepPreview(flow, flow.etapas[index]);
        }
      });
    }
    return result;
  };


  /* ==========================================================
   * Text Express 27.2 — protocolos flexíveis, acionamento
   * confiável e pesquisa inteligente
   * ========================================================== */
  const teV272Original = Object.freeze({
    onGlobalKeyDown: TextExpressApp.prototype.onGlobalKeyDown,
    renderSequenceMenu: TextExpressApp.prototype.renderSequenceMenu
  });

  TextExpressApp.prototype.smartSearchNormalize = function (value) {
    return this.normalizeSearchText(String(value || ""))
      .replace(/^\/+/, "")
      .replace(/[_-]+/g, " ")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  TextExpressApp.prototype.smartSearchDistance = function (first, second, limit = 3) {
    const a = String(first || "");
    const b = String(second || "");
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    if (Math.abs(a.length - b.length) > limit) return limit + 1;

    let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let row = 1; row <= a.length; row += 1) {
      const current = [row];
      let rowMinimum = current[0];
      for (let column = 1; column <= b.length; column += 1) {
        const cost = a[row - 1] === b[column - 1] ? 0 : 1;
        const value = Math.min(
          current[column - 1] + 1,
          previous[column] + 1,
          previous[column - 1] + cost
        );
        current[column] = value;
        rowMinimum = Math.min(rowMinimum, value);
      }
      if (rowMinimum > limit) return limit + 1;
      previous = current;
    }
    return previous[b.length];
  };

  TextExpressApp.prototype.smartSearchTokenScore = function (queryToken, candidateToken) {
    if (!queryToken || !candidateToken) return 0;
    if (queryToken === candidateToken) return 100;
    if (candidateToken.startsWith(queryToken)) return 78;
    if (queryToken.startsWith(candidateToken) && candidateToken.length >= 3) return 62;
    if (candidateToken.includes(queryToken)) return 54;
    if (queryToken.includes(candidateToken) && candidateToken.length >= 4) return 42;

    const threshold = queryToken.length >= 8 ? 2 : queryToken.length >= 4 ? 1 : 0;
    if (!threshold) return 0;
    const distance = this.smartSearchDistance(queryToken, candidateToken, threshold);
    return distance <= threshold ? 38 - distance * 8 : 0;
  };

  TextExpressApp.prototype.smartSearchScore = function (queryValue, fields = []) {
    const query = this.smartSearchNormalize(queryValue);
    if (!query) return 1;
    const queryTokens = query.split(" ").filter(Boolean);
    const prepared = fields
      .map((field) => ({
        text: this.smartSearchNormalize(field?.value),
        weight: Number(field?.weight || 1)
      }))
      .filter((field) => field.text);
    if (!prepared.length) return 0;

    let total = 0;
    for (const field of prepared) {
      if (field.text === query) total += 220 * field.weight;
      else if (field.text.startsWith(query)) total += 120 * field.weight;
      else if (field.text.includes(query)) total += 80 * field.weight;
    }

    for (const queryToken of queryTokens) {
      let best = 0;
      for (const field of prepared) {
        const candidateTokens = field.text.split(" ").filter(Boolean);
        for (const candidateToken of candidateTokens) {
          best = Math.max(
            best,
            this.smartSearchTokenScore(queryToken, candidateToken) * field.weight
          );
        }
      }
      if (!best) return 0;
      total += best;
    }
    return total;
  };

  TextExpressApp.prototype.getFilteredSnippets = function () {
    const query = String(this.searchInput?.value || "");
    const candidates = this.snippets
      .map((snippet, index) => ({ snippet, index }))
      .filter(({ snippet }) => {
        if (!snippet.ativo) return false;
        const matchesType = this.activeType === "favoritos"
          ? snippet.favorito
          : snippet.tipo === this.activeType;
        if (!matchesType) return false;
        return this.activeCategory === "Todos" || snippet.categoriaId === this.activeCategory;
      });

    if (!this.smartSearchNormalize(query)) return candidates.map(({ snippet }) => snippet);

    return candidates
      .map(({ snippet, index }) => {
        const category = this.getCategoryForSnippet(snippet);
        const stepNames = snippet.modelo === "fluxo"
          ? (snippet.etapas || []).map((step) => step.nome).join(" ")
          : "";
        const stepShortcuts = snippet.modelo === "fluxo"
          ? (snippet.etapas || []).flatMap((step) => [step.atalho, ...(step.palavrasChave || [])]).join(" ")
          : "";
        const stepContent = snippet.modelo === "fluxo"
          ? (snippet.etapas || []).map((step) => step.conteudo).join(" ")
          : "";
        const score = this.smartSearchScore(query, [
          { value: snippet.nome, weight: 6 },
          { value: snippet.atalho, weight: 6 },
          { value: stepNames, weight: 5 },
          { value: stepShortcuts, weight: 5 },
          { value: category?.nome, weight: 3 },
          { value: snippet.grupo, weight: 2 },
          { value: snippet.contexto, weight: 2 },
          { value: snippet.conteudo, weight: 1 },
          { value: stepContent, weight: 1 }
        ]);
        return { snippet, index, score };
      })
      .filter((item) => item.score > 0)
      .sort((first, second) => second.score - first.score || first.index - second.index)
      .map(({ snippet }) => snippet);
  };

  TextExpressApp.prototype.getWorkflowCommandAliases = function (step) {
    const aliases = new Set();
    const add = (value, allowSlash = true) => {
      const normalized = this.smartSearchNormalize(value);
      if (!normalized) return;
      aliases.add(normalized);
      aliases.add(normalized.replace(/\s+/g, "-"));
      if (allowSlash) {
        aliases.add(`/${normalized.replace(/\s+/g, "-")}`);
      }
    };

    add(step?.atalho, true);
    (step?.palavrasChave || []).forEach((keyword) => add(keyword, true));
    add(step?.nome, false);
    return [...aliases].filter((alias) => alias && alias !== "/");
  };

  TextExpressApp.prototype.findActiveSequenceKeywordBeforeCaret = function (element, triggerKey) {
    const flow = this.getActiveSequence();
    if (!flow || !this.isSequenceMenuOpen()) return null;
    const before = this.getTextBeforeCaret(element);
    const foldedBefore = String(before || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const numericMatch = foldedBefore.match(/(?:^|\s)(\d{1,2})$/);
    if (numericMatch) {
      const stepIndex = Number(numericMatch[1]) - 1;
      const step = flow.etapas?.[stepIndex];
      if (step && step.triggerKey === triggerKey) {
        return {
          shortcut: numericMatch[1],
          matchedLength: numericMatch[1].length,
          flow,
          step,
          stepIndex
        };
      }
    }

    for (let index = 0; index < (flow.etapas || []).length; index += 1) {
      const step = flow.etapas[index];
      if (step.triggerKey !== triggerKey) continue;
      const aliases = this.getWorkflowCommandAliases(step).sort((a, b) => b.length - a.length);
      for (const alias of aliases) {
        const hasSlash = alias.startsWith("/");
        const cleanAlias = alias.replace(/^\/+/, "");
        const words = cleanAlias.split(/[\s_-]+/).filter(Boolean);
        if (!words.length) continue;
        const pattern = words
          .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
          .join("[\\s_-]+");
        const expression = new RegExp(`(?:^|\\s)(${hasSlash ? "\\/" : "\\/?"}${pattern})$`, "i");
        const match = foldedBefore.match(expression);
        if (!match) continue;
        return {
          shortcut: match[1],
          matchedLength: match[1].length,
          flow,
          step,
          stepIndex: index
        };
      }
    }
    return null;
  };

  TextExpressApp.prototype.onGlobalKeyDown = function (event) {
    if (
      this.isSequenceMenuOpen() &&
      !event.defaultPrevented &&
      !event.isComposing &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      const editable = this.getEditableFromEvent(event);
      if (editable && !this.root.contains(editable)) {
        this.lastActiveElement = editable;
        this.captureContentEditableRange(editable);
        const flow = this.getActiveSequence();

        if (/^[1-9]$/.test(event.key) && this.isEditableBlankForNumberSelection(editable)) {
          const stepIndex = Number(event.key) - 1;
          if (flow?.etapas?.[stepIndex]) {
            event.preventDefault();
            event.stopImmediatePropagation?.();
            event.stopPropagation();
            const context = this.captureInsertionContext(editable, 0);
            void this.insertSequenceStep(flow.id, stepIndex, context);
            return;
          }
        }

        const triggerKey = this.getTriggerKey(event);
        if (triggerKey) {
          const aliasMatch = this.findActiveSequenceKeywordBeforeCaret(editable, triggerKey);
          if (aliasMatch) {
            event.preventDefault();
            event.stopImmediatePropagation?.();
            event.stopPropagation();
            const context = this.captureInsertionContext(
              editable,
              aliasMatch.matchedLength || aliasMatch.shortcut.length
            );
            void this.insertSequenceStep(aliasMatch.flow.id, aliasMatch.stepIndex, context);
            return;
          }
        }
      }
    }

    return teV272Original.onGlobalKeyDown.call(this, event);
  };

  TextExpressApp.prototype.renderSequenceMenu = function () {
    this.ensureSequenceMenu();
    const flow = this.getActiveSequence();
    if (!flow) {
      this.closeSequenceMenu(false);
      return;
    }

    const isProtocol = flow.tipo === "protocolo";
    const query = String(this.sequenceSearchInput?.value || "");
    const state = this.getFlowState(flow);
    const matches = (flow.etapas || [])
      .map((step, index) => ({
        step,
        index,
        score: this.smartSearchNormalize(query)
          ? this.smartSearchScore(query, [
              { value: String(index + 1), weight: 8 },
              { value: step.nome, weight: 6 },
              { value: step.atalho, weight: 6 },
              { value: (step.palavrasChave || []).join(" "), weight: 6 },
              { value: this.getWorkflowStepPreview(flow, step), weight: 2 },
              { value: this.getFlowActionLabel(step), weight: 2 }
            ])
          : 1
      }))
      .filter((item) => item.score > 0)
      .sort((first, second) => second.score - first.score || first.index - second.index);

    const command = this.sequenceMenu.querySelector("#te-sequence-command");
    const title = this.sequenceMenu.querySelector("#te-sequence-title");
    const count = this.sequenceMenu.querySelector("#te-sequence-count");
    const back = this.sequenceMenu.querySelector('[data-te-action="workflow-back"]');
    const footerSpans = this.sequenceMenu.querySelectorAll(".te-sequence-menu-footer span");

    if (command) command.textContent = `${isProtocol ? "FLUXO" : "SEQUÊNCIA"} ${flow.atalho}`;
    if (title) title.textContent = flow.nome;
    if (count) count.textContent = `${flow.etapas.length} ${isProtocol ? (flow.etapas.length === 1 ? "opção" : "opções") : (flow.etapas.length === 1 ? "pergunta" : "perguntas")}`;
    back?.classList.toggle("te-hidden", !(this.workflowNavigationStack?.length));
    this.sequenceMenu.setAttribute("aria-label", isProtocol ? "Fluxo de protocolo aberto" : "Sequência de atendimento aberta");
    this.sequenceMenu.classList.toggle("te-protocol-workflow-menu", isProtocol);
    if (footerSpans[0]) footerSpans[0].innerHTML = `${this.icon("zap")} No campo vazio, digite o número. Use também nome, atalho ou palavra-chave e pressione a tecla configurada.`;
    if (footerSpans[1]) footerSpans[1].textContent = isProtocol ? "O menu permanece aberto após executar." : "O menu permanece aberto após inserir.";

    this.sequenceList.innerHTML = matches.length
      ? matches.map(({ step, index }) => {
          const keywords = this.getSequenceStepKeywords(step);
          const chips = keywords.map((keyword) => `<code>${this.escapeHtml(keyword)}</code>`).join("");
          const preview = this.getWorkflowStepPreview(flow, step);
          return `
            <button class="te-sequence-item ${state.current === index ? "te-current" : ""} ${state.used.has(index) ? "te-used" : ""}" type="button" data-te-action="sequence-step-insert" data-te-id="${this.escapeAttr(flow.id)}" data-te-step-index="${index}">
              <span class="te-sequence-number">${index + 1}</span>
              <span class="te-sequence-item-content">
                <strong>${this.escapeHtml(step.nome)}</strong>
                <span>${this.escapeHtml(preview)}</span>
                ${isProtocol ? `<span class="te-protocol-action-inline">${this.icon(this.getFlowActionIcon(step))}${this.escapeHtml(this.getFlowActionLabel(step))}</span>` : ""}
                <span class="te-sequence-keywords">${chips || "<em>Sem palavra-chave adicional</em>"}</span>
              </span>
              <span class="te-sequence-item-action">${state.used.has(index) ? this.icon("check-circle") : this.icon(this.getFlowActionIcon(step))}</span>
            </button>`;
        }).join("")
      : `<div class="te-sequence-empty">${this.icon("search")}<strong>Nenhuma opção encontrada</strong><span>A pesquisa tolera acentos, palavras parciais e pequenos erros de digitação.</span></div>`;
  };

  /* Restaura o editor flexível de Fluxo de Protocolo da versão 27.0.
   * Os fluxos existentes continuam com Normalizado e Aberto O.S., mas
   * nomes, textos, atalhos, ações e quantidade de opções passam a ser livres. */
  TextExpressApp.prototype.normalizeSnippet = function (raw = {}) {
    return teV271Original.normalizeSnippet.call(this, raw);
  };

  TextExpressApp.prototype.openModal = function (data = null) {
    return teV271Original.openModal.call(this, data);
  };

  TextExpressApp.prototype.updateModelKindUI = function () {
    const result = teV271Original.updateModelKindUI.call(this);
    const type = this.getFlowEditorType();
    const kind = this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico";
    const help = this.root.querySelector("#te-flow-editor-help");
    if (type === "protocolo" && kind === "fluxo" && help) {
      help.textContent = "Crie, renomeie, reordene ou exclua opções. Cada uma pode inserir um protocolo ou executar outra ação.";
    }
    return result;
  };

  TextExpressApp.prototype.renderFlowEditorSteps = function () {
    const result = teV271Original.renderFlowEditorSteps.call(this);
    if (this.getFlowEditorType() === "protocolo") {
      this.root.querySelectorAll(".te-protocol-flow-step-editor").forEach((editor, index) => {
        const name = editor.querySelector('[data-te-flow-field="nome"]')?.value?.trim();
        const heading = editor.querySelector("header > strong");
        if (heading) heading.textContent = name || `Opção ${index + 1}`;
      });
    }
    return result;
  };

  TextExpressApp.prototype.syncEditingFlowSteps = function () {
    return teV271Original.syncEditingFlowSteps.call(this);
  };

  TextExpressApp.prototype.addFlowEditorStep = function () {
    return teV271Original.addFlowEditorStep.call(this);
  };

  TextExpressApp.prototype.removeFlowEditorStep = function (index) {
    return teV271Original.removeFlowEditorStep.call(this, index);
  };

  TextExpressApp.prototype.validateProtocolFlowStep = function (step, index) {
    return teV271Original.validateProtocolFlowStep.call(this, step, index);
  };

  /* ==========================================================
   * Text Express 27.3 — editor de Protocolos no padrão das
   * Falas da sequência e nova base padrão do usuário.
   * ========================================================== */
  const TE_V273_DEFAULT_DECK_VERSION = "2026-08-06-backup-completo-v2";
  const TE_V273_DEFAULT_DECK_STORAGE_KEY = "text_express_default_deck_version";
  const TE_V273_PREVIOUS_DECK_BACKUP_KEY = "text_express_backup_before_default_deck_v28_0_1";

  const teV273Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    updateModelKindUI: TextExpressApp.prototype.updateModelKindUI,
    renderFlowEditorSteps: TextExpressApp.prototype.renderFlowEditorSteps,
    syncEditingFlowSteps: TextExpressApp.prototype.syncEditingFlowSteps,
    addFlowEditorStep: TextExpressApp.prototype.addFlowEditorStep,
    removeFlowEditorStep: TextExpressApp.prototype.removeFlowEditorStep,
    handleRootInput: TextExpressApp.prototype.handleRootInput
  });

  TextExpressApp.prototype.prepareDefaultDeckV273 = function () {
    try {
      const storage = window.localStorage;
      if (storage.getItem(TE_V273_DEFAULT_DECK_STORAGE_KEY) === TE_V273_DEFAULT_DECK_VERSION) {
        return false;
      }

      const previousSnippets = storage.getItem(STORAGE_KEYS.snippets);
      const previousCategories = storage.getItem(STORAGE_KEYS.categories);
      if (previousSnippets || previousCategories) {
        storage.setItem(TE_V273_PREVIOUS_DECK_BACKUP_KEY, JSON.stringify({
          app: "Text Express",
          backupType: "automatic-before-default-deck-update",
          createdAt: new Date().toISOString(),
          targetVersion: APP_VERSION,
          snippetsPayload: previousSnippets,
          categoriesPayload: previousCategories
        }));
      }

      storage.removeItem(STORAGE_KEYS.snippets);
      storage.removeItem(STORAGE_KEYS.categories);
      storage.setItem(TE_V273_DEFAULT_DECK_STORAGE_KEY, TE_V273_DEFAULT_DECK_VERSION);
      return true;
    } catch (error) {
      return false;
    }
  };

  TextExpressApp.prototype.updateModelKindUI = function () {
    const result = teV273Original.updateModelKindUI.call(this);
    const type = this.getFlowEditorType();
    const kind = this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico";
    if (type !== "protocolo" || kind !== "fluxo") return result;

    const addButton = this.root.querySelector('[data-te-action="flow-step-add"]');
    const addLabel = this.root.querySelector("#te-flow-add-label");
    const heading = this.root.querySelector("#te-flow-editor-title");
    const help = this.root.querySelector("#te-flow-editor-help");

    addButton?.classList.remove("te-hidden");
    if (addLabel) addLabel.textContent = "Adicionar opção";
    if (heading) heading.textContent = "Opções do protocolo";
    if (help) {
      help.textContent = "Funciona como as Falas da sequência: edite nome, atalho, tecla, texto e palavras-chave de cada opção.";
    }
    return result;
  };

  TextExpressApp.prototype.renderFlowEditorSteps = function () {
    if (this.getFlowEditorType() !== "protocolo") {
      return teV273Original.renderFlowEditorSteps.call(this);
    }

    const container = this.root.querySelector("#te-flow-editor-steps");
    if (!container) return;
    const flowTargets = this.getProtocolFlowTargets();
    const sequenceTargets = this.getAttendanceSequenceTargets();

    container.innerHTML = this.editingFlowSteps.map((step, index) => {
      const actionType = this.getFlowActionType(step);
      const isInsert = actionType === TE_V27_FLOW_ACTIONS.INSERT;
      const isFlow = actionType === TE_V27_FLOW_ACTIONS.FLOW;
      const isSequence = actionType === TE_V27_FLOW_ACTIONS.SEQUENCE;
      const isUrl = actionType === TE_V27_FLOW_ACTIONS.URL;
      const isCustom = actionType === TE_V27_FLOW_ACTIONS.CUSTOM;
      const displayName = String(step.nome || "").trim() || `Opção ${index + 1}`;

      return `
        <article class="te-flow-step-editor te-protocol-flow-step-editor te-protocol-card-editor" data-te-flow-editor-index="${index}">
          <header>
            <span class="te-flow-step-editor-number">${index + 1}</span>
            <strong>${this.escapeHtml(displayName)}</strong>
            <div class="te-flow-editor-actions">
              <button class="te-icon-action" type="button" data-te-action="flow-editor-up" data-te-step-index="${index}" title="Mover para cima" ${index === 0 ? "disabled" : ""}>${this.icon("chevron-left")}</button>
              <button class="te-icon-action" type="button" data-te-action="flow-editor-down" data-te-step-index="${index}" title="Mover para baixo" ${index === this.editingFlowSteps.length - 1 ? "disabled" : ""}>${this.icon("chevron-right")}</button>
              <button class="te-icon-action te-delete" type="button" data-te-action="flow-editor-remove" data-te-step-index="${index}" title="Excluir opção">${this.icon("trash")}</button>
            </div>
          </header>
          <div class="te-flow-step-editor-grid">
            <label>
              <span>Nome da opção</span>
              <input type="text" data-te-flow-field="nome" maxlength="100" value="${this.escapeAttr(step.nome)}" placeholder="Ex.: Normalizado">
            </label>
            <label>
              <span>Atalho direto</span>
              <input type="text" data-te-flow-field="atalho" maxlength="60" value="${this.escapeAttr(step.atalho)}" spellcheck="false" placeholder="/protocolo${index + 1}">
            </label>
            <label>
              <span>Ativar com</span>
              <select data-te-flow-field="triggerKey">
                <option value="space" ${step.triggerKey === "space" ? "selected" : ""}>Espaço</option>
                <option value="tab" ${step.triggerKey === "tab" ? "selected" : ""}>Tab</option>
                <option value="enter" ${step.triggerKey === "enter" ? "selected" : ""}>Enter</option>
              </select>
            </label>
            <label class="te-flow-optional-check">
              <input type="checkbox" data-te-flow-field="opcional" ${step.opcional ? "checked" : ""}>
              <span>Opção opcional</span>
            </label>
            <label class="te-flow-step-content-field te-protocol-text-field">
              <span>Texto do protocolo</span>
              <textarea rows="5" data-te-flow-field="conteudo" placeholder="Digite o texto desta opção...">${this.escapeHtml(step.conteudo)}</textarea>
            </label>
            <label class="te-flow-keywords-field">
              <span>Palavras-chave desta opção</span>
              <input type="text" data-te-flow-field="palavrasChave" value="${this.escapeAttr((step.palavrasChave || []).join(", "))}" spellcheck="false" placeholder="/normal, /resolvido, /os">
              <small>Separe por vírgulas. Elas funcionam enquanto este protocolo estiver aberto.</small>
            </label>
            <label class="te-protocol-action-type-field">
              <span>Ação ao selecionar</span>
              <select data-te-flow-field="acaoTipo">
                <option value="inserir" ${isInsert ? "selected" : ""}>Inserir o texto do protocolo</option>
                <option value="fluxo" ${isFlow ? "selected" : ""}>Abrir outro fluxo de protocolo</option>
                <option value="sequencia" ${isSequence ? "selected" : ""}>Abrir sequência do Atendimento</option>
                <option value="url" ${isUrl ? "selected" : ""}>Abrir atendimento externo</option>
                <option value="personalizada" ${isCustom ? "selected" : ""}>Executar ação personalizada</option>
              </select>
              <small>O padrão é inserir o texto. As demais ações continuam disponíveis para integrações avançadas.</small>
            </label>
            <label class="te-flow-step-content-field ${isFlow ? "" : "te-hidden"}" data-te-flow-action-panel="fluxo">
              <span>Fluxo de destino</span>
              <select data-te-flow-field="acaoAlvoIdFluxo">${this.renderFlowTargetOptions(flowTargets, step.acaoAlvoId, "Selecione outro fluxo de protocolo")}</select>
            </label>
            <label class="te-flow-step-content-field ${isSequence ? "" : "te-hidden"}" data-te-flow-action-panel="sequencia">
              <span>Sequência de destino</span>
              <select data-te-flow-field="acaoAlvoIdSequencia">${this.renderFlowTargetOptions(sequenceTargets, step.acaoAlvoId, "Selecione uma sequência do Atendimento")}</select>
            </label>
            <label class="te-flow-step-content-field ${isUrl ? "" : "te-hidden"}" data-te-flow-action-panel="url">
              <span>Endereço do atendimento externo</span>
              <input type="url" data-te-flow-field="acaoUrl" value="${this.escapeAttr(step.acaoUrl || "")}" placeholder="https://sistema.exemplo/atendimento">
            </label>
            <label class="te-flow-step-content-field ${isCustom ? "" : "te-hidden"}" data-te-flow-action-panel="personalizada">
              <span>Identificador da ação personalizada</span>
              <input type="text" data-te-flow-field="acaoPersonalizada" value="${this.escapeAttr(step.acaoPersonalizada || "")}" placeholder="ex.: abrir-painel-tecnico">
            </label>
          </div>
        </article>`;
    }).join("");

    this.updateFlowVariablePreview();
  };

  TextExpressApp.prototype.syncEditingFlowSteps = function () {
    if (this.getFlowEditorType() !== "protocolo") {
      return teV273Original.syncEditingFlowSteps.call(this);
    }

    const editors = [...this.root.querySelectorAll(".te-protocol-card-editor")];
    const parentShortcut = this.root.querySelector("#te-form-shortcut")?.value || "/protocolo";
    this.editingFlowSteps = editors.map((editor, index) => {
      const get = (field) => editor.querySelector(`[data-te-flow-field="${field}"]`);
      const actionType = this.getFlowActionType({ acaoTipo: get("acaoTipo")?.value });
      const targetId = actionType === TE_V27_FLOW_ACTIONS.FLOW
        ? get("acaoAlvoIdFluxo")?.value
        : actionType === TE_V27_FLOW_ACTIONS.SEQUENCE
          ? get("acaoAlvoIdSequencia")?.value
          : "";

      return this.normalizeFlowStep({
        id: this.editingFlowSteps[index]?.id,
        nome: get("nome")?.value,
        atalho: get("atalho")?.value,
        conteudo: get("conteudo")?.value,
        triggerKey: get("triggerKey")?.value,
        opcional: Boolean(get("opcional")?.checked),
        palavrasChave: get("palavrasChave")?.value,
        acaoTipo: actionType,
        acaoAlvoId: targetId,
        acaoUrl: get("acaoUrl")?.value,
        acaoPersonalizada: get("acaoPersonalizada")?.value
      }, index, parentShortcut);
    });
    return this.editingFlowSteps;
  };

  TextExpressApp.prototype.addFlowEditorStep = function () {
    if (this.getFlowEditorType() !== "protocolo") {
      return teV273Original.addFlowEditorStep.call(this);
    }
    this.syncEditingFlowSteps();
    const index = this.editingFlowSteps.length;
    const parent = this.root.querySelector("#te-form-shortcut")?.value || "/protocolo";
    this.editingFlowSteps.push(this.normalizeFlowStep({
      nome: `Opção ${index + 1}`,
      atalho: `${this.normalizeShortcut(parent)}${index + 1}`,
      conteudo: "",
      triggerKey: "space",
      opcional: false,
      palavrasChave: [],
      acaoTipo: TE_V27_FLOW_ACTIONS.INSERT
    }, index, parent));
    this.renderFlowEditorSteps();
    return true;
  };

  TextExpressApp.prototype.removeFlowEditorStep = function (index) {
    if (this.getFlowEditorType() !== "protocolo") {
      return teV273Original.removeFlowEditorStep.call(this, index);
    }
    this.syncEditingFlowSteps();
    if (this.editingFlowSteps.length <= 2) {
      const error = this.root.querySelector("#te-flow-error");
      if (error) error.textContent = "Um protocolo em fluxo precisa ter pelo menos duas opções.";
      return false;
    }
    this.editingFlowSteps.splice(index, 1);
    this.renderFlowEditorSteps();
    return true;
  };

  TextExpressApp.prototype.handleRootInput = function (event) {
    const result = teV273Original.handleRootInput.call(this, event);
    if (event.target?.matches?.('.te-protocol-card-editor [data-te-flow-field="nome"]')) {
      const editor = event.target.closest(".te-protocol-card-editor");
      const heading = editor?.querySelector("header > strong");
      const index = Number(editor?.dataset.teFlowEditorIndex || 0);
      if (heading) heading.textContent = event.target.value.trim() || `Opção ${index + 1}`;
    }
    return result;
  };

  TextExpressApp.prototype.init = function () {
    const defaultDeckApplied = this.prepareDefaultDeckV273();
    const result = teV273Original.init.call(this);
    this.root.dataset.version = APP_VERSION;
    if (defaultDeckApplied) {
      window.requestAnimationFrame(() => {
        this.showToast(
          "Nova base padrão aplicada: 21 categorias e 132 cartões. A base anterior foi guardada como backup interno.",
          "success",
          7500
        );
      });
    }
    return result;
  };

  /* ==========================================================
   * Text Express 28.0 — etiquetas automáticas e persistência
   * - catálogo interno sem criar uma nova aba;
   * - uma etiqueta opcional por cartão de Protocolo;
   * - aplicação no sistema externo sem usar Categoria;
   * - prevenção de repetição pela etiqueta visível na página;
   * - seleção numérica imediata nos fluxos de Protocolo;
   * - rascunhos do editor preservados entre sessões.
   * ========================================================== */
  const TE_V28_LABEL_CATALOG_KEY = "text_express_protocol_label_catalog_v28";
  const TE_V28_MODEL_DRAFTS_KEY = "text_express_model_drafts_v28";
  const TE_V28_NEW_DRAFT_KEY = "__new_model__";
  const TE_V28_DEFAULT_LABEL_GROUPS = [{"name":"1. BANDA LARGA FIXA (FTTH)","labels":["LOS - FTTH","Pon apagada - FTTH","Pon piscando - FTTH","Rota inoperante - FTTH","Roteador sem gerencia - FTTH","ONU sem IP - FTTH","PPPoE desconectado - FTTH","Manutenção na rede brisanet","Sistema interno indisponível","Chamado imoc","Sem acesso site ou sistema especifico - FTTH","Equipamento desligado da energia - FTTH","Equipamento desligado no botao POWER - FTTH","Sem conexao a dispositivo(s) especifico(s) - FTTH","Dispositivo Conectado, mas sem Internet - FTTH","Wi-Fi padrao de fabrica - resetado - FTTH","Baixo Alcance Wi-Fi - FTTH","Lentidão geral em todos dispositivo - FTTH","Lentidão em dispositivos específicos - FTTH","Lentidão em site específicos - FTTH","Instabilidade em IPTV (Não homologado) - FTTH","Sem acesso a serviço IPTV (Não homologado) - FTTH","Rota com sinal irregular - FTTH","Sinal da fibra do cliente irregular - FTTH","Quedas na conexão - FTTH","Plano não chega o contratado - FTTH","Instabilidade massiva na rede brisanet - FTTH","Instabilidade massiva na rede externa - FTTH","Problema em jogos online - FTTH","Agendamento de retorno","Ligação sem contato","Cliente desistiu da visita técnica","Ligação caiu","Solicitação de atendimento voz/texto","Solicitação de declaração","Ligações escritório","Atendimento encerrado por falta de cordialidade","Atendimento encerrado por falta de confirmação de dados","Transferencia para o Comercial","Duvidas comercial","Transferencia para o Cobranca","Duvidas financeira","Transferencia para o SAC","Duvidas sobre alteracao de endereco","Duvidas sobre alteracao de titular","Transferencia para o Retencao","Duvidas sobre cancelamento","Transferencia para o SAC 5G","Transferencia para o Suporte Corporativo B2B","Transferencia para o Regional","Transferencia indevida para o suporte","Transferencia para pausa","Orientação sobre ocultar a rede wi-fi - FTTH","Orientação sobre como consultar a senha do wi-fi - FTTH","Orientação sobre rede unificada - FTTH","Informação sobre os canais de atendimento - FTTH","Solicitação do número de IP - FTTH","Orientação de como contratar o IP FIXO - FTTH","Solicitação para separar a rede wi-fi - FTTH","Solicitação do cliente para desabilitar o wi-fi - FTTH","Solicitação de acesso ao equipamento da brisanet - FTTH","Informações sobre valores dos serviços avulso - FTTH","Cliente com inadimplencia financeira - bloqueado - FTTH","Dúvidas sobre a função do WPS - FTTH","Bloqueio IP - VPN - FTTH","Alterar senha PPPoE - FTTH","Alterar login PPPoE - FTTH","Atualização de contato","Alteração de ip fixo - FTTH","Alteração da senha do Wi-Fi - FTTH","Altreração do canal da rede Wi-Fi - FTTH","Alteração do modo da rede Wi-Fi - FTTH","Altreração da largura de banda da rede Wi-Fi - FTTH","Personalizar o nome da rede Wi-Fi - FTTH","Troca de cabo de rede","Troca de cabo fibra - FTTH","Troca de fonte - FTTH","Troca de onu - FTTH","Cabo de fibra baixo/remanejamento - FTTH","Recolher roteador - FTTH","Troca de roteador - FTTH","Instalação de roteador - FTTH","Suspeita de equipamento danificado","Suporte a equipamento particular","Alteração de cômodo","Configuração estruturada de rede interna","Cobrança de instalação fora do prazo","Cobrança de instalação dentro do prazo","Cobrança de reparo dentro do prazo","Cobrança de reparo fora do prazo","Cobrança de retorno interno","Conecta+","Cobrança de alt. De endereço dentro do prazo","Cobrança de alt. De endereço fora do prazo","Alteração de titularidade (dentro do prazo)","Alteração de titularidade (fora do prazo)","Instalação inadequada (local) - 7d","Instalação mal sucedida (sem acesso) - 7d","Configuração de roteador não realizada na instalação - 7d","Cabo de rede não disponibilizado no ato da instalação - até 7d","Insatisfeito com o equipamento instalado - 7d","Conecta+ (cabo não deixado no ato da inst.) - 7d","Alteração de endereço mal sucedida","Transferência para pausa","Cliente ja atendido"]},{"name":"2. FWA (RÁDIO)","labels":["CPE sem sinal - FWA","Falta de energia na torre - FWA","Torre inoperante - FWA","Manutenção na rede brisanet","Sem acesso site ou sistema específico - FWA","Equipamento desligado da energia - FWA","Equipamento desligado no botão POWER - FWA","Sem conexão a dispositivo(s) especifico(s) - FWA","Dispositivo Conectado, mas sem Internet - FWA","Wi-Fi padrão de fábrica - resetado - FWA","Sistema interno indisponivel","Atingiu a franquia - FWA","Quedas na conexao - FWA","Instabilidade massiva na rede externa - FWA","Instabilidade massiva na rede brisanet - FWA","Sinal da CPE irregular - FWA","Baixo Alcance Wi-Fi - FWA","Lentidão geral em todos dispositivo - FWA","Lentidão em dispositivos específicos - FWA","Lentidão em site específicos - FWA","Instabilidade em IPTV (Não homologado) - FWA","Sem acesso a serviço IPTV (Não homologado) - FWA","Alteração da senha do Wi-Fi - FWA","Altreracao do canal da rede Wi-Fi - FWA","Alteração do modo da rede Wi-Fi - FWA","Altreração da largura de banda da rede Wi-Fi - FWA","Personalizar o nome da rede Wi-Fi - FWA","Troca de fonte - FWA","Troca de CPE - FWA","Troca de SIMCard - FWA","Suspeita de equipamento danificado","Equipamento furtado","Troca de cabo de rede","Configuracao estruturada de rede interna","Alteracao de comodo","Suporte a equipamento particular","Cobrança de reparo fora do prazo","Cobrança de reparo dentro do prazo","Cobranca de Alt. de endereco fora do prazo","Cobranca de Alt. de endereco dentro do prazo","Cobranca de instalacao fora do prazo","Cobranca de instalacao dentro do prazo","Cobranca de retorno interno","Conecta+","Alteracao de titularidade (dentro do prazo)","Alteracao de titularidade (fora do prazo)","Informacao de consumo da franquia - FWA","Orientação sobre ocultar a rede wi-fi - FWA","Orientação sobre como consultar a senha do wi-fi - FWA","Orientação sobre rede unificada - FWA","Informação sobre os canais de atendimento - FWA","Solicitação do número de IP - FWA","Solicitação para separar a rede wi-fi - FWA","Solicitação de acesso ao equipamento da brisanet - FWA","Informações sobre valores dos serviços avulso - FWA","Cliente com inadimplencia financeira - bloqueado - FWA","Dúvidas sobre a função do WPS - FWA","Bloqueio IP - VPN - FWA","Duvidas comercial","Duvidas financeira","Duvidas sobre alteracao de endereco","Duvidas sobre alteracao de titular","Duvidas sobre cancelamento","Transferencia indevida para o suporte","Transferencia para o Cobranca","Transferencia para o Comercial","Transferencia para o Regional","Transferencia para o Retencao","Transferencia para o SAC","Transferencia para o SAC 5G","Transferencia para o Suporte Corporativo B2B","Solicitacao de declaracao","Solicitacao de atendimento voz/texto","Atendimento encerrado por falta de coordialidade","Atualizacao de contato","Agendamento de retorno","Cliente desistiu da visita tecnica","Ligacoes escritorio","Ligação Caiu","Ligação Sem Contato","Alteracao de endereco mal sucedida","Cabo de rede nao disponibilizado no ato da instalacao - ate 7d","Conecta+ (Cabo nao deixado no ato da inst.) - 7d","Configuracao de roteador nao realizada na instalacao - 7d","Insatisfeito com o equipamento instalado - 7d","Instalacao inadequada (local) - 7d","Instalacao mal sucedida (sem acesso) - 7d"]},{"name":"4. APLICATIVOS (SVAs)","labels":["Suporte a aplicativos SVAs","Brisacliente","Brisamusic","Netflix","Globoplay","Premiere","Paramount+","Docway","Telecine","Brisacliente - Problema no login","Brisamusic - Informacoes","Brisamusic - Ativacao","Netflix - Informacoes","Netflix - Ativacao","Globoplay - Informacoes","Globoplay - Ativacao","Premiere - Informacoes","Premiere - Ativacao","Paramount+ - Informacoes","Paramount+ - Ativacao","Saude 24h - Informacoes","Saude 24h - Ativacao","Telecine - Informacoes","Telecine - Ativacao","Brisacliente Fibra - Fatura","Brisacliente Fibra - Contrato","Brisacliente Fibra - Agendamento","Brisacliente Fibra - Alteracoes tecnicas"]},{"name":"5. TELEFONIA FIXA","labels":["Troca de telefone - Telefonia","Telefonia fixa com as ligacoes falhando - Telefonia","Telefonia desativada - Telefonia","Telefonia com falha de autenticacao - Telefonia","Telefonia bloqueada por limite - Telefonia","Telefone mudo - Telefonia","Problema no PABX do cliente - Telefonia","Problema no identificador de chamada - Telefonia","Problema na portabilidade - Telefonia","Operadoras - falha massiva para receber/efetuar - Telefonia","Nao efetua/recebe ligacoes para operadora/numero especifico - Telefonia","Nao efetua/recebe ligacoes - Telefonia","Mudanca de numero da telefonia fixa - Telefonia","Historico de ligacoes da telefonia fixa - Telefonia","Desbloqueio/Bloqueio para realizar ligacoes a cobrar - Telefonia","Desbloqueio/Bloqueio para numeros especifico - Telefonia","Desbloqueio/Bloqueio para ligacoes internacionais - Telefonia","Desbloqueio/Bloqueio para ligacoes 0300/0500 - Telefonia","Aumento/Reducao do limite da telefonia - Telefonia"]},{"name":"6. SUPORTE REGIONAL","labels":["Troca de ONU","Troca de Roteador","Troca de Receptor","Troca de Telefone","Troca de Radio","Remover Roteador","Instalação de Roteador","Suporte a Configurações do Wi-Fi","Alterar Senha PPPoE","Alterar Modo da ONU","Alterar Login PPPoE","Suporte a Equipamento Particular","Suporte a LOS","Suporte a PON PISCANDO","Suporte a PON APAGADA","Suporte a Sinal Irregular","Suporte a Site Especificos Sem Abrir","Suporte a Jogos Online","Suporte a Instabilidade","Suporte ao Roteador Sem Gerencia","Suporte a ONU Sem IP","Informações de VLAN","Suporte a Equipamento Danificado","Sistema Interno Indisponível (REVAN)","Suporte a VPN Particular","Suporte a Direcionamento de Portas","Habilitação do UPnP","Suporte a TV Com NTP","Suporte a Canal Indisponível","Suporte a Canais Quadriculando","Suporte a TV Com Tela Preta","Tela Azul Brisanet","Receptor Bloqueado","Suporte a ativação do BrisaPlay","Problema no Audio","Alteração de Senha TV (autocensura)","Telefone Mudo","Telefonia com falha de autenticacao","Telefonia Desativada","Telefonia Bloqueada por Limite","Problema na Portabilidade","Problema no Pabx do Cliente","Telefonia fixa com as ligações falhando","Não efetua/recebe ligações","Não efetua/recebe ligações para operadora/numero especifico","Problema no Identificador de Chamada","Desbloqueio/Bloqueio para ligações internacionais","Desbloqueio/Bloqueio para ligações 0300/0500","Desbloqueio/Bloqueio para números especifico","Desbloqueio/Bloqueio para realizar ligações a cobrar","Mudança de Numero Fixo","Suporte Aplicativos Brisanet","Informações dos Serviços","Instabilidade massiva na rede Brisanet","Instabilidade massiva na rede externa","Ligação caiu","Tentatica de contato","Ativação no ato da instalação/alt. de endereço"]},{"name":"8. SUPORTE CHIP (5G / N2)","labels":["Consuta de disponibilidade/indisponibilidade do serviço","Consulta de andamento do ticket","Análise em Conjunto N1","Atendimento fora do escopo","Informações de serviço N1 SAC","Informações de serviço N1 Loja","Informações de serviço N1 PAP","Solicitação de prioridade (ticket)","Configuração de Aparelho","Transferência Interna","Sem Acesso a Dados Móveis","Finalizado por Inatividade (Atendimento Encerrado sem Informação)","Problema de rede (problemas generalizados)","Sem Confirmação de Dados/Clientes","VoLTE não configurado","Não recebe e não envia SMS P2P","Não recebe SMS A2P","Não recebe e não efetua ligações","Outros problemas com ligações","Outros problemas com SMS","Roaming","Ativar caixa postal","Desativar caixa postal","Problema Físico","Desbloqueio por suspeita de fraude","Chip sem sinal","Atendimento indevido - Cliente","Informações financeiras - PAP","Informações Técnicas - PAP","Informações Técnicas - N1 Loja","Inadimplência financeira","Instabilidade Service","Bloqueio por suspeita de fraude","Bloqueio financeiro - CORE","IMSI/ Linha divergente - CORE","Erro no aprovisionamento - CORE","Ligação caiu","Site inoperante","Problema geral - SMS","Problema geral - Ligações","Problema geral - Dados","Prroblema no Datacenter"]},{"name":"9. NOVAS SOLICITAÇÕES (em implantação)","labels":["Informações dos serviços","Suporte a equipamento particular","Solicitação de atendimento voz/texto","Solicitação de declaração","Sem acesso com sistema normal","Atendimento encerrado por falta de coordialidade","Atendimento encerrado por falta de confirmação de dados","Ativação da ONU no ato da instalação/alt. de endereço","Lentidão","Quedas de conexão","Plano nao chega o contratado","Brisaplay - erro de login","Brisaplay - canais bloqueados","Brisaplay - canais com código de erro","Brisaplay - canais com tela preta","Brisaplay - canais em manutenção","Brisaplay - falta de canais","Brisaplay - episódios indisponíveis","Brisaplay - problemas com time shifting","Brisaplay - problemas com audio/legenda","Brisaplay - travando/imagem blocando","Transferencia para o Comercial","Duvidas comercial","Transferencia para o Cobranca","Duvidas financeira","Transferencia para o SAC","Duvidas sobre alteracao de endereco","Duvidas sobre alteracao de titular","Transferencia para o Retencao","Duvidas sobre cancelamento","Transferencia para o SAC 5G","Transferencia para o Suporte 5G","Transferencia para o Suporte Corporativo - B2B","Transferencia para o Regional","Transferencia indevida para o suporte","Orientacao tecnica sobre configuracoes"]}];
  const TE_V28_DEFAULT_LABELS = TE_V28_DEFAULT_LABEL_GROUPS.flatMap((group) => group.labels || []);

  const teV28Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    openApp: TextExpressApp.prototype.openApp,
    normalizeSnippet: TextExpressApp.prototype.normalizeSnippet,
    openModal: TextExpressApp.prototype.openModal,
    updateModelKindUI: TextExpressApp.prototype.updateModelKindUI,
    collectSnippetFromForm: TextExpressApp.prototype.collectSnippetFromForm,
    applyCollectedSnippet: TextExpressApp.prototype.applyCollectedSnippet,
    executeWorkflowStep: TextExpressApp.prototype.executeWorkflowStep,
    insertSnippet: TextExpressApp.prototype.insertSnippet,
    expandShortcut: TextExpressApp.prototype.expandShortcut,
    onGlobalKeyDown: TextExpressApp.prototype.onGlobalKeyDown,
    onPersistentShortcutKeyDown: TextExpressApp.prototype.onPersistentShortcutKeyDown,
    restoreCompleteBackup: TextExpressApp.prototype.restoreCompleteBackup,
    mergeImportedBackup: TextExpressApp.prototype.mergeImportedBackup
  });

  TextExpressApp.prototype.ensureDefaultDeckAvailable = function () {
    let repaired = false;

    if (!Array.isArray(this.categories) || !this.categories.length) {
      this.categories = this.getDefaultCategories();
      this.saveCategories();
      repaired = true;
    }

    if (!Array.isArray(this.snippets) || !this.snippets.length) {
      this.snippets = this.getDefaultSnippets();
      this.saveSnippets();
      repaired = true;
    }

    if (repaired) {
      this.activeType = "protocolo";
      this.activeCategory = "Todos";
      this.selectedId = null;
      if (this.searchInput) this.searchInput.value = "";
      this.rebuildShortcutMap();
      this.render();
    }

    return repaired;
  };

  TextExpressApp.prototype.setupReliableLauncherOpen = function () {
    const launcher = this.reopenButton;
    if (!launcher || launcher.dataset.teReliableOpenReady === "true") return;
    launcher.dataset.teReliableOpenReady = "true";

    launcher.addEventListener("pointerup", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (launcher.classList.contains("te-dragging")) return;
      event.preventDefault();
      event.stopPropagation();
      this.openApp();
    }, true);

    launcher.addEventListener("click", (event) => {
      if (!this.panel.classList.contains("te-hidden")) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      this.openApp();
    }, true);
  };

  TextExpressApp.prototype.showProtocolLabelNotice = function (message) {
    this.showToast(message, "success", 2600);
    this.toastStack?.lastElementChild?.classList.add("te-label-notice");
  };

  TextExpressApp.prototype.normalizeProtocolLabel = function (value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180);
  };

  TextExpressApp.prototype.foldProtocolLabel = function (value) {
    return this.normalizeProtocolLabel(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR");
  };

  TextExpressApp.prototype.normalizeProtocolLabelCatalog = function (items) {
    const output = [];
    const used = new Set();
    for (const raw of Array.isArray(items) ? items : []) {
      const label = this.normalizeProtocolLabel(raw);
      const folded = this.foldProtocolLabel(label);
      if (!label || !folded || used.has(folded)) continue;
      used.add(folded);
      output.push(label);
    }
    return output;
  };

  TextExpressApp.prototype.loadProtocolLabelCatalog = function () {
    let stored = [];
    try {
      const parsed = JSON.parse(this.storageGet(TE_V28_LABEL_CATALOG_KEY) || "[]");
      if (Array.isArray(parsed)) stored = parsed;
    } catch {}
    this.protocolLabelCatalog = this.normalizeProtocolLabelCatalog([
      ...TE_V28_DEFAULT_LABELS,
      ...stored
    ]);
    this.saveProtocolLabelCatalog();
  };

  TextExpressApp.prototype.saveProtocolLabelCatalog = function () {
    return this.storageSet(
      TE_V28_LABEL_CATALOG_KEY,
      JSON.stringify(this.protocolLabelCatalog || [])
    );
  };

  TextExpressApp.prototype.addProtocolLabelToCatalog = function (value) {
    const label = this.normalizeProtocolLabel(value);
    if (!label) return "";
    const folded = this.foldProtocolLabel(label);
    const existing = (this.protocolLabelCatalog || []).find(
      (item) => this.foldProtocolLabel(item) === folded
    );
    if (existing) return existing;
    this.protocolLabelCatalog.push(label);
    this.saveProtocolLabelCatalog();
    this.renderProtocolLabelOptions();
    return label;
  };

  TextExpressApp.prototype.renderProtocolLabelOptions = function () {
    const datalist = this.root.querySelector("#te-system-label-options");
    if (!datalist) return;
    const labels = [...(this.protocolLabelCatalog || [])].sort((first, second) =>
      first.localeCompare(second, "pt-BR", { sensitivity: "base" })
    );
    datalist.innerHTML = labels
      .map((label) => `<option value="${this.escapeAttr(label)}"></option>`)
      .join("");
  };

  TextExpressApp.prototype.normalizeSnippet = function (raw = {}) {
    const snippet = teV28Original.normalizeSnippet.call(this, raw);
    snippet.etiquetaSistema = snippet.tipo === "protocolo"
      ? this.normalizeProtocolLabel(raw.etiquetaSistema || raw.systemLabel || "")
      : "";
    return snippet;
  };

  TextExpressApp.prototype.openModal = function (data = null) {
    const result = teV28Original.openModal.call(this, data);
    const field = this.root.querySelector("#te-form-system-label");
    if (field) field.value = data?.tipo === "protocolo" ? (data.etiquetaSistema || "") : "";
    this.renderProtocolLabelOptions();
    this.updateModelKindUI();
    this.restoreCurrentModelDraft(data);
    return result;
  };

  TextExpressApp.prototype.updateModelKindUI = function () {
    const result = teV28Original.updateModelKindUI.call(this);
    const type = this.getFlowEditorType?.()
      || this.root.querySelector('input[name="te-type"]:checked')?.value
      || "atendimento";
    this.root.querySelector("#te-protocol-label-field")
      ?.classList.toggle("te-hidden", type !== "protocolo");
    return result;
  };

  TextExpressApp.prototype.collectSnippetFromForm = function (showErrors = false) {
    const collected = teV28Original.collectSnippetFromForm.call(this, showErrors);
    if (!collected?.valid || !collected.snippet) return collected;
    collected.snippet.etiquetaSistema = collected.tipo === "protocolo"
      ? this.normalizeProtocolLabel(this.root.querySelector("#te-form-system-label")?.value)
      : "";
    return collected;
  };

  TextExpressApp.prototype.applyCollectedSnippet = function (collected) {
    if (collected?.valid && collected.snippet) {
      collected.snippet.etiquetaSistema = collected.snippet.tipo === "protocolo"
        ? this.normalizeProtocolLabel(collected.snippet.etiquetaSistema)
        : "";
    }
    const saved = teV28Original.applyCollectedSnippet.call(this, collected);
    if (saved && collected?.snippet) {
      if (collected.snippet.etiquetaSistema) {
        const previousLabel = collected.snippet.etiquetaSistema;
        collected.snippet.etiquetaSistema = this.addProtocolLabelToCatalog(
          collected.snippet.etiquetaSistema
        );
        if (collected.snippet.etiquetaSistema !== previousLabel) this.saveSnippets();
      }
      this.clearModelDraft(TE_V28_NEW_DRAFT_KEY);
      this.clearModelDraft(collected.snippet.id);
    }
    return saved;
  };

  TextExpressApp.prototype.loadModelDrafts = function () {
    try {
      const parsed = JSON.parse(this.storageGet(TE_V28_MODEL_DRAFTS_KEY) || "{}");
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  };

  TextExpressApp.prototype.saveModelDrafts = function (drafts) {
    const entries = Object.entries(drafts || {})
      .filter(([, draft]) => draft && typeof draft === "object")
      .sort((first, second) => String(second[1].updatedAt || "").localeCompare(String(first[1].updatedAt || "")))
      .slice(0, 50);
    return this.storageSet(TE_V28_MODEL_DRAFTS_KEY, JSON.stringify(Object.fromEntries(entries)));
  };

  TextExpressApp.prototype.getCurrentModelDraftKey = function () {
    return this.root.querySelector("#te-form-id")?.value || TE_V28_NEW_DRAFT_KEY;
  };

  TextExpressApp.prototype.captureCurrentModelDraft = function () {
    if (!this.snippetModal || this.snippetModal.classList.contains("te-hidden")) return null;
    const tipo = this.getFlowEditorType?.()
      || this.root.querySelector('input[name="te-type"]:checked')?.value
      || "atendimento";
    const modelo = this.root.querySelector('input[name="te-model-kind"]:checked')?.value || "unico";
    let etapas = [];
    if (modelo === "fluxo") {
      try {
        etapas = this.syncEditingFlowSteps().map((step) => ({ ...step }));
      } catch {
        etapas = (this.editingFlowSteps || []).map((step) => ({ ...step }));
      }
    }
    return {
      key: this.getCurrentModelDraftKey(),
      updatedAt: new Date().toISOString(),
      tipo,
      modelo,
      nome: this.root.querySelector("#te-form-name")?.value || "",
      atalho: this.root.querySelector("#te-form-shortcut")?.value || "",
      triggerKey: this.root.querySelector("#te-form-trigger")?.value || "space",
      categoriaId: this.root.querySelector("#te-form-category")?.value || "",
      conteudo: this.root.querySelector("#te-form-content")?.value || "",
      etiquetaSistema: this.root.querySelector("#te-form-system-label")?.value || "",
      favorito: Boolean(this.root.querySelector("#te-form-favorite")?.checked),
      etapas
    };
  };

  TextExpressApp.prototype.persistCurrentModelDraft = function () {
    window.clearTimeout(this.modelDraftSaveTimer);
    const draft = this.captureCurrentModelDraft();
    if (!draft) return false;
    const drafts = this.loadModelDrafts();
    drafts[draft.key] = draft;
    return this.saveModelDrafts(drafts);
  };

  TextExpressApp.prototype.scheduleCurrentModelDraft = function () {
    window.clearTimeout(this.modelDraftSaveTimer);
    this.modelDraftSaveTimer = window.setTimeout(
      () => this.persistCurrentModelDraft(),
      140
    );
  };

  TextExpressApp.prototype.clearModelDraft = function (key) {
    if (!key) return;
    const drafts = this.loadModelDrafts();
    if (!Object.prototype.hasOwnProperty.call(drafts, key)) return;
    delete drafts[key];
    this.saveModelDrafts(drafts);
  };

  TextExpressApp.prototype.flushCurrentModelPersistence = function () {
    const drafted = this.persistCurrentModelDraft();
    if (
      this.editingId
      && this.snippetModal
      && !this.snippetModal.classList.contains("te-hidden")
      && typeof this.autosaveCurrentModel === "function"
    ) {
      return this.autosaveCurrentModel(true) || drafted;
    }
    return drafted;
  };

  TextExpressApp.prototype.restoreCurrentModelDraft = function (data = null) {
    const key = data?.id || TE_V28_NEW_DRAFT_KEY;
    const draft = this.loadModelDrafts()[key];
    if (!draft) return false;
    if (data?.updatedAt) {
      const draftTime = Date.parse(draft.updatedAt || "") || 0;
      const savedTime = Date.parse(data.updatedAt || "") || 0;
      if (draftTime <= savedTime) return false;
    }

    this.root.querySelectorAll('input[name="te-type"]').forEach((input) => {
      input.checked = input.value === (draft.tipo === "protocolo" ? "protocolo" : "atendimento");
    });
    this.root.querySelectorAll('input[name="te-model-kind"]').forEach((input) => {
      input.checked = input.value === (draft.modelo === "fluxo" ? "fluxo" : "unico");
    });

    const setValue = (selector, value) => {
      const element = this.root.querySelector(selector);
      if (element) element.value = value ?? "";
    };
    setValue("#te-form-name", draft.nome);
    setValue("#te-form-shortcut", draft.atalho);
    setValue("#te-form-trigger", draft.triggerKey || "space");
    setValue("#te-form-content", draft.conteudo);
    setValue("#te-form-system-label", draft.etiquetaSistema);
    this.updateCategoryOptions(draft.tipo, draft.categoriaId);
    const category = this.root.querySelector("#te-form-category");
    if (category && [...category.options].some((option) => option.value === draft.categoriaId)) {
      category.value = draft.categoriaId;
    }
    const favorite = this.root.querySelector("#te-form-favorite");
    if (favorite) favorite.checked = Boolean(draft.favorito);
    if (draft.modelo === "fluxo" && Array.isArray(draft.etapas)) {
      const parent = draft.atalho || "/fluxo";
      this.editingFlowSteps = draft.etapas.map((step, index) =>
        this.normalizeFlowStep(step, index, parent)
      );
    }
    this.updateModelKindUI();
    if (draft.modelo === "fluxo") this.renderFlowEditorSteps();
    this.detectVariables?.(draft.modelo === "fluxo"
      ? (draft.etapas || []).map((step) => step.conteudo || "").join("\n\n")
      : draft.conteudo || "");
    this.setModelSaveStatus?.("Rascunho recuperado deste navegador.", "te-saved");
    return true;
  };

  TextExpressApp.prototype.setupModelDraftPersistence = function () {
    if (this.modelDraftPersistenceReady || !this.snippetForm) return;
    this.modelDraftPersistenceReady = true;
    const schedule = (event) => {
      if (event.target.closest("#te-snippet-form")) this.scheduleCurrentModelDraft();
    };
    this.snippetForm.addEventListener("input", schedule);
    this.snippetForm.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) this.flushCurrentModelPersistence();
    });
    window.addEventListener("pagehide", () => this.flushCurrentModelPersistence());
    window.addEventListener("beforeunload", () => this.flushCurrentModelPersistence());
  };

  TextExpressApp.prototype.isExternalElementVisible = function (element) {
    if (!element || !element.isConnected || this.root.contains(element)) return false;
    const view = element.ownerDocument?.defaultView || window;
    const style = view.getComputedStyle?.(element);
    if (style && (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0)) return false;
    const rect = element.getBoundingClientRect?.();
    return Boolean(rect && rect.width > 0 && rect.height > 0);
  };

  TextExpressApp.prototype.getExternalElementText = function (element) {
    return String(
      element?.innerText
      || element?.textContent
      || element?.getAttribute?.("aria-label")
      || element?.getAttribute?.("title")
      || ""
    ).replace(/\s+/g, " ").trim();
  };

  TextExpressApp.prototype.waitForExternalCondition = async function (callback, timeout = 5000) {
    const started = Date.now();
    while (Date.now() - started < timeout) {
      try {
        const result = callback();
        if (result) return result;
      } catch {}
      await new Promise((resolve) => window.setTimeout(resolve, 90));
    }
    return null;
  };

  TextExpressApp.prototype.findExternalLabelModal = function () {
    const dialogs = [...document.querySelectorAll('[role="dialog"], [aria-modal="true"]')];
    const direct = dialogs.find((dialog) =>
      this.isExternalElementVisible(dialog)
      && this.foldProtocolLabel(this.getExternalElementText(dialog)).includes("adicionar etiquetas")
    );
    if (direct) return direct;

    const title = [...document.querySelectorAll("h1, h2, h3, h4, strong, span, div")]
      .find((element) =>
        this.isExternalElementVisible(element)
        && this.foldProtocolLabel(this.getExternalElementText(element)) === "adicionar etiquetas"
      );
    if (!title) return null;
    let current = title;
    for (let depth = 0; current && depth < 7; depth += 1, current = current.parentElement) {
      if (current.querySelectorAll?.("button").length >= 2 && current.querySelector?.("input, [role=combobox]")) {
        return current;
      }
    }
    return title.closest("section, form, div");
  };

  TextExpressApp.prototype.findExternalLabelPlusButton = function () {
    const candidates = [...document.querySelectorAll('button, [role="button"]')]
      .filter((element) =>
        this.isExternalElementVisible(element)
        && !element.disabled
        && element.getAttribute("aria-disabled") !== "true"
      );
    let best = null;
    let bestScore = -1;
    for (const element of candidates) {
      const text = this.getExternalElementText(element);
      const folded = this.foldProtocolLabel(text);
      const signature = this.foldProtocolLabel([
        text,
        element.getAttribute("aria-label"),
        element.getAttribute("title"),
        element.className,
        element.innerHTML
      ].join(" "));
      let score = 0;
      if (text === "+") score += 100;
      if (/\badicionar\b/.test(folded)) score += 25;
      if (/etiquet/.test(signature)) score += 80;
      if (/plus|add|mais/.test(signature)) score += 15;
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.4) score += 8;
      if (rect.left > window.innerWidth * 0.55) score += 5;
      if (score > bestScore) {
        best = element;
        bestScore = score;
      }
    }
    return bestScore >= 20 ? best : null;
  };

  TextExpressApp.prototype.externalProtocolLabelAlreadyPresent = function (label) {
    const foldedLabel = this.foldProtocolLabel(label);
    if (!foldedLabel) return false;
    const modal = this.findExternalLabelModal();
    return [...document.querySelectorAll("span, div, p, li, button")].some((element) => {
      if (!this.isExternalElementVisible(element) || modal?.contains(element)) return false;
      if (element.children.length > 4) return false;
      return this.foldProtocolLabel(this.getExternalElementText(element)) === foldedLabel;
    });
  };

  TextExpressApp.prototype.findExternalLabelsControl = function (modal) {
    const labels = [...modal.querySelectorAll("label, span, div, p")]
      .filter((element) =>
        this.isExternalElementVisible(element)
        && this.foldProtocolLabel(this.getExternalElementText(element)) === "etiquetas"
      );
    for (const label of labels) {
      const controlId = label.getAttribute?.("for");
      const candidate = controlId ? modal.ownerDocument?.getElementById?.(controlId) : null;
      const associated = candidate && modal.contains(candidate) ? candidate : null;
      if (associated) return { clickable: associated, input: associated.matches("input") ? associated : null };
      const container = label.closest("label") || label.parentElement;
      const input = container?.querySelector?.('input, [role="combobox"]');
      if (input) return { clickable: input, input: input.matches("input") ? input : null };
      if (container) return { clickable: container, input: null };
    }
    const controls = [...modal.querySelectorAll('input, [role="combobox"]')]
      .filter((element) => this.isExternalElementVisible(element));
    const fallback = controls[1] || controls[0];
    return fallback ? { clickable: fallback, input: fallback.matches("input") ? fallback : null } : null;
  };

  TextExpressApp.prototype.setExternalInputValue = function (input, value) {
    const view = input.ownerDocument?.defaultView || window;
    const prototype = input instanceof view.HTMLTextAreaElement
      ? view.HTMLTextAreaElement.prototype
      : view.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
    if (setter) setter.call(input, value);
    else input.value = value;
    try {
      input.dispatchEvent(new view.InputEvent("input", {
        bubbles: true,
        composed: true,
        inputType: "insertText",
        data: value
      }));
    } catch {
      input.dispatchEvent(new view.Event("input", { bubbles: true, composed: true }));
    }
    input.dispatchEvent(new view.Event("change", { bubbles: true, composed: true }));
  };

  TextExpressApp.prototype.findExternalExactLabelOption = function (label, modal) {
    const foldedLabel = this.foldProtocolLabel(label);
    const candidates = [...document.querySelectorAll(
      '[role="option"], [role="listbox"] li, [role="listbox"] div, li, .option, [class*="option"]'
    )];
    return candidates.find((element) => {
      const overlay = element.closest?.(
        '[role="listbox"], [class*="overlay"], [class*="dropdown"], [class*="menu"]'
      );
      return !this.root.contains(element)
        && this.isExternalElementVisible(element)
        && element.children.length <= 4
        && this.foldProtocolLabel(this.getExternalElementText(element)) === foldedLabel
        && (
          !modal
          || modal.contains(element)
          || element.getAttribute("role") === "option"
          || this.isExternalElementVisible(overlay)
        );
    }) || null;
  };

  TextExpressApp.prototype.findExternalConcludeButton = function (modal) {
    return [...modal.querySelectorAll('button, [role="button"]')].find((element) =>
      this.isExternalElementVisible(element)
      && this.foldProtocolLabel(this.getExternalElementText(element)) === "concluir"
      && !element.disabled
      && element.getAttribute("aria-disabled") !== "true"
    ) || null;
  };

  TextExpressApp.prototype.applyProtocolLabelInExternalSystem = async function (rawLabel) {
    const label = this.normalizeProtocolLabel(rawLabel);
    if (!label) return true;
    if (this.externalProtocolLabelAlreadyPresent(label)) {
      this.showProtocolLabelNotice("Etiqueta já existente; não adicionada novamente.");
      return true;
    }

    let modal = this.findExternalLabelModal();
    if (!modal) {
      const plusButton = this.findExternalLabelPlusButton();
      if (!plusButton) throw new Error("O botão + de etiquetas não foi localizado.");
      plusButton.click();
      modal = await this.waitForExternalCondition(() => this.findExternalLabelModal());
    }
    if (!modal) throw new Error("A janela Adicionar etiquetas não foi aberta.");

    const control = this.findExternalLabelsControl(modal);
    if (!control?.clickable) throw new Error("O campo Etiquetas não foi localizado.");
    control.clickable.click();

    const input = control.input || await this.waitForExternalCondition(() => {
      const focused = modal.ownerDocument.activeElement;
      if (focused?.matches?.("input") && modal.contains(focused)) return focused;
      const inputs = [...modal.querySelectorAll("input")]
        .filter((element) => this.isExternalElementVisible(element));
      return inputs[inputs.length - 1] || null;
    }, 1800);
    if (!input) throw new Error("Não foi possível digitar no campo Etiquetas.");

    input.focus();
    this.setExternalInputValue(input, label);
    const option = await this.waitForExternalCondition(
      () => this.findExternalExactLabelOption(label, modal),
      5000
    );
    if (!option) throw new Error(`A etiqueta exata “${label}” não apareceu na seleção.`);
    option.click();

    const neutralTarget = modal.querySelector("header h1, header h2, header h3, header, h1, h2, h3") || modal;
    neutralTarget.click();
    await new Promise((resolve) => window.setTimeout(resolve, 120));

    const conclude = await this.waitForExternalCondition(
      () => this.findExternalConcludeButton(modal),
      2500
    );
    if (!conclude) throw new Error("O botão Concluir não ficou disponível.");
    conclude.click();

    const closed = await this.waitForExternalCondition(
      () => !modal.isConnected || !this.isExternalElementVisible(modal),
      5000
    );
    if (!closed && !this.externalProtocolLabelAlreadyPresent(label)) {
      throw new Error("A janela de etiquetas não confirmou a conclusão.");
    }
    this.showProtocolLabelNotice("Etiqueta adicionada com sucesso!");
    return true;
  };

  TextExpressApp.prototype.queueProtocolLabelApplication = function (label) {
    const clean = this.normalizeProtocolLabel(label);
    if (!clean) return Promise.resolve(true);
    const previous = this.protocolLabelAutomationQueue || Promise.resolve();
    const current = previous
      .catch(() => false)
      .then(() => this.applyProtocolLabelInExternalSystem(clean))
      .catch((error) => {
        console.error("Text Express: etiqueta automática", error);
        this.showToast(`Etiqueta não aplicada: ${error.message}`, "error", 6500);
        return false;
      });
    this.protocolLabelAutomationQueue = current;
    return current;
  };

  TextExpressApp.prototype.executeWorkflowStep = async function (flow, step, stepIndex, suppliedContext = null) {
    const result = await teV28Original.executeWorkflowStep.call(
      this,
      flow,
      step,
      stepIndex,
      suppliedContext
    );
    if (result && flow?.tipo === "protocolo" && flow.etiquetaSistema) {
      await this.queueProtocolLabelApplication(flow.etiquetaSistema);
    }
    return result;
  };

  TextExpressApp.prototype.insertSnippet = async function (id) {
    const snippet = this.snippets.find((item) => item.id === id);
    if (!snippet || snippet.tipo !== "protocolo" || snippet.modelo === "fluxo") {
      return teV28Original.insertSnippet.call(this, id);
    }
    const context = this.captureInsertionContext(this.lastActiveElement, 0);
    const content = await this.processVariables(snippet.conteudo);
    if (content === null) {
      this.showToast("Inserção cancelada.");
      return false;
    }
    if (context && this.applyInsertionContext(context, content)) {
      this.showToast("Texto inserido no campo ativo.", "success");
    } else {
      await this.copyText(content);
      this.showToast("Nenhum campo ativo. O texto foi copiado.", "success");
    }
    if (snippet.etiquetaSistema) await this.queueProtocolLabelApplication(snippet.etiquetaSistema);
    if (!this.settings.keepOpenAfterInsert) this.toggleMinimize(true);
    return true;
  };

  TextExpressApp.prototype.expandShortcut = async function (entry, context) {
    const snippet = entry?.snippet || entry;
    if (!snippet || snippet.tipo !== "protocolo" || snippet.modelo === "fluxo" || entry?.kind === "flow-step") {
      return teV28Original.expandShortcut.call(this, entry, context);
    }
    if (!context) return false;
    const content = await this.processVariables(snippet.conteudo);
    if (content === null) return false;
    if (this.applyInsertionContext(context, content)) {
      this.showToast(`Atalho ${snippet.atalho} expandido.`, "success");
    } else {
      await this.copyText(content);
      this.showToast("Não foi possível inserir; o texto foi copiado.", "error");
    }
    if (snippet.etiquetaSistema) await this.queueProtocolLabelApplication(snippet.etiquetaSistema);
    return true;
  };

  TextExpressApp.prototype.tryImmediateProtocolNumber = function (event, editable) {
    if (
      !event
      || event.defaultPrevented
      || event.isComposing
      || event.ctrlKey
      || event.altKey
      || event.metaKey
      || !/^[1-9]$/.test(event.key)
      || !this.isSequenceMenuOpen?.()
    ) return false;
    const flow = this.getActiveSequence?.();
    const stepIndex = Number(event.key) - 1;
    if (flow?.tipo !== "protocolo" || !flow.etapas?.[stepIndex]) return false;
    const target = editable || this.getEditableFromEvent?.(event) || this.resolvePersistentShortcutEditable?.(event);
    if (!target || this.root.contains(target)) return false;
    const context = this.captureInsertionContext(target, 0);
    if (!context) return false;
    event.preventDefault();
    event.stopImmediatePropagation?.();
    event.stopPropagation?.();
    this.lastActiveElement = target;
    this.captureContentEditableRange?.(target);
    void this.insertSequenceStep(flow.id, stepIndex, context);
    return true;
  };

  TextExpressApp.prototype.onGlobalKeyDown = function (event) {
    if (this.tryImmediateProtocolNumber(event)) return;
    return teV28Original.onGlobalKeyDown.call(this, event);
  };

  TextExpressApp.prototype.onPersistentShortcutKeyDown = function (event) {
    if (
      event
      && !this.persistentShortcutHandledEvents?.has(event)
      && !event.defaultPrevented
    ) {
      const editable = this.resolvePersistentShortcutEditable?.(event);
      const flow = this.getActiveSequence?.();
      const isImmediate =
        /^[1-9]$/.test(event.key || "")
        && flow?.tipo === "protocolo"
        && flow.etapas?.[Number(event.key) - 1]
        && editable
        && !this.root.contains(editable)
        && !event.isComposing
        && !event.ctrlKey
        && !event.altKey
        && !event.metaKey;
      if (isImmediate) {
        const context = this.captureInsertionContext(editable, 0);
        if (context && this.claimPersistentShortcutEvent(event)) {
          this.lastActiveElement = editable;
          this.captureContentEditableRange?.(editable);
          void this.insertSequenceStep(flow.id, Number(event.key) - 1, context);
          return;
        }
      }
    }
    return teV28Original.onPersistentShortcutKeyDown.call(this, event);
  };

  TextExpressApp.prototype.restoreCompleteBackup = function (parsed, source, rawCategories) {
    const result = teV28Original.restoreCompleteBackup.call(this, parsed, source, rawCategories);
    if (Array.isArray(parsed?.labelCatalog)) {
      this.protocolLabelCatalog = this.normalizeProtocolLabelCatalog([
        ...TE_V28_DEFAULT_LABELS,
        ...parsed.labelCatalog
      ]);
      this.saveProtocolLabelCatalog();
      this.renderProtocolLabelOptions();
    }
    return result;
  };

  TextExpressApp.prototype.mergeImportedBackup = function (parsed, source, rawCategories) {
    const result = teV28Original.mergeImportedBackup.call(this, parsed, source, rawCategories);
    if (Array.isArray(parsed?.labelCatalog)) {
      this.protocolLabelCatalog = this.normalizeProtocolLabelCatalog([
        ...(this.protocolLabelCatalog || TE_V28_DEFAULT_LABELS),
        ...parsed.labelCatalog
      ]);
      this.saveProtocolLabelCatalog();
      this.renderProtocolLabelOptions();
    }
    return result;
  };

  TextExpressApp.prototype.exportSnippets = function () {
    const uiState = this.captureCurrentUiState?.();
    this.saveUiState?.();
    const payload = {
      app: "Text Express",
      backupType: "complete",
      schemaVersion: 8,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      total: this.snippets.length,
      categories: this.categories,
      snippets: this.snippets,
      settings: this.settings,
      rememberedVariables: this.rememberedVariables || {},
      uiState,
      labelCatalog: this.protocolLabelCatalog || TE_V28_DEFAULT_LABELS
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `text-express-backup-completo-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    this.showToast("Backup completo exportado com cartões, categorias, configurações e etiquetas.", "success", 4800);
  };

  TextExpressApp.prototype.openApp = function () {
    // O painel deve abrir mesmo que algum reparo secundário falhe.
    // Na 28.0.2 o reparo vinha antes da abertura e podia deixar apenas o ícone visível.
    const result = teV28Original.openApp.call(this);
    try {
      const repaired = this.ensureDefaultDeckAvailable();
      if (repaired) {
        this.showToast("Baralho padrão recuperado: 132 cartões disponíveis.", "success", 4200);
      }
    } catch (error) {
      console.error("Text Express — recuperação do baralho após abertura:", error);
    }
    return result;
  };

  TextExpressApp.prototype.init = function () {
    if (
      this.root.dataset.teInitialized === "true"
      && (!Array.isArray(this.snippets) || !this.snippets.length)
    ) {
      delete this.root.dataset.teInitialized;
    }
    this.protocolLabelCatalog = [];
    this.protocolLabelAutomationQueue = Promise.resolve();
    this.modelDraftSaveTimer = null;
    this.modelDraftPersistenceReady = false;

    const result = teV28Original.init.call(this);

    // Instala a reabertura antes dos recursos opcionais da V28.
    // Assim uma falha em etiquetas/rascunhos nunca deixa o lançador sem ação.
    try {
      this.setupReliableLauncherOpen();
    } catch (error) {
      console.error("Text Express — proteção do lançador:", error);
    }

    try {
      this.ensureDefaultDeckAvailable();
    } catch (error) {
      console.error("Text Express — recuperação do baralho:", error);
    }

    try {
      this.loadProtocolLabelCatalog();
      this.renderProtocolLabelOptions();
    } catch (error) {
      console.error("Text Express — catálogo de etiquetas:", error);
    }

    try {
      this.setupModelDraftPersistence();
    } catch (error) {
      console.error("Text Express — persistência de rascunhos:", error);
    }

    this.root.dataset.version = APP_VERSION;
    return result;
  };


  /* ==========================================================
   * Text Express 28.0.5 — identificação rápida do contato
   * Exclusivo para inserções de Protocolo.
   * - Titular não exige nome;
   * - demais relações exigem o nome da pessoa;
   * - contato por número ou opção Anônimo;
   * - funciona em cartão único e em opção inserida de fluxo;
   * - não altera cartões de Atendimento nem a lógica de etiquetas.
   * ========================================================== */
  const TE_V285_PROTOCOL_CONTACT_RELATIONS = Object.freeze([
    "Titular",
    "Filho(a) do titular",
    "Irmão(ã)",
    "Amigo(a)",
    "Esposo(a)",
    "Funcionário(a)",
    "Outro"
  ]);

  const teV285Original = Object.freeze({
    init: TextExpressApp.prototype.init,
    onGlobalKeyDown: TextExpressApp.prototype.onGlobalKeyDown,
    insertSnippet: TextExpressApp.prototype.insertSnippet,
    expandShortcut: TextExpressApp.prototype.expandShortcut,
    executeWorkflowStep: TextExpressApp.prototype.executeWorkflowStep
  });

  TextExpressApp.prototype.setupProtocolContactPrompt = function () {
    this.protocolContactModal = this.root.querySelector("#te-protocol-contact-modal");
    this.protocolContactForm = this.root.querySelector("#te-protocol-contact-form");
    this.protocolContactRelationField = this.root.querySelector("#te-protocol-contact-relation-field");
    this.protocolContactRelationInput = this.root.querySelector("#te-protocol-contact-relation");
    this.protocolContactRelationError = this.root.querySelector("#te-protocol-contact-relation-error");
    this.protocolContactNameField = this.root.querySelector("#te-protocol-contact-name-field");
    this.protocolContactNameInput = this.root.querySelector("#te-protocol-contact-name");
    this.protocolContactNumberField = this.root.querySelector("#te-protocol-contact-number-field");
    this.protocolContactNumberInput = this.root.querySelector("#te-protocol-contact-number");
    this.protocolContactNameError = this.root.querySelector("#te-protocol-contact-name-error");
    this.protocolContactNumberError = this.root.querySelector("#te-protocol-contact-number-error");

    if (!this.protocolContactModal || !this.protocolContactForm) return false;
    if (this.protocolContactForm.dataset.teContactBound === "true") {
      this.updateProtocolContactPromptUI();
      return true;
    }
    this.protocolContactForm.dataset.teContactBound = "true";

    this.protocolContactForm.addEventListener("submit", (event) => {
      this.submitProtocolContactPrompt(event);
    });

    this.protocolContactForm.addEventListener("change", (event) => {
      if (
        event.target?.matches?.('input[name="te-protocol-contact-role"]')
        || event.target?.matches?.('input[name="te-protocol-contact-mode"]')
      ) {
        this.updateProtocolContactPromptUI(event.target);
      }
    });

    this.protocolContactModal.addEventListener("click", (event) => {
      const cancel = event.target.closest?.('[data-te-action="protocol-contact-cancel"]');
      if (cancel || event.target === this.protocolContactModal) {
        event.preventDefault();
        event.stopPropagation();
        this.finishProtocolContactPrompt(null);
      }
    });

    this.updateProtocolContactPromptUI();
    return true;
  };

  TextExpressApp.prototype.getSelectedProtocolContactRole = function () {
    const selected = this.root.querySelector('input[name="te-protocol-contact-role"]:checked')?.value;
    return TE_V285_PROTOCOL_CONTACT_RELATIONS.includes(selected) ? selected : "Titular";
  };

  TextExpressApp.prototype.getSelectedProtocolContactMode = function () {
    return this.root.querySelector('input[name="te-protocol-contact-mode"]:checked')?.value === "anonymous"
      ? "anonymous"
      : "number";
  };

  TextExpressApp.prototype.updateProtocolContactPromptUI = function (changedElement = null) {
    const role = this.getSelectedProtocolContactRole();
    const anonymous = this.getSelectedProtocolContactMode() === "anonymous";
    const needsCustomRelation = role === "Outro";
    const needsName = role !== "Titular";

    this.protocolContactRelationField?.classList.toggle("te-hidden", !needsCustomRelation);
    this.protocolContactNameField?.classList.toggle("te-hidden", !needsName);
    this.protocolContactNumberField?.classList.toggle("te-contact-field-muted", anonymous);

    if (this.protocolContactRelationInput) {
      this.protocolContactRelationInput.required = needsCustomRelation;
      if (!needsCustomRelation) this.protocolContactRelationInput.value = "";
    }
    if (this.protocolContactNameInput) {
      this.protocolContactNameInput.required = needsName;
      if (!needsName) this.protocolContactNameInput.value = "";
    }
    if (this.protocolContactNumberInput) {
      this.protocolContactNumberInput.disabled = anonymous;
      this.protocolContactNumberInput.required = !anonymous;
    }
    if (this.protocolContactRelationError) this.protocolContactRelationError.textContent = "";
    if (this.protocolContactNameError) this.protocolContactNameError.textContent = "";
    if (this.protocolContactNumberError) this.protocolContactNumberError.textContent = "";

    if (
      changedElement?.matches?.('input[name="te-protocol-contact-role"]')
      && !this.protocolContactModal?.classList.contains("te-hidden")
    ) {
      window.requestAnimationFrame(() => {
        if (needsCustomRelation) this.protocolContactRelationInput?.focus();
        else if (needsName) this.protocolContactNameInput?.focus();
        else this.protocolContactNumberInput?.focus();
      });
    }
    if (
      changedElement?.matches?.('input[name="te-protocol-contact-mode"]')
      && !anonymous
      && !this.protocolContactModal?.classList.contains("te-hidden")
    ) {
      window.requestAnimationFrame(() => this.protocolContactNumberInput?.focus());
    }
  };

  TextExpressApp.prototype.resetProtocolContactPrompt = function () {
    this.root.querySelectorAll('input[name="te-protocol-contact-role"]').forEach((input) => {
      input.checked = input.value === "Titular";
    });
    this.root.querySelectorAll('input[name="te-protocol-contact-mode"]').forEach((input) => {
      input.checked = input.value === "number";
    });
    if (this.protocolContactRelationInput) this.protocolContactRelationInput.value = "";
    if (this.protocolContactNameInput) this.protocolContactNameInput.value = "";
    if (this.protocolContactNumberInput) this.protocolContactNumberInput.value = "";
    if (this.protocolContactRelationError) this.protocolContactRelationError.textContent = "";
    if (this.protocolContactNameError) this.protocolContactNameError.textContent = "";
    if (this.protocolContactNumberError) this.protocolContactNumberError.textContent = "";
    this.updateProtocolContactPromptUI();
  };

  TextExpressApp.prototype.requestProtocolContactDetails = function () {
    if (!this.protocolContactModal || !this.protocolContactForm) {
      this.setupProtocolContactPrompt();
    }
    if (!this.protocolContactModal || !this.protocolContactForm) {
      this.showToast("Não foi possível abrir os dados do contato.", "error");
      return Promise.resolve(null);
    }

    if (this.protocolContactResolver) this.finishProtocolContactPrompt(null);
    this.resetProtocolContactPrompt();
    this.protocolContactModal.classList.remove("te-hidden");

    return new Promise((resolve) => {
      this.protocolContactResolver = resolve;
      window.requestAnimationFrame(() => this.protocolContactNumberInput?.focus());
    });
  };

  TextExpressApp.prototype.finishProtocolContactPrompt = function (value) {
    if (this.protocolContactModal) this.protocolContactModal.classList.add("te-hidden");
    const resolver = this.protocolContactResolver;
    this.protocolContactResolver = null;
    if (resolver) resolver(value);
  };

  TextExpressApp.prototype.submitProtocolContactPrompt = function (event) {
    event?.preventDefault?.();
    const role = this.getSelectedProtocolContactRole();
    const anonymous = this.getSelectedProtocolContactMode() === "anonymous";
    const relation = String(this.protocolContactRelationInput?.value || "").replace(/\s+/g, " ").trim().slice(0, 80);
    const name = String(this.protocolContactNameInput?.value || "").replace(/\s+/g, " ").trim().slice(0, 80);
    const number = String(this.protocolContactNumberInput?.value || "").replace(/\s+/g, " ").trim().slice(0, 40);

    let valid = true;
    if (role === "Outro" && !relation) {
      if (this.protocolContactRelationError) this.protocolContactRelationError.textContent = "Informe a relação com o titular.";
      valid = false;
    }
    if (role !== "Titular" && !name) {
      if (this.protocolContactNameError) this.protocolContactNameError.textContent = "Informe o nome de quem fez o contato.";
      valid = false;
    }
    if (!anonymous && !number) {
      if (this.protocolContactNumberError) this.protocolContactNumberError.textContent = "Informe o número do contato ou selecione Anônimo.";
      valid = false;
    }
    if (!valid) {
      if (role === "Outro" && !relation) this.protocolContactRelationInput?.focus();
      else if (role !== "Titular" && !name) this.protocolContactNameInput?.focus();
      else this.protocolContactNumberInput?.focus();
      return false;
    }

    this.finishProtocolContactPrompt({
      role,
      relation: role === "Outro" ? relation : "",
      name: role === "Titular" ? "" : name,
      contact: anonymous ? "Anônimo" : number,
      anonymous
    });
    return true;
  };

  TextExpressApp.prototype.formatProtocolContactContent = function (rawContent, details = {}) {
    let body = String(rawContent || "").trim();
    if (!body) return body;

    const role = TE_V285_PROTOCOL_CONTACT_RELATIONS.includes(details.role)
      ? details.role
      : "Titular";
    const name = String(details.name || "").replace(/\s+/g, " ").trim();
    const customRelation = String(details.relation || "").replace(/\s+/g, " ").trim();
    const contact = String(details.contact || (details.anonymous ? "Anônimo" : "")).replace(/\s+/g, " ").trim() || "Anônimo";
    const relationLabel = role === "Outro"
      ? (customRelation ? (/\btitular\b/i.test(customRelation) ? customRelation : `${customRelation} do titular`) : "Outro contato")
      : role;
    const actor = role === "Titular" ? "Titular" : `${name || "Contato"}, ${relationLabel},`;

    // Evita duplicação caso um cartão personalizado já tenha CTT no fim.
    body = body.replace(/\s*(?:[.;,-]\s*)?CTT\s*:\s*[^\n]*$/i, "").trim();

    const lowerFirst = (value) => value ? value.charAt(0).toLocaleLowerCase("pt-BR") + value.slice(1) : value;
    const replaceLeadingSubject = (value) => {
      const patterns = [
        /^\(Cliente\)\s*/i,
        /^Cliente\s+/i,
        /^O\s+mesmo\s+/i,
        /^A\s+mesma\s+/i,
        /^A\/o\s+mesma\/o\s+/i,
        /^A\/O\s+mesma\/o\s+/i,
        /^O\/A\s+mesmo\/a\s+/i,
        /^Pr[oó]prio(?:\(a\))?\s+titular[.\s]+/i,
        /^Titular[.\s]+/i
      ];
      for (const pattern of patterns) {
        if (pattern.test(value)) {
          const rest = value.replace(pattern, "").replace(/^[,;:\s]+/, "");
          return `${actor} ${lowerFirst(rest)}`.trim();
        }
      }
      return "";
    };

    let composed = replaceLeadingSubject(body);
    if (!composed) {
      if (/^Informa\b/i.test(body)) {
        composed = `${actor} ${lowerFirst(body)}`;
      } else if (/^Informando\s+estar\b/i.test(body)) {
        composed = `${actor} informa estar${body.replace(/^Informando\s+estar/i, "")}`;
      } else if (/^Em\s+contato\b/i.test(body)) {
        composed = `${actor} entra em contato${body.replace(/^Em\s+contato/i, "")}`;
      } else if (/^(Entra|Entrou|Relata|Solicita|Deseja|Informou)\b/i.test(body)) {
        composed = `${actor} ${lowerFirst(body)}`;
      } else {
        composed = `${actor} fez contato. ${body}`;
      }
    }

    composed = composed.trim().replace(/[,;:]\s*$/, "");
    const separator = /[.!?]$/.test(composed) ? " " : ". ";
    return `${composed}${separator}CTT: ${contact}.`;
  };

  TextExpressApp.prototype.prepareProtocolContactContent = async function (content) {
    const details = await this.requestProtocolContactDetails();
    if (!details) return null;
    return this.formatProtocolContactContent(content, details);
  };

  TextExpressApp.prototype.insertSnippet = async function (id) {
    const snippet = this.snippets.find((item) => item.id === id);
    if (!snippet || snippet.tipo !== "protocolo" || snippet.modelo === "fluxo") {
      return teV285Original.insertSnippet.call(this, id);
    }

    const context = this.captureInsertionContext(this.lastActiveElement, 0);
    let content = await this.processVariables(snippet.conteudo);
    if (content === null) {
      this.showToast("Inserção cancelada.");
      return false;
    }
    content = await this.prepareProtocolContactContent(content);
    if (content === null) {
      this.showToast("Inserção do protocolo cancelada.");
      return false;
    }

    if (context && this.applyInsertionContext(context, content)) {
      this.showToast("Protocolo inserido com os dados do contato.", "success");
    } else {
      await this.copyText(content);
      this.showToast("Nenhum campo ativo. O protocolo foi copiado.", "success");
    }
    if (snippet.etiquetaSistema) await this.queueProtocolLabelApplication(snippet.etiquetaSistema);
    if (!this.settings.keepOpenAfterInsert) this.toggleMinimize(true);
    return true;
  };

  TextExpressApp.prototype.expandShortcut = async function (entry, context) {
    const snippet = entry?.snippet || entry;
    if (!snippet || snippet.tipo !== "protocolo" || snippet.modelo === "fluxo" || entry?.kind === "flow-step") {
      return teV285Original.expandShortcut.call(this, entry, context);
    }
    if (!context) return false;

    let content = await this.processVariables(snippet.conteudo);
    if (content === null) return false;
    content = await this.prepareProtocolContactContent(content);
    if (content === null) {
      this.showToast("Inserção do protocolo cancelada.");
      return false;
    }

    if (this.applyInsertionContext(context, content)) {
      this.showToast(`Atalho ${snippet.atalho} expandido com os dados do contato.`, "success");
    } else {
      await this.copyText(content);
      this.showToast("Não foi possível inserir; o protocolo foi copiado.", "error");
    }
    if (snippet.etiquetaSistema) await this.queueProtocolLabelApplication(snippet.etiquetaSistema);
    return true;
  };

  TextExpressApp.prototype.executeWorkflowStep = async function (flow, step, stepIndex, suppliedContext = null) {
    const actionType = flow?.tipo === "atendimento"
      ? TE_V27_FLOW_ACTIONS.INSERT
      : this.getFlowActionType(step);

    if (flow?.tipo !== "protocolo" || actionType !== TE_V27_FLOW_ACTIONS.INSERT) {
      return teV285Original.executeWorkflowStep.call(this, flow, step, stepIndex, suppliedContext);
    }

    const context = suppliedContext || this.captureInsertionContext(this.lastActiveElement, 0);
    let content = await this.processFlowStep(flow, step);
    if (content === null) {
      this.showToast("Execução cancelada.");
      return false;
    }
    content = await this.prepareProtocolContactContent(content);
    if (content === null) {
      this.showToast("Inserção do protocolo cancelada.");
      return false;
    }

    let inserted = false;
    if (context) inserted = this.applyInsertionContext(context, content);
    if (!inserted) {
      await this.copyText(content);
      this.showToast("Protocolo copiado com os dados do contato.", "success", 2200);
    } else {
      this.showToast(`Opção ${stepIndex + 1} inserida com os dados do contato.`, "success");
    }
    this.markWorkflowStepUsed(flow, stepIndex);
    if (flow.etiquetaSistema) await this.queueProtocolLabelApplication(flow.etiquetaSistema);
    return true;
  };

  TextExpressApp.prototype.onGlobalKeyDown = function (event) {
    if (
      event?.key === "Escape"
      && this.protocolContactResolver
      && this.protocolContactModal
      && !this.protocolContactModal.classList.contains("te-hidden")
    ) {
      event.preventDefault();
      event.stopPropagation?.();
      this.finishProtocolContactPrompt(null);
      return;
    }
    return teV285Original.onGlobalKeyDown.call(this, event);
  };

  TextExpressApp.prototype.init = function () {
    this.protocolContactResolver = null;
    const result = teV285Original.init.call(this);
    try {
      this.setupProtocolContactPrompt();
    } catch (error) {
      console.error("Text Express — dados rápidos do protocolo:", error);
    }
    this.root.dataset.version = APP_VERSION;
    return result;
  };

  /* ==========================================================
   * Text Express 28.0.6 — ajustes combinados
   * - OUTRO em Protocolo: relação livre -> nome -> número/anônimo;
   * - favoritos permanecem persistidos e passam ao topo da categoria;
   * - todo cartão de sequência/fluxo usa ícone Play e ABRIR SEQUÊNCIA.
   * ========================================================== */
  const teV286Original = Object.freeze({
    renderCard: TextExpressApp.prototype.renderCard,
    getFilteredSnippets: TextExpressApp.prototype.getFilteredSnippets
  });

  TextExpressApp.prototype.renderCard = function (snippet) {
    let html = teV286Original.renderCard.call(this, snippet);
    if (snippet?.modelo !== "fluxo") return html;

    // Padroniza o ícone principal de todo cartão com sequência/fluxo.
    html = html.replace(
      /(<span class="te-card-icon"[^>]*>)[\s\S]*?(<\/span>)/,
      `$1${this.icon("play-circle")}$2`
    );

    // Padroniza a ação principal, inclusive nos Protocolos.
    html = html.replace(
      /(<button\b[^>]*data-te-action="flow-open"[^>]*>)[\s\S]*?(<\/button>)/g,
      `$1${this.icon("play-circle")} ABRIR SEQUÊNCIA$2`
    );
    html = html.replace(/<span>abre o fluxo<\/span>/gi, "<span>abre a sequência</span>");
    html = html.replace(/Abrir sequência/g, "ABRIR SEQUÊNCIA");
    return html;
  };

  TextExpressApp.prototype.getFilteredSnippets = function () {
    const items = teV286Original.getFilteredSnippets.call(this);
    if (!Array.isArray(items) || this.activeType === "favoritos") return items;

    // Partição estável: mantém a ordem existente dentro dos grupos, mas
    // coloca os favoritos primeiro na própria categoria/visão atual.
    const favorites = [];
    const regular = [];
    for (const snippet of items) {
      (snippet?.favorito ? favorites : regular).push(snippet);
    }
    return [...favorites, ...regular];
  };

  function bootTextExpress() {
    const root = document.getElementById("text-express-app");
    if (!root) return;
    if (window.textExpressApp instanceof TextExpressApp) {
      window.textExpressApp.openApp();
      return;
    }
    const app = new TextExpressApp(root);
    window.TextExpressApp = TextExpressApp;
    window.textExpressApp = app;
    app.init();
  }

  window.TextExpressApp = TextExpressApp;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootTextExpress, { once: true });
  } else {
    bootTextExpress();
  }
})();


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
      "O Text Express foi carregado, mas não conseguiu iniciar nesta página.\n" +
      "Detalhe: " + (error?.message || String(error))
    );
  }
}

delete window.__textExpressStandaloneSkipBundle;
