import './App.css';
import Home from './components/home/home';
import NewRunner from './components/newRunner/newRunner';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <h1>Welcome to Sk-</h1>
      
    <Routes>
      <Route path='/' element={<Home/>} Route={Route}></Route>
      <Route path='newrunner' element={<NewRunner/>}></Route>
    </Routes>

    </div>
  );
}

export default App;
