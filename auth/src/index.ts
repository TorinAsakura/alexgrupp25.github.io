/* eslint no-console: 0 */  // --> off console.log errors

import { User, LoggedUser } from './interfaces';
import { createUser, registerUser } from './authModule/registrationModule';
import { authenticateUser, setLoggedInStatus } from './authModule/authorizationModule';
import { checkNoActiveSession, checkActiveSession } from './authModule/checkSessionModule';
import { handleError } from './helperError/handleError';

let userStatus: LoggedUser = { isLoggedIn: false, userInfo: {} };

const credentials: User[] = [];

const registration = async (userName: string, password: string): Promise<void> => {
    await handleError(async () => {
        checkActiveSession(userStatus);
        const newUser = await createUser(userName, password);
        await registerUser(newUser);
    });
};

const authorization = async (userName: string, password: string, userStatusObj:LoggedUser): Promise<void> => {
    await handleError(async () => {
        checkActiveSession(userStatusObj);
        if (!await authenticateUser(userName, password)) {
            throw new Error('Username or password is incorrect');
        }
        await setLoggedInStatus(userName, userStatusObj);
        console.log(`Greeting "${userName}"`);
    });
};

const whoAmI = (): void => {
    handleError(async () => {
        await checkNoActiveSession(userStatus);
        console.log(`User "${userStatus.userInfo.userName}" is active`);
    });
};

const logOut = (): void => {
    handleError(async () => {
        await checkNoActiveSession(userStatus);
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
