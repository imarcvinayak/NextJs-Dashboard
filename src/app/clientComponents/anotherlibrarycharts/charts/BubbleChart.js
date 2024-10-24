import ReactECharts from "echarts-for-react";
import React, { useLayoutEffect, useEffect, useState } from "react";
// import { generateColorVariations } from "@/app/utils/Themes";

function BubbleChart({
  globalData: data,
  width,
  height,
  segment,
  subSegments,
  selectedSubSegment,
  setSelectedSubSegment,
  // selectedSubSegments,
  chartTitle,
  // colors,
  colorsArray,
}) {
  const [EbubbleData, setEbubbleData] = useState([]);
  const [shouldRenderChart, setShouldRenderChart] = useState(true);
  useLayoutEffect(() => {
    if (!data) return;
    // const filterData = data.filter((d) => d["Segment"] === segment);
    let filteredBubbleChartData = [];
    if (selectedSubSegment)
      filteredBubbleChartData = data.filter(
        (d) =>
          d["Segment"] === segment && d["Sub-Segment"] === selectedSubSegment
      );
    else filteredBubbleChartData = data.filter((d) => d["Segment"] === segment);

    // let colorList = generateColorVariations(colors[0], subSegments.length);
    function calculateCagrValue(initialValue, endingValue, years) {
      return ((endingValue / initialValue) ** (1 / years) - 1) * 100;
    }
    const subSegmentsList = {};
    filteredBubbleChartData.forEach((d) => {
      const key = d["Sub-Segment"];
      if (!subSegmentsList[key]) subSegmentsList[key] = [];
      subSegmentsList[key].push(d);
    });

    const aggregatedData = [];
    Object.keys(subSegmentsList).forEach((key) => {
      const item = subSegmentsList[key];
      const initialYear = Math.min(...item.map((d) => d["Year"]));
      const finalYear = Math.max(...item.map((d) => d["Year"]));
      const years = finalYear - initialYear ? finalYear - initialYear : 1;
      const initialValue = item.find((d) => d["Year"] === initialYear).Value;
      const endingValue = item.find((d) => d["Year"] === finalYear).Value;
      const cagr = calculateCagrValue(initialValue, endingValue, years);
      aggregatedData.push({
        subSegment: key,
        cagr: cagr,
        value: endingValue,
        color: colorsArray[subSegments.findIndex((s) => s === key)],
      });
      // return aggregatedData
    });
    setEbubbleData(
      aggregatedData.map((d) => {
        return {
          name: d.subSegment,
          value: [d.value, d.cagr],
          itemStyle: {
            color:
              colorsArray[subSegments.findIndex((s) => s === d.subSegment)],
          },
          tooltip: {
            backgroundColor:
              colorsArray[subSegments.findIndex((s) => s === d.subSegment)],
          },
        };
      })
    );
  }, [data,colorsArray]);
  useEffect(() => {
    setShouldRenderChart(false);
    const timer = setTimeout(() => {
      setShouldRenderChart(true); // Set state to true after delay
    });

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [segment]);
  const option = {
    color: colorsArray,
    tooltip: {
      trigger: "item",
      color: "#fff",
      formatter: function (params) {
        return `<div style='text-align: left;'>Name: ${
          params.name
        } <br/>Value: ${params.value[0].toFixed(
          2
        )}<br />CAGR: ${params.value[1].toFixed(2)}%</div>`;
      },
      textStyle: {
        color: "#fff",
      },
    },
    grid: {
      left: "40",
      right: "30",
      bottom: "20",
      top: "20",
      containLabel: true,
    },
    xAxis: {
      name: "Value",
      nameLocation: "middle",
      nameGap: 40, // Gap between the x-axis and its title
      nameTextStyle: {
        fontSize: 14, // Customize the x-axis title font size
        color: "#333", // Customize the x-axis title color
      },
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false, // Hide the X-axis line
      },
      scale: true,
      splitNumber: 5,
      axisTick: {
        show: false, // Hide tick marks on X-axis
      },
      axisLabel: {
        rotate: 45,
        margin: 10,
      },
    },
    yAxis: {
      name: "CAGR",
      nameLocation: "middle",
      nameGap: 30, // Gap between the x-axis and its title
      nameTextStyle: {
        fontSize: 14, // Customize the x-axis title font size
        color: "#333", // Customize the x-axis title color
      },
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false, // Hide the X-axis line
      },
      axisTick: {
        show: false, // Hide tick marks on X-axis
      },
      axisLabel: {
        formatter: (value) => {
          return Math.floor(value);
        },
      },
      splitNumber: 1,
      interval: EbubbleData.length === 1 ? 2 : 1,
      scale: true,
      boundaryGap: EbubbleData.length === 1 && ["10%", "10%"],
    },
    series: [
      {
        name: "Bubble Chart",
        type: "scatter",
        symbolSize: function (data) {
          return data[1]; // Bubble size depends on the third data point
        },
        data: EbubbleData,
      },
    ],
  };
  const onChartClick = (params) => {
    setSelectedSubSegment(!selectedSubSegment ? params.name : "");
  };
  return (
    <div>
      <h4 className="chartheader">{chartTitle["Volume"]["bubbleChart"]}</h4>

      <div style={{ height: height, width: width }}>
        {shouldRenderChart && (
          <ReactECharts
            option={option}
            style={{ height: "100%", width: "100%" }}
            onEvents={{ click: onChartClick }} // Register click event
          />
        )}
      </div>
    </div>
  );
}

export default BubbleChart;

// interval: EbubbleData.length > 1 ? 1000 : 200,
// min: (value) => {
//   if (EbubbleData.length > 1) return Math.floor(value.min / 1000) * 1000;
//   else return Math.floor(value.min / 100) * 100 - 200;
// },
// max: (value) => {
//   if (EbubbleData.length > 1)
//     return Math.floor(value.max / 1000) * 1000 + 1000;
//   else return Math.floor(value.max / 100) * 100 + 200;
// },
// startValue:
//   Math.floor(
//     Math.min(...EbubbleData.map((d) => d.value[0])) /
//       Math.pow(10, Math.floor(Math.log10(Math.min(...EbubbleData.map((d) => d.value[0])))))
//   ) * Math.pow(10, Math.floor(Math.log10(Math.min(...EbubbleData.map((d) => d.value[0]))))),

//useLayout previous dependencies: segment, selectedSubSegment, selectedSubSegments, colorsArray
