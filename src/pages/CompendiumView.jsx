import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { frontStore } from "../stores/react_store";

import StandardButton1 from '../components/StdButon1';

export default function CompendiumView () {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const compendiumObj = frontStore((state) => state.currentCompendium);
    const setCompendium = frontStore((state) => state.setCompendium);
    const loadCompendium = frontStore((state) => state.loadCompendium);

    const navigate = useNavigate();

    useEffect(() => {
        loadCompendium();
        setDataLoaded(true);
    }, [loadCompendium, dataLoaded]);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white m-0 p-0">
            <div className="w-full bg-gray-800 text-white px-4 py-2 shadow-md flex items-center justify-between" >
                <div className="">
                    <StandardButton1 disabled={!dataLoaded} className="h-full shadow-md" >Save</StandardButton1>
                </div>
                <div className="">
                    <StandardButton1 disabled={!dataLoaded} className="h-full shadow-md" >Add Content</StandardButton1>
                    <StandardButton1 disabled={!dataLoaded} className="h-full shadow-md" >Edit Content</StandardButton1>
                </div>
                <div className="">
                    <StandardButton1 onClick={() => navigate("/")} className="h-full shadow-md" >Back</StandardButton1>
                </div>
            </div>

            {/* Used to output a message if there's a loading error */}
            {(compendiumObj == {}) && <div>
                <h1>Error: No Compendium Loaded</h1>
                <p>Current Data Object Below:</p>
                <pre>{JSON.stringify(compendiumObj, null, 2)}</pre>
            </div>}
            
            {/* The Core Layout of the Page's Data, requiring the model to be loaded for it to appear */}
            {(compendiumObj != {}) && <div className="flex flex-col items-center justify-center mt-5"> 
                <h1>{compendiumObj?.name}</h1>
            </div>}

            {(showModal) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
                    <div className="bg-gray-900 p-6 rounded-xl w-96" >
                        <h1>Add Chapter</h1>
                    </div>
                </div>
            )}
        </div>
    );
}