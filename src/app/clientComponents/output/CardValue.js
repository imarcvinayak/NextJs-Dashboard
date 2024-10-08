import "./style.css";
function CardValue({ h3, p, h2, span }) {
  return (
    <div className="card">
      <div className="card-content">
        <h3>{h3}</h3>
        <p>{p}</p>
        <h2>{h2}</h2>
        <span>{span}</span>
      </div>
    </div>
  );
}

export default CardValue;
