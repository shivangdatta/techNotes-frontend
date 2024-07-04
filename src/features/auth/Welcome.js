import React from 'react'
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div>
        Welcome
        date here
        <Link to='notes'>view tech notes</Link>
        <Link to='users'>view user settings</Link>
        <Link to='notes/new'>Add new notes </Link>
        <Link to="users/new">Add new users</Link>
    </div>
  )
}

export default Welcome