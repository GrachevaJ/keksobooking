const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
// import { getOffer } from './data.js';
// const container = document.querySelector('#map-canvas');
const types = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const createOffer = (data) => {
  const {offer, author, location} = data;
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = `${location.lat}, ${location.lng}`;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = types[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__description').textContent = offer.description;
  // Удаление не выбранных элементов списка

  if (offer.features) {
    const featuresList = card.querySelectorAll('.popup__feature');
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);

    featuresList.forEach((featuresListItem) =>  {
      const modifier = featuresListItem.classList[1];

      if (!modifiers.includes(modifier)) {
        featuresListItem.remove();
      }
    });}
  // Фотографии
  const photos = card.querySelector('.popup__photos');
  photos.innerHTML = '';
  if (offer.photos) {
    const fragment = document
      .createDocumentFragment();
    const img = offer.photos;
    img.forEach((item) => {
      const newPhoto = document.createElement('img');
      newPhoto.classList.add('popup__photo');
      newPhoto.setAttribute('alt', 'Фотография жилья');
      newPhoto.setAttribute('src', '');
      newPhoto.src = item;
      newPhoto.setAttribute('width', '45');
      newPhoto.setAttribute('height', '40');


      fragment.append(newPhoto);
    });
    photos.append(fragment);
  } else {
    photos.style.display = 'none';
  }
  return card;
};

export {createOffer};

