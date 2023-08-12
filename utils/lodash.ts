export function throttle<T extends Function> (func: T, timeFrame: number) {
  let lastTime = 0;
  return (...args: any[]) => {
      const now = +new Date();
      if (now - lastTime >= timeFrame) {
          func(...args);
          lastTime = now;
      }
  };
}
