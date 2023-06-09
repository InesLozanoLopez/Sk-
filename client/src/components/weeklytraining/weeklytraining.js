import { useEffect, useState } from 'react';
import './weeklytraining.css';
import {editATraining} from './../../apiServices';


function WeeklyTraining({training, getDate, runnerInfo, setAllTrainings, allTrainings}){
    const [feedback, setFeedback] = useState('');

    const daysToRace = new Date(runnerInfo[0].race.dateRace).getTime() - new Date(training.date).getTime();
    const differenceDays = Math.floor(daysToRace/ (1000 * 60 *60 *24));

    useEffect(()=> {
        editATraining(feedback, training._id)
        .then((trainings) => {
            setAllTrainings([...allTrainings, trainings])
        })
            // eslint-disable-next-line
    },[feedback])

    function clickedFeedback(value){
        setFeedback(value);
    }

    return(
        <div className={`training ${feedback}`}>
            <div><h2>{getDate(training.date)}</h2></div>
            <div>{training.distance} km</div>
            <div className='feedback'>
                <button onClick={() => clickedFeedback('light')}>😃</button>
                <button onClick={() => clickedFeedback('ok')}>😐</button>
                <button onClick={() => clickedFeedback('hard')}>🥵</button>
            </div>
            <div>
                <small>Days until the race: {differenceDays}</small></div>
        </div>
    )
}

export default WeeklyTraining;
