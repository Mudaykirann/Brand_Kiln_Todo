import { useDispatch, useSelector } from "react-redux"
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import AddTodo from "../components/AddTodo";
import { deleteTask, setFilter } from "../redux/taskSlice";
import EditTodo from "../components/EditTodo";
import '/src/App.css'
function AllTasks() {

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.tasks.filter);

    const handleFilterChange = (event) => {
        dispatch(setFilter(event.target.value));
    };


    const filteredTasks = tasks.filter((task) => {
        switch (filter) {
            case "Completed":
                return task.status === "Completed";
            case "Pending":
                return task.status === "Pending";
            case "Overdue":
                return new Date(task.dueDate) < new Date();
            default:
                return true;
        }
    });


    const [isAddboxopen, setisAddboxopen] = useState(false);
    const [isEditboxopen, setisEditboxopen] = useState(false);
    const [currentTaskId, setcurrentTaskId] = useState();


    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(id));
        }
    };

    const handleEditTask = (id) => {
        setisEditboxopen(true);
        setcurrentTaskId(id);
    }


    const closeEditModal = () => {
        setcurrentTaskId(null);
        setisEditboxopen(false);
    };


    function formatDate(dateString) {
        const date = new Date(dateString);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = date.getDate();
        const month = months[date.getMonth()];

        return `${day} ${month}`;
    }


    return (
        <div className="alltasks p-4">
            <div className="space-y-2 md:flex flex-wrap justify-between items-center">
                <h1 className="text-xl md:text-2xl font-bold">All Tasks </h1>
                <div>
                    <input type="text" placeholder="Search your task" className="outline-none border-none bg-gray-100 py-2 px-3 rounded-md" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="filters">
                        <select
                            id="task-filter"
                            value={filter}
                            onChange={handleFilterChange}
                            className="w-full  p-2 border rounded-lg bg-gray-100 text-gray-700 cursor-pointer"
                        >
                            <option value="ALL">All Tasks</option>
                            <option value="Completed">Completed Tasks</option>
                            <option value="Pending">Pending Tasks</option>
                            <option value="Overdue">Overdue Tasks</option>
                        </select>
                    </div>
                    <button onClick={() => setisAddboxopen(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
                        <IoMdAdd color="#fff" size={20} />
                        <p className="text-sm md:text-[16px]">Add Task</p>
                    </button>

                </div>
            </div>
            <div className="tasks flex gap-4 overflow-auto flex-wrap mt-4">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className={`task w-72 h-72 flex flex-col justify-between bg-white overflow-auto px-4 py-2 rounded-lg shadow-md border ${task.status.toLowerCase()}`}
                        >
                            <h2 className="text-2xl">{task.task}</h2>
                            <div className="flex flex-wrap justify-between items-center  mt-12">
                                <p className={` text-[16px] ${task.status.toLowerCase()}`} title="Due Date">{formatDate(task.dueDate)}</p>
                                <p className={`task__status text-[18px] font-semibold ${task.status.toLowerCase()}`}>{task.status}</p>
                                <div className="flex items-center gap-1">
                                    <FaEdit size={18} className="cursor-pointer" onClick={() => handleEditTask(task.id)} />
                                    <RiDeleteBinLine size={18} className="cursor-pointer" onClick={() => handleDelete(task.id)} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center w-full mt-4">
                        No tasks available. Add some tasks to get started!
                    </div>
                )}
            </div>
            {isAddboxopen &&
                (<AddTodo isOpen={isAddboxopen} onClose={() => setisAddboxopen(false)} />)
            }

            {isEditboxopen && (<EditTodo id={currentTaskId} closeEditModal={closeEditModal} />)}

        </div>
    )
}

export default AllTasks
