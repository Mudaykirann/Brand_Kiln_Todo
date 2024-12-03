import { Outlet, NavLink } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { FaTasks } from "react-icons/fa";

const Layout = () => {
    return (
        <div className="dashboard flex bg-gray-100 min-h-screen">
            <div className="sidebar bg-white p-6 m-4 shadow-lg rounded-lg h-screen hidden md:block md:w-64">
                <div className="logo text-center">
                    <h1 className="text-3xl font-bold">BKiln.</h1>
                    <p className="text-sm mt-1 text-gray-400">A Task Manager</p>
                </div>
                <div className="sidebar__links mt-24 space-y-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex px-4 py-2 items-center gap-4 rounded-md ${isActive ? 'bg-green-300' : 'hover:bg-gray-200'
                            }`
                        }
                    >
                        <RxDashboard size={20} />
                        <p className="text-xl">Dashboard</p>
                    </NavLink>
                    <NavLink
                        to="/alltasks"
                        className={({ isActive }) =>
                            `flex px-4 py-2 items-center gap-4 rounded-md ${isActive ? 'bg-green-300' : 'hover:bg-gray-200'
                            }`
                        }
                    >
                        <FaTasks size={20} />
                        <p className="text-xl">All Tasks</p>
                    </NavLink>
                </div>
            </div>
            <main className="dashboard__main m-4 shadow-lg rounded-lg bg-white w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
