import React, { useState } from 'react'
//mui
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
    TextField,
    Tooltip,
    useMediaQuery,
    useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
//css
import "./drawer.css"
//redux
import { addWidget, removeWidget, selectCategories } from '../../redux/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddWidgetDrawer = React.memo(({ drawerOpen, toggleDrawer ,filteredWidgets}) => {
    // const categories = useSelector(selectCategories);
    const categories = filteredWidgets
    const dispatch = useDispatch();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const [selectedTab, setSelectedTab] = useState(0);
    const [widgetName, setWidgetName] = useState('');
    const [widgetText, setWidgetText] = useState('');
    const [formVisible, setFormVisible] = useState(false);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        handleCancel()
    };


    const handleAddNewWidget = () => {
        if (widgetName && widgetText) {
            const newWidget = {
                id: `widget-${Date.now()}`,
                name: widgetName,
                text: widgetText,
                checked: true,
            };

            // Dispatch action to add the new widget to the selected category
            dispatch(addWidget({ categoryId: categories[selectedTab].id, widget: newWidget }));
            setWidgetName('');
            setWidgetText('');

        }
    };


    const handleCancel = () => {
        setFormVisible(false); // Hide the form
        setWidgetName('');
        setWidgetText('');
    };


    const handleCloseDrawer = () => {
        handleCancel()
        toggleDrawer()
    }

    return (
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}
            sx={{
                '& .MuiDrawer-paper': {
                    width: isSmallScreen ? '85%' : '40%'
                },
            }}>
            <Box>
                 {/*AppBar-Header */}
                <AppBar position="sticky" className="drawer-app-bar-header">
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
                        {categories.map((category) => (
                            <Tab key={category.id} label={category.label} />
                        ))}
                    </Tabs>
                </Box>

                {/* Tab-content */}
                <Box className="drawer-tab-content">
                    {categories[selectedTab].widgets.map((widget) => (
                        <Box className="tab-content-widget-list" key={widget.id}>
                            <Box className="tab-content-widget-list-right">
                                <Checkbox checked={widget.checked} />
                                <Typography className="tab-content-widget-name">{widget.name}</Typography>
                            </Box>
                            <IconButton onClick={() => dispatch(removeWidget({ categoryId: categories[selectedTab].id, widgetId: widget.id }))}>
                                <CloseIcon color="error" />
                            </IconButton>
                        </Box>
                    ))}
                </Box>


                {/*New Widget Button */}
                {!formVisible && (
                    <Box sx={{ textAlign: 'center', marginY: 2 }}>
                        <Tooltip title="Add a new widget to this category" arrow>
                            <IconButton onClick={() => setFormVisible(!formVisible)}>
                                <AddIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Box>)}

                {/* New Widget Form */}
                {formVisible && (
                    <Box className="add-new-widget-form">
                        <Typography className="add-widget-form-heading">Add New Widget</Typography>
                        <TextField
                            label="Widget Name"
                            value={widgetName}
                            onChange={(e) => setWidgetName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Widget Text"
                            value={widgetText}
                            onChange={(e) => setWidgetText(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                            <Button variant="outlined" onClick={handleCancel} sx={{ marginRight: 1, }}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={handleAddNewWidget} sx={{ backgroundColor: '#080f53' }}>
                                Confirm
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Drawer>
    )
})

export default AddWidgetDrawer