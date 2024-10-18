// 'use Client'
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import { Switch } from "@mui/material";

function LineChart({
  globalData: data,
  width,
  height,
  segment,
  selectedSubSegment,
  selectedSubSegments,
  chartTitle,
  showLabels,
  setshowLabels,
  // colors,
  colorsArray,
}) {
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
      return {
        year: k,
        value: Math.round(lineData[k].value / lineData[k].volume),
      };
    });

    let root = am5.Root.new("lineChart");
    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -45,
      centerY: am5.p50,
      centerX: am5.p100,
      visible: true,
      strokeOpacity: 0,
      fontSize: 10,
    });
    xRenderer.grid.template.setAll({
      visible: false,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "year",
        renderer: xRenderer,
        strokeOpacity: 0,
        tooltip: am5.Tooltip.new(root, {
          baseGrid: {
            disabled: false,
          },
        }),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          baseGrid: {
            disabled: false,
          },
        }),
      })
    );
    yAxis.get("renderer").grid.template.setAll({ visible: false });
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );
    series.strokes.template.setAll({
      strokeWidth: 2,
      stroke: root.interfaceColors.get("alternativeBackground"),
    });

    series.bullets.push(function (root, s, dataItem) {
      let container = am5.Container.new(root, {});
      container.children.push(
        am5.Circle.new(root, {
          radius: 5,
          // fill: "#1976d2",
          fill: colorsArray ? colorsArray[0] : "#1976d2",
          stroke: root.interfaceColors.get("alternativeBackground"),
          strokeWidth: 2,
        })
      );

      container.children.push(
        am5.Label.new(root, {
          text: showLabels.lineLabels
            ? dataItem.dataContext.value.toString()
            : "",
          centerY: am5.p50,
          centerX: am5.p50,
          dy: -15,
          // truncate: true,
          maxWidth: "1px",
          fontSize: 10,
        })
      );

      // circle.events.on("click", function (e) {
      //   setselectedLineChartCircle(e.target.dataItem.dataContext);
      // });

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    xAxis.data.setAll(lineChartData);
    series.data.setAll(lineChartData);
    series.appear(1000);
    chart.appear(1000, 100);
    root._logo.dispose();
    return () => {
      root.dispose();
    };
  }, [
    data,
    segment,
    selectedSubSegment,
    selectedSubSegments,
    showLabels[`lineLabels`],
    colorsArray,
  ]);
  return (
    <div>
      {" "}
      <h4 className="chartheader">
        {chartTitle["Value"]["lineChart"]}
        <span style={{ float: "right" }}>
          <Switch
            size="small"
            checked={showLabels[`lineLabels`]}
            onClick={() =>
              setshowLabels({
                ...showLabels,
                [`lineLabels`]: !showLabels[`lineLabels`],
              })
            }
            sx={{ top: 0 }}
          />
        </span>
      </h4>
      <div id="lineChart" style={{ width: width, height: height }}></div>
    </div>
  );
}

export default LineChart;
