import bcrypt from 'bcrypt'
import {createUser, registerUser} from '../AuthModule/registrationModule'
import { authFunc } from '../auth';

describe('createUser', () => {

    it('should create a new user if input is valid', () => {
        const userName = 'JohnDoe';
        const password = 'password123';
        
        const result = createUser(userName, password);

        expect(result).toEqual({
            userName: 'JohnDoe',
            password: expect.any(String)
        });
    });

    it('should throw an error if username is less than 5 characters', () => {
        const userName = 'John';
        const password = 'password123';

        expect(() => {
            createUser(userName, password);
        }).toThrow('Username must be at least 5 characters');
    });

    it('should throw an error if password is less than 6 characters', () => {
        const userName = 'JohnDoe';
        const password = 'pass';

        expect(() => {
            createUser(userName, password);
        }).toThrow('Password must be at least 6 characters');
    });

    it('should throw an error if username already exists', () => {
        const userName = 'JohnDoe';
        const password = 'password123';

        authFunc.credentials.push({
            userName: 'JohnDoe',
            password: bcrypt.hashSync('otherpassword', 10)
    });

    expect(() => {
        createUser(userName, password);
    }).toThrow('This username already exists');
    });
});

describe('registerUser', () => {

    it('should add a user to the credentials', () => {
        const user = { userName: 'JohnDoe', password: bcrypt.hashSync('password123', 10) };

        registerUser(user);

        expect(authFunc.credentials).toContainEqual(user);
    });

    it('should log a message with the created user nickname', () => {
        const user = { userName: 'JohnDoe', password: bcrypt.hashSync('password123', 10) };

        const consoleLogSpy = jest.spyOn(console, 'log');

        registerUser(user);

        expect(consoleLogSpy).toHaveBeenCalledWith(`User with nickname "${user.userName}" was created`);

        consoleLogSpy.mockRestore();
    });
});
