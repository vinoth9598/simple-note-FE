
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import "../style/notes.css";
import ListNotes from './ListNotes';

function LoggedInPage({user,setUser,token,setToken,isRegistered,setIsRegistered}) {

  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);


  const fetchNotes = async () =>{
    const config = {
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }

    console.log("fetching notes....");

    try{
      const response = await axios.get('http://localhost:3001/notes',config);

      console.log("Notes fetched successfully..");
      console.log(response.data);
      setNotes(response.data);

    }catch(e){
      console.log("Error fetching notes ",e);
    }
  }

  useEffect(()=>{
    fetchNotes();
  },[])


  const addNote = async(e)=>{
    e.preventDefault();

    const config = {
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }

    const newNoteObject = {
      content:newNote
    }

    try{
      const response = await axios.post('http://localhost:3001/notes',newNoteObject,config);

      console.log("note added successfully");
      console.log(response.data);
      setNewNote('');
      fetchNotes();

    }catch(e){
      console.log("Error adding note",e)
    }
  }

  const userLogout=()=>{
    setUser(null);
    setToken(null);

    window.localStorage.removeItem('user');
    window.LoggedInPage.removeItem('token');

    setIsRegistered(true);
  }


  return (
    <div className='content bg-info bg-gradient bg-opacity-50'>
        <div>
            <p className='fw-bold text-danger fs-2'>Welcome , <b>{user.name}</b></p>
            <form onSubmit={addNote}>
                <textarea 
                  className='note'
                  placeholder='enter your note'
                  type="text"
                  rows='1'
                  cols='50'
                  value={newNote}
                  onChange={(e)=> setNewNote(e.target.value)}
                  required
                
                /><br></br>
                <button className='bn bg-info fs-5 ' type="submit">save note</button>
            </form>
        </div>
        <div className='notes-items '>
            
                {
                  notes.map(note => <ListNotes key={note._id} 
                    note ={note}
                    
                  />)
                }
            
        </div>
        <div>
            <button className="bnl bg-danger fs-5"onClick={userLogout}>Logout</button>
        </div>
      
    </div>
  )
}

export default LoggedInPage;
