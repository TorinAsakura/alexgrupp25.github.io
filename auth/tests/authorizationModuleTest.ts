import { authenticateUser, setLoggedInStatus } from '../AuthModule/authorizatiionModule';
import bcrypt from 'bcrypt';


describe('authenticateUser', () => {
    const credential = [
        { username: 'JohnDoe', password: bcrypt.hashSync('123456', 10) },
        { username: 'SarraConnor', password: bcrypt.hashSync('654321', 10) },
    ];
    credential.forEach(testUser => {
        it(`should return true if userName & password is correct ${testUser.username} ${testUser.password}`, async () => {
            const result = await authenticateUser(testUser.username, testUser.password);
            expect(result).toBe(true);
        });
    });
});

//     it('should return false if user does not exist', () => {
//         const userName = 'Erling Holland';
//         const password = '111222454';
//         const result = authenticateUser(userName, password);
//         expect(result).toBe(false);
//     });

//     it('should return false if user exists but passwords do not match', () => {
//         const userName = 'Sarra Connor';
//         const password = '666666';
//         const result = authenticateUser(userName, password);
//         expect(result).toBe(false);
//     });

// describe('setLoggedInStatus', () => {
//     it('should set isLoggedIn to true and update userName', () => {
//         const userName = 'user1';
//         const userStatusObj = {
//             isLoggedIn: false,
//             userInfo: { userName: '',},
//         };
//         setLoggedInStatus(userName, userStatusObj);
//         expect(userStatusObj.isLoggedIn).toBe(true);
//         expect(userStatusObj.userInfo.userName).toBe(userName);
//         });
// });
