import './css/styles.css';
import { fetchCountries, clearList,  clearCountry} from "./js/fetchCountries"

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const search = document.querySelector("input#search-box")


search.addEventListener("input", debounce(() => {
    const searchParams = search.value.trim()
    if (searchParams) {
        fetchCountries(searchParams)
    } else {
        clearCountry()
        clearList()
    }
}, DEBOUNCE_DELAY))

