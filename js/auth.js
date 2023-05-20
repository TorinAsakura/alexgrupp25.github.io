"use strict";
let userStatus = { isLoggedIn: false, userInfo: {} };
const credentials = [];
const registration = (userName, password) => {
    try {
        if (userStatus.isLoggedIn) {
            throw new Error('You have an active session');
        }
        if (userName.length < 5) {
            throw new Error('Username must be at least 5 characters');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        const userExist = credentials.some((user) => user.userName === userName);
        if (userExist) {
            throw new Error('This username already exists');
        }
        const regUser = { userName, password };
        credentials.push(regUser);
        console.log(`User with nickname "${userName}" was created`);
    }
    catch (error) {
        console.log(error.message);
    }
};
const authorization = (userName, password) => {
    try {
        if (userStatus.isLoggedIn) {
            throw new Error('You have an active session');
        }
        const userExist = credentials.some((user) => user.userName === userName && user.password === password);
        if (!userExist) {
            throw new Error('Username or password is incorrect');
        }
        userStatus = { isLoggedIn: true, userInfo: { userName } };
        console.log(`Greeting "${userName}"`);
    }
    catch (error) {
        console.log(error.message);
    }
};
const whoAmI = () => {
    const { userName } = userStatus.userInfo;
    if (userStatus.isLoggedIn && userName) {
        console.log(`User "${userName}" is active`);
    }
    else {
        console.log('No active user');
    }
};
const logOut = () => {
    const { userName } = userStatus.userInfo;
    if (userStatus.isLoggedIn && userName) {
        userStatus = { isLoggedIn: false, userInfo: {} };
        console.log(`User "${userName}" is deactivated`);
    }
    else {
        console.log('No active user');
    }
};
registration('12345','123456')
authorization('12345','123456')
whoAmI()
console.log(userStatus)
logOut()
console.log(userStatus)