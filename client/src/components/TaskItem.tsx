import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface MyProps {
  id: string;
  name: string;
  index: number;
  editTask: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  position: "relative",
  userSelect: "none",
  padding: `16px 8px`,
  margin: `0 0 12px 0`,
  background: "#FFF",
  boxShadow: "0 1px 1px rgba(0,0,0, .20)",
  border: "1px solid #fff",
  ...draggableStyle,
});

const TaskItem = ({ id, name, index, editTask }: MyProps) => (
  <Draggable key={id} draggableId={id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        onClick={editTask}
      >
        <span className="btn-span">{name}</span>
      </div>
    )}
  </Draggable>
);

export default TaskItem;
