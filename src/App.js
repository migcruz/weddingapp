import React, { Component } from "react";
import GuestInfoModal from "./components/GuestInfoModal";
import TokenModal from "./components/TokenModal";
import NavBar from "./components/NavBar";
import axios from "axios";
import { Image, Item, Grid, Container, Header } from "semantic-ui-react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

// const staticRoot = window.django.urls.staticRoot;
const photo_paths = [
    {key: "photo1", value: ["photo1", "/static/photo1.jpg"]},
    {key: "photo2", value: ["photo2", "/static/bgphoto.png"]}
];

// CSS styles, will override styles in .css file if there is conflict
const appHeadRibbon = {
    maxWidth: window.screen.availWidth,
    minWidth: window.screen.availWidth,
    // maxHeight: window.screen.availHeight,
    // minHeight: window.screen.availHeight,  // createx extra space if enabled
    // fontSize: '4rem',
}

const appHeadRibbonImage = {
    maxWidth: window.screen.availWidth,
    minWidth: window.screen.availWidth,
    opacity: 0.5,
    display: 'block',
    height: 'auto',
    margin: 0,
    padding: 0,
    width: '100%',
    top: '0px',
    left: '0px',
    transitionDuration: '1s',
}

const appHeadRibbonH1 = {
    maxWidth: window.screen.availWidth, 
    minWidth: window.screen.availWidth,
    top: window.screen.availHeight * 0.42,
    left: window.screen.availWidth * 0.50,
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)', // keep it centered
}

const appHeadRibbonH2 = {
    maxWidth: window.screen.availWidth, 
    minWidth: window.screen.availWidth,
    top: window.screen.availHeight * 0.60,
    left: window.screen.availWidth * 0.50,
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)', // keep it centered
}

const appH1 = {
    fontSize:  window.screen.availHeight * 0.15,
    color: 'white',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // keep it centered
}

const appH2 = {
    fontSize:  window.screen.availHeight * 0.027,
    color: 'white',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // keep it centered
}

const appP1 = {
    fontSize:  `${window.screen.availHeight * 0.01}px`,
    color: 'white',
}

const appNavBar = {
    top: window.screen.availHeight * 0.05, 
    maxWidth: window.screen.availWidth, 
    minWidth: window.screen.availWidth,
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'absolute',
}

const appRsvpButton = {
    maxWidth: window.screen.availWidth, 
    minWidth: window.screen.availWidth,
    top: window.screen.availHeight * 0.8,
    left: window.screen.availWidth * 0.50,
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)', // keep it centered
    display: 'flex',
    flexDirection: 'row',
}

const HeaderButton = styled(Button)({
    // position: 'relative', //use for multiple items in div or else they will stack
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: window.screen.availHeight * 0.019,
    fontWeight: '100',
    color: 'hsla(0, 0%, 100%, 1)', //Font color
    paddingTop: window.screen.availHeight * 0.02,
    paddingBottom: window.screen.availHeight * 0.02,
    paddingLeft: window.screen.availHeight * 0.08,
    paddingRight:  window.screen.availHeight * 0.08,
    border: '1px solid',
    borderRadius: '1px',
    lineHeight: 1.5,
    backgroundColor: 'hsla(0, 0%, 100%, 0.15)',
    borderColor: 'hsla(0, 0%, 100%, 1)',
    // fontFamily: [
    //     'Times New Roman',
    // ].join(','),
    '&:hover': {
        backgroundColor: 'hsla(0, 50%, 70%, 0.7)',
        borderColor: 'hsla(0, 0%, 100%, 1)',
        color: 'hsla(0, 0%, 10%, 1)',
        boxShadow: 'none',
        transitionDuration: '0.75s',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: 'hsla(0, 50%, 70%, 0.7)',
        borderColor: 'hsla(0, 0%, 100%, 1)',
    },
    // '&:focus': {
    //     boxShadow: 'none',
    //     boxShadow: '0 0 0 0.2rem rgba(217,140,140,.7)',
    // },
});

// The App
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
                plusone: "",
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
            navBarIndex: 0,
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
                    <Button
                        onClick={() => this.editItem(item)}
                        className="btn btn-secondary mr-2"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => this.handleDelete(item)}
                        className="btn btn-danger"
                    >
                        Delete
                    </Button>
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
        this.setState({ currentGuest: item, activeItem: item }, () => {
            console.log('waiting: ', this.state.activeItem);
            this.toggle();  // toggle GuestInfoModal
            this.refreshList()
        });
    };

    handleTokenModalSubmit = token => {
        this.setState({ currentGuest: token, activeItem: token }, () => {
            console.log('waiting: ', this.state.activeItem);
            this.tokenModalToggle();  // toggle off TokenModal
            this.toggle();  // toggle on GuestInfoModal
        });
    };

    onNavBarChange = newValue => {
        console.log("KKKKKKK: ", newValue);
        
        // async callback
        this.setState({ navBarIndex: newValue}, () => {
			// do nothing
		});
    };

    handleDelete = item => {
        axios
            // Because of proxy in package.json, command be shorten as follows:
            // .delete(`http://localhost:8000/api/guestlist/${item.id}`)
            .delete(`/api/guestlist/${item.token}/`)
            .then(res => this.refreshList());
    };

    createItem = () => {
        const item = { id: "", token: "", firstName: "", lastName: "", email: "", phone: "", plusone: "", allergies: "", rsvp: false, vegan: false, vegetarian: false, url: "" };
        this.setState({ activeItem: item, guestInfoModalShow: !this.state.guestInfoModalShow });
    };

    editItem = item => {
        this.setState({ activeItem: item, guestInfoModalShow: !this.state.guestInfoModalShow });
    };

    verifyToken = () => {
        const token = { guestToken: "" };
        this.setState({ guestToken: token, tokenModalShow: !this.state.tokenModalShow });
    };

    renderBackgroundImage = () => {
		if (this.state.navBarIndex === 0) {

			return (
				<Image className="App-headribbonimage" src={photo_paths[1].value[1]} style={appHeadRibbonImage} />
			);
		}
		else {
            var appHeadRibbonImageTemp = {};
            Object.assign(appHeadRibbonImageTemp, appHeadRibbonImage) // copy dict
            appHeadRibbonImageTemp['opacity'] = 0.1;
            appHeadRibbonImageTemp['transitionDuration'] = '1s';

			return (
				<Image className="App-headribbonimage" src={photo_paths[1].value[1]} style={appHeadRibbonImageTemp} />
			);
		}
		
	};

    renderRibbonContent = () => {

        switch (this.state.navBarIndex) {

            // Home
            case 0:

                // Construct FX style dict
                var appHomeHeadRibbon = {};
                Object.assign(appHomeHeadRibbon, appHeadRibbon) // copy dict
                appHomeHeadRibbon['animation'] = 'HomeFadeIn 0.5s';
                appHomeHeadRibbon['-webkit-animation'] = 'HomeFadeIn 0.5s';
                appHomeHeadRibbon['-moz-animatio'] = 'HomeFadeIn 0.5s';
                appHomeHeadRibbon['-o-animation'] = 'HomeFadeIn 0.5s';
                appHomeHeadRibbon['-ms-animation'] = 'HomeFadeIn 0.5s'; // must be differently named FX or else they wont apply

                return (
                    <div className="App-HomeRibbon" style={appHomeHeadRibbon}>
                        <div className="App-headribbonh1" style={appHeadRibbonH1}>
                            <h1 className="App-h1" style={appH1}>Miguel & Jessica</h1>
                        </div>
                        <div className="App-headribbonh2" style={appHeadRibbonH2}>
                            <h2 className="App-h2" style={appH2}>August 20, 2022</h2>
                        </div>
                        <div className="App-rsvpbutton" style={appRsvpButton}>
                            <HeaderButton variant="contained" size="large" onClick={this.verifyToken}>
                                RSVP
                            </HeaderButton>
                        </div>
                    </div>
                );
            
            // About us
            case 1:

                // Construct FX style dict
                var appAboutUsHeadRibbon = {};
                Object.assign(appAboutUsHeadRibbon, appHeadRibbon) // copy dict
                appAboutUsHeadRibbon['animation'] = 'AboutUsFadeIn 0.5s';
                appAboutUsHeadRibbon['-webkit-animation'] = 'AboutUsFadeIn 0.5s';
                appAboutUsHeadRibbon['-moz-animatio'] = 'AboutUsFadeIn 0.5s';
                appAboutUsHeadRibbon['-o-animation'] = 'AboutUsFadeIn 0.5s';
                appAboutUsHeadRibbon['-ms-animation'] = 'AboutUsFadeIn 0.5s';

                return (
                    <div className="App-HomeRibbon" style={appAboutUsHeadRibbon}>
                        <div className="App-headribbonh1" style={appHeadRibbonH1}>
                            <Container text>
                                <p style={appP1}>
                                    Miguel and Jessica met 10 years ago during an information session to join the Unmanned Aerial Vehicle engineering at SFU. As engineering nerds and UAV enthusiasts, Jessica and Miguel bonded as classmates, teammates, and friends. After many late nights studying and weekends spent working on the UAV, it was no surprise to Jessica when Miguel finally asked her to be his girlfriend. She, of course, enthusiastically accepted.
                                </p>
                                <p style={appP1}>
                                    There have been many great achievements that we have shared over our many years together. From graduating University to starting our first jobs, we are proud to have achieved these goals as a team. Though the road in life is never easy, we couldn’t imagine facing the challenges of life without each other. This is how we know we are truly meant to be. 
                                </p>
                                <p style={appP1}>
                                    We are so excited to be taking this next step in our lives and in our commitment to each other by getting married. Please join us on August 20th, 2022 to witness and celebrate our marriage. We would be so thankful to have you there on this special day.
                                </p>
                            </Container>
                        </div>
                    </div>
                );
            
            // Schedule
            case 2:

                // Construct FX style dict
                var appScheduleHeadRibbon = {};
                Object.assign(appScheduleHeadRibbon, appHeadRibbon) // copy dict
                appScheduleHeadRibbon['animation'] = 'ScheduleFadeIn 0.5s';
                appScheduleHeadRibbon['-webkit-animation'] = 'ScheduleFadeIn 0.5s';
                appScheduleHeadRibbon['-moz-animatio'] = 'ScheduleFadeIn 0.5s';
                appScheduleHeadRibbon['-o-animation'] = 'ScheduleFadeIn 0.5s';
                appScheduleHeadRibbon['-ms-animation'] = 'ScheduleFadeIn 0.5s';

                return (
                    <div className="App-HomeRibbon" style={appScheduleHeadRibbon}>
                        <div className="App-headribbonh1" style={appHeadRibbonH1}>
                            <h2 className="App-h2" style={appH2}>TBA. Please check back later!</h2>
                        </div>
                    </div>
                );
            
            // Gift Registry
            case 3:

                // Construct FX style dict
                var appGiftRegHeadRibbon = {};
                Object.assign(appGiftRegHeadRibbon, appHeadRibbon) // copy dict
                appGiftRegHeadRibbon['animation'] = 'GiftRegFadeIn 0.5s';
                appGiftRegHeadRibbon['-webkit-animation'] = 'GiftRegFadeIn 0.5s';
                appGiftRegHeadRibbon['-moz-animatio'] = 'GiftRegFadeIn 0.5s';
                appGiftRegHeadRibbon['-o-animation'] = 'GiftRegFadeIn 0.5s';
                appGiftRegHeadRibbon['-ms-animation'] = 'GiftRegFadeIn 0.5s';

                return (
                    <div className="App-HomeRibbon" style={appGiftRegHeadRibbon}>
                        <div className="App-headribbonh1" style={appHeadRibbonH1}>
                            <h2 className="App-h2" style={appH2}>Due to us flying in from out of town for the wedding, it is difficult for us to transport gifts back home. If you would like to give us a gift, we would greatly appreciate it if you could please consider a cash gift instead. Thank you for understanding!</h2>
                        </div>
                    </div>
                );
        }
	};

    render() {
        // console.log(this.state.currentGuest)
        // console.log(this.state.activeItem)
        console.log('In Render: ', window.screen.availWidth, ' ', window.devicePixelRatio)

        // var bgphoto;
        // if (window.screen.availWidth > 1921) {
        //     bgphoto = photo_paths[1].value[1];
        // }
        // else {
        //     bgphoto = photo_paths[1].value[1];
        // }
        return (
            <main className="content">
                {this.renderBackgroundImage()}
                <div className="App-navbar" style={appNavBar}>
                    <NavBar
                        onNavBarChange={this.onNavBarChange}
                    />
                </div>
                {this.renderRibbonContent()}
                <div className="row ">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
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
                        onCancel={this.toggle}
                    />
                ) : null}
                {this.state.tokenModalShow ? (
                    <TokenModal
                        activeItem={this.state.guestToken}
                        toggle={this.tokenModalToggle}
                        onSave={this.handleTokenModalSubmit}
                        onCancel={this.tokenModalToggle}
                    />
                ) : null}
            </main>
        );
    }
}
export default App;