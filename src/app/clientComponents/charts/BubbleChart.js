import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {
  Label,
  p50,
  Circle,
  Tooltip,
  Bullet,
  Template,
} from "@amcharts/amcharts5";
import { XYCursor } from "@amcharts/amcharts5/xy";

function BubbleChart({
  globalData: data,
  width,
  height,
  segment,
  selectedSubSegment,
  chartTitle,
}) {
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

    function calculateCagrValue(initialValue, endingValue, years) {
      return ((endingValue / initialValue) ** (1 / years) - 1) * 100;
    }
    const subSegments = {};
    filteredBubbleChartData.forEach((d) => {
      const key = d["Sub-Segment"];
      if (!subSegments[key]) subSegments[key] = [];
      subSegments[key].push(d);
    });
    // console.log(subSegments);
    const aggregatedData = [];
    Object.keys(subSegments).forEach((key) => {
      const item = subSegments[key];
      const initialYear = Math.min(...item.map((d) => d["Year"]));
      const finalYear = Math.max(...item.map((d) => d["Year"]));
      const years = finalYear - initialYear;
      const initialValue = item.find((d) => d["Year"] === initialYear).Value;
      const endingValue = item.find((d) => d["Year"] === finalYear).Value;

      const cagr = calculateCagrValue(initialValue, endingValue, years);
      aggregatedData.push({
        subSegment: key,
        cagr: cagr,
        value: endingValue,
      });
      // return aggregatedData
    });

    // const filterData = data.filter((d)=>d['Segment']==='Type')

    // console.log(aggregatedData);

    // Create root element
    let root = am5.Root.new("bubbleChart");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelY: "zoomXY",
        pinchZoomX: true,
        pinchZoomY: true,
      })
    );

    // Create axes
    //x
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: Tooltip.new(root, {}),
      })
    );
    xAxis.children.moveValue(
      Label.new(root, {
        text: "Value",
        x: p50,
        centerX: p50,
      }),
      xAxis.children.length - 1
    );
    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12, // Set the font size for x-axis labels
      // rotation: -35,
    });

    //y
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: Tooltip.new(root, {}),
        numberFormat: "#.#'%'",
      })
    );

    yAxis.children.moveValue(
      Label.new(root, {
        rotation: -90,
        text: "CAGR",
        y: p50,
        centerX: p50,
      }),
      0
    );

    yAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
    });

    // Add bubble series
    const series = chart.series.push(
      am5xy.XYSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "value",
        valueYField: "cagr",
        seriesTooltipTarget: "bullet",
        tooltip: Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText:
            "[bold]{subSegment}[/]\nValue: {valueX.formatNumber('#,###.')}\nCAGR: {valueY.formatNumber('#.#')}%",
        }),
      })
    );
    // series.strokes.template.set("visible", false);

    let circleTemplate = Template.new({});

    // Set up circle bullets (bubbles)
    series.bullets.push(() => {
      let bulletCircle = Circle.new(root, {
        radius: 10,
        fill: am5.color("#6771DC"),
        fillOpacity: 1,
        tooltipText: "{subSegment}: CAGR {cagr}, value {value}",
      });

      bulletCircle.states.create("hover", {
        scale: 1.3,
      });
      return Bullet.new(root, {
        sprite: bulletCircle,
      });

      // return am5.Bullet.new(root, { sprite: circle });
    });

    series.set("heatRules", [
      {
        target: circleTemplate,
        min: 3,
        max: 60,
        dataField: "value",
        key: "radius",
      },
    ]);
    // Set data
    series.data.setAll(aggregatedData);

    chart.set(
      "cursor",
      XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series],
      })
    );
    // Add cursor interaction
    // chart.set("cursor", am5xy.XYCursor.new(root, {}));
    // series.appear(1000);
    // chart.appear(1000, 100);

    // Dispose chart on unmount
    root._logo.dispose();
    return () => {
      root.dispose();
    };
  },[data,segment,selectedSubSegment]);
  return (
    <div>
      <div className="chartheader">{chartTitle["Volume"]["bubbleChart"]}</div>

      <div id="bubbleChart" style={{ width: width, height: height }}></div>
    </div>
  );
}

export default BubbleChart;
