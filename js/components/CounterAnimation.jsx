// CounterAnimation.tsx
import React, { useEffect, useRef } from 'react';
const CounterAnimation = ({ value }) => {
    const elementRef = useRef(null);
    useEffect(() => {
        if (elementRef.current) {
            const element = elementRef.current;
            const endValue = value;
            let startTimestamp;
            const duration = 1300; // 2000 milliseconds = 2 seconds
            const step = (timestamp) => {
                if (!startTimestamp) {
                    startTimestamp = timestamp;
                }
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                // Update the element's text content with a rounded value
                element.textContent = Math.round(progress * endValue).toString();
                if (progress < 1) {
                    // Continue the animation
                    requestAnimationFrame(step);
                }
            };
            // Start the animation
            requestAnimationFrame(step);
        }
    }, [value]);
    return <span className='text-black text-xl' ref={elementRef}>{value}</span>;
};
export default CounterAnimation;
