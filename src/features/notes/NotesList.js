import React from 'react';
import { useGetNotesQuery } from './notesApiSlice';
import Note from './Note';
import useAuth from './../../hooks/useAuth';

const NotesList = () => {
  const { username, isManager, isAdmin } = useAuth();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content;
  if (isLoading) content = <p className="text-center text-gray-400">Loading...</p>;

  if (isError) {
    content = <p className="text-center text-red-400">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(noteId => entities[noteId].username === username);
    }

    let tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />);

    content = (
      <div className="overflow-x-auto">
        <div className=' border-gray-400 border p-4 my-5 rounded-lg '>
          <p className='text-xl text-white'> Here you will find a list of notes based on your permission level . 
            Managers and admins can view all notes but employees will only be able to read notes assigned to them
          </p>
        </div>
        <table className="min-w-full bg-gray-800 border border-gray-700 text-gray-300">
          <thead className="bg-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Updated</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Username</th>
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
}

export default NotesList;
