import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "reactstrap";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskItem from "./TaskItem";

interface MyProps {
  name: string;
  id: string;
  tasks: any;
  showEdit: any;
  showDelete: any;
  showAddTask: any;
  showEditTask: any;
  showDeleteTask: any;
}

const grid = 8;

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 300,
  marginRight: 10,
});

const TaskList = ({
  name,
  id,
  tasks,
  showEdit,
  showDelete,
  showAddTask,
  showEditTask,
  showDeleteTask,
}: MyProps) => (
  <Droppable droppableId={id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
        {...provided.droppableProps}
      >
        <div>
          <div className="d-inline-block mb-2">
            <h2>{name}</h2>
          </div>
          <div className="float-right">
            <button onClick={showEdit}>
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <button onClick={showDelete} className="ml-2">
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </button>
          </div>
        </div>
        {tasks &&
          tasks.map((task: any, index: any) => (
            <TaskItem
              id={task.id}
              name={task.name}
              index={index}
              editTask={() => showEditTask(task)}
              deleteTask={() => showDeleteTask(task)}
            />
          ))}
        {provided.placeholder}
        <Button color="success" onClick={showAddTask}>
          Add Task
        </Button>
      </div>
    )}
  </Droppable>
);

export default TaskList;
