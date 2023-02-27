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

      const countryCard = renderCountry(data);
      const countryInfo = document.querySelector('.country-info');
      countryInfo.append(...countryCard);
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
  const { name, flags, capital, population, languages } = country[0];

  const nameCountry = document.createElement('p');
  nameCountry.classList.add('country-info__name')
  nameCountry.textContent = name.common;
  const flag = document.createElement('img');
  flag.setAttribute('src', `${flags.svg}`);
  flag.setAttribute('width', '80');
  flag.setAttribute('height', '54');
  nameCountry.prepend(flag);

  const capitalStr = document.createElement('p');
  capitalStr.classList.add('country-info__desc');
  capitalStr.textContent = capital;
  const capitalValue = document.createElement('span');
  capitalValue.classList.add('country-info__value');
  capitalValue.textContent = 'Capital:';
  capitalStr.prepend(capitalValue);

  const populationStr = document.createElement('p');
  populationStr.classList.add('country-info__desc');
  populationStr.textContent = population;
  const populationValue = document.createElement('span');
  populationValue.classList.add('country-info__value');
  populationValue.textContent = 'Population:';
  populationStr.prepend(populationValue);

  const languagesStr = document.createElement('p');
  languagesStr.classList.add('country-info__desc');
  let lang = [];
  for (const key in languages) {
    lang.push(languages[key]);
  };
  languagesStr.textContent = lang.join(', ');
  const languagesValue = document.createElement('span');
  languagesValue.classList.add('country-info__value');
  languagesValue.textContent = 'Languages:';
  languagesStr.prepend(languagesValue);

  return [nameCountry, capitalStr, populationStr, languagesStr];
};

