import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());

  };


  return (
    <>

        <button className="user-headshot-btn" onClick={openMenu}>
          {/* <div></div> */}
        </button>

      {showMenu && (
        <div>
          <div clssName='triangle-dropdown'>hello</div>
          <div className="profile-dropdown">
            <p>{user.username}</p>
            <p>{user.email}</p>
            <div>
              <button onClick={logout}>
                <Link to='/'>Log Out</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
