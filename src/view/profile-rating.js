export const createProfileRatingTemplate = (filter) => {

  const watchedFilms = filter[1].count;

  const getUserName = (watchedFilms) => {
    if (watchedFilms === 0) {
      return '';
    } else if (watchedFilms < 11) {
      return '<p class="profile__rating">Novice</p>';
    } else if (watchedFilms < 21) {
      return '<p class="profile__rating">Fan</p>';
    } else if (watchedFilms > 20) {
      return '<p class="profile__rating">Movie buff</p>';
    }
  };

  return `<section class="header__profile profile">
  ${getUserName(watchedFilms)}
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};
