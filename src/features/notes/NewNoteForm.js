import React, { useEffect, useState } from 'react';
import { useAddNewNoteMutation } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const NewNoteForm = ({ users }) => {
    const [addNewNote, { isSuccess, isError, isLoading, error }] = useAddNewNoteMutation();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userId, setUserId] = useState(users[0]?.id || '');

    useEffect(() => {
        if (isSuccess) {
            setTitle('');
            setText('');
            setUserId(users[0]?.id || '');
            navigate('/dash/notes');
        }
    }, [isSuccess, navigate, users]);

    const canSave = [title, text, userId].every(Boolean) && !isLoading;

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onTextChanged = (e) => setText(e.target.value);
    const onUserIdChanged = (e) => setUserId(e.target.value);

    const onSaveNoteClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewNote({ user_id: userId, title, text, completed: false });
        }
    };

    const options = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.username}
        </option>
    ));

    const errContent = error?.data?.message ?? '';

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md">
                <p className="text-red-500 mb-4">{errContent}</p>

                <form onSubmit={onSaveNoteClicked} className="bg-gray-900 text-white p-6 rounded shadow-lg">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold">New Note</h2>
                        <div className="mt-2">
                            <button
                                className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded ${
                                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                title="Save"
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                        </div>
                    </div>

                    <label className="block mb-2" htmlFor="title">
                        Title:
                    </label>
                    <input
                        className="w-full p-2 mb-4 rounded bg-black text-white border border-gray-500"
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={title}
                        onChange={onTitleChanged}
                    />

                    <label className="block mb-2" htmlFor="text">
                        Text:
                    </label>
                    <textarea
                        className="w-full p-2 mb-4 rounded bg-black text-white border border-gray-500"
                        id="text"
                        name="text"
                        value={text}
                        onChange={onTextChanged}
                    />

                    <label className="block mb-2" htmlFor="username">
                        Assigned To:
                    </label>
                    <select
                        id="username"
                        name="username"
                        className="w-full p-2 mb-4 rounded bg-black text-white border border-gray-500"
                        value={userId}
                        onChange={onUserIdChanged}
                    >
                        {options}
                    </select>
                </form>
            </div>
        </div>
    );
};

export default NewNoteForm;
