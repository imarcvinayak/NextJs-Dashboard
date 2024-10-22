// 'use Client'
import ReactECharts from "echarts-for-react";
import React, { useLayoutEffect, useState } from "react";
import { Switch } from "@mui/material";

function LineChart({
  globalData: data,
  width,
  height,
  segment,
  selectedSubSegment,
  // selectedSubSegments,
  chartTitle,
  showLabels,
  setshowLabels,
  // colors,
  colorsArray,
}) {
  const [ElineData, setElineData] = useState({
    xAxisData: [],
    yAxisData: [],
  });
  useLayoutEffect(() => {
    if (!data) return;
    let filteredLineChartData = [];
    if (selectedSubSegment)
      filteredLineChartData = data.filter(
        (d) =>
          d["Segment"] === segment && d["Sub-Segment"] === selectedSubSegment
      );
    else filteredLineChartData = data.filter((d) => d["Segment"] === segment);

    let lineData = {};
    filteredLineChartData?.forEach((l) => {
      const year = l.Year;
      const valueinusd = l.Value * 1e6;
      const volumeinMt = l.Volume * 1000;
      if (!lineData[year]) lineData[year] = { value: 0, volume: 0 };

      lineData[year].value += valueinusd || 0;
      lineData[year].volume += volumeinMt || 0;
    });
    const lineChartData = Object.keys(lineData).map((k) => {
      // return {
      //   year: k,
      //   value: Math.round(lineData[k].value / lineData[k].volume),
      // };
      return Math.round(lineData[k].value / lineData[k].volume);
    });
    setElineData({
      xAxisData: Object.keys(lineData),
      yAxisData: lineChartData,
    });
  }, [data]);
  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#1976d2",
      textStyle: {
        color: "#fff",
      },
      formatter: (params) => {
        const formattedValue = params[0].value;
        return `${formattedValue}`;
      },
    },
    grid: {
      left: "10",
      right: "20",
      bottom: "10",
      top: "20",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisLabel: {
        rotate: 45, // Rotate the X-axis labels by 45 degrees
      },
      data: ElineData.xAxisData, // X-axis categories
      axisLine: {
        show: false, // Hide the X-axis line
      },
      axisTick: {
        show: false, // Hide tick marks on X-axis
      },
    },
    yAxis: {
      type: "value", // Y-axis is a value axis
      splitLine: {
        show: false, // Disable horizontal grid lines
      },
      minInterval: 1000,
      min: (value) => {
        return Math.floor(value.min / 1000) * 1000; // 90% of the minimum value, rounded down
      },
    },
    series: [
      {
        name: "Average Price trends",
        type: "line", // Specify line chart
        data: ElineData.yAxisData, // Line data
        smooth: false, // Makes the line smooth
        itemStyle: {
          color: colorsArray[2], // Line color
        },
        symbol: "circle",
        symbolSize: 15,
        label: {
          show: showLabels[`lineLabels`],
          color: "#000",
          textStyle: {
            fontSize: 10,
          },
        },
      },
    ],
  };
  const onChartClick = (params) => {
    // console.log(params);
  };
  const handleSwitch = () => {
    setshowLabels({
      ...showLabels,
      [`lineLabels`]: !showLabels[`lineLabels`],
    });
  };
  return (
    <div>
      {" "}
      <h4 className="chartheader">
        {chartTitle["Value"]["lineChart"]}
        <span style={{ float: "right" }}>
          <Switch
            size="small"
            checked={showLabels[`lineLabels`]}
            onClick={handleSwitch}
            sx={{ top: 0 }}
          />
        </span>
      </h4>
      <div style={{ height: height, width: width }}>
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
          onEvents={{ click: onChartClick }} // Register click event
        />
      </div>
    </div>
  );
}

export default React.memo(LineChart);

//useLayout previous dependencies: segment, selectedSubSegment, selectedSubSegments, showLabels[`lineLabels`], colorsArray,
