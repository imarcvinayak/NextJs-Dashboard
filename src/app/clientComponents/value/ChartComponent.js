import { useEffect, useState } from "react";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import StackChart from "../charts/StackChart";

function ChartComponent({
  data,
  width,
  height,
  segment,
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
  isValueFieldEmpty,
  setIsValueFieldEmpty,
  colors,
  setColors,

}) {
  const [globalData, setGlobalData] = useState();
  // const width = "100%";
  // const height = "230px";

  useEffect(() => {
    if (!data) return;
    const isValueFieldEmpty = data.every(d=>d.Value === '')
    setIsValueFieldEmpty(isValueFieldEmpty)
    setGlobalData(data);
  }, [data,isValueFieldEmpty]);



  const commonProps = {
    globalData,
    width,
    height,
    segment,
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
  };
  return (
    <>
      {!isValueFieldEmpty && <PieChart {...commonProps} yType={"Value"} />}
      {!isValueFieldEmpty && <StackChart {...commonProps} yType={"Value"} />}
      <LineChart data={globalData} {...commonProps} />
    </>
  );
}

export default ChartComponent;
