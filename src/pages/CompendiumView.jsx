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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white m-0 p-0 border border-red-500">
            <div className="flex flex-row items-center justify-evenly h-1/10 w-screen" >
                <StandardButton1 onClick={() => navigate("/")} >Back</StandardButton1>
                <StandardButton1 disabled={!dataLoaded} >Add Content</StandardButton1>
                <StandardButton1 disabled={!dataLoaded} >Edit Content</StandardButton1>
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