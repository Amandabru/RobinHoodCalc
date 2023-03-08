import React from 'react';
import TaxPopulation from '../TaxPopulation/TaxPopulation';
import TaxBillionaires from '../TaxBillionaires/TaxBillionaires';
import './taxes.css';

const Taxes = ({
  onTaxChange,
  clearAllTaxes,
  taxes,
  billionaires,
  setNewBillionaires,
}) => {
  return (
    <div className='taxationContainer'>
      <TaxPopulation
        onTaxChange={(taxBracketNr, newTax) =>
          onTaxChange(taxBracketNr, newTax)
        }
        clearAllTaxes={() => clearAllTaxes()}
        taxes={taxes}
      />
      <TaxBillionaires
        billionaires={billionaires}
        setNewBillionaires={(billionaires) => setNewBillionaires(billionaires)}
      />
    </div>
  );
};

export default Taxes;
