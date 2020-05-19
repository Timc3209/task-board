export const reorderArray = (
  list: Array<object>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const moveArray = (
  source: Array<object>,
  destination: Array<object>,
  startIndex: number,
  endIndex: number
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(startIndex, 1);

  destClone.splice(endIndex, 0, removed);

  const result = { sourceItems: sourceClone, destinationItems: destClone };
  return result;
};
