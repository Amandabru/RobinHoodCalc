import React, { useState, useEffect } from "react";
import { csv } from "d3";
import TaxSlider from "./TaxSlider";
import AreaChartD3 from "./AreaChartD3";
import closestIndex from "./helpers";
import BoxSliders from "./boxSliders";
import "./dataVis.css";

const csvUrl =
  "https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/58ce042b4504d9b660bb93693e47b966cc2eb34f/GapminderData.csv";

const DataVis = () => {
  const [data, setData] = useState(null);
  const [taxes, setTaxes] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [ExtremePovertyCount, setExtremePovertyCount] = useState(9);
  const [csvDataPercentage, setCsvDataPercentage] = useState(null);

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

  // make precentage of default data
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
        newDataPercentage[i].population / totPopulation;
    }
    return newDataPercentage;
  };

  // Collects money(tax) from the people above the incomeMin and moves population down the brackets accordingly
  // Returns the money and the modified data
  const collectFromTheRich = (data, collectedTax, taxes) => {
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
    return [collectedTax, data];
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
    var collectedTax = 0;
    var [collectedTax, newData] = collectFromTheRich(
      newData,
      collectedTax,
      taxes
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

    // make percentage
    for (let i = 0; i < newData.length; i++) {
      totPopulation += newData[i].population;
    }
    for (let i = 0; i < newData.length; i++) {
      newData[i].population = newData[i].population / totPopulation;
    }
    setExtremePovertyCount(
      Math.floor((peopleInExtremePoverty / totPopulation) * 100)
    );
    setData(newData);
  };

  useEffect(() => {
    csv(csvUrl, function(d) {
      return {
        income: +d.income,
        population: +d.population,
      };
    }).then(setCsvData);
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
      setCsvDataPercentage(makePercentage(csvData));
    }
  }, [taxes]);

  if (!csvData) {
    return <div>Loading</div>;
  }

  return (
    <div className="taxTheRichContainer">
      <AreaChartD3
        data={data ? [data, csvDataPercentage] : [csvData, csvData]}
        ExtremePovertyCount={ExtremePovertyCount}
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
