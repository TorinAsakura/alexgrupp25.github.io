/* eslint no-console: 0 */  // --> off console.log errors

import { User, LoggedUser } from './interfaces';
import { createUser, registerUser } from './AuthModule/registrationModule';
import { authenticateUser, setLoggedInStatus } from './AuthModule/authorizatiionModule';
import { checkNoActiveSession, checkActiveSession } from './AuthModule/checkSessionModule';
import { handleError } from './helperError/handleError';

let userStatus: LoggedUser = { isLoggedIn: false, userInfo: {} };

const credentials: User[] = [];

const registration = async (userName: string, password: string): Promise<void> => {
    handleError(async () => {
        checkActiveSession(userStatus);
        const newUser = await createUser(userName, password);
        registerUser(newUser);
    });
};

const authorization = (userName: string, password: string, userStatusObj:LoggedUser): void => {
    handleError(() => {
        checkActiveSession(userStatusObj);
        if (!authenticateUser(userName, password)) {
            throw new Error('Username or password is incorrect');
        }
        setLoggedInStatus(userName, userStatusObj);
        console.log(`Greeting "${userName}"`);
    });
};

const whoAmI = (): void => {
    handleError(() => {
        checkNoActiveSession(userStatus);
        console.log(`User "${userStatus.userInfo.userName}" is active`);
    });
};

const logOut = (): void => {
    handleError(() => {
        checkNoActiveSession(userStatus);
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
