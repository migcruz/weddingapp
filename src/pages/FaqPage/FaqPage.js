import React from 'react';
import { styled } from '@mui/material/styles';

import './FaqPage.css';

const FaqPageMain = {
    maxWidth: window.screen.availWidth * 0.8, 
    minWidth: window.screen.availWidth * 0.8,
    top: window.screen.availHeight * 0.52,
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

const FaqPageDiv = {
    // paddingLeft: window.screen.availHeight * 0.08,
    // paddingRight:  window.screen.availHeight * 0.08,
}

const FaqPageDivSpacer = {
    maxWidth: window.screen.availWidth * 0.1, 
    minWidth: window.screen.availWidth * 0.1,
    width: '100%',
}

const FaqPageP1 = {
    fontSize:  `${window.screen.height * 0.015}px`,
    color: 'white',
}

class FaqPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.activeItem,
			index: 0,
		};
	}
  
    render() {
        return (
            <div className="FaqPage-Main" style={FaqPageMain}>
                <div style={FaqPageDiv}>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        Q. &ensp;Are children allowed?
                    </p>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        &emsp; &ensp;Yes, if they are over 10 years of age (barring extenuating circumstances).
                    </p><br/>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        Q. &ensp;Will there be free parking?
                    </p>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        &emsp; &ensp;Yes, both the ceremony and reception have plenty of free parking space.
                    </p><br/>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        Q. &ensp;When should guests arrive for the ceremony?
                    </p>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        &emsp; &ensp;Please arrive no later than 12:45 PM to be seated. The ceremony prompty begins at 1:00 PM.
                    </p><br/>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        Q. &ensp;When should guests arrive for the reception?
                    </p>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        &emsp; &ensp;Cocktail hour begins at 5:00 PM and the reception begins at 6:00 PM.
                    </p><br/>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        Q. &ensp;Will there be a Filipino money dance?
                    </p>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        &emsp; &ensp;Yes, we will be participating in the Filipino wedding tradition of the money dance.
                    </p>
                </div>
                <div style={FaqPageDivSpacer}></div>
                <div style={FaqPageDiv}>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        Q. &ensp;When is the RSVP deadline?
                    </p>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        &emsp; &ensp;Please RSVP by June 30th, so we can have an accurate headcount.
                    </p><br/>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        Q. &ensp;What should I wear?
                    </p>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        &emsp; &ensp;Please dress formal (dress pants, dress shirt, dresses) but also be comfortable.
                    </p><br/>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        Q. &ensp;Can I take photos with my phone or camera?
                    </p>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        &emsp; &ensp;Yes, feel free to do so at the reception. As for the ceremony, please wait until the ceremony is complete.
                    </p><br/>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        Q. &ensp;Are the ceremony and reception venues wheelchair-accessible?
                    </p>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        &emsp; &ensp;Yes
                    </p><br/>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        Q. &ensp;Who do I contact for further questions?
                    </p>
                    <p className="FaqPage-P1" style={FaqPageP1}>
                        &emsp; &ensp;Please feel free to text or call us personally or contact us at miguel.jessica.shared@gmail.com
                    </p>
                </div>
            </div>
        );
    }
}

export default FaqPage;