interface IUser {
    readonly userName: string;
    readonly password: string;
}
interface ILogged {
    isLoggedIn: boolean,
    readonly userInfo: Partial<IUser>
}

let userStatus : ILogged = {isLoggedIn: false, userInfo: {}};

const credentials : IUser[] = [];

const registration = (userName: string, password: string): void => {
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
    
        const userExist = credentials.some(user => user.userName === userName);
        if (userExist) {
            throw new Error('This username already exists');
    }
    
        const regUser: IUser = {
            userName,
            password
    };
    
        credentials.push(regUser);
        console.log(`User with nickname "${userName}" was created`);
    } catch (error: any) {
        console.log(error.message);
    }
};

const authorization = (userName: string, password: string): void => {
    try {
        if (userStatus.isLoggedIn) {
        throw new Error('You have an active session');
    }
    
        const userExist = credentials.some(user => user.userName === userName && user.password === password);
        if (!userExist) {
            throw new Error('Username or password is incorrect');
        }
        
        userStatus = { isLoggedIn: true, userInfo: { userName } };
        console.log(`Greeting "${userName}"`);
        
        } catch (error: any) {
        console.log(error.message);
        }
};

const whoAmI = (): void => {
    if(userStatus.isLoggedIn) {
        console.log (`User "${userStatus.userInfo.userName}" is active`)
    } else console.log('No active user')
}
const logOut = (): void => {
    if(userStatus.isLoggedIn) {
        userStatus.isLoggedIn = false;
        console.log (`User "${userStatus.userInfo.userName}" is deactivated`)
    } else console.log('No active user')
}

export default {
    registration, 
    authorization, 
    whoAmI, 
    logOut 
};