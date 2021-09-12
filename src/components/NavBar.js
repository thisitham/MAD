import React, { Component } from 'react'
import {BrowserRouter,Route} from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return(
      
        <nav className="navbar navbar-expand-lg navbar-light" style={{background:'#e3f2fd'}}>
        <div className="container-fluid">
            {/*<a className="navbar-brand">CRUD App using MERN stack</a>*/}
 
            <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
 
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/">posts</a>
                    </li>
 
                </ul>
 
            </div>
         
        </div>    
      </nav>
 
     
    )
  }
}