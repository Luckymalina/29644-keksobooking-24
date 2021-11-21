import {removeCommonPins, MAX_COMMON_PINS_COUNT_ON_MAP, setCommonPins} from './map.js';
import createPopupMarkup from './create-popup-markup.js';
import debounce from './utils/debounce.js';

const RERENDER_DELAY = 500;
const DEFAULT_TYPE_FILTER_VALUE = 'any';
const DEFAULT_PRICE_FILTER_VALUE = 'any';
const DEFAULT_ROOMS_NUMBER_FILTER_VALUE = 'any';
const DEFAULT_GUESTS_NUMBER_FILTER_VALUE = 'any';
const PriceFilterRange = {
  low: {
    from: 0,
    to: 10000,
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
  },
};

const formElement = document.querySelector('form[name="filter-form"]');
const typeFilterElement = formElement.querySelector('select[name="housing-type"]');
const priceFilterElement = formElement.querySelector('select[name="housing-price"]');
const roomsNumberFilterElement = formElement.querySelector('select[name="housing-rooms"]');
const guestsNumberFilterElement = formElement.querySelector('select[name="housing-guests"]');
const featuresFilterElementList = formElement.querySelectorAll('input[name="features"]');

let advertCards = {};

const resetFilterForm = () => {
  formElement.reset();
};

const initializeFilterForm = (cards) => {
  advertCards = cards;
};

const filterByType = (card) => typeFilterElement.value === DEFAULT_TYPE_FILTER_VALUE ||
  card.offer.type && card.offer.type === typeFilterElement.value;

const filterByPrice = (card) => {
  const priceCurrentType = PriceFilterRange[priceFilterElement.value];
  if (priceFilterElement.value === DEFAULT_PRICE_FILTER_VALUE || !priceCurrentType) {
    return true;
  }
  return !(!card.offer.price || card.offer.price < priceCurrentType.from || priceCurrentType.to && card.offer.price >= priceCurrentType.to);
};

const filterByRoomsNumber = (card) => roomsNumberFilterElement.value === DEFAULT_ROOMS_NUMBER_FILTER_VALUE ||
  card.offer.rooms && card.offer.rooms === Number(roomsNumberFilterElement.value);

const filterByGuestsNumber = (card) => guestsNumberFilterElement.value === DEFAULT_GUESTS_NUMBER_FILTER_VALUE ||
  card.offer.guests !== undefined && card.offer.guests === Number(guestsNumberFilterElement.value);

const filterByFeatures = (card) => {
  const featuresCheckedElementsList = formElement.querySelectorAll('input[name="features"]:checked');
  if (!featuresCheckedElementsList.length) {
    return true;
  }
  if (!card.offer.features) {
    return false;
  }

  let cardFeaturesCount = 0;
  featuresCheckedElementsList.forEach((featuresFilterElement) => {
    if (card.offer.features.includes(featuresFilterElement.value)) {
      cardFeaturesCount++;
    }
  });
  return cardFeaturesCount === featuresCheckedElementsList.length;
};

const renderFilteredCommonPins = () => {
  removeCommonPins();

  const filteredAdvertCards = [];
  for (const card of advertCards) {
    if (filterByType(card) &&
      filterByPrice(card) &&
      filterByRoomsNumber(card) &&
      filterByGuestsNumber(card) &&
      filterByFeatures(card)) {
      filteredAdvertCards.push(card);
    }
    if (filteredAdvertCards.length === MAX_COMMON_PINS_COUNT_ON_MAP) {
      break;
    }
  }

  setCommonPins(filteredAdvertCards, createPopupMarkup);
};

const onTypeFilterChange = () => debounce(renderFilteredCommonPins, RERENDER_DELAY);

const onPriceFilterChange = () => debounce(renderFilteredCommonPins, RERENDER_DELAY);

const onRoomsNumberFilterChange = () => debounce(renderFilteredCommonPins, RERENDER_DELAY);

const onGuestsNumberFilterChange = () => debounce(renderFilteredCommonPins, RERENDER_DELAY);

const onFeaturesFilterElementClick = () => debounce(renderFilteredCommonPins, RERENDER_DELAY);

typeFilterElement.addEventListener('change', onTypeFilterChange());
priceFilterElement.addEventListener('change', onPriceFilterChange());
roomsNumberFilterElement.addEventListener('change', onRoomsNumberFilterChange());
guestsNumberFilterElement.addEventListener('change', onGuestsNumberFilterChange());
featuresFilterElementList.forEach((element) =>
  element.addEventListener('click', onFeaturesFilterElementClick()));

export {resetFilterForm, initializeFilterForm, renderFilteredCommonPins};
