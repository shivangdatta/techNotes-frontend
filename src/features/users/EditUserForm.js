import React, { useState, useEffect } from 'react';
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../config/roles';

const EditUserForm = ({ user }) => {
    const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
    const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteUserMutation();
    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(user.roles);
    const [active, setActive] = useState(user.active);

    useEffect(() => {
        setValidUsername(/^[A-z]{3,20}$/.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(/^[A-z0-9!@#$%]{4,12}$/.test(password));
    }, [password]);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername('');
            setPassword('');
            setRoles([]);
            navigate('/dash/users');
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const onRolesChanged = (e) => {
        const values = Array.from(e.target.selectedOptions, (option) => option.value);
        setRoles(values);
    };

    const onActiveChanged = () => setActive((prev) => !prev);

    const onSaveUserClicked = async () => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active });
        } else {
            await updateUser({ id: user.id, username, roles, active });
        }
    };

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id });
    };

    const options = Object.values(ROLES).map((role) => (
        <option key={role} value={role}>
            {role}
        </option>
    ));

    const errClass = isError || isDelError ? 'text-red-500' : 'hidden';
    const validUserClass = !validUsername ? 'border-red-500' : 'border-gray-500';
    const validPwdClass = password && !validPassword ? 'border-red-500' : 'border-gray-500';
    const validRolesClass = !Boolean(roles.length) ? 'border-red-500' : 'border-gray-500';

    const errContent = (error?.data?.message || delError?.data?.message) ?? '';

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md">
                <p className={`${errClass} text-center my-2`}>{errContent}</p>

                <form className="bg-gray-900 text-white p-6 rounded shadow-lg" onSubmit={(e) => e.preventDefault()}>
                    <h2 className="text-xl font-bold mb-6">Edit User</h2>

                    <label className="block mb-2">
                        Username: <span className="nowrap">[3-20 letters]</span>
                    </label>
                    <input
                        className={`w-full p-2 mb-4 rounded bg-black text-white ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={onUsernameChanged}
                    />

                    <label className="block mb-2">
                        Password: <span className="nowrap">[empty = no change]</span>{' '}
                        <span className="nowrap">[4-12 chars incl. !@#$%]</span>
                    </label>
                    <input
                        className={`w-full p-2 mb-4 rounded bg-black text-white ${validPwdClass}`}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />

                    <label className="block mb-2">
                        Active:
                        <input
                            className="ml-2"
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            checked={active}
                            onChange={onActiveChanged}
                        />
                    </label>

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

                    <div className="flex justify-end">
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mr-2"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!validUsername || (password && !validPassword) || !roles.length || isLoading}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserForm;
