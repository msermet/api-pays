const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        const countries = await response.json();
        let countriesList = document.querySelector('#card-pays');
        countriesList.innerHTML = countries
            .map((country)=>`<div data-name="${country.name.common}"
                                     data-capital="${country.capital}" 
                                     data-population="${country.population}" 
                                     data-language="${Object.values(country.languages).join(', ')}" 
                                     data-currency="${Object.values(country.currencies)[0].name}" 
                                     data-region="${country.region}"
                                     data-subregion="${country.subregion}"
                                     data-area="${country.area}"
                                     data-code="${country.cca2}"
                                     data-flag="${country.flags.svg}"
                                     class="card col-6 m-2 me-3" style="width: 19rem;">
                                        <div class="text-center card-header">
                                            <img src="${country.flags.svg}" style="width : 250px; height : 200px; class="card-img-top">
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title">${country.name.common}</h5>
                                            <p class="card-text"><span class="fw-bold">Capitale : </span>${country.capital}</p>
                                            <p class="card-text"><span class="fw-bold">Population : </span>${country.population}</p>
                                        </div>
                                    </div>`)
            .join('');

        const countryCards = document.querySelectorAll('.card');
        countryCards.forEach(card => {
            card.addEventListener('click', (event) => {
                const countryCard = event.currentTarget;
                const country = {
                    name: countryCard.getAttribute('data-name'),
                    capital: countryCard.getAttribute('data-capital'),
                    population: countryCard.getAttribute('data-population'),
                    language: countryCard.getAttribute('data-language'),
                    currency: countryCard.getAttribute('data-currency'),
                    region: countryCard.getAttribute('data-region'),
                    subregion: countryCard.getAttribute('data-subregion'),
                    area: countryCard.getAttribute('data-area'),
                    code: countryCard.getAttribute('data-code'),
                    flag: countryCard.getAttribute('data-flag')
                };


                const detailCardHtml = `
                    <div class="country-detail-card card shadow m-5 p-1">
                        <div class="row">
                            <div class="col-3">
                                <img src="${country.flag}" style="width : 400px; height : 300px;" class="card-img-top">
                            </div>
                            <div class="col-1"></div>
                            <div class="col-8 pt-3">
                                <h2 class="pb-3">${country.name}</h2>
                                <h5 class="pb-3 fw-bold">À propos:</h5>      
                                <p>${apropos.extract}</p>                          
                                <div class="row">
                                    <div class="col-6">
                                        <p><strong>Capitale:</strong> ${country.capital}</p>
                                        <p><strong>Population:</strong> ${country.population}</p>
                                        <p><strong>Région:</strong> ${country.region}</p>
                                        <p><strong>Sous-région:</strong> ${country.subregion}</p>
                                    </div>
                                    <div class="col-6">
                                        <p><strong>Langue:</strong> ${country.language}</p>
                                        <p><strong>Monnaie:</strong> ${country.currency}</p>
                                        <p><strong>Superficie:</strong> ${country.area} km²</p>
                                        <p><strong>Code:</strong> ${country.code}</p>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                `;

                const existingDetailCard = document.querySelector('.country-detail-card');
                if (existingDetailCard) {
                    existingDetailCard.remove();
                }

                const countryContainer = document.querySelector('#card-pays');
                countryContainer.insertAdjacentHTML('afterbegin', detailCardHtml);
            });
        });
    } catch (erreur) {
        console.error(erreur);
    }
}


fetchCountries()