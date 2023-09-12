import React, { useEffect, useState } from 'react';
import './runnerProfile.css';
import {
  runnerTrainings,
  deleteProfile,
  getRunnerInfo,
} from './../../apiServices';
import Training from './../trainings/training';
import { useNavigate, Link } from 'react-router-dom';
import { getDate } from './functions';
import {
  ITrainings,
  IRunnerProfile,
} from '../../../../server/TypeScript/interfaces';

const RunnerProfile: React.FC = () => {
  const [runnerInfo, setRunnerInfo] = useState<IRunnerProfile[]>([]);
  const [allTrainings, setAllTrainings] = useState<ITrainings[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRunnerInfo().then((runner: IRunnerProfile) => setRunnerInfo([runner]));
  }, []);

  useEffect(() => {
    runnerTrainings().then((training: ITrainings[]) =>
      setAllTrainings(training),
    );
  }, []);

  const allTrainingsSorted: ITrainings[] = allTrainings.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  function deleteRunnerProfile() {
    deleteProfile(runnerInfo[0]._id);
    navigate('/newrunner');
  }

  const today = new Date();

  if (runnerInfo.length > 0) {
    return (
      <div>
        <h2 className="hello">
          <span className="wave" role="img" aria-label="hand waving">
            👋
          </span>{' '}
          Hi {runnerInfo[0].name}❗
        </h2>
        <h2 className="readyForYourTraining">
          {' '}
          Ready for your training
          <span role="img" aria-label="question mark">
            ⁉️{' '}
          </span>
        </h2>

        <Link to="/allTrainings">
          <input
            className="allTrainingsButton"
            type="button"
            value="All Trainings"
          />
        </Link>

        {allTrainingsSorted.some(
          (training) => today > new Date(training.date) && !training.feedback,
        ) ? (
          <div className="display-trainings">
            <div className="attentionContainer">
              <span
                className="attention"
                role="img"
                aria-label="attention emoji"
              >
                {' '}
                🚫{' '}
              </span>
              <h3> Please, give a feedback to update your trainings:</h3>
            </div>
            <div
              className="trainingsContainer"
              tabIndex={0}
              role="region"
              aria-label="Trainings without feedback"
            >
              {allTrainingsSorted
                .filter(
                  (training) =>
                    today >= new Date(training.date) && !training.feedback,
                )
                .map((training) => (
                  <Training
                    key={training._id}
                    training={training}
                    runnerInfo={runnerInfo[0]}
                    setAllTrainings={setAllTrainings}
                  />
                ))}
            </div>
          </div>
        ) : null}

        <div className="display-trainings">
          This month trainings:
          <div
            className="trainingsContainer"
            tabIndex={0}
            role="region"
            aria-label="All trainings of this month"
          >
            {allTrainingsSorted
              .filter(
                (training) =>
                  today < new Date(training.date) &&
                  today.getMonth() === new Date(training.date).getMonth(),
              )
              .map((training) => (
                <Training
                  key={training._id}
                  training={training}
                  runnerInfo={runnerInfo[0]}
                  setAllTrainings={setAllTrainings}
                />
              ))}
          </div>
        </div>

        <div className="display-trainings">
          This month trainings completed:
          <div
            className="trainingsContainer"
            tabIndex={0}
            role="region"
            aria-label="This month completed trainings"
          >
            {allTrainingsSorted.filter(
              (training) =>
                today > new Date(training.date) &&
                today.getMonth() === new Date(training.date).getMonth(),
            ).length > 0 ? (
              allTrainingsSorted
                .filter(
                  (training) =>
                    today > new Date(training.date) &&
                    today.getMonth() === new Date(training.date).getMonth(),
                )
                .map((training) => (
                  <Training
                    key={training._id}
                    training={training}
                    runnerInfo={runnerInfo[0]}
                    setAllTrainings={setAllTrainings}
                  />
                ))
            ) : (
              <div className="noTrainingCompleted">
                No trainings completed... yet
              </div>
            )}
          </div>
        </div>

        <div className="race">
          <div className="yourRace">
            <h2>Your race...</h2>
          </div>

          <div className="raceDetails">
            <div className="raceInfo">
              <div>
                On:{' '}
                <strong>
                  {getDate(new Date(runnerInfo[0].race.dateRace).getTime())}
                </strong>
              </div>
              <div>
                Distance: <strong>{runnerInfo[0].race.distanceRace} km.</strong>
              </div>
            </div>

            <div className="raceObjectives">
              <p>Objectives</p>
              <div>
                Total time: <strong>{runnerInfo[0].race.timeObj} hour.</strong>
              </div>
              <div>
                Km/h including stops:{' '}
                <strong>{runnerInfo[0].race.minsPerKm} mins/km.</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="othersButtons">
          <input
            className="runnerDeleteButton"
            type="button"
            value="Delete Runner Profile"
            onClick={() => deleteRunnerProfile()}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default RunnerProfile;
