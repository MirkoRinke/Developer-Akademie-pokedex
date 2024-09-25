import { currentLanguage, loadingCompleted } from "./globals.js";
import { renderPokemonCards } from "./cards.js";

export function customTranslations() {
  const translations = {
    en: {
      size: "Size",
      weight: "Weight",
      description: "A big thanks to Ditto for the excellent modeling work.",
    },
    de: {
      size: "Größe",
      weight: "Gewicht",
      description: "Ein großer Dank an Ditto für die hervorragende Modellarbeit.",
    },
    ja: {
      size: "サイズ",
      weight: "重さ",
      description: "モデリングに優れた仕事をしたメタモンに感謝します。",
    },
  };
  overwriteLabels(translations[currentLanguage]);
}
customTranslations();

export function selectedLanguage(selected) {
  if (!loadingCompleted) return;
  overwriteCurrentLanguage(selected);
  customTranslations();
  renderPokemonCards();
  getSelectedLanguage();
}

export function getSelectedLanguage() {
  languageSettingsJa.style.border = "";
  languageSettingsEn.style.border = "";
  languageSettingsDe.style.border = "";
  if (currentLanguage == "ja") languageSettingsJa.style.border = "3px solid rgb(182, 152, 55)";
  if (currentLanguage == "en") languageSettingsEn.style.border = "3px solid rgb(182, 152, 55)";
  if (currentLanguage == "de") languageSettingsDe.style.border = "3px solid rgb(182, 152, 55)";
}
getSelectedLanguage();
