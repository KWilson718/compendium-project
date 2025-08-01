export function generateID() {
    const timestamp = Date.now();
    const randomNumber = Math.random().toString(36).substring(2);

    return timestamp + randomNumber;
}