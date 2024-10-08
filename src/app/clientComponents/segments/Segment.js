function Segment({segment,setSegment}) {
    return ( 
        <button className={segment+' segment'} onClick={setSegment(segment)}>{segment}</button>
     );
}

export default Segment;