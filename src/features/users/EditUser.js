import React from 'react'
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {selectUserById} from './usersApiSlice'
import EditUserForm from './EditUserForm'
import Spinner from '../../components/Spinner'

const EditUser = () => {
  const {id} = useParams()

  const user = useSelector(state => selectUserById(state , id))

  const content = user ? <EditUserForm user={user}></EditUserForm> : <Spinner/>
  return content
}

export default EditUser