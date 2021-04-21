import {
  getRandomIndex,
  getRandomDemical,
  getRandomInteger,
  getRandomArray,
  ID_PARTS
} from './util.js';

const MIN_RATING = 0;
const MAX_RATING = 10;
const MIN_HOUR = 0;
const MAX_HOUR = 4;
const MIN_DURATION = 0;
const MAX_DURATION = 59;
const ZERO_HOUR_MIN_DURATION = 20;
const DESCRIPTION_MAX_LENGTH = 139;
const GENRES_MAX_SLICE = 5;

const movieMockInfo = {
  moviePosters: [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ],
  movieTitles: [
    'Ну погоди',
    'Маша и медведь',
    'Винни Пух',
    'Вовка в Тридевятом царстве',
    'Бременские музыканты',
  ],
  movieFullTitles: {
    'Ну погоди': 'Ну погоди',
    'Маша и медведь': 'Маша и медведь',
    'Винни Пух': 'Винни Пух',
    'Вовка в Тридевятом царстве': 'Вовка в Тридевятом царстве',
    'Бременские музыканты': 'Бременские музыканты',
  },
  movieReleaseDate: {
    'Ну погоди': '1969-05-06',
    'Маша и медведь': '2009-01-18',
    'Винни Пух': '1969-07-11',
    'Вовка в Тридевятом царстве': '1965-09-27',
    'Бременские музыканты': '1969-02-17',
  },
  movieDirector: {
    'Ну погоди': 'Геннадий Сокольский',
    'Маша и медведь': 'Олег Кузовков',
    'Винни Пух': 'Фёдор Хитрук',
    'Вовка в Тридевятом царстве': 'Борис Степанцев',
    'Бременские музыканты': 'Инесса Ковалевская',
  },
  movieWriters: {
    'Ну погоди': ['Феликс Камов', 'Александр Курляндский', 'Аркадий Хайт'],
    'Маша и медведь': ['Олег Ужинов', 'Наталья Румянцева', 'Денис Червяцов'],
    'Винни Пух': ['Борис Заходер', 'Фёдор Хитрук'],
    'Вовка в Тридевятом царстве': ['Вадим Коростылёв'],
    'Бременские музыканты': ['Юрий Энтин', 'Василий Ливанов', 'Макс Жеребчевский'],
  },
  movieActors: {
    'Ну погоди': ['Борис Новиков', 'Мария Виноградова', 'Владимир Сошальский'],
    'Маша и медведь': ['Алина Кукушкина', 'Варвара Саранцева', 'Анастасия Радик'],
    'Винни Пух': ['Евгений Леонов', 'Ия Саввина', 'Владимир Осенев'],
    'Вовка в Тридевятом царстве': ['Рина Зелёная', 'Елена Понсова', 'Клара Румянова'],
    'Бременские музыканты': ['Эльмира Жерздева', 'Олег Анофриев', 'Анатолий Горохов'],
  },
  movieCountry: {
    'Ну погоди': ['Россия', 'Украина'],
    'Маша и медведь': ['Россия'],
    'Винни Пух': ['Союз Советских Социалистических Республик'],
    'Вовка в Тридевятом царстве': ['Союз Советских Социалистических Республик'],
    'Бременские музыканты': ['Союз Советских Социалистических Республик'],
  },
  ageRating: {
    'Ну погоди': '0+',
    'Маша и медведь': '4+',
    'Винни Пух': '0+',
    'Вовка в Тридевятом царстве': '0+',
    'Бременские музыканты': '0+',
  },
  movieDescriprion: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  ],
  genre: [
    'Боевик',
    'Вестерн',
    'Детектив',
    'Криминал',
    'Драма',
  ],
};

const movieMockComment = {
  author: [
    'Вася',
    'Ваня',
    'Венедикт',
    'Варвара',
    'Вероника',
  ],
  message: [
    'Вот раньше снимали хорошо!',
    'Пришла после Короля льва, другое дело совсем',
    'Дочке понравилось, да и я детство вспомнил',
    'Красиво! Хорошо, что бесплатно',
    'Уже столько времени прошло? Куда вреся летит...',
  ],
  emoji: [
    'angry',
    'puke',
    'sleeping',
    'smile',
  ],
};

const getMovieInfo = () => {

  const title = getRandomIndex(movieMockInfo.movieTitles);
  const durationHours = getRandomInteger(MIN_HOUR, MAX_HOUR);
  const movieDescriprion = getRandomIndex(movieMockInfo.movieDescriprion);

  return {
    id: getRandomArray(ID_PARTS),
    title: title,
    full_title: movieMockInfo.movieFullTitles[title],
    rating: getRandomDemical(MIN_RATING, MAX_RATING),
    info: {
      date: movieMockInfo.movieReleaseDate[title],
      duration: `${durationHours}h ${durationHours === 0 ? getRandomInteger(ZERO_HOUR_MIN_DURATION, MAX_DURATION) : getRandomInteger(MIN_DURATION, MAX_DURATION)}m`,
      genre: getRandomIndex(movieMockInfo.genre),
    },
    poster: getRandomIndex(movieMockInfo.moviePosters),
    descriprion: movieDescriprion.length > 139 ? `${movieDescriprion.slice(0, DESCRIPTION_MAX_LENGTH)}...` : movieDescriprion,
    popup: {
      director: movieMockInfo.movieDirector[title],
      writers: movieMockInfo.movieWriters[title],
      actors: movieMockInfo.movieActors[title],
      country: movieMockInfo.movieCountry[title],
      genres: movieMockInfo.genre.slice(0, getRandomInteger(1, GENRES_MAX_SLICE)),
      full_description: movieDescriprion,
      age_rating: movieMockInfo.ageRating[title],
    },
    user_details: {
      watchlist: Boolean(getRandomInteger(0,1)),
      watched: Boolean(getRandomInteger(0,1)),
      favorite: Boolean(getRandomInteger(0,1)),
    },
  };
};

const getMovieComment = () => {

  return {
    author: getRandomIndex(movieMockComment.author),
    message: getRandomIndex(movieMockComment.message),
    emoji: getRandomIndex(movieMockComment.emoji),
  };
};


export {
  getMovieInfo,
  getMovieComment
};
