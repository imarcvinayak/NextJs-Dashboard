'use client'
import { useEffect, useState } from "react";
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import BubbleChart from './BubbleChart';
import StackChart from './StackChart';
import Data from '../data/data.json'
import './style.css'

function ChartList() {
    const chartList = ['PieChart','BarChart','BubbleChart', 'LineChart','StackChart']
    const [chartOption, setChartOption] = useState(0)
    const [globalData, setGlobalData] = useState()
    const [lineData, setLineData] = useState()
    const width = '100%'
    const height = '240px'


      useEffect(()=>{
         if(!Data) return;
         const data = Data.filter((d)=>d["Report Name"] === "Global Pea Protein Market Report");
         setGlobalData(data)
      },[])

      const getLineData = (d) => {
         setLineData(d)
      }

    const chartComponents = {
      PieChart: <PieChart data={globalData} getLineData={getLineData} width={width} height={height}/>,
      BarChart: <BarChart data={globalData} width={width} height={height}/>,
      BubbleChart: <BubbleChart data={globalData} width={width} height={height}/>,
      LineChart: <LineChart data={lineData||globalData} width={width} height={height}/>,
      StackChart: <StackChart data={globalData} width={width} height={height}/>,
  };
      function sendID (id) {
         setChartOption(id)
      }
    return ( 
        <div className="ValueDistributionCharList" style={{marginLeft: '20px'}}>

            {chartComponents.PieChart}
            {chartComponents.StackChart}
            {chartComponents.LineChart}

           
        </div>
     );
}

export default ChartList;






















// select your chart
// <br></br>
// {
//  chartList.map((ch,i)=>{
//     return <button style={{margin: '20px 20px 20px 0'}} key={"ch"+i} onClick={()=>sendID(i)}>{ch}</button>
//  })
// }

// <div>
//  {chartComponents[chartList[chartOption]]}
// </div>