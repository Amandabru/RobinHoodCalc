import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import TaxSlider from './TaxSlider';
import Table from './Table';
import AreaChartD3 from './AreaChartD3';

const csvUrl =
  'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/58ce042b4504d9b660bb93693e47b966cc2eb34f/GapminderData.csv';

const DataVis = () => {
  const [data, setData] = useState(null);
  const [taxRate, setTaxRate] = useState(0);
  const [csvData, setCsvData] = useState(null);

  const collectFromTheRich = (data, incomeMin) => {
    var collectedTax = 0;
    for (let i = 0; i < csvData.length; i++) {
      if (csvData[i].income > incomeMin) {
        const newIncome =
          csvData[i].income - (csvData[i].income - incomeMin) * taxRate;
        collectedTax +=
          (csvData[i].income - incomeMin) * taxRate * csvData[i].population;
        var indexNewIncome = closestIndex(csvData, newIncome);
        if (indexNewIncome !== i) {
          data[indexNewIncome].population += csvData[i].population;
          data[i].population = 0;
        }
      }
    }
    return [collectedTax, data];
  };

  const giveToThePoor = (data, incomeMax, collectedTax) => {
    var population = 0;
    for (let i = 0; i < csvData.length; i++) {
      if (csvData[i].income <= incomeMax) {
        population += csvData[i].population;
      }
    }
    for (let i = 0; i < csvData.length; i++) {
      if (csvData[i].income <= incomeMax) {
        const newIncome2 = csvData[i].income + collectedTax / population;
        var indexNewIncome = closestIndex(csvData, newIncome2);
        if (indexNewIncome !== i) {
          data[indexNewIncome].population += csvData[i].population;
          data[i].population = 0;
        }
      }
    }
    return data;
  };

  const updateData = () => {
    const taxBreakPoint = 100;
    var newData = csvData.map((a) => {
      return { ...a };
    });
    var [collectedTax, newData] = collectFromTheRich(newData, taxBreakPoint);
    newData = giveToThePoor(newData, taxBreakPoint, collectedTax);
    setData(newData);
  };

  useEffect(() => {
    csv(csvUrl, function (d) {
      return {
        income: +d.income,
        population: +d.population,
      };
    }).then(setCsvData);
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
      <TaxSlider onTaxChange={(taxRate) => setTaxRate(taxRate)} />
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
