const createTemplateFilter = (filter) => {
  const { name, count } = filter;
  const currentName = name[0].toUpperCase() + name.substring(1);
  return (`<a href="#${currentName}" class="main-navigation__item">${currentName} <span class="main-navigation__item-count">${count}</span></a>`);
};

export const createSiteMenuTemplate = (filters) => {

  const filterItemsTemplate = filters.map((filter) => createTemplateFilter(filter)).join('');

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
