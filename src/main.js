import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import iconError from '/img/error.svg';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[name="query"]');
const loader = document.querySelector('.loader'); // передбачаємо елемент loader у HTML
let page = 1;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      titleColor: 'white',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      iconUrl: iconError,
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const images = await fetchImages(query, page);
    hideLoader();

    if (images.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImages(images);
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      titleColor: 'white',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      iconUrl: iconError,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

function showLoader() {
  loader.classList.add('visible'); // активуємо індикатор завантаження
}

function hideLoader() {
  loader.classList.remove('visible'); // приховуємо індикатор завантаження
}
