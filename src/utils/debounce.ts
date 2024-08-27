/**
 * @param {Function} func - 要执行的函数。
 * @param {number} wait - 延迟执行的时间，单位毫秒。
 * @param {boolean} [immediate] - 是否在延迟开始前立即执行。
 * @returns {Function} 返回一个新的消抖函数。
 */
export default function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait: number = 300,
  immediate?: boolean,
): (...args: T) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  const debounced = (...args: T): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    if (immediate) {
      const callNow = !timeoutId;
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, wait);

      if (callNow) {
        func.apply(null, args as any);
      }
    } else {
      timeoutId = setTimeout(() => {
        func.apply(null, args as any);
      }, wait);
    }
  };

  return debounced;
}
