import formatNumbers from './formatNumbers';

const levelCounter = (x1Value, x2Value, [...data]) => {
  var people = 0;

  x1Value == undefined ? (x1Value = 0) : (x1Value = x1Value);

  for (let i = 0; i < data.length; i++) {
    if (data[i].income >= x1Value && data[i].income <= x2Value) {
      people += data[i].population;
    }
  }

  people < 1000 ? (people = 'few') : (people = formatNumbers(people));

  return people;
};

export default levelCounter;
