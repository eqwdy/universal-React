import path from "path";

export function createPlitkaCard() {
  const card = {
    img: "examples/plitka.jpg",
    title: "Тротуарная плитка",
    price: 580,
    description:
      "Производим тротуарную плитку: кирпич, старый город, катушка, сота. Толщина 25 мм, 40 мм, 60 мм. Цвета: серый, коричневый, красный, чёрный, оливковый, белый, жёлтый, оранжевый.",
    types: ["Старый город", "Катушка", "Сота"],
    sizes: ["25мм", "40мм", "60мм"],
    colors: [
      { value: "#000000", text: "Чёрный" },
      { value: "#808080", text: "Серый" },
      { value: "#f8f8f8", text: "Белый" },
      { value: "#a52a2a", text: "Коричневый" },
      { value: "#ff0000", text: "Красный" },
      { value: "#ffff00", text: "Жёлтый" },
      { value: "#ffa500", text: "Оранжевый" },
      { value: "#808000", text: "Оливковый" },
    ],
  };
  return card;
}
export function createSpheresCard() {
  const card = {
    img: "examples/polySpheres.jpg",
    title: "Бетонные полусферы",
    price: 850,
    types: [],
    sizes: [],
    colors: [],
    description:
      "Производим бетонные полусферы диаметром 480 мм, высотой 250 мм, вес 65 кг.",
  };
  return card;
}
export function createPorebrikCard() {
  const card = {
    img: "examples/porebrik.jpg",
    title: "Поребрик",
    price: 120,
    types: [],
    sizes: [],
    colors: [
      { value: "#808080", text: "Серый" },
      { value: "#a52a2a", text: "Коричневый" },
      { value: "#ff0000", text: "Красный" },
    ],
    description:
      "Производим поребрики 470х60х200 мм, серого, красного и коричневого цветов.",
  };
  return card;
}
export function createBorduresCard() {
  const card = {
    img: "examples/bordures.jpg",
    title: "Дорожные бордюры",
    price: 500,
    types: [],
    sizes: [],
    colors: [],
    description: "Производим и устанавливаем дорожные бордюры.",
  };
  return card;
}
export function createFbsCard() {
  const card = {
    img: "examples/blocks.jpg",
    title: "Блоки ФБС",
    price: 2800,
    types: [],
    sizes: [],
    colors: [],
    description:
      "Производим блоки ФБС 24.3.6, 24.4.6, половинки, а также можем изготовить блоки под индивидуальный размер",
  };
  return card;
}
export function createRoundesCard() {
  const card = {
    img: "examples/roundes.jpg",
    title: "Бетонные кольца и крышки",
    price: 3350,
    types: [],
    sizes: ["Диаметр 1м", "Диаметр 1.5м"],
    colors: [],
    description:
      "Производим бетонные кольца диаметром 1 и 1,5 метра, высотой 0,3, 0,6, 0,9 и 1 метр. Так же делаем крышки и днища к ним",
  };
  return card;
}
export function createAdmin() {
  return {
    name: "Сергей",
    password: "5342312",
    tel: "+7(978)756-14-24",
  };
}
