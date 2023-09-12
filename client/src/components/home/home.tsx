import * as React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home: React.FC = () => {
  return (
    <div className="buttonContainer">
      <div>
        <Link to="/newrunner">
          <input className="homeButton" type="button" value="New Runner" />
        </Link>
      </div>
      <div>
        <Link to="/runner">
          <input
            className="homeButton"
            type="button"
            value="Training programme"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
