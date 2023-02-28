import './css/styles.css';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce((e) => {
    const countryName = e.target.value.trim()

    if (countryName !== "") {
        list.innerHTML = "";
        info.innerHTML = "";
        fetchCountries(countryName).then(response => {
            if (!response.ok) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            }
            return response.json();
                })
        .then(data => {
            if (data.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            };

            if (2 <= data.length && data.length <= 10) {
                renderCountries(data);
                return;
            };

            renderCountry(data);
        })
        .catch(error => {
            console.log(error);
        });;
    };
}, DEBOUNCE_DELAY));

const renderCountries = (countries) => {
  const countryList = document.querySelector('.country-list');
  const listItems = countries.reduce((acc, country) => {
    return acc += `<li class="country-list__item">
            <img src="${country.flags.svg}" width="40" height="27">
            <p class="country-list__name">${country.name.common}</p>
            </li>`;
  }, "");
  countryList.innerHTML = listItems;
};

const renderCountry = (country) => {
  const countryInfo = document.querySelector('.country-info');
  const { name, flags, capital, population, languages } = country[0];
  const langs = [];
  for (const key in languages) {
    langs.push(languages[key]);
  };
  countryInfo.innerHTML = `
  <p class="country-info__name"><img src="${flags.svg}" width="80" height="54">${name.common}</p>
  <p class="country-info__desc"><span class="country-info--bold">Capital:</span>${capital}</p>
  <p class="country-info__desc"><span class="country-info--bold">Population:</span>${population}</p>
  <p class="country-info__desc"><span class="country-info--bold">Languages:</span>${langs.join(', ')}</p>`;
};