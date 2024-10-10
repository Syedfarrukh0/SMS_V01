import React from "react";

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full mt-4 border-collapse">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            {columns.map((col) => (
              <th
                key={col.accessor}
                className={`${col.className} px-4 py-2 whitespace-nowrap`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => renderRow(item))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;












// import React from "react";

// const Table = ({columns, renderRow, data}: {
//     columns: { header: string; accessor: string; className?: string }[];
//     renderRow: (item: any) => React.ReactNode;
//     data: any[];
// }) => {
//   return (
//     <table className="w-full mt-4 overflow-auto">
//       <thead>
//         <tr className="text-left text-gray-500 text-sm min-w-fit">
//             {columns.map(col => (
//                 <th key={col.accessor} className={col.className}>{col.header}</th>
//             ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item) => renderRow(item))}
//       </tbody>
//     </table>
//   );
// }

// export default Table;
