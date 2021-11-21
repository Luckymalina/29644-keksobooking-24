import {initializeMap, setMainPin, setCommonPins, MAX_COMMON_PINS_COUNT_ON_MAP} from './map.js';
import {initializeFilterForm} from './filter-form.js';
import {getData} from './api-methods.js';
import {showGetDataErrorMessage} from './ui-messages.js';
import {setPageInactive, setAdvertFormActive, setMapFiltersFormActive} from './set-state.js';
import shuffleArray from './utils/shuffle-array.js';
import createPopupMarkup from './create-popup-markup.js';
import {initializeAdvertForm, setAddress} from './advert-form.js';
import {loadLang} from './load-lang.js';
import getCurrentLang from './utils/get-current-lang.js';

const GET_ADVERTS_DATA_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const map = initializeMap();

const generateCommonPins = (advertCards) => {
  initializeFilterForm(advertCards);
  setCommonPins(shuffleArray(advertCards).slice(0, MAX_COMMON_PINS_COUNT_ON_MAP), createPopupMarkup);
  setMapFiltersFormActive();
};

const initializePage = () => {
  map.whenReady(() => {
    setAdvertFormActive();
    setMainPin(setAddress);
    getData(GET_ADVERTS_DATA_URL, 'advertCards', generateCommonPins, showGetDataErrorMessage);
    initializeAdvertForm();
  });
};

setPageInactive();
loadLang(getCurrentLang(), initializePage);
