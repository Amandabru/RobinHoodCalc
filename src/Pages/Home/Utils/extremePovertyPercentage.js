const extremePovertyPercentage = ([...data]) => {
  var totPopulation = 0;
  var peopleInExtremePoverty = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].income <= 2) {
      peopleInExtremePoverty += data[i].population;
    } else {
      break;
    }
  }

  for (let i = 0; i < data.length; i++) {
    totPopulation += data[i].population;
  }
  return ((peopleInExtremePoverty / totPopulation) * 100).toFixed(0) + '%';
};

export default extremePovertyPercentage;
