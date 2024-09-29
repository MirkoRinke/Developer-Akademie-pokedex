import { navRef, currentLanguage } from "./globals.js";
import { renderNavTemplate } from "./templates.js";
import { getSelectedLanguage } from "./language.js";

export function renderNav() {
  let placeholderText = "";
  if (currentLanguage === "de") placeholderText = "Dein Name dein Pokemon";
  if (currentLanguage === "en") placeholderText = "Your name your Pokemon";
  if (currentLanguage === "ja") placeholderText = "あなたの名前、あなたのポケモン";
  navRef.innerHTML = renderNavTemplate(currentLanguage, placeholderText);
  getSelectedLanguage();
}
