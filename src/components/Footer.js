import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>

     <footer >
      <hr></hr>
    <div className="row m-5">
      <div className="col-4 justify-content-evenly">
        <h5>Section</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><Link to="/"  className="nav-link p-0 text-muted">Home</Link></li>
          <li className="nav-item mb-2"><Link to="/"  className="nav-link p-0 text-muted">Features</Link></li>
          <li className="nav-item mb-2"><Link to="/"  className="nav-link p-0 text-muted">Pricing</Link></li>
          <li className="nav-item mb-2"><Link to="/"  className="nav-link p-0 text-muted">FAQs</Link></li>
          <li className="nav-item mb-2"><Link to="/"  className="nav-link p-0 text-muted">About</Link></li>
        </ul>
      </div>


      <div className="col-4 justify-content-evenly">
        <form>
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <div className="d-flex flex-column flex-sm-row w-100 gap-2">
            <label for="newsletter1" className="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" className="form-control" placeholder="Email address"/>
            <button className="btn btn-primary" type="button">Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <div >
      <p className=' d-flex flex-column flex-sm-row justify-content-centre  border-top'>© 2022 Company, Inc. All rights reserved.</p>
    </div>
  </footer>
    </div>
  )
}
