import { getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement,unique } from './util.js';

const titleVariants = [
  'Любите захватывающий вид?',
  'Исключительный случай — только сегодня апартаменты на (улице) со скидкой 40%',
  'Рядом лес. Вдохните разницу!',
  'Маленькая дружелюбная студия',
  'Дайте вашей семье (сотрудникам) лучшее',
  'Отличные соседи, отличная цена',
  'Забронируйте сейчас или подождите пока цены поднимутся ',
  'Адрес, который вы будете называть таксисту с гордостью',
  'Апартаменты с прекрасным и бесплатным видом',
  'Это важно для вас — жить в центре города?'
];

const typeVariants = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const checkinCheckoutVariants = [
  '12:00',
  '13:00',
  '14:00'
];
const featuresVariants = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const descriptionVariants = [
  'описание 1',
  'описание 2',
  'описание 3',
  'описание 4',
  'описание 5',
  'описание 6'
];
const photosVariants = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createLocation = () => ({
  lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
  lng: getRandomPositiveFloat(139.70000, 139.80000, 5)
});

const createOffer = () => ({
  author: {
    avatar: `img/avatars/user${getRandomPositiveInteger(1,10).toString().padStart(2,'0')}.png`
  },
  offer: {
    title: getRandomArrayElement(titleVariants),
    // address: `${createLocation().lat}, ${createLocation().lng}`,
    price: getRandomPositiveInteger(0,100000),
    type: getRandomArrayElement(typeVariants),
    rooms: getRandomPositiveInteger(1,3),
    guests: getRandomPositiveInteger(1,3),
    checkin: getRandomArrayElement(checkinCheckoutVariants),
    checkout: getRandomArrayElement(checkinCheckoutVariants),
    features: unique(Array.from({length: getRandomPositiveInteger(1,6)}, () => getRandomArrayElement(featuresVariants))),
    description: unique(Array.from({length: getRandomPositiveInteger(1,6)}, () => getRandomArrayElement(descriptionVariants))),
    photos: unique(Array.from({length: getRandomPositiveInteger(1,6)}, () => getRandomArrayElement(photosVariants)))
  },
  location: {
    lat: createLocation().lat,
    lng: createLocation().lng
  }
});

const getOffer = () =>
  Array.from({length: 10}, (_, offerIndex) => createOffer(offerIndex + 1));



export {getOffer};
