import React, { useState } from "react";

const AdminTable = ({ tasks, onEdit, onDelete }) => {
  console.log("tasks", tasks);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  return (
    <div className="relative overflow-x-auto">

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this task?</p>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  onDelete(selectedId);   // 🔥 Call your delete function
                  setShowModal(false);    // Close modal
                  setSelectedId(null);    // Reset
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}





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
            <th scope="col" className="px-6 py-3 cursor-pointer">
              Action
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
                <td className="flex gap-2 cursor-pointer">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-500 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(item._id);
                      setShowModal(true);
                    }}
                    className="text-red-500 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
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

export default AdminTable;
