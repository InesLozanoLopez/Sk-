import React from 'react';
import './App.css';
import Home from './components/home/home';
import ANewRunner from './components/newRunner/newRunner';
import RunnerProfile from './components/runnerProfile/runnerProfile';
import AllTrainings from './components/allTrainings/allTrainings';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      <div className="App">
        <section>
          <h1>Welcome to Sk-</h1>
        </section>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/newrunner" element={<ANewRunner />}></Route>
          <Route path="/runner" element={<RunnerProfile />}></Route>
          <Route path="/allTrainings" element={<AllTrainings />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
