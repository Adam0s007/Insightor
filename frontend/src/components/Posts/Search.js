import React, { useState } from 'react';
import classes from './Search.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiSettingsKnobs } from 'react-icons/gi';
import FilterModal from './FilterModal';

const Search = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newFiltersHanlder = (newFilters) => {
    console.log("it works");
  }

  const onSearchChange = (event) => {
    props.onSearchChange(event.target.value);
  }

  return (
    <div className={classes.container}>
      <input 
        type="text" 
        placeholder="Search" 
        className={classes.searchInput
        
        }
      />
      <AiOutlineSearch className={classes.icon} />
      <GiSettingsKnobs className={classes.icon} onClick={() => setIsModalOpen(true)} />
      
      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onNewFilters={newFiltersHanlder} />
    </div>
  );
}

export default Search;
