import './runnerProfile.css';
import {getRunnerInfo} from '../../apiServices';
import { useEffect, useState } from 'react';
import {runnerTrainings} from '../../apiServices'
import Weeklytraining from '../weeklytraining/weeklytraining';

function RunnerProfile(){
    const [runnerInfo, setRunnerInfo] = useState([]);
    const [allTrainings, setAllTrainings] = useState([]);

        useEffect(() => {
        getRunnerInfo()
        .then((runner) => setRunnerInfo(runner))

        
        // eslint-disable-next-line
        }, []);


    useEffect(() => {
        runnerTrainings()
        .then((training) => setAllTrainings(training))

// eslint-disable-next-line
    }, []);
    

    function getDate(dates){
        const date = new Date(dates)
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

    const allTrainingsSorted = allTrainings.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

if (runnerInfo.length > 0) {
    return(
        <div>
        <div className='trainingsContainer'>
            {allTrainingsSorted.map((training, id) => {
                return <Weeklytraining key={id} training={training} getDate={getDate} runnerInfo={runnerInfo} setAllTrainings={setAllTrainings} allTrainings={allTrainings}/>
            })}
        </div>  
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

export default RunnerProfile;
