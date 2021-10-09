const getRandomInteger = (from, to) => {

  if(from < 0 || to <= from){
    throw new Error('Введите число больше или равно нулю, второе число диапазона должно быть больше первого');
  }

  const randomInteger = Math.random() * (to - from) + from;

  return Math.round(randomInteger);

};

const getRandomFloat = (from, to, symbols) => {

  if(from < 0 || to <= from){
    throw new Error('Введите число больше или равно нулю, второе число диапазона должно быть больше первого');
  }

  const RandomFloat = (Math.random() * (to - from) + from).toFixed(symbols);

  return Number(RandomFloat);

};

getRandomInteger(1,27);

getRandomFloat(1, 30 , 4);

const getRandomArrayInteger = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//массив строк — массив случайной длины из значений
const getRandomArrayElements = (elements) => elements.slice(0,getRandomInteger(0,elements.length - 1));

const getAuthor = (index) => (index > 9) ? `img/avatars/user${index}.png` : `img/avatars/user0${index}.png`;

const TYPES_APARTMENTS = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const FEATURES_APARTMENTS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const CHECKIN_APARTMENTS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_APARTMENTS = [
  '12:00',
  '13:00',
  '14:00',
];

const PHOTOS_APARTMENTS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getLocation = () => ({
  lat: getRandomInteger(35.65000, 35.70000),
  lng: getRandomInteger(139.70000, 139.80000),
});

const createObjects = (i) => {
  const currentLocation = getLocation(i);

  return  {
    author: getAuthor(i),
    offer: {
      title: 'Свободные апартаменты',
      address: `${currentLocation.lat},${currentLocation.lng}`,
      price: getRandomInteger(1, 1000000),
      type: getRandomArrayInteger(TYPES_APARTMENTS),
      rooms: getRandomInteger(1, 100),
      guests: getRandomInteger(1, 300),
      checkin: getRandomArrayInteger(CHECKIN_APARTMENTS),
      checkout: getRandomArrayInteger(CHECKOUT_APARTMENTS),
      features: getRandomArrayElements(FEATURES_APARTMENTS),
      description: 'Просторное помещение, можно с животными',
      photos: getRandomArrayElements(PHOTOS_APARTMENTS),
    },
    location: currentLocation,
  }
};

const customObjects = Array.from({length: 10}, createObjects);

console.log(customObjects);
