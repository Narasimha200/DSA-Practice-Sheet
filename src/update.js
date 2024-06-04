import React, { useState } from 'react'
import { db } from './firebase'
import {addDoc, collection} from 'firebase/firestore'

export default function Update() {
    const [data, setData] =  useState({
        name:"",
        url:"",
        level:"",
        bruteforce:"",
        optimal:"",
    })
    function handleChange(e){
        setData(data => ({
            ...data,
            [e.target.className]: e.target.value
        }))
    }
    async function handleSubmit(e){
        e.preventDefault();
        const updated = {
            ...data,
            bruteforce: JSON.stringify(data.bruteforce),
            optimal: JSON.stringify(data.optimal)
        }
        const colleRef = collection(db, "topics", "Vt86KE7IQJ2NHZDbJVFk", "linkedList");
        const res = await addDoc(colleRef, updated);
        console.log(res);
    }
  return (
    <form style={{display:"flex",flexDirection:"column"}} onSubmit={handleSubmit}>
        <label>
            Name: <input className="name" type="text" onChange={handleChange} value={data.name} required/>
        </label>
        <label>
            Url: <input className='url' type="text" width={"30rem"} onChange={handleChange} value={data.url} required/>
        </label>
        <label>
            Level: 
            <select className='level' onChange={handleChange} value={data.level} required>
                <option value="">----------</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </label>
        <label>
            bruteForce:
            <textarea className='bruteforce' onChange={handleChange} value={data.bruteforce} required/>
        </label>
        <label>
            optimal:
            <textarea className='optimal' onChange={handleChange} value={data.optimal} required/>
        </label>
        <button>Submit</button>
    </form>
  )
}
