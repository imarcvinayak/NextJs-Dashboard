import { useEffect, useState } from "react";
import PieChart from "../charts/PieChart";
import StackChart from "../charts/StackChart";
import BubbleChart from "../charts/BubbleChart";

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
      <PieChart {...commonProps} yType={"Volume"} />
      <StackChart {...commonProps} yType={"Volume"} />
      <BubbleChart {...commonProps} />
    </div>
  );
}

export default ChartComponent;
