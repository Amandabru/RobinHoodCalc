const levelCounter = (x1Value, x2Value, [...data]) => {
  // var totPopulation = 0;
  var people = 0;

  x1Value == undefined ? (x1Value = 0) : (x1Value = x1Value);

  for (let i = 0; i < data.length; i++) {
    if (data[i].income >= x1Value && data[i].income <= x2Value) {
      people += data[i].population;
    }
  }
  /*
  for (let i = 0; i < data.length; i++) {
    totPopulation += data[i].population;
  }

  console.log("people: " + people);*/

  people == 0 ? (people = "few") : (people = people);

  let formatPeople = people.toLocaleString("en-US");

  return formatPeople;
};

export default levelCounter;
