import { useEffect, useState } from "react";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import StackChart from "../charts/StackChart";

function ChartComponent({
  data,
  segment,
  selectedSubSegment,
  setSelectedSubSegemnt,
  chartTitle,
  year,
  showLabels,
  setshowLabels,
  globalLabels
}) {
  const [globalData, setGlobalData] = useState();
  const width = "100%";
  const height = "240px";
  // console.log(segment)
  useEffect(() => {
    if (!data) return;
    setGlobalData(data);
  }, [data]);

  // console.log(data, "ll");

  const commonProps = {
    globalData,
    width,
    height,
    segment,
    selectedSubSegment,
    setSelectedSubSegemnt,
    chartTitle,
    year,
    showLabels,
    setshowLabels,
    globalLabels
  };
  return (
    <div className="ValueDistributionCharList">
      <PieChart {...commonProps} yType={"Value"} />
      <StackChart {...commonProps} yType={"Value"}  />
      <LineChart data={globalData} {...commonProps} />
    </div>
  );
}

export default ChartComponent;
