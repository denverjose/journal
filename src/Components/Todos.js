import React, {useState, useEffect} from 'react'
import Note from './Todo.js'



export default () => {
   const [notes, setNotes] = useState([...getNotesFromLocal()]);
   const [task, setTask] = useState('');
   const [date, setDate] = useState('');

   function getNotesFromLocal() {
       if(!!localStorage.getItem('notes')){
           return JSON.parse(localStorage.getItem('notes'))
       } else {
           return [];
       }
   }

   const handleTask = (e) => {
        setTask(e.target.value)
    };
    const handleDate = (e) => {
        setDate(e.target.value) 
    };

   const handleSubmit = (e, notes, setNotes, task, setTask, date, setDate) => {
    e.preventDefault();
    if (task !=="" && date ==""){
        alert('Invalid Date')
    }
    if (task =="" && date !==""){
        alert('Invalid Task')
    }
    if (task =="" && date ==""){
        alert('Invalid Task and Date')
    }
    if (task !== "" && date !== ''){
        const id = (notes.length) ? notes[notes.length - 1].id + 1 : 0;
            setNotes ([...notes, {id: Date.now(), message: task, date: date}])
            setTask('')
            setDate ('')
    }
    }
    const deleteNote = (id, notes, setNotes) => {
        setNotes (notes.filter(note => note.id != id))
    }

   useEffect  (() => {
       localStorage.setItem("notes", JSON.stringify(notes))},[notes]);

    return (
        <div className="Notes">
            <form id="notes" onSubmit ={(e) => handleSubmit(e, notes, setNotes, task, setTask, date, setDate)}>
                <h1>Task To Do </h1>
                <label for="task" name="task">TASK:</label>
                <input type="text" onChange={handleTask} value={task}/>
                <label for="date" name="date">Date:</label>
                <input type="date" onChange={handleDate} value={date}/>
                <input type="submit"/>
                </form>
        {notes.map(note => (
            <Note message={note.message} id={note.id} date={note.date} deleteNote={(id) => deleteNote(id, notes, setNotes)}/>
        ))}
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tasks</th>
                    <th>Date</th>
                    <th>X</th>
                </tr>
            </thead>
            <tbody>
                {
                    notes.map(note => (
                        <tr>
                            <td>{note.id}</td>
                            <td>{note.message}</td>
                            <td>{note.date}</td>
                            <td><button onClick={() => deleteNote()}>Delete</button></td>
                        </tr>
                        )
                    ) 
                }
            </tbody>
        </table>
        </div>

    )
}