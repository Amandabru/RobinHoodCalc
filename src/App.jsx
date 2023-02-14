import React, { useState, useEffect } from 'react';
import { csv, request, scaleBand, scaleLinear, max } from 'd3';
import TaxInput from './TaxInput';
import DataVis from './DataVis';
import useIsFirstRender from './useIsFirstRender';

const csvUrl =
  'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/58ce042b4504d9b660bb93693e47b966cc2eb34f/GapminderData.csv';

const App = () => {
  const [data, setData] = useState(null);
  const [taxRate, setTaxRate] = useState(0);
  const [csvData, setCsvData] = useState(null);

  /*
  const csvData = [
    { income: 1, population: 2 },
    { income: 2, population: 4 },
  ];*/

  useEffect(() => {
    csv(csvUrl, function (d) {
      return {
        income: +d.income,
        population: +d.population,
      };
    }).then(setCsvData);
  }, []);

  useEffect(() => {
    const updateData = () => {
      const upDatedData = csvData.map((data) => {
        return Object.assign({}, data);
      });
      for (let i = 0; i < upDatedData.length; i++) {
        upDatedData[i].income = upDatedData[i].income * taxRate;
      }
      setData(upDatedData);
    };

    if (csvData) {
      updateData();
    }
  }, [taxRate]);

  if (!csvData) {
    return <div>Loading</div>;
  }

  return (
    <>
      <TaxInput onTaxChange={(taxRate) => setTaxRate(taxRate)} />
      <DataVis data={data ? data : csvData} />
    </>
  );
};

export default App;

/*
const csvUrl =
  'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/58ce042b4504d9b660bb93693e47b966cc2eb34f/GapminderData.csv';

const width = 960;
const height = 500;

const App = () => {
  const [defaultData, setDefaultData] = useState(null);
  const [data, setData] = useState(null);
  const [taxRate, setTaxRate] = useState(0);

  const updateData = (data, defaultData) => {
    if (data) {
      var collectedTax = 0;
      var totalLevel1Income = 0;
      const level4Min = 32;
      const level1Max = 2;
      for (let i = 0; i < data.length; i++) {
        if (defaultData[i].income >= level4Min) {
          data[i].income = defaultData[i].income * (1 - taxRate);
          collectedTax += defaultData[i].income * taxRate;
        }
      }

      console.log(defaultData[1]);
      for (let i = 0; i < data.length; i++) {
        if (defaultData[i].income < level1Max) {
          totalLevel1Income += defaultData[i].income;
        }
      }

      for (let i = 0; i < data.length; i++) {
        if (defaultData[i].income < level1Max) {
          data[i].income =
            defaultData[i].income +
            collectedTax * (1 - defaultData[i].income / totalLevel1Income);
        }
      }
    }
    setData(data);
  };

  useEffect(() => {
    csv(csvUrl, function (d) {
      return {
        income: +d.income,
        population: +d.population,
      };
    }).then((d) => {
      setData(d);
      const copy = Object.assign({}, d);
      setDefaultData(copy);
    });
  }, []);

  useEffect(() => {
    data && updateData(data, defaultData);
  }, [taxRate]);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const xScale = scaleBand()
    .domain(data.map((d) => d.income))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.population)])
    .range([0, height]);

  return (
    <>
      <TaxInput onTaxChange={(taxRate) => setTaxRate(taxRate)} />
      {data.map((d) => (
        <div>
          <span>{Math.round(d.income)}</span>
          <span>----------------</span>
          <span>{d.population}</span>
        </div>
      ))}
    </>
  );
};

export default App;*/
