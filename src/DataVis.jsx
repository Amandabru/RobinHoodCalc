import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import AreaChartD3 from './AreaChartD3';
import closestIndex from './helpers';
import BoxSliders from './boxSliders';
import InGraphSlider from './inGraphSliders';
import './dataVis.css';

const csvUrl =
  'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/ccbd3e8c9dec23b78482dd47994d8faa49a1b96d/GapminderData.csv';

const billionairesCsvUrl =
  'https://gist.githubusercontent.com/Amandabru/791125eedbe23167f74f20b2739a53be/raw/203d2e923bffaef26d10a7f81da92337f59ab57b/billionairesData.csv';

const DataVis = () => {
  const [data, setData] = useState(null);
  const [taxes, setTaxes] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [ExtremePovertyCount, setExtremePovertyCount] = useState(9);
  const [billionaires, setBillionaires] = useState(null);
  const [csvBillionaires, setCsvBillionaires] = useState(null);

  const updateTaxes = (taxBracketNr, newTax) => {
    var newTaxes = { ...taxes };
    newTaxes[taxBracketNr].taxRate = newTax;
    setTaxes(newTaxes);
  };

  const clearAllTAxes = () => {
    var newTaxes = { ...taxes };
    for (const taxBracketNr in taxes) {
      newTaxes[taxBracketNr].taxRate = 0;
    }
    setTaxes(newTaxes);
  };

  // transform income data into percentages
  const makePercentage = (data) => {
    var newDataPercentage = data.map((a) => {
      return { ...a };
    });
    var totPopulation = 0;
    for (let i = 0; i < newDataPercentage.length; i++) {
      totPopulation += newDataPercentage[i].population;
    }
    for (let i = 0; i < newDataPercentage.length; i++) {
      newDataPercentage[i].population =
        (newDataPercentage[i].population / totPopulation) * 100;
    }
    return newDataPercentage;
  };

  // Collects money(tax) from the people above the incomeMin and moves population down the brackets accordingly
  // Returns the money and the modified data
  const collectFromTheRich = (data, collectedTax, taxes, billionaires) => {
    for (let i = 0; i < csvData.length; i++) {
      var partialCollectedTax = 0;
      for (const taxBracketNr in taxes) {
        if (taxes[taxBracketNr].incomeMin < csvData[i].income) {
          if (csvData[i].income < taxes[taxBracketNr].incomeMax) {
            partialCollectedTax +=
              (csvData[i].income - taxes[taxBracketNr].incomeMin) *
              taxes[taxBracketNr].taxRate;
          } else {
            partialCollectedTax +=
              (taxes[taxBracketNr].incomeMax - taxes[taxBracketNr].incomeMin) *
              taxes[taxBracketNr].taxRate;
          }
        }
      }
      const newIncome = csvData[i].income - partialCollectedTax;
      var indexNewIncome = closestIndex(csvData, newIncome);
      if (indexNewIncome !== i) {
        data[indexNewIncome].population += data[i].population;
        data[i].population = 0;
      }
      collectedTax += partialCollectedTax * csvData[i].population;
    }

    //Taxing the billionaires
    for (let i = 0; i < csvBillionaires.length; i++) {
      partialCollectedTax = 0;
      for (const taxBracketNr in taxes) {
        if (taxes[taxBracketNr].incomeMin < csvBillionaires[i].income) {
          if (csvBillionaires[i].income < taxes[taxBracketNr].incomeMax) {
            partialCollectedTax +=
              (csvBillionaires[i].income - taxes[taxBracketNr].incomeMin) *
              taxes[taxBracketNr].taxRate;
          } else {
            partialCollectedTax +=
              (taxes[taxBracketNr].incomeMax - taxes[taxBracketNr].incomeMin) *
              taxes[taxBracketNr].taxRate;
          }
        }
      }
      billionaires[i].income = csvBillionaires[i].income - partialCollectedTax;
      collectedTax += partialCollectedTax;
    }
    return [collectedTax, data, billionaires];
  };

  // distributes the collected money among the brackets below incomeMax and moves population accordingly
  const giveToThePoor = (data, collectedTax) => {
    for (let i = 0; i < csvData.length; i++) {
      var incomeDiff = data[i + 1].income - data[i].income;
      if (collectedTax >= data[i].population * incomeDiff) {
        collectedTax -= data[i].population * incomeDiff;
        data[i + 1].population += data[i].population;
        data[i].population = 0;
      } else {
        data[i + 1].population += Math.floor(
          collectedTax / (data[i + 1].income - data[i].income)
        );
        data[i].population -= Math.floor(
          collectedTax / (data[i + 1].income - data[i].income)
        );
        return data;
      }
    }
    return data;
  };

  const updateData = () => {
    var newData = csvData.map((a) => {
      return { ...a };
    });
    var newBillionaires = csvBillionaires.map((a) => {
      return { ...a };
    });

    var collectedTax = 0;
    var [collectedTax, newData, newBillionaires] = collectFromTheRich(
      newData,
      collectedTax,
      taxes,
      newBillionaires
    );
    newData = giveToThePoor(newData, collectedTax);
    var totPopulation = 0;

    // Counter of People in Extreme Poverty
    var peopleInExtremePoverty = 0;
    for (let i = 0; i < csvData.length; i++) {
      if (newData[i].income <= 2) {
        peopleInExtremePoverty += newData[i].population;
      } else {
        break;
      }
    }
    for (let i = 0; i < newData.length; i++) {
      totPopulation += newData[i].population;
    }
    setExtremePovertyCount(
      Math.floor((peopleInExtremePoverty / totPopulation) * 100)
    );
    setData(newData);
    setBillionaires(newBillionaires);
  };

  const peopleCounter = (xValue) => {
    var totPopulation = 0;
    var peopleToLeft = 0;
    let dataSet = null;
    if (data) dataSet = data;
    else dataSet = csvData;

    for (let i = 0; i < csvData.length; i++) {
      if (dataSet[i].income <= xValue) {
        peopleToLeft += dataSet[i].population;
      } else {
        break;
      }
    }
    for (let i = 0; i < dataSet.length; i++) {
      totPopulation += dataSet[i].population;
    }

    const peopleCount = ((peopleToLeft / totPopulation) * 100).toFixed(1);
    let textLeft = peopleCount + '%';
    let textRight = (100 - peopleCount).toFixed(1) + '%';

    if (peopleCount < 0.001) textLeft = 'few';
    else if ((100 - peopleCount).toFixed(1) < 0.001) textRight = 'few';

    return [textLeft, textRight];
  };

  useEffect(() => {
    csv(csvUrl, function (d) {
      return {
        income: +d.income,
        population: +d.population,
      };
    }).then(setCsvData);
    csv(billionairesCsvUrl, function (d) {
      return {
        billionaire: d.billionaire,
        income: +d.income,
        images: +d.images,
      };
    }).then(setCsvBillionaires);
    setTaxes({
      1: { incomeMin: 100, incomeMax: 1000, taxRate: 0 },
      2: { incomeMin: 1000, incomeMax: 10000, taxRate: 0 },
      3: { incomeMin: 10000, incomeMax: 100000, taxRate: 0 },
      4: { incomeMin: 100000, incomeMax: 1000000, taxRate: 0 },
      5: { incomeMin: 1000000, incomeMax: 30000000, taxRate: 0 },
    });
  }, []);

  useEffect(() => {
    if (csvData) {
      updateData();
    }
  }, [taxes]);

  if (!csvData || !csvBillionaires) {
    return <div>Loading</div>;
  }

  return (
    <div className='taxTheRichContainer'>
      <AreaChartD3
        className='areaChart'
        data={
          data
            ? [makePercentage(data), makePercentage(csvData)]
            : [makePercentage(csvData), makePercentage(csvData)]
        }
        ExtremePovertyCount={ExtremePovertyCount}
        billionaries={billionaires ? billionaires : csvBillionaires}
        peopleCounter={(xValue) => peopleCounter(xValue)}
      />
      <InGraphSlider
        classname='inGraphsliders'
        onTaxChange={(taxBracketNr, newTax) =>
          updateTaxes(taxBracketNr, newTax)
        }
        clearAllTaxes={() => clearAllTAxes()}
        taxes={taxes ? taxes : 0}
      />

      <BoxSliders
        onTaxChange={(taxBracketNr, newTax) =>
          updateTaxes(taxBracketNr, newTax)
        }
        clearAllTaxes={() => clearAllTAxes()}
        taxes={taxes ? taxes : 0}
      />
    </div>
  );
};

export default DataVis;
