import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { MdPlaylistAdd } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';

const AddTaskDialog = ({ isOpen, onClose }) => {

    const [taskName, setTaskName] = useState('');
    const [taskStatus, setTaskStatus] = useState('Todo');
    const [taskDue, settaskDue] = useState();
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (taskName.trim()) {
            dispatch(addTask({ id: Date.now(), task: taskName, status: taskStatus, dueDate: taskDue }));
            onClose();
            toast.success("Task Added Successfully...")
        }
    };

    return (
        <motion.div
            className={`fixed inset-0 z-50 flex justify-center items-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className={`absolute inset-0 bg-black`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 0.5 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
            ></motion.div>

            <motion.div
                className="relative bg-white p-6 rounded-lg shadow-lg w-96"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-2xl flex items-center gap-4 font-bold mb-4"><p>Add New Task</p><MdPlaylistAdd className='mt-2' size={28} /></h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Task Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Enter task name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={taskDue}
                        onChange={(e) => settaskDue(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value)}
                    >
                        <option value="Todo">Todo</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddTask}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Add Task
                    </button>
                </div>
            </motion.div>
            <Toaster />
        </motion.div>
    );
};

export default AddTaskDialog;
