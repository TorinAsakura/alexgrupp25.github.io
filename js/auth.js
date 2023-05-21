let userStatus = { isLoggedIn: false, userInfo: {} };
const credentials = [];
const handleError = (callback) => {
    try {
        callback();
    }
    catch (error) {
        document.write(error.message);
    }
};
const registration = (userName, password) => {
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
        const regUser = { userName, password };
        credentials.push(regUser);
        document.write(`User with nickname "${userName}" was created`);
    });
};
const authorization = (userName, password) => {
    handleError(() => {
        if (userStatus.isLoggedIn) {
            throw new Error('You have an active session');
        }
        const isValidCredentials = credentials.some((user) => user.userName === userName && user.password === password);
        if (!isValidCredentials) {
            throw new Error('Username or password is incorrect');
        }
        userStatus = { isLoggedIn: true, userInfo: { userName } };
        document.write(`Greeting "${userName}"`);
    });
};
const whoAmI = () => {
    handleError(() => {
        if (userStatus.isLoggedIn) {
            document.write(`User "${userStatus.userInfo.userName}" is active`);
        }
        else {
            throw new Error('No active user');
        }
    });
};
const logOut = () => {
    handleError(() => {
        if (userStatus.isLoggedIn) {
            userStatus = { isLoggedIn: false, userInfo: {} };
            document.write(`User "${userStatus.userInfo.userName}" is deactivated`);
        }
        else {
            throw new Error('No active user');
        }
    });
};
