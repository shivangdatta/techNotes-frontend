import React from 'react';
import { useGetUsersQuery } from './usersApiSlice';
import User from './User';
import Spinner from '../../components/Spinner';

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    // Loading state
    if (isLoading) content = <Spinner/>

    // Error state
    if (isError) {
        content = <p className="text-center text-red-400">{error?.data?.message || "An error occurred"}</p>;
    }

    // Success state
    if (isSuccess) {
        const { ids } = users;
        const tableContent = ids.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : <tr><td className="text-center text-gray-500 p-4" colSpan="3">No users found.</td></tr>;

        content = (
            <div className="overflow-x-auto">
                {/* Description above the table */}
                <div className='border border-gray-400 p-4 my-5 rounded-lg bg-gray-800'>
                    <p className='text-xl text-white'>
                        Here you will find a list of users and their roles within the system. 
                        Only administrators and managers can edit user roles and details.
                    </p>
                </div>
                {/* Table */}
                <table className="min-w-full bg-gray-800 border border-gray-700 text-gray-300">
                    <thead className="bg-black">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Roles</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="bg-black divide-y divide-gray-700">
                        {tableContent}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="p-4 bg-black min-h-screen">
            {content}
        </div>
    );
};

export default UsersList;
