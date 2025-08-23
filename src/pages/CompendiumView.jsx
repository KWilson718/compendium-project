import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { frontStore } from "../stores/react_store";

import StandardButton1 from '../components/StdButon1';
import TitleLabel from "../components/TitleLabel";
import DataElementCard from "../components/DataElementCard";
import DataElementRow from "../components/DataElementRow";

// Compendium Creation Page function used to display the top level structure of the compendium object with key functionality served to the user
export default function CompendiumView () {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [chapterName, setChapterName] = useState('');

    const compendiumObj = frontStore((state) => state.currentCompendiumIndex);
    const compendiumChapters = frontStore((state) => state.currentCompendiumChapters);
    const loadCompendiumIndex = frontStore((state) => state.loadCompendiumIndex);
    const loadCompendiumChapters = frontStore((state) => state.loadCompendiumChapters);
    const loadCompendiumPath = frontStore((state) => state.loadCompendiumPath);

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


    // USED FOR DEBUGGING THE CHAPTER COMPONENT
    useEffect(() => {
        console.log("React compendiumChapters changed -->", compendiumChapters);
    }, [compendiumChapters]);

    // Function used to call saving functionality
    const handleSave = async () => {
        const saved = await window.electronAPI.saveProject();
        if (saved.success){
            console.log("Successfully Saved Compendium");
        }
    }

    const handleChapterCreate = async () => {
        console.log("Creating Chapter with name: ", chapterName);

        const result = await window.electronAPI.createChapter(chapterName);

        console.log(result);

        if (result.success) {
            loadCompendiumIndex();
            loadCompendiumChapters();
            loadCompendiumPath();
        }
        
        setShowModal(false);
        setChapterName('');
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

                {(compendiumObj?.chapters.length > 0) && (
                    <DataElementRow dataObject={compendiumChapters} dataIndexArray={compendiumObj?.chapters} />
                )}

                <StandardButton1 onClick={() => setShowModal(true)} >Add Chapter</StandardButton1>

                <pre>{JSON.stringify(compendiumObj, null, 2)}</pre>
                <h1>{JSON.stringify(compendiumChapters)}</h1>
            </div>}

            {(showModal) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
                    <div className="bg-gray-900 p-6 rounded-xl w-96" >
                        <h1>Add Chapter</h1>
                        <input 
                            type="text"
                            value={chapterName}
                            onChange={(e) => setChapterName(e.target.value)}
                            className="w-full border px-2 py-1 mb-4"
                            placeholder="Enter Chapter Name..."
                        />
                        <div className="flex justify-end gap-2">
                            <StandardButton1
                                onClick={() => {setShowModal(false); setChapterName('');}}
                            >
                                Cancel
                            </StandardButton1>
                            <StandardButton1
                                onClick={handleChapterCreate}
                                disabled={!chapterName.trim()}
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