const giveToThePoor2 = (data, collectedTax) => {
    for (let i = 0; i < data.length; i++) {
      let j = 1;
      while (data[i].population > 0 && collectedTax > 0) {
        // the income difference between current bracket and the one we will move people to
        var incomeDiff = data[i + j].income - data[i].income;
  
        //the max height of the bracket we want to move people to is the height of the bracket after that
        var popMoveMax = Math.abs(
          data[i + j + 1].population - data[i + j].population
        );
        const numberOfPeopleAffordMoveUp = Math.floor(collectedTax / incomeDiff);
        // if we have enough money and people to align the upcoming bracket with the one after that...
        if (
          collectedTax >= popMoveMax * incomeDiff &&
          data[i].population >= popMoveMax
        ) {
          //...then move all those people and update colleted tax
          collectedTax -= popMoveMax * incomeDiff;
          data[i + j].population += popMoveMax;
          data[i].population -= popMoveMax;
        }
  
        //if we don't have enough money to align next bracket with the one after that
        else if ( 
            collectedTax < popMoveMax * incomeDiff) {
           
            //check if we afford to move all people or more...
          if (numberOfPeopleAffordMoveUp >= data[i].population) {
            //...if so, move all people and update collected tax
            collectedTax -= data[i].population * incomeDiff;
            data[i + j].population += data[i].population;
            data[i].population = 0;
          } 
          //...if not, move all the people we can afford and return data
          else {
            collectedTax -= numberOfPeopleAffordMoveUp*incomeDiff
            data[i + j].population += numberOfPeopleAffordMoveUp;
            data[i].population -= numberOfPeopleAffordMoveUp;
            return data;
          }
        } 
        //if we have enough money, but not enough people to align the upcoming bracket with the one after that
        else {
          //...then move all people and update collected tax
          collectedTax -= data[i].population * incomeDiff;
          data[i + j].population += data[i].population;
          data[i].population = 0;
        }
        j++;
      }
    }
    return data;
  };
  
  export default giveToThePoor2;