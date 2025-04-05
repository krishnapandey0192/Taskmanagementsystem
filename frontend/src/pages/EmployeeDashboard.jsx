import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeTable from "../component/EmployeeTable";
import { fetchPaginatedTasks } from "../redux/task/taskSlice";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, totalPages, currentPage } = useSelector(
    (state) => state.task
  );

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    title: "",
  });

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const loadTasks = (page = 1) => {
    // const sort = sortField
    //   ? `${sortOrder === "desc" ? "-" : ""}${sortField}`
    //   : "";
    dispatch(fetchPaginatedTasks({ page, limit: 5, filters }));
  };

  useEffect(() => {
    loadTasks(1);
  }, [filters, sortField, sortOrder]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      loadTasks(newPage);
    }
  };

  // const handleSort = (field) => {
  //   if (sortField === field) {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortField(field);
  //     setSortOrder("asc");
  //   }
  // };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Welcome to Employee Dashboard
      </h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4 justify-center flex-wrap">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="text"
          placeholder="Search by title"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <EmployeeTable
            tasks={tasks}
            // onSort={handleSort}
            // sortField={sortField}
            // sortOrder={sortOrder}
          />

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeDashboard;
