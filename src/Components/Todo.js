import React from 'react'

export default ({message, id, date, deleteNote,}) => (

    <div className="Note">
        <a>
            Id:{id}<br/>
            Task: {message}<br/>
            Date: {date}<br/>
        <button onClick={() => deleteNote(id)}>Delete</button></a>
    </div>
)