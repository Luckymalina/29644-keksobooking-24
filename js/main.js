import {initializeMap, setMainPin, setCommonPins, MAX_NUMBER_PINS_ON_MAP} from './map.js';
import {filterFormInitialize} from './filter-form.js';
import {getData} from './api-methods.js';
import {showGetDataErrorMessage} from './ui-messages.js';
import setState from './set-state.js';
import shuffleArray from './utils/shuffle-array.js';
import createPopupElement from './create-popup-element.js';
import {loadLang} from './load-lang.js';
import {formInitialize, setAddress} from './validate-form.js';
import getCurrentLang from './utils/get-current-lang.js';

const GET_ADVERTS_DATA_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const map = initializeMap();

const generateCommonPins = (advertCards) => {
  filterFormInitialize(advertCards);
  setCommonPins(shuffleArray(advertCards).slice(0, MAX_NUMBER_PINS_ON_MAP), createPopupElement);
  setState(true);
};

const pageInit = () => {
  map.whenReady(() => {
    setState(true);
    setMainPin(setAddress);
    getData(GET_ADVERTS_DATA_URL, generateCommonPins, showGetDataErrorMessage, 'advertCards');
    formInitialize();
  });
};

setState(true);
loadLang(getCurrentLang()).finally(pageInit);
