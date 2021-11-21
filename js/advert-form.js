import formatString from './utils/format-string.js';
import {hideElement, showElement} from './utils/hide-show-element.js';
import {getMessage, DefaultMessages} from './load-lang.js';
import {showSendDataErrorMessage, showSendDataSuccessMessage} from './ui-messages.js';
import {sendData} from './api-methods.js';
import {setPageInactive, setPageActive} from './set-state.js';
import {resetMainPin, setMapDefaultView} from './map.js';
import {resetFilterForm, renderFilteredCommonPins} from './filter-form.js';
import {setAvatarElementChange, setImagesElementChange, clearPreviewImages} from './preview-advert-form-images.js';

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const PRICE_MAX_VALUE = 1000000;
const COORDINATES_FRACTION_DIGITS = 5;
const MinPriceByTypes = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};
const availableCapacityByRooms = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const formElement = document.querySelector('form[name="advert-form"]');
const titleElement = formElement.querySelector('input[name="title"]');
const addressElement = formElement.querySelector('input[name="address"]');
const priceElement = formElement.querySelector('input[name="price"]');
const typeElement = formElement.querySelector('select[name="type"]');
const roomsNumberElement = formElement.querySelector('select[name="rooms"]');
const capacityElement = formElement.querySelector('select[name="capacity"]');
const timeInElement = formElement.querySelector('select[name="timein"]');
const timeOutElement = formElement.querySelector('select[name="timeout"]');
const resetButtonElement = formElement.querySelector('.ad-form__reset');

const setAddress = (coordinates) => {
  const lat = Number(coordinates.lat).toFixed(COORDINATES_FRACTION_DIGITS);
  const lng = Number(coordinates.lng).toFixed(COORDINATES_FRACTION_DIGITS);
  addressElement.value = `${lat}, ${lng}`;
};

const setPriceMinAttribute = () => {
  const currentType = typeElement.value;
  priceElement.min = MinPriceByTypes[currentType];
  priceElement.placeholder = MinPriceByTypes[currentType];
};

const setAvailableCapacity = () => {
  const currentRoomsNumber = roomsNumberElement.value;
  const capacityOptionsList = capacityElement.options;
  const maxAvailableValue = [...capacityOptionsList].reduce((maxAvailableSelectedValue, option) => {
    option.selected = false;
    option.disabled = false;

    if (availableCapacityByRooms[currentRoomsNumber].some((roomsValue) => roomsValue === option.value)) {
      if (Number(maxAvailableSelectedValue) < Number(option.value)) {
        maxAvailableSelectedValue = option.value;
      }
      showElement(option);
    } else {
      option.disabled = true;
      hideElement(option);
    }
    return maxAvailableSelectedValue;
  }, 0);

  capacityElement.value = maxAvailableValue;
};

const syncTimeInField = () => {
  timeInElement.value = timeOutElement.value;
};

const syncTimeOutField = () => {
  timeOutElement.value = timeInElement.value;
};

const validateTitleElement = () => {
  const titleElementLength = titleElement.value.length;
  let reportMessage = '';

  if (titleElement.validity.valueMissing) {
    reportMessage = getMessage(DefaultMessages.REQUIRED);
  } else if (titleElementLength < TITLE_MIN_LENGTH) {
    reportMessage = formatString(getMessage(DefaultMessages.TOO_SHORT_LENGTH), TITLE_MIN_LENGTH - titleElementLength);
  } else if (titleElementLength > TITLE_MAX_LENGTH) {
    reportMessage = formatString(getMessage(DefaultMessages.TOO_LONG_LENGTH), titleElementLength - TITLE_MAX_LENGTH);
  }
  titleElement.setCustomValidity(reportMessage);

  return titleElement.reportValidity();
};

const validatePriceElement = () => {
  const priceElementValue = Number(priceElement.value);
  const priceMinValueByType = Number(priceElement.min);
  let reportMessage = '';

  if (priceElementValue > PRICE_MAX_VALUE) {
    reportMessage = formatString(getMessage(DefaultMessages.TOO_BIG_PRICE_VALUE), priceElementValue - PRICE_MAX_VALUE, PRICE_MAX_VALUE);
  } else if (priceElementValue < priceMinValueByType || priceElement.validity.rangeUnderflow) {
    reportMessage = formatString(getMessage(DefaultMessages.TOO_SMALL_PRICE_VALUE), priceMinValueByType);
  } else if (priceElement.validity.typeMismatch || priceElement.validity.badInput) {
    reportMessage = getMessage(DefaultMessages.NUMBER_REQUIRED);
  } else if (priceElement.validity.valueMissing) {
    reportMessage = getMessage(DefaultMessages.REQUIRED);
  }
  priceElement.setCustomValidity(reportMessage);

  return priceElement.reportValidity();
};

const advertForm = () => ![
  validateTitleElement(),
  validatePriceElement(),
].some((value) => !value);

const onTitleInput = () => validateTitleElement();

const onPriceInput = () => validatePriceElement();

const onRoomsNumberChange = () => setAvailableCapacity();

const onTimeInChange = () => syncTimeOutField();

const onTimeOutChange = () => syncTimeInField();

const initializeAdvertForm = () => {
  setAvailableCapacity();
  setPriceMinAttribute();

  titleElement.addEventListener('input', onTitleInput);
  priceElement.addEventListener('input', onPriceInput);
  typeElement.addEventListener('change', () => {
    setPriceMinAttribute();
    validatePriceElement();
  });
  roomsNumberElement.addEventListener('change', onRoomsNumberChange);
  timeInElement.addEventListener('change', onTimeInChange);
  timeOutElement.addEventListener('change', onTimeOutChange);

  setAvatarElementChange();
  setImagesElementChange();
};

const resetAdvertForm = () => {
  formElement.reset();
  setPriceMinAttribute();
  setAvailableCapacity();
  clearPreviewImages();
  resetMainPin(setAddress);
};

const resetMapForm = () => {
  resetFilterForm();
  renderFilteredCommonPins();
  setMapDefaultView();
};

const resetForms = () => {
  resetAdvertForm();
  resetMapForm();
};

const onSuccessFormSubmit = () => {
  resetForms();
  showSendDataSuccessMessage();
};

const onErrorFormSubmit = () => {
  showSendDataErrorMessage();
};

const onFinalFormSubmit = () => setPageActive();

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (advertForm()) {
    const formData = new FormData(formElement);
    setPageInactive();
    sendData(
      formElement.action,
      formData,
      onSuccessFormSubmit,
      onErrorFormSubmit,
      onFinalFormSubmit);
  }
});

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});

export {initializeAdvertForm, setAddress};
