export default function LandingPage() {

    const handleCreate = async () => {
        window.electronAPI?.saveFile().then(() => {
            console.log("File Created!");
        })
    }

    const handleLoad = async () => {
        const data = await window.electronAPI.readFile().then((data) => {
            console.log('File data:', data);
            return data;
        });

        console.log("Data in HandleLoad:", data);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen max-h-100 bg-gray-900 text-white" >
            <h1 className="text-3xl" >Welcome To The Compendium Creation Assistant</h1>
            <div className="flex flex-row m-4" >
                <button className="m-2 p-2 bg-gray-700 rounded hover:bg-gray-500 transition-colors duration-200" onClick={handleCreate} >Create New Compendium</button>
                <button className="m-2 p-2 bg-gray-700 rounded hover:bg-gray-500 transition-colors duration-200" onClick={handleLoad} >Load Existing Compendium</button>
            </div>
        </div>
    );
}