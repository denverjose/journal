import React, {useState, useEffect} from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './table.css';


export default () => {
   const [notes, setNotes] = useState([...getNotesFromLocal()]);
   const [task, setTask] = useState('');
   const [date, setDate] = useState('');

   function getNotesFromLocal() {
       if(!!localStorage.getItem('thoughts')){
           return JSON.parse(localStorage.getItem('thoughts'))
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
    const deleteNote = (id) => {
        setNotes (notes.filter(note => note.id != id))
    }

   useEffect  (() => {
       localStorage.setItem("thoughts", JSON.stringify(notes))},[notes]);

    return (
        <div className="Notes">
            <form id="notes" onSubmit ={(e) => handleSubmit(e, notes, setNotes, task, setTask, date, setDate)}>
                <fieldset style={{width:'fit-content'}}>
                    <legend>MY THOUGHTS</legend>
                <label for="task" name="task">Thought: </label>
                <input class='task' type="text" onChange={handleTask} value={task}/><br/>
                <label for="date" name="date">Date: </label>
                <input class='date' type="date" onChange={handleDate} value={date}/><br/>
                <input class='submit' type="submit"/>
                </fieldset>
            </form>
            
        <table style={{border:'1px solid black'}}>
            <thead>
                <tr>
                    <th style={{border:'1px solid black', padding: '.5rem 1rem'}}>ID</th>
                    <th style={{border:'1px solid black', padding: '.5rem 1rem'}}>Thoughts</th>
                    <th style={{border:'1px solid black', padding: '.5rem 1rem'}}>Date</th>
                    <th style={{border:'1px solid black', padding: '.5rem 1rem'}}></th>
                </tr>
            </thead>
            <tbody>
                {
                    notes.map(note => (
                        <tr>
                            <td style={{border:'1px solid black', padding: '.5rem 1rem'}}>{note.id}</td>
                            <td style={{border:'1px solid black', padding: '.5rem 1rem'}}>{note.message}</td>
                            <td style={{border:'1px solid black', padding: '.5rem 1rem'}}>{note.date}</td>
                            <td style={{border:'1px solid black', padding: '.5rem 1rem'}}><button style={{border:'12px solid black'}} onClick={() => deleteNote(note.id)} style={{cursor:'pointer'}}>
                            <DeleteOutlineIcon/></button></td>
                        </tr>
                        )
                    ) 
                }
            </tbody>
        </table>
        </div>
    )
}