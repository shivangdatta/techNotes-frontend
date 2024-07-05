import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faNoteSticky,
    faUserCircle,
    faUserPlus,
    faSignOutAlt,
    faUserGroup,
    faPlusSquare
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [sendLogout, { isLoading, isSuccess, isError, error }] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    const onNewNoteClicked = () => navigate('/dash/notes/new');
    const onNewUserClicked = () => navigate('/dash/users/new');
    const onNotesClicked = () => navigate('/dash/notes');
    const onUsersClicked = () => navigate('/dash/users');

    let dashClass = null;
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small";
    }

    let newNoteButton = null;
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="icon-button"
                title="New Note"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faPlusSquare} />
            </button>
        );
    }

    let newUserButton = null;
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        );
    }

    let userButton = null;
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGroup} />
                </button>
            );
        }
    }

    let notesButton = null;
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className="icon-button"
                title="Notes"
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faNoteSticky} />
            </button>
        );
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
    );

    const errClass = isError ? "text-red-500" : "hidden";

    let buttonContent;
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>;
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </>
        );
    }

    return (
        <>
            <p className={`${errClass} text-center my-2`}>{error?.data?.message}</p>
            <header className="dash-header bg-black text-white py-4 shadow-lg">
                <div className={`dash-header__container ${dashClass} mx-auto flex justify-between items-center px-4 max-w-7xl`}>
                    <Link to="/dash" className="text-2xl font-bold text-teal-500 hover:text-teal-400">
                        techNotes
                    </Link>
                    <nav className="flex space-x-4">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    );
};

export default DashHeader;
