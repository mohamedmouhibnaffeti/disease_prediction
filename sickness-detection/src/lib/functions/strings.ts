export function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function encryptToken(token: string, key: string) {
    let encryptedToken = '';
    for (let i = 0; i < token.length; i++) {
        let charCode = token.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        encryptedToken += String.fromCharCode(charCode);
    }
    return encryptedToken;
}

export function decryptToken(encryptedToken: string, key: string) {
    let decryptedToken = '';
    for (let i = 0; i< encryptedToken.length; i++) {
        let charCode = encryptedToken.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        decryptedToken += String.fromCharCode(charCode);
    }
    return decryptedToken;
}