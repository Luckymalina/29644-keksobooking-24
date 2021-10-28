import {createObject} from './create-object.js';
import {createPopupElement} from './create-popup.js';
const COUNT_OBJECT = 1;
const customObjects = Array.from({length: COUNT_OBJECT}, (el, i) => createObject(el, i));

console.log(customObjects);
createPopupElement();
