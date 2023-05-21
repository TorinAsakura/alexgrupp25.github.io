interface IUser {
    readonly userName: string;
    readonly password: string;
}
interface ILogged {
    isLoggedIn: boolean;
    userInfo: Partial<IUser>;
}

let userStatus: ILogged = { isLoggedIn: false, userInfo: {} };

const credentials: IUser[] = [];

const handleError = (callback: () => void): void => {
    try {
        callback();
    } catch (error: any) {
        console.log(error.message);
    }
};

const registration = (userName: string, password: string): void => {
    handleError(() => {
        if (userStatus.isLoggedIn) {
            throw new Error('You have an active session');
        }
        if (userName.length < 5) {
            throw new Error('Username must be at least 5 characters');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        if (credentials.some((user) => user.userName === userName)) {
            throw new Error('This username already exists');
        }
        const regUser: IUser = { userName, password };
        credentials.push(regUser);
        console.log(`User with nickname "${userName}" was created`);
    });
};

const authorization = (userName: string, password: string): void => {
    handleError(() => {
        if (userStatus.isLoggedIn) {
            throw new Error('You have an active session');
    }
        const isValidCredentials = credentials.some(
        (user) => user.userName === userName && user.password === password
    );
        if (!isValidCredentials) {
            throw new Error('Username or password is incorrect');
        }
        userStatus = { isLoggedIn: true, userInfo: { userName } };
        console.log(`Greeting "${userName}"`);
    });
};

const whoAmI = (): void => {
    handleError(() => {
    if (userStatus.isLoggedIn) {
        console.log(`User "${userStatus.userInfo.userName}" is active`);
    } else {
        throw new Error('No active user');
    }
    });
};

const logOut = (): void => {
    handleError(() => {
        if (userStatus.isLoggedIn) {
        userStatus = { isLoggedIn: false, userInfo: {} };
        console.log(`User "${userStatus.userInfo.userName}" is deactivated`);
        } else {
            throw new Error('No active user');
        }
    });
};

export const authVar = {
    registration,
    logOut,
    whoAmI,
    authorization,
};