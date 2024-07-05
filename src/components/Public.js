import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaTools, FaSignInAlt } from 'react-icons/fa';
import '../App.css'

const Public = () => {
  return (
    <div className="bg-grass-green min-h-screen text-white flex flex-col items-center justify-center px-4">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-5xl md:text-6xl font-pixel blocky-text mb-4 animate-bounce">
          techNotes
        </h1>
        <p className="text-lg md:text-xl font-mono blocky-text">
          Transform your notes into a new dimension.
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl space-y-12 text-center">
        <section className="bg-dirt-brown bg-opacity-80 rounded-lg p-6 shadow-lg blocky-border">
          <h2 className="text-2xl font-bold text-bright-yellow mb-4 blocky-text">
            Key Features
          </h2>
          <ul className="space-y-2 text-left">
            <li className="flex items-center space-x-2">
              <FaTools className="text-bright-yellow" />
              <span>Upgrade from sticky notes to digital notes.</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaUserShield className="text-bright-yellow" />
              <span>Secure login and role-based access.</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaSignInAlt className="text-bright-yellow" />
              <span>Employee login for easy access.</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaTools className="text-bright-yellow" />
              <span>Create and manage notes effortlessly.</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaTools className="text-bright-yellow" />
              <span>Track note status and updates.</span>
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-bright-yellow blocky-text">
            Login Credentials
          </h2>
          <div className="text-lg">
            <p className="mb-2"><span className="font-semibold text-bright-yellow">Admin/Manager:</span> <span className="text-gray-300">signed_up / password</span></p>
            <p><span className="font-semibold text-bright-yellow">Employee:</span> <span className="text-gray-300">user / user</span></p>
          </div>
        </section>

        <div>
          <Link to="/login" className="blocky-btn px-6 py-3 rounded shadow-lg">
            Go to Login
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-300">
        <p>© 2024 techNotes. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Public;
