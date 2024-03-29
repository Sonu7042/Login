import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'

const AddNote = () => {
  const context = useContext(noteContext)
  const { addNote } = context


  const [note, setNote] = useState({ title: "", description: "" })





  const AddData = (e) => {
    e.preventDefault()
    addNote(note.title, note.description)
    

  }


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }

  return (
    <div className='my-2'>
      <form onSubmit={AddData}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
        </div>
        <button type='submit' className='btn btn-primary'>add</button>

      </form>

    </div>
  )
}

export default AddNote