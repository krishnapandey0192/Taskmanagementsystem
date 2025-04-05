import React from "react";

const EmployeeTable = ({ tasks }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Priority
            </th>
            <th scope="col" className="px-6 py-3">
              Assigned
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks?.length > 0 ? (
            tasks.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">{item?.title || "-"}</td>
                <td className="px-6 py-4">{item?.description || "-"}</td>
                <td className="px-6 py-4">{item?.status || "-"}</td>
                <td className="px-6 py-4">{item?.priority || "-"}</td>
                <td className="px-6 py-4">{item?.assignedTo?.name || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
