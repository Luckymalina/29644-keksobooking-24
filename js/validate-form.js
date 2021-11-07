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
const objectFormCheckIn = objectForm.querySelector( '#timein');
const objectFormCheckOut = objectForm.querySelector( '#timeout');

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

//Синхронизация полей заезда/выезда
const onChangeCheckIn = () => {
  objectFormCheckIn.value = objectFormCheckOut.value;
};
const onChangeCheckOut = () => {
  objectFormCheckIn.value = objectFormCheckOut.value;
};

objectFormTitle.addEventListener('invalid', onObjectTitleValidation);
objectFormType.addEventListener('change', onObjectTypeChange);
objectFormNightPrice.addEventListener('invalid', onObjectPriceValidation);
objectFormRoomNumber.addEventListener('change', onRoomsNumberValidation);
objectFormCheckIn.addEventListener('change', onChangeCheckIn);
objectFormCheckOut.addEventListener('change', onChangeCheckOut);
