import {
  renderElement,
  RenderPosition
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

const popup = new FilmInfoPopupView(mockMovies[0], mockComments).getElement();

// Рейтинг пользователя
renderElement(siteHeaderElement, new ProfileRatingView(filterFilms).getElement(), RenderPosition.BEFOREEND);
// Меню и сортировка фильмов
renderElement(siteMainElement, new SiteMenuView(filterFilms).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenuSortView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const siteFilmListSection = document.querySelector('.films-list .films-list__container');
const siteExtraFilmSections = document.querySelectorAll('.films-list--extra .films-list__container');

for (let i = 0; i < Math.min(mockMovies.length, FILMS_COUNT_PER_STEP); i++) {
  renderElement(siteFilmListSection, new FilmCardView(mockMovies[i]).getElement(), RenderPosition.BEFOREEND);
}

siteExtraFilmSections.forEach((element) => {
  for (let i = 0; i < EXTRA_FILM_COUNTER; i++) {
    renderElement(element, new FilmCardView(mockMovies[i]).getElement(), RenderPosition.BEFOREEND);
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

export const renderPopup = () => {

  const closeButtom = popup.querySelector('.film-details__close-btn');
  closeButtom.addEventListener('click', () => {
    siteBodyElement.removeChild(popup);
  });

  renderElement(siteFooterElement, popup, RenderPosition.AFTEREND);
};
