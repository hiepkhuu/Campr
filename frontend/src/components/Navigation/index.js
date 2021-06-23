import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormPage from '../LoginFormPage';
import './Navigation.css';
import ExplorePhotoStream from '../ExplorePhotoStream';
import UserHomePage from '../UserHomePage';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {

    sessionLinks = (
      <>
       <NavLink to="/photos">Explore</NavLink>
       <ProfileButton user={sessionUser} />
      </>
    );
    <UserHomePage />


  } else {
    sessionLinks = (
      <>
        {/* <LoginFormPage /> */}

        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Campr!🚙</NavLink>

        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
