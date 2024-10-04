import { useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function StackChart({
  globalData: data,
  getLineData,
  width,
  height,
  selectedSubSegment,
  setSelectedSubSegemnt,
  yType
}) {
  // const [selectedstack, setSelectedStack] = useState("");

  useLayoutEffect(() => {
    if (!data) return;
    //filter data
    let defaultData = data.filter((d) => d["Segment"] === "Type");

    const stackDummyData = {};
    defaultData.forEach((d) => {
      const key = d.Year.toString();
      const segment = d["Sub-Segment"];

      if (!stackDummyData[key]) stackDummyData[key] = { key: key };
      if (!stackDummyData[key][segment]) stackDummyData[key][segment] = 0;
      stackDummyData[key][segment] += d[yType] || 0;

      return stackDummyData;
    });
    const stackData = Object.values(stackDummyData);

    // console.log(stackDummyData);

    //create root
    let root = am5.Root.new(`${yType}stackChart`);

    //create theme
    root.setThemes([am5themes_Animated.new(root)]);

    //create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        // layout: root.verticalLayout,
      })
    );
    let legend = chart.children.unshift(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        layout: root.horizontalLayout,
        fontSize: "12px !important",
      })
    );

    //create Axes
    //x
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });
    xRenderer.labels.template.setAll({
      rotation: -45,
      centerY: am5.p50,
      centerX: am5.p100,
      fontSize: "10px",
      maxDeviation: 0.3,
      strokeOpacity: 0,
    });
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "key",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {
          fontSize: 10,
        }),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    //y
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );
    //create series for each stack
    function createSeries(name) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: name,
          categoryXField: "key",
          stacked: true,
        })
      );
      series.columns.template.setAll({
        tooltipText: "{name}: {valueY}",
        strokeWidth: 0,
      });
      series.columns.template.events.on("click", (event) => {
        const clickedSeries = event.target.dataItem.component;
        // const clickedColumn = event.target.dataItem;
        // const seriesName = series.get("name");

        const lineData = defaultData.filter((d) => d["Sub-Segment"] === name);
        getLineData(lineData);

        setSelectedSubSegemnt(name);
        chart.series.each((s) => {
          const isSelected = s == clickedSeries;

          const opacity = isSelected ? 1 : 0.2;
          s.columns.each((c) => {
            c.set("fillOpacity", opacity);
            c.set("strokeOpacity", opacity);
          });
        });
      });
      series.columns.template.setAll({
        color: 0x8e44ad,
        fillOpacity:
          selectedSubSegment === "" || name === selectedSubSegment ? 1 : 0.2,
        strokeOpacity:
          selectedSubSegment === "" || name === selectedSubSegment ? 1 : 0.2,
      });
      series.data.setAll(stackData);
      series.appear();
    }
    [...new Set(defaultData.map((d) => d["Sub-Segment"]))].forEach((d) => {
      createSeries(d);
    });

    xAxis.data.setAll(stackData);
    chart.appear(1000, 100);
    root._logo.dispose();
    return () => {
      root.dispose();
    };
  });

  return (
    <div id={yType+"stackChart"} style={{ width: width, height: height }}>
      Your Stack Chart
    </div>
  );
}

export default StackChart;
