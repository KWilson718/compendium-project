import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { frontStore } from '../stores/react_store';
import { generateID } from '../utils/utility_functions';

import path from 'path-browserify';


import StandardButton1 from '../components/StdButon1';

// First and key page served to user containing options to create or load a compendium
export default function LandingPage() {

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [compendiumName, setCompendiumName] = useState('');
    const navigate = useNavigate();
    const setCompendiumIndex = frontStore((state) => state.setCompendiumIndex);
    const setCompendiumPath = frontStore((state) => state.setCompendiumPath);
    const setCompendiumChapters = frontStore((state) => state.setCompendiumChapters);

    
    // Handles calling the API to create a folder, an index.json file, and then navigate to the core view
    const handleCreate = async () => {
        // Call to create a project
        const result = await window.electronAPI.createProject(compendiumName);

        if (!result) {
            alert('Project Creation Canceled');
            setShowCreateModal(false);
            return;
        }

        if (result.success) {
            const loadResult = await window.electronAPI.loadProject(result.path);

            if (loadResult.success) {
                // store data in local data stores
                setCompendiumIndex(loadResult.compendium);
                setCompendiumPath(result.path);

                // navigates to compendium view only after successful creation and loading of data
                navigate("/comp-view");
            } else {
                alert(`Error loading project:\n${loadResult.error}`);
            }
        } else {
            setShowCreateModal(false);
            alert(`Failed to create project:\n${result.error}`);
        }
    };

    // Handles calling the API to load a folder & therefore compendium from the file system
    const handleLoad = async () => {
        // Fetches folder location
        const location = await window.electronAPI.findProject();
        if (location.success){
            // Loads project from folder
            const loadResult = await window.electronAPI.loadProject(location.folder);

            if(loadResult.success) {
                // Syncs up across data stores
                setCompendiumIndex(loadResult.compendium);
                setCompendiumPath(location.folder);
                setCompendiumChapters(loadResult.chapters);

                // Only navigates upon successful load
                navigate("/comp-view");
            }
            else{
                alert(`Error loading project:\n${loadResult.error}`);
            }
        } else {
            alert(`Failed to find project location: \n${location.error}`);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen max-h-100 bg-gray-900 text-white" >
            <h1 className="text-3xl" >Welcome To The Compendium Creation Assistant</h1>
            <div className="flex flex-row m-4" >
                <StandardButton1 onClick={() => setShowCreateModal(true)} >Create New Compendium</StandardButton1>
                <StandardButton1 onClick={handleLoad} >Load Compendium</StandardButton1>
            </div>

            {/* Creation Modal to hold space to provide the compendium name and confirm creation */}
            {showCreateModal && (
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
                                onClick={() => {setShowCreateModal(false); setCompendiumName('');}}
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