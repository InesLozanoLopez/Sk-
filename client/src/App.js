import './App.css';
import ReseachBar from './components/reseachBar';
import NewRunner from './components/newRunner/newRunner'

function App() {
  return (
    <div className="App">
      <h1>Welcome to Sk-</h1>
      <button>New Runner</button>
      <ReseachBar/>
      <NewRunner/>
    </div>
  );
}

export default App;
