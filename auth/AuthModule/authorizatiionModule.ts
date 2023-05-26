import {authFunc} from "../auth";
import { LoggedUser } from "../interfaces";
import bcrypt from 'bcrypt'

export const authenticateUser = (userName: string, password: string): boolean => {
    const { credentials } = authFunc;
    const foundUser = credentials.find((user) => user.userName === userName);
    if (foundUser) {
        return bcrypt.compareSync(password, foundUser.password);
    }
    return false;
};
export const setLoggedInStatus = (userName: string, userStatusObj: LoggedUser): void => {
    const updatedUserStatus = userStatusObj;
    updatedUserStatus.isLoggedIn = true;
    updatedUserStatus.userInfo.userName = userName;
};
