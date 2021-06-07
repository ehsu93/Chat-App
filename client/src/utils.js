export function setTokenToLocalStorage(key, value) {
    return Promise.resolve().then(() => {
        localStorage.setItem(key, value);
    });
}