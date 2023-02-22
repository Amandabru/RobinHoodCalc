import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import TaxSlider from './TaxSlider';
import AreaChartD3 from './AreaChartD3';

const csvUrl =
  'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/58ce042b4504d9b660bb93693e47b966cc2eb34f/GapminderData.csv';

const DataVis = () => {
  const [data, setData] = useState(null);
  const [taxRate, setTaxRate] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const updateTaxRate = (bracketId, newTaxRate) => {
    var taxRates = { ...taxRate };
    taxRates[bracketId].taxRate = newTaxRate;
    setTaxRate(taxRates);
  };

  // Collects money(tax) from the people above the incomeMin and moves population down the brackets accordingly
  // Returns the money and the modified data
  const collectFromTheRich = (
    data,
    collectedTax,
    incomeMin,
    incomeMax,
    taxRate
  ) => {
    for (let i = 0; i < csvData.length; i++) {
      if (incomeMin < csvData[i].income && csvData[i].income < incomeMax) {
        const newIncome =
          csvData[i].income - (csvData[i].income - incomeMin) * taxRate;
        collectedTax +=
          (csvData[i].income - incomeMin) * taxRate * csvData[i].population;
        var indexNewIncome = closestIndex(csvData, newIncome);
        if (indexNewIncome !== i) {
          data[indexNewIncome].population += data[i].population;
          data[i].population = 0;
        }
      }
    }
    return [collectedTax, data];
  };

  // distributes the collected money among the brackets below incomeMax and moves population accordingly
  const bringOutOfPoverty = (data, collectedTax) => {
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
    var collectedTax = 0;
    for (let i = 1; i < 6; i++) {
      var [taxContribution, newData] = collectFromTheRich(
        newData,
        collectedTax,
        taxRate[i].incomeMin,
        taxRate[i].incomeMax,
        taxRate[i].taxRate
      );
      collectedTax = taxContribution;
    }
    newData = bringOutOfPoverty(newData, collectedTax);
    setData(newData);
  };

  useEffect(() => {
    csv(csvUrl, function (d) {
      return {
        income: +d.income,
        population: +d.population,
      };
    }).then(setCsvData);
    var bracketTaxes = {
      1: { id: 1, incomeMin: 100, incomeMax: 200, taxRate: 0 },
      2: { id: 2, incomeMin: 200, incomeMax: 10000, taxRate: 0 },
      3: { id: 3, incomeMin: 10000, incomeMax: 100000, taxRate: 0 },
      4: { id: 4, incomeMin: 100000, incomeMax: 1000000, taxRate: 0 },
      5: { id: 5, incomeMin: 1000000, incomeMax: 30000000, taxRate: 0 },
    };
    setTaxRate(bracketTaxes);
  }, []);

  useEffect(() => {
    if (csvData) {
      updateData();
    }
  }, [taxRate]);

  if (!csvData) {
    return <div>Loading</div>;
  }

  return (
    <>
      <AreaChartD3 data={data ? data : csvData} />
      <TaxSlider
        onTaxChange={(bracketId, taxRate) => updateTaxRate(bracketId, taxRate)}
        taxRate={taxRate ? taxRate : 0}
      />
    </>
  );
};

const closestIndex = (arr, num) => {
  let curr = arr[0].income;
  let diff = Math.abs(num - curr);
  let index = 0;
  for (let val = 0; val < arr.length; val++) {
    let newdiff = Math.abs(num - arr[val].income);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val].income;
      index = val;
    }
  }
  return index;
};

export default DataVis;
