import MySlider from "../slider/MySlider";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Checkbox,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import "./style.css";
import { useState } from "react";
// import Image from "next/image";

function Header({
  year,
  setyear,
  segment,
  subSegments,
  setSelectedSubSegment,
  selectedSubSegments,
  setSelectedSubSegments,
  ValueCAGR,
  VolumeCAGR,
  globalLabels,
  handleGlobalToggle,
  prevYear,
  currentYear,
  isValueFieldEmpty,
  isVolumeFieldEmpty,
}) {
  const isAllSelected =
    subSegments.length > 0 && selectedSubSegments.length === subSegments.length;

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value[value.length - 1] === "all") {
      setSelectedSubSegments(
        selectedSubSegments.length === subSegments.length ? [] : subSegments
      );
      return;
    }
    setSelectedSubSegment("");
    setSelectedSubSegments(value);
  };
  return (
    <header className="mainheader">
      <div className="flex-header-1 flex-header">
        <div className="Showlables">
          Show All Labels
          <Switch
            size="small"
            checked={globalLabels}
            onClick={handleGlobalToggle}
            sx={{ top: 0 }}
          />
        </div>
        <MySlider
          year={year}
          setyear={setyear}
          prevYear={prevYear}
          currentYear={currentYear}
        />
      </div>
      <div className="flex-header-2 flex-header">
        <h1>Global Pea Protein Market Report by {segment}</h1>
        <FormControl className="selectSubsegmentContainer">
          <InputLabel id="select-subsegment">Sub-Segment</InputLabel>
          <Select
            labelId="select-subsegment"
            id="subsegment"
            className="selectSubSegment"
            // label="Sub-Segment"
            multiple
            input={<OutlinedInput label="Sub-Segment" />}
            value={selectedSubSegments}
            onChange={handleChange}
            renderValue={(selectedSubSegments) =>
              selectedSubSegments.join(", ")
            }
          >
            <MenuItem value="all" key={"all"}>
              <Checkbox checked={isAllSelected} />
              <ListItemText primary="Select All" />
            </MenuItem>
            {subSegments.map((subSegment) => {
              return (
                <MenuItem value={subSegment} key={subSegment}>
                  <Checkbox
                    checked={selectedSubSegments.indexOf(subSegment) > -1}
                  />
                  <ListItemText primary={subSegment} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="flex-header-3 flex-header">
        <div className="pillContainer">
          {!isValueFieldEmpty && (
            <div className="valuePill pillStyle">
              <h5>Value</h5>
              <h5>{ValueCAGR}</h5>
            </div>
          )}
          <h3>
            CAGR
            <br />
            {year.start} - {year.end}
          </h3>
          {!isVolumeFieldEmpty && (
            <div className="volumePill pillStyle">
              <h5>Volume</h5>
              <h5>{VolumeCAGR}</h5>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
