const setDefaultIndividualTax = (billionaires) => {
  let newBillionaires = billionaires.map((a) => {
    return { ...a };
  });
  newBillionaires.map((billionaire) => (billionaire.individualTax = 0));
  return newBillionaires;
};

export default setDefaultIndividualTax;
