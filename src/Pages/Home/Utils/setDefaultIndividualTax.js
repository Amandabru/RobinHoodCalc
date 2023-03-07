const setDefaultIndividualTax = (individualTaxes) => {
  let taxArray = individualTaxes.map((a) => {
    return { ...a };
  });
  taxArray.map((billionaire) => (billionaire.individualTax = 0));
  return taxArray;
};

export default setDefaultIndividualTax;
