"use client";
import { useEffect, useState } from "react";
import ChartByValue from "./value/ChartComponent";
import ChartByVolume from "./volume/ChartComponent";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import CardValue from "./output/CardValue";
import Data from "../data/data.json";
import * as am5 from "@amcharts/amcharts5";
import "./style.css";

function ChartList() {
  const [globalData, setGlobalData] = useState();
  const [showLabels, setshowLabels] = useState({
    stackedValueLabels: false,
    lineLabels: false,
    stackedVolumeLabels: false,
  });
  const [globalLabels, setGlobalLabels] = useState(false);
  const [selectedSubSegment, setSelectedSubSegment] = useState("");
  const [selectedLineChartCircle, setselectedLineChartCircle] = useState({});
  const [selectedSubSegments, setSelectedSubSegments] = useState([]);
  const [segments, setSegments] = useState([]);
  const [subSegments, setSubSegments] = useState([]);
  const [segment, setSegment] = useState("Type");
  const [year, setYear] = useState({
    start: 0,
    end: 0,
  });

  const [isValueFieldEmpty, setIsValueFieldEmpty] = useState(false);
  const [isVolumeFieldEmpty, setIsVolumeFieldEmpty] = useState(false);
  const [historicalValueCAGR, setHistoricalValueCAGR] = useState(0);
  const [forecastValueCAGR, setForecastValueCAGR] = useState(0);
  const [historicalvolumeCAGR, setHistoricalVolumeCAGR] = useState(0);
  const [forecastVolumeCAGR, setForecastVolumeCAGR] = useState(0);
  const [totalValueCAGR, setTotalValueCAGR] = useState(0);
  const [totalVolumeCAGR, setTotalVolumeCAGR] = useState(0);

  const [colors, setColors] = useState([am5.color(6779356)]);
  const [colorsArray, setColorsArrays] = useState([am5.color(6779356)]);
  const [selectedColor, setSelectedColor] = useState("");

  let currentYear = new Date().getFullYear();
  let prevYear = new Date().getFullYear() - 1;
  function calculateCAGR(beginingValue, endingValue, numberOfYears) {
    let cagr = Math.pow(endingValue / beginingValue, 1 / numberOfYears) - 1;
    return (cagr * 100).toFixed(2) + "%";
  }
  const handleGlobalToggle = () => {
    const newGlobalChecked = !globalLabels;
    setGlobalLabels(newGlobalChecked);
    setshowLabels({
      stackedValueLabels: newGlobalChecked,
      lineLabels: newGlobalChecked,
      stackedVolumeLabels: newGlobalChecked,
    });
  };

  useEffect(() => {
    if (!Data) return;
    const filteredDataByReportName = Data.filter(
      (d) => d["Report Name"] === "Global Pea Protein Market Report"
    );
    let minYear = filteredDataByReportName[0].Year;
    let maxYear = filteredDataByReportName[0].Year;

    filteredDataByReportName.forEach((d) => {
      if (d.Year <= minYear) minYear = d.Year;
      if (d.Year >= maxYear) maxYear = d.Year;
    });
    setYear({
      start: minYear,
      end: maxYear,
    });
  }, []);

  useEffect(() => {
    setColors([selectedColor ? selectedColor : am5.color(6779356)]);
  }, [selectedColor]);

  useEffect(() => {
    if (!Data) return;
    const filteredData = Data.filter(
      (item) =>
        item["Report Name"] === "Global Pea Protein Market Report" &&
        item.Segment === segment &&
        (selectedSubSegments.length === 0 ||
          selectedSubSegments.includes(item["Sub-Segment"])) &&
        (!selectedSubSegment.length ||
          selectedSubSegment === item["Sub-Segment"])
    );
    let totalValueforMinYear = 0;
    let totalValueforMaxYear = 0;
    let totalVolumeforMinYear = 0;
    let totalVolumeforMaxYear = 0;
    let currentYearValue = 0;
    let currentYearVolume = 0;
    let prevYearValue = 0;
    let prevYearVolume = 0;

    filteredData.forEach((d) => {
      if (d.Year === year.start) {
        totalValueforMinYear += d.Value || 0;
        totalVolumeforMinYear += Number(d.Volume) || 0;
      }
      if (d.Year === year.end) {
        totalValueforMaxYear += d.Value || 0;
        totalVolumeforMaxYear += Number(d.Volume) || 0;
      }
      if (d.Year === currentYear) {
        currentYearValue += d.Value || 0;
        currentYearVolume += Number(d.Volume) || 0;
      }
      if (d.Year === prevYear) {
        prevYearValue += d.Value || 0;
        prevYearVolume += Number(d.Volume) || 0;
      }
    });

    setHistoricalValueCAGR(
      calculateCAGR(
        totalValueforMinYear,
        prevYearValue,
        prevYear !== year.start ? prevYear - year.start : 1
      )
    );
    setForecastValueCAGR(
      calculateCAGR(
        currentYearValue,
        totalValueforMaxYear,
        year.end !== currentYear ? year.end - currentYear : 1
      )
    );
    setHistoricalVolumeCAGR(
      calculateCAGR(
        totalVolumeforMinYear,
        prevYearVolume,
        prevYear !== year.start ? prevYear - year.start : 1
      )
    );
    setForecastVolumeCAGR(
      calculateCAGR(
        currentYearVolume,
        totalVolumeforMaxYear,
        year.end !== currentYear ? year.end - currentYear : 1
      )
    );
    setTotalValueCAGR(
      calculateCAGR(
        totalValueforMinYear,
        totalValueforMaxYear,
        year.end - year.start ? year.end - year.start : 1
      )
    );
    setTotalVolumeCAGR(
      calculateCAGR(
        totalVolumeforMinYear,
        totalVolumeforMaxYear,
        year.end - year.start ? year.end - year.start : 1
      )
    );
  }, [year, segment, selectedSubSegments, selectedSubSegment]);

  useEffect(() => {
    if (!Data) return;
    const data = Data.filter(
      (d) => d["Report Name"] === "Global Pea Protein Market Report"
    );
    // const filteredYearWiseData = data.filter(
    //   (d) => d.Year >= year.start && d.Year <= year.end
    // );
    const filteredData = data.filter(
      (item) =>
        item.Year >= year.start &&
        item.Year <= year.end &&
        item.Segment === segment &&
        (selectedSubSegments.length === 0 ||
          selectedSubSegments.includes(item["Sub-Segment"]))
    );
    // console.log(filteredData)
    const segmentList = [
      ...new Set(
        data.map((d) => {
          return d.Segment;
        })
      ),
    ];
    const subSegmentList = [
      ...new Set(
        data
          .filter((d) => d["Segment"] === segment)
          .map((d) => d["Sub-Segment"])
      ),
    ];
    setSubSegments(subSegmentList);
    setGlobalData(filteredData);
    setSegments(segmentList);
  }, [year, selectedSubSegment, selectedSubSegments, segment]);

  const chartTitle = {
    Value: {
      pieChart: `Value distribution for`,
      stackChart: "Value distribution (Millions US$)",
      lineChart: "Average Price Trend ($/MT)",
    },
    Volume: {
      pieChart: `Volume distribution for`,
      stackChart: "Volume distribution for (KMT)",
      bubbleChart: "Opportunity Assessment",
    },
  };
  const commonProps = {
    width: "100%",
    height: "232px",
    data: globalData,
    segment,
    subSegments,
    selectedSubSegment,
    setSelectedSubSegment,
    selectedSubSegments,
    setSelectedSubSegments,
    chartTitle,
    year,
    showLabels,
    setshowLabels,
    globalLabels,
    selectedLineChartCircle,
    setselectedLineChartCircle,
    colors,
    setColors,
    isValueFieldEmpty,
    isVolumeFieldEmpty,
    setIsValueFieldEmpty,
    setIsVolumeFieldEmpty,
    colorsArray,
  };

  return (
    <>
      <Header
        year={year}
        setyear={setYear}
        segment={segment}
        subSegments={subSegments}
        selectedSubSegment={selectedSubSegment}
        setSelectedSubSegment={setSelectedSubSegment}
        selectedSubSegments={selectedSubSegments}
        setSelectedSubSegments={setSelectedSubSegments}
        ValueCAGR={totalValueCAGR}
        VolumeCAGR={totalVolumeCAGR}
        globalLabels={globalLabels}
        handleGlobalToggle={handleGlobalToggle}
        prevYear={prevYear}
        currentYear={currentYear}
        isValueFieldEmpty={isValueFieldEmpty}
        isVolumeFieldEmpty={isVolumeFieldEmpty}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <main className="main">
        <div className="cards">
          {!isValueFieldEmpty ? (
            <>
              <CardValue
                h3="Historical Value"
                p={"CAGR"}
                h2={historicalValueCAGR}
                span={
                  year.start +
                  " - " +
                  (prevYear < year.end ? prevYear : year.end)
                }
              />
              <CardValue
                h3="Forecast Value"
                p={"CAGR"}
                h2={forecastValueCAGR}
                span={currentYear + " - " + year.end}
              />
            </>
          ) : null}
          {!isVolumeFieldEmpty ? (
            <>
              <CardValue
                h3="Historical Volume"
                p={"CAGR"}
                h2={historicalvolumeCAGR}
                span={
                  year.start +
                  " - " +
                  (prevYear < year.end ? prevYear : year.end)
                }
              />
              <CardValue
                h3="Forecast Volume"
                p={"CAGR"}
                h2={forecastVolumeCAGR}
                span={currentYear + " - " + year.end}
              />
            </>
          ) : null}
        </div>
        <div
          className={
            "DistributionCharList " +
            (isVolumeFieldEmpty || isValueFieldEmpty ? "flex50" : "flex33")
          }
          style={{ marginLeft: "20px" }}
        >
          {globalData && <ChartByValue {...commonProps} />}
          {globalData && <ChartByVolume {...commonProps} />}
        </div>
      </main>
      <Footer
        segments={segments}
        setSegment={setSegment}
        setSelectedSubSegment={setSelectedSubSegment}
        setSelectedSubSegments={setSelectedSubSegments}
      />
    </>
  );
}

export default ChartList;

{
  /* <div>
  <PieChart {...commonProps} yType={"Value"} />
  <StackChart {...commonProps} yType={"Value"} />
  <LineChart data={lineData || globalData} {...commonProps} />
</div> */
}
{
  /* <div>
  <PieChart {...commonProps} yType={"Volume"} />
  <StackChart {...commonProps} yType={"Volume"} />
  <BubbleChart {...commonProps} />
</div> */
}

// select your chart
// <br></br>
// {
//  chartList.map((ch,i)=>{
//     return <button style={{margin: '20px 20px 20px 0'}} key={"ch"+i} onClick={()=>sendID(i)}>{ch}</button>
//  })
// }

// <div>
//  {chartComponents[chartList[chartOption]]}
// </div>
