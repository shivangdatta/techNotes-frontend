import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

const EditNoteForm = ({ note, users }) => {
    const [updateNote, { isLoading, isSuccess, isError, error }] = useUpdateNoteMutation();
    const [deleteNote, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteNoteMutation();
    const navigate = useNavigate();

    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);
    const [completed, setCompleted] = useState(note.completed);
    const [userId, setUserId] = useState(note.user_id);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('');
            setText('');
            setUserId('');
            navigate('/dash/notes');
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const onTitleChanged = e => setTitle(e.target.value);
    const onTextChanged = e => setText(e.target.value);
    const onCompletedChanged = () => setCompleted(prev => !prev);
    const onUserIdChanged = e => setUserId(e.target.value);

    const canSave = [title, text, userId].every(Boolean) && !isLoading;

    const onSaveNoteClicked = async () => {
        if (canSave) {
            await updateNote({ id: note.id, user_id: userId, title, text, completed });
        }
    };

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id });
    };

    const created = new Date(note.createdAt).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    const updated = new Date(note.updatedAt).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    const options = users.map(user => (
        <option key={user.id} value={user.id}>{user.username}</option>
    ));

    const errClass = (isError || isDelError) ? "text-red-500" : "hidden";
    const validTitleClass = !title ? "border-red-500" : 'border-gray-500';
    const validTextClass = !text ? "border-red-500" : 'border-gray-500';

    const errContent = (error?.data?.message || delError?.data?.message) ?? '';

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md">
                <p className={`${errClass} text-center my-2`}>{errContent}</p>

                <form className="form bg-gray-900 text-white p-6 rounded shadow-lg" onSubmit={e => e.preventDefault()}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Edit Note #{note.ticket}</h2>
                        <div className="flex space-x-2">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                                title="Save"
                                onClick={onSaveNoteClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                                title="Delete"
                                onClick={onDeleteNoteClicked}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>

                    <label className="block text-sm font-semibold mb-2" htmlFor="note-title">Title:</label>
                    <input
                        className={`w-full p-2 mb-4 rounded bg-black text-white border ${validTitleClass}`}
                        id="note-title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={title}
                        onChange={onTitleChanged}
                        style={{ maxWidth: '300px' }}
                    />

                    <label className="block text-sm font-semibold mb-2" htmlFor="note-text">Text:</label>
                    <textarea
                        className={`w-full p-2 mb-4 h-32 rounded bg-black text-white border ${validTextClass}`}
                        id="note-text"
                        name="text"
                        value={text}
                        onChange={onTextChanged}
                        style={{ minHeight: '150px' }}
                    />

                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2" htmlFor="note-completed">
                                Work Complete:
                                <input
                                    className="ml-2"
                                    id="note-completed"
                                    name="completed"
                                    type="checkbox"
                                    checked={completed}
                                    onChange={onCompletedChanged}
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2" htmlFor="note-username">Assigned To:</label>
                            <select
                                id="note-username"
                                name="username"
                                className="w-full p-2 rounded bg-black text-white border border-gray-500"
                                value={userId}
                                onChange={onUserIdChanged}
                            >
                                {options}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm">Created:<br />{created}</p>
                        </div>
                        <div>
                            <p className="text-sm">Updated:<br />{updated}</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNoteForm;
