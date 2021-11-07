import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { Image, Item, Grid, Container, Header } from "semantic-ui-react";

import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

// const staticRoot = window.django.urls.staticRoot;
const photo_paths = [
    {key: "photo1", value: ["photo1", "/static/photo1.jpg"]}
];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewCompleted: false,
            activeItem: {
                title: "",
                description: "",
                completed: false
            },
            todoList: []
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            // .get("http://localhost:8000/api/todos/")
            // Because of proxy in package.json, command be shorten as follows:
            .get("/api/todos/")
            .then(res => this.setState({ todoList: res.data }))
            .catch(err => console.log(err));
    };

    displayCompleted = status => {
        if (status) {
            return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
    };

    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
                <span
                    onClick={() => this.displayCompleted(true)}
                    className={this.state.viewCompleted ? "active" : ""}
                >
                    Complete
            </span>
                <span
                    onClick={() => this.displayCompleted(false)}
                    className={this.state.viewCompleted ? "" : "active"}
                >
                    Incomplete
            </span>
            </div>
        );
    };
    
    renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.todoList.filter(
            item => item.completed === viewCompleted
        );
        return newItems.map(item => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
                        }`}
                    title={item.description}
                >
                    {item.title}
                </span>
                <span>
                    <button
                        onClick={() => this.editItem(item)}
                        className="btn btn-secondary mr-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => this.handleDelete(item)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </span>
            </li>
        ));
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                // Because of proxy in package.json, command be shorten as follows:
                // .put(`http://localhost:8000/api/todos/${item.id}/`, item)
                .put(`/api/todos/${item.id}/`, item)
                .then(res => this.refreshList());
            return;
        }
        axios
            // Because of proxy in package.json, command be shorten as follows:
            // .post("http://localhost:8000/api/todos/", item)
            .post("/api/todos/", item)
            .then(res => this.refreshList());
    };

    handleDelete = item => {
        axios
            // Because of proxy in package.json, command be shorten as follows:
            // .delete(`http://localhost:8000/api/todos/${item.id}`)
            .delete(`/api/todos/${item.id}/`)
            .then(res => this.refreshList());
    };

    createItem = () => {
        const item = { title: "", description: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    render() {
        return (
            <main className="content">
                <Image className="App-headribbonimage" src={photo_paths[0].value[1]}/>
                <div className="App-headribbon">
                    <Header as="h1" className="App-header">Welcome to Miguel and Jessica's Wedding!</Header>
                    <Header as="h2">Save the date: August 20, 2022</Header>
                    <Header as="h4">Please scroll down to RSVP</Header>
                </div>
                <Container text>
                    <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                    </p>
                    <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                    </p>
                </Container>
                <div className="row ">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="">
                                <button onClick={this.createItem} className="btn btn-primary">
                                    Add task
                                </button>
                            </div>
                            {this.renderTabList()}
                            <ul className="list-group list-group-flush">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <Modal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        );
    }
}
export default App;