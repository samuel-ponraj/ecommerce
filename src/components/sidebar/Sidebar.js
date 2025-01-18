import React, { useState } from 'react'
import './Sidebar.css'
import { Skeleton, Slider } from '@mui/material'

const Sidebar = ({isMenuOpen, setIsMenuOpen, categories, loading, onCategoryChange, onPriceRangeChange, onSortChange }) => {

    const [value, setValue] = useState([100, 50000]);

    const valuetext = (value) => {
        return value > 50000 ? `${value}+` : value;
      };

      const handleChange = (event, newValue) => {
        setValue(newValue);
        onPriceRangeChange(newValue);
      };
    
      const handleSortChange = (e) => {
        onSortChange(e.target.value);
      };

      const capitalizeFirstLetter = (category) => {
        return category.charAt(0).toUpperCase() + category.slice(1);
      };

      if (loading) {
        return (
          <div className='sidebar'>
            <Skeleton variant="rectangular" width="100%" height='100vh' />
          </div>
        );
      }

  return (
    <div className={`sidebar ${isMenuOpen ? "active" : ""}`}>
        <div className='sidebar-content'>
            <div className="sort">
                <h4>SORT BY</h4>
                <ul>
                    <li>
                    <input type="radio" name="sort" value="Ratings" onChange={handleSortChange} />
                    <label>Ratings</label>
                    </li>
                    <li>
                    <input type="radio" name="sort" value="Price: Low to High" onChange={handleSortChange} />
                    <label>Price: Low to High</label>
                    </li>
                    <li>
                    <input type="radio" name="sort" value="Price: High to Low" onChange={handleSortChange} />
                    <label>Price: High to Low</label>
                    </li>
                </ul>
            </div>
            <div className="category">
                <h4>CATEGORY</h4>
                {categories.map((category) => (
                <ul key={category}>
                    <li>
                        <input type="checkbox"  onChange={() => onCategoryChange(category)}/>
                        <label htmlFor="">{capitalizeFirstLetter(category)}</label>
                    </li>
                </ul>
                ) )}
            </div>
            <div className="price-range">
                <h4>PRICE RANGE</h4>
                <p>₹{value[0]} – ₹{value[1] > 50000 ? `${value[1]}+` : value[1]}</p>
                <Slider
                    sx={{color:'var(--primary)'}}
                    className='slider'
                    min={100}
                    max={60000}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext}
                />
            </div>
        </div> 
    </div>
  )
}

export default Sidebar