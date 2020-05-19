import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "reactstrap";
import TaskItem from "./TaskItem";
import { TaskItemState } from "../redux/types";

interface MyProps {
  name: string;
  id: string;
  tasks: Array<TaskItemState>;
  showEdit: () => void;
  showAddTask: () => void;
  showEditTask: (task: TaskItemState) => void;
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
  id,
  name,
  tasks,
  showEdit,
  showAddTask,
  showEditTask,
}: MyProps) => (
  <Droppable droppableId={id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        className="relative"
        style={getListStyle(snapshot.isDraggingOver)}
        {...provided.droppableProps}
      >
        <div className="tasklist-header" onClick={showEdit}>
          <h4>{name}</h4>
        </div>
        <div className="task-container">
          {tasks &&
            tasks.map((task: TaskItemState, index: number) => (
              <TaskItem
                key={index}
                id={task.id}
                name={task.name}
                index={index}
                editTask={() => showEditTask(task)}
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
