import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faPlus, faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Welcome = () => {
    const { username, isManager, isAdmin } = useAuth();
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-IN', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    // // Mock data for demonstration
    // const activities = [
    //     { date: '2024-07-01', count: 3, details: ['Added new user', 'Updated notes'] },
    //     { date: '2024-07-02', count: 1, details: ['Updated notes'] },
    //     // Add more activities as needed
    // ];

    return (
        <section className="welcome bg-black text-white min-h-screen flex flex-col items-center py-10">
            <p className="text-lg text-teal-500 mb-4">{today}</p>
            <h1 className="text-4xl font-bold mb-6">Welcome, {username}!</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
                <Link
                    to="/dash/notes"
                    className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-between"
                >
                    <span className="font-semibold">View techNotes</span>
                    <FontAwesomeIcon icon={faClipboardList} className="text-2xl text-teal-500" />
                </Link>
                <Link
                    to="/dash/notes/new"
                    className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-between"
                >
                    <span className="font-semibold">Add New techNote</span>
                    <FontAwesomeIcon icon={faPlus} className="text-2xl text-teal-500" />
                </Link>
                {(isManager || isAdmin) && (
                    <Link
                        to="/dash/users"
                        className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-between"
                    >
                        <span className="font-semibold">View User Settings</span>
                        <FontAwesomeIcon icon={faUsers} className="text-2xl text-teal-500" />
                    </Link>
                )}
                {(isManager || isAdmin) && (
                    <Link
                        to="/dash/users/new"
                        className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-between"
                    >
                        <span className="font-semibold">Add New User</span>
                        <FontAwesomeIcon icon={faUserPlus} className="text-2xl text-teal-500" />
                    </Link>
                )}
            </div>
            <div className='my-12 text-s text-gray-400'>
                Stats centre coming soon
            </div>
            {/* Calendar heatmap */}
            {/* <div className="mt-8 max-w-4xl">
                <CalendarHeatmap
                    startDate={new Date('2024-07-01')}
                    endDate={new Date('2024-07-31')}
                    values={activities.map(({ date, count }) => ({ date: new Date(date), count }))}
                    showWeekdayLabels={true}
                    classForValue={(value) => {
                        if (!value || !value.date) {
                            return 'color-empty';
                        }
                        const activity = activities.find((a) => a.date === value.date.toISOString().slice(0, 10));
                        return activity ? `color-github-${activity.count}` : 'color-empty';
                    }}
                    tooltipDataAttrs={(value) => {
                        return {
                            'data-tip': 'Test tooltip',
                        };
                    }}
                />
            </div> */}
        </section>
    );
};

export default Welcome;
