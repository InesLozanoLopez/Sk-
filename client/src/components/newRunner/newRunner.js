import {useState} from 'react';
import './newRunner.css';
import {newRunner} from '../../apiServices'


function NewRunner(){
const [runnerName, setRunnerName] = useState('');
const [dateRace, setDateRace] = useState('');
const [distanceRace, setDistanceRace] = useState(0);
const [timeObj, setTimeObj] = useState('00:00:00');
const [elevation, setElevation] = useState(0);
const [longDistance, setLongDistance] = useState(0);
const [sprintTime, setSprintTime] = useState('00:00:00');
const [sprintDistance, setSprintDistance] = useState('00:00:00');
const [daysPerWeek, setDaysPerWeek] = useState(0);
const [daysOff, setDaysOff] = useState([]);
const [holidaysFrom, setHolidaysFrom] = useState('');
const [holidaysTo, setHolidaysTo] = useState('');


const daysOffPerWeek = [
    {id:'monday', label: 'Monday'},
    {id:'tuesday', label: 'Tuesday'},
    {id:'wednesday', label: 'Wednesday'},
    {id:'thursday', label: 'Thursday'},
    {id:'friday', label: 'Friday'},
    {id:'saturday', label: 'Monday'},
    {id:'sunday', label: 'Sunday'}
];

function timeObjInMins(time){
    const [hours, minutes] = time.split(':');
    return hours*60 + minutes
}
const minsPerMeters = timeObjInMins(timeObj)/parseFloat(distanceRace)

const race = {
    dateRace,
    distanceRace,
    timeObj,
    minsPerMeters,
    elevation,
}
const currentValues = {
    longDistance,
    sprintTime,
    sprintDistance,
}

function holidays(holidaysFrom, holidaysTo){
    const days = new Date(holidaysFrom)
    const holidayDays = [];
    while(days <= holidaysTo){
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

function createNewProfile(){
    newRunner(runnerName, {race}, {currentValues}, {trainingAvailability})
}


    return (
        <div className='form'>

            <h2>Name</h2>
            <input type='text' placeholder='Your name...' value={runnerName} onChange={(event) => setRunnerName(event.target.value)}/>
            
            <h2>Race and Objectives</h2>
            <small>When is is the race taking place?</small>
            <input type='date' value={dateRace} onChange={(event) => setDateRace(event.target.value)}></input>
            <small>How long is this race? (distance in meters)</small>
            <input type='text' value={distanceRace} onChange={(event) => setDistanceRace(event.target.value)}></input>
            <small>In how many hours you would like to complete the run</small>
            <input type='time' value={timeObj} onChange={(event) => setTimeObj(event.target.value)}></input>
            <small>How many meter of gain elevation has in total this event?</small>
            <input type='text' value={elevation} onChange={(event) => setElevation(event.target.value)}></input>

            <h2>Your current numbers</h2>
            <small>How long was your most recent longest run? (distance in meters)</small>
            <input type='text' value={longDistance} onChange={(event) => setLongDistance(event.target.value)}></input>
            <small>What is you most recent best mark? (distance of your faster short distance run)</small>
            <input type='text' value={sprintTime} onChange={(event) => setSprintTime(event.target.value)}></input>
            <small>How fast that sprint was? (time to complete)</small>
            <input type='time' value={sprintDistance} onChange={(event) => setSprintDistance(event.target.value)}></input>

            <h2>Planning your trainings</h2>
            <small>How many days per week you would like to training? (Min recommended 4, max recommended 6)</small>
            <input type='text' value={daysPerWeek} onChange={(event) => setDaysPerWeek(event.target.value)}></input>
            
            <small>Which days of the week you do NOT want to training?</small>
            <select multiple value={daysOff} onChange={(event) => {
                const newValue = Array.from(event.target.selectedOptions, option => option.value);
                setDaysOff((prevState)=> [...prevState, ...newValue])
                }}>
            {daysOffPerWeek.map((day) => (
            <option key={day.id} value={day.id}>
            {day.label}
            </option>
            ))}
            </select>

            <small>Have you planned any holidays before the race?</small>
            <small>From (first day you cannot training):</small>
            <input type='date' value={holidaysFrom} onChange={(event) => setHolidaysFrom(event.target.value)}/>
            <small>To (including):</small>
            <input type='date' value={holidaysTo} onChange={(event) => setHolidaysTo(event.target.value)}/>

            <input type='submit' value='Create training' onClick={(event)=>{
                event.preventDefault();
                createNewProfile()
            }}/>
        </div>
    )

}

export default NewRunner;