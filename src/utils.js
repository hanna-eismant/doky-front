export const noop = () => {};

const minTextRows = 3;
const maxTextRows = 10;
export const getValidRowCount = (currentLength) => {
  if (currentLength < minTextRows) {
    return minTextRows;
  } else if (currentLength > maxTextRows) {
    return maxTextRows;
  }
  return currentLength;
};
