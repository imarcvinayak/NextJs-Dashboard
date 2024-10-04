import { useEffect, useState } from "react";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import StackChart from "../charts/StackChart";

function ChartComponent({ data }) {
  const [globalData, setGlobalData] = useState();
  const [lineData, setLineData] = useState();
  const [selectedSubSegment, setSelectedSubSegemnt] = useState("");
  const width = "100%";
  const height = "240px";

  useEffect(() => {
    if (!data) return;
    setGlobalData(data);
  }, []);

  const getLineData = (d) => {
    setLineData(d);
  };
  const commonProps = {
    globalData,
    getLineData,
    width,
    height,
    selectedSubSegment,
    setSelectedSubSegemnt,
  };
  return (
    <div className="ValueDistributionCharList">
      <PieChart {...commonProps} yType={"Value"} />
      <StackChart {...commonProps} yType={"Value"} />
      <LineChart data={lineData || globalData} {...commonProps} />
    </div>
  );
}

export default ChartComponent;
