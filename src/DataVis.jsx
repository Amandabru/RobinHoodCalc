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

  const updateData = () => {
    const level4 = 65500;
    const level1 = 2;
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
      }
    }

    // Count population below level 1
    var popLevel1 = 0;
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].income < level1) {
        popLevel1 += updatedData[i].population;
      }
    }

    // Distributing tax to level 1
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].income < level1) {
        updatedData[i].income += collectedTax / popLevel1;
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
