/**
 * defaultAuthorization - обозначает что менять авторизацию нельзя
 * checkAdmin - обозначает что такие router должны иметь доступ только админы (предупреждение)
 * usersRolesAll - обозначает что таким router нельзя добавлять права ибо они доступы для всех авторизованных user
 * authorization
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
import { Router, nameController as nameControllerRouter } from './Router';
import { Chat, nameController as nameControllerChat } from './Chat';
import { Message, nameController as nameControllerMessage } from './Message';
import {
  ComponentsExample,
  nameController as nameControllerComponentsExample,
} from './ComponentsExample';

import {
  ComponentsContent,
  nameController as nameControllerComponentsContent,
} from './ComponentsContent';
import {
  ComponentsVar,
  nameController as nameControllerComponentsVar,
} from './ComponentsVar';

import {
  ComponentsExampleParams,
  nameController as nameControllerComponentsExampleParams,
} from './ComponentsExampleParams';

export const nameAllApi = {
  [nameControllerRoles]: Roles,
  [nameControllerRights]: Rights,
  [nameControllerUser]: User,
  [nameControllerTodo]: Todo,
  [nameControllerCategories]: Categories,
  [nameControllerRouter]: Router,
  [nameControllerChat]: Chat,
  [nameControllerMessage]: Message,
  [nameControllerComponentsExample]: ComponentsExample,
  [nameControllerComponentsContent]: ComponentsContent,
  [nameControllerComponentsVar]: ComponentsVar,
  [nameControllerComponentsExampleParams]: ComponentsExampleParams,
};
