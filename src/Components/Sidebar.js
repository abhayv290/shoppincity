import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`h-screen flex overflow-hidden bg-gray-100 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 transform translate-x-0 transition-transform duration-300 ease-in-out">
        {/* Sidebar content goes here */}
        <div className="p-4 text-white">
          <h2 className="text-lg font-semibold">Sidebar Content</h2>
          <ul className="mt-4">
            <li className="py-2">Item 1</li>
            <li className="py-2">Item 2</li>
            <li className="py-2">Item 3</li>
            {/* Add more items as needed */}
          </ul>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden transition-all duration-300 ease-in-out">
        {/* Page content goes here */}
        <div className="p-4">
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            Toggle Sidebar
          </button>
          <h1 className="text-2xl font-semibold">Main Content</h1>
          {/* Your page content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
