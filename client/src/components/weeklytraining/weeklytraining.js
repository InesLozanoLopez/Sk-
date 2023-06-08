import './weeklytraining.css';
import {runnerTrainings} from '../../apiServices'
import { useState } from 'react';


function WeeklyTraining(){
    const [allTrainings, setAllTrainings] = useState([]);

    useEffect(() => {
        runnerTrainings()
        .then((training) => setAllTrainings(training))
    })

    }

    return(
        <div>

        </div>
    )
}

export default WeeklyTraining;
