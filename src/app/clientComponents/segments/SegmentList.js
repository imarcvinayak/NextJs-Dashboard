// import Segment from "./Segment";

function SegmentList({ segments, setSegment }) {

  return (
    <div className="buttonContainer">
      {segments.map((s) => {
        return (
          <button
            key={s}
            className={s + " segment"}
            onClick={() => setSegment(s)}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentList;
