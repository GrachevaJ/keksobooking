const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content;
const container = document.createElement('div');
const errorTemplate = document.querySelector('#error').content;

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    container.remove();
  }
}

const showWindowSuccessUpload = () => {
  const successWindow = successTemplate.cloneNode(true);
  container.append(successWindow);
  body.append(container);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', () => container.remove());
};

const showWindowErrorUpload = () => {
  const errorWindow = errorTemplate.cloneNode(true);
  container.append(errorWindow);
  body.append(container);
  const closeErrorWindowButton = container.querySelector('.error__button');
  document.addEventListener('keydown', onEscKeyDown);
  closeErrorWindowButton.addEventListener('click', () => container.remove());
};

export { showWindowErrorUpload, showWindowSuccessUpload};