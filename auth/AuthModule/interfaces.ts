export interface User {
    readonly userName: string;
    readonly password: string;
}
export interface LoggedUser {
    readonly isLoggedIn: boolean;
    readonly userInfo: Partial<User>;
}