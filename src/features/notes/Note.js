import {useSelector} from 'react-redux'
import { selectNotesById } from './notesApiSlice'
import {useNavigate} from 'react-router-dom'

const Note= ({noteId}) => {
    const note = useSelector(state => selectNotesById(state , noteId))
    // const navigate = useNavigate()
    
    if(note){
        const navigate = useNavigate()
        
        // console.log(note)

        const created = new Date(note.createdAt).toLocaleString('en-IN' , {day : 'numeric' , month : 'long'})

        const updated = new Date(note.updatedAt).toLocaleString('en-IN' , {day : 'numeric' , month : 'long'})

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)
        
        return (
            <tr>
                <td>
                    {
                        note.completed ? <span>completed</span> : <span>open</span>
                    }
                </td>
                <td>
                    {created}
                </td>
                <td>
                    {updated}
                </td>
                <td>
                    {note.title}
                </td>
                <td>
                    {note.username}
                 </td>
                 <td onClick={handleEdit}>
                    click to edit
                 </td>
            </tr>
        )
    }
    else return null
}

export default Note