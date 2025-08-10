import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    HashRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';
import DoesNotExist from './pages/PageNotFound.jsx';
import CompendiumView from './pages/CompendiumView.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className="h-screen w-screen flex flex-col bg-black text-white m-0 p-0">
            <Router>
                <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/comp-view" element={<CompendiumView />} />
                <Route path="*" element={<DoesNotExist />} />
                </Routes>
            </Router>
        </div>
    </React.StrictMode>,
);