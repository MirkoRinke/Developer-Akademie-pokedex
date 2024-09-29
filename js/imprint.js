import { renderImprintTemplate } from "./templates.js";
import { navButtonsHide, menuButtonsHide } from "./navigate.js";

export async function renderImprint() {
  const contentRef = document.getElementById("content");
  contentRef.innerHTML = renderImprintTemplate();
  navButtonsHide();
  menuButtonsHide();
}
