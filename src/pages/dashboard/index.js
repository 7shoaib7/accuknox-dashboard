import React, { useMemo, useState } from 'react'
//css
import "./dashboard.css"
import SearchTextField from '../../components/SearchTextField'
//mui
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SyncIcon from '@mui/icons-material/Sync';
//compoonents
import Widget from '../../components/Widget';
import AddWidgetDrawer from '../../components/AddWidgetDrawer';
//redux
import { useSelector } from 'react-redux';
import { selectCategories } from "../../redux/dashboardSlice"
//custom
import useDebounce from '../../custom/useDebounce';



const HomeDashboard = () => {
    const categories = useSelector(selectCategories);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    // Filter widgets based on the search query
    const filteredWidgets = useMemo(() => {
        return categories.map((category) => ({
            ...category,
            widgets: category.widgets.filter((widget) =>
                widget.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
            )
        }));
    }, [categories, debouncedSearchQuery]);

    return (
        <>
            <div className="dashboard">
                <div className="dashboard-search">
                    <SearchTextField
                        placeholder="Search anything..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                    {filteredWidgets.map((category) => (
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
                                {category.widgets.length > 0 ? (
                                    category.widgets.map((widget) => (
                                        <Widget key={widget.id} widget={widget} />
                                    ))
                                ) : (
                                    <p>No widgets found</p>
                                )}
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
            <AddWidgetDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} filteredWidgets={filteredWidgets}/>
        </>
    )
}

export default HomeDashboard