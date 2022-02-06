import React from "react";
import Tasks from "../tasks";
import { Header, List, Checkbox } from 'semantic-ui-react';

class App extends Tasks {

    state = { tasks: [], currentTask: "", currentView: "all" }; 

    render() {
        const { tasks } = this.state;
        return (
            <div className="App">
                <div style={{ width: "400px", margin: "auto" }}>
                    <Header as='h1'
                    style={{ marginTop: "50px" }}
                    >My To Do List</Header>

                    <div style={{ margin: "20px 0 20px 0" }}>
                        <strong>Show: </strong>
                        <a href="javascript:void(0)"
                            onClick={() => this.handleView("all")}
                            style={{
                                margin: "0 10px 0 10px",
                                textDecoration:
                                    this.state.currentView == "all"
                                    ? "none"
                                        : "underline"
                        }}
                        >All</a>
                         | 
                        <a href="javascript:void(0)"
                            onClick={() => this.handleView("active")}
                            style={{
                                margin: "0 10px 0 10px",
                                textDecoration:
                                    this.state.currentView == "active"
                                        ? "none"
                                        : "underline"
                            }}
                        >Active</a>
                         | 
                        <a href="javascript:void(0)"
                            onClick={() => this.handleView("completed")}
                            style={{
                                margin: "0 10px 0 10px",
                                textDecoration:
                                    this.state.currentView == "completed"
                                        ? "none"
                                        : "underline"
                            }}
                        >Completed</a>
                    </div>

                    <form
                        onSubmit={this.handleCreate}
                        className="flex"
                        style={{ margin: "15px 0 30px 0", width: "400px" }}
                    >
                        <div className="ui input">
                        <input type="text"
                                name="content"
                                style={{ width: "330px" }}
                                placeholder="New Task..."
                                value={this.state.currentTask}
                                required={true}
                                onChange={this.handleChange}
                        />
                            <button
                                className="ui button orange"
                            type="submit"
                        >
                            Add
                            </button>
                         </div>
                    </form>

                    <List divided relaxed>
                        {tasks.map((task) => (
                            <List.Item
                                key={task._id}
                                className="flex task_container"
                            >
                                <List.Content>
                                    <Checkbox
                                        checked={task.completed}
                                        onClick={() => this.handleUpdate(task.id)}
                                        label={task.content}
                                        style={{
                                            textDecoration:
                                                task.completed
                                                    ? "line-through"
                                                    : ""
                                        }}
                                />
                                <button
                                        onClick={() => this.handleDelete(task.id)}
                                        className="ui button red right floated"
                                >
                                    X
                                    </button>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </div>
            </div>
        );
    }
}

export default App;
