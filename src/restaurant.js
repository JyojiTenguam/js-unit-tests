/* eslint-disable max-len */
// Siga as orientações do README!

const createMenu = (menuData) => {
  const menu = {
    food: { ...(menuData.food || {}) },
    drinks: { ...(menuData.drinks || {}) },
    consumption: [],
  };

  menu.fetchMenu = function () {
      return {
        food: { ...menu.food },
        drinks: { ...menu.drinks },
      };
    };

    menu.order = function (item) {
      const isFoodAvailable = menu.food[item];
      const isDrinkAvailable = menu.drinks[item];

      if (isFoodAvailable || isDrinkAvailable) {
        menu.consumption.push(item);
      } else {
        return 'Item indisponível';
      }
    };

    menu.pay = function () {
      const totalPrice = menu.consumption.reduce((total, item) => {
        const price = (menu.food[item]) || (menu.drinks[item]) || 0;
        return total + price;
      }, 0);

      return totalPrice * 1.1;
  };

  return menu;
};

module.exports = createMenu;
