import {authFunc} from "./auth";

let {userStatus} = authFunc;

export const checkNoActiveSession = (): void => {
    if (!userStatus.isLoggedIn) {
        throw new Error('No active user');
    }
};

export const checkActiveSession = (): void => {
    if (userStatus.isLoggedIn) {
        throw new Error('You have an active session');
    }
};
