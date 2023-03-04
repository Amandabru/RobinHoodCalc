import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import AreaChartD3 from './Chart/AreaChartD3';
import TaxSliders from './TaxSliders/TaxSliders';
import InGraphSlider from './InGraphSliders/InGraphSliders';
import './home.css';
import {
  updateTaxes,
  setDefaultTax,
  giveToThePoor,
  collectFromTheRich,
  makePercentage,
  peopleCounter,
  extremePovertyPercentage,
} from './Utils/index';

const dataUrl =
  'https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/ccbd3e8c9dec23b78482dd47994d8faa49a1b96d/GapminderData.csv';

const billionairesUrl =
  'https://gist.githubusercontent.com/Amandabru/791125eedbe23167f74f20b2739a53be/raw/203d2e923bffaef26d10a7f81da92337f59ab57b/billionairesData.csv';

const movingAverage = (N, data) => {
  let Y = data.map((a) => {
    return { ...a };
  });
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    for (let k = 0; k < N; k++) {
      if (k <= i) {
        sum += data[i - k].population;
      }
    }
    Y[i].population = sum / N;
  }
  return Y;
};

const Home = () => {
  const [data, setData] = useState(null);
  const [taxes, setTaxes] = useState(null);
  const [defaultData, setDefaultData] = useState(null);
  const [billionaires, setBillionaires] = useState(null);
  const [defaultBillionaires, setDefaultBillionaires] = useState(null);

  const updateData = () => {
    var [collectedTax, updatedData, newBillionaires] = collectFromTheRich(
      defaultData,
      taxes,
      defaultBillionaires
    );
    updatedData = giveToThePoor(updatedData, collectedTax);
    setData(updatedData);
    setBillionaires(newBillionaires);
  };

  useEffect(() => {
    csv(dataUrl, function (d) {
      return {
        income: +d.income,
        population: +d.population,
      };
    }).then((data) => {
      setDefaultData(data);
      setData(data);
    });
    csv(billionairesUrl, function (d) {
      return {
        billionaire: d.billionaire,
        income: +d.income,
        images: +d.images,
      };
    }).then((data) => {
      setDefaultBillionaires(data);
      setBillionaires(data);
    });
    setTaxes(setDefaultTax());
  }, []);

  useEffect(() => {
    if (data) {
      updateData();
    }
  }, [taxes]);

  if (!data || !billionaires || !taxes) {
    return <div>Loading</div>;
  }

  return (
    <div className='taxTheRichContainer'>
      <AreaChartD3
        className='areaChart'
        data={[
          makePercentage(movingAverage(3, data)),
          makePercentage(movingAverage(3, defaultData)),
        ]}
        ExtremePovertyCount={extremePovertyPercentage(data)}
        billionaries={billionaires}
        peopleCounter={(xValue) => peopleCounter(xValue, data)}
        taxValue={taxes}
      />
      <InGraphSlider
        classname='inGraphsliders'
        onTaxChange={(taxBracketNr, newTax) =>
          setTaxes(updateTaxes(taxBracketNr, taxes, newTax))
        }
        taxes={taxes}
      />
      <TaxSliders
        onTaxChange={(taxBracketNr, newTax) =>
          setTaxes(updateTaxes(taxBracketNr, taxes, newTax))
        }
        clearAllTaxes={() => setTaxes(setDefaultTax())}
        taxes={taxes}
      />
    </div>
  );
};

export default Home;
