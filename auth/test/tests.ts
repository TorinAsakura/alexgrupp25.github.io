/* eslint no-console: 0 */  // --> off console.log errors
import { authFunc } from "../auth";

const {registration,
    logOut,
    whoAmI,
    authorization,
    userStatus,
    credentials
} = authFunc;

registration('AlexG','1234');
registration('Alex','123456');

registration('AlexG','123456');
console.log(credentials);
authorization('AlexDD','123456',userStatus);
authorization('AlexG','123452',userStatus);

authorization('AlexG','123456',userStatus);
whoAmI()
logOut()
whoAmI()