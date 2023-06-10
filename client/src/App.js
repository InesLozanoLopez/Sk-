import React from 'react'
import './App.css';
import Home from './components/home/home';
import NewRunner from './components/newRunner/newRunner';
import RunnerProfile from './components/runnerProfile/runnerProfile';
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div>
      <div className='App'>
        <h1>Welcome to Sk-</h1>
        <Routes>
          <Route path='/' element={<Home />} Route={Route}></Route>
          <Route path='newrunner' element={<NewRunner />}></Route>
          <Route path='runner' element={<RunnerProfile />}></Route>
        </Routes>
      </div>

    </div>
  );
}

export default App;
