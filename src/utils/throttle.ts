/**
 * @param {Function} func - 要执行的函数。
 * @param {number} wait - 延迟执行的时间，单位毫秒。
 * @param {boolean} [immediate] - 是否在节流开始前立即执行。
 * @returns {Function} 返回一个新的节流函数。
 */
export function throttle<T extends unknown[]>(
  func: (...args: T) => void,
  wait: number = 300,
  immediate?: boolean,
): (...args: T) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecuted: number = 0;

  const throttled = (...args: T): void => {
    const now = Date.now();

    if (immediate && lastExecuted === 0) {
      func.apply(null, args as any);
      lastExecuted = now;
    }

    if (now - lastExecuted >= wait) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      func.apply(null, args as any);
      lastExecuted = now;
    } else if (!timeoutId) {
      timeoutId = setTimeout(
        () => {
          func.apply(null, args as any);
          lastExecuted = immediate ? 0 : Date.now();
          timeoutId = null;
        },
        wait - (now - lastExecuted),
      );
    }
  };

  return throttled;
}
