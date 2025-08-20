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

// Extracts the metadata JSON object from the top of a chapter's HTML file
export function extractMetaData(html) {
    // extract JSON in comment
    const metaMatch = html.match(/<!--([\s\S]*?)-->/);
    let meta = null;

    if (metaMatch) {
    try {
        meta = JSON.parse(metaMatch[1]);
        console.log("Parsed metadata:", meta); // { id, title, created, modified }
    } catch (e) {
        console.error("Error parsing metadata:", e);
    }
    }
}