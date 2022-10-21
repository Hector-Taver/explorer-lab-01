import IMask from "imask";

import "./css/index.css";

const creditCardBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const creditCardLogo = document.querySelector(".cc-logo span:nth-child(2) img");
const creditCardBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");

function setCardType(type) {
  const colors = {
    visa: ["#436d99", "#2d57f2"],
    mastercard: ["#df6f29", "#c69347"],
    default: ["black", "gray"],
  };

  creditCardBgColor01.setAttribute("fill", colors[type][0]);
  creditCardBgColor02.setAttribute("fill", colors[type][1]);
  creditCardLogo.setAttribute("src", `cc-${type}.svg`);
};

globalThis.setCardType = setCardType;

const cardNumber = document.querySelector("#card-number");
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: (appended, dynamicMasked) => {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");

    const foundMask = dynamicMasked.compiledMasks.find(({ regex }) => {
      return number.match(regex);
    });

    return foundMask
  },
};

const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype;
  setCardType(cardType);
  updateCardNumber(cardNumberMasked.value);
});

const cardHolder = document.querySelector("#card-holder");
const cardHolderPattern = {
  mask: /^\D+$/,
};

const cardHolderMasked = IMask(cardHolder, cardHolderPattern);

cardHolderMasked.on("accept", () => {
  updateCardHolder(cardHolderMasked.value)
})

const expirationDate = document.querySelector("#expiration-date");
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },

    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
};

const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value);
});

const securityCode = document.querySelector("#security-code");
const securityCodePattern = {
  mask: "0000",
};

const securityCodeMasked = IMask(securityCode, securityCodePattern);

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value);
})

const addButton = document.querySelector("#add-card");
addButton.addEventListener("click", () => {
  alert("Cartão adicionado!")
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number");

  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number;
}

function updateCardHolder(holder) {
  const ccHolder = document.querySelector(".cc-holder .value");

  ccHolder.innerText = holder.length === 0 ? "SEU NOME" : holder;
}

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .cc-expiration .value");

  ccExpiration.innerText = date.length === 0 ? "02/32" : date;
}

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value");

  ccSecurity.innerText = code.length === 0 ? "123" : code;
}
