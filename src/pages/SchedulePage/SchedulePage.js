import React from 'react';
import { styled } from '@mui/material/styles';

import './SchedulePage.css';

const SchedulePageMain = {
    // maxWidth: window.screen.availWidth * 0.6, 
    // minWidth: window.screen.availWidth * 0.6,
    // top: window.screen.availHeight * 0.42,
    // left: window.screen.availWidth * 0.50,
    // width: '100%',
    // margin: 0,
    // padding: 0,
    // position: 'absolute',
    // alignItems: 'center',
    // justifyContent: 'center',
    // transform: 'translate(-50%, -50%)', // keep it centered
}

const SchedulePageP1 = {
    fontSize:  `${window.screen.height * 0.015}px`,
    color: 'white',
    textAlign: 'center',
}

const SchedulePageP1Title = {
    fontSize:  `${window.screen.height * 0.025}px`,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'lighter',
}

const SchedulePageH1 = {
    fontSize:  `${window.screen.height * 0.07}px`,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'lighter',
}

const SchedulePageDivH1 = {
    maxWidth: window.screen.availWidth, 
    minWidth: window.screen.availWidth,
    top: window.screen.availHeight * 0.25,
    left: window.screen.availWidth * 0.50,
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)', // keep it centered
}

const SchedulePageDivP1TitleCeremony = {
    maxWidth: window.screen.availWidth, 
    minWidth: window.screen.availWidth,
    top: window.screen.availHeight * 0.35,
    left: window.screen.availWidth * 0.50,
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)', // keep it centered
}

const SchedulePageDivP1TitleReception = {
    maxWidth: window.screen.availWidth, 
    minWidth: window.screen.availWidth,
    top: window.screen.availHeight * 0.57,
    left: window.screen.availWidth * 0.50,
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)', // keep it centered
}

const SchedulePageDivP1Ceremony = {
    maxWidth: window.screen.availWidth, 
    minWidth: window.screen.availWidth,
    top: window.screen.availHeight * 0.43,
    left: window.screen.availWidth * 0.50,
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)', // keep it centered
}

const SchedulePageDivP1Reception= {
    maxWidth: window.screen.availWidth, 
    minWidth: window.screen.availWidth,
    top: window.screen.availHeight * 0.67,
    left: window.screen.availWidth * 0.50,
    width: '100%',
    margin: 0,
    padding: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)', // keep it centered
}

class SchedulePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.activeItem,
			index: 0,
		};
	}
  
    render() {
        return (
            <div style={SchedulePageMain}>
                <div style={SchedulePageDivH1}>
                    <h1 className="SchedulePage-H1" style={SchedulePageH1}>
                        Saturday, August 20, 2022
                    </h1>
                </div>
                <div style={SchedulePageDivP1TitleCeremony}>
                    <p className="SchedulePage-P1Title" style={SchedulePageP1Title}>
                        The Ceremony
                    </p>
                </div>
                <div style={SchedulePageDivP1Ceremony}>
                    <p className="SchedulePage-P1" style={SchedulePageP1}>
                        1:00 PM - 1:35 PM
                    </p>
                    <p className="SchedulePage-P1" style={SchedulePageP1}>
                        Cloverdale United Church 
                    </p>
                    <p className="SchedulePage-P1" style={SchedulePageP1}>
                        17575 58a Ave, Surrey, BC V3S 1N1, Canada
                    </p>
                </div>
                <div style={SchedulePageDivP1TitleReception}>
                    <p className="SchedulePage-P1Title" style={SchedulePageP1Title}>
                        The Reception
                    </p>
                </div>
                <div style={SchedulePageDivP1Reception}>
                    <p className="SchedulePage-P1" style={SchedulePageP1}>
                        5:00 PM - 6:00 PM (Cocktail hour)
                    </p>
                    <p className="SchedulePage-P1" style={SchedulePageP1}>
                        6:00 PM - 12:00 AM (Dinner and reception)
                    </p>
                    <p className="SchedulePage-P1" style={SchedulePageP1}>
                        SKY Hangar
                    </p>
                    <p className="SchedulePage-P1" style={SchedulePageP1}>
                        18799 Airport Way #170, Pitt Meadows, BC V3Y 2B4, Canada
                    </p>
                </div>
            </div>
        );
    }
}

export default SchedulePage;