import { csv } from 'd3';

const getData = async (dataUrl) => {
  const data = await csv(dataUrl, function (d) {
    return {
      income: +d.income,
      population: +d.population,
    };
  });
  return data;
};

export default getData;
