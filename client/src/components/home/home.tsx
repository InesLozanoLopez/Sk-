import * as React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { getRunnerInfo } from './../../apiServices';

const Home: React.FC = () => {
  let runnerInfo = true;

  const getProfileCreated = async () => {
    const profileCreated = await getRunnerInfo();
    if (profileCreated) {
      runnerInfo = false;
    }
  };
  getProfileCreated();

  return (
    <div className="buttonContainer">
      <div>
        {runnerInfo ? null : (
          <Link to="/newrunner">
            <input className="homeButton" type="button" value="New Runner" />
          </Link>
        )}
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
