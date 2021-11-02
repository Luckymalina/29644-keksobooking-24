import createObject from './create-object.js';
import createPopupElement from './create-popup-element.js';
import setNoActiveState from './set-page-state.js';
const COUNT_OBJECT = 10;
const customObjects = Array.from({length: COUNT_OBJECT}, (el, i) => createObject(el, i));
const popupsCollection = [];
const mapCanvas = document.querySelector('#map-canvas');

for (const item of customObjects){
  popupsCollection.push(createPopupElement(item));
}

mapCanvas.appendChild(popupsCollection[2]);
setNoActiveState();
// setActiveState();

