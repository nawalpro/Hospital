import {getCustomRepository} from "typeorm";
import UserRepository from './userRepository';
import UserService from './userService';
import UserController from './UserController';
import { jwtService, mailerService } from '../../libs';

const userRepository = getCustomRepository(UserRepository);
const userService = new UserService(userRepository, mailerService);
const userController = new UserController(userService, jwtService);

export {userController};