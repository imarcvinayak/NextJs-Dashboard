// 'use Client'
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import {useLayoutEffect, useRef} from 'react';
function BarChart({data,width,height}) {

    const BarChartRef = useRef();

    useLayoutEffect(()=>{
        const root = am5.Root.new('barChart')
        const barchart = root.container.children.push(
            am5xy.XYChart.new(root,{})
        )
        let yAxis = barchart.yAxes.push(
            am5xy.ValueAxis.new(root,{
                renderer: am5xy.AxisRendererY.new(root,{})
            })
        )
        let xAxis = barchart.xAxes.push(
            am5xy.CategoryAxis.new(root,{
                renderer: am5xy.AxisRendererX.new(root,{}),
                categoryField:'Year',
            })
        )

        const transformedData = {}
        data.forEach(d => {
            const year = d.Year.toString();
            const segment = d["Sub-Segment"];
            const value = d.Value;

            if(!transformedData[year]){
                transformedData[year] = {Year:year}; 
            }
            if(!transformedData[year][segment])
                transformedData[year][segment] = 0;
            transformedData[year][segment] += value;

        });
        const transformedList = Object.values(transformedData);

        xAxis.data.setAll(transformedList);

        // console.log(transformedList);    
        
        // subSegments.forEach(ss,i=>{})
        let series = barchart.series.push(
            am5xy.ColumnSeries.new(root,{
                name: 'Series',
                xAxis:xAxis,
                yAxis:yAxis,
                valueYField:'JAPAN',
                categoryXField:'Year'
            })
        )
        series.data.setAll(transformedList)


        return () => {
            root.dispose();
          };
    },[data])
    root._logo.dispose();
    return ( 
        <div id = 'barChart' ref = {BarChartRef} style={{ width: width, height: height }}>your Bar Chart</div>
     );
}

export default BarChart;