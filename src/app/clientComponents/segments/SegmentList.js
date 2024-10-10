// import Segment from "./Segment";

function SegmentList({
  segments,
  setSegment,
  setSelectedSubSegment,
  setSelectedSubSegments,
}) {
  function handleClick(s) {
    setSegment(s);
    setSelectedSubSegment("");
    setSelectedSubSegments([]);
  }

  return (
    <div className="buttonContainer">
      {segments.map((s) => {
        return (
          <button
            key={s}
            className={s + " segment"}
            onClick={() => handleClick(s)}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentList;
