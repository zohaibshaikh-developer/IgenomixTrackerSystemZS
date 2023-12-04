// CardWithCounter.tsx
import React, { useState, useEffect } from 'react';
import CounterAnimation from './CounterAnimation'; // Import your CounterAnimation component
const CardWithCounter = ({ title, initialValue }) => {
    const [count] = useState(initialValue);
    useEffect(() => {
        // Your logic here
    }, []); // Add dependencies as needed
    return (<div className="p-4 bg-white border rounded-md shadow-md w-full">
      <h2 className="text-xl text-black font-semibold mb-2">{title}</h2>
      <CounterAnimation value={count}/>
    </div>);
};
export default CardWithCounter;
