const debounce = (fn: Function, delay: number) => {
  let timer: any = null;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default debounce;
