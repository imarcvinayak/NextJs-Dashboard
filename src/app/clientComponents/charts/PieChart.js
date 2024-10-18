// import { generateColorVariations } from "@/app/utils/Themes";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import React, { useLayoutEffect } from "react";

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
  useLayoutEffect(() => {
    if (!data) return;
    // const pieData = data.filter((d) => d["Segment"] === segment);
    const pieData = [...data];
    // let colorsList = generateColorVariations(colors[0], subSegments.length);
    const root = am5.Root.new(`${showMaxYear ? yType : ""}pieChart`);
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
    // console.log(series.get("colors")._settings.colors)

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
      return Object.keys(agredatedata).map((key) => ({
        category: key,
        value: agredatedata[key],
      }));
    };
    //adding events on pie Chart
    series.slices.template.events.on("click", (event) => {
      const dataItem = event.target.dataItem;
      if (dataItem) {
        if (selectedSubSegment !== dataItem.dataContext.category)
          setSelectedSubSegment(dataItem.dataContext.category);
        else setSelectedSubSegment("");
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
    if (colorsArray) {
      const color = [];
      colorsArray.forEach((c) => color.push(am5.color(c)));
      series.get("colors").set("colors", color);
    }

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
  }, [
    data,
    segment,
    selectedSubSegments,
    selectedSubSegment,
    yType,
    colorsArray,
  ]);

  return (
    <div>
      <h4 className="chartheader">
        {chartTitle[yType]["pieChart"] +
          " " +
          (showMaxYear ? year.end : year.start)}
      </h4>
      <div
        id={`${showMaxYear ? yType : ""}pieChart`}
        style={{ width: width, height: height }}
      ></div>
    </div>
  );
}

export default PieChart;
