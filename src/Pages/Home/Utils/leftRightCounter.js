const leftRightCounter = (xValue, [...data], [...wealthData], toggle) => {
  var totPopulation = 0;
  var peopleToLeft = 0;
  var popOrWealthData;

  if (!toggle) {
    popOrWealthData = data;
  } else {
    popOrWealthData = wealthData;
  }

  for (let i = 0; i < popOrWealthData.length; i++) {
    if (popOrWealthData[i].income <= xValue) {
      peopleToLeft += popOrWealthData[i].population;
    } else {
      break;
    }
  }
  for (let i = 0; i < popOrWealthData.length; i++) {
    totPopulation += popOrWealthData[i].population;
  }

  const poepleToRight = totPopulation - peopleToLeft;
  const peopleCount = ((peopleToLeft / totPopulation) * 100).toFixed(1);
  let textLeft = peopleCount + "%";
  let textRight = (100 - peopleCount).toFixed(1) + "%";

  if (peopleCount <= 0.001) {
    textLeft = "< 0.001 %";
    textRight = "> 99.99 %";
  } else if (100 - peopleCount <= 0.001) {
    textRight = " < 0.001 %";
    textLeft = "> 99.99 %";
  }

  return [textLeft, textRight, peopleToLeft, poepleToRight];
};

export default leftRightCounter;
