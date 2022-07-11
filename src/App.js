import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import { Home } from './components/Home';
import NoteState from './context/notes/NoteState';

export default function App() {
	return (
		<NoteState>
			<Router>
				<Navbar />
				<div className='container my-5'>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/about" element={<About />} />
					</Routes>
				</div>
			</Router>
		</NoteState> // wrapped all under it so that it can be used all over
	)
}
