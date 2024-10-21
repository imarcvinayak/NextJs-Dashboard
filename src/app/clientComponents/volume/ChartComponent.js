import React, { useEffect, useState } from "react";
import EPieChart from "../anotherlibrarycharts/charts/PieChart";
import EStackChart from "../anotherlibrarycharts/charts/StackChart";
import EBubbleChart from "../anotherlibrarycharts/charts/BubbleChart";

function ChartComponent({
  data,
  width,
  height,
  segment,
  subSegments,
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
  setColorsArrays,
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
    subSegments,
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
    setColorsArrays,
  };
  return (
    <>
      {!isVolumeFieldEmpty && (
        <EPieChart {...commonProps} yType={"Volume"} showMaxYear={true} />
      )}
      {!isVolumeFieldEmpty && <EStackChart {...commonProps} yType={"Volume"} />}
      {/* <BubbleChart {...commonProps} /> */}
      <EBubbleChart {...commonProps} />
    </>
  );
}

export default React.memo(ChartComponent);
