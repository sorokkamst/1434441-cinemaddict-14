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
import {
  getMovieInfo,
  getMovieComment
} from './mock/movie-info.js';
import {
  generateFilter
} from './mock/filter.js';

const FILMS_COUNT = 15;
const FILMS_COUNT_PER_STEP = 5;
const COMMENTS_COUNT = 5;
const FILM_COUNT = 5;
const EXTRA_FILM_COUNTER = 2;

const mockMovies = new Array(FILMS_COUNT).fill().map(getMovieInfo);
const filterFilms = generateFilter(mockMovies);
const mockComments = new Array(COMMENTS_COUNT).fill().map(getMovieComment);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

// Рейтинг пользователя
render(siteHeaderElement, createProfileRatingTemplate(filterFilms));
// Меню и сортировка фильмов
render(siteMainElement, createSiteMenuTemplate(filterFilms));
render(siteMainElement, createSortTemplate());

const siteFilmListSection = document.querySelector('.films-list .films-list__container');
const siteExtraFilmSections = document.querySelectorAll('.films-list--extra .films-list__container');

for (let i = 0; i < Math.min(mockMovies.length, FILMS_COUNT_PER_STEP); i++) {
  siteFilmListSection.insertAdjacentHTML('beforeend', createFilmCardTemplate(mockMovies[i]));
}

siteExtraFilmSections.forEach((element) => {
  for (let i = 0; i < EXTRA_FILM_COUNTER; i++) {
    element.insertAdjacentHTML('beforeend', createFilmCardTemplate(mockMovies[i]));
  }
});

// Отрисовка кнопки show more
if (mockMovies.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(siteFilmListSection, createShowMoreButtonTemplate(), 'afterend');

  const loadMoreButton = siteMainElement.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    mockMovies
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(siteFilmListSection, createFilmCardTemplate(film)));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= mockMovies.length) {
      loadMoreButton.remove();
    }
  });
}


render(siteFooterElement, createFilmInfoTemplate(mockMovies[0], mockComments), 'afterend');
