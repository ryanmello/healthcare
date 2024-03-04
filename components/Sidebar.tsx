import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-screen w-64 fixed left-0 top-0 overflow-y-auto">
      <nav className="mt-10">
        <a
          href="#"
          className="flex items-center py-2 px-8 bg-gray-900 text-gray-100 border-r-4 border-gray-700"
        >
          <span className="mx-4 font-medium">Dashboard</span>
        </a>
        <a
          href="#"
          className="flex items-center py-2 px-8 text-gray-400 hover:bg-gray-900 hover:text-gray-100"
        >
          <span className="mx-4 font-medium">Profile</span>
        </a>
        <a
          href="#"
          className="flex items-center py-2 px-8 text-gray-400 hover:bg-gray-900 hover:text-gray-100"
        >
          <span className="mx-4 font-medium">Settings</span>
        </a>
        {/* Add more sidebar links as needed */}
      </nav>
    </div>
  );
};

export default Sidebar;
