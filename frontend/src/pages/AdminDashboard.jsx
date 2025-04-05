import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaginatedTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../redux/task/taskSlice";
import { getAllEmployee } from "../redux/user/useSlice"
import TaskForm from "../component/TaskForm";
import AdminTable from "../component/AdminTable";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, totalPages, currentPage } = useSelector(
    (state) => state.task
  );

  const { employeeList } = useSelector((state) => state.user)

  console.log(employeeList, "employeelist-------")

  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    title: "",
  });

  const loadTasks = (page = 1) => {
    dispatch(fetchPaginatedTasks({ page, limit: 5, filters }));
  };

  useEffect(() => {
    loadTasks(1);
  }, [filters]);

  useEffect(() => {
    dispatch(getAllEmployee())
  }, [dispatch])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      loadTasks(newPage);
    }
  };

  const handleCreate = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleFormSubmit = (data) => {
    if (editingTask) {
      dispatch(updateTask({ id: editingTask._id, updatedTask: data }));
    } else {
      dispatch(createTask(data));
    }
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Welcome to Admin Dashboard
      </h1>

      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 transition duration-200"
      >
        + Create New Task
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingTask ? "Edit Task" : "Create Task"}
            </h2>
            <TaskForm
              initialData={editingTask}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowModal(false)}

              employeeList={employeeList}
            />
          </div>
        </div>
      )}

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
          <AdminTable
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
                className={`px-4 py-2 rounded ${currentPage === index + 1
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

export default AdminDashboard;
