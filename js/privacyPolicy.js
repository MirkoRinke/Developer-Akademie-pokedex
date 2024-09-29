import { renderPrivacyPolicyTemplate } from "./templates.js";
import { navButtonsHide, menuButtonsHide } from "./navigate.js";

export async function renderPrivacyPolicy() {
  const contentRef = document.getElementById("content");
  contentRef.innerHTML = renderPrivacyPolicyTemplate();
  navButtonsHide();
  menuButtonsHide();
}
