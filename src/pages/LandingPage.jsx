import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { frontStore } from '../stores/react_store';
import { generateID } from '../utils/utility_functions';

export default function LandingPage() {

    const [showModal, setShowModal] = useState(false);
    const [compendiumName, setCompendiumName] = useState('');
    const navigate = useNavigate();
    const setCompendium = frontStore((state) => state.setCompendium);

    const handleCreate = async () => {
        const newCompendium = {
            id: generateID(),
            name: compendiumName,
            body: [],
            chapters: {},
            sections: {},
            subsections: {},
            entries: {},
            figures: {},
        };
        
        setCompendium(newCompendium);

        setShowModal(false);
        navigate("/page_not_built_yet");
    }

    const handleLoad = async () => {
        console.log("Placeholder for Load Compendium");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen max-h-100 bg-gray-900 text-white" >
            <h1 className="text-3xl" >Welcome To The Compendium Creation Assistant</h1>
            <div className="flex flex-row m-4" >
                <button className="m-2 p-2 bg-gray-700 rounded hover:bg-gray-500 transition-colors duration-200" onClick={() => setShowModal(true)} >Create New Compendium</button>
                <button className="m-2 p-2 bg-gray-700 rounded hover:bg-gray-500 transition-colors duration-200" onClick={handleLoad} >Load Existing Compendium</button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-700 p-6 rounded-xl w-96">
                        <h2 className="text-lg font-bold mb-4" >New Compendium</h2>
                        <input 
                            type="text"
                            value={compendiumName}
                            onChange={(e) => setCompendiumName(e.target.value)}
                            className="w-full border px-2 py-1 mb-4"
                            placeholder="Enter Name..."
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                                disabled={!compendiumName.trim()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}