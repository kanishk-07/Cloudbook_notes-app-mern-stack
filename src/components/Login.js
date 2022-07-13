import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

	let navigate  = useNavigate();

	const host = "http://localhost:5000";
	
	const [credentials, setCredentials] = useState({email: "", password: ""});

	const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
		const json = await response.json();
		console.log(json);
		if(json.success) {
			localStorage.setItem('token', json.authToken);
			navigate("/");
		} else {
			alert(json.message);
		}
	}

	return (
		<div className='container' style={{ marginTop: '100px' }}>
			<h3 className="text-center" style={{ marginTop: '80px' }}>Login To Continue</h3>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
					<input type="email" className="form-control" value={credentials.email} id="email" name="email"  onChange={onChange} aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
					<input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange}/>
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default Login