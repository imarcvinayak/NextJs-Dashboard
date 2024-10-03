import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// 'use Client'
function BubbleChart({data,width,height}) {
    
    useLayoutEffect(()=>{
        const filterData = data.filter((d)=>d['Segment']==='Type')
    
        function calculateCagrValue(initialValue, endingValue, years){
            return ((endingValue/initialValue)**(1/years)-1)*100
        }
        const subSegments = {}
        filterData.forEach(d => {
            const key = d['Sub-Segment']
            if(!subSegments[key])
                subSegments[key] = []
            subSegments[key].push(d)
    
        });
        console.log(subSegments)
        const aggregatedData = []
        Object.keys(subSegments).forEach((key)=>{
            const item = subSegments[key];
            const initialYear = Math.min(...item.map(d=>d['Year']))
            const finalYear = Math.max(...item.map(d=>d['Year']))
            const years = finalYear-initialYear
            const initialValue = item.find(d=>d['Year']===initialYear).Value
            const endingValue = item.find(d=>d['Year']===finalYear).Value
            
            const cagr = calculateCagrValue(initialValue, endingValue,years)
            aggregatedData.push({
                subSegment: key,
                cagr:cagr,
                value:endingValue,
    
            })
            // return aggregatedData
        })
        
        // const filterData = data.filter((d)=>d['Segment']==='Type')

        console.log(aggregatedData);
        
         // Create root element 
        let root = am5.Root.new("bubbleChart");

        // Set themes
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
        })
        );

        // Create axes
        let xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
            })
        );
    
        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
            })
        );

            // Add bubble series
    const series = chart.series.push(
        am5xy.XYSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: "value",
          valueYField: "cagr",
        //   valueField: "population", // Bubbles' radius size based on population
          calculateAggregates: true
        })
      );

      // Set up circle bullets (bubbles)
    series.bullets.push(() => {
        const circle = am5.Circle.new(root, {
          radius: 10,
          fillOpacity: 0.5,
          tooltipText: "{subSegment}: CAGR {cagr}, value {value}",
          fill: am5.color(0xff5722)
        });
  
        circle.states.create("hover", {
          scale: 1.3
        });
  
        return am5.Bullet.new(root, { sprite: circle });
      });

       // Set data
    series.data.setAll(aggregatedData);
  
      // Add cursor interaction
      chart.set("cursor", am5xy.XYCursor.new(root, {}));

        
        // Dispose chart on unmount
        return () => {
            root.dispose();
        };
    },[])
    root._logo.dispose();
    return ( 
        <div id = 'bubbleChart' style={{ width: width, height: height }}>your Bubble Chart</div>
     );
}

export default BubbleChart;