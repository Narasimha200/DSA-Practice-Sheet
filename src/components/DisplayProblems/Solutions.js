import React from 'react'
import {useLocation} from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './Solutions.css';
export default function Solutions() {
  const location = useLocation();

  return (
    <div className='solution'>
        <div className='name'>{location.state.name}</div>
        <span className={location.state.level}>{location.state.level[0].toUpperCase()+location.state.level.slice(1)}</span>
        <a href={location.state.url}>Solve problem on Geeks for geeks platform</a>
        <h3 className='tittle'>BruteForce solution:</h3>
        <SyntaxHighlighter language="cpp" style={docco}>
          {JSON.parse(location.state.bruteforce)}
        </SyntaxHighlighter>
        <h3 className='tittle'>Optimal solution:</h3>
        <SyntaxHighlighter language="cpp" style={docco}>
          {JSON.parse(location.state.optimal)}
        </SyntaxHighlighter>
    </div>
  )
}
