import { createElement } from '../mock/util.js';

const createTemplateFilter = (filter) => {
  const { name, count } = filter;
  const currentName = name[0].toUpperCase() + name.substring(1);
  return (`<a href="#${currentName}" class="main-navigation__item">${currentName} <span class="main-navigation__item-count">${count}</span></a>`);
};

const createSiteMenuTemplate = (filters) => {

  const filterItemsTemplate = filters.map((filter) => createTemplateFilter(filter)).join('');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
