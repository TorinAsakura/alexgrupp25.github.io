import { LoggedUser } from "../interfaces";

export const checkNoActiveSession = (userStatusObj:LoggedUser): void => {
    if (!userStatusObj.isLoggedIn) {
        throw new Error('No active user');
    }
};

export const checkActiveSession = (userStatusObj:LoggedUser): void => {
    if (userStatusObj.isLoggedIn) {
        throw new Error('You have an active session');
    }
};
