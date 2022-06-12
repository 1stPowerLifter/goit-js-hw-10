import Notiflix from 'notiflix';

const list = document.querySelector(".country-list")
const info = document.querySelector(".country-info")

const renderList = countries => countries.reduce((acc ,{ name, flags: {svg}}) => {
    return acc + `
        <li class="item">
         <img class="item_svg" src =${svg}>
        <p class="item_name">${name}</p>
      </li>
    `
}, "")

const renderCountry = (arr) => {

    const {name, capital, population, languages, flags:{svg}} = arr.reduce(acc => acc)
   
    const languagesList = languages.map(lang => lang.name).reduce(name => + `, ${name}`)

    if (name === 'Ukraine') {
        return `
        <div class="ukraine country">
        <div class="top">
            <img class="item_svg" src=${svg}>
            <p class="item_name">${name}</p>
        </div>
        <div class="bottom">
            <p>Capital:<span>${capital}</span></p>
            <p>Population<span>${population}</span></p>
            <p>Languages<span>${languagesList}</span></p>
        </div>
        </div>
        `
    }

    if (name === 'Russian Federation') {
         
        return `
        <div class="country govno">
        </div>`
     }
    
    return `
    <div class="country">
      <div class="top">
        <img class="item_svg" src=${svg}>
        <p class="item_name">${name}</p>
      </div>
      <div class="bottom">
        <p>Capital:<span>${capital}</span></p>
        <p>Population<span>${population}</span></p>
        <p>Languages<span>${languagesList}</span></p>
      </div>
    </div>
    `
}

export function clearList() {
    if (document.querySelectorAll('.item')) {
                for (let i = document.querySelectorAll('.item').length; i > 0 ; i--){
                    document.querySelector('.item').remove()
                }
            }
}

export function clearCountry() {
    if (document.querySelector('.country')) {
                document.querySelector('.country').remove()
            }
}

export function fetchCountries(name) {
    fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                Notiflix.Notify.failure("Oops, there is no country with that name");
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            if (data.length > 10) {

                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")

                clearList()
            clearCountry()
            
            } else if (data.length > 1) {

                clearCountry()
  
                list.innerHTML = renderList(data)
            } else { 

                clearList()

                info.innerHTML = renderCountry(data)
                
            }
        })
        .catch(error => {
            console.log(error)
            clearList()
            clearCountry()
        });
}