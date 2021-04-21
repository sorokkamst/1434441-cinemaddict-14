import { getDate, isAny, getFieldName, getRandomInteger, createElement } from '../mock/util.js';

const ARRAY_LENGTH = 1;
const WRITER_FIELD_NAME = 'Writer';
const ACTOR_FIELD_NAME = 'Actor';
const GENRE_FIELD_NAME = 'Genre';
const COUNTRY_FIELD_NAME = 'Country';
const COUNTRIES_FIELD_NAME = 'Countries';

const createFilmInfoTemplate = (mockMovie, mockComments) => {
  const getRandomLength = getRandomInteger(0, mockComments.length);

  const { id, title, full_title, rating, info, poster, popup, user_details } = mockMovie;
  const { date, duration } = info;
  const { director, writers, actors, country, genres, full_description, age_rating } = popup;

  // Преобразут все элементы массива join(', ')
  const getWriters = isAny(writers, ARRAY_LENGTH);
  const getActors = isAny(actors, ARRAY_LENGTH);
  const getCountries = isAny(country, ARRAY_LENGTH);

  // Измение значения полей, если в массиве не одно значение // Writer ->> Writers || Actor ->> Actors
  const getWritersFieldName = getFieldName(writers, ARRAY_LENGTH, WRITER_FIELD_NAME);
  const getActorsFieldName = getFieldName(actors, ARRAY_LENGTH, ACTOR_FIELD_NAME);
  const getGenresFieldName = getFieldName(genres, ARRAY_LENGTH, GENRE_FIELD_NAME);
  const getCountiesFieldName = () => { return country.length !== 1 ? COUNTRIES_FIELD_NAME : COUNTRY_FIELD_NAME;};

  // Динамическая отрисовка элементов
  // Отрисует список жанров фильма
  const getGenres = () => { return Object.values(genres).map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');};
  // Отрисует чекбоксы Просмотрено/К просмотру/Фаровиры
  const getFilters = () => { return Object.entries(user_details).map(([ name, value ]) => `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="${name}" ${value === true ? 'checked' : ''}>
  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>`).join('');};
  // Отрисует комментарии

  const getComments = () => {
    const comments = [];
    for (let i = 0; i < getRandomLength; i++) {
      const genComment =
        `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${mockComments[i].emoji}.png" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${mockComments[i].message}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${mockComments[i].author}</span>
              <span class="film-details__comment-day">2019/12/31 23:59</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`;
      comments.push(genComment);
    }
    return comments;
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${age_rating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${full_title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${getWritersFieldName}</td>
              <td class="film-details__cell">${getWriters}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${getActorsFieldName}</td>
              <td class="film-details__cell">${getActors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${getDate(false, date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${getCountiesFieldName()}</td>
              <td class="film-details__cell">${getCountries}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${getGenresFieldName}</td>
              <td class="film-details__cell">${getGenres()}</td>
            </tr>
          </table>

          <p class="film-details__film-description">
          ${full_description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
      ${getFilters()}
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${getComments().length}</span></h3>

        <ul class="film-details__comments-list">
          ${getComments().join('')}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};
export default class FilmInfoPopup {
  constructor (movie, cooments) {
    this._element = null;
    this._movie = movie;
    this._cooments = cooments;
  }

  getTemplate() {
    return createFilmInfoTemplate(this._movie, this._cooments);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}
