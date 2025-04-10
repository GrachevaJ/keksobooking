import './form.js';
import './map.js';
import './slider.js';
import './upload-foto.js';
import { setUserFormSubmit } from './form.js';
import { showWindowErrorUpload, showWindowSuccessUpload } from './show-message.js';


setUserFormSubmit(showWindowSuccessUpload, showWindowErrorUpload);
// C:\Users\Juliy\OneDrive\Desktop\Новая папка\keksobooking

// fetch('https://31.javascript.htmlacademy.pro/keksobooking/data')
//   .then((response) => response.json())
//   .then((offers) => {
//     offers.forEach((offer) => onSuccess(offer));
// });
