const smoothDistribution = (data, collectedTax) => {
  let originalData = data.map((a) => {
    return { ...a };
  });
  for (let i = 0; i < data.length; i++) {
    let j = 1;
    while (data[i].population > 0 && collectedTax > 0) {
      /*The income difference between current bracket and the bracket we will move people to*/
      var incomeDiff = data[i + j].income - data[i].income;

      /*To avoid peaks, the maximum population of the bracket we want to move
        people to equals the population of the bracket after that*/
      var popMoveMax = Math.abs(
        data[i + j + 1].population - data[i + j].population
      );

      /*But if we go beyond the peak of the curve, the maximum population
        to be moved is calculated on original data to avoid accumulation*/
      if (data[i + j + 1].population - data[i + j].population < 0) {
        popMoveMax = Math.abs(
          originalData[i + j - 1].population - originalData[i + j].population
        );
      }

      const numberOfPeopleAffordMoveUp = Math.floor(collectedTax / incomeDiff);
      /*If we have enough money and people to align the upcoming bracket with the one after that..*/
      if (
        collectedTax >= popMoveMax * incomeDiff &&
        data[i].population >= popMoveMax
      ) {
        /*..then move all those people and update colleted tax*/
        collectedTax -= popMoveMax * incomeDiff;
        data[i + j].population += popMoveMax;
        data[i].population -= popMoveMax;
      } else if (collectedTax < popMoveMax * incomeDiff) {
        /*if we don't have enough money to align next bracket with the one after that*/
        /*check if we afford to move all people or more*/
        if (numberOfPeopleAffordMoveUp >= data[i].population) {
          /*if so, move all people and update collected tax*/
          collectedTax -= data[i].population * incomeDiff;
          data[i + j].population += data[i].population;
          data[i].population = 0;
        } else {
          /*if not, move all the people we can afford and return data*/
          collectedTax -= numberOfPeopleAffordMoveUp * incomeDiff;
          data[i + j].population += numberOfPeopleAffordMoveUp;
          data[i].population -= numberOfPeopleAffordMoveUp;
          return data;
        }
      } else {
        /*if we have enough money, but not enough people to align the upcoming bracket with the one after that*/
        /*then move all people and update collected tax*/
        collectedTax -= data[i].population * incomeDiff;
        data[i + j].population += data[i].population;
        data[i].population = 0;
      }
      j++;
    }
  }
  return data;
};

export default smoothDistribution;
