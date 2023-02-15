import React from 'react';

function Table({ data }) {
  return (
    <table>
      <tr>
        <th>Income</th>
        <th>Population</th>
      </tr>
      {data.map((d) => (
        <tr>
          <td>{parseFloat(d.income.toFixed(3))}</td>
          <td>{d.population}</td>
        </tr>
      ))}
    </table>
  );
}

export default Table;
