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
// import Image from "next/image";

function Header({
  year,
  setyear,
  segment,
  subSegments,
  selectedSubSegment,
  setSelectedSubSegment,
  selectedSubSegments,
  setSelectedSubSegments,
  ValueCAGR,
  VolumeCAGR,
  globalLabels,
  handleGlobalToggle,
}) {
  const handleChange = (e) => {
    setSelectedSubSegment("");
    setSelectedSubSegments(e.target.value);
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
        <MySlider year={year} setyear={setyear} />
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
          <div className="valuePill pillStyle">
            <h5>Value</h5>
            <h5>{ValueCAGR}</h5>
          </div>
          <h3>
            CAGR
            <br />
            {year.start} - {year.end}
          </h3>
          <div className="volumePill pillStyle">
            <h5>Volume</h5>
            <h5>{VolumeCAGR}</h5>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

/* <div className="header">
        <div className="Showlables">
          Show All Labels
          <Switch
            size="small"
            checked={globalLabels}
            onClick={handleGlobalToggle}
            sx={{ top: 0 }}
          />
        </div>
        <h1>Global Pea Protein Market Report by {segment}</h1>
        <div className="blank">
        <h3>
            CAGR
            <br />
            {year.start} - {year.end}
          </h3> </div>
      </div>
      <div className="filterContainer">
        <MySlider year={year} setyear={setyear} />
        <FormControl className="selectSubsegmentContainer">
          <InputLabel id="select-subsegment">Sub-Segment</InputLabel>
          <Select
            labelId="select-subsegment"
            id="subsegment"
            className="selectSubSegment"
            label="Sub-Segment"
            // multiple
            value={selectedSubSegment}
            onChange={handleChange}
          >
            {subSegments.map((subSegment) => {
              return (
                <MenuItem value={subSegment} key={subSegment}>
                  {subSegment}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="Cagroutput">
           <h3>
            CAGR
            <br />
            {year.start} - {year.end}
          </h3> 
          <div className="pillContainer">
            <div className="valuePill pillStyle">
              <span>Value</span>
              <span>{ValueCAGR}</span>
            </div>
            <div className="volumePill pillStyle">
              <span>Volume</span>
              <span>{VolumeCAGR}</span>
            </div>
          </div>
        </div>
      </div> */
