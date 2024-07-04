import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { notesApiSlice } from './../notes/notesApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { store } from './../../app/store';

const PreFetch = () => {
  useEffect( () => {
    console.log('subscribed to db this prevents redux from refreshing as long as the subscription is active')
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
      console.log('ending connection because page being visited is not protocted and doesnt retrieve any data')
      notes.unsubscribe()
      users.unsubscribe()
    }
  } , [])
    
    return <Outlet/>
  }

export default PreFetch