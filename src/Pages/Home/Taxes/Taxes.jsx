import React from 'react';
import TaxPopulation from '../TaxPopulation/TaxPopulation';
import TaxBillionaires from '../TaxBillionaires/TaxBillionaires';
import './taxes.css';

const Taxes = ({
  onTaxChange,
  clearAllTaxes,
  taxes,
  billionaires,
  onIndividualTaxChange,
  individualTaxes,
  clearAllIndividualTaxes,
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
        onIndividualTaxChange={(billionaire, newTax) =>
          onIndividualTaxChange(billionaire, newTax)
        }
        individualTaxes={individualTaxes}
        clearAllIndividualTaxes={() => clearAllIndividualTaxes()}
      />
    </div>
  );
};

export default Taxes;
