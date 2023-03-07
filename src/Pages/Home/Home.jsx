import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import AreaChartD3 from './Chart/AreaChartD3';
import TaxSliders from './TaxSliders/TaxSliders';
import InGraphSlider from './InGraphSliders/InGraphSliders';
import './home.css';
import Toggle from './Toggle/Toggle';
import {
  updateTaxes,
  movingAverage,
  setDefaultTax,
  giveToThePoor,
  collectFromTheRich,
  makePercentage,
  peopleCounter,
  extremePovertyPercentage,
  populationToWealth,
} from './Utils/index';

const dataUrl =
  "https://gist.githubusercontent.com/GusAxelsson/f3818ba7dba4888ac0109dcf9eb473c2/raw/d0c08c5b9f9db727474f3d4208e7a9164d989aab/800_bracket_incomedata.csv";

  // 80 datapoints. https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/ccbd3e8c9dec23b78482dd47994d8faa49a1b96d/GapminderData.csv
  // 800 datapoints. https://gist.githubusercontent.com/GusAxelsson/f3818ba7dba4888ac0109dcf9eb473c2/raw/d0c08c5b9f9db727474f3d4208e7a9164d989aab/800_bracket_incomedata.csv

const billionairesUrl =
  'https://gist.githubusercontent.com/Amandabru/791125eedbe23167f74f20b2739a53be/raw/203d2e923bffaef26d10a7f81da92337f59ab57b/billionairesData.csv';

const Home = () => {
  const [data, setData] = useState(null);
  const [taxes, setTaxes] = useState(null);
  const [defaultData, setDefaultData] = useState(null);
  const [billionaires, setBillionaires] = useState(null);
  const [defaultBillionaires, setDefaultBillionaires] = useState(null);
  const [toggleState, setToggleState] = useState(false);
  const [shadowData, setShadowData] = useState(null);

  const updateData = () => {
    var [collectedTax, updatedData, newBillionaires] = collectFromTheRich(
      defaultData,
      taxes,
      defaultBillionaires);
    updatedData = giveToThePoor(updatedData, collectedTax);
    if (toggleState !== true){
    setData(updatedData);
    setShadowData(defaultData);
    }
    else{
      setData(populationToWealth(updatedData));
      setShadowData(populationToWealth(defaultData));
    }
    setBillionaires(newBillionaires);
    
  };

  const updateToggle = state => {
    setToggleState(state);
    console.log(toggleState)
    updateData();
  }

  useEffect(() => {
    csv(dataUrl, function (d) {
      return {
        income: +d.income,
        population: +d.population,
      };
    }).then((data) => {
      setDefaultData(data);
      setShadowData(data);
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

  useEffect(() => {
    if (data) {
      updateData();
    }
  }, [toggleState]);

  if (!data || !billionaires || !taxes) {
    return <div>Loading</div>;
  }


  return (
    <div className='taxTheRichContainer'>
        <AreaChartD3
        className='areaChart'
        data={[
          movingAverage(10, makePercentage(data)),
          movingAverage(10, makePercentage(shadowData))
        ]}
        ExtremePovertyCount={extremePovertyPercentage(data)}
        billionaries={billionaires}
        peopleCounter={(xValue) => peopleCounter(xValue, data)}
        taxValue={taxes}
        wealthToggle={toggleState}
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
        billionaires={billionaires ? billionaires : billionairesUrl}
      />
      <Toggle label={"toggle wealth"} toggled={false} onClick={updateToggle}/>
    </div>
  );
};

export default Home;
