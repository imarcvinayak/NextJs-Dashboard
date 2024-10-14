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
  year,
  colorsArray,
}) {
  const [globalData, setGlobalData] = useState();

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
    year,
    colorsArray,
  };
  return (
    <>
      {!isVolumeFieldEmpty && <PieChart {...commonProps} yType={"Volume"} showMaxYear={true}/>}
      {!isVolumeFieldEmpty && <StackChart {...commonProps} yType={"Volume"} />}
      <BubbleChart {...commonProps} />
    </>
  );
}

export default ChartComponent;
