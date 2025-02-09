import React from 'react'
import { useSelector } from 'react-redux';
import {selectAllUsers} from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm';

const NewNote = () => {
  const users = useSelector(selectAllUsers)

  const content = users ? <NewNoteForm users={users}/> : <p>need to add users to unlock this</p>

  return content

}

export default NewNote