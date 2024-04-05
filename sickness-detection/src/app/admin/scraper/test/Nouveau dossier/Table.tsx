import React from 'react';

interface TableProps {
  data: { name: string; sum: number }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.sum}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
