export function isoDateStringFormat(isoDateString: string) {
  var date = new Date(isoDateString);

  var month: string | number = date.getMonth() + 1;
  var day: string | number = date.getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return `${month}月${day}日`;
}
