import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';

export default function App() {
	return (
		<Router>
			<Navbar/>
			<div>
				<h1>This is iNotebook yo!</h1>
			</div>
		</Router>
	)
}
