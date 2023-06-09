import './weeklytraining.css';


function WeeklyTraining({training, getDate, runnerInfo}){

    const daysToRace = new Date(runnerInfo[0].race.dateRace).getTime() - new Date(training.date).getTime();
    const differenceDays = Math.floor(daysToRace/ (1000 * 60 *60 *24));

    return(
        <div className='training'>
            <div><h2>{getDate(training.date)}</h2></div>
            <div>{training.distance} km</div>
            <div className='feedback'>
                <button>😃</button>
                <button>😐</button>
                <button>🥵</button>
            </div>
            <div>
                <small>Days until the race: {differenceDays}</small></div>
        </div>
    )
}

export default WeeklyTraining;
