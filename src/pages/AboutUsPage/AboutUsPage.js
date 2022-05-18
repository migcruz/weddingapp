import React from 'react';
import { styled } from '@mui/material/styles';

import './AboutUsPage.css';

const AboutUsPageMain = {
    maxWidth: window.screen.availWidth * 0.3, 
    minWidth: window.screen.availWidth * 0.3,
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

const AboutUsPageP1 = {
    fontSize:  `${window.screen.height * 0.0155}px`,
    color: 'white',
}

class AboutUsPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.activeItem,
			index: 0,
		};
	}
  
    render() {
        return (
            <div className="AboutUsPage-Main" style={AboutUsPageMain}>
                <p className="AboutUsPage-P1" style={AboutUsPageP1}>
                    Miguel and Jessica met 10 years ago during an information session to join the Unmanned Aerial Vehicle engineering at SFU. As engineering nerds and UAV enthusiasts, Jessica and Miguel bonded as classmates, teammates, and friends. After many late nights studying and weekends spent working on the UAV, it was no surprise to Jessica when Miguel finally asked her to be his girlfriend. She, of course, enthusiastically accepted.
                </p>
                <p className="AboutUsPage-P1" style={AboutUsPageP1}>
                    There have been many great achievements that we have shared over our many years together. From graduating University to starting our first jobs, we are proud to have achieved these goals as a team. Though the road in life is never easy, we couldn’t imagine facing the challenges of life without each other. This is how we know we are truly meant to be. 
                </p>
                <p className="AboutUsPage-P1" style={AboutUsPageP1}>
                    We are so excited to be taking this next step in our lives and in our commitment to each other by getting married. Please join us on August 20th, 2022 to witness and celebrate our marriage. We would be so thankful to have you there on this special day.
                </p>
            </div>
        );
    }
}

export default AboutUsPage;