import { useEffect, useState } from 'react';

function useDataState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.sessionStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    console.log(key, value);
  }, [value]);
  return [value, setValue];
}

export default useDataState;
