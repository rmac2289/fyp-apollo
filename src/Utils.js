export const formatDate = (date) => {
  let YYMMDD = date.slice(0, 10).split("-");
  let [year, month, day] = [YYMMDD[0], YYMMDD[1], YYMMDD[2]];
  let time = `${date.slice(11, 16)} UTC `;
  return `${month}/${day}/${year}, ${time}`;
};
