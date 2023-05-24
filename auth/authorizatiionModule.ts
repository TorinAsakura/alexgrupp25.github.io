import {authFunc} from "./auth";

const {credentials} = authFunc;
let {userStatus} = authFunc;

export const authenticateUser = (userName: string, password: string): boolean => {
    return credentials.some((user) => user.userName === userName && user.password === password);
};
export const setLoggedInStatus = (userName: string): void => {
    userStatus = { isLoggedIn: true, userInfo: { userName } };
};
