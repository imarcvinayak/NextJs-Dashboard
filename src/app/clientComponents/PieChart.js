import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";


function PieChart({data,getLineData,width,height}) {
    // const pieData = data
    useLayoutEffect(()=>{
        if(!data) return;
        const pieData = data.filter((d)=>d['Segment'] === 'Type')
        
        const root = am5.Root.new('pieChart')
        root.setThemes([am5themes_Animated.new(root)]);
        const pieChart = root.container.children.push(
            am5percent.PieChart.new(root,{
                layout:root.verticalLayout,
                radius:am5.percent(70)
            }))
        const series = pieChart.series.push(
            am5percent.PieSeries.new(root,{
                valueField:'value',
                categoryField: 'category',
                innerRadius: am5.percent(50)
            })
        )
        series.labels.template.setAll({
            tooltipText: "{name}, {category}: {value}",
            tooltipY: am5.percent(40),
            maxWidth: 100,
            oversizedBehavior: "wrap",
            fontSize: 10,
          });

          const processData = (data) => {
            const agredatedata = {};

            data.forEach(d=>{
                const key = d['Sub-Segment']

                if (!agredatedata[key])
                    agredatedata[key] = 0

                agredatedata[key] += d.Value
            })
            return Object.keys(agredatedata).map(key=>({
                category: key,
                value: agredatedata[key]
            }))
          }

          //adding events on pie Chart
          series.slices.template.events.on("click", (event) => {
              const dataItem = event.target.dataItem;
              if (dataItem) {
                const lineData = pieData.filter((d)=>(d['Sub-Segment']===dataItem.dataContext.category))
                // console.log(pieData);
                
                getLineData(lineData)
              }
            });

            series.appear(1000);
            pieChart.appear(1000, 100);
          series.data.setAll(processData(pieData))
          root._logo.dispose();
          return () => {
            root.dispose();
          };
    })
    

    return ( 
        <div id = 'pieChart' style={{ width: width, height: height }}>Pie Chart</div>
     );
}

export default PieChart;