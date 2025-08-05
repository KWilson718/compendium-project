import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { frontStore } from '../stores/react_store';
import { generateID } from '../utils/utility_functions';

import StandardButton1 from '../components/StdButon1';

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

        // setShowModal(false);
        navigate("/comp-view");
    }

    const handleLoad = async () => {
        console.log("Placeholder for Load Compendium");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen max-h-100 bg-gray-900 text-white" >
            <h1 className="text-3xl" >Welcome To The Compendium Creation Assistant</h1>
            <div className="flex flex-row m-4" >
                <StandardButton1 onClick={() => setShowModal(true)} >Create New Compendium</StandardButton1>
                <StandardButton1 onClick={handleLoad} >Load Compendium</StandardButton1>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-xl w-96">
                        <h2 className="text-lg font-bold mb-4" >New Compendium</h2>
                        <input 
                            type="text"
                            value={compendiumName}
                            onChange={(e) => setCompendiumName(e.target.value)}
                            className="w-full border px-2 py-1 mb-4"
                            placeholder="Enter Name..."
                        />
                        <div className="flex justify-end gap-2">
                            <StandardButton1
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </StandardButton1>
                            <StandardButton1
                                onClick={handleCreate}
                                disabled={!compendiumName.trim()}
                            >
                                Save
                            </StandardButton1>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}