const searchParams = new URLSearchParams({
    fields: "name.official,capital,population,flags.svg,languages",
});

export const fetchCountries = (name) => {
  fetch(`https://restcountries.com/v3.1/name/${name}?${searchParams.replaceAll('%2C', ',')}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        // Error handling
    });
};