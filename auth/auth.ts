import { User, LoggedUser } from './interfaces';

let userStatus: LoggedUser = { isLoggedIn: false, userInfo: {} };

const credentials: User[] = [];

const handleError = (callback: () => void): void => {
    try {
        callback();
    } catch (error: any) {
        console.error(error.message);
    }
};

const checkNoActiveSession = (): void => {
    if (!userStatus.isLoggedIn) {
        throw new Error('No active user');
    }
};

const checkactiveSession = (): void => {
    if (userStatus.isLoggedIn) {
        throw new Error('You have an active session');
    }
};

const createUser = (userName: string, password: string): User => {
    if (userName.length < 5) {
        throw new Error('Username must be at least 5 characters');
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
    }
    if (credentials.some((user) => user.userName === userName)) {
        throw new Error('This username already exists');
    }
    const regUser: User = { userName, password };
    return regUser;
};

const registerUser = (user: User): void => {
    credentials.push(user);
    console.log(`User with nickname "${user.userName}" was created`);
};

const authenticateUser = (userName: string, password: string): boolean => {
    return credentials.some((user) => user.userName === userName && user.password === password);
};

const setLoggedInStatus = (userName: string): void => {
    userStatus = { isLoggedIn: true, userInfo: { userName } };
};

const registration = (userName: string, password: string): void => {
    handleError(() => {
        checkactiveSession();
        const newUser = createUser(userName, password);
        registerUser(newUser);
    });
};

const authorization = (userName: string, password: string): void => {
    handleError(() => {
        checkactiveSession();
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
};
