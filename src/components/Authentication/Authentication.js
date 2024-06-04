import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {doc, setDoc} from 'firebase/firestore'
import { auth, db } from '../../firebase';
import './Authentication.css';
export default function Authentication(){
    const [curr, setCurr] = useState("Login");
    const [userData, setUserData] = useState({email:"",password:""});
    const [authError, setAuthError] = useState(null);
    const navigate = useNavigate();

    // if error occurs then remove it with in three seconds
    (authError!==null)&&setTimeout(()=>{
        setAuthError(null);
        console.log("authenticatin renderd");
    },3000);

    //create users with email and password
    async function handleSignUp(){
        try{
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );
            const docRef = doc(db, "users", userCredentials.user.uid);
            await setDoc(docRef, {solved:[]});
            navigate(-1, {replace : true});
        }catch(error){
            setAuthError(error.message);
        }
    }

    // sign in with email and password
    async function handleLogin(){
        try{
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );
            navigate(-1, {replace: true});
        }catch(error){
            setAuthError(error.message);
        }
    }
    // to store data in state
    function handleUserData(e){
        setUserData(prev => ({
            ...prev,
            [e.target.className]:e.target.value
        }))
    }

    // updating the title
    function updateTitle(){
        const title = curr==="Login"?"SignUp":"Login";
        setCurr(title);
    }
    async function handleSignOut(){
        try{
            const res= await signOut(auth);
            navigate(0);
        }
        catch(err){
            console.log(err.message);
            setAuthError(err.message);
        }
    }
    return(
        <div className='authentication'>
            <form className='form'>
                <h3 className='title'>{curr}</h3>
                <hr className='underline' />
                <div className='field email'>
                    <input 
                        className='email' 
                        type='email' 
                        required 
                        placeholder="Enter email"
                        onChange={handleUserData}
                    />
                </div>
                <div className='field password'>
                    <input 
                        className='password' 
                        type='text' 
                        required 
                        placeholder={`${curr==="Login"?"Enter":"Create"} password`}
                        onChange={handleUserData}
                    />
                </div>
                {authError && <p className='auth-error'>{authError}</p>}
                {curr==="Login"&&<p>Forgot password?</p>}
                {
                    curr === "Login"?
                    <button className="submit" onClick={handleLogin} type='button'>Login</button>
                    :
                    <button className="submit" onClick={handleSignUp} type='button'>Sign Up</button>
                }
                <div style={{display:"flex", gap:"1rem", justifyContent:"center"}}>
                <span onClick={updateTitle} className='update-title' style={{cursor:"pointer"}}>{curr==="Login"?"SignUp":"Login"}</span>
                <span onClick={handleSignOut} style={{cursor:"pointer"}}>SignOut</span>
                </div>
            </form>
        </div>
    ) 
}