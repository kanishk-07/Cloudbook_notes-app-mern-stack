import NoteContext from "./noteContext";
import { useState } from 'react';

const NoteState = (props)=> {
    const notesInitial = [
        {
            "title": "hello",
            "description": "world",
            "tag": "greeting"
        },
        {
            "title": "hello111",
            "description": "world111",
            "tag": "greeting111"
        }
    ];
    const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;