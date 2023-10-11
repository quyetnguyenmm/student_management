export const capitalizeString = (str: string) => {
  if (!str) return '';
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number) => {
  if (!mark) return;
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red';
};

export const getTotalPage = (totalRow: number, pageSize: number) => {
  return Math.ceil(totalRow / pageSize);
};
