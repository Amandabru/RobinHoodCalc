import React, { useState, useEffect } from "react";
import { csv } from "d3";
import AreaChartD3 from "./Chart/AreaChartD3";
import Taxes from "./Taxes/Taxes";
import InGraphSlider from "./InGraphSliders/InGraphSliders";
import "./home.css";
import {
  updateTaxes,
  movingAverage,
  setDefaultTax,
  giveToThePoor,
  collectFromTheRich,
  makePercentage,
  peopleCounter,
  extremePovertyPercentage,
  levelCounter,
  updateIndividualTax,
  setDefaultIndividualTax,
} from "./Utils/index";

const dataUrl =
  "https://gist.githubusercontent.com/GusAxelsson/f3818ba7dba4888ac0109dcf9eb473c2/raw/d0c08c5b9f9db727474f3d4208e7a9164d989aab/800_bracket_incomedata.csv";

// 80 datapoints. https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/ccbd3e8c9dec23b78482dd47994d8faa49a1b96d/GapminderData.csv
// 800 datapoints. https://gist.githubusercontent.com/GusAxelsson/f3818ba7dba4888ac0109dcf9eb473c2/raw/d0c08c5b9f9db727474f3d4208e7a9164d989aab/800_bracket_incomedata.csv

const billionairesUrl =
  "https://gist.githubusercontent.com/Amandabru/791125eedbe23167f74f20b2739a53be/raw/203d2e923bffaef26d10a7f81da92337f59ab57b/billionairesData.csv";

const Home = () => {
  const [data, setData] = useState(null);
  const [taxes, setTaxes] = useState(null);
  const [defaultData, setDefaultData] = useState(null);
  const [billionaires, setBillionaires] = useState(null);
  const [defaultBillionaires, setDefaultBillionaires] = useState(null);
  const [individualTaxes, setIndividualTaxes] = useState(0);

  const updateData = () => {
    var [collectedTax, updatedData, newBillionaires] = collectFromTheRich(
      defaultData,
      taxes,
      defaultBillionaires,
      billionaires,
      individualTaxes
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
        individualTax: 0,
      };
    }).then((data) => {
      setDefaultBillionaires(data);
      setBillionaires(data);
    });
    setTaxes(setDefaultTax());

    // FULT KOMMER GÖRAS BÄTTRE SEN
    csv(billionairesUrl, function (d) {
      return {
        billionaire: d.billionaire,
        individualTax: 0,
      };
    }).then(setIndividualTaxes);
  }, []);

  useEffect(() => {
    if (data) {
      updateData();
    }
  }, [taxes, individualTaxes]);

  if (!data || !billionaires || !taxes || !individualTaxes) {
    return <div>Loading</div>;
  }

  return (
    <div className="taxTheRichContainer">
      <AreaChartD3
        className="areaChart"
        data={[
          movingAverage(2, makePercentage(data)),
          movingAverage(2, makePercentage(defaultData)),
        ]}
        ExtremePovertyCount={extremePovertyPercentage(data)}
        billionaries={billionaires}
        peopleCounter={(xValue) => peopleCounter(xValue, data)}
        taxValue={taxes}
        levelCounter={(x1Value, x2Value) =>
          levelCounter(x1Value, x2Value, data)
        }
      />
      <InGraphSlider
        classname="inGraphsliders"
        onTaxChange={(taxBracketNr, newTax) =>
          setTaxes(updateTaxes(taxBracketNr, taxes, newTax))
        }
        taxes={taxes}
      />
      <Taxes
        onTaxChange={(taxBracketNr, newTax) =>
          setTaxes(updateTaxes(taxBracketNr, taxes, newTax))
        }
        clearAllTaxes={() => setTaxes(setDefaultTax())}
        taxes={taxes}
        billionaires={billionaires}
        onIndividualTaxChange={(billionaire, newTax) =>
          setIndividualTaxes(
            updateIndividualTax(billionaire, newTax, individualTaxes)
          )
        }
        individualTaxes={individualTaxes}
        clearAllIndividualTaxes={() =>
          setIndividualTaxes(setDefaultIndividualTax(individualTaxes))
        }
      />
    </div>
  );
};

export default Home;
