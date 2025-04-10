function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const getRandomArrayElement = (array) =>
  array[getRandomPositiveInteger(0, array.length - 1)];

function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
};

// function debounce (callback, timeoutDelay = 5000) {
//   let timeoutId;

//   return (...rest) => {
//     clearTimeout(timeoutId);

//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
//   };
// }

export {unique,getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement};
