import './css/styles.css';
import {fetchCountries} from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');

searchInput.addEventListener('input', (e) => {
    if (e.currentTarget.value !== "") {
        fetchCountries(e.target.value);
    };
});


fetchCountries(ukra);