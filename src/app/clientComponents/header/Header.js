import MySlider from "../slider/MySlider";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import "./style.css";
import Image from "next/image";

function Header({
  year,
  setyear,
  segment,
  subSegments,
  selectedSubSegment,
  setSelectedSubSegemnt,
  ValueCAGR,
  VolumeCAGR,
  globalLabels,
  handleGlobalToggle,
}) {
  const handleChange = (e) => {
    setSelectedSubSegemnt(e.target.value);
  };
  return (
    <header className="mainheader">
      <div className="header">
        {/* <Image
          src=""
          alt="bullet"
          style={{ display: "inline", float: "left" }}
        /> */}
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
        <div className="blank"> </div>
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
          <h1>
            CAGR
            <br />
            {year.start} - {year.end}
          </h1>
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
      </div>
    </header>
  );
}

export default Header;
