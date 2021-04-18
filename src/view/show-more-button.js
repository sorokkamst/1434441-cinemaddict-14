import { createElement } from '../mock/util.js';

const createShowMoreButtonTemplate = () => {
  // eslint-disable-next-line quotes
  return `<button class="films-list__show-more">Show more</button>`;
};
export default class ShowMoreButtom {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
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
