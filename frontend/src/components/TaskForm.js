import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks, currentTask, setCurrentTask }) => {
  const [title, setTitle] = useState(currentTask?.title || '');
  const [description, setDescription] = useState(currentTask?.description || '');

  // Update form fields when currentTask changes
  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentTask) {
      // Update existing task
      await axios.put(`http://localhost:5000/api/tasks/${currentTask._id}`, { title, description });
      setCurrentTask(null); // Reset form after updating
    } else {
      // Create new task
      await axios.post('http://localhost:5000/api/tasks', { title, description });
    }

    fetchTasks(); // Refresh tasks list
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border border-gray-300 p-2 w-full rounded mb-2"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <textarea
        className="border border-gray-300 p-2 w-full rounded mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button className={`py-2 px-4 rounded text-white ${currentTask ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}>
        {currentTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;