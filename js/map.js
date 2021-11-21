const ZOOM_LEVEL = 13;
const DEFAULT_PIN_COORDINATES = [35.681729, 139.753927];
const MAX_COMMON_PINS_COUNT_ON_MAP = 10;
const MainIcon = {
  URL: './img/main-pin.svg',
  SIZE: [52, 52],
  ANCHOR: [26, 52],
};
const CommonIcon = {
  URL: './img/pin.svg',
  SIZE: [40, 40],
  ANCHOR: [20, 40],
};
let map = undefined;
let mainPin = undefined;
const commonPins = [];

const setMapDefaultView = () => {
  map.setView(DEFAULT_PIN_COORDINATES, ZOOM_LEVEL);
};

const removeCommonPins = () => {
  commonPins.forEach((marker) => marker.remove());
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
  const currentIcon = isMain ? MainIcon : CommonIcon;
  return L.icon({
    iconUrl: currentIcon.URL,
    iconSize: currentIcon.SIZE,
    iconAnchor: currentIcon.ANCHOR,
  });
};

const addPin = (coordinates, icon, isDraggable = false) => L.marker(coordinates, {icon: icon, draggable: isDraggable}).addTo(map);

const addCommonPin = (coordinates) => addPin(coordinates, getIcon());

const addMainPin = () => addPin(DEFAULT_PIN_COORDINATES, getIcon(true), true);

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

const resetMainPin = (callback) => {
  mainPin.setLatLng(DEFAULT_PIN_COORDINATES);
  callback(mainPin.getLatLng());
};

export {initializeMap, setMainPin, setCommonPins, resetMainPin, setMapDefaultView, removeCommonPins, MAX_COMMON_PINS_COUNT_ON_MAP};
