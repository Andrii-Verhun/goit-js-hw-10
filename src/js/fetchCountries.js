import Notiflix from 'notiflix';

export const fetchCountries = (name) => {
  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
  .then(response => {
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
        const countries = renderCountries(data);
        const list = document.querySelector('.country-list');
        list.append(...countries);
        return;
      };
      
    })
    .catch(error => {
      console.log(error);
    });
};

const renderCountries = (countries) => {
  const listItem = countries.map((country) => {
    const elem = document.createElement('li');
    elem.classList.add('country-list__item')
    const flag = document.createElement('img');
    flag.setAttribute('src', `${country.flags.svg}`);
    flag.setAttribute('width', '40');
    flag.setAttribute('height', '27');
    const nameCountry = document.createElement('p');
    nameCountry.classList.add('country-list__name')
    nameCountry.textContent = `${country.name.common}`;
    elem.append(flag, nameCountry);
    return elem;
  });
  return listItem;
};

const renderCountry = (country) => {
  const nameCountry = document.createElement('p');
  nameCountry.classList.add('country-list__name')
  nameCountry.textContent = `${country[0].name.common}`;
  const flag = document.createElement('img');
  flag.setAttribute('src', `${country[0].flags.svg}`);
  flag.setAttribute('width', '40');
  flag.setAttribute('height', '27');
  nameCountry.prepend(flag);
  const capital = document.createElement('p');
  capital.textContent = 'Capital:';
  const capitalValue = document.createElement('span');
  capitalValue.textContent = `${country[0].capital}`;
  
};