import React from 'react';
import './training.css';
import { editATraining, runnerTrainings, deleteATraining } from '../../apiServices';
import {getDate} from '../runnerProfile/functions';


function Training({ training, runnerInfo, setAllTrainings }) {
  const daysToRace = new Date(runnerInfo[0].race.dateRace).getTime() - new Date(training.date).getTime();
  const differenceDays = Math.floor(daysToRace / (1000 * 60 * 60 * 24));

  const today = new Date()

  function clickedFeedback(value) {
    if (value) {
      if (new Date(training.date) <= today) {
        editATraining(value, training._id)
          .then(runnerTrainings)
          .then((training) => setAllTrainings([...training]))
      }
    }
  }

  function distanceKm(km) {
    return km ? km.toFixed(2) : '';
  }

  function daysOfWeek(dateToConvert) {
    const day = new Date(dateToConvert)
    const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return week[day.getDay()]
  }

  function deleteTraining() {
    deleteATraining(training._id)
      .then(runnerTrainings)
      .then((training) => setAllTrainings([...training]))
  }

  function addClass(event) {
    const element = event.currentTarget;
    element.classList.add('flipped');

    const endOfAnimation = () => {
      element.classList.remove('flipped');
      element.removeEventListener('animationend', endOfAnimation)
    };
    element.addEventListener('animationend', endOfAnimation)
  }

  return (
    <div className={`training ${training.feedback}`} onClick={addClass}>
      <div className='delete'>
        <p>{daysOfWeek(training.date)}</p> {!training.feedback && (
          <span onClick={() => deleteTraining()}>❌</span>)}
      </div>

      <div><h2>{getDate(training.date)}</h2></div>
      <div>{distanceKm(training.distance)} km</div>

      {new Date(training.date) <= today && (
        <div className='feedback'>
          <span onClick={() => clickedFeedback('light')}>😃</span>
          <span onClick={() => clickedFeedback('ok')}>😐</span>
          <span onClick={() => clickedFeedback('hard')}>🥵</span>
        </div>
      )}

      <div>
        <small>Days until the race: {differenceDays}</small>
      </div>
    </div>
  )

}

export default Training;
