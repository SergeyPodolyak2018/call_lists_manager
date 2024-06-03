import React from 'react';

export default function useOutsideClick(callback:()=>void) {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = () => {
      callback();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return ref;
};