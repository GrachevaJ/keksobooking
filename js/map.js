/* eslint-disable eqeqeq */
import { getData } from './api.js';
import {createOffer} from './offer.js';
// import { debounce } from './util.js';

const address = document.querySelector('#address');
// Активация ???
const form = document.querySelector('.ad-form');
const formMap = document.querySelector('.map__filters');

form.classList.add('ad-form--disabled');
formMap.classList.add('map__filters--disabled');


function activeForm () {
  form.classList.remove('ad-form--disabled');
  formMap.classList.remove('map__filters--disabled');
}

const map = L.map('map-canvas').on('load', activeForm)
  .setView({
    lat: 35.65964,
    lng: 139.73758,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.65964,
    lng: 139.73758,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

address.value = 'lat: 35.65964, lng: 139.73758';

mainPinMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat;
  const lng = evt.target.getLatLng().lng;
  address.value = `lat: ${lat.toFixed(5)}, lng: ${lng.toFixed(5)}`;
});

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const OFFERS_COUNT = 10;
const selectHousingType = document.querySelectorAll('[name="housing-type"]');
const selectHousingPrice = document.querySelectorAll('[name="housing-price"]');
const selectHousingRooms = document.querySelectorAll('[name="housing-rooms"]');
const selectHousingGuests = document.querySelectorAll('[name="housing-guests"]');
const selectHousingFeatures = document.querySelectorAll('[name="features"]');

const range = (start, stop, step) =>
  Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step,
  );

const low = range(1,10000,1);
const middle = range(10000,50000,1);
const high = range(50000,100000,1);

const variantsPrice = {
  'low': low,
  'middle': middle,
  'high': high,
};

const onClick = () => {
  const featuresChecked = Array.from(document.querySelectorAll('[name="features"]')).filter((element) => element.checked).map((element) => element.value);

  return featuresChecked;
};

const getOfferRank = (item) => {
  const selectedType = document.querySelector('[name="housing-type"]');
  const selectedPrice = document.querySelector('[name="housing-price"]');
  const selectedRooms = document.querySelector('[name="housing-rooms"]');
  const selectedGuests = document.querySelector('[name="housing-guests"]');
  const selectedFeatures = onClick();

  let rank = 0;

  if (item.offer.type === selectedType.value) {
    rank += 1;
  }

  if (variantsPrice[selectedPrice.value] !== undefined && variantsPrice[selectedPrice.value].includes(item.offer.price)) {
    rank += 1;
  }

  if (item.offer.rooms == selectedRooms.value) {
    rank +=1;
  }

  if (item.offer.guests == selectedGuests.value) {
    rank +=1;
  }

  if (item.offer.features !== undefined && item.offer.features === selectedFeatures) {
    rank +=10;
  }

  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
};

const pinContainer = document.querySelector('.leaflet-marker-pane');
const mainPin = pinContainer.querySelector('.leaflet-marker-draggable');

const clearPinMarker = () => {
  pinContainer.innerHTML = '';
  pinContainer.append(mainPin);
};

const createPinMarkers = (data) => {
  const {location} = data;
  const cardPopup = createOffer(data);
  const lat = location.lat;
  const lng = location.lng;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(cardPopup);
};

const changeType = (cb) => {
  selectHousingType.forEach((item) => item.addEventListener('change', () => {
    map.closePopup();
    clearPinMarker();
    cb();
  }));
};

const changePrice = (cb) => {
  selectHousingPrice.forEach((item) => item.addEventListener('change', () => {
    map.closePopup();
    clearPinMarker();
    cb();
  }));
};

const changeRooms = (cb) => {
  selectHousingRooms.forEach((item) => item.addEventListener('change', () => {
    map.closePopup();
    clearPinMarker();
    cb();
  }));
};

const changeGuests = (cb) => {
  selectHousingGuests.forEach((item) => item.addEventListener('change', () => {
    map.closePopup();
    clearPinMarker();
    cb();
  }));
};


const changeFeatures = (cb) => {
  selectHousingFeatures.forEach((item) => item.addEventListener('change', () => {
    map.closePopup();
    clearPinMarker();
    cb();
  }));
};

const createPopupCard = (offers) => {
  offers
    .slice()
    .sort(compareOffers)
    .slice(0, OFFERS_COUNT)
    .forEach((elem) => {
      createPinMarkers(elem);
    } );
};

// const createPopupCard = (offers) => {
//   offers
//     .slice()
//     .sort(compareOffers)
//     .slice(0, OFFERS_COUNT)
//     .forEach((data) => {
//       const {location} = data;
//       const cardPopup = createOffer(data);
//       const lat = location.lat;
//       const lng = location.lng;
//       const marker = L.marker(
//         {
//           lat,
//           lng,
//         },
//         {
//           icon,
//         },
//       );
// console.log(marker);
//       marker
//         .addTo(map)
//         .bindPopup(cardPopup);
//     });
// };
getData
  // .then((offers) => offers.slice(0, OFFERS_COUNT))
  .then((offers) => {
    createPopupCard(offers);
    changeType(() => createPopupCard(offers));
    changePrice(() => createPopupCard(offers));
    changeRooms(() => createPopupCard(offers));
    changeGuests(() => createPopupCard(offers));
    changeFeatures(() => createPopupCard(offers));
    // .slice()
    // .sort(compareOffers)
    // .slice(0, OFFERS_COUNT)
    // .forEach((data) => createPopupCard(data));
  });

// getData
//   .then((offers) => offers.slice(0, OFFERS_COUNT))
//   .then((offers) => {
//     offers.forEach((data) => {
//       const {location} = data;
//       const cardPopup = createOffer(data);
//       const lat = location.lat;
//       const lng = location.lng;
//       const marker = L.marker(
//         {
//           lat,
//           lng,
//         },
//         {
//           icon,
//         },
//       );
//       marker
//         .addTo(map)
//         .bindPopup(cardPopup);
//     });
//   });

