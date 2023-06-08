import './weeklyTraining.css';
import {getRunnerInfo} from '../../apiServices';
import { useEffect, useState } from 'react';

function WeeklyTraining(){
    const [runnerInfo, setRunnerInfo] = useState([]);

    useEffect(() =>{
        getRunnerInfo()
        .then((runner) => setRunnerInfo(runner));

        console.log(runnerInfo)
        },[]);

    function getDate(date){
        const day = date.getDate();
        const month = date.getMonth();

        function dayLetter(day) {
            if(day[day.length-1] === 1){
            return `${day}st`
        }   
            else if(day[day.length-1] === 2){
            return `${day}nd`
        }
        else if(day[day.length-1] === 3){
            return `${day}rd`
        }
        else{
            return `${day}th` 
        }
    }

        const monthLetter = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return dayLetter(day) + ' of ' + monthLetter[month]
    }


if (runnerInfo.length > 0) {
    return(
        <div>
        <div className='race'>
            <div className='yourRace'>
            <h2>Your race...</h2>
            </div>

            <div className='raceDetails'>

            <div className='raceInfo'>
            <div>
                On: <strong>{getDate(new Date(runnerInfo[0].race.dateRace))}</strong>
            </div>
            <div>
                Distance: <strong>{runnerInfo[0].race.distanceRace} km.</strong>
            </div>
            <div>
                Elevation: <strong>{runnerInfo[0].race.elevation} meters.</strong>
                </div>
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

export default WeeklyTraining;
