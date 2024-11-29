import { useEffect, useRef } from 'react';

const setConsistentInterval = (fn, delay) => {
  const startTime = Date.now();
  fn();
  const timeTaken = Date.now() - startTime;
  const nextTime = Math.max(0, delay - timeTaken);
  setTimeout(fn, nextTime);
};

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setConsistentInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
