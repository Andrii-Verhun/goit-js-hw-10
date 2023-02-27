import './css/styles.css';
const debounce = require('lodash.debounce');
// import Notiflix from 'notiflix';
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
        fetchCountries(countryName);
    };
}, DEBOUNCE_DELAY));
