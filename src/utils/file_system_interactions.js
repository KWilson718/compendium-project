export const saveCompendiumToFile = async () => {
    window.electronAPI?.saveFile().then(() => {
        console.log("File Created!");
    })
}

export const loadCompendiumFromFile = async () => {
    const data = await window.electronAPI.readFile().then((data) => {
        console.log('File data:', data);
        return data;
    });

    console.log("Data in HandleLoad:", data);
}