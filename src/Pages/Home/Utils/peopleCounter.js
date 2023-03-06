const peopleCounter = (xValue, [...data]) => {
  var totPopulation = 0;
  var peopleToLeft = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].income <= xValue) {
      peopleToLeft += data[i].population;
    } else {
      break;
    }
  }
  for (let i = 0; i < data.length; i++) {
    totPopulation += data[i].population;
  }

  const peopleCount = ((peopleToLeft / totPopulation) * 100).toFixed(1);
  let textLeft = peopleCount + '%';
  let textRight = (100 - peopleCount).toFixed(1) + '%';

  if (peopleCount < 0.001) textLeft = 'few';
  else if ((100 - peopleCount).toFixed(1) < 0.001) textRight = 'few';

  return [textLeft, textRight];
};

export default peopleCounter;
