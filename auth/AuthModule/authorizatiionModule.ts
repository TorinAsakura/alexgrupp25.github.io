import {authFunc} from "../auth";
import { LoggedUser } from "../interfaces";
import * as bcrypt from 'bcrypt'

export const authenticateUser = (userName: string, password: string): boolean => {
    const { credentials } = authFunc;
    const user = credentials.find((user) => user.userName === userName);
    if (user) {
        return bcrypt.compareSync(password, user.password);
    }
    return false;
};
export const setLoggedInStatus = (userName: string, userStatusObj: LoggedUser): void => {
    const updatedUserStatus = userStatusObj;
    updatedUserStatus.isLoggedIn = true;
    updatedUserStatus.userInfo.userName = userName;
};
