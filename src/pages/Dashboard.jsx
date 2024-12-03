import { IoMdAdd } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AddTodo from "../components/AddTodo";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import EditTodo from "../components/EditTodo";
import { deleteTask } from "../redux/taskSlice";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";


function Dashboard() {
    const tasks = useSelector((state) => state.tasks.tasks)

    const dispatch = useDispatch();
    const [isAddboxopen, setisAddboxopen] = useState(false);
    const todoTasks = tasks.filter((t) => t.status === "Todo");
    const pendingTasks = tasks.filter((t) => t.status === "Pending");
    const completedTasks = tasks.filter((t) => t.status === "Completed");


    const [isEditboxopen, setisEditboxopen] = useState(false);
    const [currentTaskId, setcurrentTaskId] = useState();


    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(id));
            toast.error("Task Removed.")
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

    const handleAddTask = () => {
        setisAddboxopen(false);
    }


    function formatDate(dateString) {
        const date = new Date(dateString);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = date.getDate();
        const month = months[date.getMonth()];

        return `${day} ${month}`;
    }

    return (
        <div className="dashboard p-4">
            <div className="flex flex-wrap gap-1 justify-between items-center">
                <h1 className=" text-xl md:text-2xl font-bold">Welcome to Dashboard 👋</h1>
                <div className="block md:hidden underline">
                    <Link to='/alltasks'>All Tasks</Link>
                </div>
                <div>
                    <button onClick={() => setisAddboxopen(true)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
                        <IoMdAdd color="#fff" size={20} />
                        <p className="text-sm md:text-[16px]">Add Task</p>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-8 gap-3 mt-2 items-start">
                <div className="col-span-6 grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 items-start  md:h-[80vh]">
                    <div className="bg-white">
                        <div className="p-4 bg-blue-400 overflow-hidden rounded-lg flex justify-between items-center">
                            <h1 className="text-xl">Todo</h1>
                            <IoMdAdd size={20} color="#fff" className="bg-black rounded-full cursor-pointer" onClick={() => setisAddboxopen(true)} />
                        </div>
                        <div className="todos m-2 overflow-auto ">
                            {
                                todoTasks.map((todo) => {
                                    return (
                                        <div key={todo.id} className="todo my-2 shadow-sm hover:shadow-lg transition duration-200 rounded-md p-4 border  cursor-pointer">
                                            <h1 className="text-lg">{todo.task}</h1>
                                            <div className="flex justify-between mt-4">
                                                <p className="text-sm">{formatDate(todo.dueDate)}</p>
                                                <div className="flex items-center">
                                                    <FaEdit size={18} className="cursor-pointer" onClick={() => handleEditTask(todo.id)} />
                                                    <RiDeleteBinLine size={18} className="cursor-pointer" onClick={() => handleDelete(todo.id)} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="p-4 bg-orange-400 overflow-hidden rounded-lg">
                            <h1 className="text-xl">Pending</h1>
                        </div>
                        <div className="todos m-2  overflow-auto ">
                            {
                                pendingTasks.map((todo) => {
                                    return (
                                        <div key={todo.id} className="todo my-2 shadow-sm hover:shadow-lg transition duration-200 rounded-md p-4 border  cursor-pointer">
                                            <h1 className="text-lg">{todo.task}</h1>
                                            <div className="flex justify-between mt-4">
                                                <p className="text-sm">{formatDate(todo.dueDate)}</p>
                                                <div className="flex items-center">
                                                    <FaEdit size={18} className="cursor-pointer" onClick={() => handleEditTask(todo.id)} />
                                                    <RiDeleteBinLine size={18} className="cursor-pointer" onClick={() => handleDelete(todo.id)} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="p-4 bg-green-400 overflow-hidden rounded-lg">
                            <h1 className="text-xl">Completed</h1>
                        </div>
                        <div className="todos m-2  overflow-auto ">
                            {
                                completedTasks.map((todo) => {
                                    return (
                                        <div key={todo.id} className="todo my-2 shadow-sm hover:shadow-lg transition duration-200 rounded-md p-4 border  cursor-pointer">
                                            <h1 className="text-lg">{todo.task}</h1>
                                            <div className="flex justify-between mt-4">
                                                <p className="text-sm">{formatDate(todo.dueDate)}</p>
                                                <div className="flex items-center">
                                                    <FaEdit size={18} className="cursor-pointer" onClick={() => handleEditTask(todo.id)} />
                                                    <RiDeleteBinLine size={18} className="cursor-pointer" onClick={() => handleDelete(todo.id)} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg col-span-6 md:col-span-2 text-center p-4 mt-4">
                    <div className="flex items-center gap-2">
                        <TbReportAnalytics size={24} />
                        <h2 className="text-2xl font-bold">Analytics</h2>
                    </div>
                    <div className="analytics mt-4">
                        <div className="flex items-center justify-around my-10">
                            <div>
                                <p className="text-sm">Total Tasks:</p>
                                <h1 className="text-5xl text-blue-900 font-bold">{todoTasks.length}</h1>
                            </div>
                            <div>
                                <p className="text-sm">Pending Tasks:</p>
                                <h1 className="text-5xl text-red-600 font-bold">{pendingTasks.length}</h1>
                            </div>
                        </div>
                        <div className="flex items-center justify-around my-10">
                            <div>
                                <p className="text-sm">Completed:</p>
                                <h1 className="text-5xl text-green-500 font-bold">{completedTasks.length}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isAddboxopen &&
                (<AddTodo isOpen={isAddboxopen} onClose={handleAddTask} />)
            }

            {isEditboxopen && (<EditTodo id={currentTaskId} closeEditModal={closeEditModal} />)}


            <Toaster />
        </div>
    )
}

export default Dashboard
