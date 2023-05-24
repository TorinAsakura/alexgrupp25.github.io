import {authFunc} from "../auth";
import {User} from './interfaces';

const {credentials} = authFunc


export const createUser = (userName: string, password: string): User => {
    if (userName.length < 5) {
        throw new Error('Username must be at least 5 characters');
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
    if (credentials.some((user) => user.userName === userName)) {
        throw new Error('This username already exists');
    }
    const regUser: User = { userName, password };
    return regUser;
};

export const registerUser = (user: User): void => {
    credentials.push(user);
    console.log(`User with nickname "${user.userName}" was created`);
};
