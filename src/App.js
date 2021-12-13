import React, { Component } from "react";
import GuestInfoModal from "./components/GuestInfoModal";
import TokenModal from "./components/TokenModal";
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
            viewRsvp: false,
            activeItem: {
                id: "",
                token: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                allergies: "",
                rsvp: false,
                vegan: false,
                vegetarian: false,
                url: "",
            },
            guestList: [],
            guestToken: {
                guestToken: "",
            },
            currentGuest: {},
            guestInfoModalShow: false,
            tokenModalShow: false,
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            // .get("http://localhost:8000/api/guestList/")
            // Because of proxy in package.json, command be shorten as follows:
            .get("/api/guestlist/")
            .then(res => this.setState({ guestList: res.data }))
            .catch(err => console.log(err));
    };

    displayRsvp = status => {
        if (status) {
            return this.setState({ viewRsvp: true });
        }
        return this.setState({ viewRsvp: false });
    };

    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
                <span
                    onClick={() => this.displayRsvp(true)}
                    className={this.state.viewRsvp ? "active" : ""}
                >
                    Rsvp
            </span>
                <span
                    onClick={() => this.displayRsvp(false)}
                    className={this.state.viewRsvp ? "" : "active"}
                >
                    No Rsvp
            </span>
            </div>
        );
    };
    
    renderItems = () => {
        const { viewRsvp } = this.state;
        const newItems = this.state.guestList.filter(
            item => item.rsvp === viewRsvp
        );
        return newItems.map(item => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`todo-title mr-2 ${this.state.viewRsvp ? "completed-todo" : ""
                        }`}
                    title={item.token}
                >
                    {item.firstName} {item.lastName} {item.token} {item.email} {item.phone} {item.allergies}
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
        this.setState({ guestInfoModalShow: !this.state.guestInfoModalShow });
    };

    tokenModalToggle = () => {
        this.setState({ tokenModalShow: !this.state.tokenModalShow });
    };

    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                // Because of proxy in package.json, command be shorten as follows:
                // .put(`http://localhost:8000/api/guestlist/${item.id}/`, item)
                .put(`/api/guestlist/${item.token}/`, item)
                .then(res => this.refreshList());
            return;
        }
        axios
            // Because of proxy in package.json, command be shorten as follows:
            // .post("http://localhost:8000/api/guestlist/", item)
            .post("/api/guestlist/", item)
            .then(res => this.refreshList());
    };

    handleTokenModalSubmit = token => {
        this.tokenModalToggle();
        axios
            // .get("http://localhost:8000/api/guestlist/ABCD4/")
            // Because of proxy in package.json, command be shorten as follows:
            .get(`/api/guestlist/${token.guestToken}/`)
            .then(res => this.setState({ currentGuest: res.data, activeItem: res.data, guestToken: token }, () => {
                console.log('waiting: ', this.state.activeItem);
                this.toggle();
            }))
            .catch(err => console.log(err));
        
        // this.setState({ guestToken: token }, () => {

        //     console.log('waiting: ', this.state.activeItem);
        // });
        
        // TODO: Error handling of bad token
    };

    handleDelete = item => {
        axios
            // Because of proxy in package.json, command be shorten as follows:
            // .delete(`http://localhost:8000/api/guestlist/${item.id}`)
            .delete(`/api/guestlist/${item.token}/`)
            .then(res => this.refreshList());
    };

    createItem = () => {
        const item = { id: "", token: "", firstName: "", lastName: "", email: "", phone: "", allergies: "", rsvp: false, vegan: false, vegetarian: false, url: "" };
        this.setState({ activeItem: item, guestInfoModalShow: !this.state.guestInfoModalShow });
    };

    editItem = item => {
        this.setState({ activeItem: item, guestInfoModalShow: !this.state.guestInfoModalShow });
    };

    verifyToken = () => {
        const token = { guestToken: "" };
        this.setState({ guestToken: token, tokenModalShow: !this.state.tokenModalShow });
    };

    render() {
        console.log(this.state.currentGuest)
        console.log('In Render')
        console.log(this.state.activeItem)
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
                                <button onClick={this.verifyToken} className="btn btn-primary">
                                    Enter your Token
                                </button>
                            </div>
                            {this.renderTabList()}
                            <ul className="list-group list-group-flush">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.guestInfoModalShow ? (
                    <GuestInfoModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
                {this.state.tokenModalShow ? (
                    <TokenModal
                        activeItem={this.state.guestToken}
                        toggle={this.tokenModalToggle}
                        onSave={this.handleTokenModalSubmit}
                    />
                ) : null}
            </main>
        );
    }
}
export default App;