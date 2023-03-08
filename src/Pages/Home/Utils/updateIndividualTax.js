const updateIndividualTax = (billionaire, newTax, billionaires) => {
  let updatedBillionaires = billionaires.map((a) => {
    return { ...a };
  });
  let index = updatedBillionaires.findIndex(
    (b) => b.billionaire === billionaire
  );
  updatedBillionaires[index].individualTax = newTax;
  return updatedBillionaires;
};

export default updateIndividualTax;
