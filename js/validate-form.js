const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MIN_NIGHT_COST = 0;
const MAX_NIGHT_COST = 1000000;
// const MIN_PRICE_FOR_TYPES = {
//   'palace': 10000,
//   'flat': 1000,
//   'house': 5000,
//   'bungalow': 0,
//   'hotel': 3000,
// };
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

const objectForm = document.querySelector('.ad-form');
// const objectFormAddress = objectForm.querySelector('#address');
const objectFormTitle = objectForm.querySelector('#title');
const objectFormNightPrice = objectForm.querySelector('#price');
const objectFormType = objectForm.querySelector('#type');
const objectFormRoomNumber = objectForm.querySelector( '#room_number');
const objectFormCapacity = objectForm.querySelector( '#capacity');
// const objectFormCheckIn = objectForm.querySelector( '#timein');
// const objectFormCheckOut = objectForm.querySelector( '#timeout');

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
  if (objectFormTitle.validity.tooShort) {
    objectFormTitle.setCustomValidity('Заголовок объявления должен состоять минимум их 30-ти символов');
  } else if (objectFormTitle.validity.tooLong) {
    objectFormTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (objectFormTitle.validity.valueMissing) {
    objectFormTitle.setCustomValidity('Обязательное поле');
  } else {
    objectFormTitle.setCustomValidity('');
  }
};

//Валидация поля стоимости
const onObjectPriceValidation = () => {
  if (objectFormNightPrice.validity.rangeUnderflow) {
    const minimalPrice = objectFormNightPrice.getAttribute('min');
    objectFormNightPrice.setCustomValidity(`Цена за ночь не должна быть меньше ${minimalPrice}`);
  } else if (objectFormNightPrice.validity.rangeOverflow) {
    objectFormNightPrice.setCustomValidity('Цена за ночь не должна превышать значения 1000000');
  } else if (objectFormNightPrice.validity.valueMissing) {
    objectFormNightPrice.setCustomValidity('Обязательное поле');
  } else {
    objectFormNightPrice.setCustomValidity('');
  }
};

//Синхронизация поля тип жилья с полем цены
const onObjectTypeChange = (evt) => {
  const price = setCostFotType(evt.target.value);
  objectFormNightPrice.setAttribute('placeholder', price);
  objectFormNightPrice.setAttribute('min', price);
};

objectFormTitle.addEventListener('invalid', onObjectTitleValidation);
objectFormType.addEventListener('change', onObjectTypeChange);
objectFormNightPrice.addEventListener('invalid', onObjectPriceValidation);
objectFormRoomNumber.addEventListener('change', onRoomsNumberValidation);
