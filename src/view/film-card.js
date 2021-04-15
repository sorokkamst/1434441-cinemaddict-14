import { getDate, isTrue } from '../mock/util.js';

export const createFilmCardTemplate = (mockMovie) => {
  const { title, rating, info, poster, descriprion, user_details } = mockMovie;
  const { date, duration, genre } = info;
  const { watchlist, watched, favorite } = user_details;

  const activElement = 'film-card__controls-item--active';

  const isAddedToWatchlist = isTrue(watchlist, activElement);
  const isWatched = isTrue(watched, activElement);
  const isFavorite = isTrue(favorite, activElement);

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${getDate(true, date)}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${descriprion}</p>
  <a class="film-card__comments">6 comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddedToWatchlist}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite}" type="button">Mark as favorite</button>
  </div>
</article>`;
};
