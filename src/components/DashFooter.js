import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const DashFooter = () => {
    const { username, status } = useAuth();

    return (
        <footer className="dash-footer bg-black text-white py-4 shadow-lg mt-auto">
            <div className="container mx-auto flex justify-between items-center px-4 max-w-7xl">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUser} className="text-teal-500" />
                    <span className="text-sm">{username}</span>
                </div>
                <div className="text-sm text-teal-500">
                    {status}
                </div>
                <div>
                    <Link to="/dash" className="text-teal-500 hover:text-teal-400 text-sm">
                        Go Home
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default DashFooter;
