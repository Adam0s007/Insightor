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
          defaultValue={filters.authorName || searchParams.get("authorName") || ""}
          onChange={handleChange}
        />
        <input
          name="authorSurname"
          placeholder="Enter author surname"
          defaultValue={
            filters.authorSurname || searchParams.get("authorSurname") || ""
          }
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
            defaultValue={filters.dateFrom || searchParams.get("dateFrom") || ""}
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
            defaultValue={filters.dateTo || searchParams.get("dateTo") || ""}
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
          min="0"
          max="5"
          step="0.5"
          placeholder="0 to 5 (0.5 steps)"
          defaultValue={filters.rating || searchParams.get("rating") || ""}
          className={classes.ratingInput}
          onChange={handleChange}
          onInvalid={(e) => {
            e.target.setCustomValidity("");
            if (e.target.validity.valueMissing) {
              e.target.setCustomValidity("Please provide a rating.");
            } else if (
              e.target.validity.rangeOverflow ||
              e.target.validity.rangeUnderflow ||
              e.target.validity.stepMismatch
            ) {
              e.target.setCustomValidity(
                "Rating should be between 0 and 5, with 0.5 steps."
              );
            }
          }}
          onInput={(e) => e.target.setCustomValidity("")} // Reset custom validation
        />
      </div>
    </div>
  );
};

export default FilterContent;
