const updateIndividualTax = (billionaire, newTax, individualTaxes) => {
  let taxArray = individualTaxes.map((a) => {
    return { ...a };
  });
  let index = taxArray.findIndex((b) => b.billionaire === billionaire);
  taxArray[index].individualTax = newTax;
  return taxArray;
};

export default updateIndividualTax;
