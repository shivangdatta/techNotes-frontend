import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectNotesById } from './notesApiSlice';
import { selectAllUsers } from '../users/usersApiSlice';
import EditNoteForm from './EditNoteForm';

const EditNote = () => {
  const {id} = useParams()

  const note = useSelector(state => selectNotesById(state , id))
  const users = useSelector(selectAllUsers)

  const content = note && users ? <EditNoteForm note={note} users={users}/> : null
  
  return content
}

export default EditNote