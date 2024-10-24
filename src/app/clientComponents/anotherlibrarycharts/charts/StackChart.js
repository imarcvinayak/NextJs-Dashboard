import React, { useLayoutEffect, useEffect, useState } from "react";
import { Switch } from "@mui/material";
import ReactECharts from "echarts-for-react";

function StackChart({
  globalData: data,
  width,
  height,
  segment,
  selectedSubSegment,
  setSelectedSubSegment,
  // selectedSubSegments,
  yType,
  chartTitle,
  showLabels,
  setshowLabels,
  // colors,
  // subSegments,
  colorsArray,
}) {
  const [EstackData, setEstackData] = useState({
    xAxisData: [],
    stackData: [],
    totalArray: [],
  });
  const [shouldRenderChart, setShouldRenderChart] = useState(true);
  useLayoutEffect(() => {
    if (!data) return;
    //filter data
    let defaultData = [...data];
    const stackDummyData = {};
    defaultData.forEach((d) => {
      const key = d.Year.toString();
      const segment = d["Sub-Segment"];

      if (!stackDummyData[key]) stackDummyData[key] = { key: key };
      if (!stackDummyData[key][segment]) stackDummyData[key][segment] = 0;
      if (!stackDummyData[key]["total"]) stackDummyData[key]["total"] = 0;
      stackDummyData[key][segment] += d[yType] || 0;
      stackDummyData[key]["total"] += d[yType] || 0;

      // return stackDummyData;
    });
    const stackData = Object.values(stackDummyData);
    stackData.map((d) => {
      const round2decimals = Object.keys(d).filter((d) => d !== "key");
      round2decimals.forEach((s) => (d[s] = parseFloat(d[s].toFixed(2))));
    });
    const xAxisData = stackData.map((s) => s["key"]);
    const stacksubsegments = Object.keys(stackData[0]).filter(
      (d) => d !== "key" && d !== "total"
    );
    const estackData = [];
    stacksubsegments.forEach((s) => {
      const stack = {};
      stack["name"] = s;
      stack["data"] = stackData.map((sd) => sd[s]);
      estackData.push(stack);
    });
    const totalArray = stackData.map((sd) => sd["total"]);
    setEstackData({
      xAxisData: xAxisData,
      stackData: estackData,
      totalArray: totalArray,
    });
  }, [data]);
  useEffect(() => {
    setShouldRenderChart(false);
    const timer = setTimeout(() => {
      setShouldRenderChart(true); // Set state to true after delay
    });

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [segment]);

  const series = EstackData.stackData.map(({ name, data }, i) => {
    return {
      name,
      type: "bar",
      stack: "Total",
      barWidth: "80%",
      label: {
        show:
          showLabels[`stacked${yType}Labels`] &&
          (selectedSubSegment === "" || selectedSubSegment === name),
        formatter: (params) => Math.round(params.value),
        fontSize: 8,
      },
      tooltip: {
        backgroundColor: colorsArray[i],
        formatter: (params) => {
          const formattedValue = params.value.toFixed(2);
          return `<div style="text-align: left;"> 
                    Year: ${params.name} <br/> 
                    Sub-Segment: ${params.seriesName} <br/> 
                    Sum of ${yType}: ${
            yType === "Value" ? "$" : " "
          }${formattedValue} <br/> 
                    Total: ${yType === "Value" ? "$" : " "}${
            EstackData.totalArray[params.dataIndex]
          }</div>`;
        },
      },
      itemStyle: {
        opacity:
          selectedSubSegment === "" || selectedSubSegment === name ? 1 : 0.3,
      },
      data: data,
      markPoint: {
        data:
          showLabels[`stacked${yType}Labels`] &&
          selectedSubSegment === "" &&
          EstackData.totalArray.map((total, index) => ({
            value: total,
            xAxis: index,
            yAxis: total,
            label: {
              show: true,
              position: "bottom",
              distance: -12,
              formatter: `${Math.round(total)}`, // Show the total value
              fontSize: 10,
              fontWeight: "bold",
              color: "#000",
            },
            itemStyle: {
              color: "transparent",
            },
            tooltip: {
              show: false,
            },
          })),
      },
    };
  });

  const getOption = () => {
    return {
      tooltip: {
        trigger: "item",
        textStyle: {
          color: "#fff",
        },
      },
      color: colorsArray,
      grid: {
        left: "10",
        right: "20",
        bottom: "10",
        top: "20",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: EstackData.xAxisData,
        axisLabel: {
          rotate: 45, // Rotate labels by 45 degrees
        },
        axisLine: {
          show: false, // Hide the X-axis line
        },
        axisTick: {
          show: false, // Hide tick marks on X-axis
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: false, // Disable horizontal grid lines
        },
        axisLine: {
          show: false, // Hide the X-axis line
        },
        axisTick: {
          show: false, // Hide tick marks on X-axis
        },
      },
      smooth: true, // Makes the line smooth
      series,
    };
  };

  const onChartClick = (params) => {
    // console.log("Clicked on:", params);
    setSelectedSubSegment(
      params.seriesName === selectedSubSegment ? "" : params.seriesName
    );
  };
  return (
    <div>
      <h4 className="chartheader">
        {chartTitle[yType]["stackChart"]}

        <span style={{ float: "right" }}>
          <Switch
            size="small"
            checked={showLabels[`stacked${yType}Labels`]}
            onClick={() =>
              setshowLabels({
                ...showLabels,
                [`stacked${yType}Labels`]: !showLabels[`stacked${yType}Labels`],
              })
            }
            sx={{ top: 0 }}
          />
        </span>
      </h4>
      <div style={{ height: height, width: width }}>
        {shouldRenderChart && (
          <ReactECharts
            option={getOption()}
            style={{ height: "100%", width: "100%" }}
            onEvents={{ click: onChartClick }} // Register click event
          />
        )}
      </div>
    </div>
  );
}

export default StackChart;

//useLayout previous Dependencies: segment, selectedSubSegment, selectedSubSegments, yType, showLabels[`stacked${yType}Labels`], colorsArray,
