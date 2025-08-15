import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { frontStore } from "../stores/react_store";

import StandardButton1 from '../components/StdButon1';
import TitleLabel from "../components/TitleLabel";

// Compendium Creation Page function used to display the top level structure of the compendium object with key functionality served to the user
export default function CompendiumView () {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const compendiumObj = frontStore((state) => state.currentCompendiumIndex);
    const setCompendiumIndex = frontStore((state) => state.setCompendiumIndex);
    const loadCompendiumIndex = frontStore((state) => state.loadCompendiumIndex);

    const navigate = useNavigate();

    // Loads compendium upon component rendering
    useEffect(() => {
        loadCompendiumIndex();
        setDataLoaded(true);
    }, [loadCompendiumIndex]);

    // Runs back to the front page if something loads wrong
    useEffect(() => {
        if (dataLoaded && (!compendiumObj || Object.keys(compendiumObj).length === 0)) {
            navigate("/");
        }
    }, [dataLoaded, compendiumObj, navigate]);

    // Function used to call saving functionality
    const handleSave = async () => {
        const saved = await window.electronAPI.saveProject();
        if (saved.success){
            console.log("Successfully Saved Compendium");
        }
    }


    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white m-0 p-0">
            <div className="w-full bg-gray-800 text-white px-4 py-2 shadow-md flex items-center justify-between" >
                <div className="">
                    <StandardButton1 onClick={handleSave} disabled={!dataLoaded} className="h-full" >Save</StandardButton1>
                </div>
                <div className="">
                    <TitleLabel name={compendiumObj?.projectMeta?.title} onClick={() => navigate("/comp-view")} />
                </div>
                <div className="">
                    <StandardButton1 onClick={() => navigate("/")} className="h-full" >Back</StandardButton1>
                </div>
            </div>

            {/* Used to output a message if there's a loading error */}
            {(Object.keys(compendiumObj).length === 0) && <div>
                <h1>Error: No Compendium Loaded</h1>
                <p>Current Data Object Below:</p>
                <pre>{JSON.stringify(compendiumObj, null, 2)}</pre>
            </div>}
            
            {/* The Core Layout of the Page's Data, requiring the model to be loaded for it to appear */}
            {(Object.keys(compendiumObj).length > 0 ) && <div className="flex flex-col items-center justify-center mt-5"> 
                <h1>{compendiumObj?.projectMeta?.title}</h1>

                <pre>{JSON.stringify(compendiumObj, null, 2)}</pre>
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