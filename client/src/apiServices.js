const baseURL = 'http://localhost:3001';

export async function newRunner({ runnerName, race, currentValues, trainingAvailability }) {
  try {
    const newRunner = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: runnerName, race: race, currentValues: currentValues, trainingAvailability: trainingAvailability })
    }
    const runner = await fetch(baseURL + '/runner', newRunner);
    const data = await runner.json();
    return data;
  } catch (e) {
    console.log('Error from apiServices', e)
  }
}

export async function getRunnerInfo() {
  try {
    const getInfo = await fetch(baseURL + '/runner');
    const data = await getInfo.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
}

export async function runnerCreateTrainings({trainingDate, kmToRun, kmToIncrease, runnerName}) {
  try {
    const trainingProfile = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: trainingDate, distance: kmToRun, kmToIncrease: kmToIncrease, runnerName: runnerName })
    }
    const trainingCreated = await fetch(baseURL + '/training', trainingProfile);
    const data = await trainingCreated.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
}

export async function runnerTrainings() {
  try {
    const trainings = await fetch(baseURL + '/training');
    const data = await trainings.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
}

export async function editATraining(feedback, id) {
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

export async function deleteATraining(id) {
  try {
    const deletedTraining = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
    const deleted = await fetch(baseURL + `/training/${id}`, deletedTraining);
    const data = await deleted.json();
    return data;
  } catch (e) {
    console.log('Error from APIServices', e)
  }
}

export async function deleteProfile(id) {
  try {
    const deleteRunner = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    }
    const deleted = await fetch(baseURL + `/runner/${id}`, deleteRunner);
    const data = await deleted.json();
    return data;
  }catch(e){
    console.log('Error from APIServices', e)
  }
}