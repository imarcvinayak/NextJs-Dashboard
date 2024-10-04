"use client";
import { useEffect, useState } from "react";
import ChartByValue from "./value/ChartComponent";
import ChartByVolume from "./volume/ChartComponent";
import SegmentList from "./segments/SegmentList"
import Data from "../data/data.json";
import "./style.css";

function ChartList() {
  const [globalData, setGlobalData] = useState();

  useEffect(() => {
    if (!Data) return;
    const data = Data.filter(
      (d) => d["Report Name"] === "Global Pea Protein Market Report"
    );
    setGlobalData(data);
  }, []);

  return (
    <>
      <header></header>
      <main className="main">
        <SegmentList/> 
      <div className="DistributionCharList" style={{ marginLeft: "20px" }}>
        {globalData && <ChartByValue data={globalData} />}
        {globalData && <ChartByVolume data={globalData} />}
      </div>
      </main>
    </>
  );
}

export default ChartList;

{
  /* <div>
  <PieChart {...commonProps} yType={"Value"} />
  <StackChart {...commonProps} yType={"Value"} />
  <LineChart data={lineData || globalData} {...commonProps} />
</div> */
}
{
  /* <div>
  <PieChart {...commonProps} yType={"Volume"} />
  <StackChart {...commonProps} yType={"Volume"} />
  <BubbleChart {...commonProps} />
</div> */
}

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
