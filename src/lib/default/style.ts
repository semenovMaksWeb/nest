export const styleValue = [
  {
    id: 1,
    name: 'color',
    description: 'Свойство цвет шрифта',
    typeId: 1,
  },
  {
    id: 2,
    name: 'background-color',
    description: 'Свойство цвет фона',
    typeId: 1,
  },
  {
    id: 3,
    name: 'font-size',
    description: 'Размер шрифта',
    typeId: 2,
  },
  {
    id: 4,
    name: 'padding',
    description: 'Внутренний отступ',
    typeId: 3,
  },
  {
    id: 5,
    name: 'margin',
    description: 'Внешний отступ',
    typeId: 3,
  },
  {
    id: 6,
    name: 'font-weight',
    description: 'Ширина шрифта',
    typeId: 4,
  },
  {
    id: 7,
    name: 'text-align',
    description: 'горизонтальное выравнивание текста',
    typeId: 5,
  },
  {
    id: 7,
    name: 'width',
    description: 'Ширина',
    typeId: 2,
  },
  {
    id: 8,
    name: 'height',
    description: 'Ширина',
    typeId: 2,
  },
  {
    id: 8,
    name: 'font-family',
    description: 'Тип шрифта',
    typeId: 6,
  },
  {
    id: 9,
    name: 'border',
    description: 'Внешняя граница',
    typeId: 6,
  },
  {
    id: 10,
    name: 'outline',
    description: 'Внутрення граница',
    typeId: 6,
  },
];
export const styleType = [
  {
    id: 1,
    name: 'color',
    description: 'Все свойства связанные только с цветом',
    enum: null,
  },
  {
    id: 2,
    name: 'size',
    description:
      'Размер какой лицо величины в 1 значении примеры (1px, 1em, 1%)',
    enum: null,
  },
  {
    id: 3,
    name: 'sizes',
    description:
      'Размер какой лицо величины в 1-4 значении примеры (1px 1px 1px 1px, 1px 1px 1px, 1px 1px, 1px)',
    enum: null,
  },
  {
    id: 4,
    name: 'font-weight',
    description: 'Ширина шрифта тип',
    enum: '[100, 200, 300, 400, 500, 600, 700, 800, 900]',
  },
  {
    id: 5,
    name: 'text-align',
    description: 'горизонтальное выравнивание текста',
    enum: '[center, justify, left, right]',
  },
  {
    id: 6,
    name: 'text',
    description: 'Нет коретной валидация названия шрифтов ссылок на фон и тд',
    enum: null,
  },
];
