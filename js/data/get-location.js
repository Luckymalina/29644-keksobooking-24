import {getRandomInteger} from '../utils/get-random-integer.js';

const getLocation = () => ({
  lat: getRandomInteger(35.65000, 35.70000),
  lng: getRandomInteger(139.70000, 139.80000),
});

export {getLocation};
