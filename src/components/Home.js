import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

export const Home = () => {
	const context = useContext(noteContext);
	const {notes, setNotes} = context;
	return (
		<div className='container'>
			<h3 className="text-center" style={{ marginTop: '80px' }}>Add a Note</h3>
			<form>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Title</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Description</label>
					<input type="password" className="form-control" id="exampleInputPassword1"/>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
			<h3 className="text-center" style={{ marginTop: '20px' }}>Your Notes</h3>
			{notes.map((note)=>{
				return note.title;
			})}
		</div>
	)
}