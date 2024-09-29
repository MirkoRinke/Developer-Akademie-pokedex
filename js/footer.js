import { footerRef, currentLanguage } from "./globals.js";
import { renderFooterTemplate } from "./templates.js";

export function renderFooter() {
  footerRef.innerHTML = renderFooterTemplate(currentLanguage);
}
