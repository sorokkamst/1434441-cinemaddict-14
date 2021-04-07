import {
  createProfileRatingTemplate
} from './view/profile-rating.js';
import {
  createSiteMenuTemplate
} from './view/site-menu.js';
import {
  createSortTemplate
} from './view/sort.js';
import {
  createFilmCardTemplate
} from './view/film-card.js';
import {
  createShowMoreButtonTemplate
} from './view/show-more-button.js';
import {
  createFilmInfoTemplate
} from './view/film-info.js';


const FILM_COUNT = 5;
const EXTRA_FILM_COUNTER = 2;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const multipleRender = (container, template, count, place = 'beforeend') => {
  for (let i = 0; i < count; i++) {
    container.insertAdjacentHTML(place, template);
  }
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

// Рейтинг пользователя
render(siteHeaderElement, createProfileRatingTemplate());
// Меню и сортировка фильмов
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createSortTemplate());

const siteFilmListSection = document.querySelector('.films-list .films-list__container');
const siteExtraFilmSections = document.querySelectorAll('.films-list--extra .films-list__container');

// Отрисовка всех фильмов, включая extra
multipleRender(siteFilmListSection, createFilmCardTemplate(), FILM_COUNT);
siteExtraFilmSections.forEach((element) => multipleRender(element, createFilmCardTemplate(), EXTRA_FILM_COUNTER));

// Отрисовка кнопки show more
render(siteFilmListSection, createShowMoreButtonTemplate(), 'afterend');

// Отрисовка кнопки show more
render(siteFooterElement, createFilmInfoTemplate(), 'afterend');

