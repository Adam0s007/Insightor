import React, { useState } from 'react';
import classes from './Search.module.css';

import { GiSettingsKnobs } from 'react-icons/gi';
import FilterModal from './FilterModal';
import { useDispatch } from 'react-redux';
import {filtersActions} from '../../store/filters-slice'; // import slice

const Search = (props) => {
  
  console.log("Ja się wykonuję")
  
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newFiltersHandler = (newFilters) => {
    dispatch(filtersActions.setFilters(newFilters));
  }

  const onSearchChange = (event) => {
    dispatch(filtersActions.setFilters({
      title: event.target.value,
      description: event.target.value
    }));
  }

  return (
    <div className={classes.container}>
      <input 
        type="text" 
        placeholder="Search" 
        className={classes.searchInput}
        onChange={onSearchChange}
      />
      
      <GiSettingsKnobs className={classes.icon} onClick={() => setIsModalOpen(true)} />
      
      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onNewFilters={newFiltersHandler} />
    </div>
  );
}

export default Search;
