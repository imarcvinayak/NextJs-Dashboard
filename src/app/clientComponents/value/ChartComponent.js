import React, { useEffect, useState } from "react";
import EPieChart from "../anotherlibrarycharts/charts/PieChart";
import EStackChart from "../anotherlibrarycharts/charts/StackChart";
import ELineChart from "../anotherlibrarycharts/charts/LineChart";

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
  year,
  showLabels,
  setshowLabels,
  globalLabels,
  selectedLineChartCircle,
  setselectedLineChartCircle,
  isValueFieldEmpty,
  setIsValueFieldEmpty,
  isVolumeFieldEmpty,
  colors,
  setColors,
  colorsArray,
  setColorsArrays,
}) {
  const [globalData, setGlobalData] = useState();

  useEffect(() => {
    if (!data) return;
    const isValueFieldEmpty = data.every((d) => d.Value === "");
    setIsValueFieldEmpty(isValueFieldEmpty);
    setGlobalData(data);
  }, [data, isValueFieldEmpty]);

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
    year,
    showLabels,
    setshowLabels,
    globalLabels,
    selectedLineChartCircle,
    setselectedLineChartCircle,
    colors,
    setColors,
    colorsArray,
    setColorsArrays,
  };
  return (
    <>
      {!isValueFieldEmpty && (
        // <PieChart {...commonProps} yType={"Value"} showMaxYear={true} />
        <EPieChart {...commonProps} yType={"Value"} showMaxYear={true} />
      )}
      {!isValueFieldEmpty && (
        // <StackChart {...commonProps} yType={"Value"} />
        <EStackChart {...commonProps} yType={"Value"} />
      )}
      {isVolumeFieldEmpty && (
        <EPieChart {...commonProps} yType={"Value"} showMaxYear={false} />
      )}
      {(!isVolumeFieldEmpty || isValueFieldEmpty) && (
        // <LineChart data={globalData} {...commonProps} />
        <ELineChart data={globalData} {...commonProps} />
      )}
    </>
  );
}

export default React.memo(ChartComponent);
