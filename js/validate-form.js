import formatString from './utils/format-string.js';
import {getMessage, DEFAULT_MESSAGES} from './load-lang.js';
import {showSendDataErrorMessage, showSendDataSuccessMessage} from './ui-messages.js';
import {sendData} from './api-methods.js';
import setState from './set-state.js';
import {resetForm as resetFilterForm} from './filter-form.js';
import {resetMainMarker, setMapDefaultView, mapClosePopup} from './map.js';
// import {setAvatarElementChange, setImagesElementChange, clearPreviewImages} from './preview-advert-form-images.js';
import {setAvatarElementChange, setImagesElementChange} from './preview-advert-form-images.js';

const setCostFotType = (nameOfType) => {
  switch (nameOfType) {
    case 'flat':
      return 1000;
    case 'bungalow':
      return 0;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
    case 'hotel':
      return 3000;
    default:
      return 0;
  }
};
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const PRICE_MAX_VALUE = 1000000;
const objectForm = document.querySelector('.ad-form');
const objectFormAddress = objectForm.querySelector('#address');
const objectFormTitle = objectForm.querySelector('#title');
const objectFormNightPrice = objectForm.querySelector('#price');
const objectFormType = objectForm.querySelector('#type');
const objectFormRoomNumber = objectForm.querySelector( '#room_number');
const objectFormCapacity = objectForm.querySelector( '#capacity');
const objectFormCheckIn = objectForm.querySelector( '#timein');
const objectFormCheckOut = objectForm.querySelector( '#timeout');
const objectFormButtonReset = objectForm.querySelector( '.ad-form__reset');

//настройка координат жилья
const setAddress = (coordinates) => {
  objectFormAddress.value = `${coordinates.lat}, ${coordinates.lng}`;
};

//определение допустимых значений в поле Количество мест в зависимости от количества комнат
const setCapacity = (rooms) => {
  const capacityListElement = objectFormCapacity.querySelectorAll('option');

  capacityListElement.forEach((capacity) => {
    capacity.style.display = 'none';
    capacity.removeAttribute('selected');
  });

  if (rooms === 100) {
    capacityListElement.forEach((capacity) => {
      const capacityValue = Number(capacity.value);
      if (capacityValue === 0) {
        capacity.style.display = '';
      }
    });
  } else {
    capacityListElement.forEach((capacity) => {
      const capacityValue = Number(capacity.value);
      if (rooms >= capacityValue && capacityValue !== 0) {
        capacity.style.display = '';
      }
    });
  }

  for (const capacity of capacityListElement) {
    if (capacity.style.display !== 'none') {
      capacity.setAttribute('selected', 'selected');
      break;
    }
  }
};

const onRoomsNumberValidation = (evt) => {
  const roomsNumber = Number(evt.target.value);
  setCapacity(roomsNumber);
};

//Валидация поля заголовка
const onObjectTitleValidation = () => {
  // if (objectFormTitle.validity.tooShort) {
  //   objectFormTitle.setCustomValidity('Заголовок объявления должен состоять минимум их 30-ти символов');
  // } else if (objectFormTitle.validity.tooLong) {
  //   objectFormTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  // } else if (objectFormTitle.validity.valueMissing) {
  //   objectFormTitle.setCustomValidity('Обязательное поле');
  // } else {
  //   objectFormTitle.setCustomValidity('');
  // }
  // // return objectFormTitle.reportValidity();
  // return objectFormTitle;

  const titleElementLength = objectFormTitle.value.length;
  let reportMessage = '';

  if (objectFormTitle.validity.valueMissing) {
    reportMessage = getMessage(DEFAULT_MESSAGES.required);
  } else if (titleElementLength < TITLE_MIN_LENGTH) {
    reportMessage = formatString(getMessage(DEFAULT_MESSAGES.tooShortLength), TITLE_MIN_LENGTH - titleElementLength);
  } else if (titleElementLength > TITLE_MAX_LENGTH) {
    reportMessage = formatString(getMessage(DEFAULT_MESSAGES.tooLongLength), objectFormTitle - TITLE_MAX_LENGTH);
  }
  objectFormTitle.setCustomValidity(reportMessage);

  return objectFormTitle.reportValidity();
};

//Валидация поля стоимости
const onObjectPriceValidation = () => {
  const priceElementValue = Number(objectFormNightPrice.value);
  const priceMinValueByType = Number(objectFormNightPrice.min);
  let reportMessage = '';

  if (priceElementValue > PRICE_MAX_VALUE) {
    reportMessage = formatString(getMessage(DEFAULT_MESSAGES.tooBigPriceValue), priceElementValue - PRICE_MAX_VALUE, PRICE_MAX_VALUE);
  } else if (priceElementValue < priceMinValueByType || objectFormNightPrice.validity.rangeUnderflow) {
    reportMessage = formatString(getMessage(DEFAULT_MESSAGES.tooSmallPriceValue), priceMinValueByType);
  } else if (objectFormNightPrice.validity.typeMismatch || objectFormNightPrice.validity.badInput) {
    reportMessage = getMessage(DEFAULT_MESSAGES.numberRequired);
  } else if (objectFormNightPrice.validity.valueMissing) {
    reportMessage = getMessage(DEFAULT_MESSAGES.required);
  }
  objectFormNightPrice.setCustomValidity(reportMessage);

  return objectFormNightPrice.reportValidity();
};

//Синхронизация поля тип жилья с полем цены
const onObjectTypeChange = (evt) => {
  const price = setCostFotType(evt.target.value);
  objectFormNightPrice.setAttribute('placeholder', price);
  objectFormNightPrice.setAttribute('min', price);
};

//Синхронизация полей заезда/выезда
const onChangeCheckIn = () => {
  objectFormCheckIn.value = objectFormCheckOut.value;
};
const onChangeCheckOut = () => {
  objectFormCheckIn.value = objectFormCheckOut.value;
};

// ===================================================================================================

const validateForm = () => ![
  onObjectTitleValidation(),
  onObjectPriceValidation(),
].some((value) => !value);

const formInitialize = () => {
  setCapacity();
  onObjectPriceValidation();

  objectFormTitle.addEventListener('invalid', onObjectTitleValidation);
  objectFormType.addEventListener('change', onObjectTypeChange);
  objectFormNightPrice.addEventListener('invalid', onObjectPriceValidation);
  objectFormRoomNumber.addEventListener('change', onRoomsNumberValidation);
  objectFormCheckIn.addEventListener('change', onChangeCheckIn);
  objectFormCheckOut.addEventListener('change', onChangeCheckOut);

  setAvatarElementChange();
  setImagesElementChange();
};

const resetForm = () => {
  objectForm.reset();
  onObjectPriceValidation();
  setCapacity();
  resetMainMarker(setAddress);
};

const onSuccessFormSubmit = () => {
  resetForm();
  resetFilterForm();
  mapClosePopup();
  setMapDefaultView();
  setState(false);
  showSendDataSuccessMessage();
};

const onErrorFormSubmit = () => {
  setState(false);
  showSendDataErrorMessage();
};

const onFormSubmit = () => setState(true);

objectForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (validateForm()) {
    const formData = new FormData(objectForm);
    sendData(
      objectForm.getAttribute('action'),
      formData,
      onSuccessFormSubmit,
      onErrorFormSubmit,
      onFormSubmit);
  }
});

objectFormButtonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});


export {formInitialize, setAddress};
