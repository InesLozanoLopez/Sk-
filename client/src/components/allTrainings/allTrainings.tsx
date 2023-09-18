import React from 'react';
import './allTrainings.css';
import Training from '../trainings/training';
import { IRunnerProfile, ITrainings } from './../../../../server/interfaces';
import { useEffect, useState } from 'react';
import { runnerTrainings, getRunnerInfo } from '../../apiServices';
import { allTrainingByMonth } from './functions';
import { Link } from 'react-router-dom';

const AllTrainings: React.FC = () => {
  const [runnerInfo, setRunnerInfo] = useState<IRunnerProfile | null>(null);
  const [allTrainings, setAllTrainings] = useState<ITrainings[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [runnerData, trainingData] = await Promise.all([
          getRunnerInfo(),
          runnerTrainings(),
        ]);
        setRunnerInfo(runnerData);
        setAllTrainings(trainingData);
      } catch (e) {
        console.log('Error fetching data', e);
      }
    };
    fetchData();
  }, []);

  const allTrainingsSorted: ITrainings[] = allTrainings.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div>
      <Link to="/runner">
        <input
          className="allTrainingsButton"
          type="button"
          value="Back to Runner Profile"
        />
      </Link>
      <div className="allTraining">
        {Object.entries(allTrainingByMonth(allTrainingsSorted)).map(
          ([monthYear, trainings]: [string, ITrainings[]]) => {
            const [month, year] = monthYear.split('-');
            return (
              <div key={monthYear}>
                <h2>
                  {month} {year}
                </h2>
                <div
                  className="trainingsContainer"
                  tabIndex={0}
                  role="region"
                  aria-label="All trainings per month"
                >
                  {trainings.map((training) => (
                    <Training
                      key={training._id}
                      training={training}
                      runnerInfo={runnerInfo[0]}
                      setAllTrainings={setAllTrainings}
                    />
                  ))}
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};

export default AllTrainings;
