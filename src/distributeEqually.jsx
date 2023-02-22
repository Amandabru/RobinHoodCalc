const distributeEqually = (data, incomeMax, collectedTax) => {
  var popUnderLimit = 0; // amount of pop under the tax limit((100dollars))
  for (let i = 0; i < csvData.length; i++) {
    if (csvData[i].income <= incomeMax) {
      popUnderLimit += csvData[i].population;
    }
  }
  var popShare = collectedTax / popUnderLimit;
  for (let i = csvData.length - 1; i >= 0; i--) {
    if (csvData[i].income <= incomeMax) {
      // Calculate new income
      const newIncome2 = csvData[i].income + popShare;
      // Find index of the incomebracket that is the closest match
      var indexNewIncome = closestIndex(csvData, newIncome2);
      // If the new income bracket is not the same as the original bracket, move the population
      if (indexNewIncome !== i) {
        data[indexNewIncome].population += data[i].population;
        data[i].population = 0;
      }
    }
  }
  return data;
};

export default distributeEqually;
