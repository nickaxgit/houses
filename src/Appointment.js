import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";

function Appointment({index}) {
  
  const [booking, setBooking] = useState({
    isBooked: false,
    isOpen: false,
    msg: "",
    tel: "",
    startDate: new Date(),
    sendSMS: false,
  });
  useEffect(() => {
    if (booking.sendSMS) {
      async function doSMS() {
        let payload = { msg: booking.msg, tel: booking.tel };
        console.log(payload);
        let response = await fetch("http://localhost:3001/sms", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        let result = await response.json();
        setBooking((prevState) => ({ ...prevState, sendSMS: false }));
      }
      doSMS();
    } else {
      console.log(booking);
    }
  }, [booking]);
  return booking.isOpen ? (
    <div >
      <label>Preferred date:</label>
      <DatePicker
        selected={booking.startDate}
        onChange={(date) => setBooking((prevState) => ({ ...prevState, startDate: date }))}
      />
      <br />
      <label>Preferred time:</label>
      <input  type="text"></input>
      <br />
      <label>Contact email:</label>
      <input  type="text"></input>
      <br />
      <label>Contact phone:</label>
      <input       
        type="text"
        onChange={(e) => setBooking((prevState) => ({ ...prevState, tel: e.target.value }))}
      ></input>
      <br />
      <label>Notes/comments:</label>
      <br />
      <textarea      
        rows="5"
        cols="40" onChange={(e) => setBooking((prevState) => ({ ...prevState, msg: e.target.value }))}
       
      ></textarea>
      <br />
      <button
        onClick={() => setBooking((prevState) => ({ ...prevState, isOpen: false, isBooked: true, sendSMS: true }))}
      >
        Submit
      </button>
    </div>
  ) : (
    <button
      onClick={() => setBooking((prevState) => ({ ...prevState, isOpen: true }))}
      disabled={booking.isBooked ? true : false}
    >
      {booking.isBooked ? "Booked" : "Request viewing"}
    </button>
  );
}
export default Appointment;