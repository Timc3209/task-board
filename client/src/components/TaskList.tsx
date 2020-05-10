import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "reactstrap";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskItem from "./TaskItem";
import { relative } from "path";

interface MyProps {
  index: number;
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
  background: isDraggingOver ? "lightblue" : "#f3f5f7",
  borderRadius: "4px",
  border: "1px solid #eee",
  padding: grid,
  width: 300,
  minWidth: 300,
  marginRight: 10,
  marginBottom: 30,
});

const TaskList = ({
  index,
  id,
  name,
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
        className="relative"
        style={getListStyle(snapshot.isDraggingOver)}
        {...provided.droppableProps}
      >
        <div>
          <div
            className="d-inline-block mb-2 tasklist-header"
            onClick={showEdit}
          >
            <h4>{name}</h4>
          </div>
          <div className="task-actions">
            <FontAwesomeIcon
              icon={faTrash}
              size="sm"
              onClick={showDelete}
              className="btn-icon"
            />
          </div>
        </div>
        <div className="task-container">
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
        </div>
        <div className="bottom-task-actions">
          <Button color="success" onClick={showAddTask}>
            Add Task
          </Button>
        </div>
      </div>
    )}
  </Droppable>
);

export default TaskList;
