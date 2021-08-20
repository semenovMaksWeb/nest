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
