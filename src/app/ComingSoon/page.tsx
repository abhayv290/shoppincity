import React from 'react';

const ComingSoon: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
            <p className="text-lg text-gray-600">This product is not available yet. Stay tuned for updates!</p>
        </div>
    );
};

export default ComingSoon;