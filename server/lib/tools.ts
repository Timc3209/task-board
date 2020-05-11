export const reorderArray = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const moveArray = (
  source: any,
  destination: any,
  startIndex: any,
  endIndex: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(startIndex, 1);

  destClone.splice(endIndex, 0, removed);

  const result = { sourceItems: sourceClone, destinationItems: destClone };
  return result;
};
