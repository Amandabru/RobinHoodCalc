function formatNumbers(n) {
  if (n < 1e3) return n.toFixed(0);
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(0) + "k";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9) return +(n / 1e9).toFixed(2) + "B";
}

export default formatNumbers;
