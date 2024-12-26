import React from 'react';

interface PropType {
    children: React.ReactNode;
}

const Container: React.FC<PropType> = ({ children }) => {
    return (
        <div className='max-w-[1920px] mx-auto xl:px-10  md:px-2 px-4'>
            {children}
        </div>
    );
}

export default Container;
