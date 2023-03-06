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

export default movingAverage;
