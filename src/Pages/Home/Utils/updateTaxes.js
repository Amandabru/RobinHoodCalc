const updateTaxes = (taxBracketNr, { ...taxes }, newTax) => {
  taxes[taxBracketNr].taxRate = newTax;
  return taxes;
};

export default updateTaxes;
