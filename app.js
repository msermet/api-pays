const fetchCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        const countries = await response.json();
        let countriesList = document.querySelector('#card-pays');
        countriesList.innerHTML = countries
            .map((country)=>`<div data-image="${country.flags.svg}" class="card col-6 m-2 me-3" style="width: 19rem;">
                                        <img src="${country.flags.svg}" class="card-img-top">
                                        <div class="card-body">
                                            <h5 class="card-title">${country.name.common}</h5>
                                            <p class="card-text"><span class="fw-bold">Capitale : </span>${country.capital}</p>
                                            <p class="card-text"><span class="fw-bold">Population : </span>${country.population}</p>
                                        </div>
                                    </div>`)
            .join('')
    } catch (erreur) {
        console.error(erreur)
    }
}


fetchCountries()