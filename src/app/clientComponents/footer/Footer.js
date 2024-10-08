import SegmentList from '../segments/SegmentList'

function Footer({segments,setSegment}) {
    return ( 
        <footer>
        <div className="selectSegment">
          <div
            style={{
              width: "200px",
              height: "40px",
              position: "relative",
              background: "rgb(103, 113, 220)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              color: "white",
            }}
          >
            <span style={{ padding: "10px" }}>Select Segment</span>
            <div
              style={{
                position: "absolute",
                right: "-20px",
                width: "0px",
                height: "20px",
                borderLeft: "20px solid rgb(103, 113, 220)",
                borderTop: "20px solid transparent",
                borderBottom: "20px solid transparent",
              }}
            ></div>
          </div>
        </div>
        {<SegmentList segments={segments} setSegment={setSegment} />}
      </footer>
     );
}

export default Footer;