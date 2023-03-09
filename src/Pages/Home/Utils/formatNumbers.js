function formatNumbers(n) {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(0) + 'k';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  if (n >= 1e9 && n < 7990000000) return +(n / 1e9).toFixed(2) + 'B';
  if (n >= 7990000000 && n < 1e12) return '>' + (n / 1e9).toFixed(0) + 'B';
}

export default formatNumbers;
