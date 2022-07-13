import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import NoteState from './context/notes/NoteState';

export default function App() {
	return (
		<NoteState>
			<Router>
				<Navbar />
				<div className='container my-5'>
					<Routes>
						<Route exact path="/" element={<Home/>} />
						<Route exact path="/login" element={<Login/>} />
						<Route exact path="/signup" element={<Signup/>} />
						<Route exact path="/about" element={<About/>} />
					</Routes>
				</div>
			</Router>
		</NoteState> // wrapped all under it so that it can be used all over
	)
}