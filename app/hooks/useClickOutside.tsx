import { useEffect, RefObject } from 'react';

const useClickOutside = (ref: RefObject<any>, handleClickOutside: () => void) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClickOutside();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, handleClickOutside]);
};

export default useClickOutside;