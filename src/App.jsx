import React, { useEffect, useState } from "react";
import "./App.css";
import Screen from "./assets/img/screen.png";

function App() {
    const [seats, setSeats] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetch("https://cinema-booking-dlrg.onrender.com/seats")
            .then((response) => response.json())
            .then((data) => setSeats(data));
    }, []);

    console.log(seats);

    const handleSeatClick = (id) => {
        fetch(`https://cinema-booking-dlrg.onrender.com/seats/${id}`, {
            method: "PUT",
        })
            .then((response) => response.json())
            .then((data) => {
                const updatedSeat = data;
                setSeats((prevSeats) =>
                    prevSeats.map((seat) =>
                        seat.id === updatedSeat.id ? updatedSeat : seat
                    )
                );
            });
    };

    const handleResetClick = () => {
        fetch("https://cinema-booking-dlrg.onrender.com/reset", {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => setSeats(data));
    };

    return (
        <div>
            <h1>Book your seat</h1>
            <p>
                {date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                })}
            </p>
            <img src={Screen} alt="" />

            <div className="seats-container">
                {seats.map((seat) => (
                    <p
                        key={seat.id}
                        className={`seat ${seat.isBooked ? "booked" : ""} ${
                            seat.category === "LOGE" ? "loge" : "parkett"
                        }`}
                        onClick={() =>
                            !seat.isBooked && handleSeatClick(seat.id)
                        }
                    >
                        {seat.row}-{seat.number}
                    </p>
                ))}
            </div>

            <h2>I'm an admin (I promise...)</h2>
            <button onClick={handleResetClick}>Reset Reservations</button>
        </div>
    );
}

export default App;
