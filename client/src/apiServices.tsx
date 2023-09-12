import { IRunnerProfile, ITrainings } from "../../server/TypeScript/interfaces";

const baseURL = 'http://localhost:3001';

export async function newRunner({ name, race, currentValues, trainingAvailability }: IRunnerProfile): Promise<any> {
  try {
    const newRunner = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, race: race, currentValues: currentValues, trainingAvailability: trainingAvailability })
    }
    const runner = await fetch(baseURL + '/runner', newRunner);
    const data = await runner.json();
    return data;
  } catch (e) {
    console.log('Error from apiServices', e)
  }
}

export async function getRunnerInfo(): Promise<IRunnerProfile> {
  try {
    const getInfo = await fetch(baseURL + '/runner');
    const data = await getInfo.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
}

export async function runnerCreateTrainings({date, distance, kmToIncrease, _id}: ITrainings): Promise<ITrainings[]> {
  try {
    const trainingProfile = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, distance, kmToIncrease: kmToIncrease, _id })
    }
    const trainingCreated = await fetch(baseURL + '/training', trainingProfile);
    const data = await trainingCreated.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
}

export async function runnerTrainings(): Promise<ITrainings[]> {
  try {
    const trainings = await fetch(baseURL + '/training');
    const data = await trainings.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
}

export async function editATraining(feedback: string, _id: string): Promise<ITrainings> {
  try {
    const editTrainings = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback: feedback })
    }
    const update = await fetch(baseURL + `/training/${_id}`, editTrainings);
    const data = await update.json();
    return data;

  } catch (e) {
    console.log('Error from ApiServices', e);
  }
}

export async function deleteATraining(_id: string): Promise<void> {
  try {
    const deletedTraining = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
    const deleted = await fetch(baseURL + `/training/${_id}`, deletedTraining);
    const data = await deleted.json();
    return data;
  } catch (e) {
    console.log('Error from APIServices', e)
  }
}

export async function deleteProfile(_id: string): Promise<void> {
  try {
    const deleteRunner = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    }
    const deleted = await fetch(baseURL + `/runner/${_id}`, deleteRunner);
    const data = await deleted.json();
    return data;
  }catch(e){
    console.log('Error from APIServices', e)
  }
}