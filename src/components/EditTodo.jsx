import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { editTask } from '../redux/taskSlice';
import toast, { Toaster } from 'react-hot-toast';

function EditTodo({ id, closeEditModal }) {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const currentTask = tasks.find((task) => task.id === id);

    const [taskDetails, setTaskDetails] = useState({
        task: '',
        status: '',
        dueDate: ''
    });
    useEffect(() => {
        if (currentTask) {
            setTaskDetails({
                task: currentTask.task,
                status: currentTask.status,
            });
        }
    }, [currentTask]);

    const handleInputChange = (e) => {
        setTaskDetails({
            ...taskDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        dispatch(editTask({ id, updates: taskDetails }));
        closeEditModal();
        toast.success("Task Edited Successfully...")
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Task Name</label>
                    <input
                        type="text"
                        name="task"
                        value={taskDetails.task}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={taskDetails.dueDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                        name="status"
                        value={taskDetails.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    >
                        <option value="Todo">Todo</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-lg"
                        onClick={closeEditModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
            <Toaster />
        </motion.div>
    );
}

export default EditTodo;
