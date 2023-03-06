import closestIndex from './closestIndex';

const collectFromTheRich = (defaultData, taxes, defaultBillionaires) => {
  let collectedTax = 0;
  let data = defaultData.map((a) => {
    return { ...a };
  });
  let billionaires = defaultBillionaires.map((a) => {
    return { ...a };
  });
  for (let i = 0; i < defaultData.length; i++) {
    var partialCollectedTax = 0;
    for (const taxBracketNr in taxes) {
      if (taxes[taxBracketNr].incomeMin < defaultData[i].income) {
        if (defaultData[i].income < taxes[taxBracketNr].incomeMax) {
          partialCollectedTax +=
            (defaultData[i].income - taxes[taxBracketNr].incomeMin) *
            taxes[taxBracketNr].taxRate;
        } else {
          partialCollectedTax +=
            (taxes[taxBracketNr].incomeMax - taxes[taxBracketNr].incomeMin) *
            taxes[taxBracketNr].taxRate;
        }
      }
    }
    const newIncome = defaultData[i].income - partialCollectedTax;
    var indexNewIncome = closestIndex(defaultData, newIncome);
    if (indexNewIncome !== i) {
      data[indexNewIncome].population += data[i].population;
      data[i].population = 0;
    }
    collectedTax += partialCollectedTax * defaultData[i].population;
  }

  //Tax the ten richest the billionaires
  for (let i = 0; i < defaultBillionaires.length; i++) {
    partialCollectedTax = 0;
    for (const taxBracketNr in taxes) {
      if (taxes[taxBracketNr].incomeMin < defaultBillionaires[i].income) {
        if (defaultBillionaires[i].income < taxes[taxBracketNr].incomeMax) {
          partialCollectedTax +=
            (defaultBillionaires[i].income - taxes[taxBracketNr].incomeMin) *
            taxes[taxBracketNr].taxRate;
        } else {
          partialCollectedTax +=
            (taxes[taxBracketNr].incomeMax - taxes[taxBracketNr].incomeMin) *
            taxes[taxBracketNr].taxRate;
        }
      }
    }
    billionaires[i].income =
      defaultBillionaires[i].income - partialCollectedTax;
    collectedTax += partialCollectedTax;
  }
  return [collectedTax, data, billionaires];
};

export default collectFromTheRich;
