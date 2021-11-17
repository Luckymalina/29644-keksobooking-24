const ZOOM_MAP_DEFAULT = 13;
const PIN_DEFAULT_VALUE = [35.681729, 139.753927];
const MAX_NUMBER_PINS_ON_MAP = 10;;
let map = undefined;
let mainPin = undefined;
const commonPins = [];
const MainPinIcon = {
  URL: './img/main-pin.svg',
  SIZE: [52, 52],
  ANCHOR: [26, 52],
};
const CommonPinIcon = {
  URL: './img/pin.svg',
  SIZE: [40, 40],
  ANCHOR: [20, 40],
};

const setMapDefaultView = () => {
  map.setView(PIN_DEFAULT_VALUE, ZOOM_MAP_DEFAULT);
};

const removeCommonPins = () => {
  commonPins.forEach((pin) => pin.remove());
};

const initializeMap = () => {
  map = L.map('map-canvas');
  setMapDefaultView();

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

const getIcon = (isMain = false) => {
  const currentIcon = isMain ? MainPinIcon : CommonPinIcon;
  return L.icon({
    iconUrl: currentIcon.URL,
    iconSize: currentIcon.SIZE,
    iconAnchor: currentIcon.ANCHOR,
  });
};

const addPin = (coordinates, icon, isDraggable = false) => L.marker(coordinates, {icon: icon, draggable: isDraggable}).addTo(map);

const addCommonPin = (coordinates) => addPin(coordinates, getIcon());

const addMainPin = () => addPin(PIN_DEFAULT_VALUE, getIcon(true), true);

const setCommonPins = (advertCards, callback) => {
  advertCards.forEach((card) => {
    const pin = addCommonPin([card.location.lat, card.location.lng]);
    commonPins.push(pin);
    pin.bindPopup(() => callback(card));
  });
};

const setMainPin = (callback) => {
  mainPin = addMainPin(map);
  callback(mainPin.getLatLng());
  mainPin.on('move', () => {
    callback(mainPin.getLatLng());
  });
};

const resetMainMarker = (callback) => {
  mainPin.setLatLng(PIN_DEFAULT_VALUE);
  callback(mainPin.getLatLng());
};

const mapClosePopup = () => map.closePopup();

export {
  initializeMap,
  setMainPin,
  setCommonPins,
  resetMainMarker,
  setMapDefaultView,
  removeCommonPins,
  mapClosePopup,
  MAX_NUMBER_PINS_ON_MAP
};
