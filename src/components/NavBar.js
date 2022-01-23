import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

const NavBarBox = styled(Box)({
    width: 'inherit',
    border: '1px solid',
    borderRadius: '1px',
    backgroundColor: 'hsla(0, 0%, 100%, 0.15)',
    borderColor: 'hsla(0, 0%, 100%, 1)',
    padding: '0.75%',
});

const NavBarTab = styled(Tab)({
    color: 'hsla(0, 0%, 100%, 1)', //Font color
    padding: '0.6% 2.4%',
    fontSize: '40%',
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