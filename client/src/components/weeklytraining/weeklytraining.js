import './weeklytraining.css';


function WeeklyTraining({training, getDate}){


    return(
        <div className='training'>
            <div>{getDate(training.date)}</div>
            <div>{training.distance} km</div>
        </div>
    )
}

export default WeeklyTraining;
