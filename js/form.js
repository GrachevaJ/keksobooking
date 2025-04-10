import { sendData } from './api.js';
const form = document.querySelector('.ad-form');
// const g = document.querySelector('[name="housing-rooms"]').value;


const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element',
  errorTextTag: 'span'
});


const minPriceForType = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const typeField = form.querySelector('[name="type"]');

const priceField = document.querySelector('#price');

function validateMinPrice (value) {
  priceField.setAttribute('min', minPriceForType[typeField.value]);
  priceField.placeholder = minPriceForType[typeField.value];
  return value.length && parseInt(value) >= minPriceForType[typeField.value];
}
function getPriceErrorMessage () {
  return `
    Минимальная цена за ночь ${minPriceForType[typeField.value]}
    `;
}

pristine.addValidator(priceField, validateMinPrice, getPriceErrorMessage);

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: priceField.placeholder,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  priceField.value = sliderValue;
});

typeField.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPriceForType[typeField.value],
      max: 100000,
    },
    step: 1
  });
  sliderElement.noUiSlider.set(minPriceForType[typeField.value]);
  const sliderValue = sliderElement.noUiSlider.get();
  priceField.value = sliderValue;

});



const roomField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');
const roomOptions = {
  '1': '1',
  '2': ['1','2'],
  '3': ['1','2','3'],
  '100': '0'
};

function validateRoom () {
  return roomOptions[roomField.value].includes(capacityField.value);
}

function getGuestErrorMessage () {
  if (roomField.value === '1') {
    return `Въезд более ${roomField.value} гостя невозможен`;}
  else if ((roomField.value === '2') || (roomField.value === '3')) {
    return `Въезд более ${roomField.value} гостей невозможен`;}
  return  'Не для гостей';
}

pristine.addValidator(roomField, validateRoom, getGuestErrorMessage);
pristine.addValidator(capacityField, validateRoom, getGuestErrorMessage);

function onUnitCapacityChange () {
  capacityField.placeholder = roomOptions[this.value];
  pristine.validate(capacityField);
}
function onUnitRoomChange () {
  roomField.placeholder = roomOptions[this.value];
  pristine.validate(roomField);
}
form.querySelectorAll('[name="capacity"]').forEach((item) => item.addEventListener('change', onUnitCapacityChange));
form.querySelectorAll('[name="rooms"]').forEach((item) => item.addEventListener('change', onUnitRoomChange));

const setUserFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  
    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => onSuccess(),
        () => onFail(),
        new FormData(evt.target),
      );
    }
    form.reset();
  }); 
};

export {setUserFormSubmit};