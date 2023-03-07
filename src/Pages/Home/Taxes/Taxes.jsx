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
  onChangeBillionaireList
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
        onChangeBillionaireList={(billionaireList) => 
        onChangeBillionaireList(billionaireList)}
      />
    </div>
  );
};

export default Taxes;
