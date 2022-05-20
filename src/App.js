import React, { Component } from "react";
import axios from "axios";

import { Image, Item, Grid, Header } from "semantic-ui-react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import GuestInfoModal from "./components/GuestInfoModal";
import TokenModal from "./components/TokenModal";
import NavBar from "./components/NavBar";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import FaqPage from "./pages/FaqPage/FaqPage";
import GiftRegistryPage from "./pages/GiftRegistryPage/GiftRegistryPage";

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
    fontSize:  window.screen.height * 0.15,
    color: 'white',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // keep it centered
}

const appH2 = {
    fontSize:  window.screen.height * 0.027,
    color: 'white',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // keep it centered
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
    fontSize: window.screen.height * 0.019,
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
    fontFamily: 'Wild and Folk',
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
                newGuest: true,
                hasResponded: false,
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
        const item = { id: "", token: "", firstName: "", lastName: "", email: "", phone: "", plusone: "", allergies: "", rsvp: false, vegan: false, vegetarian: false, newGuest: true, hasResponded: false, url: "" };
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
                        <AboutUsPage/>
                    </div>
                );

            // FAQ
            case 2:

                // Construct FX style dict
                var appFaqHeadRibbon = {};
                Object.assign(appFaqHeadRibbon, appHeadRibbon) // copy dict
                appFaqHeadRibbon['animation'] = 'FAQFadeIn 0.5s';
                appFaqHeadRibbon['-webkit-animation'] = 'FAQFadeIn 0.5s';
                appFaqHeadRibbon['-moz-animatio'] = 'FAQFadeIn 0.5s';
                appFaqHeadRibbon['-o-animation'] = 'FAQFadeIn 0.5s';
                appFaqHeadRibbon['-ms-animation'] = 'FAQFadeIn 0.5s';

                return (
                    <div className="App-HomeRibbon" style={appFaqHeadRibbon}>
                        <FaqPage/>
                    </div>
                );
            
            // Schedule
            case 3:

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
                        <SchedulePage/>
                    </div>
                );
            
            // Gift Registry
            case 4:

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
                        <GiftRegistryPage/>
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
                {/* <div className="row ">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            {this.renderTabList()}
                            <ul className="list-group list-group-flush">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div> */}
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