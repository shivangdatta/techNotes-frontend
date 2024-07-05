import React, { useEffect, useState } from 'react';
import { useAddNewuserMutation } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../config/roles';

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
    const [addNewuser, { isLoading, isSuccess, isError, error }] = useAddNewuserMutation();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(['Employee']);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isSuccess) {
            setUsername('');
            setPassword('');
            setRoles(['Employee']);
            navigate('/dash/users');
        }
    }, [isSuccess, navigate]);

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

    const onSaveUserClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewuser({ username, password, roles });
        }
    };

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);
    const onRolesChanged = (e) => {
        const values = Array.from(e.target.selectedOptions, (option) => option.value);
        setRoles(values);
    };

    const validUserClass = validUsername ? 'border-gray-500' : 'border-red-500';
    const validPwdClass = validPassword ? 'border-gray-500' : 'border-red-500';
    const validRolesClass = roles.length ? 'border-gray-500' : 'border-red-500';

    const options = Object.values(ROLES).map((role) => (
        <option key={role} value={role}>
            {role}
        </option>
    ));

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md">
                {isError && <p className="text-red-500 text-sm mb-4">{error?.data?.message}</p>}
                <form onSubmit={onSaveUserClicked} className="bg-gray-900 text-white p-6 rounded shadow-lg">
                    <h2 className="text-xl font-bold mb-6">New User</h2>

                    <label className="block mb-2">
                        Username: <span className="nowrap">[3-20 letters]</span>
                    </label>
                    <input
                        className={`w-full p-2 mb-2 rounded bg-black text-white ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={onUsernameChanged}
                    />
                    {!validUsername && (
                        <p className="text-red-500 text-xs mb-4">Username must be 3-20 letters.</p>
                    )}

                    <label className="block mb-2">
                        Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
                    </label>
                    <input
                        className={`w-full p-2 mb-2 rounded bg-black text-white ${validPwdClass}`}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />
                    {!validPassword && (
                        <p className="text-red-500 text-xs mb-4">
                            Password must be 4-12 characters including special characters.
                        </p>
                    )}

                    <label className="block mb-2">Assigned Roles:</label>
                    <select
                        id="roles"
                        name="roles"
                        className={`w-full p-2 mb-4 rounded bg-black text-white ${validRolesClass}`}
                        multiple={true}
                        size="3"
                        value={roles}
                        onChange={onRolesChanged}
                    >
                        {options}
                    </select>
                    {!roles.length && (
                        <p className="text-red-500 text-xs mb-4">At least one role must be selected.</p>
                    )}

                    <button
                        className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        title="Save"
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewUserForm;
