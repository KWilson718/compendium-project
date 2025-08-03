import { useEffect } from "react";

import { frontStore } from "../stores/react_store";

export default function CompendiumView () {
    const compendiumObj = frontStore((state) => state.currentCompendium);
    const setCompendium = frontStore((state) => state.setCompendium);
    const loadCompendium = frontStore((state) => state.loadCompendium);

    useEffect(() => {
        loadCompendium();
    }, [loadCompendium]);

    return (
        <div>
            <h1>Compendium Loaded</h1>
            <div>
                <h1>Current Compendium</h1>
                {compendiumObj && (
                    <pre>{JSON.stringify(compendiumObj, null, 2)}</pre>
                )}
            </div>
        </div>
    );
}