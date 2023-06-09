import { useState } from 'react';
import './newRunner.css';
import { newRunner, runnerCreateTrainings } from '../../apiServices';
// import 



function NewRunner() {

    let profileAtDb = true;

    const [runnerName, setRunnerName] = useState('');
    const [dateRace, setDateRace] = useState('');
    const [distanceRace, setDistanceRace] = useState(0);
    const [timeObj, setTimeObj] = useState('00:00:00');
    const [elevation, setElevation] = useState(0);
    const [longDistance, setLongDistance] = useState(0);
    const [sprintTime, setSprintTime] = useState('00:00:00');
    const [sprintDistance, setSprintDistance] = useState(0);
    const [daysPerWeek, setDaysPerWeek] = useState(0);
    const [daysOff, setDaysOff] = useState([]);
    const [holidaysFrom, setHolidaysFrom] = useState('');
    const [holidaysTo, setHolidaysTo] = useState('');


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
    const minsPerKm = timeObjInMins(timeObj) / distanceRace

    const race = {
        dateRace,
        distanceRace,
        timeObj,
        minsPerKm,
        elevation,
    }
    const currentValues = {
        longDistance,
        // sprintTime,
        // sprintDistance,
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

    const trainingAvailability = {
        daysPerWeek,
        daysOff,
        holidays: holidays(holidaysFrom, holidaysTo)
    }

    function createNewProfile() {
        if (profileAtDb) {
            newRunner(runnerName, { race }, { currentValues }, { trainingAvailability }).then(profileAtDb = false).then(console.log(profileAtDb, 'new runner created'))
        } else {
            console.log('max user register')
        }
    }

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
    }


    return (
        <div className='form'>

            <h2>Name</h2>
            <input type='text' placeholder='Your name...' value={runnerName} onChange={(event) => setRunnerName(event.target.value)} />

            <h2>Race and Objectives</h2>
            <small>When is is the race taking place?</small>
            <input type='date' value={dateRace} onChange={(event) => setDateRace(event.target.value)}></input>
            <small>How long is this race? (distance in km)</small>
            <input type='text' value={distanceRace} onChange={(event) => setDistanceRace(event.target.value)}></input>
            <small>In how many hours you would like to complete the run</small>
            <input type='time' value={timeObj} onChange={(event) => setTimeObj(event.target.value)}></input>
            <small>How many meter of gain elevation has in total this event?</small>
            <input type='text' value={elevation} onChange={(event) => setElevation(event.target.value)}></input>

            <h2>Your current numbers</h2>
            <small>How long was your most recent longest run? (distance in km)</small>
            <input type='text' value={longDistance} onChange={(event) => setLongDistance(event.target.value)}></input>
            <small>What is you most recent best mark? (distance in km of your faster short distance run)</small>
            <input type='text' value={sprintDistance} onChange={(event) => setSprintDistance(event.target.value)}></input>
            <small>How fast that sprint was? (time to complete)</small>
            <input type='time' value={sprintTime} onChange={(event) => setSprintTime(event.target.value)}></input>

            <h2>Planning your trainings</h2>
            <small>How many days per week you would like to training? (Min recommended 4, max recommended 6)</small>
            <input type='text' value={daysPerWeek} onChange={(event) => setDaysPerWeek(event.target.value)}></input>

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

            <input type='submit' value='Create training' onClick={(event) => {
                event.preventDefault();
                createNewProfile();
                kmsPerDay();
                createTraining();
                // history.push('/runner');
            }} />
        </div>
    )

}

export default NewRunner;