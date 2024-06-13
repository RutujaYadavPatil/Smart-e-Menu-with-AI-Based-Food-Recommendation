import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
const [credential,setcredential]=useState({name:"",email:"",password:"",location:""})
let navigate = useNavigate()
const handlesubmit = async (e) => {
    e.preventDefault();
    try {
        const response =await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password,location:credential.location })
        });

        const json = await response.json();
        console.log(json);
        if(!json.success)
        {
          alert("Enter Valid Credentials");
        }
        else{
          //alert("Success")
          navigate('/');
        }
    }   
    catch (error) {
        console.error("Error occurred:", error);
        alert("An error occurred while processing your request.");
    }
};

    const onChange=(event)=>
    {
        setcredential({...credential,[event.target.name]:event.target.value});
    }

  return (
    <div>
        <Navbar></Navbar>
      <section className="vh-100" style={{"background-color":"#e6f7f5"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-white" style={{"border-radius": "25px;"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form onSubmit={handlesubmit} className="mx-1 mx-md-4"  >

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" name='name' value={credential.name} onChange={onChange}/>
                      <label className="form-label"htmlFor="name">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control" name='email' value={credential.email} onChange={onChange}/>
                      <label className="form-label"htmlFor="email">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" name='password' value={credential.password} onChange={onChange}/>
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example4cd " name='location' value={credential.value} onChange={onChange} className="form-control"   />
                      <label className="form-label" htmlFor="location">Location</label>
                    </div>
                  </div>


                  <div className="d-flex justify-content-center mx-4 mb-`3 mb-lg-4">
                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                className="img-fluid" alt="Sample"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
