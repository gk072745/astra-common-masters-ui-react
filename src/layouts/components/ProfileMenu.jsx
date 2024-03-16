import { useState } from 'react';
import { Avatar, Badge, Menu, ListItemIcon, ListItemText, Divider, MenuList, MenuItem } from '@mui/material';
import { TbUser, TbSettings, TbCurrencyDollar, TbHelp, TbLogout } from "react-icons/tb";

import avatar1 from '../../assets/images/avatars/avatar-1.png';
import { useLocation, useNavigate } from 'react-router-dom';


const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const location = useLocation()

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('auth')
        navigate('/login', { state: { prevRoute: location.pathname || "/" } })
        handleCloseMenu();
    };

    return (
        <>
            <Badge
                variant="dot"
                overlap='circular'
                color="success"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}

            >
                <Avatar
                    sx={{
                        cursor: 'pointer',
                        height: 40,
                        width: 40
                    }}
                    src={avatar1}
                    onClick={handleOpenMenu}
                />
                <Menu
                    sx={{
                        mt: 1.5,
                        paddingTop: 0,
                        paddingBottom: 0,
                    }}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                width: '230px',
                                borderRadius: 2,
                            },
                        }
                    }}

                >
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon sx={{ marginRight: '8px' }}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                    color="success"
                                >
                                    <Avatar src={avatar1} />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary="John Doe" secondary="Admin" />
                        </MenuItem>

                        <Divider />

                        {/* Profile */}
                        <MenuItem>
                            <ListItemIcon sx={{ fontSize: '1.375rem' }}>
                                <TbUser />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </MenuItem>

                        {/* Settings */}
                        <MenuItem>
                            <ListItemIcon sx={{ fontSize: '1.375rem' }}>
                                <TbSettings />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </MenuItem>

                        {/* Pricing */}
                        <MenuItem>
                            <ListItemIcon sx={{ fontSize: '1.375rem' }}>
                                <TbCurrencyDollar />
                            </ListItemIcon>
                            <ListItemText primary="Pricing" />
                        </MenuItem>

                        {/* FAQ */}
                        <MenuItem>
                            <ListItemIcon sx={{ fontSize: '1.375rem' }}>
                                <TbHelp />
                            </ListItemIcon>
                            <ListItemText primary="FAQ" />
                        </MenuItem>

                        <Divider />

                        {/* Logout */}
                        <MenuItem onClick={handleLogout} >
                            <ListItemIcon sx={{ fontSize: '1.375rem' }}>
                                <TbLogout />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </MenuItem >
                    </MenuList >
                </Menu >
            </Badge >


        </>
    );
};

export default ProfileMenu;
