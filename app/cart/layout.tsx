import React from 'react';

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <h2>Your Cart is Empty</h2>
        <p>Login to see the items you added</p>
        <button className="bg-blue-500 rounded-md text-lg px-4 py-2 text-white" type="button">
          Login
        </button>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
