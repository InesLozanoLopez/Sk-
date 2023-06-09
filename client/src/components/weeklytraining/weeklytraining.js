import './weeklytraining.css';
import {editATraining, runnerTrainings} from './../../apiServices';


function WeeklyTraining({training, getDate, runnerInfo, setAllTrainings}){
    const daysToRace = new Date(runnerInfo[0].race.dateRace).getTime() - new Date(training.date).getTime();
    const differenceDays = Math.floor(daysToRace/ (1000 * 60 *60 *24));

    function clickedFeedback(value){
        if(value){
            editATraining(value, training._id)
            .then(runnerTrainings)
            .then((training) => setAllTrainings([...training]))
        }
    }

    function distanceKm(km){
        return km? km.toFixed(2) : '';
    }

    return(
        <div className={`training ${training.feedback}`}>
            <div><h2>{getDate(training.date)}</h2></div>
            <div>{distanceKm(training.distance)} km</div>
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
