import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import React, { useLayoutEffect, useState } from "react";

function PieChart({
  globalData: data,
  width,
  height,
  selectedSubSegment,
  setSelectedSubSegemnt,
  getLineData,
  yType,
}) {
  // const pieData = data
  //   console.log(selectedSubSegment);
  // const [yAxisType,setyAxisType] = useState(yType)
  useLayoutEffect(() => {
    if (!data) return;
    const pieData = data.filter((d) => d["Segment"] === "Type");

    const root = am5.Root.new(`${yType}pieChart`);
    root.setThemes([am5themes_Animated.new(root)]);
    const pieChart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        radius: am5.percent(70),
      })
    );
    const series = pieChart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        innerRadius: am5.percent(50),
      })
    );
    series.labels.template.setAll({
      tooltipText: "{name}, {category}: {value}",
      tooltipY: am5.percent(40),
      maxWidth: 100,
      oversizedBehavior: "wrap",
      fontSize: 10,
    });

    const processData = (data) => {
      const agredatedata = {};

      data.forEach((d) => {
        const key = d["Sub-Segment"];

        if (!agredatedata[key]) agredatedata[key] = 0;

        agredatedata[key] += d[yType];
      });
      return Object.keys(agredatedata).map((key) => ({
        category: key,
        value: agredatedata[key],
      }));
    };

    //adding events on pie Chart
    series.slices.template.events.on("click", (event) => {
      const dataItem = event.target.dataItem;
      if (dataItem) {
        const lineData = pieData.filter(
          (d) => d["Sub-Segment"] === dataItem.dataContext.category
        );
        setSelectedSubSegemnt(dataItem.dataContext.category);
        getLineData(lineData);
      }
    });
    series.slices.template.adapters.add(
      "fillOpacity",
      (fillOpacity, target) => {
        const segment = target.dataItem.dataContext.category;
        return selectedSubSegment === "" || selectedSubSegment === segment
          ? 1
          : 0.3;
      }
    );

    series.slices.template.adapters.add(
      "strokeOpacity",
      (strokeOpacity, target) => {
        const segment = target.dataItem.dataContext.category;
        return selectedSubSegment === "" || selectedSubSegment === segment
          ? 1
          : 0.3;
      }
    );
    // series.slices.template.set("toggleKey", undefined);

    series.appear(1000);
    pieChart.appear(1000, 100);
    series.data.setAll(processData(pieData));
    root._logo.dispose();
    return () => {
      root.dispose();
    };
  }, [data, selectedSubSegment]);

  return (
    <div id={yType + "pieChart"} style={{ width: width, height: height }}>
      Pie Chart
    </div>
  );
}

export default PieChart;
