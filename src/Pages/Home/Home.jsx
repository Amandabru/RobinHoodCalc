import React, { useEffect } from "react";
import AreaChartD3 from "./Chart/AreaChartD3";
import Taxes from "./Taxes/Taxes";
import "./home.css";
import Switch from "./Switch/Switch";
import Introduction from "./Introduction/Introduction";
import {
  updateTaxes,
  movingAverage,
  setDefaultTax,
  giveToThePoor,
  giveToThePoor2,
  collectFromTheRich,
  makePercentage,
  leftRightCounter,
  extremePovertyPercentage,
  levelCounter,
  populationToWealth,
  useDataState,
  getData,
  getBillionaires,
} from "./Utils/index";

const dataUrl =
  "https://gist.githubusercontent.com/GusAxelsson/f3818ba7dba4888ac0109dcf9eb473c2/raw/d0c08c5b9f9db727474f3d4208e7a9164d989aab/800_bracket_incomedata.csv";

// 80 datapoints. https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/ccbd3e8c9dec23b78482dd47994d8faa49a1b96d/GapminderData.csv
// 800 datapoints. https://gist.githubusercontent.com/GusAxelsson/f3818ba7dba4888ac0109dcf9eb473c2/raw/d0c08c5b9f9db727474f3d4208e7a9164d989aab/800_bracket_incomedata.csv

const billionairesUrl =
  "https://gist.githubusercontent.com/hannaalmqvist/d890f99df8d37ad9b0b215a44f02a38f/raw/4cbda13d0d92ab6d2bb476c4566f83fe23585ab5/billionairesData.csv";

const Home = () => {
  const [data, setData] = useDataState(null, "data");
  const [taxes, setTaxes] = useDataState(setDefaultTax(), "taxes");
  const [defaultData, setDefaultData] = useDataState(null, "defaultData");
  const [billionaires, setBillionaires] = useDataState(null, "billionaires");
  const [defaultBillionaires, setDefaultBillionaires] = useDataState(
    null,
    "defaultBillionaires"
  );
  const [toggleState, setToggleState] = useDataState(false, "toggleState");
  const [collectedMoney, setCollectedMoney] = useDataState(0, "collectedMoney");
  const [selectedBillionaires, setSelectedBillionaires] = useDataState(
    [],
    "selectedBillionaires"
  );

  const updateData = () => {
    var [collectedTax, updatedData, newBillionaires] = collectFromTheRich(
      defaultData,
      taxes,
      defaultBillionaires,
      billionaires,
      selectedBillionaires
    );
    setCollectedMoney(collectedTax);
    updatedData = giveToThePoor2(updatedData, collectedTax);
    setData(updatedData);
    setBillionaires(newBillionaires);
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("data") === "null") {
      getData(dataUrl).then((data) => {
        setData(data);
        setDefaultData(data);
      });
      getBillionaires(billionairesUrl).then((billionaires) => {
        setDefaultBillionaires(billionaires);
        setBillionaires(billionaires);
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      updateData();
    }
  }, [taxes, selectedBillionaires, toggleState]);

  if (!data || !billionaires || !defaultData || !defaultBillionaires) {
    return <div>Loading</div>;
  }

  return (
    <div className="taxTheRichContainer">
      <div className="leftSide">
        <Introduction
          data={data}
          defaultData={defaultData}
          totalCollectedMoney={collectedMoney}
        />
        <Switch toggled={toggleState} onClick={setToggleState} />
        <AreaChartD3
          data={[
            movingAverage(4, makePercentage(data)),
            movingAverage(4, makePercentage(defaultData)),
          ]}
          wealthData={[
            movingAverage(4, makePercentage(populationToWealth(data))),
            movingAverage(4, makePercentage(populationToWealth(defaultData))),
          ]}
          ExtremePovertyCount={extremePovertyPercentage(data)}
          billionaries={billionaires}
          selectedBillionaires={selectedBillionaires}
          leftRightCounter={(xValue) =>
            leftRightCounter(
              xValue,
              data,
              populationToWealth(data),
              toggleState
            )
          }
          levelCounter={(x1Value, x2Value) =>
            levelCounter(x1Value, x2Value, data)
          }
          taxValue={taxes}
          wealthToggle={toggleState}
        />
      </div>
      <div className="rightSide">
        <Taxes
          onTaxChange={(taxBracketNr, newTax) =>
            setTaxes(updateTaxes(taxBracketNr, taxes, newTax))
          }
          clearAllTaxes={() => setTaxes(setDefaultTax())}
          taxes={taxes}
          billionaires={billionaires}
          selectedBillionaires={selectedBillionaires}
          setSelectedBillionaires={(billionaires) => {
            setSelectedBillionaires(billionaires);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
