import React, { useEffect } from 'react';
import AreaChartD3 from './Chart/AreaChartD3';
import Taxes from './Taxes/Taxes';
import './home.css';
import Switch from './Switch/Switch';
import {
  updateTaxes,
  movingAverage,
  setDefaultTax,
  giveToThePoor,
  collectFromTheRich,
  makePercentage,
  leftRightCounter,
  extremePovertyPercentage,
  levelCounter,
  populationToWealth,
  extremePovertyCounter,
  formatNumbers,
  useDataState,
  getData,
  getBillionaires,
} from './Utils/index';

const dataUrl =
  'https://gist.githubusercontent.com/GusAxelsson/f3818ba7dba4888ac0109dcf9eb473c2/raw/d0c08c5b9f9db727474f3d4208e7a9164d989aab/800_bracket_incomedata.csv';

// 80 datapoints. https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/ccbd3e8c9dec23b78482dd47994d8faa49a1b96d/GapminderData.csv
// 800 datapoints. https://gist.githubusercontent.com/GusAxelsson/f3818ba7dba4888ac0109dcf9eb473c2/raw/d0c08c5b9f9db727474f3d4208e7a9164d989aab/800_bracket_incomedata.csv

const billionairesUrl =
  'https://gist.githubusercontent.com/Amandabru/791125eedbe23167f74f20b2739a53be/raw/203d2e923bffaef26d10a7f81da92337f59ab57b/billionairesData.csv';

const Home = () => {
  const [data, setData] = useDataState(null, 'data');
  const [taxes, setTaxes] = useDataState(setDefaultTax(), 'taxes');
  const [defaultData, setDefaultData] = useDataState(null, 'defaultData');
  const [billionaires, setBillionaires] = useDataState(null, 'billionaires');
  const [defaultBillionaires, setDefaultBillionaires] = useDataState(
    null,
    'defaultBillionaires'
  );
  const [toggleState, setToggleState] = useDataState(false, 'toggleState');
  const [justUpdated, setJustUpdated] = useDataState(false, 'justUpdated');
  const [totalCollectedMoney, setTotalCollectedMoney] = useDataState(
    0,
    'collectedMoney'
  );

  const updateData = () => {
    var [collectedTax, updatedData, newBillionaires] = collectFromTheRich(
      defaultData,
      taxes,
      defaultBillionaires,
      billionaires
    );
    setTotalCollectedMoney(collectedTax);
    updatedData = giveToThePoor(updatedData, collectedTax);
    setData(updatedData);
    setBillionaires(newBillionaires);
    setJustUpdated(true);
  };

  useEffect(() => {
    getData(dataUrl).then((data) => {
      setData(data);
      setDefaultData(data);
    });
    getBillionaires(billionairesUrl).then((billionaires) => {
      setDefaultBillionaires(billionaires);
      setBillionaires(billionaires);
    });
  }, []);

  useEffect(() => {
    if (data) {
      updateData();
    }
  }, [taxes, billionaires, toggleState]);

  useEffect(() => {
    //FATTAR INTE VARFÖR MEN DET FUNKAR SÅHÄR LOLLOLOLOLOL
    if (justUpdated) {
      setBillionaires(billionaires);
    }
  }, [billionaires]);

  if (!data || !billionaires || !taxes) {
    return <div>Loading</div>;
  }

  return (
    <div className='taxTheRichContainer'>
      <div className='leftSide'>
        <div className='introduction'>
          Welcome to the <b>Robin Hood Calculator!</b> Here you can investigate
          how the wealth distribution of the world would look like when taking
          from the rich and giving to the poor. Use the sliders to the right and
          se what happens!
          <br></br>
          <br></br>
          You have now succesfully brought{' '}
          <b>
            {extremePovertyPercentage(data) === '0%'
              ? 'ALL'
              : (
                  extremePovertyCounter(defaultData) -
                  extremePovertyCounter(data)
                ).toLocaleString('en-US')}
          </b>{' '}
          people out of extreme poverty by redistributing{' '}
          <b>{formatNumbers(totalCollectedMoney)}</b>$.
        </div>
        <Switch toggled={toggleState} onClick={setToggleState} />
        <AreaChartD3
          data={[
            movingAverage(10, makePercentage(data)),
            movingAverage(10, makePercentage(defaultData)),
          ]}
          wealthData={[
            movingAverage(10, makePercentage(populationToWealth(data))),
            movingAverage(10, makePercentage(populationToWealth(defaultData))),
          ]}
          ExtremePovertyCount={extremePovertyPercentage(data)}
          billionaries={billionaires}
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
      <Taxes
        className='RightSide'
        onTaxChange={(taxBracketNr, newTax) =>
          setTaxes(updateTaxes(taxBracketNr, taxes, newTax))
        }
        clearAllTaxes={() => setTaxes(setDefaultTax())}
        taxes={taxes}
        billionaires={billionaires}
        setNewBillionaires={(billionaires) => {
          setBillionaires(billionaires);
          setJustUpdated(false);
        }}
      />
    </div>
  );
};

export default Home;
