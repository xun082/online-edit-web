export function hexToRgba(hex: string, alpha: number) {
  // 去掉开头的#号
  let cleanedHex = hex.replace('#', '');

  // 解析16进制颜色值
  let r = parseInt(cleanedHex.substring(0, 2), 16);
  let g = parseInt(cleanedHex.substring(2, 4), 16);
  let b = parseInt(cleanedHex.substring(4, 6), 16);

  // 返回rgba格式
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
