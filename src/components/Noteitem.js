import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
	const context = useContext(noteContext);
	const {deleteNote} = context;
	const { note, updateNote } = props;
	return (
		<div className='col-md-3'>
			<div className="card my-2">
				<div style={{
					display: 'flex',
					justifyContent: 'flex-end',
					position: 'absolute',
					right: '0'
				}
				}>
					{note.tag.length>0 && <span className="badge rounded-pill bg-danger"> {note.tag} </span>}
				</div>
				<div className="card-body">
					<h5 className="card-title">{note.title}</h5>
					<p className="card-text">{note.description}</p>
					<i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>
					<i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
				</div>
			</div>
		</div>
	)
}

export default Noteitem