import {React, useState, useEffect} from 'react'
import {Container, Typography, Box, Fab, IconButton, Menu, MenuItem } from '@material-ui/core';
import {ToggleButton} from '@material-ui/lab';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const options = [
    'Mark All As read',
    'Change Password',
    'Profile',
    'Dark Mode',
    'Feedback',
    'About Us',
];

const ITEM_HEIGHT = 48;

export const HomeHeader = ()=> {

     const [anchorEl, setAnchorEl] = useState(null);
     const open = Boolean(anchorEl);

     const handleClick = (event) => {
         setAnchorEl(event.currentTarget);
     };

     const handleClose = () => {
         setAnchorEl(null);
     };

    return (
        <Container maxWidth="sm">
       <Box component="div" style={{ backgroundColor: '#cfe8fc', height: '10vh', borderRadius: '5px', paddingTop: '3%'  }}> 
            <Typography variant="h4" style={{float: 'left', width: '90%', textAlign: 'center'}} >Messages</Typography> 
        <div style={{width: '10%', float: 'left'}}>
         <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
        <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Profile'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
</div>
         </Box>
      </Container>
    )
}
