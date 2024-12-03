import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks, setCurrentTask }) => {
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="flex justify-between items-center p-4 bg-gray-50 rounded shadow"
        >
          <div>
            <h3 className="font-bold text-gray-800">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
          </div>
          <div className="flex space-x-2">
            {/* Edit Button */}
            <button
              onClick={() => setCurrentTask(task)} // Set the task to be edited
              className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            {/* Delete Button */}
            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
