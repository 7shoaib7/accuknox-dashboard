import { createSlice } from '@reduxjs/toolkit';
import dashBoardData from '../constants/jsonData';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        categories: dashBoardData.categories,
    },
    reducers: {
        addWidget: (state, action) => {
            const { categoryId, widget } = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId);
            if (category) {
                category.widgets.push(widget);
            }
        },
        removeWidget: (state, action) => {
            const { categoryId, widgetId } = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId);
            if (category) {
                category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
            }
        },
    },
});

export const selectCategories = (state) => state.dashboard.categories;
export const { addWidget,removeWidget  } = dashboardSlice.actions;
export default dashboardSlice.reducer;
