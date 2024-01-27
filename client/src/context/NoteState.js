import {  useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {

    const host='http://localhost:9000'
    
    let notesInitial=[]

    const [notes, setNotes] = useState(notesInitial)

    
  

    // Get all Notes
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/getnote`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json() 
      notesInitial=Object.values(json)
      
    }

    

    



    
    const addNote= async(title, description) =>{
        const response= await fetch (`${host}/addnote`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({title, description})
        })
        const json= await response.json()
        console.log(json)
    }






    return (
        <noteContext.Provider value={{ notes, setNotes, getNotes, addNote }}>
            {props.children}

        </noteContext.Provider>

    )

}

export default NoteState