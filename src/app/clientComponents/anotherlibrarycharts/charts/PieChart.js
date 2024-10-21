import React, { useLayoutEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

function PieChart({
  globalData: data,
  width,
  height,
  segment,
  // subSegments,
  selectedSubSegment,
  setSelectedSubSegment,
  selectedSubSegments,
  yType,
  chartTitle,
  year,
  showMaxYear,
  // colors,
  colorsArray,
}) {
  // console.log(data, "dd");
  const [EpieData, setEpieData] = useState([]);
  useLayoutEffect(() => {
    if (!data) return;
    const pieData = [...data];

    const processData = (data) => {
      const agredatedata = {};

      data.forEach((d) => {
        const key = d["Sub-Segment"];
        if (!agredatedata[key]) agredatedata[key] = 0;
        if (showMaxYear) {
          if (d.Year === year.end) agredatedata[key] += d[yType];
        } else {
          if (d.Year === year.start) agredatedata[key] += d[yType];
        }
      });
      return Object.keys(agredatedata).map((key, i) => ({
        name: key,
        value: agredatedata[key],
        tooltip: { backgroundColor: colorsArray[i] },
        itemStyle: {
          opacity:
            selectedSubSegment === "" || selectedSubSegment === key ? 1 : 0.3,
        },
      }));
    };

    setEpieData(processData(pieData));
  }, [
    data,
    // segment,
    // selectedSubSegments,
    // selectedSubSegment,
    // // yType,
    // colorsArray,
  ]);

  const onChartClick = (params) => {
    setSelectedSubSegment(
      params.name === selectedSubSegment ? "" : params.name
    );
  };

  const getOption = () => {
    return {
      tooltip: {
        trigger: "item",
        textStyle: {
          color: "#fff",
        },
        formatter: (params) => {
          const formattedValue = params.value.toFixed(2);
          return `${params.name}: ${formattedValue} (${params.percent}%)`;
        },
      },
      label: {
        formatter: (params) => {
          return `${params.name}: \n  ${params.percent}%`;
        },
      },
      series: [
        {
          type: "pie",
          radius: ["35%", "70%"],
          data: EpieData,
          label: {
            fontSize: 10,
          },
          color: colorsArray,
          // Enable click events
        },
      ],
    };
  };

  return (
    <div>
      <h4 className="chartheader">
        {chartTitle[yType]["pieChart"] +
          " " +
          (showMaxYear ? year.end : year.start)}
      </h4>
      {/* <div
        id={`${showMaxYear ? yType : ""}pieChart`}
        style={{ width: width, height: height }}
      ></div> */}
      <div style={{ height: height, width: width }}>
        <ReactECharts
          option={getOption()}
          style={{ height: "100%", width: "100%" }}
          onEvents={{ click: onChartClick }} // Register click event
        />
      </div>
    </div>
  );
}

export default React.memo(PieChart);
