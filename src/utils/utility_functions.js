// Function used to generate a unique identifier for object creation down the line. Uses a timestamp and a random number to ensure uniqueness. 
export function generateID() {
    const timestamp = Date.now();
    const randomNumber = Math.random().toString(36).substring(2);

    return timestamp + randomNumber;
}

// Runs a quick replacement call taking any spaces in a string and replacing them with a hyphen, for usage with reletitve string manipulation
export function scrubSpaces(string){
    return string.replaceAll(' ', '_');
}