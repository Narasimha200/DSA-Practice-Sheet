// import './App.css';
import React from 'react';
import HomeScreen from './components/HomeScreen/HomeScreen';
import Navbar from './components/HomeScreen/Navbar';
import {Routes, Route} from 'react-router-dom';
import Problems from './components/DisplayProblems/Problems';
import Update from './update';
import Solutions from './components/DisplayProblems/Solutions'
import Authentication from './components/Authentication/Authentication';
function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/:topic' index element={<Problems/>} />
          <Route path='/:topic/solutions' element={<Solutions/>} />
          <Route path='authentication' element={<Authentication/>} />
          <Route path='1491625@majorProject' element={<Update/>}/>
        </Routes>
    </div>
  );
}

export default App;
