import React from 'react';
import { useState, useEffect } from 'react';

import { frontStore } from '../stores/react_store';

import { generateID } from '../utils/utility_functions';

export default function TestComp() {
    const [compendiumName, setCompendiumName] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [sectionName, setSectionName] = useState('');
    // const [subSectionName, setSubSectionName] = useState('');

    const [selectedChapterID, setSelectedChapterID] = useState('');

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
            body: [],
            chapters: {},
            sections: {},
            subsections: {},
            entries: {},
            figures: {},
        };

        setCompendium(newCompendium);
        setCompendiumName('');
    };

    const handleChapterAdd = (e) => {
        e.preventDefault();

        const newChapter = {
            id: generateID(),
            name: chapterName,
            body: [],
        };

        compendiumObj.body.push(newChapter.id);
        compendiumObj.chapters[newChapter.id] = newChapter;

        setCompendium(compendiumObj)
        setChapterName('');
    }

    const handleSectionAdd = (e) => {
        e.preventDefault();

        if (!selectedChapterID) return;

        const newSection = {
        id: generateID(),
        name: sectionName,
        body: [],
        };

        // Attach section to chapter
        compendiumObj.chapters[selectedChapterID].body.push(newSection.id);
        compendiumObj.sections[newSection.id] = newSection;

        setCompendium({ ...compendiumObj }); // clone to trigger reactivity
        setSectionName('');
    };

    const chapterOptions = compendiumObj?.chapters
        ? Object.entries(compendiumObj.chapters).map(([id, chapter]) => ({
            id,
            name: chapter.name,
        }))
        : [];

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

            <h2>Add New Chapter To Compendium Object</h2>

            <form onSubmit={handleChapterAdd}>
                <label htmlFor='chapterName'>Add Chapter</label>
                <input
                    type="text"
                    id="chapterName"
                    value={chapterName}
                    onChange={(e) => setChapterName(e.target.value)}
                />
                <button type="submit" >Add</button>
            </form>

            <h2>Add New Section To Chapter Object</h2>

            <form onSubmit={handleSectionAdd}>
                <label htmlFor="chapterSelect">Choose Chapter:</label>
                <select
                    id="chapterSelect"
                    value={selectedChapterID}
                    onChange={(e) => setSelectedChapterID(e.target.value)}
                    required
                >
                    <option value="">-- Select a Chapter --</option>
                    {chapterOptions.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>
                        {chapter.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="sectionName">Section Name:</label>
                <input
                    type="text"
                    id="sectionName"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                />
                <button type="submit">Add Section</button>
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