import React, { useState, useEffect } from 'react';
import '../App.css';

const moviesData = [
    {
        name: 'Javan',
        price: 120,
        seats: 80,
    },
    {
        name: 'Leo',
        price: 120,
        seats: 80,
    },
  // Add more movies as needed
];

function Booking() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Load data from local storage on mount
    const storedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    const storedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const storedBookedSeats = JSON.parse(localStorage.getItem('bookedSeats'));

    if (storedMovie && storedSeats && storedBookedSeats) {
      setSelectedMovie(storedMovie);
      setSelectedSeats(storedSeats);
      setBookedSeats(storedBookedSeats);
    }
  }, []);

  useEffect(() => {
    // Save data to local storage on movie or seat selection change
    localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));

    // Calculate total price based on selected seats
    const price = selectedSeats.reduce((total, seat) => total + seat.price, 0);
    setTotalPrice(price);
  }, [selectedMovie, selectedSeats, bookedSeats]);

  useEffect(() => {
    // Clear local storage on page reload
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleMovieSelect = (movie) => {
    // Reset selected seats when movie is changed
    setSelectedSeats([]);
    setSelectedMovie(movie);
  };

  const handleSeatSelect = (seat) => {
    const isBooked = bookedSeats[selectedMovie.name]?.includes(seat.id);

    if (!isBooked) {
      const seatIndex = selectedSeats.findIndex((selectedSeat) => selectedSeat.id === seat.id);

      if (seatIndex === -1) {
        // Seat not selected, add it to the list with a selected color
        setSelectedSeats([...selectedSeats, { ...seat, status: 'selected' }]);
      } else {
        // Seat already selected, remove it from the list
        const updatedSeats = [...selectedSeats];
        updatedSeats.splice(seatIndex, 1);
        setSelectedSeats(updatedSeats);
      }
    }
  };

  const handleBookButtonClick = () => {
    // Change the status of selected seats to 'occupied'
    const updatedSeats = selectedSeats.map((seat) => ({ ...seat, status: 'occupied' }));
    setSelectedSeats(updatedSeats);

    // Mark booked seats in the current movie
    setBookedSeats({
      ...bookedSeats,
      [selectedMovie.name]: [...(bookedSeats[selectedMovie.name] || []), ...selectedSeats.map((seat) => seat.id)],
    });
  };

  return (
    <div className="app">
      <div className="navbar">
        <h2>Select a Movie</h2>
        <ul>
          {moviesData.map((movie) => (
            <li
              key={movie.name}
              className={selectedMovie === movie ? 'selected' : ''}
              onClick={() => handleMovieSelect(movie)}
            >
              {movie.name} - ${movie.price}
            </li>
          ))}
        </ul>
      </div>

      {selectedMovie && (
        <div className="seat-map">
          <h2>{selectedMovie.name}</h2>
          <div className="screen">Screen</div>
          <div className="seats">
            {Array.from({ length: selectedMovie.seats }, (_, index) => index + 1).map((seatNumber) => {
              const seat = { id: seatNumber, price: selectedMovie.price };
              const selectedSeat = selectedSeats.find(
                (selectedSeat) => selectedSeat.id === seatNumber && selectedSeat.status === 'selected'
              );
              const isOccupied = selectedSeats.some(
                (selectedSeat) => selectedSeat.id === seatNumber && selectedSeat.status === 'occupied'
              );
              const isBooked = bookedSeats[selectedMovie.name]?.includes(seatNumber);

              return (
                <div
                  key={seatNumber}
                  className={`seat ${selectedSeat ? 'selected' : ''} ${isOccupied || isBooked ? 'occupied' : ''}`}
                  onClick={() => !isOccupied && handleSeatSelect(seat)}
                >
                  {seatNumber}
                </div>
              );
            })}
          </div>
          <div className="legend">
            <div className="key">
              <div className="seat selected"></div>
              <span>Selected</span>
            </div>
            <div className="key">
              <div className="seat"></div>
              <span>Available</span>
            </div>
            <div className="key">
              <div className="seat occupied"></div>
              <span>Occupied/Booked</span>
            </div>
            <button className='btn' onClick={handleBookButtonClick}>Book</button>
          </div>
        </div>
      )}

      {selectedMovie && (
        <div className="booking-summary">
          <h2>Booking Summary</h2>
          <p>Movie: {selectedMovie.name}</p>
          <p>Selected Seats: {selectedSeats.map((seat) => seat.id).join(', ')}</p>
          <p>Total Price: ${totalPrice}</p>
        </div>
      )}
    </div>
  );
}

export default Booking;
