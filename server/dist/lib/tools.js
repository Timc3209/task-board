"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderArray = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
exports.moveArray = (source, destination, startIndex, endIndex) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(startIndex, 1);
    destClone.splice(endIndex, 0, removed);
    const result = { sourceItems: sourceClone, destinationItems: destClone };
    return result;
};
exports.randomName = () => {
    const result = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    return result;
};
//# sourceMappingURL=tools.js.map