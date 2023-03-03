import closestIndex from './helpers';

const distributeEqually = (data, incomeMax, collectedTax) => {
  var popUnderLimit = 0; // amount of pop under the tax limit((100dollars))
  for (let i = 0; i < data.length; i++){
    if (data[i].income <= incomeMax) {
      popUnderLimit += data[i].population;
    }
  }
  var popShare = collectedTax / popUnderLimit;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].income <= incomeMax) {
      const newIncome = data[i].income + popShare;
      const closestFullIndex = closestIndex(data, newIncome);
      var redistPot = popShare*data[i].population;
      
      const diffToNext = data[closestFullIndex].income - data[i].income;
      const population = data[i].population;
      redistPot = redistPot - (diffToNext * population);
      data[closestFullIndex].population += population;
      data[i].population -= population;
      // Remains
      const moveRemains = redistPot/(data[closestFullIndex + 1].income - data[closestFullIndex].income);
      if (moveRemains >= 1){    
      data[closestFullIndex + 1].population += moveRemains;
      data[closestFullIndex].population -= moveRemains;
      }
    }
  }
  return data;
};

export default distributeEqually;
