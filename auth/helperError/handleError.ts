/* eslint no-console: 0 */  // --> off console.log errors

export const handleError = (callback: () => void): void => {
    try {
        callback();
    } catch (error: any) {
        console.error(error.message);
    }
};
