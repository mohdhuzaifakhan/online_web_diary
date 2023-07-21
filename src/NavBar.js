
import React, { useEffect, useState } from 'react'
import { AppBar, IconButton, Typography, Box, Toolbar, Avatar, Menu, MenuItem, Drawer, ListItemIcon, ListItemText, List, ListItem, ListItemButton, Paper, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle, OpenInBrowser } from '@mui/icons-material';
import MoreIcon from '@mui/icons-material/MoreVert';
import InboxIcon from '@mui/icons-material/Inbox';
import { VideoFile } from '@mui/icons-material';
import { PhotoLibrary } from '@mui/icons-material';
import { PictureAsPdf } from '@mui/icons-material';
import { EditNote } from '@mui/icons-material';
import { PowerSettingsNew } from '@mui/icons-material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { auth } from '../src/firebase/initialization'
function NavBar() {
    const navigate = useNavigate();
    const [profilePhotoUrl, setProfilePhotoUrl] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
    const [userInfo, setUserInfo] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    function toggleDrawer(open) {
        setOpen(!open)
    }


    useEffect(() => {

        const userInfo = JSON.parse(localStorage.getItem("user"))
        if (userInfo != null) {
            setUserInfo(userInfo);
            const user = auth.currentUser;
            if(user != null){
                setProfilePhotoUrl(user.photoURL)
            }
        } else {
            navigate('/');
        }

    }, [])


    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            open={isMenuOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        //   open={isMenuOpen}
        //   onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Typography>
                    Profile
                </Typography>

            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='sticky' color='transparent'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => { toggleDrawer(open) }}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Diary
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', my: 'auto', md: 'flex', justifyContent: 'center', alignItems: 'center' } }}>

                        <Typography>
                            {userInfo.email}
                        </Typography>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >

                            {
                                profilePhotoUrl ? <Avatar alt="Profile photo" src={profilePhotoUrl} /> :
                                    <AccountCircle />
                            }
                            {/* <Avatar alt="Profile photo" src={profilePhotoUrl} />
                            <AccountCircle /> */}
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            open={open}
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderMobileMenu}
            <React.Fragment>
                <Drawer
                    // sx={{ backgroundColor: '#000' }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    onClose={() => { toggleDrawer(open) }}
                >
                    <Paper backgroundColor="white">
                        <Box
                            role="presentation"
                            onClick={() => { toggleDrawer(open) }}>
                            <Box
                                sx={{ width: '300px', height: '100vh', opacity: 1, backgroundcolor: 'white', zIndex: 50 }}
                            >
                                <List>
                                    <Box sx={{ textAlign: 'end', paddingY: '2px', paddingX: '3px' }}>
                                        <IconButton>
                                            <Close />
                                        </IconButton>
                                    </Box>
                                    <ListItem disablePadding component={Link} to="/profile">
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <AccountCircle />
                                            </ListItemIcon>
                                            <ListItemText primary="Profile" color='black' />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding component={Link} to="/videos">
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <VideoFile />
                                            </ListItemIcon>
                                            <ListItemText primary="My Videos" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding component={Link} to="/photos">
                                        <ListItemButton >
                                            <ListItemIcon>
                                                <PhotoLibrary />
                                            </ListItemIcon>
                                            <ListItemText primary="My Photos" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding component={Link} to="/documents">
                                        <ListItemButton >
                                            <ListItemIcon>
                                                <PictureAsPdf />
                                            </ListItemIcon>
                                            <ListItemText primary="My Documents" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding component={Link} to="/notes">
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <EditNote />
                                            </ListItemIcon>
                                            <ListItemText primary="My Notes" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding component={Link} to="#">
                                        <ListItemButton onClick={() => { localStorage.removeItem("user") }}>
                                            <ListItemIcon>
                                                <PowerSettingsNew />
                                            </ListItemIcon>
                                            <ListItemText primary="Logout" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    </Paper>
                </Drawer>
            </React.Fragment>
        </Box>
    )
}

export default NavBar
