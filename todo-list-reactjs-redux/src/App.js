import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import demo from './trainning/demo';

import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      
      sortBy: "name",
      sortValue: -1
    };
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      });
    }
  }
  // onGenerateData = () => {
  //   var tasks = [
  //     {
  //       id: this.autoID(),

  //       name: "Thuan",
  //       status: true
  //     },
  //     {
  //       id: this.autoID(),
  //       name: "quan ly he thong mang",
  //       status: false
  //     },
  //     {
  //       id: this.autoID(),
  //       name: "quan ly he thong mang",
  //       status: true
  //     },
  //     {
  //       id: this.autoID(),
  //       name: "quan ly he thong mang",
  //       status: true
  //     }
  //   ];

  //   this.setState({
  //     tasks: tasks
  //   });
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  autoID() {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }
  onToggleFrorm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      });
    }
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  };
  onOpenForm = () => {
    this.setState({
      isDisplayForm: true
    });
  };
  onSubmit = data => {
    var { tasks } = this.state;
    if (data.id === "") {
      data.id = this.autoID();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // console.log(data);
  };
  onSort = (sortBy, sortValue) => {
    this.state({
      sortBy: sortBy,
      sortValue: sortValue
    });
    //console.log(this.state.sort);
  };
  onUpdateStatus = id => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };
  findIndex = id => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };
  onDelete = id => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.onCloseForm();
  };
  onUpdate = id => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onOpenForm();
  };
  onFilter = (filterStatus, filterName) => {
    console.log(filterStatus);
    filterStatus = parseInt(filterStatus, 10);
  };
  render() {
    var { tasks, taskEditing } = this.state;
    // localStorage.clear();
    // var {task, isShowingForm, keyword, sortBy, sortValue,filterName, filterStatus, itemEDiting}= this.state;
    // tasks = filter(tasks, (task) => {
    //   return includes(task.name.toLowrCase(), keyword.toLowerCase());

    // });
    // if(filterStatus){
    //   tasks = filter(tasks, (task) => {
    //     if(filerStatus=== '-1'|| filterStatus === -1){
    //       return task;
    //     }else{
    //       return task.status === (parseInt(litlerStatus, 10)===1?true:fasle);
    //     }
    //   });
    // }

    var isDisplayForm = this.state.isDisplayForm;
    var elmTaskForm =
      isDisplayForm === true ? (
        <TaskForm
          onSubmit={this.onSubmit}
          onCloseForm={this.onCloseForm}
          task={taskEditing}
        />
      ) : (
        ""
      );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {/* form*/}
            {/*<TaskForm />*/}
            {elmTaskForm}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleFrorm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            {/* <button
              type="button"
              className="btn btn-danger ml-5"
              onClick={this.onGenerateData}
            >
              data
            </button> */}
            {/*search sort */}
            <Control onSort={this.onSort} />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
