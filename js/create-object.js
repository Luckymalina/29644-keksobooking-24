import {getRandomInteger} from './utils/get-random-integer.js';
import {getLocation} from './data/get-location.js';
import {getAuthorAvatar} from './data/get-author-avatar.js';
import {getRandomArrayInteger} from './data/get-random-array-integer.js';
import {getRandomArrayElements} from './data/get-random-array-elements.js';

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

const createObject = (el, i) => {
  const currentLocation = getLocation(i);

  return {
    author: getAuthorAvatar(i),
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
      description: '',
      photos: getRandomArrayElements(PHOTOS_APARTMENTS),
    },
    location: currentLocation,
  };
};

export {createObject};
