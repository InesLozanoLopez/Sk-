import React from 'react';
import './pastTraining.css';
import Training from '../trainings/training';
import { useEffect, useState } from 'react';
import { runnerTrainings, getRunnerInfo } from '../../apiServices';
import { allTrainingByMonth } from './functions';
import { Link } from "react-router-dom";


function PastTrainings() {
  const [runnerInfo, setRunnerInfo] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]);

  useEffect(() => {
    getRunnerInfo()
      .then((runner) => setRunnerInfo(runner))
  }, []);


  useEffect(() => {
    runnerTrainings()
      .then((training) => setAllTrainings(training))
  }, []);

  const allTrainingsSorted = allTrainings.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  console.log(allTrainingByMonth(allTrainingsSorted))


  return (
    <div>
      <Link to='/runner'>
        <input className="pastTrainingsButton" type='button' value='Back to Runner Profile' />
      </Link>
      <div className='pastTrainings'>
        {Object.entries(allTrainingByMonth(allTrainingsSorted)).map(([monthYear, trainings]) => {
          const [month, year] = monthYear.split('-');
          return (
            <div key={monthYear}>
              <h2>{month} {year}</h2>
              <div className='trainingsContainer'>
                {trainings.map((training) => (
                  <Training key={training._id} training={training} runnerInfo={runnerInfo} setAllTrainings={setAllTrainings} />
                ))
                }
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PastTrainings;