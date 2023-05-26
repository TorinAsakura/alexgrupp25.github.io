import { authenticateUser, setLoggedInStatus } from '..//AuthModule/authorizatiionModule';
import bcrypt from 'bcrypt';

describe('authenticateUser', () => {
    const credentials = [
        { userName: 'John Doe', password: bcrypt.hashSync('123456', 10) },
        { userName: 'Sarra Connor', password: bcrypt.hashSync('654321', 10) },
    ];

    it('should return true if user exists and passwords match', () => {
        const userName = 'John Doe';
        const password = '123456';
        const result = authenticateUser(userName, password);
        expect(result).toBe(true);
        });

    it('should return false if user does not exist', () => {
        const userName = 'Erling Holland';
        const password = '111222454';
        const result = authenticateUser(userName, password);
        expect(result).toBe(false);
    });

    it('should return false if user exists but passwords do not match', () => {
        const userName = 'Sarra Connor';
        const password = '666666';
        const result = authenticateUser(userName, password);
        expect(result).toBe(false);
    });
});

describe('setLoggedInStatus', () => {
    it('should set isLoggedIn to true and update userName', () => {
        const userName = 'user1';
        const userStatusObj = {
            isLoggedIn: false,
            userInfo: { userName: '',},
        };
        setLoggedInStatus(userName, userStatusObj);
        expect(userStatusObj.isLoggedIn).toBe(true);
        expect(userStatusObj.userInfo.userName).toBe(userName);
        });
});
