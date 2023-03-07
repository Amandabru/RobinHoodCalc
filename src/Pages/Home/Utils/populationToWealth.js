
const populationToWealth = (data) => {
    let convertedData = JSON.parse(JSON.stringify(data));
    for(let i = 0; i < convertedData.length; i++){
        convertedData[i].population = Math.round(convertedData[i].population * convertedData[i].income);
    }
    return convertedData;
};

export default populationToWealth;