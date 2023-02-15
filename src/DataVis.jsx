import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import TaxSlider from './TaxSlider';
import Table from './Table';
import AreaChart from './AreaChart';

const csvUrl =
  'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/58ce042b4504d9b660bb93693e47b966cc2eb34f/GapminderData.csv';

const DataVis = () => {
  const [data, setData] = useState(null);
  const [taxRate, setTaxRate] = useState(0);
  const [csvData, setCsvData] = useState(null);

  const closestIndex = (arr, num) => {
    let curr = arr[0].income,
      diff = Math.abs(num - curr);
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

  const updateData = () => {
    const level4 = 65500;
    var collectedTax = 0;
    const updatedData = csvData.map((data) => {
      return Object.assign({}, data);
    });

    // Gathering tax from level 4
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].income >= level4) {
        updatedData[i].income -= (csvData[i].income - level4) * taxRate;
        collectedTax +=
          (csvData[i].income - level4) * taxRate * updatedData[i].population;
        updatedData[
          closestIndex(updatedData, updatedData[i].income)
        ].population = updatedData[i].population;
        updatedData[i].population = 0;
      }
    }
    // Count number of "brackets" below level 4
    var population = 0;
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].income < level4) {
        population += updatedData[i].population;
      }
    }

    // Distributing tax to levels below 4
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].income < level4) {
        updatedData[i].income += collectedTax / population;
        updatedData[
          closestIndex(updatedData, updatedData[i].income)
        ].population += updatedData[i].population;
        updatedData[i].population = 0;
      }
    }
    setData(updatedData);
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
      <AreaChart data={data ? data : csvData} />
      <TaxSlider onTaxChange={(taxRate) => setTaxRate(taxRate)} />
      <Table data={data ? data : csvData} />
    </>
  );
};

export default DataVis;
