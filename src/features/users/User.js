import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersApiSlice';

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId));
    const navigate = useNavigate();

    if (!user) return null;

    const handleEdit = () => navigate(`/dash/users/${userId}`);

    // Determine cell colors based on user roles
    let cellStatus = 'text-gray-300';
    if (user.roles.includes('admin')) {
        cellStatus = 'text-yellow-400'; // Example color for admin
    } else if (user.roles.includes('manager')) {
        cellStatus = 'text-green-400'; // Example color for manager
    } else {
        cellStatus = 'text-blue-400'; // Example color for employee
    }

    return (
        <tr className="hover:bg-gray-700">
            <td className={`px-6 py-4 text-sm ${cellStatus}`}>
                <FontAwesomeIcon icon={user.active ? faUser : faUserSlash} />
                <span className="px-6 py-4 text-sm text-gray-300"> 
                    {user.username}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-300">{user.roles.join(', ')}</td>
            <td className="px-6 py-4 text-sm text-gray-300 cursor-pointer">
                <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-400 hover:text-blue-500"
                    onClick={handleEdit}
                />
            </td>
        </tr>
    );
};

export default User;
