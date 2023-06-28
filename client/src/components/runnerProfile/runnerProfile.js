import React from 'react';
import './runnerProfile.css';
import { useEffect, useState } from 'react';
import { runnerTrainings, deleteProfile, getRunnerInfo } from '../../apiServices'
import Training from '../trainings/training';
import { useNavigate, Link } from 'react-router-dom';
import PastTrainings from '../pastTrainings/pastTrainings';
import { getDate } from './functions';


function RunnerProfile() {
  const [runnerInfo, setRunnerInfo] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRunnerInfo()
      .then((runner) => setRunnerInfo(runner))
  }, []);

  useEffect(() => {
    runnerTrainings()
      .then((training) => setAllTrainings(training))
  }, []);



  const allTrainingsSorted = allTrainings.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  function deleteRunnerProfile() {
    deleteProfile(runnerInfo[0]._id);
    navigate('/newrunner');
  }

  const today = new Date();

  if (runnerInfo.length > 0) {
    return (
      <div>
        <h2 className='hello'><span className="wave">👋</span> Hi {runnerInfo[0].name}❗</h2><h2 className='readyForYourTraining'> Ready for your training⁉️ </h2>

        {/* <div className='othersButtons'> */}
        <Link to='/allTrainings'>
          <input className="allTrainingsButton" type='button' value='All Trainings' />
        </Link>
        {/* </div> */}

        {allTrainingsSorted.some((training) => today > new Date(training.date) && !training.feedback) ?
          (
            <div className='display-trainings'>
              <div className='attentionContainer'>
                <span className='attention'> 🚫 </span>
                <h3>  Please, give a feedback to update your trainings:</h3>
              </div>
              <div className='trainingsContainer'>
                {allTrainingsSorted.filter((training) =>
                  today >= new Date(training.date) && !training.feedback)
                  .map((training) => (
                    <Training key={training._id} training={training} runnerInfo={runnerInfo} setAllTrainings={setAllTrainings} />
                  ))}
              </div>
            </div>
          ) : null}

        <div className='display-trainings'>
          This month trainings:
          <div className='trainingsContainer'>
            {allTrainingsSorted.filter((training) =>
              today < new Date(training.date) && today.getMonth() === new Date(training.date).getMonth())
              .map((training) => (
                <Training key={training._id} training={training} runnerInfo={runnerInfo} setAllTrainings={setAllTrainings} />
              ))}
          </div>
        </div>

        <div className='display-trainings'>
          This month trainings completed:
          <div className='trainingsContainer'>
            {allTrainingsSorted.filter((training) =>
              today > new Date(training.date) && today.getMonth() === new Date(training.date).getMonth()).length > 0 ? (
                allTrainingsSorted.filter((training) =>
                  today > new Date(training.date) && today.getMonth() === new Date(training.date).getMonth()).map((training) => (
                  <Training key={training._id} training={training} getDate={getDate} runnerInfo={runnerInfo} setAllTrainings={setAllTrainings} />
                )))
              :
              <div className='noTrainingCompleted'>No trainings completed... yet</div>
            }
          </div>
        </div>

        <div className='race'>
          <div className='yourRace'>
            <h2>Your race...</h2>
          </div>

          <div className='raceDetails'>
            <div className='raceInfo'>
              <div>On: <strong>{getDate(new Date(runnerInfo[0].race.dateRace))}</strong></div>
              <div>Distance: <strong>{runnerInfo[0].race.distanceRace} km.</strong></div>
              <div>Elevation: <strong>{runnerInfo[0].race.elevation} meters.</strong></div>
            </div>

            <div className='raceObjetives'>
              <p>Objectives</p>
              <div>Total time: <strong>{runnerInfo[0].race.timeObj} hour.</strong></div>
              <div>Km/h including stops: <strong>{runnerInfo[0].race.minsPerKm} mins/km.</strong></div>
            </div>
          </div>
        </div>
        <div className="hidden">
          <PastTrainings getDate={getDate} runnerInfo={runnerInfo} />
        </div>

        <div className='othersButtons'>
          <input className="runnerDeleteButton" type='button' value='Delete Runner Profile' onClick={() => deleteRunnerProfile()} />
        </div>

      </div>
    )
  }

}

export default RunnerProfile;
