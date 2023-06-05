import React from 'react'
import DisplayNote from './DisplayNote'
// import Form from './Form'
import { useState } from 'react'
import { useEffect } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase-config'

const Note = () => {
    const [notes, setNotes] = useState([])
    const [addNote, setAddNote] = useState({title:"", content:""})
    const [id, setId] = useState("")

    const noteRef = collection(db, "note")
    // const createNote = (note) =>{
    //     console.log(note);
    //     setNotes((prevNotes)=>{
    //         return [...prevNotes, note]
    //     })
    // }
    // const deleteNote=(id) =>{
    //     console.log(id);
    //     setNotes((prevNotes)=>{
    //         return prevNotes.filter((item, index)=>{
    //             return index !== id;
    //         })
    //     })
    // }
    useEffect(()=>{
        const getNotes = async() =>{
            const data = await getDocs(noteRef);
            // console.log(data)
            setNotes(data.docs.map((docs)=>({...docs.data(), id: docs.id})))
        }
        getNotes()
    }, [noteRef])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddNote({...addNote, [name]: value})
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        // console.log(addNote);
        // props.onCreate(note);
        // setNote({title:"", content:""})
        await addDoc(noteRef, addNote)
    }
    const deleteNote = async(id) => {
        // console.log(id)
        const deletenote = doc(noteRef, id)
        await deleteDoc(deletenote)
    }
    const updateNote = async (note) =>{
        // console.log(note);
        setAddNote({title: note.title, content: note.content})
        setId(note.id)

    }
    const updatedNote = async(id) =>{
        console.log(id)
    }


    return (
        <div className="container">
            {/* <Form onCreate={createNote}/> */}
            <form method='post' onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={handleChange} value={addNote.title}/>
                <textarea name="content" placeholder="What's on your mind?" onChange={handleChange} value={addNote.content} rows="4"></textarea>
                <div style={{"display": "flex"}}>
                    <button type='submit'>Pin!</button>
                    {/* <button type='button' style={{marginLeft: "10px"}} onclick={()=>updatedNote(id)}>update</button> */}
                </div>
            </form>
            <div className='note-container'>
                {notes && notes.map((note)=>(
                    // <DisplayNote title={note.title} content={note.content} id={index} getId={deleteNote}/>
                    <DisplayNote title={note.title} content={note.content} id={note.id} getId={deleteNote} getUpdateNoteId={updateNote}/>

                ))}
            </div>
        </div>
    )
}

export default Note