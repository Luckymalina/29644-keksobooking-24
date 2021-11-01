import getRandomInteger from '../utils/get-random-integer.js';

const getRandomArrayInteger = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export default getRandomArrayInteger;
