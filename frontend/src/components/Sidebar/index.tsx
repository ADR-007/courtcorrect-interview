import ContactMailIcon from '@mui/icons-material/ContactMail';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import WorkIcon from '@mui/icons-material/Work';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {styled, useTheme} from '@mui/material/styles';
import React from 'react';

const SidebarContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    background: theme.palette.background.default,
    borderRight: `1px solid ${theme.palette.action.disabledBackground}`,
}));

const IconContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    gap: theme.spacing(3),
}));

const StyledIconButton = styled(IconButton)(({theme}) => ({
    width: '32px',
    height: '32px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
    // Custom styles for the active search icon button
    "&.tabActive": {
        backgroundColor: theme.palette.action.disabledBackground,
        "& .MuiSvgIcon-root": {
            color: theme.palette.success.main,
        },
    },
}));

const Sidebar = () => {
    const theme = useTheme();

    return (
        <SidebarContainer>
            <IconContainer>
                <Box height="128px">
                    <StyledIconButton>
                        <img src="/logo64.png" alt="logo" width="32px" height="32px"/>
                    </StyledIconButton>
                </Box>
                <StyledIconButton>
                    <HomeIcon sx={{color: theme.palette.action.disabled}}/>
                </StyledIconButton>
                <StyledIconButton>
                    <WorkIcon sx={{color: theme.palette.action.disabled, transform: 'rotate(0.16deg)'}}/>
                </StyledIconButton>
                <StyledIconButton>
                    <ContactMailIcon sx={{color: theme.palette.action.disabled}}/>
                </StyledIconButton>
                <StyledIconButton>
                    <DescriptionIcon sx={{color: theme.palette.action.disabled}}/>
                </StyledIconButton>
                <StyledIconButton className="tabActive">
                    <SearchIcon/>
                </StyledIconButton>
                <StyledIconButton>
                    <SettingsIcon sx={{color: theme.palette.action.disabled}}/>
                </StyledIconButton>
                {/* Continue with other icons as needed */}
            </IconContainer>
        </SidebarContainer>
    );
};

export default Sidebar;
