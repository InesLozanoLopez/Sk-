import React from 'react'
import { useState} from 'react';
import './newRunner.css';
import { newRunner, runnerCreateTrainings } from '../../apiServices';
import {useNavigate} from 'react-router-dom';



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

  //CREATE A PROFILE

  const daysOffPerWeek = [
    { id: '1', label: 'Monday' },
    { id: '2', label: 'Tuesday' },
    { id: '3', label: 'Wednesday' },
    { id: '4', label: 'Thursday' },
    { id: '5', label: 'Friday' },
    { id: '6', label: 'Monday' },
    { id: '7', label: 'Sunday' }
  ];

  function timeObjInMins(time) {
    const [hours, minutes] = time.split(':');
    return hours * 60 + parseInt(minutes, 10);
  }

  const minsPerKm = timeObjInMins(timeObj) / distanceRace;

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
    holidays: holidays(holidaysFrom, holidaysTo)
  }


  function holidays(holidaysFrom, holidaysTo) {
    const days = new Date(holidaysFrom);
    const endDay = new Date(holidaysTo)
    const holidayDays = [];
    while (days <= endDay) {
      holidayDays.push(new Date(days));
      days.setDate(days.getDate() + 1);
    }
    return holidayDays;
  }

   
  function createNewProfile() {
    if (profileAtDb) {
      newRunner(runnerName, { race }, { currentValues }, { trainingAvailability }).then(profileAtDb = false).then(console.log(profileAtDb, 'new runner created'))
    } else {
      console.log('max user register')
    }
  }

  //CREATE TRAININGS

  let trainingsDaysFilteredHolidays = [];
  
  function kmsPerDay() {
    const raceDay = new Date(dateRace);
    const currentDay = new Date();
    const daysUntilRaceArr = [];

    while (currentDay <= raceDay) {
      daysUntilRaceArr.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    const kmToIncrease = distanceRace - longDistance;
    const trainingsDaysFilteredDaysOff = daysUntilRaceArr.filter((day) => !daysOff.includes(day.getDay().toString()));

    trainingsDaysFilteredHolidays = trainingsDaysFilteredDaysOff.filter((day) => day < new Date(holidaysFrom) || day > new Date(holidaysTo));
    const kmPerDay = kmToIncrease / trainingsDaysFilteredHolidays.length;

    return kmPerDay;
  }

  function createTraining() {
    if (trainingsDaysFilteredHolidays.length === 0) {
      console.log('No training days available')
    }
    const trainingDate = trainingsDaysFilteredHolidays;
    let kmToRun = Number(longDistance);
    const kmToIncrease = kmsPerDay()

    function increaseKm() {
      if (kmToRun < Number(distanceRace)) {
        kmToRun += kmToIncrease
      } else {
        kmToRun = longDistance;
      }
    }

    while (trainingDate.length > 0) {
      runnerCreateTrainings(trainingDate.shift().toISOString().split('T')[0], kmToRun)
        .then(increaseKm())
    }
    navigate('/runner')
  }


  return (
    <div className='form'>
      <h2>Name</h2>
      <input type='text' placeholder='Your name...' pattern= "[A-Za-z]+" value={runnerName} onChange={(event) => setRunnerName(event.target.value)} />

      <h2>Race and Objectives</h2>
      <small>When is is the race taking place?</small>
      <input type='date' value={dateRace} onChange={(event) => setDateRace(event.target.value)}/>
      <small>How long is this race? (distance in km)</small>
      <input type='text' value={distanceRace} pattern= "[0-9]" onChange={(event) => setDistanceRace(event.target.value)}/>
      <small>In how many hours you would like to complete the run</small>
      <input type='time' value={timeObj} onChange={(event) => setTimeObj(event.target.value)}/>
    
      <h2>Your current numbers</h2>
      <small>How long was your most recent longest run? (distance in km)</small>
      <input type='text' value={longDistance} pattern= "[0-9]" onChange={(event) => setLongDistance(event.target.value)}/>

      <h2>Planning your trainings</h2>
      <small>Which days of the week you do NOT want to training?</small>
      <select multiple value={daysOff} onChange={(event) => {
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
      <input type='date' value={holidaysFrom} onChange={(event) => setHolidaysFrom(event.target.value)} />
      <small>To (including):</small>
      <input type='date' value={holidaysTo} onChange={(event) => setHolidaysTo(event.target.value)} />
      <input className='newRunnerButton' type='submit' value='Create training' onClick={(event) => {
        event.preventDefault();
        createNewProfile();
        kmsPerDay();
        createTraining();
      }}/>
    </div>
  )

}

export default NewRunner;