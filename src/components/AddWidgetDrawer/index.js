import React, { useState } from 'react'
import {
    Typography,
    Box,
    Button,
    Drawer,
    AppBar,
    IconButton,
    Tabs,
    Tab,
    Checkbox,
    FormControlLabel,
    useMediaQuery,
    useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//css
import "./drawer.css"
import dashBoardData from '../../constants/jsonData';

const AddWidgetDrawer = ({ drawerOpen, toggleDrawer }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}
            sx={{
                '& .MuiDrawer-paper': {
                    width: isSmallScreen ? '85%' : '40%'
                },
            }}>
            <Box>
                <AppBar position="static" className="drawer-app-bar-header">
                    <Box
                        className="drawer-app-bar-header-description"
                    >
                        <Typography variant="h6" className="app-bar-header-title">
                            Add Widget
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </AppBar>
                <Typography className="drawer-description">
                    Personalise your dashboard by adding the following widget
                </Typography>
                {/* Tabs */}
                <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: 1 }}>
                    <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons={isSmallScreen ? 'auto' : null}
                        sx={{
                            '& .MuiTab-root.Mui-selected': {
                                color: '#080f53',
                            },
                        }}
                    >
                        {dashBoardData.categories.map((category) => (
                            <Tab key={category.id} label={category.label} />
                        ))}
                    </Tabs>
                </Box>
                {/* Tab-content */}
                <Box className="drawer-tab-content">
                    {dashBoardData.categories[selectedTab].widgets.map((widget) => (
                          <Box className="tab-content-widget-list">
                                <Checkbox/>
                                <Typography className="tab-content-widget-name">{widget.name}</Typography>
                          </Box>
                    ))}
                </Box>
            </Box>
        </Drawer>
    )
}

export default AddWidgetDrawer