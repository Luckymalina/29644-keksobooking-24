import {createObjects} from './create-objects.js';

const COUNT_OBJECT = 10;

const customObjects = Array.from({length: COUNT_OBJECT}, (el, i) => createObjects(el, i));

console.log(customObjects);


