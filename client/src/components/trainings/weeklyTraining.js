import './weeklyTraining.css';
import {getRunnerInfo} from '../../apiServices';
import { useEffect, useState } from 'react';

function WeeklyTraining(){
    const [runnerInfo, setRunnerInfo] = useState([]);

    useEffect(() =>{
        getRunnerInfo()
        .then((runner) => setRunnerInfo(runner))
        console.log(runnerInfo)
    },[]);

if (runnerInfo.length > 0) {
    return(
        <div>


        <div className='race'>
            
        </div>
        </div>
    )
}



}

export default WeeklyTraining;
