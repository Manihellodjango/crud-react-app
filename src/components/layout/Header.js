import React from "react";
import { NavLink } from "react-router-dom"; 
import "./layout.css";

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand" href="#">
            <span className="navbar-text">React CRUD</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className="nav-link" 
                  activeClassName="active" 
                  exact 
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/tasks" 
                  className="nav-link" 
                  activeClassName="active" 
                >
                  Show Tasks
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}