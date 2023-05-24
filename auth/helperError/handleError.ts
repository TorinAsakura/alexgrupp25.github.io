export const handleError = (callback: () => void): void => {
    try {
        callback();
    } catch (error: any) {
        console.error(error.message);
    }
};