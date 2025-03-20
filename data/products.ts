import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Смартфон XYZ",
    price: 29999,
    brand: "XYZ",
    description:
      "Современный смартфон с отличной камерой. Оснащен процессором последнего поколения, 6.7-дюймовым AMOLED-дисплеем и тройной камерой с разрешением 48 МП. Поддерживает 5G и имеет аккумулятор емкостью 4500 мАч.",
    isNew: true,
    image:
      "https://www.mobicom.ru/upload/iblock/11a/a97v74hxa5d1k5vuzujuf4gpelfq01ny.jpeg",
  },
  {
    id: "2",
    name: "Ноутбук ABC",
    price: 59999,
    brand: "ABC",
    description:
      "Мощный ноутбук для работы и игр. Оснащен процессором Intel Core i7, 16 ГБ оперативной памяти, SSD накопителем на 512 ГБ и дискретной видеокартой NVIDIA RTX 3060. 15.6-дюймовый дисплей с частотой обновления 144 Гц.",
    isNew: false,
    image:
      "https://www.liner.kz/upload/iblock/a02/4s6mgloq0j9cj9nlwbuhjij82yaz9mvl.jpg",
  },
  {
    id: "3",
    name: "Планшет QWE",
    price: 24999,
    brand: "QWE",
    description:
      "Легкий и производительный планшет с 10.9-дюймовым Retina дисплеем. Поддерживает стилус, имеет 8-ядерный процессор и 8 ГБ оперативной памяти. Идеален для работы и развлечений.",
    isNew: true,
    image:
      "https://gadgetstore.kz/wa-data/public/shop/products/85/04/485/images/1797/1797.970.jpeg",
  },
  {
    id: "4",
    name: "Наушники DEF",
    price: 12999,
    brand: "DEF",
    description:
      "Беспроводные наушники с активным шумоподавлением. До 30 часов работы от одного заряда, поддержка aptX HD и быстрая зарядка. Комфортная посадка и отличное качество звука.",
    isNew: false,
    image:
      "https://object.pscloud.io/darbiz/catalogs/f3b/4183778c-f3b2-11ec-99db-067aba42c30c.png",
  },
];
