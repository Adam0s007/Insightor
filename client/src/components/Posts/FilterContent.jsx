import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtersActions } from "../../store/filters-slice";
import classes from './FilterContent.module.css'


const checkFilterValues = (filters)=>{
   
    return filters.startDate !== "" || filters.endDate !== "" || filters.personName !== "";
}


const FilterContent = ({ onApplyFilters }) => {
    const dispatch = useDispatch();
    const currentFilters = useSelector((state) => state.filters);

    const [startDate, setStartDate] = useState(currentFilters.startDate);
    const [endDate, setEndDate] = useState(currentFilters.endDate);
    const [personName, setPersonName] = useState(currentFilters.personName);
    

    const applyFilters = (e) => {
        e.preventDefault();
        const newFilters = { startDate, endDate, personName };
        onApplyFilters(newFilters);
    }

    const resetFiltersHandler = () => {
        dispatch(filtersActions.resetFilters());
        setStartDate("");
        setEndDate("");
        setPersonName("");
    }

    const disabledResetButton = !checkFilterValues(currentFilters);

    return (
        <form onSubmit={applyFilters} className={classes["filter-content"]}>
            <h4>Filter Posts</h4>
            <div className={classes["date-row"]}>
                <input 
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className={classes["date-input"]}
                />
                <span className={classes["date-label"]}>to</span>
                <input 
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className={classes["date-input"]}
                />
            </div>
            <input 
                type="text" 
                placeholder="Author" 
                value={personName}
                onChange={e => setPersonName(e.target.value)}
                className={classes.author}
            />
            
            <button type="submit" onClick={applyFilters} className={classes['button__apply-filters']}>Apply Filters</button>
            <button type="button" disabled={disabledResetButton} onClick={resetFiltersHandler} className={classes['button__reset-filters']}>Reset Filters</button>
        </form>
    );
}

export default FilterContent;
