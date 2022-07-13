import React, { useContext, useEffect, useRef, useState} from 'react';
import noteContext from "../context/notes/noteContext";
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
	let navigate  = useNavigate();
	const context = useContext(noteContext);
	const { notes, getNotes, editNote } = context;
	const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});
	useEffect(() => {
		if(localStorage.getItem('token')) {
			getNotes()
		}
		else {
			navigate('/login');
		}
	});

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
	}
	const clickSubmit = (e)=>{
        refClose.current.click();
		editNote(note.id, note.etitle, note.edescription, note.etag);
        //setNote({title: "", description: "", tag: ""});
    }
	const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
	const ref = useRef(null);
	const refClose = useRef(null);
	return (
		<>
			<AddNote />
			<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch demo modal
			</button>
			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="title" className="form-label">Title</label>
									<input type="text" className="form-control" id="etitle" name='etitle' placeholder="Minimum length must be 3 characters" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
								</div>
								<div className="mb-3">
									<label htmlFor="description" className="form-label">Description</label>
									<input type="text" className="form-control" id="edescription" name='edescription' placeholder="Minimum length must be 5 characters" value={note.edescription} onChange={onChange} minLength={5} required/>
								</div>
								<div className="mb-3">
									<label htmlFor="tag" className="form-label">Tag</label>
									<input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
							<button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={clickSubmit}>Update Note</button>
						</div>
					</div>
				</div>
			</div>
			<div className='row my-3'>
				<h3 className="text-center" style={{ marginTop: '5px', marginBottom: '30px' }}>Your Notes</h3>
				<div className='text-center'>
					{notes.length===0 && "No notes to display"}
				</div>
				{notes.map((note) => {
					return <Noteitem key={note._id} updateNote={updateNote} note={note} />
				})}
			</div>
		</>
	)
}

export default Notes