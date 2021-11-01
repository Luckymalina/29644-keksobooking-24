//массив строк — массив случайной длины из значений
import getRandomInteger from '../utils/get-random-integer.js';

const getRandomArrayElements = (elements) => elements.slice(0,getRandomInteger(0,elements.length - 1));

export default getRandomArrayElements;
