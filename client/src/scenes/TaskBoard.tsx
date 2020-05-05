import React from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { loadTask, setDefaultBoard } from "../redux/actions";
import { MainState, BoardState } from "../redux/types";
import Header from "../components/Header";
import SelectInput from "../components/SelectInput";

interface Props {
  defaultBoard: string;
  currentBoard: any;
  boards: Array<BoardState>;
  setDefaultBoard: typeof setDefaultBoard;
  loadTask: typeof loadTask;
}

interface States {}

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  marginRight: 10,
});

class TaskBoard extends React.Component<Props, States> {
  readonly state: States = {};

  onDefaultBoardChange = (event: any) => {
    const boardID = event.currentTarget.value;
    this.props.setDefaultBoard(boardID);
    this.loadTask(boardID);
  };

  loadTask = (boardID: string) => {
    const task = [
      {
        id: "0",
        name: "First Task",
      },
      {
        id: "1",
        name: "Second Task",
      },
    ];

    const task2 = [
      {
        id: "2",
        name: "Third Task",
      },
      {
        id: "3",
        name: "Fourth Task",
      },
    ];

    const taskList = [
      {
        id: "0",
        name: "Todo",
        task: task,
      },
      {
        id: "1",
        name: "In-Progress",
        task: task2,
      },
    ];

    const data = {
      id: boardID,
      taskList: taskList,
    };

    this.props.loadTask(data);
  };

  onDragEnd = () => {
    console.log("on drag end");
  };

  render() {
    return (
      <div className="App">
        <Header />
        <SelectInput
          name="defaultBoard"
          label="Board Name"
          value={this.props.defaultBoard}
          selectLabel="Select Board"
          options={this.props.boards}
          onChange={this.onDefaultBoardChange}
        />
        <div className="d-flex">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.props.currentBoard &&
              this.props.currentBoard.taskList.map((row: any, index: any) => {
                return (
                  <Droppable droppableId={`droppage${index}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <h2>{row.name}</h2>
                        {row.task.map((item: any, taskIndex: any) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                {item.name}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    )}
                  </Droppable>
                );
              })}
          </DragDropContext>
        </div>
      </div>
    );
  }
}

const getCurrentBoard = (boards: Array<BoardState>, defaultBoard: string) => {
  return boards.filter((board: BoardState) => board.id === defaultBoard)[0];
};

const mapStateToProps = ({ task, auth }: MainState) => {
  const { boards } = task;
  const { defaultBoard } = auth;
  const currentBoard = getCurrentBoard(boards, defaultBoard);
  console.log(currentBoard);
  return { boards, defaultBoard, currentBoard };
};

const mapDispatchToProps = {
  loadTask,
  setDefaultBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
