/* eslint no-console: 0 */  // --> off console.log errors

import {authFunc} from "../auth";
import {User} from '../interfaces';
import * as bcrypt from 'bcryptjs'

export const createUser = (userName: string, password: string): User => {
    const {credentials} = authFunc

    if (userName.length < 5) {
        throw new Error('Username must be at least 5 characters');
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
    if (credentials.some((user) => user.userName === userName)) {
        throw new Error('This username already exists');
    }

    const hashedPassword: string = bcrypt.hashSync(password, 10);

    const regUser: User = { userName, password: hashedPassword };
    return regUser;
};

export const registerUser = (user: User): void => {

    const {credentials} = authFunc
    credentials.push(user);
    console.log(`User with nickname "${user.userName}" was created`);
};
