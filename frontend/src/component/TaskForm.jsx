import React, { useState, useEffect } from "react";

const TaskForm = ({ employeeList, initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    assignedTo: "", // employee id or name
  });

  useEffect(() => {
    if (initialData?.id) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="border p-2 w-full"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      >
        <option value="">Select Employee</option>
        {employeeList &&
          employeeList.map((elm) => (
            <option key={elm._id} value={elm._id}>
              {elm.name}
            </option>
          ))}
      </select>

      <div className="flex justify-between gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
        {onCancel && (
          <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
