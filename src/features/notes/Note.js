import React from 'react';
import { useSelector } from 'react-redux';
import { selectNotesById } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCircleCheck, faCircle } from '@fortawesome/free-solid-svg-icons';

const Note = ({ noteId }) => {
  const note = useSelector(state => selectNotesById(state, noteId));
  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'long' });
    const updated = new Date(note.updatedAt).toLocaleString('en-IN', { day: 'numeric', month: 'long' });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="hover:bg-gray-700">
        <td className="px-6 py-4 text-sm text-gray-300">
          {note.completed
            ? <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
            : <FontAwesomeIcon icon={faCircle} className="text-red-500" />
          }
        </td>
        <td className="px-6 py-4 text-sm text-gray-300">{created}</td>
        <td className="px-6 py-4 text-sm text-gray-300">{updated}</td>
        <td className="px-6 py-4 text-sm text-gray-300">{note.title}</td>
        <td className="px-6 py-4 text-sm text-gray-300">{note.username}</td>
        <td className="px-6 py-4 text-sm text-gray-300 cursor-pointer">
          <FontAwesomeIcon
            icon={faEdit}
            className="text-blue-400 hover:text-blue-500"
            onClick={handleEdit}
          />
        </td>
      </tr>
    );
  } else return null;
}

export default Note;
