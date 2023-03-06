const giveToThePoor = ([...data], collectedTax) => {
  for (let i = 0; i < data.length; i++) {
    var incomeDiff = data[i + 1].income - data[i].income;
    if (collectedTax >= data[i].population * incomeDiff) {
      collectedTax -= data[i].population * incomeDiff;
      data[i + 1].population += data[i].population;
      data[i].population = 0;
    } else {
      data[i + 1].population += Math.floor(
        collectedTax / (data[i + 1].income - data[i].income)
      );
      data[i].population -= Math.floor(
        collectedTax / (data[i + 1].income - data[i].income)
      );
      return data;
    }
  }
};

export default giveToThePoor;
