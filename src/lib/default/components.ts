import { TypeVarEnum } from '../../interface/type-var.enum';

export const components = [
  {
    id: 1,
    name: 'nav',
    description: 'меню состоящий из списка сслылок',
  },
];
export const componentsContent = [
  {
    id: 1,
    components: 1,
    name: 'position',
    type_var: TypeVarEnum.position,
    description: 'позиция ссылки в меню',
  },
  {
    id: 2,
    components: 1,
    name: 'link',
    type_var: TypeVarEnum.string,
    description: 'путь ссылки в меню',
  },
  {
    id: 3,
    components: 1,
    name: 'text',
    type_var: TypeVarEnum.string,
    description: 'текст ссылки в меню',
  },
  {
    id: 4,
    components: 1,
    name: 'visible',
    type_var: TypeVarEnum.boolean,
    description: 'показывать ли ссылку в меню',
  },
];
export const componentsStyle = [
  {
    id: 1,
    components: 1,
    style: 1,
    var_name: 'nav__link-color',
    description: 'цвет шрифта ссылок в меню',
  },
  {
    id: 2,
    components: 1,
    style: 2,
    var_name: 'nav__link-bg',
    description: 'цвет фона ссылок в меню',
  },
  {
    id: 3,
    components: 1,
    style: 3,
    var_name: 'nav__link-fz',
    description: 'размер шрифта ссылок в меню',
  },
  {
    id: 4,
    components: 1,
    style: 4,
    var_name: 'nav__link-padding',
    description: 'внутренний  отступ ссылок в меню',
  },
  {
    id: 5,
    components: 1,
    style: 5,
    var_name: 'nav__link-margin',
    description: 'внешний  отступ ссылок в меню',
  },
  {
    id: 6,
    components: 1,
    style: 8,
    var_name: 'nav__link-ff',
    description: 'тип шрифта ссылок в меню',
  },
];
