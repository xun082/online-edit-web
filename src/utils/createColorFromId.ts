export function createColorFromId(value: any) {
  // 确保传入的值总是字符串
  const userId = String(value);
  // 将userId字符串转换为一个整数值
  let hash = 0;

  for (let i = 0; i < userId.length; i++) {
    hash = (hash << 5) - hash + userId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  // 将整数转换为0-255范围内的三个值，分别对应RGB的R、G、B
  let r: number | string = (hash & 0xff0000) >> 16;
  let g: number | string = (hash & 0x00ff00) >> 8;
  let b: number | string = hash & 0x0000ff;

  // 将每个通道的颜色值转换为十六进制形式
  r = ('0' + r.toString(16)).slice(-2);
  g = ('0' + g.toString(16)).slice(-2);
  b = ('0' + b.toString(16)).slice(-2);

  // 返回完整的六位十六进制颜色代码
  return '#' + r + g + b;
}
