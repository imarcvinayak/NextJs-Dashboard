import { useEffect, useState } from "react";
import PieChart from "../charts/PieChart";
import StackChart from "../charts/StackChart";
import BubbleChart from "../charts/BubbleChart";

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
  showLabels,
  setshowLabels,
  globalLabels,
  selectedLineChartCircle,
  setSelectedLineChartCircle,
  isVolumeFieldEmpty,
  setIsVolumeFieldEmpty,
  colors,
  setColors,
}) {
  const [globalData, setGlobalData] = useState();
  // const [isVolumeFieldEmpty, setIsVolumeFieldEmpty] = useState(false);
  // const width = "100%";
  // const height = "230px";

  useEffect(() => {
    if (!data) return;
    const isVolumeFieldEmpty = data.every((d) => d.Volume === "");
    setIsVolumeFieldEmpty(isVolumeFieldEmpty);
    setGlobalData(data);
  }, [data, isVolumeFieldEmpty]);
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
    showLabels,
    setshowLabels,
    globalLabels,
    selectedLineChartCircle,
    setSelectedLineChartCircle,
    colors,
    setColors,
  };
  return (
    <>
      {!isVolumeFieldEmpty && <PieChart {...commonProps} yType={"Volume"} />}
      {!isVolumeFieldEmpty && <StackChart {...commonProps} yType={"Volume"} />}
      <BubbleChart {...commonProps} />
    </>
  );
}

export default ChartComponent;
