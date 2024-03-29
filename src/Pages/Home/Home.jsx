import React, { useEffect } from 'react';
import AreaChartD3 from './Chart/AreaChartD3';
import Taxes from './Taxes/Taxes';
import './home.css';
import Switch from './Switch/Switch';
import Introduction from './Introduction/Introduction';
import { Fade } from 'react-reveal';
import {
  updateTaxes,
  movingAverage,
  setDefaultTax,
  strictDistribution,
  smoothDistribution,
  collectFromTheRich,
  makePercentage,
  leftRightCounter,
  extremePovertyPercentage,
  levelCounter,
  populationToWealth,
  useDataState,
  getData,
  getBillionaires,
} from './Utils/index';

const dataUrl =
  'https://gist.githubusercontent.com/GusAxelsson/f3818ba7dba4888ac0109dcf9eb473c2/raw/d0c08c5b9f9db727474f3d4208e7a9164d989aab/800_bracket_incomedata.csv';

// 80 datapoints. https://gist.githubusercontent.com/Amandabru/00e96eaa56143e6499d1c651bac03aa8/raw/ccbd3e8c9dec23b78482dd47994d8faa49a1b96d/GapminderData.csv
// 800 datapoints. https://gist.githubusercontent.com/GusAxelsson/f3818ba7dba4888ac0109dcf9eb473c2/raw/d0c08c5b9f9db727474f3d4208e7a9164d989aab/800_bracket_incomedata.csv

const billionairesUrl =
  'https://gist.githubusercontent.com/hannaalmqvist/d890f99df8d37ad9b0b215a44f02a38f/raw/4cbda13d0d92ab6d2bb476c4566f83fe23585ab5/billionairesData.csv';

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
  const [collectedMoney, setCollectedMoney] = useDataState(0, 'collectedMoney');
  const [selectedBillionaires, setSelectedBillionaires] = useDataState(
    [],
    'selectedBillionaires'
  );
  const [distributionOption, setDistributionOption] = useDataState(
    'Avoid Population Accumulation',
    'distributionOption'
  );

  const smallScreen = window.matchMedia('(max-width: 600px)').matches;

  const updateData = () => {
    var [collectedTax, updatedData, newBillionaires] = collectFromTheRich(
      defaultData,
      taxes,
      defaultBillionaires,
      billionaires,
      selectedBillionaires
    );
    setCollectedMoney(collectedTax);
    if (distributionOption === 'Avoid Population Accumulation') {
      updatedData = smoothDistribution(updatedData, collectedTax);
    } else {
      updatedData = strictDistribution(updatedData, collectedTax);
    }
    setData(updatedData);
    setBillionaires(newBillionaires);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.sessionStorage.getItem('data') === 'null') {
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
  }, [taxes, selectedBillionaires, toggleState, distributionOption]);

  if (!data || !billionaires || !defaultData || !defaultBillionaires) {
    return <div>Loading</div>;
  }

  return (
    <div className='taxTheRichContainer'>
      <div className='leftSide'>
        <Fade left delay={100} distance={'20%'}>
          <Introduction
            data={data}
            defaultData={defaultData}
            totalCollectedMoney={collectedMoney}
            distributionOption={distributionOption}
            setDistributionOption={(option) => setDistributionOption(option)}
          />
        </Fade>
        <Fade top delay={100} distance={'5%'}>
          <Switch toggled={toggleState} onClick={setToggleState} />
        </Fade>
        <Fade top delay={100} distance={'5%'}>
          <div className='areaChart'>
            <AreaChartD3
              data={[
                movingAverage(4, makePercentage(data)),
                movingAverage(4, makePercentage(defaultData)),
              ]}
              wealthData={[
                movingAverage(4, makePercentage(populationToWealth(data))),
                movingAverage(
                  4,
                  makePercentage(populationToWealth(defaultData))
                ),
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
        </Fade>
      </div>
      <div className='rightSide'>
        {smallScreen ? (
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
        ) : (
          <Fade right delay={100} distance={'20%'}>
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
          </Fade>
        )}
      </div>
    </div>
  );
};

export default Home;
