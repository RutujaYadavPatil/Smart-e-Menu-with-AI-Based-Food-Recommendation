import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
  
      });
      const json = await response.json()
      console.log(json);
      if (json.success) {
        //save the auth toke to local storage and redirect
        localStorage.setItem('userEmail', credentials.email)
        localStorage.setItem('token', json.authToken)
        navigate("/");
  
      }
      else {
        alert("Enter Valid Credentials")
      }
    }
  
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  

  return (
    <div>
        <Navbar/>
        <div className="wrapper">
        <div className="logo">
            <img src='../images/logo.jpg' alt="" />
        </div>
        <div className="text-center mt-4 name">
            Rollwala
        </div>
        <form onSubmit={handleSubmit} className="p-3 mt-3">
            <div className="form-field d-flex align-items-center">
                <span className="far fa-user"></span>
                <input type="text" name="email" value={credentials.email} onChange={onChange} id="userName" placeholder="Username" />
            </div>
            <div className="form-field d-flex align-items-center">
                <span className="fas fa-key"></span>
                <input type="password" name="password"  value={credentials.password} onChange={onChange} id="pwd" placeholder="Password" />
            </div>
            <button className="btn mt-3">Login</button>
        </form>
        <div className="text-center fs-6">
            <Link to="/">Forget password?</Link> or <Link to="/signup">Sign up</Link>
        </div>
    </div>
    </div>
  )
}
