const makePercentage = ([...data]) => {
  var newDataPercentage = data.map((a) => {
    return { ...a };
  });
  var totPopulation = 0;
  for (let i = 0; i < newDataPercentage.length; i++) {
    totPopulation += newDataPercentage[i].population;
  }
  console.log("totPopulation", totPopulation);
  for (let i = 0; i < newDataPercentage.length; i++) {
    newDataPercentage[i].population =
      ((newDataPercentage[i].population / totPopulation) * 100);
  }
  return newDataPercentage;
};

export default makePercentage;
