// CardWithCounter.tsx
import React, { useState, useEffect } from 'react';
import CounterAnimation from './CounterAnimation'; // Import your CounterAnimation component

interface CardWithCounterProps {
  title: string;
  initialValue: number;
}

const CardWithCounter: React.FC<CardWithCounterProps> = ({ title, initialValue }) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    // You can add any logic here to update the count as needed
    // For example, you might want to fetch data from an API and update the count
  }, []); // Add dependencies as needed

  return (
    <div className="p-4 bg-white border rounded-md shadow-md w-full">
      <h2 className="text-xl text-black font-semibold mb-2">{title}</h2>
      <CounterAnimation value={count} />
    </div>
  );
};

export default CardWithCounter;
