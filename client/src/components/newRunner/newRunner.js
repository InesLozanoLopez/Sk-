import React from 'react'
import { useState } from 'react';
import './newRunner.css';
import { newRunner, runnerCreateTrainings } from '../../apiServices';
import { useNavigate } from 'react-router-dom';
import { timeObjInMins, holidays, increaseKm, kmsPerDay, daysAvailable } from './functions';

function NewRunner() {
  const navigate = useNavigate();
  let profileAtDb = true;

  const [runnerName, setRunnerName] = useState('');
  const [dateRace, setDateRace] = useState('');
  const [distanceRace, setDistanceRace] = useState(0);
  const [timeObj, setTimeObj] = useState('00:00:00');
  const [longDistance, setLongDistance] = useState(0);
  const [daysOff, setDaysOff] = useState([]);
  const [holidaysFrom, setHolidaysFrom] = useState('');
  const [holidaysTo, setHolidaysTo] = useState('');

  const daysOffPerWeek = [
    { id: '1', label: 'Monday' },
    { id: '2', label: 'Tuesday' },
    { id: '3', label: 'Wednesday' },
    { id: '4', label: 'Thursday' },
    { id: '5', label: 'Friday' },
    { id: '6', label: 'Saturday' },
    { id: '7', label: 'Sunday' }
  ];

  const minsPerKm = timeObjInMins(timeObj) / distanceRace;
  const dateRange = { holidaysFrom, holidaysTo };

  const race = {
    dateRace,
    distanceRace,
    timeObj,
    minsPerKm,
  }
  const currentValues = {
    longDistance,
  }
  const trainingAvailability = {
    daysOff,
    holidays: holidays(dateRange)
  }

  //CREATE A PROFILE

  function createNewProfile() {
    if (runnerName === '' || dateRace === '' || distanceRace === 0 || timeObj === '00:00:00' || longDistance === 0) {
      alert('Please complete all the required form field')
    } else if (profileAtDb) {
      newRunner({runnerName, race, currentValues, trainingAvailability })
        .then(profileAtDb = false)
        .then(() => {
          createTraining();
        })
    } else {
      console.log('max user register')
    }
  }


  //CREATE TRAININGSs

  let ableToRun = Number(longDistance);

  const holidaysFiltered = daysAvailable({dateRace, daysOff, dateRange});
  const daysToTraining = holidaysFiltered.length;
  const kmToIncrease = Number(increaseKm(distanceRace, longDistance, daysToTraining));

  function createTraining() {
    const trainingsDaysFilteredHolidays = holidaysFiltered;
    if (trainingsDaysFilteredHolidays === 0) {
      alert('No training days available')
    }
    const trainingDate = trainingsDaysFilteredHolidays;

    while (trainingDate.length > 0) {
      let kmsToRunPerDay = Number(kmsPerDay({ableToRun, kmToIncrease, distanceRace}));

      runnerCreateTrainings(trainingDate.shift().toISOString().split('T')[0], kmsToRunPerDay, kmToIncrease, runnerName)
        .then(ableToRun = kmsToRunPerDay)
    }
    navigate('/runner')
  }


  return (
    <div className='form'>
      <h2>Name</h2>
      <input type='text' aria-label='Your name' placeholder='Your name...' pattern="[A-Za-z]+" value={runnerName} onChange={(event) => setRunnerName(event.target.value)} />

      <h2>Race and Objectives</h2>
      <small>When is is the race taking place?</small>
      <input type='date' aria-label='When your race is' value={dateRace} onChange={(event) => setDateRace(event.target.value)} />
      <small>How long is this race? (distance in km)</small>
      <input type='text' aria-label='how long your race is' value={distanceRace} pattern="[0-9]" onChange={(event) => setDistanceRace(event.target.value)} />
      <small>In how many hours you would like to complete the run</small>
      <input type='time' aria-label='what if you time objective' value={timeObj} onChange={(event) => setTimeObj(event.target.value)} />

      <h2>Your current numbers</h2>
      <small>How long was your most recent longest run? (distance in km)</small>
      <input type='text' aria-label='Your most recent longest run' value={longDistance} pattern="[0-9]" onChange={(event) => setLongDistance(event.target.value)} />

      <h2>Planning your trainings</h2>
      <small>Which days of the week you do NOT want to training?</small>
      <select multiple aria-label='which days of the week you do not want to training' value={daysOff} onChange={(event) => {
        const newValue = Array.from(event.target.selectedOptions, option => option.value);
        setDaysOff((prevState) => [...prevState, ...newValue])
      }}>

        {daysOffPerWeek.map((day) => (
          <option key={day.id} value={day.id}>
            {day.label}
          </option>
        ))}
      </select>

      <small>Have you planned any holidays before the race?</small>
      <small>From (first day you cannot training):</small>
      <input type='date' aria-label='from when you would be on holidays' value={holidaysFrom} onChange={(event) => setHolidaysFrom(event.target.value)} />
      <small>To (including):</small>
      <input type='date' aria-label='until when you would be on holidays' value={holidaysTo} onChange={(event) => setHolidaysTo(event.target.value)} />
      <input className='newRunnerButton' type='submit' value='Create training' onClick={(event) => {
        event.preventDefault();
        createNewProfile();
      }} />
    </div>
  )

}

export default NewRunner;