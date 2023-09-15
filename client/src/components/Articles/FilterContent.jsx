import React from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./FilterContent.module.css";

const FilterContent = ({ filters, setFilters }) => {
  const [searchParams] = useSearchParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.group}>
        <input
          name="authorName"
          placeholder="Enter author name"
          value={filters.authorName || searchParams.get("authorName") || ""}
          onChange={handleChange}
        />
        <input
          name="authorSurname"
          placeholder="Enter author surname"
          value={filters.authorSurname || searchParams.get("authorSurname") || ""}
          onChange={handleChange}
        />
      </div>
      <div className={classes.dateRange}>
        <div className={classes.dateItem}>
          <label htmlFor="dateFrom" className={classes.label}>
            From
          </label>
          <input 
            id="dateFrom" 
            type="date" 
            name="dateFrom" 
            value={filters.dateFrom || searchParams.get("dateFrom") || ""}
            onChange={handleChange}
          />
        </div>
        <div className={classes.Item}>
          <label htmlFor="dateTo" className={classes.label}>
            To
          </label>
          <input 
            id="dateTo" 
            type="date" 
            name="dateTo" 
            value={filters.dateTo || searchParams.get("dateTo") || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={classes.Item}>
        <label className={classes.label} htmlFor="rating">
          Rating
        </label>
        <input
          id="rating"
          type="number"
          name="rating"
          max="5"
          min="0"
          step="0.5"
          value={filters.rating || searchParams.get("rating") || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FilterContent;
