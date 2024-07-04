import React, { useEffect, useState } from 'react'
import { useAddNewNoteMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isSuccess, isError, isLoading, error }] = useAddNewNoteMutation()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [userId, setUserId] = useState(users[0]?.id || '')
  // console.log(users)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      setUserId(users[0]?.id || '')
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate, users])

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onUserIdChanged = e => setUserId(e.target.value)

  const onSaveNoteClicked = async e => {
    e.preventDefault()
    if (canSave) {
      await addNewNote({ user_id: userId, title, text , completed : false  })
    }
  }

  const options = users.map(user => (
    <option
      key={user.id}
      value={user.id}
    >
      {user.username}
    </option>
  ))

  const errContent = error?.data?.message ?? ''

  const content = (
    <>
      <p className="">{errContent}</p>

      <form className="" onSubmit={onSaveNoteClicked}>
        <div className="">
          <h2>New Note</h2>
          <div className="">
            <button
              className=""
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="" htmlFor="title">
          Title:
        </label>
        <input
          className=""
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="" htmlFor="text">
          Text:
        </label>
        <textarea
          className=""
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        <label className="" htmlFor="username">
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className=""
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  )

  return content
}

export default NewNoteForm
