import React from 'react';
import { styled } from '@mui/material/styles';

import './GiftRegistryPage.css';

const GiftRegistryPageMain = {
    maxWidth: window.screen.availWidth * 0.4, 
    minWidth: window.screen.availWidth * 0.4,
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

const GiftRegistryPageP1 = {
    fontSize:  `${window.screen.height * 0.017}px`,
    color: 'white',
    textAlign: 'center',
}

class GiftRegistryPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.activeItem,
			index: 0,
		};
	}
  
    render() {
        return (
            <div style={GiftRegistryPageMain}>
                <p className="GiftRegistryPage-P1" style={GiftRegistryPageP1}>If you would like to give us a gift, we would greatly appreciate it if you could please consider a cash gift instead as we currently live out of country. Thank you for understanding!</p>
            </div>
        );
    }
}

export default GiftRegistryPage;