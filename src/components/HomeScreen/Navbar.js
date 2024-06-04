import React, { useState } from 'react';
import login from './login.png'
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {Link } from 'react-router-dom';
import './Navbar.css';
export default function Navbar() {
  const [email, setEmail] = useState(null);
  onAuthStateChanged(auth, (user)=>{
    if(user){
      setEmail(user.email);
    }
  })
  return (
    <div className='navbar'>
        <h4>DSA Sheet</h4>
        {/* {currUser&&<p>{currUser}</p>} */}
        <div className='avatar'>
          {email?email[0].toUpperCase():'--'}
          <span className='tooltip'>{email?email:"No user"}</span>
        </div>
        <Link to="authentication">
          <img src={login} alt='login' style={{width:"2rem"}}/>
        </Link>
    </div>
  )
}
