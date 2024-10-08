import { useEffect, useState } from "react";
import PieChart from "../charts/PieChart";
import StackChart from "../charts/StackChart";
import BubbleChart from "../charts/BubbleChart";

function ChartComponent({
  data,
  segment,
  selectedSubSegment,
  setSelectedSubSegemnt,
  chartTitle,
  showLabels,
  setshowLabels,
  globalLabels
}) {
  const [globalData, setGlobalData] = useState();
  const width = "100%";
  const height = "240px";

  useEffect(() => {
    if (!data) return;
    setGlobalData(data);
  }, [data]);
  const commonProps = {
    globalData,
    width,
    height,
    segment,
    selectedSubSegment,
    setSelectedSubSegemnt,
    chartTitle,
    showLabels,
    setshowLabels,
    globalLabels
  };
  return (
    <div className="VolumeDistributionCharList">
      <PieChart {...commonProps} yType={"Volume"} />
      <StackChart {...commonProps} yType={"Volume"} />
      <BubbleChart {...commonProps} />
    </div>
  );
}

export default ChartComponent;
