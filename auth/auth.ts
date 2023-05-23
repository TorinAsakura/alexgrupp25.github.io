/* eslint no-console: 0 */  // --> off console.log errors
import { User, LoggedUser } from './interfaces';

let userStatus: LoggedUser = { isLoggedIn: false, userInfo: {} };

const credentials: User[] = [];

const handleError = (callback: () => void): void => {
    try {
        callback();
    } catch (error: any) {
        console.error(error.message);
    }
};

const checkLoggedIn = (): void => {
    if (!userStatus.isLoggedIn) {
        throw new Error('No active user');
    }
};

const registration = (userName: string, password: string): void => {
    handleError(() => {
        if (userStatus.isLoggedIn) {
            throw new Error('You have an active session');
        }
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
        credentials.push(regUser);
        console.log(`User with nickname "${userName}" was created`);
    });
};

const authorization = (userName: string, password: string): void => {
    handleError(() => {
        if (userStatus.isLoggedIn) {
            throw new Error('You have an active session');
    }
        const isValidCredentials = credentials.some(
        (user) => user.userName === userName && user.password === password
    );
        if (!isValidCredentials) {
            throw new Error('Username or password is incorrect');
        }
        userStatus = { isLoggedIn: true, userInfo: { userName } };
        console.log(`Greeting "${userName}"`);
    });
};

const whoAmI = (): void => {
    handleError(() => {
        checkLoggedIn();
        console.log(`User "${userStatus.userInfo.userName}" is active`);
    });
};

const logOut = (): void => {
    handleError(() => {
        checkLoggedIn();
        console.log(`User "${userStatus.userInfo.userName}" is deactivated`);
        userStatus = { isLoggedIn: false, userInfo: {} };
    });
};

export const authFunc = {
    registration,
    logOut,
    whoAmI,
    authorization,
};
