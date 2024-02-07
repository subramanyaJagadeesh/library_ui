import React from 'react';
import { useAppSelector } from "../../redux/hooks";
import './Navbar.scss'

const Navbar = () => {
  const user = useAppSelector(s => s.user);

  return(
    <div className="navbar-wrapper">
      <div className="left-content">
        <h1>
          Public Library
        </h1>
      </div>
      <div className="right-content">
        {/* { user && user?.firstName + user?.lastName } */}
      </div>
    </div>
  )
};

export default Navbar;