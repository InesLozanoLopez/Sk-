import * as React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { getRunnerInfo } from './../../apiServices';

const Home: React.FC = () => {
  let runnerInfo = false;

  const getProfileCreated = async () => {
    const profileCreated = await getRunnerInfo();
    console.log('profileCreated', profileCreated);
    runnerInfo = true;
  };
  getProfileCreated();

  return (
    <div className="buttonContainer">
      <div>
        <Link to="/newrunner">
          <input className="homeButton" type="button" value="New Runner" />
        </Link>
      </div>
      <div>
        {runnerInfo ? (
          <Link to="/runner">
            <input
              className="homeButton"
              type="button"
              value="Training programme"
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
