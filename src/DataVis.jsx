import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import TaxSlider from './TaxSlider';
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
            data[indexNewIncome].population += data[i].population;
            data[i].population = 0;
          }
          else{
            var collectedFromBracket = (csvData[i].income - incomeMin) * taxRate * csvData[i].population;
            var incomeDiff = csvData[i].income - csvData[i - 1].income;
            var movePop = collectedFromBracket / incomeDiff;
            data[i].population = data[i].population - (movePop);
            data[i-1].population = data[i-1].population + (movePop);
          }
        }
      }
      return [collectedTax, data];
    };

  const giveToThePoor = (data, incomeMax, collectedTax) => {
      var population = 0;
      var spentTax = 0;
      for (let i = 0; i < csvData.length; i++) {
        if (csvData[i].income <= incomeMax) {
          population += csvData[i].population;
        }
      }
      // Tar ut pengar per person från insamlade pengar uttdelat på alla under incomeMax
      var popShare = collectedTax/population;
      for (let i = 0; i < csvData.length; i++) {
        var reverseIndex = csvData.length - i;
        if (i < data.length && i > 0){
        if (csvData[reverseIndex].income <= incomeMax) {
          // Tar differensen till nästa nivå av inkomst
          // Om popShare räcker för att flytta alla uppåt. Gör så till närmaste(till vart de hamnar) nivå av inkomst
            const newIncome2 = csvData[reverseIndex].income + collectedTax / population;
            var indexNewIncome = closestIndex(csvData, newIncome2);
                    if (indexNewIncome !== reverseIndex) {
                      spentTax += data[reverseIndex].population * (data[indexNewIncome].income - data[reverseIndex].income);
                      data[indexNewIncome].population += data[reverseIndex].population;
                      data[reverseIndex].population = 0;
                    }
                    else{
                      var incomeDiff = csvData[reverseIndex+1].income - csvData[reverseIndex].income;
                      var movePop = popShare / incomeDiff;
                      spentTax += movePop * (data[reverseIndex+1].income - data[reverseIndex].income)
                      data[reverseIndex].population = data[reverseIndex].population - (movePop);
                      data[reverseIndex + 1].population = data[reverseIndex + 1].population + (movePop);
                    }
          }
        }
      }
    let counter = 0;
    for (let i = 0; i < csvData.length; i++) {
        counter += data[i].population;
    }

    console.log("Population" + counter);
    console.log("taxrate" + taxRate)
    console.log("collectedTax: " + collectedTax)
    console.log("Spent tax:" + spentTax)
    return data;
  };

  const updateData = () => {
    const taxBreakPoint = 100;
    var newData = csvData.map((a) => {
      return { ...a };
    });
    var [collectedTax, newData] = collectFromTheRich(newData, taxBreakPoint);
    newData = giveToThePoor(newData, taxBreakPoint, collectedTax);

    var incomeBefore = 0;
    for (let i = 0; i < csvData.length; i++) {
      incomeBefore += csvData[i].income * csvData[i].population;
    }
    console.log(incomeBefore);

    var incomeAfter = 0;
    for (let i = 0; i < csvData.length; i++) {
      incomeAfter += newData[i].income * newData[i].population;
    }
    console.log(incomeAfter);

    setData(newData);
    // Console logs to figure out how much money goes missing
    var incomeBefore = 0;
    for (let i = 0; i < csvData.length; i++) {
      incomeBefore += csvData[i].income * csvData[i].population;
    }
    console.log("Tot income before:" + incomeBefore);

    var incomeAfter = 0;
    for (let i = 0; i < csvData.length; i++) {
      incomeAfter += newData[i].income * newData[i].population;
    }
    console.log("Tot income after:" + incomeAfter);
    var differeance = incomeAfter - incomeBefore;
    console.log("World wealth diff: " + differeance);

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
      <TaxSlider
        onTaxChange={(taxRate) => setTaxRate(taxRate)}
        taxRate={taxRate * 100}
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
