import React, { useState } from 'react';
import '../style/notes.css'


function ListNotes({note}) {


  return (
    <div className='list'>
        <ul>
            {
                <li>{note.content}</li>
            }
            
        </ul>
        <hr/>
    </div>
  )
}

export default ListNotes;
