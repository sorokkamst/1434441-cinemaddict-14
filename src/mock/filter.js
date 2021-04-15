const filmFilter = {
  watchlist: (films) => films.filter((film) => film.user_details.watchlist).length,
  history: (films) => films.filter((film) => film.user_details.watched).length,
  favorites: (films) => films.filter((film) => film.user_details.favorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmFilter).map(([ filterName, countFilms ]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
