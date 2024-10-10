import React from "react";
// import { useState } from "react";
import Slider from "@mui/material/Slider";
import "./style.css";

function MySlider({ year, setyear }) {
  // const [yearRange, setYearRange] = useState([2018, 2028]); // Default range

  const handleChange = (e) => {
    // setYearRange(e.target.value); // Update state on slider change
    // setyear(e.target.value);
    setyear({
      start: e.target.value[0],
      end: e.target.value[1],
    });
  };
  const handleInputChange = (e, type) => {
    if (type === "start") {
      setyear({
        ...year,
        start: e.target.value,
      });
    } else {
      setyear({
        ...year,
        end: e.target.value,
      });
    }
  };

  return (
    <div className="slider-container">
      <h3>Select Time Period</h3>
      <div className="inputYear">
        <input
          type="text"
          value={year.start}
          onChange={(e) => handleInputChange(e, "start")}
        />
        <input
          type="text"
          value={year.end}
          onChange={(e) => handleInputChange(e, "end")}
        />
      </div>
      <Slider
        value={Object.values(year)}
        name="year"
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={2018}
        max={2028}
        // step={1}
      />
    </div>
  );
}
export default MySlider;
