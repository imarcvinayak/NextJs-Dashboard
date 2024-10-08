"use client";
import { useEffect, useState } from "react";
import ChartByValue from "./value/ChartComponent";
import ChartByVolume from "./volume/ChartComponent";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import CardValue from "./output/CardValue";
import Data from "../data/data.json";
import "./style.css";

function ChartList() {
  const [globalData, setGlobalData] = useState();
  const [showLabels, setshowLabels] = useState({
    stackedValueLabels: false,
    lineLabels: false,
    stackedVolumeLabels: false,
  });
  const [globalLabels, setGlobalLabels] = useState(false);
  const [selectedSubSegment, setSelectedSubSegemnt] = useState("");
  const [segments, setSegments] = useState([]);
  const [subSegments, setSubSegments] = useState([]);
  const [segment, setSegment] = useState("Type");
  const [year, setYear] = useState({
    start: 0,
    end: 0,
  });

  const [historicalValueCAGR, setHistoricalValueCAGR] = useState(0);
  const [forecastValueCAGR, setForecastValueCAGR] = useState(0);
  const [historicalvolumeCAGR, setHistoricalVolumeCAGR] = useState(0);
  const [forecastVolumeCAGR, setForecastVolumeCAGR] = useState(0);
  const [totalValueCAGR, setTotalValueCAGR] = useState(0);
  const [totalVolumeCAGR, setTotalVolumeCAGR] = useState(0);
  let currentYear = new Date().getFullYear();
  let prevYear = new Date().getFullYear() - 1;

  function calculateCAGR(beginningValue, endingValue, numberOfYears) {
    let cagr = Math.pow(endingValue / beginningValue, 1 / numberOfYears) - 1;
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
    if (!Data) return;
    const filteredDataByReportName = Data.filter(
      (d) => d["Report Name"] === "Global Pea Protein Market Report"
    );
    let totalValueforMinYear = 0;
    let totalValueforMaxYear = 0;
    let totalVolumeforMinYear = 0;
    let totalVolumeforMaxYear = 0;
    let currentYearValue = 0;
    let currentYearVolume = 0;
    let prevYearValue = 0;
    let prevYearVolume = 0;

    filteredDataByReportName.forEach((d) => {
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
        year.end - year.start
      )
    );
    setTotalVolumeCAGR(
      calculateCAGR(
        totalVolumeforMinYear,
        totalVolumeforMaxYear,
        year.end - year.start
      )
    );
  }, [year]);

  useEffect(() => {
    if (!Data) return;
    const data = Data.filter(
      (d) => d["Report Name"] === "Global Pea Protein Market Report"
    );
    const filteredYearWiseData = data.filter(
      (d) => d.Year >= year.start && d.Year <= year.end
    );
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
    setGlobalData(filteredYearWiseData);
    setSegments(segmentList);
  }, [year, segment]);

  const chartTitle = {
    Value: {
      pieChart: `Value distribution for ${year.end}`,
      stackChart: "Value distribution (Millions US$)",
      lineChart: "Average Price Trend ($/MT)",
    },
    Volume: {
      pieChart: `Volume distribution for ${year.end}`,
      stackChart: "Volume distribution for (KMT)",
      bubbleChart: "Opportunity Assessment",
    },
  };
  const commonProps = {
    data: globalData,
    segment,
    selectedSubSegment,
    setSelectedSubSegemnt,
    chartTitle,
    year,
    showLabels,
    setshowLabels,
    globalLabels,
  };

  return (
    <>
      <Header
        year={year}
        setyear={setYear}
        segment={segment}
        subSegments={subSegments}
        selectedSubSegment={selectedSubSegment}
        setSelectedSubSegemnt={setSelectedSubSegemnt}
        ValueCAGR={totalValueCAGR}
        VolumeCAGR={totalVolumeCAGR}
        globalLabels={globalLabels}
        handleGlobalToggle={handleGlobalToggle}
      />
      <main className="main">
        <div className="cards">
          <CardValue
            h3="Historical Value"
            p={"CAGR"}
            h2={historicalValueCAGR}
            span={
              year.start + " - " + (prevYear < year.end ? prevYear : year.end)
            }
          />
          <CardValue
            h3="Forecast Value"
            p={"CAGR"}
            h2={forecastValueCAGR}
            span={year.start + " - " + year.end}
          />
          <CardValue
            h3="Historical Volume"
            p={"CAGR"}
            h2={historicalvolumeCAGR}
            span={
              year.start + " - " + (prevYear < year.end ? prevYear : year.end)
            }
          />
          <CardValue
            h3="Forecast Volume"
            p={"CAGR"}
            h2={forecastVolumeCAGR}
            span={year.start + " - " + year.end}
          />
        </div>
        <div className="DistributionCharList" style={{ marginLeft: "20px" }}>
          {globalData && <ChartByValue {...commonProps} />}
          {globalData && <ChartByVolume {...commonProps} />}
        </div>
      </main>
      <Footer segments={segments} setSegment={setSegment} />
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
