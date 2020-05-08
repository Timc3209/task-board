import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MyProps {
  id: string;
  name: string;
  index: number;
  editTask: any;
  deleteTask: any;
}

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: `${grid * 2}px ${grid}px`,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const TaskItem = ({ id, name, index, editTask, deleteTask }: MyProps) => (
  <Draggable key={id} draggableId={id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        <span>{name}</span>
        <div className="float-right">
          <button onClick={editTask}>
            <FontAwesomeIcon icon={faEdit} size="xs" />
          </button>
          <button onClick={deleteTask} className="ml-2">
            <FontAwesomeIcon icon={faTrash} size="xs" />
          </button>
        </div>
      </div>
    )}
  </Draggable>
);

export default TaskItem;
