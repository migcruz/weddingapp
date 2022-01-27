import * as React from 'react';
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
    padding: window.screen.height * 0.015,
});

const NavBarTab = styled(Tab)({
    color: 'hsla(0, 0%, 100%, 1)', //Font color
    paddingTop: window.screen.height * 0.01,
    paddingBottom: window.screen.height * 0.01,
    paddingLeft: window.screen.height * 0.04,
    paddingRight:  window.screen.height * 0.04,
    fontSize: window.screen.height * 0.01,
    fontWeight: '100',
    '&:hover': {
        backgroundColor: 'hsla(0, 0%, 100%, 0.50)',
        borderColor: 'hsla(0, 0%, 100%, 1)',
        color: 'hsla(0, 0%, 1%, 1)',
        boxShadow: 'none',
    },
    '&.Mui-selected': {
        backgroundColor: 'hsla(0, 50%, 70%, 0.7)',
        borderColor: 'hsla(0, 0%, 100%, 1)',
        color: 'hsla(0, 0%, 1%, 1)',
        boxShadow: 'none',
    },
});


export default function NavBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <NavBarBox>
      <Tabs value={value} onChange={handleChange} indicatorColor='' centered>
        <NavBarTab label="Home" />
        <NavBarTab label="Schedule" />
        <NavBarTab label="Gift Registry" />
      </Tabs>
    </NavBarBox>
  );
}