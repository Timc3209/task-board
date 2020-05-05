import React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { logout, addBoard } from "../redux/actions";
import { MainState } from "../redux/types";
import Header from "../components/Header";
import TextInput from "../components/TextInput";

interface Props {}

interface States {}

class Users extends React.Component<Props, States> {
  readonly state: States = {};

  onChange = (event: any) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState({ [key]: value } as any);
  };

  render() {
    return (
      <div className="App">
        <Header />
        <h3>Users </h3>
      </div>
    );
  }
}

const mapStateToProps = ({ task }: MainState) => {
  const { boards } = task;
  return { boards };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
