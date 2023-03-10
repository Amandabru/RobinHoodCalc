import { csv } from 'd3';

const getBillionaires = async (url) => {
  const data = await csv(url, function (d) {
    return {
      billionaire: d.billionaire,
      income: +d.income,
      images: +d.images,
      individualTax: 0,
      active: true,
      added: false,
    };
  });
  return data;
};

export default getBillionaires;
