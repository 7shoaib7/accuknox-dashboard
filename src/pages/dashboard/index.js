import React, { useState } from 'react'
//css
import "./dashboard.css"
import SearchTextField from '../../components/SearchTextField'
//mui
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SyncIcon from '@mui/icons-material/Sync';
//jsonData
import dashBoardData from '../../constants/jsonData';
//compoonents
import Widget from '../../components/Widget';
import AddWidgetDrawer from '../../components/AddWidgetDrawer';



const HomeDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
   
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };


    return (
        <>
            <div className="dashboard">
                <div className="dashboard-search">
                    <SearchTextField
                        placeholder="Search anything..."
                        // value={searchValue}
                        // onChange={handleChange}
                        width="20rem"
                    />
                </div>
                <div className="dashboard-header">
                    <h4>CNAPP Dashboard</h4>
                    <div className="dashboard-heder-right">
                        <div className="dashboard-header-add-widget" onClick={toggleDrawer}>
                            <h6>Add Widget</h6>
                            <AddIcon className='add-widget-icon' />
                        </div>
                        <div className="dashboard-header-menu1">
                            <SyncIcon className='sync-icon' />
                        </div>
                        <div className="dashboard-header-menu2">
                            <MoreVertIcon className='vertical-icon' />
                        </div>
                    </div>
                </div>

                <div className="dashboard-category-widgets">
                    {dashBoardData.categories.map((category) => (
                        <div key={category.id}>
                            <div className="dashboard-category">
                                <h5 className="category-name">{category.name}</h5>
                            </div>

                            <div className="category-widgets"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: "1rem",
                                    overflowX: 'auto',
                                    padding: '10px',
                                }}
                            >
                                {category.widgets.map((widget) => (
                                    <Widget key={widget.id} widget={widget} />
                                ))}
                                <div className="add-widgets" onClick={toggleDrawer}>
                                    <div className="add-widget-btn">
                                        <AddIcon className='add-widget-icon' />
                                        <h6>Add Widget</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AddWidgetDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}/>
        </>
    )
}

export default HomeDashboard