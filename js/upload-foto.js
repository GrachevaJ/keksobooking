const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const chooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const chooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');

chooserAvatar.addEventListener('change', () => {
  const file = chooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

chooserPhoto.addEventListener('change', () => {
  const file = chooserPhoto.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const preview = document.createElement('img');
    preview.classList.add('ad-form__photo');
    preview.setAttribute('alt', 'Фотография жилья');
    preview.setAttribute('src', '');
    preview.src = URL.createObjectURL(file);
    previewPhoto.append(preview);
  }
});