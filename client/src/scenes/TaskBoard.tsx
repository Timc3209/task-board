import React from "react";
import { connect } from "react-redux";
import { addBoard } from "../redux/actions";
import { MainState } from "../redux/types";
import Header from "../components/Header";

interface Props {
  boards: [];
  addBoard: typeof addBoard;
}

interface States {}

class TaskBoard extends React.Component<Props, States> {
  readonly state: States = {};

  addBoard = () => {
    this.props.addBoard("dsdsa");
  };

  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

const mapStateToProps = ({ task }: MainState) => {
  const { boards } = task;
  return { boards };
};

const mapDispatchToProps = {
  addBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
