import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="p-4">
      <nav className="mb-4">
        <Link className="mr-4 text-blue-500" to="/">Home</Link>
        <Link className="mr-4 text-blue-500" to="/about">About</Link>
        <Link className="mr-4 text-blue-500" to="/testcomp">TestComp</Link>
      </nav>
      <Outlet />
    </div>
  );
}
