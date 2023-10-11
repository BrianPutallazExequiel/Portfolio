document.addEventListener("DOMContentLoaded", function () {
  const burgerLabel = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const burgerCheckbox = document.getElementById("burger");

  burgerLabel.addEventListener("click", () => {
    nav.classList.toggle("active", burgerCheckbox.checked);
  });
});
// Dark theme

document.addEventListener("DOMContentLoaded", function () {
  const switchInput = document.querySelector(".theme-switch__checkbox");

  switchInput.addEventListener("change", function () {
    const body = document.body;
    if (this.checked) {
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
    }
  });
});
//Change language
const locales = ["es-ES", "en-GB"];

function getFlagSrc(countryCode) {
  return /^[A-Z]{2}$/.test(countryCode)
    ? `https://www.countryflagicons.com/SHINY/64/${countryCode.toUpperCase()}.png`
    : "";
}

const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");

function setSelectedLocale(locale) {
  const intlLocale = new Intl.Locale(locale);
  const langCode = intlLocale.language.toUpperCase();
  const langName = new Intl.DisplayNames([locale], {
    type: "language",
  }).of(langCode);

  dropdownContent.innerHTML = "";

  const otherLocales = locales.filter((loc) => loc !== locale);
  otherLocales.forEach((otherLocale) => {
    const otherIntlLocale = new Intl.Locale(otherLocale);
    const otherLangName = new Intl.DisplayNames([otherLocale], {
      type: "language",
    }).of(otherIntlLocale.language);

    const listEl = document.createElement("li");
    listEl.innerHTML = `${otherLangName}<img src="${getFlagSrc(
      otherIntlLocale.region
    )}" />`;
    listEl.value = otherLocale;
    listEl.addEventListener("mousedown", function () {
      setSelectedLocale(otherLocale);
    });
    dropdownContent.appendChild(listEl);
  });

  dropdownBtn.innerHTML = `<img src="${getFlagSrc(
    intlLocale.region
  )}" />${langName}<span class="arrow-down"></span>`;
}

setSelectedLocale(locales[0]);
const browserLang = new Intl.Locale(navigator.language).language;
for (const locale of locales) {
  const localeLang = new Intl.Locale(locale).language;
  if (localeLang === browserLang) {
    setSelectedLocale(locale);
  }
}
