import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { CiSearch } from "react-icons/ci";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Store/AuthContext";


function Navbar() {
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    const confirmation = window.confirm('Are you sure you want to logout?');
    if (confirmation) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (

    <div className={`navbar ${isScrolled ? 'scrolled' : ''}`} >
      <CiSearch className='searchIcon' style={{ fontSize: '2rem', color: 'white' }} />
        <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="" />
        <div className='navText' >
          <p className='navTxt' >Home</p>
          <p className='navTxt' >Series</p>
          <p className='navTxt' >History</p>
          <p className='navTxt' >Liked</p>
          <p className='navTxt' >My List</p>
        </div>
          
        <div className='avatar-wrapper'>
        <img
          className='avatar'
          src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'
          alt=''
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className='dropdown'>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>
      { user ? <span style={{color:'white',marginRight:'80px'}} > {user.displayName} </span> : null }
    </div>
  )
}

export default Navbar