import Appointment from "./Appointment.js"

function Tile(props) {
  return (
    <div className="tile">
        <h1>{props.area} {props.price} {props.type}</h1>
        <img src={props.image} alt='' />

        <Appointment id={props.id} index={props.index}/>
    </div>
  );
}

export default Tile;
