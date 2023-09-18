import React from 'react';
import './training.css';
import {
  editATraining,
  runnerTrainings,
  deleteATraining,
} from '../../apiServices';
import { formatDate } from '../runnerProfile/functions';
import { ITrainingProps } from './../../interfaces';

const Training: React.FC<ITrainingProps> = ({
  training,
  runnerInfo,
  setAllTrainings,
}) => {
  const daysToRace =
    new Date(runnerInfo.race.dateRace).getTime() -
    new Date(training.date).getTime();
  const differenceDays = Math.floor(daysToRace / (1000 * 60 * 60 * 24));

  const today = new Date();

  function clickedFeedback(feedback: string) {
    if (feedback) {
      try {
        if (new Date(training.date) <= today) {
          editATraining(feedback, training._id)
            .then(runnerTrainings)
            .then((training) => {
              console.log(training);
              setAllTrainings([...training]);
            });
        }
      } catch (e) {
        console.log('Error from ApiServices', e);
      }
    }
  }

  function distanceKm(km: number) {
    return km ? km.toFixed(2) : '';
  }

  function daysOfWeek(dateToConvert: number): string {
    const day = new Date(dateToConvert);
    const week = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return week[day.getDay()];
  }

  function deleteTraining() {
    deleteATraining(training._id, runnerInfo._id)
      .then(runnerTrainings)
      .then((training) => setAllTrainings([...training]));
  }

  function addClass(event) {
    const element = event.currentTarget;
    element.classList.add('flipped');

    const endOfAnimation = () => {
      element.classList.remove('flipped');
      element.removeEventListener('animationend', endOfAnimation);
    };
    element.addEventListener('animationend', endOfAnimation);
  }

  return (
    <div className={`training ${training.feedback}`} onClick={addClass}>
      <div className="delete">
        <p>{daysOfWeek(new Date(training.date).getTime())}</p>{' '}
        {!training.feedback && (
          <span
            onClick={() => deleteTraining()}
            role="img"
            aria-label="delete training"
          >
            ❌
          </span>
        )}
      </div>

      <div>
        <h2>{formatDate(new Date(training.date).getTime())}</h2>
      </div>
      <div>{distanceKm(training.distance)} km</div>

      {new Date(training.date) <= today && (
        <div className="feedback">
          <span
            onClick={() => clickedFeedback('light')}
            role="img"
            aria-label="no-effort training"
          >
            😃
          </span>
          <span
            onClick={() => clickedFeedback('ok')}
            role="img"
            aria-label="medium-effort training"
          >
            😐
          </span>
          <span
            onClick={() => clickedFeedback('hard')}
            role="img"
            aria-label="hard training"
          >
            🥵
          </span>
        </div>
      )}

      <div>
        <small>Days until the race: {differenceDays}</small>
      </div>
    </div>
  );
};

export default Training;
