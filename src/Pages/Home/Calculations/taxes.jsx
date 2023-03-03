const setDefaultTax = () => {
  const taxes = {
    1: { incomeMin: 100, incomeMax: 1000, taxRate: 0 },
    2: { incomeMin: 1000, incomeMax: 10000, taxRate: 0 },
    3: { incomeMin: 10000, incomeMax: 100000, taxRate: 0 },
    4: { incomeMin: 100000, incomeMax: 1000000, taxRate: 0 },
    5: { incomeMin: 1000000, incomeMax: 30000000, taxRate: 0 },
  };
  return taxes;
};

const updateTaxes = (taxBracketNr, { ...taxes }, newTax) => {
  console.log(taxes[taxBracketNr]);
  taxes[taxBracketNr].taxRate = newTax;
  return taxes;
};

export { updateTaxes, setDefaultTax };
