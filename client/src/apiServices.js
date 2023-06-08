const baseURL = 'http://localhost:3001'

exports.newRunner = async (runnerName, {race}, {currentCondition}, {trainingAvailability}) => {
    try{
    const newRunner = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({name: runnerName, race: {race}, currentCondition:{currentCondition}, trainingAvailability:{trainingAvailability}})
    }
    console.log('new Runner', newRunner)
    const runner = await fetch(baseURL + '/newrunner', newRunner);
    const data = await runner.json();
    console.log('data', data)

    return data;
    }catch(e){
        console.log('Error from apiServices')
    }
}

exports.getRunnerInfo = async (runnerName) => {
    try{
        const getInfo = await fetch(baseURL + `/runner${runnerName}`);
        const data = await getInfo.json();
        return data;
        
    }catch(e){
        console.log('Error from ApiServices')
    }
}