import React from 'react';

function DataVis({ data }) {
  return (
    <>
      {data.map((d) => (
        <div>
          <span>{d.income}</span>
          <span>----------------</span>
          <span>{d.population}</span>
        </div>
      ))}
    </>
  );
}

export default DataVis;
