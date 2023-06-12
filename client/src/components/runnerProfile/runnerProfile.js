import React from 'react';
import './runnerProfile.css';
import { getRunnerInfo } from '../../apiServices';
import { useEffect, useState } from 'react';
import { runnerTrainings } from '../../apiServices'
import Weeklytraining from '../weeklytraining/weeklytraining';
import { useNavigate } from 'react-router-dom';


function RunnerProfile() {
  const [runnerInfo, setRunnerInfo] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]);
  const navigate = useNavigate;

  useEffect(() => {
    getRunnerInfo()
      .then((runner) => setRunnerInfo(runner))
  }, []);


  useEffect(() => {
    runnerTrainings()
      .then((training) => setAllTrainings(training))
  }, []);


  function getDate(dates) {
    const date = new Date(dates)
    const day = date.getDate();
    const month = date.getMonth();

    function dayLetter(day) {
      if (day[day.length - 1] === 1) {
        return `${day}st`
      } else if (day[day.length - 1] === 2) {
        return `${day}nd`
      } else if (day[day.length - 1] === 3) {
        return `${day}rd`
      } else {
        return `${day}th`
      }
    }

    const monthLetter = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return dayLetter(day) + ' of ' + monthLetter[month]
  }

  const allTrainingsSorted = allTrainings.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })


  function deleteProfile() {
    deleteProfile(runnerInfo._id).then(navigate('/newrunner')
    )
  }

  const today = new Date();

  if (runnerInfo.length > 0) {
    return (
      <div>
        <h2 className='hello'><span className="wave">👋</span> Hi {runnerInfo[0].name}❗ Ready for your training⁉️ </h2>

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
                    <Weeklytraining key={training._id} training={training} getDate={getDate} runnerInfo={runnerInfo} setAllTrainings={setAllTrainings} />
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
                <Weeklytraining key={training._id} training={training} getDate={getDate} runnerInfo={runnerInfo} setAllTrainings={setAllTrainings} />
              ))}
          </div>
        </div>

        <div className='display-trainings'>
          This month trainings completed:
          <div className='trainingsContainer'>
            {allTrainingsSorted.filter((training) =>
              today > new Date(training.date) && today.getMonth() === new Date(training.date).getMonth())
              .map((training) => (
                <Weeklytraining key={training._id} training={training} getDate={getDate} runnerInfo={runnerInfo} setAllTrainings={setAllTrainings} />
              ))}
          </div>
        </div>

        {allTrainingsSorted.some((training) => today > new Date(training.date) && today.getMonth() + 1 === new Date(training.date).getMonth()) ?
          (
            <div className='display-trainings'>
              Last month trainings completed:
              <div className='trainingsContainer'>
                {allTrainingsSorted.filter((training) =>
                  today > new Date(training.date).getMonth() + 1 && today.getMonth() === new Date(training.date).getMonth())
                  .map((training) => (
                    <Weeklytraining key={training._id} training={training} getDate={getDate} runnerInfo={runnerInfo} setAllTrainings={setAllTrainings} />
                  ))}
              </div>
            </div>
          ) : null}

        <div className='previousTrainings'>
          <input className="runnerProfileButton" type='button' value='Past Trainings'/>
          <input className="runnerProfileButton" type='button' value='Delete Runner Profile' onClick={deleteProfile}/>
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
      </div>
    )
  }

}

export default RunnerProfile;
