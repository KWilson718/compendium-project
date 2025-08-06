import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { frontStore } from "../stores/react_store";

import StandardButton1 from '../components/StdButon1';

export default function CompendiumView () {
    const [dataLoaded, setDataLoaded] = useState(false);

    const compendiumObj = frontStore((state) => state.currentCompendium);
    const setCompendium = frontStore((state) => state.setCompendium);
    const loadCompendium = frontStore((state) => state.loadCompendium);

    const navigate = useNavigate();

    useEffect(() => {
        loadCompendium();
        setDataLoaded(true);
    }, [loadCompendium, dataLoaded]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white m-0 p-0">
            <div className="flex flex-row items-center justify-between h-1/10 w-screen bg-gray-700" >
                <div className="h-full">
                    <StandardButton1 disabled={!dataLoaded} className="h-full" >Save</StandardButton1>
                </div>
                <div className="h-full">
                    <StandardButton1 disabled={!dataLoaded} className="h-full" >Add Content</StandardButton1>
                    <StandardButton1 disabled={!dataLoaded} className="h-full" >Edit Content</StandardButton1>
                </div>
                <div className="h-full">
                    <StandardButton1 onClick={() => navigate("/")} className="h-auto" >Back</StandardButton1>
                </div>
            </div>

            {/* Used to output a message if there's a loading error */}
            {(compendiumObj == {}) && <div>
                <h1>Error: No Compendium Loaded</h1>
                <p>Current Data Object Below:</p>
                <pre>{JSON.stringify(compendiumObj, null, 2)}</pre>
            </div>}
            
            {/* The Core Layout of the Page's Data, requiring the model to be loaded for it to appear */}
            {(compendiumObj != {}) && <div className="flex flex-col items-center justify-center h-9/10"> 
                <h1>{compendiumObj?.name}</h1>
            </div>}

            
        </div>
    );
}