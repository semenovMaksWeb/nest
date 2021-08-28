/**
 * defaultAuthorization - обозначает что менять авторизацию нельзя и она по дефолту = value
 * checkAdmin - обозначает что такие router должны иметь доступ только админы (предупреждение)
 * usersRolesAll - обозначает что таким router нельзя добавлять права ибо они доступы для всех авторизованных user
 *
 */

import {
  Categories,
  nameController as nameControllerCategories,
} from './Categories';
import { Roles, nameController as nameControllerRoles } from './Roles';
import { Rights, nameController as nameControllerRights } from './Rights';
import { User, nameController as nameControllerUser } from './User';
import { Todo, nameController as nameControllerTodo } from './Todo';

export const nameAllApi = {
  [nameControllerRoles]: Roles,
  [nameControllerRights]: Rights,
  [nameControllerUser]: User,
  [nameControllerTodo]: Todo,
  [nameControllerCategories]: Categories,
};
