const HOUSES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createPopupElement = (dataPopup) => {
  const {author, offer} = dataPopup;
  const popup = document.querySelector('#card').content.querySelector('.popup');

  const similarPopupFragment = document.createDocumentFragment();
  const newPopupItem = popup.cloneNode(true);

  const popupAvatar = newPopupItem.querySelector('.popup__avatar');
  const popupTitle = newPopupItem.querySelector('.popup__title');
  const popupAddress = newPopupItem.querySelector('.popup__text--address');
  const popupOptionPrice = newPopupItem.querySelector('.popup__text--price');
  const popupOptionTypeHotels = newPopupItem.querySelector('.popup__type');
  const popupOptionCapacity = newPopupItem.querySelector('.popup__text--capacity');
  const popupTimeStaying = newPopupItem.querySelector('.popup__text--time');
  const popupOptionDescription = newPopupItem.querySelector('.popup__description');

  popupAvatar.src = author.avatar ? author.avatar.value : popupAvatar.remove();
  popupTitle.textContent = offer.title ? offer.title : popupTitle.remove();
  popupAddress.textContent = offer.address ? offer.address : popupAddress.remove();
  popupOptionPrice.textContent = offer.price ? `${offer.price} ₽/ночь` : popupOptionPrice.remove();
  popupOptionTypeHotels.textContent = offer.type ? HOUSES[offer.type] : popupOptionTypeHotels.remove();
  popupOptionCapacity.textContent = offer.rooms ? `${offer.rooms} комнат для ${offer.guests} гостей` : popupOptionCapacity.remove();
  popupOptionDescription.textContent = offer.description ? offer.description : popupOptionDescription.remove();
  if (offer.checkin || offer.checkout) {
    const checkin = `${offer.checkin ? `Заезд после ${offer.checkin}` : ''}`;
    const checkout = `${offer.checkout ? `${ offer.checkin ? 'выезд' : 'Выезд' } до ${offer.checkout}` : ''}`;
    popupTimeStaying.textContent = `${checkin}${offer.checkin && offer.checkout ? ', ' : ''}${checkout}`;
  }
  else {
    popupTimeStaying.remove();
  }


  // В список .popup__features выведите все доступные удобства в объявлении.
  const popupFeatures = newPopupItem.querySelector('.popup__features');
  const popupFeatureItems = popupFeatures.querySelectorAll('.popup__feature');

  popupFeatureItems.forEach((featureItem) => {
    const isNecessary = offer.features.some(
      (feature) => featureItem.classList.contains(`popup__feature--${feature}`),
    );

    if (!isNecessary) {
      featureItem.remove();
    }
  });


  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна
  // записываться как атрибут src соответствующего изображения.
  const photoContainer = newPopupItem.querySelector('.popup__photos');
  const photoItem = photoContainer.querySelector('.popup__photo');
  const dataPhotos = offer.photos;
  photoContainer.innerHTML = '';

  dataPhotos.forEach((photo) => {
    const photoNew = photoItem.cloneNode(true);
    photoNew.src = photo;
    photoContainer.appendChild(photoNew);
  });


  return newPopupItem;
};

export default createPopupElement;
