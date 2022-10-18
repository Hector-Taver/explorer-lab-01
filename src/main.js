import "./css/index.css";

const creditCardBgColor01 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
);
const creditCardLogo = document.querySelector(".cc-logo span:nth-child(2) img");
const creditCardBgColor02 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) path"
);

const setCardType = (type) => {
  const colors = {
    visa: ["#436d99", "#2d57f2"],
    mastercard: ["#df6f29", "#c69347"],
    default: ["black", "gray"],
  };

  creditCardBgColor01.setAttribute("fill", colors[type][0]);
  creditCardBgColor02.setAttribute("fill", colors[type][1]);
  creditCardLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType
