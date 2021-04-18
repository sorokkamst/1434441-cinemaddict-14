// Случайное целое число из интервала
import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const RenderPosition = {
  AFTEREND: 'afterend',
  BEFOREEND: 'beforeend',
};

const renderTemplate = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const getRandomDemical = (lower, upper) => {
  return (Math.random() * (upper - lower)).toFixed(1);
};

// Вовращает случайныё индекс
const getRandomIndex = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const getDate = (isShort, date) => {
  return isShort ? dayjs(date).format('YYYY') : dayjs(date).format('D MMMM YYYY');
};

const isAny = (param, length) => { return param.length !== length ? param.join(', ') : param;};
const getFieldName = (param, length, name) => { return param.length !== length ? name+'s' : name;};
const isTrue = (param, text) => { return param ? text : '';};

export {
  getRandomIndex,
  renderTemplate,
  renderElement,
  createElement,
  RenderPosition,
  getRandomDemical,
  getRandomInteger,
  getDate,
  isAny,
  getFieldName,
  isTrue
};
