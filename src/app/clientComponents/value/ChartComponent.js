import { useEffect, useState } from "react";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import StackChart from "../charts/StackChart";

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
        <PieChart {...commonProps} yType={"Value"} showMaxYear={true} />
      )}
      {!isValueFieldEmpty && <StackChart {...commonProps} yType={"Value"} />}
      {isVolumeFieldEmpty && (
        <PieChart {...commonProps} yType={"Value"} showMaxYear={false} />
      )}
      {!isVolumeFieldEmpty && <LineChart data={globalData} {...commonProps} />}
    </>
  );
}

export default ChartComponent;
