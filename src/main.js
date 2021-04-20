import {
  renderElement,
  RenderPosition,
  getRandomInteger,
  isEscEvent
} from './mock/util.js';

import ProfileRatingView from './view/profile-rating.js';
import SiteMenuView from './view/site-menu.js';
import SiteMenuSortView from './view/sort.js';
import FiltersView from './view/film-filters.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtomView from './view/show-more-button.js';
import FilmInfoPopupView from './view/film-info.js';

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
const EXTRA_FILM_COUNTER = 2;

const mockMovies = new Array(FILMS_COUNT).fill().map(getMovieInfo);
const filterFilms = generateFilter(mockMovies);
const mockComments = new Array(COMMENTS_COUNT).fill().map(getMovieComment);

const siteBodyElement = document.querySelector('.body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const renderPopup = () => {
  const popup = new FilmInfoPopupView(mockMovies[getRandomInteger(0, FILMS_COUNT)], mockComments).getElement();
  const closeButtom = popup.querySelector('.film-details__close-btn');

  closeButtom.addEventListener('click', () => {
    siteBodyElement.removeChild(popup);
  });

  renderElement(siteFooterElement, popup, RenderPosition.AFTEREND);
};

const addOpenPopupListener = (component, element) => {
  component.getElement().querySelector(element).addEventListener('click', () => {
    renderPopup();
  });
};

// Рендерит фильмы, включая extra, добавляет обработчики событий
const renderMovieCard = (moviesContainer, movie) => {
  const movieComponent = new FilmCardView(movie);

  addOpenPopupListener(movieComponent, '.film-card__title');
  addOpenPopupListener(movieComponent, '.film-card__poster');
  addOpenPopupListener(movieComponent, '.film-card__comments');

  renderElement(moviesContainer, movieComponent.getElement(), RenderPosition.BEFOREEND);
};

renderElement(siteHeaderElement, new ProfileRatingView(filterFilms).getElement(), RenderPosition.BEFOREEND); // Рейтинг пользователя
renderElement(siteMainElement, new SiteMenuView(filterFilms).getElement(), RenderPosition.BEFOREEND); // Меню и сортировка фильмов
renderElement(siteMainElement, new SiteMenuSortView().getElement(), RenderPosition.BEFOREEND); // Меню и сортировка фильмов
renderElement(siteMainElement, new FiltersView().getElement(), RenderPosition.BEFOREEND); // Меню и сортировка фильмов

const siteFilmListSection = document.querySelector('.films-list .films-list__container');
const siteExtraFilmSections = document.querySelectorAll('.films-list--extra .films-list__container');

// Рендер фильмов без extra
for (let i = 0; i < Math.min(mockMovies.length, FILMS_COUNT_PER_STEP); i++) {
  renderMovieCard(siteFilmListSection, mockMovies[i]);
}

// Рендер фильмов extra
siteExtraFilmSections.forEach((element) => {
  for (let i = 0; i < EXTRA_FILM_COUNTER; i++) {
    renderMovieCard(element, mockMovies[i]);
  }
});

// Отрисовка кнопки show more
if (mockMovies.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  renderElement(siteFilmListSection, new ShowMoreButtomView().getElement(), RenderPosition.AFTEREND);

  const loadMoreButton = siteMainElement.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    mockMovies
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderElement(siteFilmListSection, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= mockMovies.length) {
      loadMoreButton.remove();
    }
  });
}
