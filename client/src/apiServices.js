const baseURL = 'http://localhost:3001'

exports.newRunner = async (runnerName, {race}, {currentValues}, {trainingAvailability}) => {
    try{
    const newRunner = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({name: runnerName, race: {race}, currentValues:{currentValues}, trainingAvailability:{trainingAvailability}})
    }
    const runner = await fetch(baseURL + '/newrunner', newRunner);
    const data = await runner.json();
    return data;
    }catch(e){
        console.log('Error from apiServices', e)
    }
}

exports.getRunnerInfo = async () => {
    try{
        const getInfo = await fetch(baseURL + `/runner`);
        const data = await getInfo.json();
        return data;
        
    }catch(e){
        console.log('Error from ApiServices', e)
    }
}

exports.runnerTrainings = async (training) =>{
    try{
        const training = {
            method: 'POST',
            headers: {'Content-Type' :'application/json'},
            body: JSON.stringify({training})
        }
        const trainingCreated = await fetch(baseURL + '/runner');
        const data = await trainingCreated.json();
        return data;

    }catch(e){
        console.log('Error from ApiServices', e)
    }
}