/* eslint no-console: 0 */  // --> off console.log errors

import { User, LoggedUser } from './AuthModule/interfaces';
import { createUser, registerUser } from './AuthModule/registrationModule';
import { authenticateUser, setLoggedInStatus } from './AuthModule/authorizatiionModule';
import { checkNoActiveSession, checkActiveSession } from './AuthModule/chekSessionModule';

let userStatus: LoggedUser = { isLoggedIn: false, userInfo: {} };

const credentials: User[] = [];

const handleError = (callback: () => void): void => {
    try {
        callback();
    } catch (error: any) {
        console.error(error.message);
    }
};
const registration = (userName: string, password: string): void => {
    handleError(() => {
        checkActiveSession();
        const newUser = createUser(userName, password);
        registerUser(newUser);
    });
};

const authorization = (userName: string, password: string): void => {
    handleError(() => {
        checkActiveSession();
        if (!authenticateUser(userName, password)) {
            throw new Error('Username or password is incorrect');
        }
        setLoggedInStatus(userName);
        console.log(`Greeting "${userName}"`);
    });
};

const whoAmI = (): void => {
    handleError(() => {
        checkNoActiveSession();
        console.log(`User "${userStatus.userInfo.userName}" is active`);
    });
};

const logOut = (): void => {
    handleError(() => {
        checkNoActiveSession();
        console.log(`User "${userStatus.userInfo.userName}" is deactivated`);
        userStatus = { isLoggedIn: false, userInfo: {} };
    });
};

export const authFunc = {
    registration,
    logOut,
    whoAmI,
    authorization,
    userStatus,
    credentials
};
