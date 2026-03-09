export const getBasket = () => JSON.parse(localStorage.getItem("basket")) || [];

export const setBasket = (items) => {
  localStorage.setItem("basket", JSON.stringify(items));
  window.dispatchEvent(new Event("basketUpdated"));
};
