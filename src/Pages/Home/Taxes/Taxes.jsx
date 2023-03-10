import React from 'react';
import TaxPopulation from '../TaxPopulation/TaxPopulation';
import TaxBillionaires from '../TaxBillionaires/TaxBillionaires';
import './taxes.css';

const Taxes = ({
  onTaxChange,
  clearAllTaxes,
  taxes,
  billionaires,
  selectedBillionaires,
  setSelectedBillionaires,
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
        selectedBillionaires={selectedBillionaires}
        setSelectedBillionaires={(billionaires) =>
          setSelectedBillionaires(billionaires)
        }
      />
    </div>
  );
};

export default Taxes;
