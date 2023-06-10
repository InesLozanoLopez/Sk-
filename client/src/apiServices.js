const baseURL = 'http://localhost:3001'

exports.newRunner = async (runnerName, { race }, { currentValues }, { trainingAvailability }) => {
  try {
    const newRunner = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: runnerName, race: { race }, currentValues: { currentValues }, trainingAvailability: { trainingAvailability } })
    }
    const runner = await fetch(baseURL + '/runner', newRunner);
    const data = await runner.json();
    return data;
  } catch (e) {
    console.log('Error from apiServices', e)
  }
}

exports.getRunnerInfo = async () => {
  try {
    const getInfo = await fetch(baseURL + '/runner');
    const data = await getInfo.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
};

exports.runnerCreateTrainings = async (trainingDate, kmToRun, kmToIncrease) => {
  try {
    const trainingProfile = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: trainingDate, distance: kmToRun, kmToIncrease: kmToIncrease})
    }
    const trainingCreated = await fetch(baseURL + '/training', trainingProfile);
    const data = await trainingCreated.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
};

exports.runnerTrainings = async () => {
  try {
    const trainings = await fetch(baseURL + '/training');
    const data = await trainings.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
}

exports.editATraining = async (feedback, id) => {
  try {
    const editTrainings = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback: feedback })
    }
    const update = await fetch(baseURL + `/training/${id}`, editTrainings);
    const data = await update.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
}

exports.deleteATraining = async (id) => {
  try{
    const deletedTraining = {
      method: 'DELETE',
      headers: { 'Content-Type' : 'application/json'},
    }
    const deleted = await fetch(baseURL + `/training/${id}`, deletedTraining);
    const data = await deleted.json();
    return data;
  } catch (e){
    console.log('Error from APIServices', e)
  }
}