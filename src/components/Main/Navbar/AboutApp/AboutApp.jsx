import React from "react";
import {Link} from 'react-router-dom'
import "./AboutApp.css"

export default function AboutApp() {
  return (
    <span className="navbar-aboutapp-text">
      <Link to="/">about app</Link>
    </span>
  );
}
