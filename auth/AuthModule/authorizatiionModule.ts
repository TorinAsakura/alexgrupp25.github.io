import {authFunc} from "../auth";
import { LoggedUser } from "../interfaces";

export const authenticateUser = (userName: string, password: string): boolean => {
    const {credentials} = authFunc;
    return credentials.some((user) => user.userName === userName && user.password === password);
};
export const setLoggedInStatus = (userName: string, userStatusObj:LoggedUser): void => {
    userStatusObj.isLoggedIn = true;
    userStatusObj.userInfo.userName = userName;
};
