export function areAllStringsEmpty(obj: any): boolean {
    if (!obj || typeof obj !== 'object') {
        return true;
    }
    for (const key in obj) {
        if (typeof obj[key] === 'string' && obj[key].trim() !== '') {
            return false;
        }
    }
    return true;
}
