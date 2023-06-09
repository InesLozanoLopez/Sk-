const baseURL = 'http://localhost:3001'

exports.newRunner = async (runnerName, {race}, {currentValues}, {trainingAvailability}) => {
    try{
    const newRunner = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({name: runnerName, race: {race}, currentValues:{currentValues}, trainingAvailability:{trainingAvailability}})
    }
    const runner = await fetch(baseURL + '/runner', newRunner);
    const data = await runner.json();
    return data;
    }catch(e){
        console.log('Error from apiServices', e)
    }
}

exports.getRunnerInfo = async () => {
    try{
        const getInfo = await fetch(baseURL + '/runner');
        const data = await getInfo.json();
        return data;
        
    }catch(e){
        console.log('Error from ApiServices', e)
    }
}

exports.runnerCreateTrainings = async (trainingDate, kmToRun) =>{
    try{
        console.log('here')
        const trainingProfile = {
            method: 'POST',
            headers: {'Content-Type' :'application/json'},
            body: JSON.stringify({date: trainingDate, distance: kmToRun})
        }
console.log('trainingProfile post', trainingProfile)        
const trainingCreated = await fetch(baseURL + '/training', trainingProfile);
        const data = await trainingCreated.json();
        console.log('data post', data)        

        return data;

    }catch(e){
        console.log('Error from ApiServices', e)
    }
}

exports.runnerTrainings = async () => {
    try{
        const trainings = await fetch(baseURL + '/training');
        const data = await trainings.json();
        return data;
        
    }catch(e){
        console.log('Error from ApiServices', e)
    }
}