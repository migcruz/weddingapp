import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

const NavBarBox = styled(Box)({
    width: 'inherit',
    borderTop: '1px solid',
    borderBottom: '1px solid',
    borderRadius: '1px',
    backgroundColor: 'hsla(0, 0%, 100%, 0.15)',
    borderColor: 'hsla(0, 0%, 100%, 1)',
    padding: window.screen.availHeight * 0.015,
});

const NavBarTab = styled(Tab)({
    fontFamily: 'Wild and Folk',
    color: 'hsla(0, 0%, 100%, 1)', //Font color
    paddingTop: window.screen.availHeight * 0.01,
    paddingBottom: window.screen.availHeight * 0.01,
    paddingLeft: window.screen.availHeight * 0.04,
    paddingRight:  window.screen.availHeight * 0.04,
    fontSize: window.screen.height * 0.011,
    fontWeight: '100',
    '&:hover': {
        backgroundColor: 'hsla(0, 0%, 100%, 0.50)',
        borderColor: 'hsla(0, 0%, 100%, 1)',
        color: 'hsla(0, 0%, 1%, 1)',
        boxShadow: 'none',
        transitionDuration: '0.75s',
    },
    '&.Mui-selected': {
        backgroundColor: 'hsla(0, 50%, 70%, 0.7)',
        borderColor: 'hsla(0, 0%, 100%, 1)',
        color: 'hsla(0, 0%, 1%, 1)',
        boxShadow: 'none',
        transitionDuration: '0.75s',
    },
});

class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.activeItem,
			index: 0,
		};
	}

    handleChange = (event, newValue) => {
        const { onNavBarChange } = this.props;

		// async callback
        this.setState({ index: newValue}, () => {
			onNavBarChange(this.state.index);
		});
	};
  
    render() {
        return (
            <NavBarBox>
                <Tabs value={this.state.index} onChange={this.handleChange} indicatorColor='' centered>
                <NavBarTab label="Home" />
                <NavBarTab label="About us" />
                <NavBarTab label="FAQ" />
                <NavBarTab label="Schedule" />
                <NavBarTab label="Gift Registry" />
                </Tabs>
            </NavBarBox>
        );
    }
}

export default NavBar;