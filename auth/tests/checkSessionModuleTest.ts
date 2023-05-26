import { checkActiveSession, checkNoActiveSession } from "../AuthModule/checkSessionModule";

describe('checkNoActiveSession', () => {
    it('should throw an error if user is not logged in', () => {
        const userStatusObj = { isLoggedIn: false, userInfo: {userName: 'JohnDoe'} };

        expect(() => {
            checkNoActiveSession(userStatusObj);
        }).toThrow(Error('No active user'));
    });

    it('should not throw an error if user is logged in', () => {
        const userStatusObj = { isLoggedIn: true, userInfo: {userName: 'JohnDoe'} };

        expect(() => {
        checkNoActiveSession(userStatusObj);
        }).not.toThrow();
    });
});

describe('checkActiveSession', () => {
    it('should throw an error if user is logged in', () => {
        const userStatusObj = { isLoggedIn: true, userInfo: {userName: 'JohnDoe'} };

        expect(() => {
            checkActiveSession(userStatusObj);
        }).toThrow(Error('You have an active session'));
    });

    it('should not throw an error if user is not logged in', () => {
        const userStatusObj = { isLoggedIn: false, userInfo: {userName: 'JohnDoe'} };

        expect(() => {
        checkActiveSession(userStatusObj);
        }).not.toThrow();
    });
});
