import React from 'react';
import { useState, useEffect } from 'react';

import { frontStore } from '../stores/react_store';

import { generateID } from '../utils/utility_functions';

export default function TestComp() {
    const [compendiumName, setCompendiumName] = useState('');

    const compendiumObj = frontStore((state) => state.currentCompendium);
    const setCompendium = frontStore((state) => state.setCompendium);
    const loadCompendium = frontStore((state) => state.loadCompendium);

    useEffect(() => {
        loadCompendium();
    }, [loadCompendium]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const newCompendium = {
        id: generateID(),
        name: compendiumName,
        };

        setCompendium(newCompendium);
        setCompendiumName('');
    };

    return (
        <div>
            <h1>Compendium Test Page</h1>

            <h2>Create Fresh Compendium Object</h2>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="compendiumName">Name:</label>
                <input
                    type="text"
                    id="compendiumName"
                    value={compendiumName}
                    onChange={(e) => setCompendiumName(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>

            {compendiumObj && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>Created Object:</h3>
                    <pre>{JSON.stringify(compendiumObj, null, 2)}</pre>
                </div>
            )}
        </div> 
    );
}