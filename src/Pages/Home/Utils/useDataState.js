import { useEffect, useState } from 'react';

function useDataState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const storageValue = window.sessionStorage.getItem(key);
    return storageValue !== null ? JSON.parse(storageValue) : defaultValue;
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}

export default useDataState;
