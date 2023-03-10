import formatNumbers from "./formatNumbers";

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

  let peopleToRight = totPopulation - peopleToLeft;
  let peopleCount = ((peopleToLeft / totPopulation) * 100).toFixed(1);
  let textLeft = peopleCount + "%";
  let textRight = (100 - peopleCount).toFixed(1) + "%";

  if (peopleCount <= 0.01) {
    textLeft = "< 0.01 %";
    textRight = "> 99.9 %";
  } else if (100 - peopleCount <= 0.01) {
    textRight = " < 0.01 %";
    textLeft = "> 99.9 %";
  }

  if (peopleToLeft < 1000) {
    peopleToLeft = "< 1k";
    peopleToRight = formatNumbers(peopleToRight);
  } else if (peopleToRight < 1000) {
    peopleToRight = "< 1k";
    peopleToLeft = formatNumbers(peopleToLeft);
  } else {
    peopleToLeft = formatNumbers(peopleToLeft);
    peopleToRight = formatNumbers(peopleToRight);
  }

  return [textLeft, textRight, peopleToLeft, peopleToRight];
};

export default leftRightCounter;
