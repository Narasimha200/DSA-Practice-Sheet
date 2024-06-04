import React, { useEffect, useRef, useState } from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import {db, auth} from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import './Problems.css'

export default function Problems(){
    const [problemsData, setProblemsData] = useState([]);
    const [currUserId, setCurrUserId] = useState(null);
    const [solvedProblems, setSolvedProblems] = useState([]);
    const ref = useRef();
    ref.current = solvedProblems;

    const navigate = useNavigate();

    const topic = useParams().topic.toLowerCase();

    currUserId===null&&onAuthStateChanged(auth , (user) => {
        if(user){
            setCurrUserId(user.uid);
        }
    })
    useEffect(()=>{
        async function getProblems(){
            const collRef = collection(db, "topics","Vt86KE7IQJ2NHZDbJVFk",topic);
            console.log("api callf for getproblems");
            const data = await getDocs(collRef);
            setProblemsData(data.docs.map(doc =>({
                ...doc.data(),
                id:doc.id
            })))
        }
        getProblems();
    },[topic]);
    useEffect(()=>{
        async function getSolvedProblems(){
            console.log("api call for get solved");
            const docRef = doc(db, "users", currUserId);
            const res = await getDoc(docRef);
            setSolvedProblems(res.data().solved);
            console.log("enter nter nte", solvedProblems);
        }
        if(currUserId){
            getSolvedProblems();
        }
        return ()=>{
            async function postSolvedProblems(){
                if(currUserId === null) return;
                const docRef = doc(db, "users", currUserId);
                await setDoc(docRef, {
                    solved:ref.current
                })
            }
            postSolvedProblems();
            console.log("completed cleanup");
        }
    },[currUserId]);
    // window.addEventListener('beforeunload',(event)=>{
    //     event.preventDefault();
    //     async function postSolvedProblems(){
    //         if(currUserId === null) return;
    //         const docRef = doc(db, "users", currUserId);
    //         await setDoc(docRef, {
    //             solved:ref.current
    //         })
    //     }
    //     postSolvedProblems();
    //     console.log("document");
    //     return true;
    // })
    return(
        <div className='problems'>
            <div className='topic'> {topic[0].toUpperCase()+topic.slice(1)} practice problems</div>
            <div className='problems-container'>
                {
                    ["easy","medium","hard"].map(level =>{
                        return(
                            <ProblemsCart 
                                level={level}
                                problemsData={problemsData}
                                key={level}
                                solvedProblems = {solvedProblems}
                                setSolvedProblems = {setSolvedProblems}
                                currUserId = {currUserId}
                                navigate = {navigate}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
// function to make a set of problems
function ProblemsCart({level, problemsData, solvedProblems, setSolvedProblems, currUserId, navigate}){
    
    function handleCheckbox(e, pid){
        if(currUserId === null){
            navigate("/authentication")
            return;
        }
        if(e.target.checked === false){
            setSolvedProblems( prev => {
                const arr = prev;
                return arr.filter(ele => ele !== pid);
            })
        }
        else{
            setSolvedProblems( prev => {
                const arr = [...prev, pid];
                return arr;
            })
        }
    }
    return(
        <>
            <div className='problem-set'>
                <div className={level}>{level[0].toUpperCase()+level.slice(1)} problems</div>
                <div className='set'>
                        
                    {console.log("vere", solvedProblems)}
                    {
                        problemsData.length>0?
                        problemsData.map(doc => {
                            if(doc.level === level){
                                return (
                                    <p key={doc.id}> 
                                        <input 
                                            type='checkbox' 
                                            className='checkbox' 
                                            checked={solvedProblems.includes(doc.id)}
                                            onChange={(e)=>{handleCheckbox(e, doc.id)}}
                                        />
                                        <Link to="solutions" state={doc}>{doc.name}</Link>
                                    </p>
                                )
                            }
                        })
                        :
                        "Loading"
                    }
                </div>
            </div>
        </>
    )
}